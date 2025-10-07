import { UserCheck, Clock, CheckCircle, AlertTriangle, Plus, Search, Filter } from "lucide-react";
import { Layout } from "@/components/Layout";
import { VisitorDetailsModal } from "@/components/modals/VisitorDetailsModal";
import { RegisterVisitorModal } from "@/components/modals/RegisterVisitorModal";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";


const getStatusBadge = (status: string) => {
  switch (status) {
    case "checked-in":
      return <Badge className="bg-success text-success-foreground">Checked In</Badge>;
    case "checked-out":
      return <Badge variant="secondary">Checked Out</Badge>;
    case "expected":
      return <Badge className="bg-info text-info-foreground">Expected</Badge>;
    case "overstay":
      return <Badge className="bg-warning text-warning-foreground">Overstay</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "checked-in":
      return <UserCheck className="h-4 w-4 text-success" />;
    case "checked-out":
      return <CheckCircle className="h-4 w-4 text-muted-foreground" />;
    case "expected":
      return <Clock className="h-4 w-4 text-info" />;
    case "overstay":
      return <AlertTriangle className="h-4 w-4 text-warning" />;
    default:
      return <UserCheck className="h-4 w-4" />;
  }
};

const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const Visitors = () => {
  const [selectedVisitor, setSelectedVisitor] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [visitors, setVisitors] = useState<any[]>([]);
  const { toast } = useToast();

  const fetchVisitors = async () => {
    const { data, error } = await supabase
      .from("visitors")
      .select("*")
      .order("check_in", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch visitors",
        variant: "destructive",
      });
      return;
    }

    setVisitors(data || []);
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  const handleViewDetails = (visitor: any) => {
    setSelectedVisitor(visitor);
    setShowDetailsModal(true);
  };

  return (
    <Layout>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Visitor Management</h1>
          <p className="text-muted-foreground">Track and manage society visitors</p>
        </div>
        <Button 
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={() => setShowRegisterModal(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Register Visitor
        </Button>
      </div>


      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Visitors</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {visitors.filter(v => v.status === "checked-in").length}
            </div>
            <p className="text-xs text-muted-foreground">Currently inside</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Total</CardTitle>
            <UserCheck className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {visitors.filter(v => {
                const today = new Date();
                const checkIn = new Date(v.check_in);
                return checkIn.toDateString() === today.toDateString();
              }).length}
            </div>
            <p className="text-xs text-success">Registered today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Visit Time</CardTitle>
            <Clock className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.5h</div>
            <p className="text-xs text-info">Today's average</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overstay Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">No alerts today</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Visitor Log</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Visitor ID</TableHead>
                <TableHead>Visitor Details</TableHead>
                <TableHead>Host Information</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Check In</TableHead>
                <TableHead>Check Out</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visitors.map((visitor) => (
                <TableRow key={visitor.id}>
                  <TableCell className="font-medium">{visitor.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{visitor.name}</div>
                      <div className="text-sm text-muted-foreground">{visitor.phone}</div>
                      {visitor.vehicle_number && (
                        <div className="text-sm text-muted-foreground">
                          🚗 {visitor.vehicle_number}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{visitor.host_flat}</div>
                      <div className="text-sm text-muted-foreground">{visitor.host_name}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{visitor.purpose}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{new Date(visitor.check_in).toLocaleDateString()}</div>
                      <div className="text-muted-foreground">{formatTime(visitor.check_in)}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {visitor.check_out ? (
                      <div className="text-sm">
                        <div>{new Date(visitor.check_out).toLocaleDateString()}</div>
                        <div className="text-muted-foreground">{formatTime(visitor.check_out)}</div>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(visitor.status)}
                      {getStatusBadge(visitor.status)}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <VisitorDetailsModal
        visitor={selectedVisitor}
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
      />
      
      <RegisterVisitorModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSuccess={fetchVisitors}
      />
      </div>
    </Layout>
  );
};

export default Visitors;