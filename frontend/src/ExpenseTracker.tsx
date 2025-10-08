import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
import { Button } from "./components/ui/button";

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const ExpenseTracker: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { income, expenses } = location.state || {};

  if (!income || !expenses) {
    return (
      <div className="h-screen flex flex-col justify-center items-center text-center">
        <p className="text-gray-700 mb-4">⚠️ No data found. Please enter details first.</p>
        <Button onClick={() => navigate("/")}>Go Back</Button>
      </div>
    );
  }

  const expenseValues = Object.values(expenses).map(Number);
  const totalExpense = expenseValues.reduce((a, b) => a + b, 0);
  const balance = income - totalExpense;

  const pieData = {
    labels: Object.keys(expenses),
    datasets: [
      {
        data: expenseValues,
        backgroundColor: ["#f87171", "#60a5fa", "#facc15", "#34d399"],
      },
    ],
  };

  const barData = {
    labels: Object.keys(expenses),
    datasets: [
      {
        label: "Expense (₹)",
        data: expenseValues,
        backgroundColor: "#6366f1",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <h1 className="text-2xl font-semibold text-indigo-700 mb-6">📈 Expense Analysis</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-medium mb-4">Expense Distribution</h2>
          <Pie data={pieData} />
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-medium mb-4">Expense Comparison</h2>
          <Bar data={barData} />
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-700 text-lg">Total Income: ₹{income}</p>
        <p className="text-gray-700 text-lg">Total Expenses: ₹{totalExpense}</p>
        <p className="text-gray-700 text-lg font-semibold">
          Remaining Balance: ₹{balance}
        </p>
      </div>

      <Button className="mt-6" onClick={() => navigate("/dashboard")}>
        Back to Dashboard
      </Button>
    </div>
  );
};

export default ExpenseTracker;
