"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
  Tooltip,
} from "@/components/ui/tooltip";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip as RechartsTooltip,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Award,
  BookOpen,
  TrendingUp,
  Calendar,
  Star,
  Brain,
  Scroll,
  Users,
  GitBranch,
  ChevronRight,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle2,
  XCircle,
} from "lucide-react";

// Add mock employee data
const mockEmployeeData = {
  name: "John Doe",
  email: "john.doe@example.com",
  role: "QA Engineer",
  department: "Quality Assurance",
  grade: "Professional II",
};

// Add mock training courses data
const mockTrainingCourses = {
  "Software Testing": {
    advanced: "Advanced Test Automation",
    intermediate: "Comprehensive Testing Strategies",
    basic: "Software Testing Fundamentals",
  },
  "Test Planning": {
    advanced: "Strategic Test Planning",
    intermediate: "Effective Test Planning",
    basic: "Test Planning Basics",
  },
  "Agile Software Development": {
    advanced: "Scaling Agile Practices",
    intermediate: "Advanced Agile Methods",
    basic: "Agile Fundamentals",
  },
  "Problem Solving": {
    advanced: "Advanced Problem-Solving",
    intermediate: "Problem-Solving Techniques",
    basic: "Basic Problem-Solving",
  },
  "Communication": {
    advanced: "Executive Communication",
    intermediate: "Professional Communication",
    basic: "Communication Fundamentals",
  },
  "Collaboration and Inclusivity": {
    advanced: "Leading Inclusive Teams",
    intermediate: "Building Collaborative Teams",
    basic: "Collaboration Basics",
  },
};

// Add learning recommendations data
const learningRecommendations = [
  {
    skillName: "Software Testing",
    requiredLevel: 3,
    careerLevel: "Professional II",
    courseName: "ISTQB Foundation Level Testing",
    provider: "ISTQB",
    duration: "6 weeks",
    format: "Online Course",
    prerequisites: "None",
    learningObjectives: "Testing fundamentals,Test case design,Test execution,Defect management",
    certificationOption: "ISTQB Foundation",
    businessValue: "Core QA capability",
    currentLevel: 1.5,
    gap: 1.5,
    priority: "High"
  }
];

// Mock skills data
const mockSkillsData = [
  {
    skill: "Software Testing",
    category: "Technical Skills",
    selfRating: 4,
    managerRating: 3,
    requiredRating: 4,
  },
  {
    skill: "Test Planning",
    category: "Technical Skills",
    selfRating: 3,
    managerRating: 3,
    requiredRating: 4,
  },
  {
    skill: "Agile Software Development",
    category: "Technical Skills",
    selfRating: 4,
    managerRating: 4,
    requiredRating: 3,
  },
  {
    skill: "Problem Solving",
    category: "Soft Skills",
    selfRating: 4,
    managerRating: 4,
    requiredRating: 4,
  },
  {
    skill: "Communication",
    category: "Soft Skills",
    selfRating: 3,
    managerRating: 4,
    requiredRating: 4,
  },
  {
    skill: "Collaboration and Inclusivity",
    category: "Soft Skills",
    selfRating: 4,
    managerRating: 3,
    requiredRating: 3,
  },
];

