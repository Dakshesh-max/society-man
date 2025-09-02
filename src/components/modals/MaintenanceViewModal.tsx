import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface MaintenanceRequest {
  id: string;
  title: string;
  flat: string;
  resident: string;
  category: string;
  priority: string;
  status: string;
  dateSubmitted: string;
  description: string;
}

interface MaintenanceViewModalProps {
  request: MaintenanceRequest | null;
  isOpen: boolean;
  onClose: () => void;
}

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

export const MaintenanceViewModal = ({ request, isOpen, onClose }: MaintenanceViewModalProps) => {
  const { toast } = useToast();

  if (!request) return null;

  const handleViewReceipt = () => {
    // Generate a mock receipt
    const receiptData = {
      receiptId: `RCP-${request.id}-${Date.now()}`,
      requestId: request.id,
      amount: 1500,
      date: new Date().toLocaleDateString(),
      serviceTax: 180,
      total: 1680,
    };

    toast({
      title: "Receipt Generated",
      description: `Receipt ${receiptData.receiptId} - Total: ₹${receiptData.total}`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Maintenance Request Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{request.title}</h3>
              <div className="flex space-x-2">
                {getPriorityBadge(request.priority)}
                {getStatusBadge(request.status)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Request ID</label>
                <p className="font-medium">{request.id}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Category</label>
                <p className="font-medium">{request.category}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Location</label>
                <p className="font-medium">{request.flat}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Submitted By</label>
                <p className="font-medium">{request.resident}</p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Date Submitted</label>
              <p className="font-medium">{new Date(request.dateSubmitted).toLocaleDateString()}</p>
            </div>
          </div>

          <Separator />

          <div>
            <label className="text-sm font-medium text-muted-foreground">Description</label>
            <p className="mt-2 text-sm bg-muted p-3 rounded-lg">{request.description}</p>
          </div>

          <Separator />

          <div>
            <label className="text-sm font-medium text-muted-foreground">Work Progress</label>
            <div className="mt-2 space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-success"></div>
                <span className="text-sm">Request submitted - {new Date(request.dateSubmitted).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${request.status !== 'pending' ? 'bg-success' : 'bg-muted'}`}></div>
                <span className="text-sm">Assigned to maintenance team</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${request.status === 'completed' ? 'bg-success' : 'bg-muted'}`}></div>
                <span className="text-sm">Work completed</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={handleViewReceipt}>
              View Receipt
            </Button>
            <Button onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};