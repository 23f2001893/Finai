import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "@/components/ui/button";
import {Input} from "./components/ui/input";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Dashboard2: React.FC = () => {
  const [income, setIncome] = useState<number | "">("");
  const [ManualExpenseFood, setManualExpenseFood] = useState("");
  const [ManualExpenseClothing, setManualExpenseClothing] = useState("");
  const [manualExpenseTravel, setManualExpenseTravel] = useState("");
  const [ManualExpenseEducation, setManualExpenseEducation] = useState("");
  const [aiExpenseData, setAiExpenseData] = useState("");
  const [selectedMode, setSelectedMode] = useState<"manual" | "ai" | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
   const navigate = useNavigate();


 
const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("http://127.0.0.1:5000/analyze-expenses", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    setAiExpenseData(result); // still store it for local UI preview

    // ✅ Use 'result' directly, not aiExpenseData (which isn't updated yet)
    navigate("/expense-tracker", {
      state: {
        income,
        expenses: {
          Food: result.Food || 0,
          Clothing: result.Clothing || 0,
          Travel: result.Travel || 0,
          Education: result.Education || 0,
        },
      },
    });
  } catch (err) {
    console.error(err);
    alert("Something went wrong while uploading file");
  }
};



   const handleGenerateSummary = () => {
    navigate("/expense-tracker", {
      state: {
        income,
        expenses: {
          Food: ManualExpenseFood,
          Clothing: ManualExpenseClothing,
          Travel: manualExpenseTravel,
          Education: ManualExpenseEducation,
        },
      },
    });
  };

const handleFuturePlan = () => {
    // compute total expense
    const totalExpense =
      Number(ManualExpenseFood || 0) +
      Number(ManualExpenseClothing || 0) +
      Number(manualExpenseTravel || 0) +
      Number(ManualExpenseEducation || 0);

    navigate("/future-plan", {
      state: {
        income: Number(income),
        expenses: totalExpense,
        breakdown: {
          Food: ManualExpenseFood,
          Clothing: ManualExpenseClothing,
          Travel: manualExpenseTravel,
          Education: ManualExpenseEducation,
        },
      },
    });
  };

  return (
    <div >
      <motion.div
        className="w-full max-w-3xl p-6 rounded-2xl bg-white shadow-lg border border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-center text-indigo-700">
              💰 Smart Expense Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Income Section */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                Enter Monthly Income
              </h3>
              <Input
                type="number"
                placeholder="Enter income amount (₹)"
                value={income}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIncome(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Expense Mode Section */}
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                Add Expenses
              </h3>
              <div className="flex space-x-4 mb-4">
                <Button
                  variant={selectedMode === "manual" ? "default" : "outline"}
                  onClick={() => setSelectedMode("manual")}
                >
                  ✍️ Manual
                </Button>
                <Button
                  variant={selectedMode === "ai" ? "default" : "outline"}
                  onClick={() => setSelectedMode("ai")}
                >
                  🤖 AI Mode
                </Button>
              </div>

              {/* Conditional Expense Inputs */}
              {selectedMode === "manual" && (
                <motion.div
                  className="p-4 border rounded-xl bg-gray-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Input
                    placeholder="Enter Food expense (₹)"
                    value={ManualExpenseFood}
                    onChange={(e) => setManualExpenseFood(e.target.value)}
                  />
                   <Input
                    placeholder="Enter clothing expense (₹)"
                    value={ManualExpenseClothing}
                    onChange={(e) => setManualExpenseClothing(e.target.value)}
                  />
                   <Input
                    placeholder="Enter travel  expense (₹)"
                    value={manualExpenseTravel}
                    onChange={(e) => setManualExpenseTravel(e.target.value)}
                  />
                   <Input
                    placeholder="Enter education expense (₹)"
                    value={ManualExpenseEducation}
                    onChange={(e) => setManualExpenseEducation(e.target.value)}
                  />
                
                </motion.div>
              )}

              {selectedMode === "ai" && (
                <motion.div className="p-4 border rounded-xl bg-gray-50">
                <p className="mb-2 text-gray-700">
                    📎 Attach your bank statement (CSV or Excel). The AI will automatically categorize your expenses.
                  </p>
                    <input
                      type="file"
                      accept=".csv, .xlsx"
                       className="block w-full text-sm text-gray-600"
                         onChange={handleFileUpload}
                       />
  <Button
    className="mt-3 bg-purple-600 hover:bg-purple-700 text-white"
    onClick={handleAIExpense}
  >
    Analyze with AI
  </Button>
   {aiExpenseData && (
      <div className="mt-4 p-4 border rounded-xl bg-gray-50">
        <pre className="text-sm text-gray-800">
          {JSON.stringify(aiExpenseData, null, 2)}
        </pre>
      </div>
    )}
  </motion.div>

              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mt-6 justify-center">
              <Button
                className="bg-green-600 hover:bg-green-700 text-white px-6"
                onClick={handleGenerateSummary}
              >
                📊 Expense Tracker
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                onClick={handleFuturePlan}
              >
                🧠 Future Plan
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Dashboard2;
