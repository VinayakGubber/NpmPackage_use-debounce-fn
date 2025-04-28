
# use-debounce-fn

> 🪝 A lightweight, zero-dependency React hook for debouncing any function — with full TypeScript support and cancel/flush control.

---

## ✨ Features

- 🕒 Debounce any function (delays execution until user stops triggering it)
- ⚡️ Optional immediate run on first call
- ⛔️ Cancel a pending call
- 🚀 Flush immediately if needed
- 💡 Tiny and fast, no external libraries
- ✅ Fully typed with TypeScript
- 🧪 Unit tested

---

## 📦 Installation

npm install use-debounce-fn

---

## 🔧 Usage

import useDebounceFn from 'use-debounce-fn';

function SearchInput() {
  const [query, setQuery] = useState('');

  const debouncedSearch = useDebounceFn((q: string) => {
    console.log('Searching for', q);
    // Call API or filter results here
  }, 500); // 500ms debounce delay

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  return <input value={query} onChange={handleChange} />;
}

---

## 🧰 API

const debouncedFn = useDebounceFn(fn: Function, delay: number, options?: {
  immediate?: boolean
});

- fn: Function you want to debounce.
- delay: Delay in milliseconds.
- options.immediate: If true, runs on the first call, then debounces after.

### 🔁 Methods

- debouncedFn.cancel(): Cancels any pending execution
- debouncedFn.flush(): Immediately executes the pending function (if any)


## 🛠 How It Works

Internally, it uses setTimeout and clearTimeout to delay running your function until a certain time has passed since the last call.

---

## 📄 License

MIT — free to use and modify.

---

## 🧑‍💼 Why This Matters (Pitch)

> I built use-debounce-fn to solve a common UI performance issue in React: when functions like API calls or expensive state updates run too frequently during user input. This hook helps React apps stay fast and efficient — and it’s written in clean, modern TypeScript with developer experience in mind. It demonstrates my understanding of hooks, debouncing logic, and creating reusable tools.