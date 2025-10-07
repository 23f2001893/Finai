import React, { useState } from "react";

interface Message {
  sender: "user" | "bot";
  text: string;
}

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // backend endpoint
  const API_URL = "http://127.0.0.1:5000/chat";

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.text }),
      });

      const data = await res.json();

      const botMsg: Message = {
        sender: "bot",
        text: data.reply || "⚠️ Error: No response received",
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "❌ Error connecting to server." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="flex flex-col max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-4 border border-gray-200 h-[80vh]">
      <h2 className="text-2xl font-bold mb-2 text-center">💬 Finance Assistant</h2>

      <div className="flex-1 overflow-y-auto border rounded-lg p-3 bg-gray-50 mb-3">
        {messages.length === 0 && (
          <p className="text-gray-400 text-center mt-10">
            Start a conversation about your finances...
          </p>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex my-2 ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-2 rounded-lg max-w-xs text-sm ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start my-2">
            <div className="p-2 bg-gray-200 rounded-lg text-sm text-gray-600 animate-pulse">
              Thinking...
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Ask about saving, budgeting..."
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
