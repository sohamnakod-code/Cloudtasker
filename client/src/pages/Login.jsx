import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { BrainCircuit, Mail, Lock, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedBackground from "../components/AnimatedBackground";

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
            alert("Authentication Failed. Invalid credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden font-sans text-slate-200">
            <AnimatedBackground />

            <div className="z-10 w-full max-w-[420px] px-6">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative rounded-[2.5rem] bg-indigo-950/20 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] p-10 overflow-hidden"
                >
                    {/* Glass glare effect */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                    
                    <div className="text-center mb-10 mt-2">
                        <motion.div 
                            whileHover={{ rotate: 180 }}
                            transition={{ duration: 0.7, ease: "easeInOut" }}
                            className="inline-flex items-center justify-center p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 shadow-[inset_0_0_20px_rgba(255,255,255,0.1)] border border-white/10 mb-6"
                        >
                            <BrainCircuit size={36} className="text-blue-400" />
                        </motion.div>
                        <h2 className="text-3xl font-bold tracking-tight text-white mb-2">
                            Welcome Back
                        </h2>
                        <p className="text-slate-400 text-sm">
                            Unlock the power of your AI Workspace.
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-[13px] font-medium text-slate-300 ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                                <input 
                                    type="email" 
                                    required
                                    placeholder="elon@spacex.com" 
                                    className="w-full bg-black/20 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-white placeholder-slate-600 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all shadow-inner"
                                    onChange={e => setEmail(e.target.value)} 
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[13px] font-medium text-slate-300 ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                                <input 
                                    type="password"
                                    required 
                                    placeholder="••••••••" 
                                    className="w-full bg-black/20 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-white placeholder-slate-600 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all shadow-inner"
                                    onChange={e => setPassword(e.target.value)} 
                                />
                            </div>
                        </div>

                        <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={loading}
                            className="relative w-full py-3.5 mt-4 group overflow-hidden rounded-2xl font-semibold shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)] transition-all"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:opacity-90 transition-opacity"></div>
                            <div className="relative flex items-center justify-center gap-2 text-white">
                                {loading ? (
                                    <Sparkles size={18} className="animate-spin" />
                                ) : (
                                    <>
                                        Enter Workspace <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
                                    </>
                                )}
                            </div>
                        </motion.button>
                    </form>

                    <div className="mt-8 text-center text-sm text-slate-400">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-blue-400 hover:text-blue-300 font-medium transition-colors border-b border-transparent hover:border-blue-400 pb-0.5">
                            Create one
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}