import { CreditCard, TrendingUp, AlertCircle, CheckCircle, Plus, Search, Filter } from "lucide-react";
import { Layout } from "@/components/Layout";
import { PaymentReceiptModal } from "@/components/modals/PaymentReceiptModal";
import { PaymentDetailsModal } from "@/components/modals/PaymentDetailsModal";
import { SendNoticeModal } from "@/components/modals/SendNoticeModal";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
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

const payments = [
  {
    id: "PAY001",
    flat: "A-101",
    resident: "Rajesh Kumar",
    amount: 2500,
    type: "Maintenance",
    dueDate: "2024-09-01",
    paidDate: "2024-08-28",
    status: "paid",
    method: "UPI",
    transactionId: "TXN12345678",
  },
  {
    id: "PAY002",
    flat: "B-205",
    resident: "Priya Sharma",
    amount: 2500,
    type: "Maintenance",
    dueDate: "2024-09-01",
    paidDate: "2024-09-01",
    status: "paid",
    method: "Bank Transfer",
    transactionId: "TXN12345679",
  },
  {
    id: "PAY003",
    flat: "C-304",
    resident: "Amit Patel",
    amount: 2500,
    type: "Maintenance",
    dueDate: "2024-09-01",
    paidDate: null,
    status: "overdue",
    method: null,
    transactionId: null,
  },
  {
    id: "PAY004",
    flat: "A-203",
    resident: "Sunita Devi",
    amount: 2500,
    type: "Maintenance",
    dueDate: "2024-09-01",
    paidDate: null,
    status: "pending",
    method: null,
    transactionId: null,
  },
  {
    id: "PAY005",
    flat: "D-402",
    resident: "Vikram Singh",
    amount: 5000,
    type: "Special Assessment",
    dueDate: "2024-09-15",
    paidDate: "2024-09-02",
    status: "paid",
    method: "Cash",
    transactionId: "CASH001",
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "paid":
      return <Badge className="bg-success text-success-foreground">Paid</Badge>;
    case "pending":
      return <Badge className="bg-warning text-warning-foreground">Pending</Badge>;
    case "overdue":
      return <Badge className="bg-destructive text-destructive-foreground">Overdue</Badge>;
    case "partial":
      return <Badge className="bg-info text-info-foreground">Partial</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "paid":
      return <CheckCircle className="h-4 w-4 text-success" />;
    case "pending":
      return <AlertCircle className="h-4 w-4 text-warning" />;
    case "overdue":
      return <AlertCircle className="h-4 w-4 text-destructive" />;
    default:
      return <CreditCard className="h-4 w-4" />;
  }
};

const isOverdue = (dueDate: string, status: string) => {
  if (status === "paid") return false;
  return new Date(dueDate) < new Date();
};

const Payments = () => {
  const [selectedPayment, setSelectedPayment] = useState<any | null>(null);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [noticeRecipient, setNoticeRecipient] = useState("");
  const { toast } = useToast();

  const handleViewReceipt = (payment: any) => {
    setSelectedPayment(payment);
    setShowReceiptModal(true);
  };

  const handleViewDetails = (payment: any) => {
    setSelectedPayment(payment);
    setShowDetailsModal(true);
  };

  const handleMarkPaid = (payment: any) => {
    toast({
      title: "Payment Marked as Paid",
      description: `Payment for ${payment.flat} has been marked as paid.`,
    });
  };

  const handleSendNotice = (payment: any) => {
    setNoticeRecipient(payment.resident);
    setShowNoticeModal(true);
  };

  const totalPaid = payments
    .filter(p => p.status === "paid")
    .reduce((sum, p) => sum + p.amount, 0);
  
  const totalPending = payments
    .filter(p => p.status !== "paid")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <Layout>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Payment Management</h1>
          <p className="text-muted-foreground">Track society fees and payment status</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Record Payment
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search payments..." className="pl-10" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
            <SelectItem value="special">Special Assessment</SelectItem>
            <SelectItem value="amenity">Amenity Fee</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Collected</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalPaid.toLocaleString()}</div>
            <p className="text-xs text-success">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
            <AlertCircle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalPending.toLocaleString()}</div>
            <p className="text-xs text-warning">Needs collection</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Collection Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((totalPaid / (totalPaid + totalPending)) * 100)}%
            </div>
            <p className="text-xs text-info">Good performance</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Payments</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {payments.filter(p => isOverdue(p.dueDate, p.status)).length}
            </div>
            <p className="text-xs text-destructive">Require follow-up</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment Records</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payment ID</TableHead>
                <TableHead>Resident</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Paid Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow 
                  key={payment.id}
                  className={isOverdue(payment.dueDate, payment.status) ? "bg-destructive/5" : ""}
                >
                  <TableCell className="font-medium">{payment.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{payment.resident}</div>
                      <div className="text-sm text-muted-foreground">{payment.flat}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{payment.type}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">₹{payment.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className={`text-sm ${isOverdue(payment.dueDate, payment.status) ? "text-destructive font-medium" : ""}`}>
                      {new Date(payment.dueDate).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    {payment.paidDate ? (
                      <div className="text-sm text-success">
                        {new Date(payment.paidDate).toLocaleDateString()}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(payment.status)}
                      {getStatusBadge(payment.status)}
                    </div>
                  </TableCell>
                  <TableCell>
                    {payment.method ? (
                      <Badge variant="secondary">{payment.method}</Badge>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                   <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewReceipt(payment)}>
                        Receipt
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleViewDetails(payment)}>
                        Details
                      </Button>
                      {payment.status === 'pending' && (
                        <Button size="sm" onClick={() => handleMarkPaid(payment)}>
                          Mark Paid
                        </Button>
                      )}
                      {payment.status === 'overdue' && (
                        <Button variant="outline" size="sm" onClick={() => handleSendNotice(payment)}>
                          Send Notice
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

      <PaymentReceiptModal
        payment={selectedPayment}
        isOpen={showReceiptModal}
        onClose={() => setShowReceiptModal(false)}
      />

      <PaymentDetailsModal
        payment={selectedPayment}
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

export default Payments;