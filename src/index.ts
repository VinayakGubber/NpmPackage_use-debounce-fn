import { useRef, useEffect } from "react";

// Type for optional settings (whether to run immediately or not)
type Options = {
    immediate?: boolean;
};
  
// Type for the debounced function, including cancel and flush methods
type DebouncedFunction<T extends (...args: any[]) => any> = {
    (...args: Parameters<T>): void;
    cancel: () => void;
    flush: () => void;
};

// The main hook
function useDebounceFn<T extends (...args: any[]) => any>(
    fn: T,
    delay: number,
    options: Options = { immediate: true }
): DebouncedFunction<T> {
    // Timer for tracking the debounce timeout
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
    
    // Ref to store the latest version of the function
    const fnRef = useRef(fn);
    
    // Ref to store the latest arguments passed
    const lastArgs = useRef<Parameters<T> | null>(null);

    // Update the function reference when it changes
    useEffect(() => {
        fnRef.current = fn;
    }, [fn]);

    // Main debounced function
    const debounced = (...args: Parameters<T>) => {
        // Clear the previous timeout
        if (timer.current) {
            clearTimeout(timer.current);
        }

        // Save the latest arguments
        lastArgs.current = args;

        // If 'immediate' is true and no timer is running, call the function immediately
        if (options.immediate && !timer.current) {
            fnRef.current(...args);
        }

        // Set up a new timeout to call the function after the specified delay
        timer.current = setTimeout(() => {
            if (!options.immediate && lastArgs.current) {
                fnRef.current(...lastArgs.current);
            }
            // Reset timer and args after execution
            timer.current = null;
            lastArgs.current = null;
        }, delay);
    };

    // Cancel method to clear any pending timeout
    debounced.cancel = () => {
        if (timer.current) {
            clearTimeout(timer.current);
        }
        timer.current = null;
        lastArgs.current = null;
    };

    // Flush method to immediately invoke the pending function call
    debounced.flush = () => {
        if (timer.current && lastArgs.current) {
            fnRef.current(...lastArgs.current);
            clearTimeout(timer.current);
            timer.current = null;
            lastArgs.current = null;
        }
    };

    return debounced;
}

export default useDebounceFn;
