import { supabase } from "@/integrations/supabase/client";

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  flat?: string;
  address?: string;
  status: 'active' | 'pending' | 'inactive';
  dues: number;
  registration_date: string;
  updated_at: string;
}

export interface CreateMemberData {
  name: string;
  email: string;
  phone: string;
  flat?: string;
  address?: string;
  status?: 'active' | 'pending' | 'inactive';
  dues?: number;
}

// Add new member
export async function registerNewMember(memberData: CreateMemberData): Promise<Member> {
  const { data, error } = await supabase
    .from('members')
    .insert([memberData])
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to add member: ${error.message}`);
  }

  return data as Member;
}

// Get all members
export async function fetchMembers(): Promise<Member[]> {
  const { data, error } = await supabase
    .from('members')
    .select('*')
    .order('registration_date', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch members: ${error.message}`);
  }

  return (data || []) as Member[];
}

// Get member by ID
export async function getMemberById(id: string): Promise<Member | null> {
  const { data, error } = await supabase
    .from('members')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to fetch member: ${error.message}`);
  }

  return data as Member | null;
}

// Update member
export async function updateMember(id: string, updateData: Partial<CreateMemberData>): Promise<Member> {
  const { data, error } = await supabase
    .from('members')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update member: ${error.message}`);
  }

  return data as Member;
}

// Delete member
export async function deleteMember(id: string): Promise<void> {
  const { error } = await supabase
    .from('members')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to delete member: ${error.message}`);
  }
}