import { Plus, Bell, Pin, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnnouncementEditModal } from "@/components/modals/AnnouncementEditModal";
import { AnnouncementDetailsModal } from "@/components/modals/AnnouncementDetailsModal";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Layout } from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type Announcement = Tables<'announcements'>;

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

const Announcements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAnnouncements = async () => {
    try {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAnnouncements(data || []);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();

    // Subscribe to real-time changes
    const channel = supabase
      .channel('announcements-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'announcements'
        },
        () => {
          fetchAnnouncements();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleEdit = (announcement: Announcement) => {
    setSelectedAnnouncement({
      ...announcement,
      date: announcement.created_at,
      pinned: announcement.is_pinned,
      readBy: 0,
      totalMembers: 248,
    });
    setShowEditModal(true);
  };

  const handleViewDetails = (announcement: Announcement) => {
    setSelectedAnnouncement({
      ...announcement,
      date: announcement.created_at,
      pinned: announcement.is_pinned,
      readBy: 0,
      totalMembers: 248,
    });
    setShowDetailsModal(true);
  };

  const pinnedCount = announcements.filter(a => a.is_pinned).length;

  return (
    <Layout>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Announcements</h1>
          <p className="text-muted-foreground">Society notices and important updates</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => { setSelectedAnnouncement(null); setShowEditModal(true); }}>
          <Plus className="mr-2 h-4 w-4" />
          Create Announcement
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Announcements</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{announcements.length}</div>
            <p className="text-xs text-muted-foreground">Total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pinned</CardTitle>
            <Pin className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pinnedCount}</div>
            <p className="text-xs text-warning">High priority</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Read Rate</CardTitle>
            <Users className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-success">Good engagement</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Calendar className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-info">New announcements</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Announcements</h2>
        
        {isLoading ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              Loading announcements...
            </CardContent>
          </Card>
        ) : announcements.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No announcements yet. Create your first announcement!
            </CardContent>
          </Card>
        ) : (
          announcements.map((announcement) => (
            <Card key={announcement.id} className={`${announcement.is_pinned ? 'border-warning shadow-md' : ''}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      {announcement.is_pinned && <Pin className="h-4 w-4 text-warning" />}
                      <h3 className="text-lg font-semibold">{announcement.title}</h3>
                    </div>
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
                      <span>{new Date(announcement.created_at).toLocaleDateString()}</span>
                      <span>•</span>
                      <Badge variant="outline" className={getCategoryColor(announcement.category)}>
                        {announcement.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getPriorityBadge(announcement.priority)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{announcement.content}</p>
                
                <Separator className="my-4" />
                
                <div className="flex items-center justify-end text-sm">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(announcement)}>
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleViewDetails(announcement)}>
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <AnnouncementEditModal
        announcement={selectedAnnouncement}
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSuccess={fetchAnnouncements}
      />

      <AnnouncementDetailsModal
        announcement={selectedAnnouncement}
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
      />
      </div>
    </Layout>
  );
};

export default Announcements;