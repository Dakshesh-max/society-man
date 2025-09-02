import { Plus, Bell, Pin, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Layout } from "@/components/Layout";

const announcements = [
  {
    id: 1,
    title: "Society General Meeting - September 2024",
    content: "Dear Residents, We are pleased to announce the monthly general meeting scheduled for September 15th, 2024 at 7:00 PM in the community hall. Agenda includes discussion on upcoming maintenance work, budget review, and new society rules.",
    author: "Building Committee",
    date: "2024-09-02",
    priority: "high",
    pinned: true,
    category: "Meeting",
    readBy: 156,
    totalMembers: 248,
  },
  {
    id: 2,
    title: "Water Supply Interruption Notice",
    content: "Please be informed that water supply will be interrupted on September 5th from 10:00 AM to 2:00 PM due to tank cleaning and maintenance. We apologize for any inconvenience caused.",
    author: "Maintenance Team",
    date: "2024-09-01",
    priority: "urgent",
    pinned: true,
    category: "Maintenance",
    readBy: 203,
    totalMembers: 248,
  },
  {
    id: 3,
    title: "Festival Celebration - Ganesh Chaturthi",
    content: "Join us for Ganesh Chaturthi celebrations on September 7th in the society garden. Cultural programs start at 6:00 PM followed by prasad distribution. All families are welcome!",
    author: "Cultural Committee",
    date: "2024-08-30",
    priority: "medium",
    pinned: false,
    category: "Event",
    readBy: 189,
    totalMembers: 248,
  },
  {
    id: 4,
    title: "New Parking Rules Effective September 1st",
    content: "New parking guidelines are now in effect. Visitor parking is restricted to designated areas only. Please ensure all vehicles display proper society stickers.",
    author: "Security Team",
    date: "2024-08-28",
    priority: "medium",
    pinned: false,
    category: "Rules",
    readBy: 167,
    totalMembers: 248,
  },
];

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case "urgent":
      return <Badge className="bg-destructive text-destructive-foreground">Urgent</Badge>;
    case "high":
      return <Badge className="bg-warning text-warning-foreground">High</Badge>;
    case "medium":
      return <Badge className="bg-info text-info-foreground">Medium</Badge>;
    case "low":
      return <Badge variant="secondary">Low</Badge>;
    default:
      return <Badge variant="outline">{priority}</Badge>;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Meeting":
      return "text-primary";
    case "Maintenance":
      return "text-warning";
    case "Event":
      return "text-success";
    case "Rules":
      return "text-info";
    default:
      return "text-muted-foreground";
  }
};

const Announcements = () => {
  return (
    <Layout>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Announcements</h1>
          <p className="text-muted-foreground">Society notices and important updates</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Create Announcement
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Announcements</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pinned</CardTitle>
            <Pin className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-warning">High priority</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Read Rate</CardTitle>
            <Users className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-success">Good engagement</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Calendar className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-info">New announcements</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Announcements</h2>
        
        {announcements.map((announcement) => (
          <Card key={announcement.id} className={`${announcement.pinned ? 'border-warning shadow-md' : ''}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    {announcement.pinned && <Pin className="h-4 w-4 text-warning" />}
                    <h3 className="text-lg font-semibold">{announcement.title}</h3>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">
                          {announcement.author.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span>{announcement.author}</span>
                    </div>
                    <span>•</span>
                    <span>{new Date(announcement.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <Badge variant="outline" className={getCategoryColor(announcement.category)}>
                      {announcement.category}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getPriorityBadge(announcement.priority)}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{announcement.content}</p>
              
              <Separator className="my-4" />
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      Read by {announcement.readBy} of {announcement.totalMembers} members
                    </span>
                  </div>
                  <div className="w-32 bg-muted rounded-full h-2">
                    <div 
                      className="bg-success h-2 rounded-full" 
                      style={{ width: `${(announcement.readBy / announcement.totalMembers) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      </div>
    </Layout>
  );
};

export default Announcements;