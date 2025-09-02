import { Plus, UserPlus, Bell, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const actions = [
  {
    title: "Add New Member",
    description: "Register a new society member",
    icon: UserPlus,
    variant: "default" as const,
  },
  {
    title: "Create Announcement",
    description: "Send notice to all members",
    icon: Bell,
    variant: "secondary" as const,
  },
  {
    title: "Log Maintenance",
    description: "Report maintenance issue",
    icon: Plus,
    variant: "outline" as const,
  },
  {
    title: "Generate Report",
    description: "Monthly society report",
    icon: FileText,
    variant: "outline" as const,
  },
];

export const QuickActions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Button
              key={action.title}
              variant={action.variant}
              className="h-auto p-4 flex flex-col items-start space-y-2"
            >
              <div className="flex items-center space-x-2">
                <Icon className="h-5 w-5" />
                <span className="font-medium">{action.title}</span>
              </div>
              <p className="text-sm text-left opacity-80">
                {action.description}
              </p>
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
};