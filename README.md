# 🎫 CS — Ticket System

A React-based **Customer Support Zone** for managing and resolving customer tickets with a futuristic sci-fi UI, particle animations, 3D hover effects, and real-time status tracking.

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
http://localhost:5173
```

---

## 📁 Project Structure

```
customer-support-zone/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Cursor.jsx         ← Custom animated cursor
│   │   ├── ParticleField.jsx  ← Canvas particle background
│   │   ├── Toasts.jsx         ← Toast notification system
│   │   ├── Navbar.jsx         ← Top navigation bar
│   │   ├── Banner.jsx         ← Stats banner with animated counters
│   │   ├── TicketCard.jsx     ← 3D tilt ticket cards + badges
│   │   ├── TaskPanel.jsx      ← In Progress & Resolved panel
│   │   └── Footer.jsx         ← Site footer
│   ├── data/
│   │   └── tickets.js         ← All 12 ticket records
│   ├── hooks/
│   │   └── useToast.js        ← Custom toast hook
│   ├── styles/
│   │   └── global.css         ← Global styles & animations
│   ├── App.jsx                ← Root component & state logic
│   └── main.jsx               ← React entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## ✅ React Concepts — Q&A

### 1. What is JSX, and why is it used?

**JSX (JavaScript XML)** is a syntax extension for JavaScript that lets you write HTML-like markup directly inside JavaScript code.

```jsx
// JSX example
const element = <h1 className="title">Hello, World!</h1>
```

**Why it is used:**
- Makes UI code more readable and intuitive — structure looks like HTML
- React transforms JSX into `React.createElement()` calls under the hood
- Allows embedding JavaScript expressions using `{ }` curly braces
- Co-locates markup and logic in the same file, making components self-contained

---

### 2. What is the difference between State and Props?

| Feature     | State                                      | Props                                        |
|-------------|--------------------------------------------|--------------------------------------------|
| Definition  | Data managed **inside** a component        | Data passed **from parent** to child        |
| Mutability  | Mutable — changed with `setState`          | Immutable — read-only inside child          |
| Ownership   | Belongs to the component itself            | Belongs to the parent component             |
| Purpose     | Tracks dynamic, changing data              | Configures/customizes a component           |

```jsx
// Props — passed from parent
const TicketCard = ({ title, priority }) => <div>{title} — {priority}</div>

// State — lives inside component
const Banner = () => {
  const [count, setCount] = useState(0)
  return <div>{count}</div>
}
```

---

### 3. What is the useState hook, and how does it work?

`useState` is a React hook that adds **reactive state** to a functional component. When state changes, React re-renders the component with the new value.

```jsx
const [value, setValue] = useState(initialValue)
//     ^state   ^setter    ^starting value
```

**Example from this project:**
```jsx
const [inProgress, setInProgress] = useState([])

// Add a ticket to in-progress
const handleAdd = (ticket) => {
  setInProgress(prev => [...prev, ticket])
}
```

Every call to `setValue` triggers a re-render with the updated value.

---

### 4. How can you share state between components in React?

**Lift state up** — move shared state to the closest common parent, then pass it down via props and update it via callback functions.

```jsx
// App.jsx — parent holds the shared state
const App = () => {
  const [inProgress, setInProgress] = useState([])

  const handleAdd = (ticket) => setInProgress(prev => [...prev, ticket])

  return (
    <>
      {/* Banner reads the count */}
      <Banner inProgressCount={inProgress.length} />

      {/* TicketCard calls the setter */}
      <TicketCard onAdd={handleAdd} />

      {/* TaskPanel reads the list */}
      <TaskPanel inProgressTickets={inProgress} />
    </>
  )
}
```

For deeply nested or global state, tools like **React Context** or **Zustand** are commonly used.

---

### 5. How is event handling done in React?

React uses **camelCase** event names and passes **functions** (not strings) as handlers.

```jsx
// Click event
<button onClick={handleClick}>Click me</button>

// With inline arrow function
<button onClick={() => setCount(count + 1)}>+</button>

// Mouse event with event object
<div onMouseMove={(e) => console.log(e.clientX, e.clientY)}>
  Move mouse here
</div>
```

**Example from this project:**
```jsx
// TicketCard.jsx
<div onClick={() => !isInProgress && onAdd(ticket)}>
  {ticket.title}
</div>

// TaskPanel.jsx
<button className="done-btn" onClick={(e) => onDone(ticket, e)}>
  ✓ Done
</button>
```

---

## 🔗 Links

- **Live Link:** YOUR_DEPLOYED_URL_HERE
- **GitHub Repository:** YOUR_REPO_URL_HERE
