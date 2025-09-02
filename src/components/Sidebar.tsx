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
import { useLocation, Link } from "react-router-dom";

interface SidebarProps {
  className?: string;
}

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Members", href: "/members", icon: Users },
  { name: "Maintenance", href: "/maintenance", icon: Wrench },
  { name: "Announcements", href: "/announcements", icon: Bell },
  { name: "Visitors", href: "/visitors", icon: UserCheck },
  { name: "Payments", href: "/payments", icon: CreditCard },
  { name: "Settings", href: "/settings", icon: Settings },
];

export const Sidebar = ({ className }: SidebarProps) => {
  const location = useLocation();
  
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
          const isActive = location.pathname === item.href;
          return (
            <Button
              key={item.name}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start gap-3",
                isActive && "bg-primary text-primary-foreground"
              )}
              asChild
            >
              <Link to={item.href}>
                <Icon className="h-5 w-5" />
                {item.name}
              </Link>
            </Button>
          );
        })}
      </nav>
    </div>
  );
};