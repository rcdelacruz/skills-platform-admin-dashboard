"use client";

import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Search,
  Settings,
  BarChart2,
  Network,
  User,
  Filter,
  BookOpen,
  Award,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Edit,
  Save,
  Building2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";

// Business Units Data
const BUSINESS_UNITS = {
  ALL: "All Business Units",
  QA: "Software QA Services",
  DEV: "Software Development",
  DATA: "Data Science",
  CLOUD: "Cloud Services",
  SEC: "Cybersecurity",
};

// Mock data structures
const SKILLS = {
  QA: [
    {
      category: "Testing",
      skill: "Test Planning",
      description: "Ability to create comprehensive test plans.",
      levels: [
        { level: 1, description: "Basic understanding of test planning" },
        { level: 2, description: "Can create simple test plans" },
        {
          level: 3,
          description: "Develops detailed test plans for medium projects",
        },
        {
          level: 4,
          description: "Creates complex test plans for large projects",
        },
        {
          level: 5,
          description: "Leads test planning for enterprise-level projects",
        },
        { level: 6, description: "Innovates in test planning methodologies" },
      ],
      averageAssessment: { self: 3.2, manager: 3.5 },
      skillGap: 1.5,
      requiredLevel: 5,
    },
    {
      category: "Automation",
      skill: "Selenium",
      description: "Proficiency in using Selenium for test automation.",
      levels: [
        { level: 1, description: "Basic understanding of Selenium" },
        { level: 2, description: "Can write simple Selenium scripts" },
        {
          level: 3,
          description: "Develops moderate complexity Selenium test suites",
        },
        { level: 4, description: "Creates advanced Selenium frameworks" },
        { level: 5, description: "Optimizes and scales Selenium test suites" },
        {
          level: 6,
          description: "Contributes to Selenium open source project",
        },
      ],
      averageAssessment: { self: 3.8, manager: 4.0 },
      skillGap: 1.0,
      requiredLevel: 5,
    },
  ],
  DEV: [
    {
      category: "Programming",
      skill: "JavaScript",
      description: "Proficiency in JavaScript programming.",
      levels: [
        { level: 1, description: "Basic syntax understanding" },
        { level: 2, description: "Can write simple scripts" },
        { level: 3, description: "Develops moderate complexity applications" },
        { level: 4, description: "Creates advanced frameworks" },
        { level: 5, description: "Optimizes and scales large applications" },
        { level: 6, description: "Contributes to JavaScript ecosystem" },
      ],
      averageAssessment: { self: 4.2, manager: 4.0 },
      skillGap: 0.8,
      requiredLevel: 5,
    },
    {
      category: "Web Development",
      skill: "React",
      description: "Proficiency in React library for building user interfaces.",
      levels: [
        { level: 1, description: "Basic understanding of React concepts" },
        { level: 2, description: "Can create simple React components" },
        {
          level: 3,
          description: "Develops moderate complexity React applications",
        },
        { level: 4, description: "Creates advanced React architectures" },
        {
          level: 5,
          description: "Optimizes and scales large React applications",
        },
        { level: 6, description: "Contributes to React ecosystem" },
      ],
      averageAssessment: { self: 3.9, manager: 3.7 },
      skillGap: 1.1,
      requiredLevel: 5,
    },
  ],
  DATA: [
    {
      category: "Machine Learning",
      skill: "Python for Data Science",
      description: "Proficiency in using Python for data science tasks.",
      levels: [
        { level: 1, description: "Basic Python syntax understanding" },
        { level: 2, description: "Can perform simple data analysis tasks" },
        {
          level: 3,
          description: "Develops moderate complexity data pipelines",
        },
        { level: 4, description: "Creates advanced machine learning models" },
        {
          level: 5,
          description: "Optimizes and scales data science solutions",
        },
        { level: 6, description: "Contributes to data science libraries" },
      ],
      averageAssessment: { self: 3.5, manager: 3.3 },
      skillGap: 1.7,
      requiredLevel: 5,
    },
    {
      category: "Data Visualization",
      skill: "Tableau",
      description: "Proficiency in using Tableau for data visualization.",
      levels: [
        { level: 1, description: "Basic understanding of Tableau interface" },
        { level: 2, description: "Can create simple visualizations" },
        { level: 3, description: "Develops interactive dashboards" },
        { level: 4, description: "Creates advanced data stories" },
        { level: 5, description: "Optimizes and scales enterprise dashboards" },
        { level: 6, description: "Contributes to Tableau community" },
      ],
      averageAssessment: { self: 3.7, manager: 3.6 },
      skillGap: 1.4,
      requiredLevel: 5,
    },
  ],
};

