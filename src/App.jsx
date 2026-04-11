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

  import { useState, useEffect } from "react"; // upar ye import check karlo
  import axios from "axios";

  // Component ke andar:
  function App() {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");

    // 1. Ye naya code add karo notes fetch karne ke liye
    useEffect(() => {
      axios.get("https://cloudtasker-s6d3.onrender.com/notes")
        .then(res => {
          setNotes(res.data); // Database se aaye hue notes state mein set honge
        })
        .catch(err => console.log("Fetch error:", err));
    }, []); // [] ka matlab page load pe sirf ek baar chalega

    // 2. Add note function ko bhi update kar lo (Title clear karne ke liye)
    const addNote = () => {
      if (!title) return alert("Note toh likho bhai!");

      axios.post("https://cloudtasker-s6d3.onrender.com/notes", { title })
        .then(res => {
          setNotes([...notes, res.data]);
          setTitle(""); // Note add hote hi input box khali ho jayega
        })
        .catch(err => console.log(err));
    };

    // ... baaki ka return code
  }

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