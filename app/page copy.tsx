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
  CLD: "Cloud",
  FIN: "Finance & Accounting",
  SW: "Software Services",
  ADM: "Administrative Services",
  QA: "Software QA Services",
  AI: "AI Labs",
  PMO: "Project Management Office",
  SLS: "Sales",
  MKT: "Marketing",
  HR: "Human Resources",
  DATA: "Big Data",
  IT: "IT Service Management",
  VS: "Venture Studio",
};

// Mock data structures
const QA_SKILLS = [
  {
    category: "Governance and Compliance",
    skill: "Quality Standards",
    description:
      "Develop, review and communicate clear quality expectations and standards within an organisation that are aligned to the company's values and business objectives.",
    levels: [
      { level: 1, description: "Understand basic quality concepts" },
      {
        level: 2,
        description: "Document business requirements and identify basic needs",
      },
      { level: 3, description: "Implement process improvement methods" },
      { level: 4, description: "Assess existing quality standards" },
      { level: 5, description: "Establish quality expectations" },
      { level: 6, description: "Review and update guidelines" },
    ],
    averageAssessment: { self: 3.2, manager: 3.5 },
    skillGap: 1.8,
    requiredLevel: 5,
  },
  // [Previous QA_SKILLS data continues...]
];

const USERS = [
  {
    id: 1,
    name: "John Doe",
    email: "john@stratpoint.com",
    department: "Software QA Services",
    businessUnit: "QA",
    role: "QA Engineer",
    grade: "Professional II",
    status: "Active",
    skills: [
      {
        name: "Quality Standards",
        level: 2,
        selfAssessment: 2,
        managerAssessment: 2,
      },
      {
        name: "Test Planning and Design",
        level: 3,
        selfAssessment: 3,
        managerAssessment: 3,
      },
      {
        name: "Test Automation",
        level: 2,
        selfAssessment: 2,
        managerAssessment: 2,
      },
    ],
  },
  // [Previous USERS data continues...]
];

const DEPARTMENTS = [
  {
    name: "Software QA Services",
    headCount: 15,
    teams: [
      { name: "Web Testing Team", headCount: 5 },
      { name: "Mobile Testing Team", headCount: 5 },
      { name: "API Testing Team", headCount: 5 },
    ],
  },
  // [Previous DEPARTMENTS data continues...]
];
export default function EnhancedSkillsManagementDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBusinessUnit, setSelectedBusinessUnit] = useState("ALL");
  const [filteredUsers, setFilteredUsers] = useState(USERS);
  const [qaSkills, setQaSkills] = useState(QA_SKILLS);
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
    setQaSkills((prevSkills) =>
      prevSkills.map((skill) =>
        skill.skill === editingSkill.skill ? editingSkill : skill
      )
    );
    setEditingSkill(null);
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
          </TabsList>

          {/* Tab content will continue in next parts... */}
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
                              <DialogTitle>{user.name}'s QA Skills</DialogTitle>
                              <DialogDescription>
                                Skill levels and proficiencies in QA domains
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              {user.skills.map((skill, index) => {
                                const skillDetails = qaSkills.find(
                                  (s) => s.skill === skill.name
                                );
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
                <CardTitle>QA Skills Directory</CardTitle>
                <CardDescription>
                  View and manage QA skills across the organization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {qaSkills.map((skill) => (
                    <Card key={skill.skill}>
                      <CardHeader>
                        <CardTitle className="text-lg">{skill.skill}</CardTitle>
                        <CardDescription>{skill.category}</CardDescription>
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
                                skill.skillGap > 1.5 ? "destructive" : "success"
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
                          {/* Soft Skills */}
                          <tr className="border-b bg-slate-100">
                            <td colSpan={4} className="p-2 font-medium">
                              Soft Skills
                            </td>
                          </tr>
                          <tr className="border-b hover:bg-slate-50">
                            <td className="p-4">Soft Skills</td>
                            <td className="p-4">Problem Solving</td>
                            <td className="p-4">
                              <Select defaultValue="2">
                                <SelectTrigger className="w-[140px]">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {Object.entries(skillLevels).map(
                                    ([level, label]) => (
                                      <SelectItem key={level} value={level}>
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
                          <tr className="border-b hover:bg-slate-50">
                            <td className="p-4">Soft Skills</td>
                            <td className="p-4">Creative Thinking</td>
                            <td className="p-4">
                              <Select defaultValue="2">
                                <SelectTrigger className="w-[140px]">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {Object.entries(skillLevels).map(
                                    ([level, label]) => (
                                      <SelectItem key={level} value={level}>
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
                          {/* Add other soft skills: Decision Making, Communication, etc. */}

                          {/* Technical Skills */}
                          <tr className="border-b bg-slate-100">
                            <td colSpan={4} className="p-2 font-medium">
                              Technical Skills
                            </td>
                          </tr>
                          <tr className="border-b hover:bg-slate-50">
                            <td className="p-4">QA</td>
                            <td className="p-4">Software Testing</td>
                            <td className="p-4">
                              <Select defaultValue="2">
                                <SelectTrigger className="w-[140px]">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {Object.entries(skillLevels).map(
                                    ([level, label]) => (
                                      <SelectItem key={level} value={level}>
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
                          {/* Add other technical skills: Test Planning, Quality Engineering, etc. */}
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
                  Department and team hierarchy with QA skill distribution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {DEPARTMENTS.map((department) => (
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
                              {department.name === "Software QA Services" && (
                                <div className="mt-4 space-y-2">
                                  <h5 className="text-sm font-medium">
                                    Top Skills:
                                  </h5>
                                  {qaSkills.map((skill) => (
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
                                  ))}
                                </div>
                              )}
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
              {/* QA Skill Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>QA Skill Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {qaSkills.map((skill) => {
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
                  <CardTitle>QA Skill Gap Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {qaSkills.map((skill) => (
                      <div key={skill.skill} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            {skill.skill}
                          </span>
                          <Badge
                            variant={
                              skill.skillGap > 1.5 ? "destructive" : "success"
                            }
                          >
                            Gap: {skill.skillGap.toFixed(1)}
                          </Badge>
                        </div>
                        <Progress
                          value={(skill.requiredLevel - skill.skillGap) * 16.67}
                          className="h-2"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>
                            Current Avg:{" "}
                            {(skill.requiredLevel - skill.skillGap).toFixed(1)}
                          </span>
                          <span>Required: {skill.requiredLevel}</span>
                        </div>
                      </div>
                    ))}
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
                    {qaSkills.map((skill) => (
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
                            {(skill.requiredLevel - skill.skillGap).toFixed(1)}
                          </span>
                          <span>Target: {skill.requiredLevel}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