const USERS = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    department: "Software QA Services",
    businessUnit: "QA",
    role: "QA Engineer",
    grade: "Professional II",
    status: "Active",
    skills: [
      {
        name: "Test Planning",
        level: 3,
        selfAssessment: 3,
        managerAssessment: 3,
      },
      { name: "Selenium", level: 4, selfAssessment: 4, managerAssessment: 4 },
    ],
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    department: "Software Development",
    businessUnit: "DEV",
    role: "Frontend Developer",
    grade: "Professional III",
    status: "Active",
    skills: [
      { name: "JavaScript", level: 4, selfAssessment: 5, managerAssessment: 4 },
      { name: "React", level: 4, selfAssessment: 4, managerAssessment: 4 },
    ],
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice@example.com",
    department: "Data Science",
    businessUnit: "DATA",
    role: "Data Scientist",
    grade: "Professional II",
    status: "Active",
    skills: [
      {
        name: "Python for Data Science",
        level: 3,
        selfAssessment: 4,
        managerAssessment: 3,
      },
      { name: "Tableau", level: 3, selfAssessment: 3, managerAssessment: 3 },
    ],
  },
];

const DEPARTMENTS = [
  {
    name: "Software QA Services",
    businessUnit: "QA",
    headCount: 15,
    teams: [
      { name: "Web Testing Team", headCount: 5 },
      { name: "Mobile Testing Team", headCount: 5 },
      { name: "API Testing Team", headCount: 5 },
    ],
  },
  {
    name: "Software Development",
    businessUnit: "DEV",
    headCount: 25,
    teams: [
      { name: "Frontend Team", headCount: 10 },
      { name: "Backend Team", headCount: 10 },
      { name: "DevOps Team", headCount: 5 },
    ],
  },
  {
    name: "Data Science",
    businessUnit: "DATA",
    headCount: 20,
    teams: [
      { name: "Machine Learning Team", headCount: 10 },
      { name: "Data Analytics Team", headCount: 10 },
    ],
  },
];

