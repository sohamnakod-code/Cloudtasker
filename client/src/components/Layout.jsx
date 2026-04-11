import { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AIWorkspaceContext } from '../context/AIWorkspaceContext';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout({ children }) {
    const { focusMode } = useContext(AIWorkspaceContext);

    return (
        <div className="flex bg-background text-text h-screen w-full overflow-hidden antialiased transition-colors duration-300">
            <AnimatePresence>
                {!focusMode && (
                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 320, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ ease: "easeInOut", duration: 0.3 }}
                        className="flex-shrink-0"
                    >
                        <Sidebar />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex flex-col flex-1 relative overflow-hidden">
                <Header />
                <main className="flex-1 overflow-y-auto no-scrollbar relative w-full h-full p-4 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
