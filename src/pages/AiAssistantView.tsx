import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  BookOpen,
  Bot,
  User,
  RotateCcw,
  Lightbulb,
  CheckCircle2,
  Copy,
  Check,
} from 'lucide-react';
import { INITIAL_CHAT_MESSAGES, AI_KNOWLEDGE_BASE } from '../data/mockData';
import { ChatMessage } from '../types';

export const AiAssistantView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const quickPrompts = [
    "Explain Dijkstra's Algorithm step-by-step for IA-2",
    "What is the syllabus weightage for Computer Networks Module 3?",
    "How to calculate VTU SGPA from credits?",
    "Show tips for Agile Sprint Planning Assignment",
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputPrompt).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsLoading(true);

    const lower = text.toLowerCase();
    let reply = '';
    let followUps: string[] = [];

    if (lower.includes('dijkstra') || lower.includes('algorithm') || lower.includes('daa')) {
      reply = AI_KNOWLEDGE_BASE.dijkstra.answer;
      followUps = AI_KNOWLEDGE_BASE.dijkstra.followUps;
    } else if (lower.includes('syllabus') || lower.includes('network') || lower.includes('module')) {
      reply = AI_KNOWLEDGE_BASE.syllabus.answer;
      followUps = AI_KNOWLEDGE_BASE.syllabus.followUps;
    } else if (lower.includes('sgpa') || lower.includes('cgpa') || lower.includes('credit')) {
      reply = AI_KNOWLEDGE_BASE.sgpa.answer;
      followUps = AI_KNOWLEDGE_BASE.sgpa.followUps;
    } else if (lower.includes('agile') || lower.includes('sprint') || lower.includes('assignment')) {
      reply = AI_KNOWLEDGE_BASE.agile.answer;
      followUps = AI_KNOWLEDGE_BASE.agile.followUps;
    } else {
      reply = `**JCET Academic AI Assistant Response**:

Regarding your query on "${text}":
• **VTU Curriculum Context**: Relevant to 6th Sem B.E. (Computer Science & Engineering, 2022 Scheme).
• **Core Takeaway**: Ensure you refer to Course Outcome (CO-3) and Unit 2 standard definitions.
• **Exam Strategy**: Always supplement answers with standard VTU architectural block diagrams or pseudo-code to secure maximum step-marks in IA-2.
• **Recommended File**: Check Prof. Ananya Hegde's module notes uploaded in the Academic Resources tab.`;
      followUps = [
        "Explain step-by-step with an example",
        "Show previous year IA questions on this topic",
        "Give me a 5-minute study cheatsheet",
      ];
    }

    setTimeout(() => {
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedFollowUps: followUps,
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsLoading(false);
    }, 550);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col bg-white rounded-3xl border border-[#E8DDF5] shadow-xs overflow-hidden animate-in fade-in duration-300">
      
      {/* Top AI Bar */}
      <div className="px-6 py-4 border-b border-[#E8DDF5] bg-[#F8F7FB] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#E8DDF5] flex items-center justify-center text-[#553b7d] shadow-2xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-[#252532] font-['Space_Grotesk']">
                JCET Academic AI Assistant
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-[#D5EBE5] text-[#1b5e4f] text-[10px] font-bold">
                Online • VTU 2022 Scheme
              </span>
            </div>
            <p className="text-xs text-neutral-500">
              Interactive tutor for doubts, IA exam blueprints, and assignment clarification
            </p>
          </div>
        </div>

        <button
          onClick={() => setMessages(INITIAL_CHAT_MESSAGES)}
          className="p-2 rounded-xl text-neutral-500 hover:text-neutral-800 hover:bg-white text-xs font-semibold flex items-center gap-1.5 transition-colors border border-transparent hover:border-[#E8DDF5]"
          title="Reset Conversation"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Chat Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 max-w-3xl ${
              msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                msg.sender === 'user'
                  ? 'bg-[#C8B4E8] text-[#252532]'
                  : 'bg-[#E8DDF5] text-[#553b7d]'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`p-4 rounded-3xl text-xs sm:text-sm leading-relaxed space-y-2 relative group ${
                msg.sender === 'user'
                  ? 'bg-[#252532] text-white rounded-tr-none'
                  : 'bg-[#F8F7FB] border border-[#E8DDF5] text-neutral-800 rounded-tl-none'
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.text}</div>

              {/* Follow-up suggestions */}
              {msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                <div className="pt-2 mt-2 border-t border-[#E8DDF5]/80 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                    Suggested Next Questions:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {msg.suggestedFollowUps.map((fu, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(fu)}
                        className="text-xs px-2.5 py-1 rounded-lg bg-white border border-[#E8DDF5] hover:bg-[#E8DDF5] text-[#553b7d] font-medium transition-colors text-left"
                      >
                        {fu}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div
                className={`text-[10px] flex items-center justify-between pt-1 ${
                  msg.sender === 'user' ? 'text-neutral-400' : 'text-neutral-400'
                }`}
              >
                <span>{msg.timestamp}</span>
                {msg.sender === 'assistant' && (
                  <button
                    onClick={() => copyToClipboard(msg.text, msg.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-neutral-500 hover:text-neutral-800"
                    title="Copy response"
                  >
                    {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 max-w-xl">
            <div className="w-8 h-8 rounded-xl bg-[#E8DDF5] flex items-center justify-center text-[#553b7d]">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-4 rounded-3xl bg-[#F8F7FB] border border-[#E8DDF5] text-xs text-neutral-500 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#7c51b0] animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-[#7c51b0] animate-bounce [animation-delay:0.2s]" />
              <div className="w-2 h-2 rounded-full bg-[#7c51b0] animate-bounce [animation-delay:0.4s]" />
              <span>Analyzing VTU 2022 scheme knowledge base...</span>
            </div>
          </div>
        )}
      </div>

      {/* Suggested prompts strip above input */}
      <div className="px-4 py-2 bg-[#F8F7FB]/70 border-t border-[#E8DDF5] flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
        <Lightbulb className="w-4 h-4 text-[#7c51b0] shrink-0" />
        {quickPrompts.map((p, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(p)}
            className="text-xs px-3 py-1 rounded-xl bg-white border border-[#E8DDF5] hover:bg-[#E8DDF5] text-neutral-700 whitespace-nowrap transition-colors"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Bottom Input Field */}
      <div className="p-4 border-t border-[#E8DDF5] bg-white shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="Ask about formulas, algorithm steps, IA-2 topics, or assignment guidelines..."
            className="w-full pl-4 pr-14 py-3 rounded-2xl bg-[#F8F7FB] border border-[#E8DDF5] text-sm text-[#252532] placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#C8B4E8] focus:bg-white transition-all shadow-2xs"
          />
          <button
            type="submit"
            disabled={!inputPrompt.trim() || isLoading}
            className="absolute right-2 p-2 rounded-xl bg-[#C8B4E8] hover:bg-[#baa0e2] text-[#252532] disabled:opacity-40 transition-all cursor-pointer"
            aria-label="Send query"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
};
