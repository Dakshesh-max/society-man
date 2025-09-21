import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { logMaintenanceIssue } from "@/services/maintenanceService";
import { fetchMembers, type Member } from "@/services/memberService";

interface MaintenanceCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogCreated?: () => void;
}

export const MaintenanceCreateModal = ({ isOpen, onClose, onLogCreated }: MaintenanceCreateModalProps) => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("general");
  const [priority, setPriority] = useState("medium");
  const [description, setDescription] = useState("");
  const [reportedBy, setReportedBy] = useState("");
  const [members, setMembers] = useState<Member[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadMembers = async () => {
      try {
        const data = await fetchMembers();
        setMembers(data);
      } catch (error) {
        console.error("Failed to load members:", error);
      }
    };

    if (isOpen) {
      loadMembers();
    }
  }, [isOpen]);

  const resetForm = () => {
    setTitle("");
    setCategory("general");
    setPriority("medium");
    setDescription("");
    setReportedBy("");
  };

  const handleSubmit = async () => {
    if (!title || !category || !priority || !description || !reportedBy) {
      toast({ title: "Missing details", description: "Please fill all fields.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      await logMaintenanceIssue({
        title,
        category,
        priority: priority as 'low' | 'medium' | 'high' | 'urgent',
        description,
        reported_by: reportedBy
      });

      toast({ title: "Request logged", description: `${title} has been submitted successfully.` });
      resetForm();
      onClose();
      onLogCreated?.();
    } catch (error) {
      toast({ 
        title: "Error", 
        description: error instanceof Error ? error.message : "Failed to log maintenance request", 
        variant: "destructive" 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Log Maintenance Request</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input 
              id="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="e.g., Water leakage in B-205" 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="plumbing">Plumbing</SelectItem>
                  <SelectItem value="electrical">Electrical</SelectItem>
                  <SelectItem value="cleaning">Cleaning</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reportedBy">Reported By</Label>
            <Select value={reportedBy} onValueChange={setReportedBy}>
              <SelectTrigger>
                <SelectValue placeholder="Select member" />
              </SelectTrigger>
              <SelectContent>
                {members.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    {member.name} - {member.flat || "N/A"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              rows={4} 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Describe the maintenance issue in detail..."
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};