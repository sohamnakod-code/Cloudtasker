import { useState, useContext } from 'react';
import { GoogleGenAI } from '@google/genai';
import { AIWorkspaceContext } from '../context/AIWorkspaceContext';
import { Sparkles, FileText, Wand2, RefreshCcw, Hash, Loader2 } from 'lucide-react';

// You will need to provide your API key via VITE_GEMINI_API_KEY in .env
// For demo, we are extracting it from Vite's import.meta.env
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "YOUR_API_KEY_HERE";
const ai = new GoogleGenAI({ apiKey: apiKey });

export default function AIToolbar({ editorContent, onUpdateContent }) {
    const { incrementInsights } = useContext(AIWorkspaceContext);
    const [loadingAction, setLoadingAction] = useState(null);

    const callGemini = async (prompt, actionName) => {
        if (!apiKey || apiKey === "YOUR_API_KEY_HERE") {
            alert("Please add your Gemini API Key in .env as VITE_GEMINI_API_KEY");
            return;
        }
        
        if (!editorContent || editorContent.trim() === '') {
            alert("Please write some text first!");
            return;
        }

        setLoadingAction(actionName);
        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });
            const result = response.text;
            onUpdateContent(result);
            incrementInsights();
        } catch (error) {
            console.error(error);
            alert("Error processing AI request. Check console for details.");
        } finally {
            setLoadingAction(null);
        }
    };

    const handleSummarize = () => {
        const prompt = `Summarize the following text into exactly 3 concise bullet points. Provide ONLY the 3 bullet points without any other conversational text:\n\n${editorContent}`;
        callGemini(prompt, 'summarize');
    };

    const handleExpand = () => {
        const prompt = `Act as an expert project planner and creative writer. Take the following text/idea and expand it into a detailed, well-structured format (like a full project plan, article, or detailed notes). Do not include introductory filler text.:\n\n${editorContent}`;
        callGemini(prompt, 'expand');
    };

    const handleTone = (tone) => {
        const prompt = `Rewrite the following text to have a ${tone} tone. Keep the original meaning but adjust the vocabulary and sentence structure to match the requested tone perfectly. Provide ONLY the reworked text.:\n\n${editorContent}`;
        callGemini(prompt, `tone-${tone}`);
    };

    const handleGenerateTags = () => {
        const prompt = `Read the following text and generate 3 to 5 highly relevant one-word tags (hashtags) for it. Format them as #Tag1 #Tag2 #Tag3 at the very end of the text. Return the ORIGINAL text, followed by two newlines, and then the tags.:\n\n${editorContent}`;
        callGemini(prompt, 'tags');
    };

    const Button = ({ action, icon: Icon, label, disabled, onClick }) => (
        <button
            onClick={onClick}
            disabled={disabled || loadingAction !== null}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border border-border-color
                ${loadingAction === action ? 'bg-primary/20 text-primary cursor-not-allowed' : 'bg-surface hover:bg-black/5 dark:hover:bg-white/5'}
            `}
        >
            {loadingAction === action ? <Loader2 size={16} className="animate-spin" /> : <Icon size={16} className="text-purple-500" />}
            {label}
        </button>
    );

    return (
        <div className="flex flex-wrap gap-2 p-3 bg-black/5 dark:bg-white/5 rounded-t-xl border-b border-border-color">
            <Button action="summarize" icon={FileText} label="Summarize" onClick={handleSummarize} />
            <Button action="expand" icon={Sparkles} label="Expand" onClick={handleExpand} />
            
            <div className="flex items-center ml-2 border-l pl-2 border-border-color gap-2">
                <Button action="tone-Professional" icon={Wand2} label="Professional" onClick={() => handleTone('Professional')} />
                <Button action="tone-Casual" icon={RefreshCcw} label="Casual" onClick={() => handleTone('Casual')} />
            </div>

            <div className="flex items-center ml-auto">
                <Button action="tags" icon={Hash} label="Auto-Tag" onClick={handleGenerateTags} />
            </div>
        </div>
    );
}
