import { useEffect, useState } from "react";
import "./App.css";

//functional component - a reusable chunk of UI, written in a function
// "When the page first loads, the frontend sends a request to the backend
// asking 'are you there,'
// and once it gets an answer back, it displays that answer on the page
// proving the two programs are actually talking to each other over the network."
function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/")
      .then((res) => res.text())
      .then((data) => setMessage(data));
  }, []);

  return (
    <>
      <header>
        <h1> AI Personal Finance Dashboard</h1>
      </header>

      <main>
        <p> Big man {message}</p>
      </main>

      <footer>
        <p>2026 jeremy is cooler than your mumma</p>
      </footer>
    </>
  );
}
export default App;
// allows App to be importable elsewhere
