import { motion } from 'framer-motion';

export default function AnimatedBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none bg-[#030712] z-0">
            {/* Dark mesh background */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
            
            {/* Animated glowing orbs */}
            <motion.div 
                animate={{ 
                    x: [0, 50, -50, 0], 
                    y: [0, -50, 50, 0],
                    scale: [1, 1.2, 0.8, 1]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-600/30 rounded-full blur-[100px]"
            />
            
            <motion.div 
                animate={{ 
                    x: [0, -60, 60, 0], 
                    y: [0, 60, -60, 0],
                    scale: [1, 0.8, 1.2, 1]
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/30 rounded-full blur-[100px]"
            />

            <motion.div 
                animate={{ 
                    x: [0, 100, -100, 0], 
                    scale: [1, 1.5, 1]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px]"
            />
        </div>
    );
}
