
import { useState, useEffect, useRef } from "react";
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
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

    // Generate contextual response based on message content
    setTimeout(() => {
      const userMessageLower = message.toLowerCase();
      let response = "";
      
      // Industry related questions
      if (userMessageLower.includes("industry") || userMessageLower.includes("manufacturing")) {
        response = "Our platform connects you with various manufacturing industries in both India and the US. You can explore options like electronics, textiles, pharmaceuticals, and more. Would you like specific recommendations?";
      }
      // Product related questions
      else if (userMessageLower.includes("product") || userMessageLower.includes("create") || userMessageLower.includes("make")) {
        response = "To bring your product to life, you can use our workflow tool to plan the development process. Start by defining your product, then explore manufacturing options, material requirements, and marketing strategies. Would you like help with a specific part of this process?";
      }
      // Finance related questions
      else if (userMessageLower.includes("finance") || userMessageLower.includes("money") || userMessageLower.includes("cost") || userMessageLower.includes("budget")) {
        response = "Our finance tools are coming soon! They'll help you budget your manufacturing costs, track expenses, and forecast revenue. In the meantime, I can provide general guidance on manufacturing cost considerations. What specifically are you looking to budget?";
      }
      // Material related questions
      else if (userMessageLower.includes("material") || userMessageLower.includes("resource")) {
        response = "Finding the right materials is crucial for product development. Our platform can help you identify suppliers and understand material specifications. Are you looking for a specific type of material or supplier information?";
      }
      // Workflow related questions
      else if (userMessageLower.includes("workflow") || userMessageLower.includes("process") || userMessageLower.includes("steps")) {
        response = "Our workflow tool guides you through the product development journey: from idea generation to manufacturing and marketing. It helps you make informed decisions at each stage. Would you like me to explain a specific part of the workflow?";
      }
      // Stocks or market related questions
      else if (userMessageLower.includes("stock") || userMessageLower.includes("market") || userMessageLower.includes("investment")) {
        response = "Our stocks feature (coming soon) will provide market insights for manufacturing sectors. This can help you understand trends and make informed decisions about product development and manufacturing partnerships.";
      }
      // Help or assistance questions
      else if (userMessageLower.includes("help") || userMessageLower.includes("how to") || userMessageLower.includes("guide")) {
        response = "I'm here to help! You can navigate through our platform using the dashboard cards. Each section provides specialized tools: Industries for finding manufacturers, Workflow for planning your product journey, Products for managing your ideas, and more. What specific help do you need?";
      }
      // Greeting or introduction
      else if (userMessageLower.includes("hello") || userMessageLower.includes("hi") || userMessageLower.includes("hey")) {
        const userName = localStorage.getItem("userName") || "there";
        response = `Hello ${userName}! I'm your GenZ Connects assistant. I can help you find manufacturing partners, develop product plans, and navigate our platform. What would you like to know about today?`;
      }
      // Default response for other queries
      else {
        const responses = [
          "That's an interesting question! Our platform aims to connect entrepreneurs with manufacturing resources. Could you tell me more about what you're trying to accomplish?",
          "I'd be happy to help with that. Our tools are designed to simplify the product development and manufacturing process. Could you provide more details about your specific needs?",
          "GenZ Connects offers various resources for product development and manufacturing connections. Would you like me to explain our key features that might help with your query?",
          "I understand you're interested in this topic. Our platform offers tools for industry connections, product development, and manufacturing resources. How can I help you move forward with your specific goals?",
          "Thanks for your question! To provide the most helpful response, could you tell me more about your product or manufacturing needs?",
        ];
        response = responses[Math.floor(Math.random() * responses.length)];
      }
      
      const assistantMessage = {
        text: response,
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
  
  useEffect(() => {
    // Scroll to bottom of messages when conversation updates
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

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
                <div ref={messagesEndRef} />
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
