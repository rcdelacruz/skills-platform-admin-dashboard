"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Award, BookOpen, Users, TrendingUp, ChevronRight } from "lucide-react";

const featuresData = [
  { name: "Skill Assessment", value: 30 },
  { name: "Learning Paths", value: 25 },
  { name: "Performance Tracking", value: 20 },
  { name: "Team Management", value: 15 },
  { name: "Reporting", value: 10 },
];

const benefitsData = [
  { name: "Productivity", increase: 25 },
  { name: "Employee Satisfaction", increase: 30 },
  { name: "Skill Gaps Reduced", increase: 40 },
  { name: "Training Efficiency", increase: 35 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export default function LandingDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Welcome to SkillBase</h1>
        <p className="text-xl text-muted-foreground">
          Empower Your Team, Elevate Your Business
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Skill Tracking
            </CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Comprehensive</div>
            <p className="text-xs text-muted-foreground">
              Monitor and develop skills
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Learning Paths
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Personalized</div>
            <p className="text-xs text-muted-foreground">
              Tailored growth journeys
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Team Management
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Efficient</div>
            <p className="text-xs text-muted-foreground">
              Streamlined team oversight
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Performance Boost
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Measurable</div>
            <p className="text-xs text-muted-foreground">
              Track improvement over time
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="overview">Platform Overview</TabsTrigger>
          <TabsTrigger value="features">Key Features</TabsTrigger>
          <TabsTrigger value="benefits">Benefits</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Why Choose SkillBase?</CardTitle>
              <CardDescription>
                Discover how our platform can transform your team&apos;s skills
                management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-semibold mb-2">For Employees</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Track your skill progress</li>
                    <li>Access personalized learning paths</li>
                    <li>Receive targeted training recommendations</li>
                    <li>Visualize your career growth</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">For Managers</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Gain insights into team skills</li>
                    <li>Identify and address skill gaps</li>
                    <li>Streamline performance evaluations</li>
                    <li>Optimize training resources</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="features">
          <Card>
            <CardHeader>
              <CardTitle>Platform Features</CardTitle>
              <CardDescription>
                Explore the powerful tools SkillBase offers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={featuresData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {featuresData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="benefits">
          <Card>
            <CardHeader>
              <CardTitle>Platform Benefits</CardTitle>
              <CardDescription>
                See the impact SkillBase can have on your organization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={benefitsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="increase"
                    fill="#8884d8"
                    name="Percentage Increase"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Ready to Transform Your Team&apos;s Skills?
        </h2>
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
          <div className="flex-1 w-full md:w-auto">
            <Input type="email" placeholder="Enter your work email" />
          </div>
          <Button className="w-full md:w-auto">
            Get Started
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
