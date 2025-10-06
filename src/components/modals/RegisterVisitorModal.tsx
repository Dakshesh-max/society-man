import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface RegisterVisitorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const RegisterVisitorModal = ({ isOpen, onClose, onSuccess }: RegisterVisitorModalProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    purpose: "",
    host_flat: "",
    host_name: "",
    id_type: "",
    id_number: "",
    vehicle_number: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("visitors").insert([
        {
          ...formData,
          status: "checked-in",
          check_in: new Date().toISOString(),
        },
      ]);

      if (error) throw error;

      toast({
        title: "Visitor Registered",
        description: `${formData.name} has been registered successfully.`,
      });

      setFormData({
        name: "",
        phone: "",
        purpose: "",
        host_flat: "",
        host_name: "",
        id_type: "",
        id_number: "",
        vehicle_number: "",
      });
      onSuccess();
      onClose();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to register visitor",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Register New Visitor</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Visitor Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="host_flat">Host Flat *</Label>
              <Input
                id="host_flat"
                value={formData.host_flat}
                onChange={(e) => setFormData({ ...formData, host_flat: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="host_name">Host Name *</Label>
              <Input
                id="host_name"
                value={formData.host_name}
                onChange={(e) => setFormData({ ...formData, host_name: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="purpose">Purpose of Visit *</Label>
            <Select value={formData.purpose} onValueChange={(value) => setFormData({ ...formData, purpose: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select purpose" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Personal Visit">Personal Visit</SelectItem>
                <SelectItem value="Package Delivery">Package Delivery</SelectItem>
                <SelectItem value="Medical Consultation">Medical Consultation</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="id_type">ID Type</Label>
              <Select value={formData.id_type} onValueChange={(value) => setFormData({ ...formData, id_type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select ID type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Aadhar Card">Aadhar Card</SelectItem>
                  <SelectItem value="PAN Card">PAN Card</SelectItem>
                  <SelectItem value="Driving License">Driving License</SelectItem>
                  <SelectItem value="Passport">Passport</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="id_number">ID Number</Label>
              <Input
                id="id_number"
                value={formData.id_number}
                onChange={(e) => setFormData({ ...formData, id_number: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="vehicle_number">Vehicle Number (Optional)</Label>
            <Input
              id="vehicle_number"
              value={formData.vehicle_number}
              onChange={(e) => setFormData({ ...formData, vehicle_number: e.target.value })}
              placeholder="e.g., MH-04-AB-1234"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Registering..." : "Register Visitor"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
