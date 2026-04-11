import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post("https://cloudtasker-s6d3.onrender.com/login", { email, password });
            login(res.data.token);
            navigate("/dashboard");
        } catch (err) {
            alert("Login fail ho gaya bhai! Check email/password.");
        }
    };

    return (
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#0f172a' }}>
            <div style={{ background: '#1e293b', padding: '40px', borderRadius: '15px', color: 'white', width: '350px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>CloudTasker Login</h2>
                <input placeholder="Email" style={styles.input} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" style={styles.input} onChange={e => setPassword(e.target.value)} />
                <button onClick={handleLogin} style={styles.button}>Let's Go 🚀</button>
            </div>
        </div>
    );
}

const styles = {
    input: { width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #334155', background: '#0f172a', color: 'white', outline: 'none' },
    button: { width: '100%', padding: '12px', background: '#3b82f6', border: 'none', color: 'white', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }
};