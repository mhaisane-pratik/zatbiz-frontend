'use client';

import { useState, useEffect, useRef } from 'react';
import { api } from '@/services/api';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  action?: string;
  actionPayload?: any;
  applied?: boolean;
}

interface AiSidekickProps {
  context: 'dashboard' | 'builder';
  activeBlockType?: string | null;
  activeBlockId?: string | null;
  onExecuteAction?: (action: string, payload: any) => void;
}

const QUICK_SUGGESTIONS = {
  dashboard: [
    { text: 'Which template is best for portfolios?', query: 'Which template is best for portfolios?' },
    { text: 'Help me choose a storefront template', query: 'Recommend a storefront template' },
    { text: 'How do I publish my page?', query: 'how to publish' }
  ],
  builder: [
    { text: 'Write coffee shop banner copy ☕', query: 'write coffee shop hero copy' },
    { text: 'Write gym club features 💪', query: 'write copy for a gym' },
    { text: 'Add a Pricing block 💳', query: 'add pricing cards block' },
    { text: 'Change theme to Sunset Glow 🌅', query: 'change theme to sunset' }
  ]
};

export default function AiSidekick({ context, activeBlockType, onExecuteAction }: AiSidekickProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: context === 'dashboard' 
        ? "Hello! I am your ZATBIZ Sidekick. I can help recommend starting templates, explain features, and write company descriptions. Ask me anything!"
        : "Hey there! I am your AI Sidekick. I can help draft copy, write features list, insert blocks, or adjust layout themes directly on this canvas. Type a command to test it!"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pulse, setPulse] = useState(true);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Date.now() + '-user',
      sender: 'user',
      text: textToSend
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const data = await api.ai.chat(textToSend, context, activeBlockType);
      
      const aiMsg: Message = {
        id: Date.now() + '-ai',
        sender: 'ai',
        text: data.answer,
        action: data.action,
        actionPayload: data.actionPayload,
        applied: false
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.warn('AI chat backend fetch failed, falling back to client-side simulation:', err);
      
      const data = getSimulatedAiResponse(textToSend, context, activeBlockType);
      
      const aiMsg: Message = {
        id: Date.now() + '-ai',
        sender: 'ai',
        text: data.answer,
        action: data.action,
        actionPayload: data.actionPayload,
        applied: false
      };

      setMessages((prev) => [...prev, aiMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen) setPulse(false);
  }, [isOpen]);

  useEffect(() => {
    const handleOpenSidekick = (e: Event) => {
      const customEvent = e as CustomEvent;
      setIsOpen(true);
      if (customEvent.detail?.query) {
        handleSend(customEvent.detail.query);
      }
    };

    window.addEventListener('open-ai-sidekick', handleOpenSidekick);
    return () => {
      window.removeEventListener('open-ai-sidekick', handleOpenSidekick);
    };
  }, [handleSend]);

  const handleAction = (msgId: string, action: string, payload: any) => {
    if (onExecuteAction) {
      onExecuteAction(action, payload);
      setMessages((prev) => 
        prev.map((m) => m.id === msgId ? { ...m, applied: true } : m)
      );
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-40 flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#6366f1] to-[#4f46e5] hover:from-[#585af2] hover:to-[#4338ca] text-white font-bold rounded-full shadow-lg transition hover:scale-105 active:scale-95 cursor-pointer select-none ${
          pulse ? 'animate-bounce' : ''
        }`}
      >
        <span className="text-base select-none">✨</span>
        <span className="text-xs tracking-wide">ZATBIZ Sidekick</span>
      </button>

      <div
        className={`fixed top-16 right-0 bottom-0 w-full max-w-[380px] bg-white/95 backdrop-blur-md border-l border-slate-200 shadow-2xl z-40 transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-indigo-50/20">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 shadow-[0_0_8px_#4f46e5] animate-pulse" />
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">AI Sidekick</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Shopify-Style Assistant</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer font-bold"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 px-1">
                {msg.sender === 'user' ? 'You' : 'Sidekick'}
              </span>

              <div
                className={`max-w-[85%] px-4 py-3 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-none shadow-md font-medium'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm font-medium'
                }`}
              >
                <p className="whitespace-pre-line">{msg.text}</p>

                {msg.sender === 'ai' && msg.action && msg.action !== 'NONE' && (
                  <div className="mt-3 pt-3 border-t border-slate-150 flex flex-col gap-2">
                    <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                      Suggested Action
                    </div>
                    <div className="p-2.5 bg-slate-50 border border-slate-200/50 rounded-lg text-[10px] text-slate-655 font-bold space-y-1">
                      {msg.action === 'UPDATE_CONTENT' && (
                        <>
                          <div className="truncate">🎯 Title: {msg.actionPayload.title}</div>
                          {msg.actionPayload.subtitle && (
                            <div className="text-slate-400 font-semibold truncate">
                              {msg.actionPayload.subtitle}
                            </div>
                          )}
                        </>
                      )}
                      {msg.action === 'ADD_BLOCK' && (
                        <div>➕ Add Block: {msg.actionPayload.blockType}</div>
                      )}
                      {msg.action === 'SET_THEME' && (
                        <div>🎨 Set Block Theme: {msg.actionPayload.theme}</div>
                      )}
                    </div>

                    <button
                      disabled={msg.applied}
                      onClick={() => handleAction(msg.id, msg.action!, msg.actionPayload)}
                      className={`w-full py-2 text-[10px] font-bold rounded-lg transition shadow-sm text-center cursor-pointer ${
                        msg.applied
                          ? 'bg-slate-100 text-slate-400 border border-slate-200/50 cursor-default'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      }`}
                    >
                      {msg.applied ? '✓ Applied successfully' : 'Apply Suggestion'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex flex-col items-start">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 px-1">
                Sidekick
              </span>
              <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1 items-center">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="px-4 py-2 bg-slate-50 border-t border-slate-100">
          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">
            Ask Sidekick
          </div>
          <div className="flex flex-wrap gap-1.5 max-h-[85px] overflow-y-auto">
            {QUICK_SUGGESTIONS[context].map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(s.query)}
                className="px-2.5 py-1 text-[10px] font-semibold bg-white border border-slate-200 hover:border-indigo-400 text-slate-600 hover:text-indigo-600 rounded-full shadow-sm transition whitespace-nowrap cursor-pointer"
              >
                {s.text}
              </button>
            ))}
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="p-3 bg-white border-t border-slate-150 flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AI Sidekick..."
            className="flex-1 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white rounded-full px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 outline-none transition"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="w-9 h-9 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 disabled:bg-slate-100 disabled:text-slate-400 disabled:scale-100 transition cursor-pointer"
          >
            ➔
          </button>
        </form>
      </div>
    </>
  );
}

