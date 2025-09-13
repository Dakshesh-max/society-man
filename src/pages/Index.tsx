import { Layout } from "@/components/Layout";
import { DashboardStats } from "@/components/DashboardStats";
import { RecentActivity } from "@/components/RecentActivity";
import { QuickActions } from "@/components/QuickActions";
import buildingHero from "@/assets/building-hero.jpg";

const Index = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="relative overflow-hidden rounded-lg ring-1 ring-border">
          <img
            src={buildingHero}
            alt="Residential building society hero image"
            className="h-40 w-full object-cover md:h-56"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/30 to-primary/20" />
          <div className="absolute inset-0 p-6 flex flex-col justify-end">
            <h1 className="text-3xl font-bold">Society Dashboard</h1>
            <p className="text-muted-foreground">Welcome to Shree Krishna Society Management System</p>
          </div>
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
