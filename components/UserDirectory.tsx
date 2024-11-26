import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function UserDirectory() {
  const users = [
    {
      initials: "JD",
      name: "John Doe",
      email: "john@example.com",
      level: "Professional II",
      department: "Software QA Services",
    },
    {
      initials: "JS",
      name: "Jane Smith",
      email: "jane@example.com",
      level: "Professional III",
      department: "Software Development",
    },
    {
      initials: "AJ",
      name: "Alice Johnson",
      email: "alice@example.com",
      level: "Professional II",
      department: "Data Science",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <Tabs defaultValue="users">
          <TabsList>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="required-skills">Required Skills</TabsTrigger>
            <TabsTrigger value="organization">Organization</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            <TabsTrigger value="learning">Learning</TabsTrigger>
            <TabsTrigger value="taxonomy">Taxonomy</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">User Directory</h3>
            <p className="text-sm text-muted-foreground">View and manage users and their skills</p>
          </div>
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user.email}
                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border bg-muted">
                    {user.initials}
                  </div>
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-muted-foreground">{user.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="secondary">{user.level}</Badge>
                  <Badge>{user.department}</Badge>
                  <Badge variant="outline">Active</Badge>
                  <Button variant="link" className="text-sm">
                    View Skills
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

