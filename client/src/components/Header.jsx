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
        <div className="flex justify-between items-center py-4 px-6 border-b border-border-color glass z-10 sticky top-0">
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                CloudTasker AI
            </h1>
            
            <div className="flex items-center gap-4">
                <button 
                    onClick={() => setFocusMode(!focusMode)} 
                    className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                    title="Toggle Focus Mode"
                >
                    {focusMode ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                </button>
                
                <button 
                    onClick={toggleTheme} 
                    className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                    title="Toggle Theme"
                >
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-sm bg-red-500/10 text-red-500 hover:bg-red-500/20 px-3 py-2 rounded-lg transition-colors"
                >
                    <LogOut size={16} /> Logout
                </button>
            </div>
        </div>
    );
}
