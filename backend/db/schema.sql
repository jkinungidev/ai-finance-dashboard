-- Schema for the finance_dashboard database.
-- Run in psql after: CREATE DATABASE finance_dashboard; \c finance_dashboard

CREATE TABLE transactions (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  amount           NUMERIC(12,2) NOT NULL CHECK (amount > 0),
  transaction_date DATE NOT NULL,
  type             TEXT NOT NULL CHECK (type IN ('Income', 'Expense')),
  category         TEXT NOT NULL CHECK (category IN
                     ('Groceries','Bills','Transport','Entertainment','Health','Shopping','Other')),
  priority         SMALLINT NOT NULL CHECK (priority BETWEEN 1 AND 5),
  description      TEXT CHECK (char_length(description) <= 50),
  is_recurring     BOOLEAN NOT NULL DEFAULT false,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);