import { useContext, useState } from 'react';
import { AIWorkspaceContext } from '../context/AIWorkspaceContext';
import { FileText, Plus, Search, Hash, BrainCircuit } from 'lucide-react';

export default function Sidebar() {
    const { notes, activeNote, setActiveNote, addNote, stats } = useContext(AIWorkspaceContext);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredNotes = notes.filter(note => 
        (note.title || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddNote = async () => {
        // Create an empty "Untitled Note"
        const newNote = await addNote("Untitled Note");
        setActiveNote(newNote);
    };

    return (
        <div className="w-80 h-full border-r border-border-color glass flex flex-col pt-4 overflow-hidden">
            {/* Real-time Stats Widget */}
            <div className="px-4 mb-6">
                <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex justify-between items-center">
                    <div>
                        <div className="text-xs text-textMuted uppercase tracking-wider font-semibold">Writing Streak</div>
                        <div className="text-2xl font-bold flex items-center gap-2">🔥 {stats.streaks} days</div>
                    </div>
                    <div className="text-right">
                        <div className="text-xs text-textMuted uppercase tracking-wider font-semibold">AI Insights</div>
                        <div className="text-2xl font-bold text-primary flex items-center gap-1"><BrainCircuit size={20}/> {stats.insights}</div>
                    </div>
                </div>
            </div>

            {/* Smart Search */}
            <div className="px-4 mb-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-textMuted" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search notes..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-black/5 dark:bg-white/5 border border-border-color rounded-lg py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                    />
                </div>
            </div>

            <div className="px-4 mb-4 flex justify-between items-center">
                <h2 className="text-sm font-semibold text-textMuted uppercase tracking-wider">Your Notes</h2>
                <button 
                    onClick={handleAddNote}
                    className="p-1.5 bg-primary text-white rounded-md hover:bg-blue-600 transition-colors shadow-lg shadow-primary/20"
                >
                    <Plus size={16} />
                </button>
            </div>

            {/* Notes List */}
            <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-1">
                {filteredNotes.map(note => {
                    const titleLine = (note.title || '').split('\n')[0].substring(0, 40) || 'Untitled Note';
                    // Very simple tag extraction logic for UI demo
                    const hasAiTag = note.title && note.title.includes('#');

                    return (
                        <div 
                            key={note._id}
                            onClick={() => setActiveNote(note)}
                            className={`p-3 rounded-xl cursor-pointer transition-all flex flex-col gap-2 ${
                                activeNote?._id === note._id 
                                ? 'bg-primary/10 border border-primary/30' 
                                : 'hover:bg-black/5 dark:hover:bg-white/5 border border-transparent'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <FileText size={18} className={activeNote?._id === note._id ? 'text-primary' : 'text-textMuted'} />
                                <span className="font-medium text-sm truncate">{titleLine}</span>
                            </div>
                            
                            {hasAiTag && (
                                <div className="ml-7 flex gap-2 text-xs text-primary bg-primary/10 w-fit px-2 py-0.5 rounded-full items-center">
                                    <Hash size={10} /> Detected Tags
                                </div>
                            )}
                        </div>
                    );
                })}
                {filteredNotes.length === 0 && (
                     <div className="text-center text-sm text-textMuted py-8">
                        No notes found. Create one!
                    </div>
                )}
            </div>
        </div>
    );
}
