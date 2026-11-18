import express from 'express'; // package exports 1 main function as default, then name it whatever
import cors from 'cors';
import pool from './db.js';


const app = express(); // <- Server object, the thing that you will attach your routes to and eventually tell to listen 
const PORT = 3000; 


// this tells my backend that it can communicate with my frontend to avoid a CORS error
app.use(cors({
    origin: 'http://localhost:5173', 
}));

//test route
app.get('/', (req,res) => {
    res.send('Messi says your mum is the goat'); 
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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);

}); 

