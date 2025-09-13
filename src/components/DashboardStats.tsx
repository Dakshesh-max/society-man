import { Users, Home, AlertTriangle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  {
    title: "Total Members",
    value: "248",
    icon: Users,
    change: "+12",
    changeType: "positive" as const,
    color: "text-primary",
  },
  {
    title: "Total Flats",
    value: "120",
    icon: Home,
    change: "0",
    changeType: "neutral" as const,
    color: "text-info",
  },
  {
    title: "Pending Maintenance",
    value: "15",
    icon: AlertTriangle,
    change: "-3",
    changeType: "positive" as const,
    color: "text-warning",
  },
  {
    title: "Completed This Month",
    value: "42",
    icon: CheckCircle,
    change: "+8",
    changeType: "positive" as const,
    color: "text-success",
  },
];

export const DashboardStats = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const gradients = [
          "bg-gradient-to-br from-primary/10 to-primary-glow/20 border-primary/20",
          "bg-gradient-to-br from-info/10 to-info/20 border-info/20",
          "bg-gradient-to-br from-warning/10 to-warning/20 border-warning/20",
          "bg-gradient-to-br from-success/10 to-success/20 border-success/20"
        ];
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className={`${gradients[index]} shadow-soft hover-scale transition-all duration-200`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={
                  stat.changeType === "positive" ? "text-success" : "text-muted-foreground"
                }>
                  {stat.change}
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};