import { useContext, useState } from 'react';
import { AIWorkspaceContext } from '../context/AIWorkspaceContext';
import { FileText, Plus, Search, Hash, BrainCircuit } from 'lucide-react';

export default function Sidebar() {
    const { notes, activeNote, setActiveNote, addNote, stats } = useContext(AIWorkspaceContext);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredNotes = notes.filter(note => 
        (note.title || '').replace(/<[^>]+>/g, '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddNote = async () => {
        // Create an empty "Untitled Note"
        const newNote = await addNote("Untitled Note");
        setActiveNote(newNote);
    };

    return (
        <div className="w-full h-full border-r border-border-color bg-surface/30 backdrop-blur-3xl flex flex-col pt-6 overflow-hidden relative z-20">
            {/* Real-time Stats Widget */}
            <div className="px-6 mb-8">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 p-5 backdrop-blur-sm group hover:border-primary/40 transition-colors duration-500">
                    <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-primary/20 blur-3xl group-hover:bg-primary/30 transition-all duration-700 pointer-events-none"></div>
                    <div className="flex justify-between items-center relative z-10">
                        <div>
                            <div className="text-[10px] text-primary uppercase tracking-[0.2em] font-bold mb-1">Streak</div>
                            <div className="text-3xl font-display font-light flex items-center gap-2">🔥 {stats.streaks}</div>
                        </div>
                        <div className="text-right">
                            <div className="text-[10px] text-primary uppercase tracking-[0.2em] font-bold mb-1">Insights</div>
                            <div className="text-3xl font-display font-light text-text flex items-end justify-end gap-1"><BrainCircuit size={20} className="text-primary opacity-60 mb-1"/> {stats.insights}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Smart Search */}
            <div className="px-6 mb-6">
                <div className="relative group/search">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-textMuted group-focus-within/search:text-primary transition-colors duration-300" size={16} />
                    <input 
                        type="text" 
                        placeholder="Search workspace..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-black/5 dark:bg-white/5 border border-border-color/50 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-primary/50 focus:bg-transparent transition-all text-sm font-medium placeholder-textMuted/60"
                    />
                </div>
            </div>

            <div className="px-6 mb-4 flex justify-between items-center">
                <h2 className="text-[10px] font-bold text-textMuted uppercase tracking-[0.2em]">All Notes</h2>
                <button 
                    onClick={handleAddNote}
                    className="p-2 bg-text text-background rounded-lg transition-all duration-300 shadow-md hover:shadow-glow-primary hover:bg-primary hover:-translate-y-0.5 group"
                >
                    <Plus size={16} strokeWidth={3} className="transition-transform group-hover:rotate-90 duration-300" />
                </button>
            </div>

            {/* Notes List */}
            <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-1 scrollbar-hide">
                {filteredNotes.map(note => {
                    const cleanTitle = (note.title || '').replace(/<[^>]+>/g, '');
                    const titleLine = cleanTitle.split('\n')[0].substring(0, 40) || 'Untitled Note';
                    const hasAiTag = cleanTitle.includes('#');

                    return (
                        <div 
                            key={note._id}
                            onClick={() => setActiveNote(note)}
                            className={`px-4 py-3.5 rounded-xl cursor-pointer transition-all duration-300 flex flex-col gap-2 relative overflow-hidden ${
                                activeNote?._id === note._id 
                                ? 'bg-primary/10 border-transparent shadow-sm' 
                                : 'hover:bg-black/5 dark:hover:bg-white/5 border-transparent opacity-80 hover:opacity-100'
                            }`}
                        >
                            {activeNote?._id === note._id && (
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-md"></div>
                            )}
                            <div className="flex items-center gap-3">
                                <FileText size={16} className={activeNote?._id === note._id ? 'text-primary' : 'text-textMuted/70'} />
                                <span className={`text-sm truncate ${activeNote?._id === note._id ? 'font-semibold text-text' : 'font-medium text-textMuted'}`}>{titleLine}</span>
                            </div>
                            
                            {hasAiTag && (
                                <div className="ml-7 flex gap-1.5 text-[10px] font-bold text-primary bg-primary/10 w-fit px-2 py-0.5 rounded-full items-center tracking-wide uppercase">
                                    <Hash size={10} strokeWidth={3} /> Auto-Tagged
                                </div>
                            )}
                        </div>
                    );
                })}
                {filteredNotes.length === 0 && (
                     <div className="text-center text-xs font-medium text-textMuted py-12 px-6 border border-dashed border-border-color rounded-xl mx-2 mt-4">
                        Press the + button to create a new aesthetic note.
                    </div>
                )}
            </div>
        </div>
    );
}
