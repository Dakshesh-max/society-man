-- Create announcements table
CREATE TABLE public.announcements (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title character varying NOT NULL,
  content text NOT NULL,
  author character varying NOT NULL,
  category character varying NOT NULL DEFAULT 'general',
  priority character varying NOT NULL DEFAULT 'normal',
  is_pinned boolean NOT NULL DEFAULT false,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for public access
CREATE POLICY "Allow public read access to announcements" 
ON public.announcements 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public insert access to announcements" 
ON public.announcements 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public update access to announcements" 
ON public.announcements 
FOR UPDATE 
USING (true);

CREATE POLICY "Allow public delete access to announcements" 
ON public.announcements 
FOR DELETE 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_announcements_updated_at
BEFORE UPDATE ON public.announcements
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();