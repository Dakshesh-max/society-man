import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface Member {
  id: number;
  name: string;
  flat: string;
  phone: string;
  email: string;
  memberSince: string;
  status: string;
  dues: number;
}

interface MemberDetailsModalProps {
  member: Member | null;
  isOpen: boolean;
  onClose: () => void;
}

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

export const MemberDetailsModal = ({ member, isOpen, onClose }: MemberDetailsModalProps) => {
  if (!member) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Member Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg">
                {member.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-muted-foreground">{member.email}</p>
              {getStatusBadge(member.status)}
            </div>
          </div>

          <Separator />

          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Flat Number</label>
                <p className="font-medium">{member.flat}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Phone</label>
                <p className="font-medium">{member.phone}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Member Since</label>
                <p className="font-medium">{new Date(member.memberSince).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Outstanding Dues</label>
                <p className={`font-medium ${member.dues > 0 ? 'text-warning' : 'text-success'}`}>
                  {member.dues > 0 ? `₹${member.dues}` : 'No Dues'}
                </p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Additional Information</label>
              <div className="mt-2 space-y-2">
                <p className="text-sm">• Regular maintenance payments</p>
                <p className="text-sm">• Active participation in society events</p>
                <p className="text-sm">• Committee member (Cultural Committee)</p>
                <p className="text-sm">• Emergency contact: +91 98765 43299</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};