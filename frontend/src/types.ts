export type TransactionCategory = "Groceries" | "Bills" | "Transport" | "Entertainment" | "Health" | "Shopping" | "Other" ;

export type TransactionType = "Income" | "Expense" ;

export type Priority = 1 | 2 | 3 | 4 | 5 ;

export interface Transaction {

  id: string ;
  amount: number;
  date: string; // ISO format, e.g. "2026-10-08"
  type: TransactionType;
  category: TransactionCategory;
  priority: Priority;
  description?: string;
  isRecurring: boolean;

}

