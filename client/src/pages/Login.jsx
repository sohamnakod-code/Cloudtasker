import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { BrainCircuit, Mail, Lock, ArrowRight } from "lucide-react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post("https://cloudtasker-s6d3.onrender.com/login", { email, password });
            login(res.data.token);
            navigate("/dashboard");
        } catch (err) {
            alert("Login failed! Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background text-text p-4">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center opacity-10 dark:opacity-5"></div>
            
            <div className="z-10 w-full max-w-md p-8 rounded-3xl glass shadow-2xl backdrop-blur-xl border border-glass-border animate-slide-up">
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-primary/20 p-4 rounded-full mb-4 ring-2 ring-primary/50">
                        <BrainCircuit size={40} className="text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                        CloudTasker AI
                    </h2>
                    <p className="text-textMuted mt-2 text-sm text-center">
                        Welcome back to your professional intelligence workspace
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-textMuted mb-2">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-textMuted" size={20} />
                            <input 
                                type="email" 
                                required
                                placeholder="you@workspace.ai" 
                                className="w-full bg-surface/50 border border-border-color rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-primary transition-all backdrop-blur-sm"
                                onChange={e => setEmail(e.target.value)} 
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-textMuted mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-textMuted" size={20} />
                            <input 
                                type="password"
                                required 
                                placeholder="••••••••" 
                                className="w-full bg-surface/50 border border-border-color rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-primary transition-all backdrop-blur-sm"
                                onChange={e => setPassword(e.target.value)} 
                            />
                        </div>
                    </div>

                    <button 
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 mt-4 bg-gradient-to-r from-primary to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg shadow-primary/30 transition-all flex justify-center items-center gap-2 group"
                    >
                        {loading ? 'Authenticating...' : 'Access Workspace'} 
                        {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                    </button>
                </form>
            </div>
        </div>
    );
}