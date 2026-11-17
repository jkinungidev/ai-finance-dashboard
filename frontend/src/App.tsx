import { useState } from "react";
import "./App.css";
import type {
  TransactionCategory,
  TransactionDraft,
  TransactionType,
  Transaction,
  TransactionError,
  Priority,
} from "./types";

function validate(draft: TransactionDraft): TransactionError {
  const errors: TransactionError = {};

  if (draft.amount.trim() === "") {
    errors.amount = "Amount is required";
  } else if (!Number.isFinite(Number(draft.amount))) {
    errors.amount = "Amount must be a number";
  } else if (Number(draft.amount) <= 0) {
    errors.amount = "Amount must be greater than 0";
  }

  if (draft.category.trim() === "") {
    errors.category = "Select a Category";
  }

  if (draft.date.trim() === "") {
    errors.date = "Date is required";
  }

  if (draft.priority.trim() === "") {
    errors.priority = "Select a Priority";
  }

  if (draft.description.length > 50) {
    errors.description = "Max Character Limit Reached";
  }

  return errors;
}

function getToday(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function createEmptyDraft(): TransactionDraft {
  return {
    amount: "",
    date: getToday(),
    type: "Expense",
    category: "",
    priority: "",
    description: "",
    isRecurring: false,
  };
}

//functional component - a reusable chunk of UI, written in a function
// "When the page first loads, the frontend sends a request to the backend
// asking 'are you there,'
// and once it gets an answer back, it displays that answer on the page
// proving the two programs are actually talking to each other over the network."

function App() {
  const [draft, setDraft] = useState<TransactionDraft>(createEmptyDraft);

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [errors, setErrors] = useState<TransactionError>({});

  // Handle Submit

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const newErrors = validate(draft);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      amount: Number(draft.amount),
      date: draft.date,
      type: draft.type,
      category: draft.category as TransactionCategory,
      priority: Number(draft.priority) as Priority,
      description:
        draft.description.trim() === "" ? undefined : draft.description.trim(),
      isRecurring: draft.isRecurring,
    };

    setTransactions((prev) => [...prev, newTransaction]);

    // Resets the form after the transaction is saved
    setDraft(createEmptyDraft());
  }
  return (
    <>
      <header>
        <h1> AI Personal Finance Dashboard</h1>
      </header>

      <main>
        <form onSubmit={handleSubmit}>
          <label htmlFor="amount">Amount($)</label>
          <input
            id="amount"
            type="number"
            step="0.01" // this allows for user to add cents into their input
            value={draft.amount}
            onChange={(e) => setDraft({ ...draft, amount: e.target.value })}
          />
          {errors.amount && <p>{errors.amount}</p>}

          <label htmlFor="date"> Date of Transaction</label>
          <input
            id="date"
            type="date"
            value={draft.date}
            onChange={(e) => setDraft({ ...draft, date: e.target.value })}
          />
          {errors.date && <p>{errors.date}</p>}

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
          {errors.category && <p>{errors.category}</p>}

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
              Select your priority level for the transaction
            </option>
            <option value="1">1 - Didn't need it</option>
            <option value="2">2 - Nice to have </option>
            <option value="3">3 - Somewhat needed </option>
            <option value="4">4 - Important </option>
            <option value="5">5 - Essential </option>
          </select>
          {errors.priority && <p>{errors.priority}</p>}

          <label htmlFor="description">Description</label>
          <input
            id="description"
            type="text" // text input: value is a string
            placeholder="e.g. Woolworths, EB Games"
            value={draft.description}
            onChange={(e) =>
              setDraft({ ...draft, description: e.target.value })
            }
          />
          {errors.description && <p>{errors.description}</p>}

          <label htmlFor="isRecurring">Recurring Transaction?</label>
          <input
            id="isRecurring"
            type="checkbox"
            checked={draft.isRecurring}
            onChange={
              (e) => setDraft({ ...draft, isRecurring: e.target.checked }) // checked instead of value
            }
          />

          <button type="submit">Log Transaction</button>
        </form>

        <ul>
          {transactions.map((t) => (
            <li key={t.id}>
              {t.date} · {t.category} · ${t.amount}
            </li>
          ))}
        </ul>
      </main>

      <footer>
        <p>2026 jkinungidev</p>
      </footer>
    </>
  );
}
export default App;
// allows App to be importable elsewhere
