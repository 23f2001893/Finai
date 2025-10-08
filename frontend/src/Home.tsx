import React from "react";
import { useNavigate, Link } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 text-gray-800 px-6">
      {/* Logo or Title */}
      <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-indigo-700 tracking-tight">
        Fin<span className="text-blue-600">AI</span>
      </h1>

      {/* Subtitle */}
      <p className="text-lg md:text-xl text-gray-600 text-center max-w-xl mb-8">
        Your personal AI chatbot for managing finance, budgeting, and smarter money decisions.
      </p>
      <div className="flex flex-col sm:flex-row gap-6 mb-10">
      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button 
          onClick={() => navigate("/login")}
          className="px-8 py-3 bg-indigo-600 text-white rounded-full font-semibold shadow-md hover:bg-indigo-700 transition"
        >
          Login
        </button>

        <button
          onClick={() => navigate("/register")}
          className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 rounded-full font-semibold hover:bg-indigo-50 transition"
        >
          Register
        </button>
      </div></div>

      {/* Footer */}
      <footer className="mt-16 text-gray-400 text-xs">
        © {new Date().getFullYear()} FinAI. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
