import { 
  Home, 
  Users, 
  Wrench, 
  Bell, 
  UserCheck, 
  CreditCard, 
  Settings,
  Building2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  className?: string;
}

const navigation = [
  { name: "Dashboard", href: "#", icon: Home, current: true },
  { name: "Members", href: "#", icon: Users, current: false },
  { name: "Maintenance", href: "#", icon: Wrench, current: false },
  { name: "Announcements", href: "#", icon: Bell, current: false },
  { name: "Visitors", href: "#", icon: UserCheck, current: false },
  { name: "Payments", href: "#", icon: CreditCard, current: false },
  { name: "Settings", href: "#", icon: Settings, current: false },
];

export const Sidebar = ({ className }: SidebarProps) => {
  return (
    <div className={cn("flex h-full w-64 flex-col bg-card border-r", className)}>
      <div className="flex items-center gap-2 p-6 border-b">
        <Building2 className="h-8 w-8 text-primary" />
        <div>
          <h2 className="text-lg font-semibold">Shree Krishna Society</h2>
          <p className="text-sm text-muted-foreground">Kalyan East</p>
        </div>
      </div>
      
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.name}
              variant={item.current ? "default" : "ghost"}
              className={cn(
                "w-full justify-start gap-3",
                item.current && "bg-primary text-primary-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Button>
          );
        })}
      </nav>
    </div>
  );
};