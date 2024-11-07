'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Users, TrendingUp, Award, BookOpen, Calendar, ChevronRight, Search, Filter, Star, Brain } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data
const managerData = {
    name: "Maria Garcia",
    role: "Engineering Manager",
    department: "Quality Assurance",
    teamSize: 12
}

const teamPerformance = [
    { month: 'Jan', performance: 75 },
    { month: 'Feb', performance: 78 },
    { month: 'Mar', performance: 80 },
    { month: 'Apr', performance: 82 },
    { month: 'May', performance: 85 },
    { month: 'Jun', performance: 87 },
]

const teamComposition = [
    { name: 'Senior QA', value: 3 },
    { name: 'QA Engineer', value: 5 },
    { name: 'Junior QA', value: 4 },
]

const topPerformers = [
    { name: "Alice Johnson", role: "Senior QA Engineer", performanceScore: 95 },
    { name: "Bob Smith", role: "QA Analyst", performanceScore: 92 },
    { name: "Charlie Davis", role: "QA Engineer", performanceScore: 90 },
    { name: "Diana Miller", role: "Senior QA Engineer", performanceScore: 89 },
    { name: "Edward Wilson", role: "QA Analyst", performanceScore: 88 },
]

const skillDistribution = [
    { skill: "Automated Testing", junior: 2, mid: 3, senior: 2 },
    { skill: "Manual Testing", junior: 4, mid: 4, senior: 1 },
    { skill: "Performance Testing", junior: 1, mid: 2, senior: 2 },
    { skill: "API Testing", junior: 3, mid: 3, senior: 1 },
    { skill: "Security Testing", junior: 1, mid: 1, senior: 2 },
]

