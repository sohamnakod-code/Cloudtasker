import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");

  // 1. Fetch notes on page load (Refresh fix)
  useEffect(() => {
    axios.get("https://cloudtasker-s6d3.onrender.com/notes")
      .then(res => {
        setNotes(res.data);
      })
      .catch(err => console.log("Fetch error:", err));
  }, []);

  // 2. Add note function
  const addNote = () => {
    if (!title) return alert("Kuch toh likho bhai!");

    axios.post("https://cloudtasker-s6d3.onrender.com/notes", { title })
      .then(res => {
        setNotes([...notes, res.data]);
        setTitle(""); // Input box khali karega
      })
      .catch(err => console.log("Error adding note:", err));
  };

  return (
    <div style={{ padding: 20, maxWidth: "400px", margin: "0 auto" }}>
      <h1>Cloud Notes</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Enter note"
          value={title} // Ye zaroori hai input clear karne ke liye
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        />
        <button onClick={addNote} style={{ padding: "8px 15px" }}>Add</button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {notes.map(n => (
          <li key={n._id} style={{
            background: "#f4f4f4",
            padding: "10px",
            marginBottom: "5px",
            borderRadius: "5px"
          }}>
            {n.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;