import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Users } from "lucide-react";

interface Announcement {
  id: number;
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

interface AnnouncementDetailsModalProps {
  announcement: Announcement | null;
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

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Meeting":
      return "text-primary";
    case "Maintenance":
      return "text-warning";
    case "Event":
      return "text-success";
    case "Rules":
      return "text-info";
    default:
      return "text-muted-foreground";
  }
};

export const AnnouncementDetailsModal = ({ announcement, isOpen, onClose }: AnnouncementDetailsModalProps) => {
  if (!announcement) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Announcement Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">{announcement.title}</h3>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs">
                    {announcement.author.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <span>{announcement.author}</span>
              </div>
              <span>•</span>
              <span>{new Date(announcement.date).toLocaleDateString()}</span>
              <span>•</span>
              <Badge variant="outline" className={getCategoryColor(announcement.category)}>
                {announcement.category}
              </Badge>
              {getPriorityBadge(announcement.priority)}
            </div>
          </div>

          <Separator />

          <div>
            <label className="text-sm font-medium text-muted-foreground">Content</label>
            <p className="mt-2 text-sm leading-relaxed">{announcement.content}</p>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <div className="text-sm space-y-2">
              <div><strong>Created:</strong> {new Date(announcement.date).toLocaleDateString()}</div>
              <div><strong>Category:</strong> {announcement.category}</div>
              <div><strong>Priority:</strong> {announcement.priority}</div>
              <div><strong>Status:</strong> {announcement.pinned ? 'Pinned' : 'Active'}</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};