function getSimulatedAiResponse(message: string, context: 'dashboard' | 'builder', activeBlockType?: string | null) {
  const msg = message.trim().toLowerCase();
  const data = {
    answer: '',
    action: 'NONE',
    actionPayload: {} as any
  };

  if (msg.includes('coffee') || msg.includes('cafe')) {
    data.answer = "Here is a cozy coffee shop branding concept I generated locally for your website. Click 'Apply Suggestion' to update the selected layout section instantly!";
    data.action = 'UPDATE_CONTENT';
    data.actionPayload = {
      title: "Bean & Brew Artisans",
      subtitle: "Artisanal organic coffee beans roasted locally and brewed with pure precision.",
      btn1Text: "Order Online",
      btn2Text: "Our Roast Menu"
    };
  } 
  else if (msg.includes('gym') || msg.includes('fit') || msg.includes('sport')) {
    data.answer = "I've drafted a premium high-energy heading and subtitle layout suited for fitness coaches and gym studios. Click 'Apply' to load it into the active block.";
    data.action = 'UPDATE_CONTENT';
    data.actionPayload = {
      title: "Apex Velocity Gym",
      subtitle: "Premium training gear, elite coaching staff, and advanced workout tracks to break limits.",
      btn1Text: "Claim Free Pass",
      btn2Text: "Browse Classes"
    };
  }
  else if (msg.includes('pricing') || msg.includes('price')) {
    data.answer = "Sure thing! I am adding a customizable Pricing Cards block to your page layout right now. You can edit the individual plans in the right sidebar.";
    data.action = 'ADD_BLOCK';
    data.actionPayload = {
      blockType: 'pricing'
    };
  }
  else if (msg.includes('faq') || msg.includes('question')) {
    data.answer = "Adding a collapsible FAQ Accordion block to answer customer concerns. You can configure questions and replies in the right-side control editor.";
    data.action = 'ADD_BLOCK';
    data.actionPayload = {
      blockType: 'faq'
    };
  }
  else if (msg.includes('portfolio') || msg.includes('creative')) {
    if (context === 'dashboard') {
      data.answer = "I highly recommend the **Creative Agency** or **Personal Portfolio** templates for designers. The portfolio template includes a clean profile splash hero, visual grid projects list, and minimal footer rows.";
    } else {
      data.answer = "Here is a sleek copywriting card preset crafted for portfolios and designer showcases. Tap the apply link to test it on your canvas.";
      data.action = 'UPDATE_CONTENT';
      data.actionPayload = {
        title: "Sleek Shapes, Creative Focus",
        subtitle: "We help modern startups stand out through balanced typography, warm earth color tones, and glassmorphic micro-layouts.",
        btn1Text: "View Case Studies"
      };
    }
  }
  else if (msg.includes('theme') || msg.includes('style') || msg.includes('color')) {
    if (msg.includes('sunset') || msg.includes('orange')) {
      data.answer = "Swapping the active block preset style over to **Sunset Glow** HSL pastel gradient tones.";
      data.action = 'SET_THEME';
      data.actionPayload = { theme: 'sunset' };
    } else if (msg.includes('sky') || msg.includes('blue') || msg.includes('emerald')) {
      data.answer = "Transitioning active section theme palette over to **Emerald Sky** warm water blues.";
      data.action = 'SET_THEME';
      data.actionPayload = { theme: 'deepblue' };
    } else if (msg.includes('purple') || msg.includes('cosmic')) {
      data.answer = "Applying the vibrant **Cosmic Orchid** theme preset onto the selected visual block.";
      data.action = 'SET_THEME';
      data.actionPayload = { theme: 'purple' };
    } else if (msg.includes('slate') || msg.includes('light') || msg.includes('gray')) {
      data.answer = "Reverting active layout selection back to the minimalist **Light Slate** theme.";
      data.action = 'SET_THEME';
      data.actionPayload = { theme: 'slate' };
    } else {
      data.answer = "You can swap visual block presets using these styles: **Light Slate** (standard white), **Emerald Sky** (indigo-emerald glow), **Cosmic Orchid** (purple shades), or **Sunset Glow** (warm orange gradients). Which one should I set?";
    }
  }
  else if (msg.includes('publish') || msg.includes('save')) {
    data.answer = "To publish your website, simply click the **Publish Page** button in the top bar. Your page layout is saved to Spring Boot JPA and is instantly rendered live on the public preview URL!";
  }
  else if (msg.includes('help') || msg.includes('how to') || msg.includes('work')) {
    data.answer = "I am your ZATBIZ AI Sidekick! You can chat with me to help generate copy, select layout presets, or perform actions. Try typing: \n- *'write a coffee shop banner'*\n- *'add a pricing block'*\n- *'change theme to sunset'*";
  }
  else {
    data.answer = `I understand you are working on your ${activeBlockType || 'page'} layout. I can help you draft copywriting details or insert block components. Try asking me: *'write a copy for a fitness club'* or *'add pricing card block'*!`;
  }

  return data;
}
