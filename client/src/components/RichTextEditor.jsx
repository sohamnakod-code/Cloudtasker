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
        <div className="w-full h-full lg:max-w-4xl mx-auto flex flex-col bg-surface rounded-2xl border border-glass-border shadow-2xl overflow-hidden glass animate-fade-in">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border-color">
                <input 
                    type="text" 
                    value={title} 
                    onChange={handleTitleChange} 
                    placeholder="Note Title" 
                    className="text-2xl font-bold bg-transparent outline-none w-full text-text focus:border-b focus:border-primary/50 mr-4 transition-colors"
                />
                <button 
                    onClick={handleDelete}
                    className="p-2 text-textMuted hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors flex-shrink-0 flex gap-2 items-center text-sm font-medium"
                    title="Delete Note"
                >
                    <Trash2 size={18} />
                </button>
            </div>
            
            <AIToolbar 
                // strip HTML tags to send raw text to AI
                editorContent={editor?.getText() || ''} 
                onUpdateContent={handleAIUpdateContent} 
            />
            
            <div className="flex-1 overflow-y-auto p-6 md:p-10 relative">
                <div className="absolute top-4 right-4 flex gap-3 z-10">
                    <DictationButton 
                        onResult={handleDictationResult} 
                        isListening={isListening} 
                        setIsListening={setIsListening} 
                    />
                    <div className="text-xs text-textMuted flex items-center gap-1 bg-surface p-1.5 rounded border border-border-color">
                        {isSaving ? 'Saving...' : <><Save size={14}/> Saved</>}
                    </div>
                </div>

                <div className="prose dark:prose-invert max-w-none mt-8 focus:outline-none">
                    <EditorContent editor={editor} />
                </div>
            </div>
        </div>
    );
}
