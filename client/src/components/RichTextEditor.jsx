import { useEffect, useState, useContext, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { AIWorkspaceContext } from '../context/AIWorkspaceContext';
import AIToolbar from './AIToolbar';
import DictationButton from './DictationButton';
import { Save, Trash2 } from 'lucide-react';

export default function RichTextEditor() {
    const { activeNote, updateNote, deleteNote } = useContext(AIWorkspaceContext);
    const [isSaving, setIsSaving] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [title, setTitle] = useState('');
    const saveTimeoutRef = useRef(null);
    const titleTimeoutRef = useRef(null);

    const editor = useEditor({
        extensions: [StarterKit],
        content: activeNote?.content || activeNote?.title || '',
        onUpdate: ({ editor }) => {
            handleAutoSave(editor.getHTML());
        },
    });

    useEffect(() => {
        let initialTitle = activeNote?.title || '';
        if (initialTitle.includes('<')) {
            initialTitle = initialTitle.replace(/<[^>]+>/g, '');
        }
        setTitle(initialTitle);
    }, [activeNote?._id]);

    // Sync editor when activeNote changes
    useEffect(() => {
        if (editor && activeNote) {
            const desiredContent = activeNote.content || activeNote.title || '';
            if (editor.getHTML() !== desiredContent) {
                editor.commands.setContent(desiredContent);
            }
        } else if (editor && !activeNote) {
             editor.commands.setContent('');
        }
    }, [activeNote?._id, editor]);

    const handleTitleChange = (e) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        if (titleTimeoutRef.current) clearTimeout(titleTimeoutRef.current);
        titleTimeoutRef.current = setTimeout(() => {
            updateNote(activeNote._id, { title: newTitle });
        }, 1000);
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this note?')) {
            deleteNote(activeNote._id);
        }
    };

    const handleAutoSave = (newContent) => {
        if (!activeNote) return;

        if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
        
        setIsSaving(true);
        saveTimeoutRef.current = setTimeout(() => {
            updateNote(activeNote._id, { content: newContent }).then(() => {
                setIsSaving(false);
            });
        }, 1000); // 1 sec debounce
    };

    const handleAIUpdateContent = (newContent) => {
        if (!editor || !activeNote) return;
        
        // Use markdown output from Gemini and try to put it straight in (or insert text)
        // Replacing all content to keep it simple, though starterkit doesn't parse MD perfectly without plugins
        // We will insert plain text for simplicity and let them format
        editor.commands.setContent(newContent.replace(/\n/g, '<br>'));
        handleAutoSave(editor.getHTML());
    };

    const handleDictationResult = (text) => {
         if (!editor || !activeNote) return;
         // Append dictated text
         const currentHtml = editor.getHTML();
         const appended = currentHtml + ' ' + text;
         editor.commands.setContent(appended);
         handleAutoSave(editor.getHTML());
    };

    if (!activeNote) {
        return (
            <div className="flex items-center justify-center h-full w-full opacity-50">
                <div className="text-center">
                    <div className="text-6xl mb-4">✍️</div>
                    <h2 className="text-xl font-semibold">Select or create a note</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full lg:max-w-5xl mx-auto flex flex-col bg-surface/40 backdrop-blur-3xl rounded-3xl border border-glass-border shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(255,255,255,0.02)] overflow-hidden animate-fade-in relative">
            
            {/* Stunning Header */}
            <div className="relative group px-10 pt-12 pb-6 border-b border-border-color/30 bg-gradient-to-b from-black/5 dark:from-white/5 to-transparent">
                
                <div className="flex items-start justify-between relative z-10 gap-6">
                    <div className="flex-1">
                        <input 
                            type="text" 
                            value={title} 
                            onChange={handleTitleChange} 
                            placeholder="Untitled Note" 
                            className="text-4xl lg:text-5xl font-black bg-transparent outline-none w-full text-text placeholder-textMuted/30 transition-all tracking-tighter"
                        />
                    </div>
                    
                    <button 
                        onClick={handleDelete}
                        className="group/btn relative flex items-center justify-center w-12 h-12 rounded-2xl bg-surface/50 border border-border-color backdrop-blur-md shadow-sm hover:shadow-lg hover:border-red-500/50 hover:bg-red-500/10 transition-all duration-300 flex-shrink-0 mt-1"
                        title="Delete Note"
                    >
                        <Trash2 size={22} className="text-textMuted group-hover/btn:text-red-500 transition-colors duration-300" />
                    </button>
                </div>
                
                <div className="flex items-center gap-3 mt-6 text-[10px] font-bold text-textMuted uppercase tracking-[0.2em]">
                    <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface/50 border border-border-color backdrop-blur-sm">
                        {isSaving ? <span className="flex gap-2 items-center text-primary"><span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span> Saving...</span> : <><Save size={12} className="opacity-70" /> Saved</>}
                    </span>
                    <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface/50 border border-border-color backdrop-blur-sm">
                        {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                </div>
            </div>
            
            <AIToolbar 
                // strip HTML tags to send raw text to AI
                editorContent={editor?.getText() || ''} 
                onUpdateContent={handleAIUpdateContent} 
            />
            
            <div className="flex-1 overflow-y-auto px-10 py-8 relative bg-transparent scrollbar-hide">
                <div className="absolute top-8 right-10 flex gap-3 z-10">
                    <DictationButton 
                        onResult={handleDictationResult} 
                        isListening={isListening} 
                        setIsListening={setIsListening} 
                    />
                </div>

                <div className="prose prose-lg dark:prose-invert max-w-none focus:outline-none placeholder:text-textMuted/30">
                    <EditorContent editor={editor} />
                </div>
            </div>
        </div>
    );
}