const trainingRecommendations = [
    {
        name: "Alice Johnson",
        role: "Senior QA Engineer",
        recommendations: [
            {
                skill: "Automated Testing",
                courseName: "Advanced Selenium WebDriver",
                provider: "Test Automation University",
                duration: "4 weeks",
                format: "Online, self-paced",
                prerequisites: "Basic Selenium knowledge",
                currentLevel: 3,
                targetLevel: 5,
                description: "Master advanced Selenium techniques for robust and efficient automated testing."
            },
            {
                skill: "Performance Testing",
                courseName: "JMeter Masterclass",
                provider: "Performance Testing Pro",
                duration: "3 weeks",
                format: "Online, instructor-led",
                prerequisites: "Basic understanding of performance testing concepts",
                currentLevel: 2,
                targetLevel: 4,
                description: "Learn to create, run, and analyze performance tests using Apache JMeter."
            }
        ]
    },
    {
        name: "Bob Smith",
        role: "QA Analyst",
        recommendations: [
            {
                skill: "API Testing",
                courseName: "RESTful API Testing with Postman",
                provider: "API Masterclass",
                duration: "2 weeks",
                format: "Online, self-paced",
                prerequisites: "Basic understanding of APIs",
                currentLevel: 2,
                targetLevel: 4,
                description: "Learn to effectively test RESTful APIs using Postman and write automated API tests."
            },
            {
                skill: "Test Planning",
                courseName: "Agile Test Planning and Management",
                provider: "Agile Testing Alliance",
                duration: "4 weeks",
                format: "Online, instructor-led",
                prerequisites: "Familiarity with Agile methodologies",
                currentLevel: 3,
                targetLevel: 5,
                description: "Master the art of test planning and management in Agile environments."
            }
        ]
    },
    {
        name: "Charlie Davis",
        role: "QA Engineer",
        recommendations: [
            {
                skill: "Security Testing",
                courseName: "Web Application Security Testing",
                provider: "Cybersecurity Experts",
                duration: "6 weeks",
                format: "Online, self-paced with weekly live sessions",
                prerequisites: "Basic web technologies knowledge",
                currentLevel: 2,
                targetLevel: 4,
                description: "Comprehensive course on identifying and testing for common web application security vulnerabilities."
            }
        ]
    }
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

export default function ManagerDashboard() {
    const [activeTab, setActiveTab] = useState('overview')

    const averageTeamPerformance = Math.round(teamPerformance[teamPerformance.length - 1].performance)
    const teamSkillGrowth = 15 // This would ideally be calculated from historical data

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src="/placeholder-avatar.jpg" alt={managerData.name} />
                        <AvatarFallback>{managerData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="text-3xl font-bold">{managerData.name}</h1>
                        <p className="text-muted-foreground">{managerData.role} - {managerData.department}</p>
                    </div>
                </div>
                <Button>Team Settings</Button>
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                    <TabsTrigger value="skills">Skills</TabsTrigger>
                    <TabsTrigger value="training">Training</TabsTrigger>
                    <TabsTrigger value="evaluation">Evaluation</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Team Size</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{managerData.teamSize}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Average Performance</CardTitle>
                                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{averageTeamPerformance}%</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Skill Growth</CardTitle>
                                <Award className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">+{teamSkillGrowth}%</div>
                                <p className="text-xs text-muted-foreground">In the last 6 months</p>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 mt-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Team Composition</CardTitle>
                                <CardDescription>Distribution of roles in your team</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={teamComposition}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        >
                                            {teamComposition.map((entry, index) => (
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
                                <CardTitle>Top Performers</CardTitle>
                                <CardDescription>Highest performing team members</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ScrollArea className="h-[300px]">
                                    <div className="space-y-4">
                                        {topPerformers.map((member, index) => (
                                            <div key={index} className="flex items-center space-x-4">
                                                <Avatar>
                                                    <AvatarImage src={`/placeholder-avatar-${index + 1}.jpg`} alt={member.name} />
                                                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1 space-y-1">
                                                    <p className="text-sm font-medium leading-none">{member.name}</p>
                                                    <p className="text-sm text-muted-foreground">{member.role}</p>
                                                </div>
                                                <Badge variant="secondary">{member.performanceScore}%</Badge>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="performance">
                    <Card>
                        <CardHeader>
                            <CardTitle>Team Performance Trend</CardTitle>
                            <CardDescription>Average team performance over the last 6 months</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart data={teamPerformance}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="performance" fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                    <Card className="mt-4">
                        <CardHeader>
                            <CardTitle>Individual Performance</CardTitle>
                            <CardDescription>Performance scores of team members</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[300px]">
                                <div className="space-y-4">
                                    {topPerformers.map((member, index) => (
                                        <div key={index} className="flex items-center space-x-4">
                                            <Avatar>
                                                <AvatarImage src={`/placeholder-avatar-${index + 1}.jpg`} alt={member.name} />
                                                <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 space-y-1">
                                                <p className="text-sm font-medium leading-none">{member.name}</p>
                                                <p className="text-sm text-muted-foreground">{member.role}</p>
                                            </div>
                                            <div className="w-[100px]">
                                                <Progress value={member.performanceScore} className="w-full" />
                                            </div>
                                            <Badge variant="secondary">{member.performanceScore}%</Badge>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="skills">
                    <Card>
                        <CardHeader>
                            <CardTitle>Skill Distribution</CardTitle>
                            <CardDescription>Overview of skills across experience levels</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart data={skillDistribution}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="skill" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="junior" stackId="a" fill="#8884d8" name="Junior" />
                                    <Bar dataKey="mid" stackId="a" fill="#82ca9d" name="Mid-level" />
                                    <Bar dataKey="senior" stackId="a" fill="#ffc658" name="Senior" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                    <Card className="mt-4">
                        <CardHeader>
                            <CardTitle>Team Skills Breakdown</CardTitle>
                            <CardDescription>Detailed view of individual skills</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[300px]">
                                <div className="space-y-4">
                                    {topPerformers.map((member, index) => (
                                        <div key={index} className="space-y-2">

                                            <div className="flex items-center space-x-4">
                                                <Avatar>
                                                    <AvatarImage src={`/placeholder-avatar-${index + 1}.jpg`} alt={member.name} />
                                                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="text-sm font-medium leading-none">{member.name}</p>
                                                    <p className="text-sm text-muted-foreground">{member.role}</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {skillDistribution.slice(0, 3).map((skill, skillIndex) => (
                                                    <Badge key={skillIndex} variant="outline">{skill.skill}</Badge>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="training">
                    <Card>
                        <CardHeader>
                            <CardTitle>Training Recommendations</CardTitle>
                            <CardDescription>Personalized course recommendations based on skill gaps</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[600px]">
                                <div className="space-y-8">
                                    {trainingRecommendations.map((member, index) => (
                                        <div key={index} className="space-y-4 pb-6 border-b last:border-b-0">
                                            <div className="flex items-center space-x-4">
                                                <Avatar>
                                                    <AvatarImage src={`/placeholder-avatar-${index + 1}.jpg`} alt={member.name} />
                                                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-semibold">{member.name}</p>
                                                    <p className="text-sm text-muted-foreground">{member.role}</p>
                                                </div>
                                            </div>
                                            {member.recommendations.length > 0 ? (
                                                <div className="space-y-4">
                                                    {member.recommendations.map((rec, recIndex) => (
                                                        <Card key={recIndex} className="p-4">
                                                            <CardTitle className="text-lg mb-2">{rec.courseName}</CardTitle>
                                                            <div className="grid grid-cols-2 gap-2 text-sm">
                                                                <div><span className="font-semibold">Skill:</span> {rec.skill}</div>
                                                                <div><span className="font-semibold">Provider:</span> {rec.provider}</div>
                                                                <div><span className="font-semibold">Duration:</span> {rec.duration}</div>
                                                                <div><span className="font-semibold">Format:</span> {rec.format}</div>
                                                                <div><span className="font-semibold">Prerequisites:</span> {rec.prerequisites}</div>
                                                                <div><span className="font-semibold">Current Level:</span>
                                                                    <Progress value={rec.currentLevel * 20} className="w-[60px] inline-block ml-2" />
                                                                    {rec.currentLevel}
                                                                </div>
                                                                <div><span className="font-semibold">Target Level:</span>
                                                                    <Progress value={rec.targetLevel * 20} className="w-[60px] inline-block ml-2" />
                                                                    {rec.targetLevel}
                                                                </div>
                                                            </div>
                                                            <p className="mt-2 text-sm">{rec.description}</p>
                                                        </Card>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-muted-foreground">No specific training recommendations at this time.</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="evaluation">
                    <Card>
                        <CardHeader>
                            <CardTitle>Team Evaluation</CardTitle>
                            <CardDescription>Conduct performance evaluations for your team members</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-4">Select a team member to start their performance evaluation:</p>
                            <Select>
                                <SelectTrigger className="w-[280px]">
                                    <SelectValue placeholder="Select team member" />
                                </SelectTrigger>
                                <SelectContent>
                                    {topPerformers.map((member, index) => (
                                        <SelectItem key={index} value={member.name.toLowerCase().replace(' ', '-')}>
                                            {member.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold mb-2">Evaluation Criteria</h3>
                                <div className="space-y-4">
                                    {['Technical Skills', 'Communication', 'Teamwork', 'Problem Solving', 'Initiative'].map((criteria, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <span>{criteria}</span>
                                            <Select>
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Select rating" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {[1, 2, 3, 4, 5].map((rating) => (
                                                        <SelectItem key={rating} value={rating.toString()}>
                                                            {rating} - {rating === 1 ? 'Poor' : rating === 2 ? 'Fair' : rating === 3 ? 'Good' : rating === 4 ? 'Very Good' : 'Excellent'}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold mb-2">Comments</h3>
                                <textarea
                                    className="w-full h-32 p-2 border rounded-md"
                                    placeholder="Enter your comments here..."
                                ></textarea>
                            </div>
                            <Button className="mt-4">Submit Evaluation</Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
