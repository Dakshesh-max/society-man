import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface GenerateReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GenerateReportModal = ({ isOpen, onClose }: GenerateReportModalProps) => {
  const { toast } = useToast();
  const [type, setType] = useState("Members");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const makeCsv = () => {
    const rows = [
      ["Report Type", type],
      ["From", from || "-"],
      ["To", to || "-"],
      [],
      ["Sample", "Data"],
      ["This is a placeholder until a backend is connected", "-"]
    ];
    return rows.map((r) => r.join(",")).join("\n");
  };

  const handleGenerate = () => {
    const csv = makeCsv();
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${type.toLowerCase()}-report.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Report generated", description: `${type} report downloaded.` });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Generate Report</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Report Type</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Members">Members</SelectItem>
                <SelectItem value="Payments">Payments</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
                <SelectItem value="Visitors">Visitors</SelectItem>
                <SelectItem value="Announcements">Announcements</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>From</Label>
              <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>To</Label>
              <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleGenerate}>Generate</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};