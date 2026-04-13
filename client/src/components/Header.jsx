import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import { AIWorkspaceContext } from '../context/AIWorkspaceContext';
import { Moon, Sun, Maximize2, Minimize2, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { focusMode, setFocusMode } = useContext(AIWorkspaceContext);
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="flex justify-between items-center py-5 px-8 border-b border-border-color/40 bg-surface/30 backdrop-blur-3xl z-10 sticky top-0 relative">
            <h1 className="text-xl font-display font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400 drop-shadow-sm flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-gradient-to-br from-primary to-purple-500 shadow-glow-primary flex items-center justify-center text-white text-xs font-black">C</span>
                CloudTasker Pro
            </h1>
            
            <div className="flex items-center gap-3">
                <button 
                    onClick={() => setFocusMode(!focusMode)} 
                    className={`p-2.5 rounded-xl border transition-all duration-300 shadow-sm
                        ${focusMode ? 'bg-primary border-primary text-background shadow-glow-primary hover:bg-primary/90' : 'bg-surface/50 border-border-color text-textMuted hover:text-text hover:border-textMuted/30 hover:bg-black/5 dark:hover:bg-white/5'}
                    `}
                    title="Toggle Focus Mode"
                >
                    {focusMode ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                </button>
                
                <button 
                    onClick={toggleTheme} 
                    className="p-2.5 rounded-xl bg-surface/50 border border-border-color text-textMuted hover:text-text hover:border-textMuted/30 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                    title="Toggle Theme"
                >
                    {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>

                <div className="w-[1px] h-6 bg-border-color mx-1"></div>

                <button 
                    onClick={handleLogout}
                    className="group flex items-center justify-center w-10 h-10 rounded-xl bg-red-500/5 text-red-500/80 hover:bg-red-500 hover:text-white border border-red-500/20 hover:border-red-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)] transition-all duration-300"
                    title="Logout"
                >
                    <LogOut size={18} className="transition-transform group-hover:scale-110" />
                </button>
            </div>
        </div>
    );
}