export default function Component() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBusinessUnit, setSelectedBusinessUnit] = useState("ALL");
  const [filteredUsers, setFilteredUsers] = useState(USERS);
  const [filteredDepartments, setFilteredDepartments] = useState(DEPARTMENTS);
  const [editingSkill, setEditingSkill] = useState(null);

  useEffect(() => {
    const filtered = USERS.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.skills.some((skill) =>
          skill.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesBusinessUnit =
        selectedBusinessUnit === "ALL" ||
        user.businessUnit === selectedBusinessUnit;

      return matchesSearch && matchesBusinessUnit;
    });
    setFilteredUsers(filtered);

    const filteredDepts = DEPARTMENTS.filter(
      (dept) =>
        selectedBusinessUnit === "ALL" ||
        dept.businessUnit === selectedBusinessUnit
    );
    setFilteredDepartments(filteredDepts);
  }, [searchQuery, selectedBusinessUnit]);

  const skillLevels = {
    1: "Novice",
    2: "Beginner",
    3: "Intermediate",
    4: "Advanced",
    5: "Expert",
    6: "Guru",
  };

  const getSkillStatusIcon = (currentLevel, requiredLevel) => {
    if (currentLevel >= requiredLevel) {
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    } else if (currentLevel === requiredLevel - 1) {
      return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    }
    return <XCircle className="h-5 w-5 text-red-500" />;
  };

  const handleSkillEdit = (skill) => {
    setEditingSkill({ ...skill });
  };

  const handleSkillSave = () => {
    // Logic to save the edited skill
    setEditingSkill(null);
  };

  const SummaryDashboard = () => {
    const totalEmployees = USERS.length;
    const totalDepartments = DEPARTMENTS.length;
    const averageSkillLevel = (
      USERS.reduce(
        (acc, user) =>
          acc +
          user.skills.reduce((sum, skill) => sum + skill.level, 0) /
            user.skills.length,
        0
      ) / USERS.length
    ).toFixed(1);

    const allSkills = Object.values(SKILLS).flat();
    const topSkills = allSkills
      .sort(
        (a, b) =>
          (b.averageAssessment.manager + b.averageAssessment.self) / 2 -
          (a.averageAssessment.manager + a.averageAssessment.self) / 2
      )
      .slice(0, 5);

    const skillGapOverview = allSkills
      .sort((a, b) => b.skillGap - a.skillGap)
      .slice(0, 3);

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalEmployees}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Departments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalDepartments}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Average Skill Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{averageSkillLevel}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {topSkills.map((skill) => (
                <li
                  key={skill.skill}
                  className="flex justify-between items-center"
                >
                  <span>{skill.skill}</span>
                  <Badge>
                    {
                      skillLevels[
                        Math.round(
                          (skill.averageAssessment.manager +
                            skill.averageAssessment.self) /
                            2
                        )
                      ]
                    }
                  </Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Skill Gap Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {skillGapOverview.map((skill) => (
                <div key={skill.skill}>
                  <div className="flex justify-between items-center">
                    <span>{skill.skill}</span>
                    <span>{skill.skillGap.toFixed(1)}</span>
                  </div>
                  <Progress
                    value={(1 - skill.skillGap / 6) * 100}
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Department Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {DEPARTMENTS.map((dept) => (
                <li
                  key={dept.name}
                  className="flex justify-between items-center"
                >
                  <span>{dept.name}</span>
                  <Badge>{dept.headCount}</Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="h-16 max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
            <Badge variant="secondary">Data synced: Today 8:00 AM</Badge>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Admin User</DropdownMenuLabel>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content Start */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Business Unit Selection and Search */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Select
              value={selectedBusinessUnit}
              onValueChange={setSelectedBusinessUnit}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select Business Unit">
                  <div className="flex items-center">
                    <Building2 className="w-4 h-4 mr-2" />
                    {BUSINESS_UNITS[selectedBusinessUnit]}
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {Object.entries(BUSINESS_UNITS).map(([code, name]) => (
                  <SelectItem key={code} value={code}>
                    <div className="flex items-center">
                      <Building2 className="w-4 h-4 mr-2" />
                      {name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search users or skills..."
                className="pl-8 w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {selectedBusinessUnit === "ALL" && <SummaryDashboard />}

        {/* Tabs Structure */}
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Skills
            </TabsTrigger>
            <TabsTrigger
              value="required-skills"
              className="flex items-center gap-2"
            >
              <Award className="h-4 w-4" />
              Required Skills
            </TabsTrigger>
            <TabsTrigger
              value="organization"
              className="flex items-center gap-2"
            >
              <Network className="h-4 w-4" />
              Organization
            </TabsTrigger>
            <TabsTrigger value="metrics" className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4" />
              Metrics
            </TabsTrigger>
            <TabsTrigger value="learning" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Learning
            </TabsTrigger>
          </TabsList>

          {/* Users Tab Content */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>User Directory</CardTitle>
                    <CardDescription>
                      View and manage users and their skills
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge variant="outline">{user.grade}</Badge>
                        <Badge variant="secondary">{user.department}</Badge>
                        <Badge
                          variant={
                            user.status === "Active" ? "success" : "destructive"
                          }
                        >
                          {user.status}
                        </Badge>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              View Skills
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl">
                            <DialogHeader>
                              <DialogTitle>{user.name}'s Skills</DialogTitle>
                              <DialogDescription>
                                Skill levels and proficiencies
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              {user.skills.map((skill, index) => {
                                const skillDetails = SKILLS[
                                  user.businessUnit
                                ].find((s) => s.skill === skill.name);
                                return (
                                  <div key={index} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                      <span className="font-medium">
                                        {skill.name}
                                      </span>
                                      <div className="flex items-center space-x-2">
                                        <Progress
                                          value={skill.level * 16.67}
                                          className="w-[100px]"
                                        />
                                        <span className="text-sm text-gray-500">
                                          {skillLevels[skill.level]}
                                        </span>
                                        <TooltipProvider>
                                          <Tooltip>
                                            <TooltipTrigger>
                                              {getSkillStatusIcon(
                                                skill.level,
                                                skillDetails?.requiredLevel || 0
                                              )}
                                            </TooltipTrigger>
                                            <TooltipContent>
                                              Required Level:{" "}
                                              {
                                                skillLevels[
                                                  skillDetails?.requiredLevel ||
                                                    0
                                                ]
                                              }
                                            </TooltipContent>
                                          </Tooltip>
                                        </TooltipProvider>
                                      </div>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                      {skillDetails?.description}
                                    </p>
                                    <p className="text-sm font-medium">
                                      Current Level:{" "}
                                      {
                                        skillDetails?.levels[skill.level - 1]
                                          ?.description
                                      }
                                    </p>
                                    <div className="flex justify-between text-sm">
                                      <span>
                                        Self Assessment:{" "}
                                        {skillLevels[skill.selfAssessment]}
                                      </span>
                                      <span>
                                        Manager Assessment:{" "}
                                        {skillLevels[skill.managerAssessment]}
                                      </span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills">
            <Card>
              <CardHeader>
                <CardTitle>Skills Directory</CardTitle>
                <CardDescription>
                  View and manage skills across the organization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {Object.entries(SKILLS).map(([businessUnit, skills]) =>
                    selectedBusinessUnit === "ALL" ||
                    selectedBusinessUnit === businessUnit ? (
                      <div key={businessUnit}>
                        <h3 className="text-lg font-semibold mb-4">
                          {BUSINESS_UNITS[businessUnit]}
                        </h3>
                        {skills.map((skill) => (
                          <Card key={skill.skill} className="mb-4">
                            <CardHeader>
                              <CardTitle className="text-lg">
                                {skill.skill}
                              </CardTitle>
                              <CardDescription>
                                {skill.category}
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-gray-600 mb-4">
                                {skill.description}
                              </p>
                              <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="text-sm text-gray-500">
                                    Users with this skill:
                                  </span>
                                  <Badge>
                                    {
                                      USERS.filter((user) =>
                                        user.skills.some(
                                          (s) => s.name === skill.skill
                                        )
                                      ).length
                                    }
                                  </Badge>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm text-gray-500">
                                    Average proficiency:
                                  </span>
                                  <Badge variant="secondary">
                                    {Math.round(
                                      (USERS.filter((user) =>
                                        user.skills.some(
                                          (s) => s.name === skill.skill
                                        )
                                      ).reduce(
                                        (acc, user) =>
                                          acc +
                                          user.skills.find(
                                            (s) => s.name === skill.skill
                                          ).level,
                                        0
                                      ) /
                                        USERS.filter((user) =>
                                          user.skills.some(
                                            (s) => s.name === skill.skill
                                          )
                                        ).length) *
                                        10
                                    ) / 10}
                                  </Badge>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm text-gray-500">
                                    Required level:
                                  </span>
                                  <Badge variant="outline">
                                    {skillLevels[skill.requiredLevel]}
                                  </Badge>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm text-gray-500">
                                    Average self-assessment:
                                  </span>
                                  <Badge variant="outline">
                                    {skill.averageAssessment.self.toFixed(1)}
                                  </Badge>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm text-gray-500">
                                    Average manager assessment:
                                  </span>
                                  <Badge variant="outline">
                                    {skill.averageAssessment.manager.toFixed(1)}
                                  </Badge>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm text-gray-500">
                                    Skill gap:
                                  </span>
                                  <Badge
                                    variant={
                                      skill.skillGap > 1.5
                                        ? "destructive"
                                        : "success"
                                    }
                                  >
                                    {skill.skillGap.toFixed(1)}
                                  </Badge>
                                </div>
                              </div>
                              <div className="mt-4">
                                <h4 className="text-sm font-medium mb-2">
                                  Skill Levels:
                                </h4>
                                <div className="space-y-2">
                                  {skill.levels.map((level, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center space-x-2"
                                    >
                                      <Badge
                                        variant={
                                          level.level === skill.requiredLevel
                                            ? "default"
                                            : "outline"
                                        }
                                      >
                                        {skillLevels[level.level]}
                                      </Badge>
                                      <span className="text-sm">
                                        {level.description}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : null
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Required Skills Tab */}
          <TabsContent value="required-skills">
            <Card>
              <CardHeader>
                <CardTitle>Required Skills Matrix</CardTitle>
                <CardDescription>
                  Manage skill requirements by career level
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Career Level Selector */}
                  <div className="flex items-center space-x-4 mb-6">
                    <Label>Career Level:</Label>
                    <Select defaultValue="2">
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select Career Level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Professional I</SelectItem>
                        <SelectItem value="2">Professional II</SelectItem>
                        <SelectItem value="3">Professional III</SelectItem>
                        <SelectItem value="4">Professional IV</SelectItem>
                        <SelectItem value="5">Manager I</SelectItem>
                        <SelectItem value="6">Manager II</SelectItem>
                        <SelectItem value="7">Manager III</SelectItem>
                        <SelectItem value="8">Manager IV</SelectItem>
                        <SelectItem value="9">Director I</SelectItem>
                        <SelectItem value="10">Director II</SelectItem>
                        <SelectItem value="11">Director III</SelectItem>
                        <SelectItem value="12">Director IV</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Skills Matrix Table */}
                  <div className="border rounded-lg">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b bg-slate-50">
                            <th className="text-left p-4">Skill Category</th>
                            <th className="text-left p-4">Skill</th>
                            <th className="text-center p-4">Required Level</th>
                            <th className="text-center p-4">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.entries(SKILLS).map(
                            ([businessUnit, skills]) =>
                              selectedBusinessUnit === "ALL" ||
                              selectedBusinessUnit === businessUnit ? (
                                <React.Fragment key={businessUnit}>
                                  <tr className="border-b bg-slate-100">
                                    <td colSpan={4} className="p-2 font-medium">
                                      {BUSINESS_UNITS[businessUnit]}
                                    </td>
                                  </tr>
                                  {skills.map((skill) => (
                                    <tr
                                      key={skill.skill}
                                      className="border-b hover:bg-slate-50"
                                    >
                                      <td className="p-4">{skill.category}</td>
                                      <td className="p-4">{skill.skill}</td>
                                      <td className="p-4">
                                        <Select
                                          defaultValue={skill.requiredLevel.toString()}
                                        >
                                          <SelectTrigger className="w-[140px]">
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            {Object.entries(skillLevels).map(
                                              ([level, label]) => (
                                                <SelectItem
                                                  key={level}
                                                  value={level}
                                                >
                                                  {label}
                                                </SelectItem>
                                              )
                                            )}
                                          </SelectContent>
                                        </Select>
                                      </td>
                                      <td className="p-4 text-center">
                                        <div className="flex justify-center space-x-2">
                                          <Button variant="outline" size="sm">
                                            <Edit className="h-4 w-4" />
                                          </Button>
                                          <Button variant="outline" size="sm">
                                            <Save className="h-4 w-4" />
                                          </Button>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                </React.Fragment>
                              ) : null
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Bulk Actions */}
                  <div className="flex justify-end space-x-4">
                    <Button variant="outline">Import Requirements</Button>
                    <Button variant="outline">Export Requirements</Button>
                    <Button>Save All Changes</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Organization Tab */}
          <TabsContent value="organization">
            <Card>
              <CardHeader>
                <CardTitle>Organization Structure</CardTitle>
                <CardDescription>
                  Department and team hierarchy with skill distribution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {filteredDepartments.map((department) => (
                    <Card key={department.name}>
                      <CardHeader>
                        <CardTitle>{department.name}</CardTitle>
                        <CardDescription>
                          Total Headcount: {department.headCount}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {department.teams.map((team) => (
                            <div
                              key={team.name}
                              className="border rounded-lg p-4"
                            >
                              <h4 className="font-medium mb-2">{team.name}</h4>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">
                                  Headcount:
                                </span>
                                <Badge>{team.headCount}</Badge>
                              </div>
                              <div className="mt-4 space-y-2">
                                <h5 className="text-sm font-medium">
                                  Top Skills:
                                </h5>
                                {SKILLS[department.businessUnit].map(
                                  (skill) => (
                                    <div
                                      key={skill.skill}
                                      className="flex justify-between items-center"
                                    >
                                      <span className="text-sm">
                                        {skill.skill}
                                      </span>
                                      <div className="flex items-center space-x-2">
                                        <Badge variant="outline">
                                          Avg. Level:{" "}
                                          {(Math.random() * 2 + 3).toFixed(1)}
                                        </Badge>
                                        <TooltipProvider>
                                          <Tooltip>
                                            <TooltipTrigger>
                                              {getSkillStatusIcon(
                                                Math.floor(
                                                  Math.random() * 3 + 3
                                                ),
                                                skill.requiredLevel
                                              )}
                                            </TooltipTrigger>
                                            <TooltipContent>
                                              Required Level:{" "}
                                              {skillLevels[skill.requiredLevel]}
                                            </TooltipContent>
                                          </Tooltip>
                                        </TooltipProvider>
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Metrics Tab */}
          <TabsContent value="metrics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Skill Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Skill Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(SKILLS).map(([businessUnit, skills]) =>
                      selectedBusinessUnit === "ALL" ||
                      selectedBusinessUnit === businessUnit ? (
                        <div key={businessUnit}>
                          <h3 className="text-md font-semibold mb-2">
                            {BUSINESS_UNITS[businessUnit]}
                          </h3>
                          {skills.map((skill) => {
                            const usersWithSkill = USERS.filter((u) =>
                              u.skills.some((s) => s.name === skill.skill)
                            );
                            return (
                              <div
                                key={skill.skill}
                                className="flex items-center justify-between"
                              >
                                <span className="text-sm font-medium">
                                  {skill.skill}
                                </span>
                                <div className="flex items-center space-x-2">
                                  <Badge variant="secondary">
                                    {usersWithSkill.length} users
                                  </Badge>
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger>
                                        {getSkillStatusIcon(
                                          Math.round(
                                            usersWithSkill.reduce(
                                              (acc, user) =>
                                                acc +
                                                user.skills.find(
                                                  (s) => s.name === skill.skill
                                                ).level,
                                              0
                                            ) / usersWithSkill.length
                                          ),
                                          skill.requiredLevel
                                        )}
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        Required Level:{" "}
                                        {skillLevels[skill.requiredLevel]}
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : null
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Grade Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Grade Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Array.from(new Set(USERS.map((u) => u.grade))).map(
                      (grade) => {
                        const count = USERS.filter(
                          (u) => u.grade === grade
                        ).length;
                        return (
                          <div
                            key={grade}
                            className="flex items-center justify-between"
                          >
                            <span className="text-sm font-medium">{grade}</span>
                            <Badge variant="secondary">{count} users</Badge>
                          </div>
                        );
                      }
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Skill Gap Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Skill Gap Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(SKILLS).map(([businessUnit, skills]) =>
                      selectedBusinessUnit === "ALL" ||
                      selectedBusinessUnit === businessUnit ? (
                        <div key={businessUnit}>
                          <h3 className="text-md font-semibold mb-2">
                            {BUSINESS_UNITS[businessUnit]}
                          </h3>
                          {skills.map((skill) => (
                            <div key={skill.skill} className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">
                                  {skill.skill}
                                </span>
                                <Badge
                                  variant={
                                    skill.skillGap > 1.5
                                      ? "destructive"
                                      : "success"
                                  }
                                >
                                  Gap: {skill.skillGap.toFixed(1)}
                                </Badge>
                              </div>
                              <Progress
                                value={
                                  (skill.requiredLevel - skill.skillGap) * 16.67
                                }
                                className="h-2"
                              />
                              <div className="flex justify-between text-xs text-gray-500">
                                <span>
                                  Current Avg:{" "}
                                  {(
                                    skill.requiredLevel - skill.skillGap
                                  ).toFixed(1)}
                                </span>
                                <span>Required: {skill.requiredLevel}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : null
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Improvement Trends */}
              <Card>
                <CardHeader>
                  <CardTitle>Skill Improvement Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(SKILLS).map(([businessUnit, skills]) =>
                      selectedBusinessUnit === "ALL" ||
                      selectedBusinessUnit === businessUnit ? (
                        <div key={businessUnit}>
                          <h3 className="text-md font-semibold mb-2">
                            {BUSINESS_UNITS[businessUnit]}
                          </h3>
                          {skills.map((skill) => (
                            <div key={skill.skill} className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">
                                  {skill.skill}
                                </span>
                                <Badge variant="outline">
                                  +{(Math.random() * 0.5 + 0.1).toFixed(1)} in 3
                                  months
                                </Badge>
                              </div>
                              <Progress
                                value={Math.random() * 20 + 80}
                                className="h-2"
                              />
                              <div className="flex justify-between text-xs text-gray-500">
                                <span>
                                  Current:{" "}
                                  {(
                                    skill.requiredLevel - skill.skillGap
                                  ).toFixed(1)}
                                </span>
                                <span>Target: {skill.requiredLevel}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : null
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          {/* Add new TabsContent for Learning */}
          <TabsContent value="learning">
            <Card>
              <CardHeader>
                <CardTitle>Learning Management</CardTitle>
                <CardDescription>
                  Manage career paths and learning resources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Career Paths Overview */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Career Progression Paths</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          {
                            pathId: "PATH001",
                            name: "QA Foundation Path",
                            level: "Professional I",
                            target: 2,
                            courses: 3,
                            duration: "6 months",
                            commitment: "5-10 hours",
                          },
                          {
                            pathId: "PATH002",
                            name: "QA Professional Path",
                            level: "Professional II",
                            target: 3,
                            courses: 3,
                            duration: "9 months",
                            commitment: "8-12 hours",
                          },
                          // Add other paths...
                        ].map((path) => (
                          <div
                            key={path.pathId}
                            className="border rounded-lg p-4"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-medium">{path.name}</h4>
                                <p className="text-sm text-gray-500">
                                  {path.level}
                                </p>
                              </div>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    View Details
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>{path.name}</DialogTitle>
                                    <DialogDescription>
                                      Career path details and courses
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label>Target Level</Label>
                                        <p className="text-sm mt-1">
                                          Level {path.target}
                                        </p>
                                      </div>
                                      <div>
                                        <Label>Duration</Label>
                                        <p className="text-sm mt-1">
                                          {path.duration}
                                        </p>
                                      </div>
                                      <div>
                                        <Label>Weekly Commitment</Label>
                                        <p className="text-sm mt-1">
                                          {path.commitment}
                                        </p>
                                      </div>
                                      <div>
                                        <Label>Number of Courses</Label>
                                        <p className="text-sm mt-1">
                                          {path.courses} courses
                                        </p>
                                      </div>
                                    </div>
                                    <div>
                                      <Label>Prerequisites</Label>
                                      <p className="text-sm mt-1">
                                        Complete previous path + required
                                        experience
                                      </p>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Target Level</span>
                                <Badge variant="secondary">
                                  Level {path.target}
                                </Badge>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Duration</span>
                                <span>{path.duration}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Commitment</span>
                                <span>{path.commitment}/week</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Learning Resources */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Learning Resources</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Select defaultValue="all">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by Category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="Technical">Technical</SelectItem>
                            <SelectItem value="Process">Process</SelectItem>
                            <SelectItem value="Leadership">
                              Leadership
                            </SelectItem>
                            <SelectItem value="Management">
                              Management
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <Select defaultValue="all">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by Level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Levels</SelectItem>
                            <SelectItem value="2">Level 2</SelectItem>
                            <SelectItem value="3">Level 3</SelectItem>
                            <SelectItem value="4">Level 4</SelectItem>
                            <SelectItem value="5">Level 5</SelectItem>
                            <SelectItem value="6">Level 6</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          {
                            category: "Technical",
                            name: "ISTQB Foundation Level Testing",
                            provider: "ISTQB",
                            duration: "6 weeks",
                            format: "Online Course",
                            level: 2,
                            certification: "ISTQB Foundation",
                          },
                          {
                            category: "Process",
                            name: "Advanced Test Planning & Strategy",
                            provider: "Coursera",
                            duration: "6 weeks",
                            format: "Interactive",
                            level: 3,
                            certification: "None",
                          },
                          // Add other resources...
                        ].map((resource, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-medium">{resource.name}</h4>
                                <p className="text-sm text-gray-500">
                                  {resource.provider}
                                </p>
                              </div>
                              <Badge>{resource.category}</Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <span className="text-gray-500">Duration:</span>{" "}
                                {resource.duration}
                              </div>
                              <div>
                                <span className="text-gray-500">Format:</span>{" "}
                                {resource.format}
                              </div>
                              <div>
                                <span className="text-gray-500">Level:</span>{" "}
                                {resource.level}
                              </div>
                              <div>
                                <span className="text-gray-500">
                                  Certification:
                                </span>{" "}
                                {resource.certification}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Path Progress Tracking */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Path Progress Tracking</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          {
                            path: "QA Foundation Path",
                            activeUsers: 15,
                            completion: 75,
                            certifications: 10,
                          },
                          {
                            path: "QA Professional Path",
                            activeUsers: 12,
                            completion: 60,
                            certifications: 8,
                          },
                          // Add other progress data...
                        ].map((progress, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">
                                {progress.path}
                              </span>
                              <Badge variant="outline">
                                {progress.activeUsers} users
                              </Badge>
                            </div>
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>Completion Rate</span>
                                <span>{progress.completion}%</span>
                              </div>
                              <Progress
                                value={progress.completion}
                                className="h-2"
                              />
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Certifications Achieved</span>
                              <Badge variant="secondary">
                                {progress.certifications}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Resource Management */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Resource Management</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm">
                            Add Resource
                          </Button>
                          <Button variant="outline" size="sm">
                            Import
                          </Button>
                          <Button variant="outline" size="sm">
                            Export
                          </Button>
                        </div>
                        {[
                          "Technical",
                          "Process",
                          "Leadership",
                          "Management",
                        ].map((category) => (
                          <div key={category} className="border rounded-lg p-4">
                            <h4 className="font-medium mb-2">{category}</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Total Resources</span>
                                <Badge>12</Badge>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Active Courses</span>
                                <Badge variant="secondary">8</Badge>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="w-full mt-2"
                              >
                                Manage Resources
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
