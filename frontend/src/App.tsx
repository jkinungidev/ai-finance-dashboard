import { useState } from "react";
import "./App.css";
import type {
  TransactionCategory,
  TransactionDraft,
  TransactionType,
} from "./types";

//functional component - a reusable chunk of UI, written in a function
// "When the page first loads, the frontend sends a request to the backend
// asking 'are you there,'
// and once it gets an answer back, it displays that answer on the page
// proving the two programs are actually talking to each other over the network."
function App() {
  const [draft, setDraft] = useState<TransactionDraft>({
    amount: "",
    date: "2026-10-10",
    type: "Expense",
    category: "",
    priority: "",
    description: "",
    isRecurring: false,
  });

  return (
    <>
      <header>
        <h1> AI Personal Finance Dashboard</h1>
      </header>

      <main>
        <label htmlFor="amount">Amount In</label>
        <input
          id="amount"
          type="number"
          step="0.01" // this allows for user to add cents into their input
          value={draft.amount}
          onChange={(e) => setDraft({ ...draft, amount: e.target.value })}
        />

        <label htmlFor="category">Select your transaction Category</label>
        <select
          id="category"
          value={draft.category}
          onChange={(e) =>
            setDraft({
              ...draft,
              category: e.target.value as TransactionCategory | "",
            })
          }
        >
          <option value=""> Select a Category</option>
          <option value="Groceries"> Groceries</option>
          <option value="Bills"> Bills</option>
          <option value="Transport"> Transport</option>
          <option value="Entertainment"> Entertainment</option>
          <option value="Health"> Health</option>
          <option value="Shopping"> Shopping</option>
          <option value="Other"> Other</option>
        </select>

        <label htmlFor="type">Select your transaction type</label>
        <select
          id="type"
          value={draft.type}
          onChange={(e) =>
            setDraft({
              ...draft,
              type: e.target.value as TransactionType,
            })
          }
        >
          <option value="Income"> Income</option>
          <option value="Expense"> Expense</option>
        </select>

        <label htmlFor="date"> Date of Transaction</label>
        <input
          id="date"
          type="date"
          value={draft.date}
          onChange={(e) => setDraft({ ...draft, date: e.target.value })}
        />

        <label htmlFor="priority">Priority Level for the transaction</label>
        <select
          id="priority"
          value={draft.priority}
          onChange={(e) =>
            setDraft({
              ...draft,
              priority: e.target.value,
            })
          }
        >
          <option value="">
            Select your priority level for the transaction{" "}
          </option>
          <option value="1">1 - Didn't need it</option>
          <option value="2">2 - Nice to have </option>
          <option value="3">3 - Somewhat needed </option>
          <option value="4">4 - Important </option>
          <option value="5">5 - Essential </option>
        </select>

        <label htmlFor="description">Description</label>
        <input
          id="description"
          type="text" // not string as text is a HTML attribute, not string
          placeholder="e.g. Woolworths, EB Games"
          value={draft.description}
          onChange={(e) => setDraft({ ...draft, description: e.target.value })}
        />

        <label htmlFor="isRecurring">Recurring Transaction?</label>
        <input
          id="isRecurring"
          type="checkbox"
          checked={draft.isRecurring}
          onChange={
            (e) => setDraft({ ...draft, isRecurring: e.target.checked }) // checked instead of value
          }
        />
      </main>

      <footer>
        <p>2026 jeremy is cooler than your mumma</p>
      </footer>
    </>
  );
}
export default App;
// allows App to be importable elsewhere
