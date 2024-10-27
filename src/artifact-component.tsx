import React, { useState, useEffect, useRef } from 'react';
import { Check, Send, Smile, MoreVertical, Phone, Video, Paperclip } from 'lucide-react';

const WhatsAppChat = () => {
  // ... keeping all the state and functions the same ...
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [inputText, setInputText] = useState('');
  const [showCaret, setShowCaret] = useState(false);
  const [isSimulatingTyping, setIsSimulatingTyping] = useState(false);
  const conversationStartedRef = useRef(false);
  const [showReaction, setShowReaction] = useState(false);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);
  const activeKeyRef = useRef(null);

  const conversation = [
    { 
      text: "Hi Yaniv, got your number online, you want to buy the ticket to Varna?", 
      sent: false, 
      typingTime: 2500 
    },
    { 
      text: "Hi! yes I was thinking 555 ILS, works for you?", 
      sent: true,
      simulateTyping: true 
    },
    { 
      text: "cool, this is my Digital Shekel address: 69cb8078-15e0-4464-94e8-6fe77b456f3f", 
      sent: false, 
      typingTime: 3000 
    },
    { 
      text: "no prob, locking money, thanks!", 
      sent: true,
      simulateTyping: true 
    }
  ];

  const scrollToBottom = (force = false) => {
    if (force) {
      setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight);
      }, 100);
    }
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (!conversationStartedRef.current) {
      conversationStartedRef.current = true;
      playConversation();
    }
  }, []);

  useEffect(() => {
    if (isSimulatingTyping) {
      const interval = setInterval(() => {
        setShowCaret(prev => !prev);
      }, 500);
      return () => clearInterval(interval);
    }
    setShowCaret(false);
  }, [isSimulatingTyping]);

  const simulateKeyPress = async (text) => {
    setIsSimulatingTyping(true);
    setShowKeyboard(true);
    setInputText('');
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i].toLowerCase();
      activeKeyRef.current = char;
      setInputText(text.substring(0, i + 1));
      if (inputRef.current) {
        inputRef.current.scrollLeft = inputRef.current.scrollWidth;
      }
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    
    activeKeyRef.current = null;
    await new Promise(resolve => setTimeout(resolve, 200));
    setInputText('');
    setShowKeyboard(false);
    setIsSimulatingTyping(false);
  };

  const addMessage = (text, sent = true, isLast = false) => {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    setMessages(prev => [...prev, { id: prev.length + 1, text, sent, time }]);
    
    if (isLast) {
      setTimeout(() => {
        setShowReaction(true);
      }, 1000);
    }
  };

  const playConversation = async () => {
    for (const [index, message] of conversation.entries()) {
      if (index > 0) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      if (message.simulateTyping) {
        await simulateKeyPress(message.text);
        addMessage(message.text, message.sent, index === conversation.length - 1);
        if (index === conversation.length - 1) {
          scrollToBottom(true);
        }
      } else {
        setIsTyping(true);
        await new Promise(resolve => setTimeout(resolve, message.typingTime));
        setIsTyping(false);
        addMessage(message.text, message.sent);
      }

      await new Promise(resolve => setTimeout(resolve, 500));
    }
  };

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center">
      <div className="w-full max-w-xl mx-auto h-[80vh] relative overflow-hidden" style={{ 
        '--tw-bg-opacity': '1',
        backgroundColor: 'rgb(200 243 200 / var(--tw-bg-opacity))',
        transform: 'scale(1.2)'
      }}>
        {/* Header */}
        <div className="bg-green-700 text-white p-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
              <svg viewBox="0 0 40 40" className="w-full h-full">
                {/* Background */}
                <circle cx="20" cy="20" r="20" fill="#25D366" />
                
                {/* Face */}
                <ellipse cx="20" cy="20" rx="12" ry="14" fill="#FFD5B4" />
                
                {/* Curly Hair */}
                <g fill="#4A332F">
                  {/* Front curls */}
                  <circle cx="13" cy="13" r="3.5" />
                  <circle cx="17" cy="11" r="3.5" />
                  <circle cx="23" cy="11" r="3.5" />
                  <circle cx="27" cy="13" r="3.5" />
                  
                  {/* Top curls */}
                  <circle cx="15" cy="9" r="3" />
                  <circle cx="20" cy="8" r="3" />
                  <circle cx="25" cy="9" r="3" />
                  
                  {/* Side curls */}
                  <circle cx="11" cy="16" r="3" />
                  <circle cx="29" cy="16" r="3" />
                  
                  {/* Back fill for depth */}
                  <circle cx="17" cy="7" r="2.5" />
                  <circle cx="23" cy="7" r="2.5" />
                </g>
                
                {/* Eyes */}
                <g>
                  <ellipse cx="16" cy="20" rx="2" ry="1" 
                          fill="none"
                          stroke="#2D3748"
                          strokeWidth="1.2"
                          strokeLinecap="round" />
                  <circle cx="16" cy="20.5" r="0.8" fill="#2D3748" />
                  
                  <ellipse cx="24" cy="20" rx="2" ry="1"
                          fill="none"
                          stroke="#2D3748"
                          strokeWidth="1.2"
                          strokeLinecap="round" />
                  <circle cx="24" cy="20.5" r="0.8" fill="#2D3748" />
                </g>
                
                {/* Smile */}
                <path d="M16 26.5 Q20 29 24 26.5" 
                      stroke="#2D3748" 
                      strokeWidth="1.2" 
                      strokeLinecap="round" 
                      fill="none" />
                
                {/* Smile */}
                <path d="M15 25.5c2 1.5 8 1.5 10 0" 
                      stroke="#2D3748" 
                      strokeWidth="1.2" 
                      strokeLinecap="round" 
                      fill="none" />
              </svg>
            </div>
            <div>
              <h1 className="font-semibold">Jonathan Seller</h1>
              <p className="text-xs opacity-75">
                {isTyping ? 'typing...' : 'Online'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Video className="w-5 h-5" />
            <Phone className="w-5 h-5" />
            <MoreVertical className="w-5 h-5" />
          </div>
        </div>

        {/* Chat Area */}
        <div className={`p-4 ${showKeyboard ? 'h-96' : 'h-[32rem]'} overflow-y-auto`}>
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex mb-4 ${message.sent ? 'justify-end' : 'justify-start'} relative`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.sent
                    ? 'bg-green-700 rounded-tr-none'
                    : 'bg-white rounded-tl-none'
                }`}
              >
                <p className={`break-all ${message.sent ? 'text-white' : 'text-gray-800'}`}>{message.text}</p>
                <div className="flex items-center justify-end space-x-1 mt-1">
                  <span className={`text-xs ${message.sent ? 'text-green-100/70' : 'text-gray-400'}`}>{message.time}</span>
                  {message.sent && (
                    <div className="flex">
                      <Check className="w-4 h-4 text-sky-300" />
                      <Check className="w-4 h-4 text-sky-300 -ml-3" />
                    </div>
                  )}
                </div>
                {showReaction && index === messages.length - 1 && (
                  <div className="absolute -bottom-6 right-2">
                    <div className="bg-white rounded-full p-1 shadow-sm flex items-center justify-center w-8 h-8">
                      <div className="text-lg" style={{
                        animation: `
                          wiggle 0.3s ease-in-out 2,
                          scale-in 0.2s ease-out forwards
                        `
                      }}>
                        👍
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex mb-4">
              <div className="bg-white rounded-lg p-3 rounded-tl-none">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-75" />
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150" />
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="bg-gray-50 p-4 border-t">
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-200 rounded-full">
                <Smile className="w-6 h-6 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded-full">
                <Paperclip className="w-6 h-6 text-gray-600" />
              </button>
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  readOnly
                  placeholder="Type a message"
                  className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
                />
                {showCaret && isSimulatingTyping && inputText && (
                  <span 
                    className="absolute top-1/2 transform -translate-y-1/2 w-0.5 h-5 bg-black animate-pulse"
                    style={{
                      left: `${inputRef.current?.scrollLeft + inputRef.current?.value.length * 8 + 8}px`
                    }}
                  />
                )}
              </div>
              <button className="p-2 bg-green-700 hover:bg-green-800 rounded-full">
                <Send className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>

          {/* Virtual Keyboard */}
          {showKeyboard && (
            <div className="bg-gray-200 p-2">
              <div className="grid grid-cols-10 gap-1">
                {['Q','W','E','R','T','Y','U','I','O','P',
                  'A','S','D','F','G','H','J','K','L',
                  'Z','X','C','V','B','N','M'].map((key) => (
                  <button
                    key={key}
                    className={`p-2 ${
                      activeKeyRef.current === key.toLowerCase() 
                        ? 'bg-green-700 text-white' 
                        : 'bg-white'
                    } rounded shadow text-sm`}
                  >
                    {key}
                  </button>
                ))}
              </div>
              <div className="flex justify-center mt-1 space-x-1">
                <button className="p-2 bg-white rounded shadow text-sm flex-1">
                  ⌫
                </button>
                <button
                  className={`p-2 ${
                    activeKeyRef.current === ' ' 
                      ? 'bg-green-700 text-white' 
                      : 'bg-white'
                  } rounded shadow text-sm flex-grow-[3]`}
                >
                  Space
                </button>
                <button className="p-2 bg-green-700 text-white rounded shadow text-sm flex-1">
                  Send
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>
        {`
          @keyframes wiggle {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(-15deg); }
            75% { transform: rotate(15deg); }
          }
          @keyframes scale-in {
            0% { transform: scale(1.2); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
};

export default WhatsAppChat;
