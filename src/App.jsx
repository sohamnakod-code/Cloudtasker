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
    return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: '#f8fafc',
      fontFamily: 'sans-serif',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{
          textAlign: 'center',
          fontSize: '3rem',
          marginBottom: '40px',
          background: 'linear-gradient(to right, #38bdf8, #818cf8)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Cloud AI Notes
        </h1>

        {/* Input Box */}
        <div style={{
          background: 'rgba(30, 41, 59, 0.7)',
          padding: '20px',
          borderRadius: '15px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)',
          marginBottom: '30px'
        }}>
          <textarea
            placeholder="Write a note or a topic for AI..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              color: 'white',
              fontSize: '1.1rem',
              outline: 'none',
              resize: 'none',
              marginBottom: '10px'
            }}
            rows="3"
          />
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={addNote} style={{
              flex: 1,
              padding: '12px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: '#3b82f6',
              color: 'white',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              Save Note
            </button>
            <button style={{
              flex: 1,
              padding: '12px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: '#8b5cf6',
              color: 'white',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              ✨ AI Generate
            </button>
          </div>
        </div>

        {/* Notes List */}
        <div style={{ display: 'grid', gap: '15px' }}>
          {notes.map(n => (
            <div key={n._id} style={{
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '20px',
              borderRadius: '12px',
              borderLeft: '4px solid #3b82f6',
              transition: '0.3s'
            }}>
              <p style={{ margin: 0, lineHeight: '1.6' }}>{n.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

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
    </div >
  );
}

export default App;