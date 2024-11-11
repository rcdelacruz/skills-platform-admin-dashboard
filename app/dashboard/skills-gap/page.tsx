"use client";

import React, { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Helper functions for different calculation methods
const calculateWeightedScore = (selfScore, managerScore) => {
  // 50/50 weight between self and manager scores
  return selfScore * 0.5 + managerScore * 0.5;
};

const calculateAverageScore = (selfScore, managerScore) => {
  // Simple average between self and manager scores
  return (selfScore + managerScore) / 2;
};

// Get required level based on career level
const getRequiredLevel = (careerLevel) => {
  const levelMap = {
    "Professional I": 1,
    "Professional II": 2,
    "Professional III": 3,
    "Professional IV": 4,
    "Manager I": 4,
    "Manager II": 5,
    "Manager III": 5,
    "Manager IV": 5,
    "Director I": 6,
    "Director II": 6,
    "Director III": 6,
    "Director IV": 6,
  };
  return levelMap[careerLevel] || 0;
};

const SkillsGapAnalysis = () => {
  const [calculationType, setCalculationType] = useState("average"); // or 'weighted'

  // Example employee data
  const [selectedEmployee, setSelectedEmployee] = useState({
    name: "John Doe",
    careerLevel: "Professional II",
    selfAssessment: {
      "Problem Solving": 3,
      "Creative Thinking": 2,
      "Decision Making": 3,
      Communication: 3,
      "Software Testing": 4,
    },
    managerAssessment: {
      "Problem Solving": 2,
      "Creative Thinking": 2,
      "Decision Making": 2,
      Communication: 3,
      "Software Testing": 3,
    },
  });

  // Calculate gaps using selected method
  const gapAnalysis = useMemo(() => {
    const skills = Object.keys(selectedEmployee.selfAssessment);
    const requiredLevel = getRequiredLevel(selectedEmployee.careerLevel);

    return skills.map((skill) => {
      const selfScore = selectedEmployee.selfAssessment[skill];
      const managerScore = selectedEmployee.managerAssessment[skill];

      // Calculate current level based on selected method
      const currentLevel =
        calculationType === "weighted"
          ? calculateWeightedScore(selfScore, managerScore)
          : calculateAverageScore(selfScore, managerScore);

      const gap = requiredLevel - currentLevel;

      return {
        skill,
        selfScore,
        managerScore,
        currentLevel: parseFloat(currentLevel.toFixed(1)),
        requiredLevel,
        gap: parseFloat(gap.toFixed(1)),
      };
    });
  }, [selectedEmployee, calculationType]);

  // Prepare data for visualization
  const chartData = gapAnalysis.map((item) => ({
    skill: item.skill,
    Current: item.currentLevel,
    Required: item.requiredLevel,
    Gap: Math.max(0, item.gap),
  }));

  return (
    <div className="w-full space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Skills Gap Analysis - {selectedEmployee.name}</span>
            <select
              className="p-2 border rounded"
              value={calculationType}
              onChange={(e) => setCalculationType(e.target.value)}
            >
              <option value="average">Average Method</option>
              <option value="weighted">50/50 Weighted Method</option>
            </select>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <p className="text-sm text-gray-500">
              Career Level: {selectedEmployee.careerLevel}
            </p>
            <p className="text-sm text-gray-500">
              Calculation Method:{" "}
              {calculationType === "weighted" ? "50/50 Weighted" : "Average"}
            </p>
          </div>

          {/* Skills Gap Chart */}
          <div className="h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="skill" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Current" fill="#3b82f6" name="Current Level" />
                <Bar dataKey="Required" fill="#64748b" name="Required Level" />
                <Bar dataKey="Gap" fill="#ef4444" name="Gap" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Detailed Gap Analysis */}
          <div className="mt-6">
            <h3 className="font-semibold mb-4">Detailed Gap Analysis</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left">Skill</th>
                    <th className="p-2 text-right">Self</th>
                    <th className="p-2 text-right">Manager</th>
                    <th className="p-2 text-right">Current</th>
                    <th className="p-2 text-right">Required</th>
                    <th className="p-2 text-right">Gap</th>
                  </tr>
                </thead>
                <tbody>
                  {gapAnalysis.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2">{item.skill}</td>
                      <td className="p-2 text-right">{item.selfScore}</td>
                      <td className="p-2 text-right">{item.managerScore}</td>
                      <td className="p-2 text-right">{item.currentLevel}</td>
                      <td className="p-2 text-right">{item.requiredLevel}</td>
                      <td
                        className={`p-2 text-right ${item.gap > 0 ? "text-red-500" : "text-green-500"}`}
                      >
                        {item.gap > 0 ? `+${item.gap}` : item.gap}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary Statistics */}
          <div className="mt-6">
            <h3 className="font-semibold mb-4">Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-gray-50 rounded">
                <div className="text-sm text-gray-500">Average Gap</div>
                <div className="text-xl font-semibold">
                  {(
                    gapAnalysis.reduce((acc, item) => acc + item.gap, 0) /
                    gapAnalysis.length
                  ).toFixed(2)}
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded">
                <div className="text-sm text-gray-500">
                  Skills Meeting Required
                </div>
                <div className="text-xl font-semibold">
                  {gapAnalysis.filter((item) => item.gap <= 0).length}
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded">
                <div className="text-sm text-gray-500">
                  Skills Needing Improvement
                </div>
                <div className="text-xl font-semibold">
                  {gapAnalysis.filter((item) => item.gap > 0).length}
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded">
                <div className="text-sm text-gray-500">Largest Gap</div>
                <div className="text-xl font-semibold">
                  {Math.max(...gapAnalysis.map((item) => item.gap))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillsGapAnalysis;
