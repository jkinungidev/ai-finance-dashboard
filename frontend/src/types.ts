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

// "The draft stores what the form boxes give back, which is mostly text. 
// The finished transaction above stores the cleaned-up version."

export interface TransactionDraft {
  amount: string; // text from the input box, converted to a number on submit
  date: string;
  type: TransactionType;
  category: TransactionCategory | ""; //"" = nothing chosen yet
  priority: string; //text from the dropdown, validated then converted on submit
  description: string; //"" when blank, becomes undefined on submit
  isRecurring: boolean;
}