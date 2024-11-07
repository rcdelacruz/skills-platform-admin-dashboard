'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { Award, BookOpen, TrendingUp, Calendar, Star, Brain, Scroll, Users, GitBranch, ChevronRight, Search, Filter, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"

const mockTrainingCourses = {
    'Software Testing': {
        advanced: 'Advanced Test Automation Techniques',
        intermediate: 'Comprehensive Software Testing Strategies',
        basic: 'Fundamentals of Software Testing'
    },
    'Test Planning': {
        advanced: 'Strategic Test Planning and Management',
        intermediate: 'Effective Test Plan Development',
        basic: 'Introduction to Test Planning'
    },
    'Agile Software Development': {
        advanced: 'Scaling Agile in Enterprise',
        intermediate: 'Advanced Scrum Master Certification',
        basic: 'Agile Methodologies Fundamentals'
    },
    'Problem Solving': {
        advanced: 'Advanced Problem-Solving and Decision-Making',
        intermediate: 'Critical Thinking and Analytical Skills',
        basic: 'Problem-Solving Techniques for Professionals'
    },
    'Communication': {
        advanced: 'Executive Communication Skills',
        intermediate: 'Effective Technical Communication',
        basic: 'Fundamentals of Business Communication'
    },
    'Collaboration and Inclusivity': {
        advanced: 'Leading Inclusive Teams in Tech',
        intermediate: 'Building Collaborative Work Environments',
        basic: 'Diversity and Inclusion in the Workplace'
    }
};

const skillCategories = {
    'Soft Skills': [
        'Problem Solving', 'Creative Thinking', 'Decision Making', 'Communication',
        'Collaboration and Inclusivity', 'Customer Orientation', 'Developing People',
        'Influence', 'Adaptability', 'Self Management and Improvement'
    ],
    'Technical Skills': [
        'Software Testing', 'Test Planning', 'Stakeholder Management',
        'Business Needs Analysis', 'Agile Software Development', 'Quality Engineering',
        'Problem Management', 'Emerging Technology Synthesis', 'Project Management',
        'Quality Assurance', 'Process Improvement and Optimization',
        'Learning and Development', 'Quality Standards'
    ]
};

// Mock data
const mockEmployeeData = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "QA Engineer",
    department: "Quality Assurance",
    grade: "Professional II"
};

const mockSkillsData = [
    { skill: "Software Testing", category: "Technical Skills", selfRating: 4, managerRating: 3, requiredRating: 4 },
    { skill: "Test Planning", category: "Technical Skills", selfRating: 3, managerRating: 3, requiredRating: 4 },
    { skill: "Agile Software Development", category: "Technical Skills", selfRating: 4, managerRating: 4, requiredRating: 3 },
    { skill: "Problem Solving", category: "Soft Skills", selfRating: 4, managerRating: 4, requiredRating: 4 },
    { skill: "Communication", category: "Soft Skills", selfRating: 3, managerRating: 4, requiredRating: 4 },
    { skill: "Collaboration and Inclusivity", category: "Soft Skills", selfRating: 4, managerRating: 3, requiredRating: 3 },
];

const mockTeamData = [
    { name: "Alice Smith", role: "Senior QA Engineer", level: "Professional III", technicalAvg: 4.2, softAvg: 4.5 },
    { name: "Bob Johnson", role: "QA Analyst", level: "Professional I", technicalAvg: 3.5, softAvg: 3.8 },
    { name: "Charlie Brown", role: "QA Engineer", level: "Professional II", technicalAvg: 3.8, softAvg: 4.0 },
    { name: "Diana Prince", role: "QA Lead", level: "Expert I", technicalAvg: 4.5, softAvg: 4.7 },
];

const mockTeamComposition = [
    { name: 'Professional I', value: 2 },
    { name: 'Professional II', value: 3 },
    { name: 'Professional III', value: 2 },
    { name: 'Professional IV', value: 1 },
    { name: 'Expert I', value: 1 },
];

const mockTeamSkillsData = [
    { skill: "Software Testing", category: "Technical Skills", averageRating: 3.8 },
    { skill: "Test Planning", category: "Technical Skills", averageRating: 3.5 },
    { skill: "Agile Software Development", category: "Technical Skills", averageRating: 4.0 },
    { skill: "Problem Solving", category: "Soft Skills", averageRating: 4.2 },
    { skill: "Communication", category: "Soft Skills", averageRating: 3.9 },
    { skill: "Collaboration and Inclusivity", category: "Soft Skills", averageRating: 4.1 },
];

