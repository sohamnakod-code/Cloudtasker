import { useState, useRef } from 'react';
import { Mic, MicOff } from 'lucide-react';

export default function DictationButton({ onResult, isListening, setIsListening }) {
    const recognitionRef = useRef(null);

    const toggleDictation = () => {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            alert("Your browser does not support Speech Recognition. Try Chrome.");
            return;
        }

        if (isListening) {
            recognitionRef.current?.stop();
            setIsListening(false);
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;

        let finalTranscript = '';

        recognitionRef.current.onresult = (event) => {
            let interimTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }
            // Emit the complete + interim text
            onResult(finalTranscript + interimTranscript);
        };

        recognitionRef.current.onend = () => {
            setIsListening(false);
        };

        recognitionRef.current.start();
        setIsListening(true);
    };

    return (
        <button
            onClick={toggleDictation}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                isListening 
                ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30 animate-pulse' 
                : 'bg-primary/10 text-primary hover:bg-primary/20'
            }`}
            title="Voice Typing"
        >
            {isListening ? <><MicOff size={16} /> Stop </> : <><Mic size={16} /> Dictate</>}
        </button>
    );
}
