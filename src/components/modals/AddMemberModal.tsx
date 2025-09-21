import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { registerNewMember } from "@/services/memberService";

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMemberAdded?: () => void;
}

export const AddMemberModal = ({ isOpen, onClose, onMemberAdded }: AddMemberModalProps) => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [flat, setFlat] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setName("");
    setFlat("");
    setPhone("");
    setEmail("");
  };

  const handleSubmit = async () => {
    if (!name || !flat || !phone || !email) {
      toast({ title: "Missing details", description: "Please fill all fields.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      await registerNewMember({
        name,
        email,
        phone,
        flat,
        status: 'active'
      });

      toast({ title: "Member added", description: `${name} has been added successfully.` });
      resetForm();
      onClose();
      onMemberAdded?.();
    } catch (error) {
      toast({ 
        title: "Error", 
        description: error instanceof Error ? error.message : "Failed to add member", 
        variant: "destructive" 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Member</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Rajesh Kumar" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="flat">Flat</Label>
              <Input id="flat" value={flat} onChange={(e) => setFlat(e.target.value)} placeholder="e.g., A-101" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g., +91 98765 43210" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@email.com" />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose} disabled={isSubmitting}>Cancel</Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Member"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};