import express from 'express'; // package exports 1 main function as default, then name it whatever
import cors from 'cors';

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


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);

}); 

