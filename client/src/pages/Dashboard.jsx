import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const { logout, user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        // Agar user logged in nahi hai toh wapas bhej do
        if (!user) return navigate("/login");

        axios.get("https://cloudtasker-s6d3.onrender.com/notes")
            .then(res => setNotes(res.data))
            .catch(err => console.log(err));
    }, [user]);

    const addNote = () => {
        axios.post("https://cloudtasker-s6d3.onrender.com/notes", { title })
            .then(res => {
                setNotes([res.data, ...notes]);
                setTitle("");
            });
    };

    return (
        <div style={{ padding: '20px', background: '#0f172a', minHeight: '100vh', color: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
                <h1>My Dashboard</h1>
                <button onClick={() => { logout(); navigate("/login"); }} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}>Logout</button>
            </div>

            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="New Note..."
                    style={{ width: '70%', padding: '10px', borderRadius: '5px', border: 'none' }}
                />
                <button onClick={addNote} style={{ padding: '10px 20px', marginLeft: '10px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '5px' }}>Add</button>

                <div style={{ marginTop: '30px' }}>
                    {notes.map(n => (
                        <div key={n._id} style={{ background: '#1e293b', padding: '15px', borderRadius: '10px', marginBottom: '10px', borderLeft: '4px solid #3b82f6' }}>
                            {n.title}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}