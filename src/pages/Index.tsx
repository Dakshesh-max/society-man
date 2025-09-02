import { Layout } from "@/components/Layout";
import { DashboardStats } from "@/components/DashboardStats";
import { RecentActivity } from "@/components/RecentActivity";
import { QuickActions } from "@/components/QuickActions";

const Index = () => {
  return (
    <Layout>
      <div className="space-y-6">
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
      </div>
    </Layout>
  );
};

export default Index;
