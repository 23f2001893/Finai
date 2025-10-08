import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { Button } from "./components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "./components/ui/card";

const COLORS = ["#34d399", "#60a5fa", "#fbbf24", "#f87171"];

const FuturePlan: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation() as any;

  const income = state?.income || 0;
  const expenses = state?.expenses || 0;
  const breakdown = state?.breakdown || {};

  const savings = income - expenses;

  const investmentOptions = [
    { name: "Mutual Funds", value: savings * 0.4 },
    { name: "Fixed Deposit", value: savings * 0.3 },
    { name: "Stock Market", value: savings * 0.2 },
    { name: "Emergency Fund", value: savings * 0.1 },
  ];

  const lineData = [
    { month: "Jan", value: savings * 0.8 },
    { month: "Feb", value: savings * 0.85 },
    { month: "Mar", value: savings * 0.9 },
    { month: "Apr", value: savings * 0.95 },
    { month: "May", value: savings * 1.0 },
    { month: "Jun", value: savings * 1.05 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex flex-col items-center py-10 px-4">
      <motion.div
        className="w-full max-w-5xl p-6 bg-white rounded-2xl shadow-lg border border-gray-100"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-center text-indigo-700">
              💡 Future Investment Plan
            </CardTitle>
          </CardHeader>

          <CardContent>
            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-center">
              <div className="bg-indigo-100 p-4 rounded-xl">
                <h4 className="font-medium text-indigo-700">Total Income</h4>
                <p className="text-xl font-semibold">₹{income}</p>
              </div>
              <div className="bg-red-100 p-4 rounded-xl">
                <h4 className="font-medium text-red-700">Total Expenses</h4>
                <p className="text-xl font-semibold">₹{expenses}</p>
              </div>
              <div className="bg-green-100 p-4 rounded-xl">
                <h4 className="font-medium text-green-700">Savings</h4>
                <p className="text-xl font-semibold">₹{savings}</p>
              </div>
            </div>

            {/* Expense Breakdown */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Expense Breakdown
              </h3>
              <ul className="list-disc list-inside text-gray-600">
                {Object.entries(breakdown).map(([key, value]) => (
                  <li key={key}>
                    {key}: ₹{value || 0}
                  </li>
                ))}
              </ul>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pie */}
              <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
                  Investment Distribution
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={investmentOptions}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {investmentOptions.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Line */}
              <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
                  Savings Growth Projection
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Suggestions */}
            <div className="mt-8 bg-gray-50 p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-700 mb-3">Suggestions</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Invest 40% in mutual funds for compounding growth.</li>
                <li>Keep 10% as emergency fund for flexibility.</li>
                <li>Track monthly savings and rebalance quarterly.</li>
                <li>Avoid overspending beyond 60% of income.</li>
              </ul>
            </div>

            {/* Back Button */}
            <div className="mt-8 flex justify-center">
              <Button
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md"
                onClick={() => navigate("/dashboard")}
              >
                Back to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default FuturePlan;
