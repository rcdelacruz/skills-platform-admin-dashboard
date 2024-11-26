import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Skill {
  name: string
  currentLevel: number
  requiredLevel: number
  gap: number
}

interface Employee {
  name: string
  department: string
  skills: Skill[]
}

interface EmployeeSkillsReportData {
  title: string
  description: string
  date: string
  employees: Employee[]
}

interface EmployeeSkillsReportProps {
  data: EmployeeSkillsReportData
}

export function EmployeeSkillsReport({ data }: EmployeeSkillsReportProps) {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl font-bold">{data.title}</CardTitle>
            <CardDescription>{data.description}</CardDescription>
          </div>
          <Badge variant="outline">{data.date}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-6">
            {data.employees.map((employee, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{employee.name}</CardTitle>
                  <CardDescription>{employee.department}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Skill</TableHead>
                        <TableHead>Current Level</TableHead>
                        <TableHead>Required Level</TableHead>
                        <TableHead>Gap</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {employee.skills.map((skill, skillIndex) => (
                        <TableRow key={skillIndex}>
                          <TableCell>{skill.name}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Progress value={(skill.currentLevel / 5) * 100} className="w-[60px]" />
                              <span>{skill.currentLevel}</span>
                            </div>
                          </TableCell>
                          <TableCell>{skill.requiredLevel}</TableCell>
                          <TableCell>
                            <Badge variant={skill.gap > 0 ? "destructive" : skill.gap < 0 ? "success" : "secondary"}>
                              {skill.gap > 0 ? `+${skill.gap}` : skill.gap}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        This report was generated automatically. For any questions, please contact the HR team.
      </CardFooter>
    </Card>
  )
}

