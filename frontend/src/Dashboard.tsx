import React, { useEffect, useState } from "react";
import ChatBot from "./ChatBot";
import Dashboard2 from "./Dashboard2";
interface DashboardData {
  username: string;
  balance: number;
  lastLogin: string;
}

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        
{          const token = sessionStorage.getItem("token");
                
        const res = await fetch("http://localhost:5000/api/dashboard", {
          
          method: "GET",
          headers: { "Content-Type": "application/json",
                     "Access-Control-Allow-Origin":"*",
                     "Authorization": `Bearer ${token}`,

           },
          credentials: "include", // if using cookies/session auth
        });

        const result = await res.json();
        if (res.ok) {
          setData(result);
        } else {
          alert(result.message || "Failed to fetch dashboard");
        }
      } }catch (err) {
        console.error(err);
        alert("Error connecting to server.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <p className="text-indigo-600 text-xl font-semibold">Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-4xl font-bold text-indigo-600 mb-6">
          Welcome, {data?.username}!
        </h1>
        <div className="flex space-x-5">
          <div >  <ChatBot /></div>
          <div > <Dashboard2 /></div>
           </div>

        <div className="mt-8">
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
