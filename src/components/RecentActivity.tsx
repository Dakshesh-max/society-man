import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const activities = [
  {
    id: 1,
    type: "maintenance",
    title: "Plumbing issue reported",
    user: "Rajesh Kumar",
    flat: "A-101",
    time: "2 hours ago",
    status: "pending",
  },
  {
    id: 2,
    type: "payment",
    title: "Maintenance fee paid",
    user: "Priya Sharma",
    flat: "B-205",
    time: "4 hours ago",
    status: "completed",
  },
  {
    id: 3,
    type: "visitor",
    title: "Visitor registered",
    user: "Security",
    flat: "C-304",
    time: "6 hours ago",
    status: "active",
  },
  {
    id: 4,
    type: "announcement",
    title: "Society meeting scheduled",
    user: "Admin",
    flat: "Management",
    time: "1 day ago",
    status: "info",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-warning text-warning-foreground";
    case "completed":
      return "bg-success text-success-foreground";
    case "active":
      return "bg-info text-info-foreground";
    case "info":
      return "bg-primary text-primary-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export const RecentActivity = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center space-x-4">
            <Avatar className="h-10 w-10">
              <AvatarFallback>
                {activity.user.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                {activity.title}
              </p>
              <p className="text-sm text-muted-foreground">
                {activity.user} • {activity.flat} • {activity.time}
              </p>
            </div>
            <Badge variant="secondary" className={getStatusColor(activity.status)}>
              {activity.status}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};