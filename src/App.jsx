import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");

  // fetch notes
  useEffect(() => {
    axios.get("https://cloudtasker-s6d3.onrender.com")
      .then(res => setNotes(res.data));
  }, []);

  // add note
  const addNote = () => {
    // URL ke peeche /notes lagana zaroori hai
    axios.post("https://cloudtasker-s6d3.onrender.com/notes", { title })
      .then(res => {
        setNotes([...notes, res.data]);
        setTitle(""); // Note add hone ke baad input box khali karne ke liye
      })
      .catch(err => console.log("Error adding note:", err));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Cloud Notes</h1>

      <input
        placeholder="Enter note"
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={addNote}>Add</button>

      <ul>
        {notes.map(n => (
          <li key={n._id}>{n.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;