export default function EnhancedEmployeeDashboard({ isManager = false }) {
    const [activeTab, setActiveTab] = useState('overview')

    const calculateSkillGap = (self, manager, required) => {
        const currentLevel = Math.min(self, manager);
        return Math.max(required - currentLevel, 0);
    };

    const getSkillStatusIcon = (self, manager, required) => {
        const currentLevel = Math.min(self, manager);
        if (currentLevel >= required) {
            return <CheckCircle2 className="h-5 w-5 text-green-500" />;
        } else if (currentLevel === required - 1) {
            return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
        } else {
            return <XCircle className="h-5 w-5 text-red-500" />;
        }
    };

    const averageRating = (category) => {
        const filteredSkills = mockSkillsData.filter(skill => skill.category === category);
        const sum = filteredSkills.reduce((acc, skill) => acc + skill.selfRating, 0);
        return (sum / filteredSkills.length).toFixed(2);
    };

    const skillsWithGap = mockSkillsData.map(skill => ({
        ...skill,
        currentLevel: Math.min(skill.selfRating, skill.managerRating),
        gap: calculateSkillGap(skill.selfRating, skill.managerRating, skill.requiredRating)
    }));

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src="/placeholder-avatar.jpg" alt={mockEmployeeData.name} />
                        <AvatarFallback>{mockEmployeeData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="text-3xl font-bold">{mockEmployeeData.name}</h1>
                        <p className="text-muted-foreground">{mockEmployeeData.role} - {mockEmployeeData.department}</p>
                        <Badge className="mt-1">{mockEmployeeData.grade}</Badge>
                    </div>
                </div>
                <Button>{isManager ? "Team Settings" : "Update Profile"}</Button>
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    {isManager ? (
                        <>
                            <TabsTrigger value="team-skills">Team Skills</TabsTrigger>
                            <TabsTrigger value="performance">Performance</TabsTrigger>
                            <TabsTrigger value="development">Development</TabsTrigger>
                        </>
                    ) : (
                        <>
                            <TabsTrigger value="skills">Skills Details</TabsTrigger>
                            <TabsTrigger value="growth-plan">Growth Plan</TabsTrigger>
                        </>
                    )}
                </TabsList>

                <TabsContent value="overview">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {isManager ? (
                            <>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Team Size</CardTitle>
                                        <Users className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{mockTeamData.length}</div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Average Technical Skills</CardTitle>
                                        <Scroll className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">
                                            {(mockTeamData.reduce((sum, member) => sum + member.technicalAvg, 0) / mockTeamData.length).toFixed(2)}
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Average Soft Skills</CardTitle>
                                        <Users className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">
                                            {(mockTeamData.reduce((sum, member) => sum + member.softAvg, 0) / mockTeamData.length).toFixed(2)}
                                        </div>
                                    </CardContent>
                                </Card>
                            </>
                        ) : (
                            <>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Soft Skills Average</CardTitle>
                                        <Users className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{averageRating("Soft Skills")}</div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Technical Skills Average</CardTitle>
                                        <Scroll className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{averageRating("Technical Skills")}</div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Skills Assessed</CardTitle>
                                        <Award className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{mockSkillsData.length}</div>
                                    </CardContent>
                                </Card>
                            </>
                        )}
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 mt-4">
                        {isManager ? (
                            <>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Team Composition</CardTitle>
                                        <CardDescription>Distribution of career levels in your team</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ResponsiveContainer width="100%" height={300}>
                                            <PieChart>
                                                <Pie
                                                    data={mockTeamComposition}
                                                    cx="50%"
                                                    cy="50%"
                                                    labelLine={false}
                                                    outerRadius={80}
                                                    fill="#8884d8"
                                                    dataKey="value"
                                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                                >
                                                    {mockTeamComposition.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip />
                                                <Legend />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Team Members</CardTitle>
                                        <CardDescription>Quick overview of your team</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ScrollArea className="h-[300px]">
                                            <div className="space-y-4">
                                                {mockTeamData.map((member, index) => (
                                                    <div key={index} className="flex items-center space-x-4">
                                                        <Avatar>
                                                            <AvatarImage src={`/placeholder-avatar-${index + 1}.jpg`} alt={member.name} />
                                                            <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                                        </Avatar>
                                                        <div className="flex-1 space-y-1">
                                                            <p className="text-sm font-medium leading-none">{member.name}</p>
                                                            <p className="text-sm text-muted-foreground">{member.role}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </ScrollArea>
                                    </CardContent>
                                </Card>
                            </>
                        ) : (
                            <Card className="md:col-span-2">
                                <CardHeader>
                                    <CardTitle>Skills Overview</CardTitle>
                                    <CardDescription>Your current skill levels compared to required levels and skill gaps</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={400}>
                                        <RadarChart data={skillsWithGap}>
                                            <PolarGrid />
                                            <PolarAngleAxis dataKey="skill" />
                                            <PolarRadiusAxis angle={30} domain={[0, 5]} />
                                            <Radar name="Current Level" dataKey="currentLevel" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                                            <Radar name="Required Level" dataKey="requiredRating" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                                            <Radar name="Skill Gap" dataKey="gap" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
                                            <Legend />
                                            <Tooltip content={({ payload }) => {
                                                if (payload && payload.length) {
                                                    const data = payload[0].payload;
                                                    return (
                                                        <div className="bg-white p-2 border rounded shadow">
                                                            <p className="font-bold">{data.skill}</p>
                                                            <p>Current Level: {data.currentLevel}</p>
                                                            <p>Required Level: {data.requiredRating}</p>
                                                            <p>Skill Gap: {data.gap}</p>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            }} />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </TabsContent>

                {isManager ? (
                    <>
                        <TabsContent value="team-skills">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Team Skills Overview</CardTitle>
                                    <CardDescription>Average rating for each skill across the team</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={400}>
                                        <BarChart data={mockTeamSkillsData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="skill" angle={-45} textAnchor="end" interval={0} height={100} />
                                            <YAxis domain={[0, 5]} />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="averageRating" fill="#8884d8" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="performance">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Team Performance</CardTitle>
                                    <CardDescription>Individual performance scores based on skill assessments</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Name</TableHead>
                                                <TableHead>Career Level</TableHead>
                                                <TableHead>Avg. Technical Skills</TableHead>
                                                <TableHead>Avg. Soft Skills</TableHead>
                                                <TableHead>Overall Score</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {mockTeamData.map((member, index) => {
                                                const overallScore = (member.technicalAvg + member.softAvg) / 2;
                                                return (
                                                    <TableRow key={index}>
                                                        <TableCell>{member.name}</TableCell>
                                                        <TableCell>{member.level}</TableCell>
                                                        <TableCell>{member.technicalAvg.toFixed(2)}</TableCell>
                                                        <TableCell>{member.softAvg.toFixed(2)}</TableCell>
                                                        <TableCell>
                                                            <Badge variant={overallScore >= 4 ? "success" : overallScore >= 3 ? "secondary" : "destructive"}>
                                                                {overallScore.toFixed(2)}
                                                            </Badge>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="development">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Team Development Opportunities</CardTitle>
                                    <CardDescription>Areas for improvement based on skill gaps</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Skill</TableHead>
                                                <TableHead>Category</TableHead>
                                                <TableHead>Avg. Team Rating</TableHead>
                                                <TableHead>Recommended Action</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {mockTeamSkillsData
                                                .sort((a, b) => a.averageRating - b.averageRating)
                                                .slice(0, 5)
                                                .map((skill, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell>{skill.skill}</TableCell>
                                                        <TableCell>{skill.category}</TableCell>
                                                        <TableCell>{skill.averageRating.toFixed(2)}</TableCell>
                                                        <TableCell>
                                                            {skill.averageRating < 3 ? "Urgent training needed" :
                                                                skill.averageRating < 4 ? "Consider skill development programs" :
                                                                    "Maintain current level"}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </>
                ) : (
                    <>
                        <TabsContent value="skills">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Skill Details</CardTitle>
                                    <CardDescription>Breakdown of your skills, assessments, and required levels</CardDescription>
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
                                                    <TableCell className="font-medium">{skill.skill}</TableCell>
                                                    <TableCell>{skill.category}</TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center space-x-2">
                                                            <Progress value={(skill.selfRating / 5) * 100} className="w-[60px]" />
                                                            <span className="text-sm">{skill.selfRating}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center space-x-2">
                                                            <Progress value={(skill.managerRating / 5) * 100} className="w-[60px]" />
                                                            <span className="text-sm">{skill.managerRating}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center space-x-2">
                                                            <Progress value={(skill.requiredRating / 5) * 100} className="w-[60px]" />
                                                            <span className="text-sm">{skill.requiredRating}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        {Math.min(skill.selfRating, skill.managerRating) >= skill.requiredRating ? (
                                                            <Badge variant="success">Proficient</Badge>
                                                        ) : Math.min(skill.selfRating, skill.managerRating) === skill.requiredRating - 1 ? (
                                                            <Badge variant="warning">Developing</Badge>
                                                        ) : (
                                                            <Badge variant="destructive">Needs Improvement</Badge>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="growth-plan">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Growth Plan</CardTitle>
                                    <CardDescription>Skill gaps and recommended training courses</CardDescription>
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
                                                .filter(skill => skill.gap > 0)
                                                .sort((a, b) => b.gap - a.gap)
                                                .map((skill, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell className="font-medium">{skill.skill}</TableCell>
                                                        <TableCell>{skill.currentLevel}</TableCell>
                                                        <TableCell>{skill.requiredRating}</TableCell>
                                                        <TableCell>
                                                            <Badge variant="destructive">{skill.gap}</Badge>
                                                        </TableCell>
                                                        <TableCell>
                                                            {skill.gap > 2 ? (
                                                                <span className="text-red-500">{mockTrainingCourses[skill.skill]?.advanced || `Advanced ${skill.skill} Course`}</span>
                                                            ) : skill.gap > 1 ? (
                                                                <span className="text-yellow-500">{mockTrainingCourses[skill.skill]?.intermediate || `Intermediate ${skill.skill} Workshop`}</span>
                                                            ) : (
                                                                <span className="text-green-500">{mockTrainingCourses[skill.skill]?.basic || `${skill.skill} Fundamentals Refresher`}</span>
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </>
                )}
            </Tabs>
        </div>
    )
}
