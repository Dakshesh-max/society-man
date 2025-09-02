import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface Payment {
  id: string;
  flatNumber: string;
  residentName: string;
  amount: number;
  month: string;
  status: string;
  dueDate: string;
  paymentDate?: string;
}

interface PaymentReceiptModalProps {
  payment: Payment | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PaymentReceiptModal = ({ payment, isOpen, onClose }: PaymentReceiptModalProps) => {
  const { toast } = useToast();

  if (!payment) return null;

  const receiptData = {
    receiptNumber: `RCP-${payment.id}-${Date.now()}`,
    issueDate: new Date().toLocaleDateString(),
    serviceTax: Math.round(payment.amount * 0.18),
    get total() { return payment.amount + this.serviceTax; }
  };

  const handlePrint = () => {
    toast({
      title: "Receipt Downloaded",
      description: `Receipt ${receiptData.receiptNumber} has been downloaded.`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Payment Receipt</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold">Shree Krishna Society</h3>
            <p className="text-sm text-muted-foreground">Kalyan East, Maharashtra</p>
            <p className="text-sm text-muted-foreground">Registration: SOC/KAL/2018/001</p>
          </div>

          <Separator />

          <div className="grid gap-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Receipt Number:</span>
              <span className="text-sm font-medium">{receiptData.receiptNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Issue Date:</span>
              <span className="text-sm font-medium">{receiptData.issueDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Flat Number:</span>
              <span className="text-sm font-medium">{payment.flatNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Resident Name:</span>
              <span className="text-sm font-medium">{payment.residentName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Payment Period:</span>
              <span className="text-sm font-medium">{payment.month}</span>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Maintenance Amount:</span>
              <span className="text-sm">₹{payment.amount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Service Tax (18%):</span>
              <span className="text-sm">₹{receiptData.serviceTax}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-medium">
              <span>Total Amount:</span>
              <span>₹{receiptData.total}</span>
            </div>
          </div>

          <div className="text-center text-xs text-muted-foreground">
            <p>Thank you for your payment!</p>
            <p>This is a computer generated receipt.</p>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button onClick={handlePrint}>
              Download Receipt
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};