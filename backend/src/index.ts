import express from 'express'; // package exports 1 main function as default, then name it whatever
import cors from 'cors';
import pool from './db.js';
import { validateTransaction } from './validate.js';


const app = express(); // <- Server object, the thing that you will attach your routes to and eventually tell to listen 
const PORT = 3000; 

app.use(express.json()); //server understands the data the browser sends to it

// this tells my backend that it can communicate with my frontend to avoid a CORS error
app.use(cors({
    origin: 'http://localhost:5173', 
}));

//test route
app.get('/', (req,res) => {
    res.send('Jeremys AI dashboard'); 
}); 

// status page that checks whether i can reach the database
app.get("/api/health/db", async (_req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ status: "ok", time: result.rows[0].now });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Database unavailable" });
  }
});

// aligns the react transaction shape with the server 
app.get("/api/transactions", async (_req, res) => {
  try {
    const result = await pool.query(`SELECT id, amount::float8 AS amount, to_char(transaction_date, 'YYYY-MM-DD') AS date, type, category, priority, description, is_recurring AS "isRecurring" FROM transactions ORDER BY transaction_date DESC, created_at DESC`);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load transactions" });
  }
});

app.post("/api/transactions", async (req, res) => {
  const error = validateTransaction(req.body ?? {});
  if (error) {
    res.status(400).json({ error });
    return;
  }

  const { amount, date, type, category, priority, description, isRecurring } =
    req.body;

  try {
    const result = await pool.query(
      `INSERT INTO transactions
         (amount, transaction_date, type, category, priority, description, is_recurring)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id`,
      [amount, date, type, category, priority, description ?? null, isRecurring]
    );
    res.status(201).json({ id: result.rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save transaction" });
  }
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);

}); 

