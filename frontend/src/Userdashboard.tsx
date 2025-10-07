import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { MessageSquare, BarChart2, Settings, LogOut } from "lucide-react";

const chartData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 4500 },
  { name: "May", value: 6000 },
  { name: "Jun", value: 7500 },
];

const FinancialChatbotDashboard: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([
    { sender: "bot", text: "Hello! I’m your financial assistant. How can I help today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };
    const botReply = { sender: "bot", text: "Got it! Let me fetch that data for you 📊" };
    setMessages((prev) => [...prev, userMessage, botReply]);
    setInput("");
  };

  return (
    <div className="flex h-screen bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-700 text-white p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-8">FinBot</h1>
          <nav className="space-y-4">
            <button className="flex items-center space-x-2 hover:bg-indigo-600 p-2 rounded-md w-full">
              <BarChart2 size={18} />
              <span>Dashboard</span>
            </button>
            <button className="flex items-center space-x-2 hover:bg-indigo-600 p-2 rounded-md w-full">
              <MessageSquare size={18} />
              <span>Chatbot</span>
            </button>
            <button className="flex items-center space-x-2 hover:bg-indigo-600 p-2 rounded-md w-full">
              <Settings size={18} />
              <span>Settings</span>
            </button>
          </nav>
        </div>
        <button className="flex items-center space-x-2 hover:bg-indigo-600 p-2 rounded-md w-full">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Financial Overview</h2>
          <div className="flex items-center space-x-4">
            <span className="font-medium">Welcome, User 👋</span>
          </div>
        </header>

        {/* Stats + Chart */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-2xl shadow text-center">
            <h3 className="text-gray-500">Total Balance</h3>
            <p className="text-2xl font-semibold mt-2">₹1,24,500</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow text-center">
            <h3 className="text-gray-500">Monthly Income</h3>
            <p className="text-2xl font-semibold mt-2">₹45,200</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow text-center">
            <h3 className="text-gray-500">Expenses</h3>
            <p className="text-2xl font-semibold mt-2">₹27,800</p>
          </div>
        </div>

        {/* Chart + Chat */}
        <div className="flex flex-1 gap-6 p-6">
          {/* Chart Section */}
          <div className="flex-1 bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Monthly Financial Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Chatbot Section */}
          <div className="w-96 bg-white rounded-2xl shadow flex flex-col">
            <div className="p-4 border-b font-semibold">Chatbot Assistant 🤖</div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`p-3 rounded-2xl max-w-xs ${
                      msg.sender === "user"
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t p-3 flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask something..."
                className="flex-1 border rounded-xl p-2 outline-none"
              />
              <button
                onClick={handleSend}
                className="ml-2 bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FinancialChatbotDashboard;