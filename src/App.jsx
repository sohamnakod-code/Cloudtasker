import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");

  // fetch notes
  useEffect(() => {
    axios.get("http://localhost:5000/notes")
      .then(res => setNotes(res.data));
  }, []);

  // add note
  const addNote = () => {
    axios.post("http://localhost:5000/notes", { title })
      .then(res => setNotes([...notes, res.data]));
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