import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { BrainCircuit, Mail, Lock, ArrowRight, UserPlus, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedBackground from "../components/AnimatedBackground";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post("https://cloudtasker-s6d3.onrender.com/signup", {
                email,
                password,
            });
            navigate("/login");
        } catch (err) {
            alert("Signup failed! Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden font-sans text-slate-200">
            <AnimatedBackground />

            <div className="z-10 w-full max-w-[420px] px-6">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="relative rounded-[2.5rem] bg-indigo-950/20 backdrop-blur-2xl border border-white/10 shadow-[0_8px_40px_0_rgba(0,0,0,0.5)] p-10 overflow-hidden"
                >
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
                    
                    <div className="text-center mb-10 mt-2">
                        <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                            className="inline-flex items-center justify-center p-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 shadow-[inset_0_0_20px_rgba(255,255,255,0.1)] border border-white/10 mb-6"
                        >
                            <BrainCircuit size={36} className="text-purple-400" />
                        </motion.div>
                        <h2 className="text-3xl font-bold tracking-tight text-white mb-2">
                            Join CloudTasker
                        </h2>
                        <p className="text-slate-400 text-sm">
                            Create your AI-powered workspace.
                        </p>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-[13px] font-medium text-slate-300 ml-1">Work Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 group-focus-within:text-purple-400 transition-colors" size={18} />
                                <input 
                                    type="email" 
                                    required
                                    placeholder="team@startup.ai" 
                                    className="w-full bg-black/20 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-white placeholder-slate-600 outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all shadow-inner"
                                    onChange={e => setEmail(e.target.value)} 
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[13px] font-medium text-slate-300 ml-1">Secure Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 group-focus-within:text-purple-400 transition-colors" size={18} />
                                <input 
                                    type="password"
                                    required 
                                    placeholder="••••••••" 
                                    className="w-full bg-black/20 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-white placeholder-slate-600 outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all shadow-inner"
                                    onChange={e => setPassword(e.target.value)} 
                                />
                            </div>
                        </div>

                        <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={loading}
                            className="relative w-full py-3.5 mt-6 group overflow-hidden rounded-2xl font-semibold shadow-[0_0_40px_-10px_rgba(168,85,247,0.5)] transition-all"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 group-hover:opacity-90 transition-opacity"></div>
                            <div className="relative flex items-center justify-center gap-2 text-white">
                                {loading ? (
                                    <Sparkles size={18} className="animate-spin" />
                                ) : (
                                    <>
                                        Create Account <UserPlus size={18} className="group-hover:scale-110 transition-transform" />
                                    </>
                                )}
                            </div>
                        </motion.button>
                    </form>

                    <div className="mt-8 text-center text-sm text-slate-400">
                        Already in the system?{" "}
                        <Link to="/login" className="text-purple-400 hover:text-purple-300 font-medium transition-colors border-b border-transparent hover:border-purple-400 pb-0.5">
                            Sign in
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
