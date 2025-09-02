import { Plus, Filter, Search, Wrench, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Layout } from "@/components/Layout";
import { MaintenanceViewModal } from "@/components/modals/MaintenanceViewModal";
import { useState } from "react";
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

const maintenanceRequests = [
  {
    id: "MR001",
    title: "Plumbing leak in bathroom",
    flat: "A-101",
    resident: "Rajesh Kumar",
    category: "Plumbing",
    priority: "high",
    status: "pending",
    dateSubmitted: "2024-09-01",
    description: "Water leak from bathroom tap causing damage to floor",
  },
  {
    id: "MR002",
    title: "Elevator not working",
    flat: "Common Area",
    resident: "Building Committee",
    category: "Electrical",
    priority: "urgent",
    status: "in-progress",
    dateSubmitted: "2024-09-01",
    description: "Main elevator stuck between floors 2 and 3",
  },
  {
    id: "MR003",
    title: "AC repair needed",
    flat: "B-205",
    resident: "Priya Sharma",
    category: "HVAC",
    priority: "medium",
    status: "completed",
    dateSubmitted: "2024-08-28",
    description: "AC not cooling properly, refrigerant may need refill",
  },
  {
    id: "MR004",
    title: "Paint peeling in corridor",
    flat: "Common Area",
    resident: "Security",
    category: "Painting",
    priority: "low",
    status: "pending",
    dateSubmitted: "2024-08-30",
    description: "Paint peeling on 3rd floor corridor walls",
  },
];

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case "urgent":
      return <Badge className="bg-destructive text-destructive-foreground">Urgent</Badge>;
    case "high":
      return <Badge className="bg-warning text-warning-foreground">High</Badge>;
    case "medium":
      return <Badge className="bg-info text-info-foreground">Medium</Badge>;
    case "low":
      return <Badge variant="secondary">Low</Badge>;
    default:
      return <Badge variant="outline">{priority}</Badge>;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "pending":
      return <Badge className="bg-warning text-warning-foreground">Pending</Badge>;
    case "in-progress":
      return <Badge className="bg-info text-info-foreground">In Progress</Badge>;
    case "completed":
      return <Badge className="bg-success text-success-foreground">Completed</Badge>;
    case "cancelled":
      return <Badge variant="secondary">Cancelled</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "pending":
      return <Clock className="h-4 w-4" />;
    case "in-progress":
      return <Wrench className="h-4 w-4" />;
    case "completed":
      return <CheckCircle className="h-4 w-4" />;
    default:
      return <AlertTriangle className="h-4 w-4" />;
  }
};

const Maintenance = () => {
  const [selectedRequest, setSelectedRequest] = useState<typeof maintenanceRequests[0] | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);

  const handleViewRequest = (request: typeof maintenanceRequests[0]) => {
    setSelectedRequest(request);
    setShowViewModal(true);
  };

  return (
    <Layout>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Maintenance Requests</h1>
          <p className="text-muted-foreground">Track and manage society maintenance issues</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          New Request
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search requests..." className="pl-10" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priority</SelectItem>
            <SelectItem value="urgent">Urgent</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">+4 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-warning">Requires attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Wrench className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-info">Being resolved</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">133</div>
            <p className="text-xs text-success">85.3% completion rate</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Maintenance Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {maintenanceRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{request.title}</div>
                      <div className="text-sm text-muted-foreground">
                        by {request.resident}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{request.flat}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{request.category}</Badge>
                  </TableCell>
                  <TableCell>{getPriorityBadge(request.priority)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(request.status)}
                      {getStatusBadge(request.status)}
                    </div>
                  </TableCell>
                  <TableCell>{new Date(request.dateSubmitted).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewRequest(request)}>
                        View
                      </Button>
                      <Button variant="default" size="sm">
                        Update
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <MaintenanceViewModal
        request={selectedRequest}
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
      />
      </div>
    </Layout>
  );
};

export default Maintenance;