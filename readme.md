# 🪝 use-debounce-fn

A lightweight, zero-dependency React hook for debouncing any function — with full TypeScript support and cancel/flush control.

---

## ✨ Features

- Debounce any function — delays execution until the user stops triggering it
- Optional immediate execution on the first call
- Cancel a pending execution
- Flush immediately if needed
- Fully compatible with Vite
- Tiny and fast — zero external dependencies
- Fully unit tested
- Built with and fully typed in TypeScript
- Dual Export Support

---

## 📦 Installation

```bash
npm install use-debounce-fn
```

---

## 🛠 Usage

```tsx
import useDebounceFn from "use-debounce-fn";
import { useState } from "react";

function SearchInput() {
  const [query, setQuery] = useState("");

  const debouncedSearch = useDebounceFn((q: string) => {
    console.log("Searching for", q);
    // Call API or filter results here
  }, 500); // 500ms debounce delay

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  return (
    <input value={query} onChange={handleChange} placeholder="Search..." />
  );
}
```

---

## 📚 API

```ts
const debouncedFn = useDebounceFn(
  fn: Function,
  delay: number,
  options?: { immediate?: boolean }
);
```

- `fn`: Function you want to debounce
- `delay`: Delay in milliseconds
- `options.immediate`: If `true`, runs on the first call, then debounces after

---

## 🔧 Methods

- `debouncedFn.cancel()` → Cancels any pending execution
- `debouncedFn.flush()` → Immediately executes the pending function (if any)

---

## ⚙️ How It Works

Internally, it uses **setTimeout** and **clearTimeout** to delay running your function until a certain time has passed since the last call.

---

## 📄 License

MIT — free to use and modify.

---

## 💡 Why This Matters

I built **use-debounce-fn** to solve a common UI performance issue in React: when functions like API calls or expensive state updates run too frequently during user input.

This hook keeps apps **fast and efficient** — written in **modern TypeScript**, showcasing reusable hooks, debouncing logic, and clean developer experience.

```

---

Do you want me to also make a **shorter NPM-style README** (like 15–20 lines max) for publishing, or keep it as the detailed one above?
```
