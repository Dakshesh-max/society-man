import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { DashboardStats } from "@/components/DashboardStats";
import { RecentActivity } from "@/components/RecentActivity";
import { QuickActions } from "@/components/QuickActions";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Society Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome to Shree Krishna Society Management System
            </p>
          </div>
          
          <DashboardStats />
          
          <div className="grid gap-6 lg:grid-cols-2">
            <RecentActivity />
            <QuickActions />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
