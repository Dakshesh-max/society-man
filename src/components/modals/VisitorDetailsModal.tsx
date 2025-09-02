import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface Visitor {
  id: string;
  name: string;
  phone: string;
  purpose: string;
  flat?: string;
  hostFlat?: string;
  checkIn: string;
  checkOut?: string | null;
  status: string;
  idType: string;
  idNumber: string;
}

interface VisitorDetailsModalProps {
  visitor: Visitor | null;
  isOpen: boolean;
  onClose: () => void;
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "checked-in":
      return <Badge className="bg-success text-success-foreground">Checked In</Badge>;
    case "checked-out":
      return <Badge variant="secondary">Checked Out</Badge>;
    case "pending":
      return <Badge className="bg-warning text-warning-foreground">Pending</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export const VisitorDetailsModal = ({ visitor, isOpen, onClose }: VisitorDetailsModalProps) => {
  if (!visitor) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Visitor Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg">
                {visitor.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">{visitor.name}</h3>
              <p className="text-muted-foreground">{visitor.phone}</p>
              {getStatusBadge(visitor.status)}
            </div>
          </div>

          <Separator />

          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Visiting Flat</label>
                <p className="font-medium">{visitor.flat || visitor.hostFlat}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Purpose</label>
                <p className="font-medium">{visitor.purpose}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">ID Type</label>
                <p className="font-medium">{visitor.idType}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">ID Number</label>
                <p className="font-medium">{visitor.idNumber}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Check-in Time</label>
                <p className="font-medium">{new Date(visitor.checkIn).toLocaleString()}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Check-out Time</label>
                <p className="font-medium">
                  {visitor.checkOut ? new Date(visitor.checkOut).toLocaleString() : 'Still inside'}
                </p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Additional Information</label>
              <div className="mt-2 space-y-2">
                <p className="text-sm">• Photo captured at entry</p>
                <p className="text-sm">• ID verification completed</p>
                <p className="text-sm">• Resident approval: Confirmed</p>
                <p className="text-sm">• Security guard: Ramesh Kumar</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};