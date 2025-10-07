
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";


const Login: React.FC = () => {
 const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json",
         },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        sessionStorage.setItem("token", data.access_token);
        navigate("/dashboard"); 
        // Navigate to home page after login
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (err) {
      alert("Error connecting to server.");
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          FinAI Login
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Login to your personal finance AI assistant
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-600 mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Your username"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition-all duration-200"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6">
          Don't have an account?{" "}
          <a href="/Register" className="text-indigo-600 font-semibold hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
