import { UserCheck, Clock, CheckCircle, AlertTriangle, Plus, Search, Filter } from "lucide-react";
import { Layout } from "@/components/Layout";
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

const visitors = [
  {
    id: "V001",
    name: "Rohit Sharma",
    phone: "+91 98765 00001",
    purpose: "Personal Visit",
    hostFlat: "A-101",
    hostName: "Rajesh Kumar",
    checkIn: "2024-09-02T14:30:00",
    checkOut: "2024-09-02T16:45:00",
    status: "checked-out",
    idType: "Aadhar Card",
    idNumber: "****-****-1234",
    vehicleNumber: "MH-04-AB-1234",
  },
  {
    id: "V002",
    name: "Delivery Boy",
    phone: "+91 98765 00002",
    purpose: "Package Delivery",
    hostFlat: "B-205",
    hostName: "Priya Sharma",
    checkIn: "2024-09-02T10:15:00",
    checkOut: "2024-09-02T10:25:00",
    status: "checked-out",
    idType: "PAN Card",
    idNumber: "****-****-5678",
    vehicleNumber: "MH-04-CD-5678",
  },
  {
    id: "V003",
    name: "Dr. Ashish Patel",
    phone: "+91 98765 00003",
    purpose: "Medical Consultation",
    hostFlat: "C-304",
    hostName: "Amit Patel",
    checkIn: "2024-09-02T18:00:00",
    checkOut: null,
    status: "checked-in",
    idType: "Driving License",
    idNumber: "****-****-9012",
    vehicleNumber: "MH-04-EF-9012",
  },
  {
    id: "V004",
    name: "Maya Singh",
    phone: "+91 98765 00004",
    purpose: "Personal Visit",
    hostFlat: "A-203",
    hostName: "Sunita Devi",
    checkIn: "2024-09-02T19:30:00",
    checkOut: null,
    status: "checked-in",
    idType: "Aadhar Card",
    idNumber: "****-****-3456",
    vehicleNumber: null,
  },
];

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
  return (
    <Layout>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Visitor Management</h1>
          <p className="text-muted-foreground">Track and manage society visitors</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Register Visitor
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search visitors..." className="pl-10" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="checked-in">Checked In</SelectItem>
            <SelectItem value="checked-out">Checked Out</SelectItem>
            <SelectItem value="expected">Expected</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="today">
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="yesterday">Yesterday</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Visitors</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">+3 from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Currently Inside</CardTitle>
            <UserCheck className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-success">Active visitors</p>
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
                <TableHead>Actions</TableHead>
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
                      {visitor.vehicleNumber && (
                        <div className="text-sm text-muted-foreground">
                          🚗 {visitor.vehicleNumber}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{visitor.hostFlat}</div>
                      <div className="text-sm text-muted-foreground">{visitor.hostName}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{visitor.purpose}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{new Date(visitor.checkIn).toLocaleDateString()}</div>
                      <div className="text-muted-foreground">{formatTime(visitor.checkIn)}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {visitor.checkOut ? (
                      <div className="text-sm">
                        <div>{new Date(visitor.checkOut).toLocaleDateString()}</div>
                        <div className="text-muted-foreground">{formatTime(visitor.checkOut)}</div>
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
                  <TableCell>
                    <div className="flex space-x-2">
                      {visitor.status === "checked-in" ? (
                        <Button variant="outline" size="sm" className="text-destructive">
                          Check Out
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      </div>
    </Layout>
  );
};

export default Visitors;