export default function EnhancedEmployeeDashboard({ isManager = false }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Calculate skill gaps
  const skillsWithGap = mockSkillsData.map((skill) => ({
    ...skill,
    currentLevel: Math.min(skill.selfRating, skill.managerRating),
    gap: Math.max(
      skill.requiredRating - Math.min(skill.selfRating, skill.managerRating),
      0
    ),
  }));

  const handleCourseClick = (course: any) => {
    setSelectedCourse(course);
    setDialogOpen(true);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-800";
      case "High":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const averageRating = (category: string) => {
    const filteredSkills = mockSkillsData.filter(
      (skill) => skill.category === category,
    );
    const sum = filteredSkills.reduce(
      (acc, skill) => acc + skill.selfRating,
      0,
    );
    return (sum / filteredSkills.length).toFixed(2);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src="/placeholder-avatar.jpg" alt={mockEmployeeData.name} />
            <AvatarFallback>
              {mockEmployeeData.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">{mockEmployeeData.name}</h1>
            <p className="text-muted-foreground">
              {mockEmployeeData.role} - {mockEmployeeData.department}
            </p>
            <Badge className="mt-1">{mockEmployeeData.grade}</Badge>
          </div>
        </div>
        <Button>{isManager ? "Team Settings" : "Update Profile"}</Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="skills">Skills Details</TabsTrigger>
          <TabsTrigger value="growth-plan">Growth Plan</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Soft Skills Average
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {averageRating("Soft Skills")}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Technical Skills Average
                </CardTitle>
                <Scroll className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {averageRating("Technical Skills")}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Skills Assessed
                </CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockSkillsData.length}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Skills Overview</CardTitle>
              <CardDescription>
                Your current skill levels compared to required levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={skillsWithGap}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="skill" />
                  <PolarRadiusAxis angle={30} domain={[0, 5]} />
                  <Radar
                    name="Current Level"
                    dataKey="currentLevel"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                  <Radar
                    name="Required Level"
                    dataKey="requiredRating"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    fillOpacity={0.6}
                  />
                  <Legend />
                  <RechartsTooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Skills Details Tab */}
        <TabsContent value="skills">
          <Card>
            <CardHeader>
              <CardTitle>Skill Details</CardTitle>
              <CardDescription>
                Breakdown of your skills, assessments, and required levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Skill</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Self Rating</TableHead>
                    <TableHead>Manager Rating</TableHead>
                    <TableHead>Required Level</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockSkillsData.map((skill, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {skill.skill}
                      </TableCell>
                      <TableCell>{skill.category}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Progress
                            value={(skill.selfRating / 5) * 100}
                            className="w-[60px]"
                          />
                          <span className="text-sm">
                            {skill.selfRating}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Progress
                            value={(skill.managerRating / 5) * 100}
                            className="w-[60px]"
                          />
                          <span className="text-sm">
                            {skill.managerRating}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Progress
                            value={(skill.requiredRating / 5) * 100}
                            className="w-[60px]"
                          />
                          <span className="text-sm">
                            {skill.requiredRating}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {Math.min(skill.selfRating, skill.managerRating) >=
                        skill.requiredRating ? (
                          <Badge variant="success">Proficient</Badge>
                        ) : Math.min(
                            skill.selfRating,
                            skill.managerRating,
                          ) ===
                          skill.requiredRating - 1 ? (
                          <Badge variant="warning">Developing</Badge>
                        ) : (
                          <Badge variant="destructive">
                            Needs Improvement
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Growth Plan Tab */}
        <TabsContent value="growth-plan">
          <Card>
            <CardHeader>
              <CardTitle>Growth Plan</CardTitle>
              <CardDescription>
                Skill gaps and recommended training courses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Skill</TableHead>
                    <TableHead>Current Level</TableHead>
                    <TableHead>Required Level</TableHead>
                    <TableHead>Gap</TableHead>
                    <TableHead>Recommended Training Course</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {skillsWithGap
                    .filter((skill) => skill.gap > 0)
                    .sort((a, b) => b.gap - a.gap)
                    .map((skill, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {skill.skill}
                        </TableCell>
                        <TableCell>{skill.currentLevel}</TableCell>
                        <TableCell>{skill.requiredRating}</TableCell>
                        <TableCell>
                          <Badge variant="destructive">{skill.gap}</Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="link"
                            className="p-0 h-auto"
                            onClick={() => handleCourseClick(learningRecommendations.find(r => r.skillName === skill.skill))}
                          >
                            {skill.gap > 2 ? (
                              <span className="text-red-500">
                                {mockTrainingCourses[skill.skill]?.advanced ||
                                  `Advanced ${skill.skill} Course`}
                              </span>
                            ) : skill.gap > 1 ? (
                              <span className="text-yellow-500">
                                {mockTrainingCourses[skill.skill]?.intermediate ||
                                  `Intermediate ${skill.skill} Workshop`}
                              </span>
                            ) : (
                              <span className="text-green-500">
                                {mockTrainingCourses[skill.skill]?.basic ||
                                  `${skill.skill} Fundamentals Refresher`}
                              </span>
                            )}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="max-w-2xl">
              {selectedCourse && (
                <>
                  <DialogHeader>
                    <DialogTitle>{selectedCourse.courseName}</DialogTitle>
                    <DialogDescription>
                      Training details and learning objectives
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{selectedCourse.skillName}</h3>
                      <span className={`px-2 py-1 rounded ${getPriorityColor(selectedCourse.priority)}`}>
                        Gap: {selectedCourse.gap}
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-500">Current Level:</span>{" "}
                          {selectedCourse.currentLevel}
                        </div>
                        <div>
                          <span className="text-gray-500">Target Level:</span>{" "}
                          {selectedCourse.requiredLevel}
                        </div>
                        <div>
                          <span className="text-gray-500">Provider:</span>{" "}
                          {selectedCourse.provider}
                        </div>
                        <div>
                          <span className="text-gray-500">Duration:</span>{" "}
                          {selectedCourse.duration}
                        </div>
                        <div>
                          <span className="text-gray-500">Format:</span>{" "}
                          {selectedCourse.format}
                        </div>
                        <div>
                          <span className="text-gray-500">Certification:</span>{" "}
                          {selectedCourse.certificationOption}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Learning Path:</h4>
                        <div className="text-sm text-gray-600">
                          This course will help you progress from level{" "}
                          {selectedCourse.currentLevel} to level {selectedCourse.requiredLevel},
                          which is appropriate for your career level.
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Learning Objectives:</h4>
                        <ul className="list-disc list-inside text-sm space-y-1">
                          {selectedCourse.learningObjectives.split(",").map((objective, i) => (
                            <li key={i}>{objective.trim()}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <h4 className="font-medium mb-1">Prerequisites:</h4>
                          <p>{selectedCourse.prerequisites}</p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Business Value:</h4>
                          <p>{selectedCourse.businessValue}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
        </TabsContent>
      </Tabs>
    </div>
  );
}
