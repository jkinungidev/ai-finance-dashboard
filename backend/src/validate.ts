const CATEGORIES = [
  "Groceries", "Bills", "Transport", "Entertainment",
  "Health", "Shopping", "Other",
];
const TYPES = ["Income", "Expense"];

// Returns an error message if the body is invalid, or null if it is fine.
export function validateTransaction(body: Record<string, unknown>): string | null {
  const { amount, date, type, category, priority, description, isRecurring } = body;

  if (typeof amount !== "number" || !Number.isFinite(amount) || amount <= 0) {
    return "Amount must be a number greater than 0";
}

  if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
  return "Date must be in YYYY-MM-DD format";
}

  if (!TYPES.includes(type as string)) {
  return "Type must be Income or Expense";
}

 if (!CATEGORIES.includes(category as string)) {
  return "Category must be one of: " + CATEGORIES.join(", "); //turns the array into the message, allows updates 
}

 if (typeof priority !== "number" || !Number.isInteger(priority) || priority < 1 || priority > 5) {
  return "Priority must be a whole number between 1 and 5";
}

if (
  description !== undefined &&
  description !== null &&
  (typeof description !== "string" || description.length > 50)
) {
  return "description must be a string of 50 characters or fewer";
}

if (typeof isRecurring !== "boolean") {
  return "isRecurring must be true or false";
}

  return null;
}