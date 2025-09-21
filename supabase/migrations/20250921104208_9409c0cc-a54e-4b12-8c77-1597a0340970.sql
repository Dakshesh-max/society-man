-- Create members table
CREATE TABLE public.members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL,
  flat VARCHAR(50),
  address TEXT,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'pending', 'inactive')),
  dues DECIMAL(10,2) DEFAULT 0,
  registration_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create maintenance_logs table
CREATE TABLE public.maintenance_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(50) DEFAULT 'general',
  priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  reported_by UUID NOT NULL REFERENCES public.members(id),
  assigned_to VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.maintenance_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for members (public access for society management)
CREATE POLICY "Allow public read access to members" 
ON public.members 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public insert access to members" 
ON public.members 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public update access to members" 
ON public.members 
FOR UPDATE 
USING (true);

CREATE POLICY "Allow public delete access to members" 
ON public.members 
FOR DELETE 
USING (true);

-- Create policies for maintenance_logs
CREATE POLICY "Allow public read access to maintenance_logs" 
ON public.maintenance_logs 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public insert access to maintenance_logs" 
ON public.maintenance_logs 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public update access to maintenance_logs" 
ON public.maintenance_logs 
FOR UPDATE 
USING (true);

CREATE POLICY "Allow public delete access to maintenance_logs" 
ON public.maintenance_logs 
FOR DELETE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_members_updated_at
  BEFORE UPDATE ON public.members
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_maintenance_logs_updated_at
  BEFORE UPDATE ON public.maintenance_logs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_members_email ON public.members(email);
CREATE INDEX idx_members_status ON public.members(status);
CREATE INDEX idx_maintenance_logs_status ON public.maintenance_logs(status);
CREATE INDEX idx_maintenance_logs_priority ON public.maintenance_logs(priority);
CREATE INDEX idx_maintenance_logs_reported_by ON public.maintenance_logs(reported_by);