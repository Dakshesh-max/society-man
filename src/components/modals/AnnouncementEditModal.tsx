import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  priority: string;
  pinned: boolean;
  category: string;
  readBy: number;
  totalMembers: number;
}

interface AnnouncementEditModalProps {
  announcement: Announcement | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const AnnouncementEditModal = ({ announcement, isOpen, onClose, onSuccess }: AnnouncementEditModalProps) => {
  const [title, setTitle] = useState(announcement?.title || "");
  const [content, setContent] = useState(announcement?.content || "");
  const [priority, setPriority] = useState(announcement?.priority || "medium");
  const [category, setCategory] = useState(announcement?.category || "Meeting");
  const [pinned, setPinned] = useState(announcement?.pinned || false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const isCreate = !announcement;

  useEffect(() => {
    if (!isOpen) return;
    if (announcement) {
      setTitle(announcement.title || "");
      setContent(announcement.content || "");
      setPriority(announcement.priority || "medium");
      setCategory(announcement.category || "Meeting");
      setPinned(!!announcement.pinned);
    } else {
      setTitle("");
      setContent("");
      setPriority("medium");
      setCategory("Meeting");
      setPinned(false);
    }
  }, [isOpen, announcement]);

  const handleSave = async () => {
    if (!title || !content) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      if (isCreate) {
        const { error } = await supabase
          .from('announcements')
          .insert({
            title,
            content,
            priority,
            category,
            is_pinned: pinned,
            author: "Admin"
          });

        if (error) throw error;

        toast({
          title: "Announcement Created",
          description: "Your announcement has been created successfully.",
        });
      } else {
        const { error } = await supabase
          .from('announcements')
          .update({
            title,
            content,
            priority,
            category,
            is_pinned: pinned,
          })
          .eq('id', announcement!.id);

        if (error) throw error;

        toast({
          title: "Announcement Updated",
          description: "The announcement has been updated successfully.",
        });
      }
      
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Error saving announcement:', error);
      toast({
        title: "Error",
        description: "Failed to save announcement. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{isCreate ? "Create Announcement" : "Edit Announcement"}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter announcement title"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Meeting">Meeting</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                  <SelectItem value="Event">Event</SelectItem>
                  <SelectItem value="Rules">Rules</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="pinned"
              checked={pinned}
              onCheckedChange={setPinned}
            />
            <Label htmlFor="pinned">Pin this announcement</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter announcement content"
              rows={6}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isLoading}>
              {isLoading ? "Saving..." : isCreate ? "Create" : "Save Changes"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};