import { useRef, useEffect } from "react";

// This is object for a parameter named options that decides whether the function should run immediately after the first function call takes true or false

/*
        -------------------------------------FMU------------------------------------- 
    type is just like the type we declare while declaring a variable like var let etc:: but a explicit one so here options is a type of data type that we are declaring
        -------------------------------------FMU-------------------------------------
*/
type Options = {
    immediate?: boolean;
};

// This is a DebouncedFunction that defines the structure in which the function is to be passed in order to use the debounce function

/*
        -------------------------------------FMU------------------------------------- 
    1] Mainly generic to ensure that the hook can take any type of function and extends means that T must be a function call
    2] ...args is used to capture the number of arguments passed when we are not sure how many   number of arguments are being passed just to be more dynamic.
    3] any[] means the hook can accept a function (fn) of any type (as long as it’s a function)
    4] cancel and flush are the functions that don't take and return any value but are essential parts of the function
        -------------------------------------FMU-------------------------------------
*/

type DebouncedFunction <T extends (...args: any[]) => any> = {
    (...args: Parameters<T>): void;
    cancel: () => void;
    flush: () => void;
};

// This is --The Hook--
/*
        -------------------------------------FMU------------------------------------- 
    1] fn : T is the function we are passing
    2] delay : number is the time in milliseconds we are passing so as to tell how long the hook should wait after the last function call
    3] options : Option = {} is the option that takes boolean as input to tell whether to call the function immediately or not (typically for the first function call) and also = {} means that if no object is provided it defaults to an empty object
    4] DebouncedFunction<T> indicates that the hook will return a function that has the same signature as the <T>(Original function) but additional debounced methods/behavior(cancel & flush)
        -------------------------------------FMU-------------------------------------
*/

function useDebounceFn<T extends (...args: any[]) => any>(
    fn: T,
    delay: number, 
    { immediate = true }: Options = {}
): DebouncedFunction<T> {

    /*
        -------------------------------------FMU------------------------------------- 
    Declared the constants which we will be using further 
    1] timer is for the current timer
    2] fnRef is for storing the latest version of the function.. 
    3] lasrArgs is for the current args(When last called) suppose we want to search MathsBooks but the function is executed when we are half way typing that is "Math" so this is stored in the lastArgs so that we can use it along with the new arguments whenver typed to facilitate searching by appending the new characters
        -------------------------------------FMU-------------------------------------
*/
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const fnRef = useRef(fn);
    const lastArgs = useRef<Parameters<T> | null>(null);

    // Update the function reference when it changes
    useEffect(() => {
        fnRef.current = fn;
    }, [fn]);

    // Main debounced Function
    
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

            // Reset the timer and arguments after the function is executed
            timer.current = null;
            lastArgs.current = null;
        }, delay);
    };

    // cancel method for the debounced function
    debounced.cancel = () => {
        if (timer.current) {
            clearTimeout(timer.current);
        }
        timer.current = null;
        lastArgs.current = null;
    };

    // flush method for the debounced function
    debounced.flush = () => {
        if (timer.current && lastArgs.current) {
            fnRef.current(...lastArgs.current);
            clearTimeout(timer.current);
            timer.current = null;
            lastArgs.current = null;
        }
    };

    // Return the debounced function
    return debounced;
}

export default useDebounceFn;
