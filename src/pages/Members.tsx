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
import { AddMemberModal } from "@/components/modals/AddMemberModal";
import { useState, useEffect } from "react";
import { fetchMembers, type Member } from "@/services/memberService";
import { useToast } from "@/components/ui/use-toast";


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
  const { toast } = useToast();
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [noticeRecipient, setNoticeRecipient] = useState("");

  const loadMembers = async () => {
    try {
      setLoading(true);
      const data = await fetchMembers();
      setMembers(data);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to load members",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const handleViewDetails = (member: Member) => {
    setSelectedMember(member);
    setShowDetailsModal(true);
  };

  const handleSendNotice = (member: Member) => {
    setNoticeRecipient(member.name);
    setShowNoticeModal(true);
  };

  const handleMemberAdded = () => {
    loadMembers(); // Refresh the list
  };

  // Calculate stats
  const totalMembers = members.length;
  const activeMembers = members.filter(m => m.status === 'active').length;
  const pendingDues = members.filter(m => m.dues > 0).length;
  const totalDuesAmount = members.reduce((sum, m) => sum + m.dues, 0);
  const thisMonthMembers = members.filter(m => {
    const memberDate = new Date(m.registration_date);
    const now = new Date();
    return memberDate.getMonth() === now.getMonth() && memberDate.getFullYear() === now.getFullYear();
  }).length;

  return (
    <Layout>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Members</h1>
          <p className="text-muted-foreground">Manage society members and their information</p>
        </div>
        <Button 
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={() => setShowAddModal(true)}
        >
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
            <div className="text-2xl font-bold">{totalMembers}</div>
            <p className="text-xs text-muted-foreground">+{thisMonthMembers} this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeMembers}</div>
            <p className="text-xs text-success">
              {totalMembers > 0 ? ((activeMembers / totalMembers) * 100).toFixed(1) : 0}% active rate
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Dues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingDues}</div>
            <p className="text-xs text-warning">₹{totalDuesAmount.toLocaleString()} total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">New This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{thisMonthMembers}</div>
            <p className="text-xs text-info">New registrations</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Member Directory</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="text-muted-foreground">Loading members...</div>
            </div>
          ) : (
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
                {members.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No members found. Click "Add Member" to get started.
                    </TableCell>
                  </TableRow>
                ) : (
                  members.map((member) => (
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
                      <TableCell className="font-medium">{member.flat || "N/A"}</TableCell>
                      <TableCell>{member.phone}</TableCell>
                      <TableCell>{new Date(member.registration_date).toLocaleDateString()}</TableCell>
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
                  ))
                )}
              </TableBody>
            </Table>
          )}
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

      <AddMemberModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onMemberAdded={handleMemberAdded}
      />
      </div>
    </Layout>
  );
};

export default Members;