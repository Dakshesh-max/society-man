import { Settings as SettingsIcon, Bell, Shield, Users, Building, Palette, Database } from "lucide-react";
import { Layout } from "@/components/Layout";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Settings = () => {
  const [visitorTimeLimit, setVisitorTimeLimit] = useState("8");
  const [selfRegistration, setSelfRegistration] = useState(false);
  const { toast } = useToast();

  const handleExportData = () => {
    toast({
      title: "Data Export Started",
      description: "Your data export will be ready for download shortly.",
    });
  };

  const handleSystemBackup = () => {
    toast({
      title: "System Backup Initiated",
      description: "System backup is being created. You will be notified when complete.",
    });
  };

  return (
    <Layout>
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage society settings and preferences</p>
      </div>

      <div className="grid gap-6">
        {/* Society Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building className="h-5 w-5" />
              <span>Society Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="societyName">Society Name</Label>
                <Input id="societyName" defaultValue="Shree Krishna Society" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="registrationNumber">Registration Number</Label>
                <Input id="registrationNumber" defaultValue="SOC/KAL/2018/001" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea 
                id="address" 
                defaultValue="123, Kalyan East, Kalyan, Maharashtra - 421306"
                rows={3}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="totalFlats">Total Flats</Label>
                <Input id="totalFlats" defaultValue="120" type="number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maintenanceAmount">Monthly Maintenance</Label>
                <Input id="maintenanceAmount" defaultValue="2500" type="number" />
              </div>
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notification Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Send notifications via email to residents
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>SMS Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Send SMS alerts for urgent announcements
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Maintenance Reminders</Label>
                <p className="text-sm text-muted-foreground">
                  Automatic reminders for maintenance payments
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Security Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">
                  Require 2FA for admin access
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Visitor Photo Capture</Label>
                <p className="text-sm text-muted-foreground">
                  Mandatory photo for all visitor entries
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>ID Verification</Label>
                <p className="text-sm text-muted-foreground">
                  Require ID proof for visitor registration
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="visitorTimeLimit">Visitor Time Limit (hours)</Label>
              <Input 
                id="visitorTimeLimit" 
                value={visitorTimeLimit}
                onChange={(e) => setVisitorTimeLimit(e.target.value)}
                type="number" 
                className="w-32" 
              />
              <p className="text-sm text-muted-foreground">
                Maximum allowed visitor duration
              </p>
            </div>
          </CardContent>
        </Card>

        {/* User Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>User Management</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Self Registration</Label>
                <p className="text-sm text-muted-foreground">
                  Allow residents to register themselves
                </p>
              </div>
              <Switch checked={selfRegistration} onCheckedChange={setSelfRegistration} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Profile Updates</Label>
                <p className="text-sm text-muted-foreground">
                  Allow residents to update their profiles
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Guest User Access</Label>
                <p className="text-sm text-muted-foreground">
                  Allow read-only access to non-residents
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <span>System Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Automatic Backups</Label>
                <p className="text-sm text-muted-foreground">
                  Daily automated data backups
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Data Export</Label>
                <p className="text-sm text-muted-foreground">
                  Allow data export for residents
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Maintenance Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Enable maintenance mode for system updates
                </p>
              </div>
              <Switch />
            </div>
            <div className="flex space-x-4 pt-4">
              <Button variant="outline" onClick={handleExportData}>Export Data</Button>
              <Button variant="outline" onClick={handleSystemBackup}>System Backup</Button>
              <Button variant="destructive">Reset System</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      </div>
    </Layout>
  );
};

export default Settings;