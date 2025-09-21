import { supabase } from "@/integrations/supabase/client";

export interface MaintenanceLog {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  reported_by: string;
  assigned_to?: string;
  created_at: string;
  updated_at: string;
  members?: {
    name: string;
    flat?: string;
  };
}

export interface CreateMaintenanceLogData {
  title: string;
  description: string;
  category?: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  reported_by: string;
  assigned_to?: string;
}

// Add new maintenance log
export async function logMaintenanceIssue(logData: CreateMaintenanceLogData): Promise<MaintenanceLog> {
  const { data, error } = await supabase
    .from('maintenance_logs')
    .insert([logData])
    .select(`
      *,
      members:reported_by (
        name,
        flat
      )
    `)
    .single();

  if (error) {
    throw new Error(`Failed to log maintenance issue: ${error.message}`);
  }

  return data as MaintenanceLog;
}

// Get all maintenance logs with optional status filter
export async function fetchMaintenanceLogs(status?: string): Promise<MaintenanceLog[]> {
  let query = supabase
    .from('maintenance_logs')
    .select(`
      *,
      members:reported_by (
        name,
        flat
      )
    `)
    .order('created_at', { ascending: false });

  if (status && status !== 'all') {
    query = query.eq('status', status);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Failed to fetch maintenance logs: ${error.message}`);
  }

  return (data || []) as MaintenanceLog[];
}

// Get maintenance log by ID
export async function getMaintenanceLogById(id: string): Promise<MaintenanceLog | null> {
  const { data, error } = await supabase
    .from('maintenance_logs')
    .select(`
      *,
      members:reported_by (
        name,
        flat
      )
    `)
    .eq('id', id)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to fetch maintenance log: ${error.message}`);
  }

  return data as MaintenanceLog | null;
}

// Update maintenance log status
export async function updateMaintenanceLogStatus(id: string, status: string): Promise<MaintenanceLog> {
  const { data, error } = await supabase
    .from('maintenance_logs')
    .update({ status })
    .eq('id', id)
    .select(`
      *,
      members:reported_by (
        name,
        flat
      )
    `)
    .single();

  if (error) {
    throw new Error(`Failed to update maintenance log: ${error.message}`);
  }

  return data as MaintenanceLog;
}

// Update entire maintenance log
export async function updateMaintenanceLog(id: string, updateData: Partial<CreateMaintenanceLogData>): Promise<MaintenanceLog> {
  const { data, error } = await supabase
    .from('maintenance_logs')
    .update(updateData)
    .eq('id', id)
    .select(`
      *,
      members:reported_by (
        name,
        flat
      )
    `)
    .single();

  if (error) {
    throw new Error(`Failed to update maintenance log: ${error.message}`);
  }

  return data as MaintenanceLog;
}