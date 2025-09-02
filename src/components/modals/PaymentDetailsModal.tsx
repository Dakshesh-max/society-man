import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, CreditCard, User } from "lucide-react";

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

interface PaymentDetailsModalProps {
  payment: Payment | null;
  isOpen: boolean;
  onClose: () => void;
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "paid":
      return <Badge className="bg-success text-success-foreground">Paid</Badge>;
    case "overdue":
      return <Badge className="bg-destructive text-destructive-foreground">Overdue</Badge>;
    case "pending":
      return <Badge className="bg-warning text-warning-foreground">Pending</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export const PaymentDetailsModal = ({ payment, isOpen, onClose }: PaymentDetailsModalProps) => {
  if (!payment) return null;

  const isOverdue = new Date() > new Date(payment.dueDate) && payment.status !== 'paid';
  const daysDue = isOverdue ? Math.floor((new Date().getTime() - new Date(payment.dueDate).getTime()) / (1000 * 60 * 60 * 24)) : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Payment Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{payment.month} Maintenance</h3>
            {getStatusBadge(payment.status)}
          </div>

          <div className="grid gap-4">
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{payment.residentName}</p>
                <p className="text-sm text-muted-foreground">Flat {payment.flatNumber}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">₹{payment.amount}</p>
                <p className="text-sm text-muted-foreground">Monthly maintenance amount</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{new Date(payment.dueDate).toLocaleDateString()}</p>
                <p className="text-sm text-muted-foreground">Due date</p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <h4 className="font-medium">Payment Information</h4>
            <div className="grid gap-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Payment ID:</span>
                <span className="font-medium">{payment.id}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Payment Status:</span>
                <span className="font-medium">{payment.status}</span>
              </div>
              {payment.paymentDate && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Payment Date:</span>
                  <span className="font-medium">{new Date(payment.paymentDate).toLocaleDateString()}</span>
                </div>
              )}
              {isOverdue && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Days Overdue:</span>
                  <span className="font-medium text-destructive">{daysDue} days</span>
                </div>
              )}
            </div>
          </div>

          {payment.status === 'paid' && (
            <div className="bg-success/10 border border-success/20 rounded-lg p-3">
              <p className="text-sm text-success font-medium">✓ Payment Completed</p>
              <p className="text-xs text-success/80 mt-1">
                Thank you for your timely payment!
              </p>
            </div>
          )}

          {isOverdue && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
              <p className="text-sm text-destructive font-medium">⚠ Payment Overdue</p>
              <p className="text-xs text-destructive/80 mt-1">
                Please make the payment as soon as possible to avoid additional charges.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};