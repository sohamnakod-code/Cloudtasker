import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const AIWorkspaceContext = createContext();

export const AIWorkspaceProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [notes, setNotes] = useState([]);
    const [activeNote, setActiveNote] = useState(null);
    const [focusMode, setFocusMode] = useState(false);
    const [stats, setStats] = useState({ streaks: 0, insights: 0 });

    useEffect(() => {
        if (!user) return;
        // Fetch notes from the backend
        axios.get("https://cloudtasker-s6d3.onrender.com/notes")
            .then(res => {
                setNotes(res.data);
                // Calculate pseudo streak based on note count for now
                setStats(prev => ({ ...prev, streaks: Math.max(1, Math.floor(res.data.length / 3)) }));
            })
            .catch(err => console.error("Error fetching notes:", err));
    }, [user]);

    const incrementInsights = () => {
        setStats(prev => ({ ...prev, insights: prev.insights + 1 }));
    };

    const addNote = (title) => {
        return axios.post("https://cloudtasker-s6d3.onrender.com/notes", { title })
            .then(res => {
                setNotes([res.data, ...notes]);
                return res.data;
            });
    };

    // Updating a note using its title as the main content storage (per user feedback)
    const updateNote = (id, newTitle) => {
        return axios.put(`https://cloudtasker-s6d3.onrender.com/notes/${id}`, { title: newTitle })
            .then(res => {
                setNotes(notes.map(n => n._id === id ? { ...n, title: newTitle } : n));
            });
    };

    const deleteNote = (id) => {
        return axios.delete(`https://cloudtasker-s6d3.onrender.com/notes/${id}`)
            .then(() => {
                setNotes(notes.filter(n => n._id !== id));
                if (activeNote?._id === id) setActiveNote(null);
            });
    };

    return (
        <AIWorkspaceContext.Provider value={{ 
            notes, 
            activeNote, 
            setActiveNote, 
            focusMode, 
            setFocusMode, 
            stats, 
            incrementInsights,
            addNote,
            updateNote,
            deleteNote
        }}>
            {children}
        </AIWorkspaceContext.Provider>
    );
};
