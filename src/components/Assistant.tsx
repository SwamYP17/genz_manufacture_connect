
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HelpCircle, X, MessageSquare, Send } from "lucide-react";
import { Button } from "./ui-components";

const Assistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState<
    Array<{ text: string; sender: "user" | "assistant"; timestamp: Date }>
  >([
    {
      text: "Hi there! 👋 I'm your GenZ Connects assistant. How can I help you today?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ]);

  const toggleAssistant = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = () => {
    if (!message.trim()) return;

    // Add user message to conversation
    const userMessage = {
      text: message,
      sender: "user" as const,
      timestamp: new Date(),
    };
    
    setConversation([...conversation, userMessage]);
    setMessage("");

    // Simulate assistant response
    setTimeout(() => {
      const responses = [
        "I can help you connect with manufacturing industries that match your product needs.",
        "Would you like me to suggest some industries based on your interests?",
        "You can check the Products section to analyze costs for your product idea.",
        "The Finance section offers tools for budgeting and funding your project.",
        "Looking for specific materials? I can help you find suppliers.",
      ];
      
      const assistantMessage = {
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: "assistant" as const,
        timestamp: new Date(),
      };
      
      setConversation((prev) => [...prev, assistantMessage]);
    }, 1000);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleAssistant}
        className="fixed z-50 bottom-20 right-4 bg-genz-blue rounded-full p-3 text-white shadow-lg"
      >
        {isOpen ? <X size={24} /> : <HelpCircle size={24} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 p-4 sm:p-6 md:p-8 lg:p-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsOpen(false);
              }
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="glass w-full max-w-md rounded-2xl overflow-hidden flex flex-col max-h-[600px] shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-genz-blue px-4 py-3 flex items-center justify-between text-white">
                <div className="flex items-center">
                  <MessageSquare size={20} className="mr-2" />
                  <h3 className="font-medium">Assistant</h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {conversation.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs p-3 rounded-lg ${
                        msg.sender === "user"
                          ? "bg-genz-blue text-white rounded-tr-none"
                          : "bg-white shadow rounded-tl-none"
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <span className={`text-xs mt-1 block text-right ${
                        msg.sender === "user" ? "text-blue-100" : "text-gray-400"
                      }`}>
                        {formatTime(msg.timestamp)}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="p-4 border-t border-gray-200 bg-white/80">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Ask me anything..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSend();
                      }
                    }}
                    className="flex-1 bg-white rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-genz-blue focus:border-transparent"
                  />
                  <Button
                    onClick={handleSend}
                    variant="default"
                    size="icon"
                    className="rounded-lg"
                    aria-label="Send message"
                  >
                    <Send size={18} />
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Assistant;
