import { Plus, MoreHorizontal } from "lucide-react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Layout } from "@/components/Layout";
import { MemberDetailsModal } from "@/components/modals/MemberDetailsModal";
import { SendNoticeModal } from "@/components/modals/SendNoticeModal";
import { useState } from "react";

const members = [
  {
    id: 1,
    name: "Rajesh Kumar",
    flat: "A-101",
    phone: "+91 98765 43210",
    email: "rajesh.kumar@email.com",
    memberSince: "2020-01-15",
    status: "active",
    dues: 0,
  },
  {
    id: 2,
    name: "Priya Sharma",
    flat: "B-205",
    phone: "+91 98765 43211",
    email: "priya.sharma@email.com",
    memberSince: "2019-06-20",
    status: "active",
    dues: 0,
  },
  {
    id: 3,
    name: "Amit Patel",
    flat: "C-304",
    phone: "+91 98765 43212",
    email: "amit.patel@email.com",
    memberSince: "2021-03-10",
    status: "pending",
    dues: 2500,
  },
  {
    id: 4,
    name: "Sunita Devi",
    flat: "A-203",
    phone: "+91 98765 43213",
    email: "sunita.devi@email.com",
    memberSince: "2018-11-05",
    status: "active",
    dues: 0,
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return <Badge className="bg-success text-success-foreground">Active</Badge>;
    case "pending":
      return <Badge className="bg-warning text-warning-foreground">Pending</Badge>;
    case "inactive":
      return <Badge variant="secondary">Inactive</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const Members = () => {
  const [selectedMember, setSelectedMember] = useState<typeof members[0] | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [noticeRecipient, setNoticeRecipient] = useState("");

  const handleViewDetails = (member: typeof members[0]) => {
    setSelectedMember(member);
    setShowDetailsModal(true);
  };

  const handleSendNotice = (member: typeof members[0]) => {
    setNoticeRecipient(member.name);
    setShowNoticeModal(true);
  };

  return (
    <Layout>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Members</h1>
          <p className="text-muted-foreground">Manage society members and their information</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Add Member
        </Button>
      </div>


      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">248</div>
            <p className="text-xs text-muted-foreground">+12 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">235</div>
            <p className="text-xs text-success">94.8% active rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Dues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">13</div>
            <p className="text-xs text-warning">₹32,500 total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">New This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-info">Highest this year</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Member Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Flat</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Member Since</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Dues</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>
                          {member.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-muted-foreground">{member.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{member.flat}</TableCell>
                  <TableCell>{member.phone}</TableCell>
                  <TableCell>{new Date(member.memberSince).toLocaleDateString()}</TableCell>
                  <TableCell>{getStatusBadge(member.status)}</TableCell>
                  <TableCell>
                    {member.dues > 0 ? (
                      <span className="text-warning font-medium">₹{member.dues}</span>
                    ) : (
                      <span className="text-success">✓ Paid</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetails(member)}>
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit Member</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleSendNotice(member)}>
                          Send Notice
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Remove Member
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <MemberDetailsModal
        member={selectedMember}
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
      />

      <SendNoticeModal
        memberName={noticeRecipient}
        isOpen={showNoticeModal}
        onClose={() => setShowNoticeModal(false)}
      />
      </div>
    </Layout>
  );
};

export default Members;