"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const LearningRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getRecommendedCoursesForLevel = (currentLevel, careerLevel) => {
    // Career level progression rules
    const levelRules = {
      'Professional I': { max: 2, range: '0-1' },
      'Professional II': { max: 3, range: '1-2' },
      'Professional III': { max: 4, range: '2-3' },
      'Professional IV': { max: 5, range: '3-4' },
      'Manager I': { max: 5, range: '3-4' },
      'Manager II': { max: 6, range: '4-5' },
      'Manager III': { max: 6, range: '4-5' },
      'Manager IV': { max: 6, range: '4-5' },
      'Director I': { max: 6, range: '5-6' },
      'Director II': { max: 6, range: '5-6' },
      'Director III': { max: 6, range: '5-6' },
      'Director IV': { max: 6, range: '5-6' }
    };

    return currentLevel < levelRules[careerLevel].max;
  };

  // Example data
  const exampleEmployeeData = {
    name: "John Doe",
    careerLevel: "Professional II",  // Employee's career level
    currentLevels: {
      "Software Testing": 1.5,       // Current skill level
      "Test Planning": 1.8,
      "Quality Engineering": 1.2
    }
  };

  const exampleLearningResources = [
    {
      skillName: "Software Testing",
      requiredLevel: 3,              // Target level for Professional II
      careerLevel: "Professional II",
      courseName: "ISTQB Foundation Level Testing",
      provider: "ISTQB",
      duration: "6 weeks",
      format: "Online Course",
      prerequisites: "None",
      learningObjectives: "Testing fundamentals,Test case design,Test execution,Defect management",
      certificationOption: "ISTQB Foundation",
      businessValue: "Core QA capability",
      recommendedFor: "Current Level < 3"  // Professional II course
    }
    // ... more courses
  ];

  useEffect(() => {
    const processRecommendations = () => {
      setLoading(true);
      try {
        // Filter and process courses
        const processed = exampleLearningResources
          .filter(resource => {
            const currentLevel = exampleEmployeeData.currentLevels[resource.skillName] || 0;
            return (
              // Match career level
              resource.careerLevel === exampleEmployeeData.careerLevel &&
              // Check if course is appropriate for current skill level
              getRecommendedCoursesForLevel(currentLevel, exampleEmployeeData.careerLevel)
            );
          })
          .map(resource => {
            const currentLevel = exampleEmployeeData.currentLevels[resource.skillName] || 0;
            const gap = resource.requiredLevel - currentLevel;

            return {
              skill: resource.skillName,
              gap: Number(gap.toFixed(1)),
              priority: gap >= 2 ? 'Critical' : gap >= 1 ? 'High' : 'Medium',
              course: {
                name: resource.courseName,
                provider: resource.provider,
                duration: resource.duration,
                format: resource.format,
                certification: resource.certificationOption,
                objectives: resource.learningObjectives.split(','),
                prerequisites: resource.prerequisites,
                businessValue: resource.businessValue,
                targetLevel: resource.requiredLevel
              },
              currentLevel,
              requiredLevel: resource.requiredLevel
            };
          })
          .sort((a, b) => b.gap - a.gap);

        setRecommendations(processed);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    processRecommendations();
  }, []);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Learning Recommendations for {exampleEmployeeData.name}</CardTitle>
        <p className="text-sm text-gray-500">Career Level: {exampleEmployeeData.careerLevel}</p>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-4">Loading recommendations...</div>
        ) : error ? (
          <div className="text-center py-4 text-red-500">{error}</div>
        ) : recommendations.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            No learning recommendations available
          </div>
        ) : (
          <div className="space-y-4">
            {recommendations.map((reco, index) => (
              <Card key={index} className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{reco.skill}</h3>
                  <span className={`px-2 py-1 rounded ${getPriorityColor(reco.priority)}`}>
                    Gap: {reco.gap}
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-lg">{reco.course.name}</p>
                    <div className="grid grid-cols-2 gap-2 text-sm mt-2">
                      <div>
                        <span className="text-gray-500">Current Level:</span> {reco.currentLevel}
                      </div>
                      <div>
                        <span className="text-gray-500">Target Level:</span> {reco.course.targetLevel}
                      </div>
                      <div>
                        <span className="text-gray-500">Provider:</span> {reco.course.provider}
                      </div>
                      <div>
                        <span className="text-gray-500">Duration:</span> {reco.course.duration}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Learning Path:</h4>
                    <div className="text-sm text-gray-600">
                      This course will help you progress from level {reco.currentLevel} to level {reco.course.targetLevel},
                      which is appropriate for your {exampleEmployeeData.careerLevel} career level.
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Learning Objectives:</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {reco.course.objectives.map((objective, i) => (
                        <li key={i}>{objective.trim()}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-medium mb-1">Prerequisites:</h4>
                      <p>{reco.course.prerequisites}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Business Value:</h4>
                      <p>{reco.course.businessValue}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LearningRecommendations;
