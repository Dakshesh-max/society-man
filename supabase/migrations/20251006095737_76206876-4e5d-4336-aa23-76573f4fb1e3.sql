-- Create visitors table
CREATE TABLE public.visitors (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name character varying NOT NULL,
  phone character varying NOT NULL,
  purpose character varying NOT NULL,
  host_flat character varying NOT NULL,
  host_name character varying NOT NULL,
  check_in timestamp with time zone NOT NULL DEFAULT now(),
  check_out timestamp with time zone,
  status character varying NOT NULL DEFAULT 'checked-in',
  id_type character varying,
  id_number character varying,
  vehicle_number character varying,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.visitors ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for public access
CREATE POLICY "Allow public read access to visitors" 
ON public.visitors 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public insert access to visitors" 
ON public.visitors 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public update access to visitors" 
ON public.visitors 
FOR UPDATE 
USING (true);

CREATE POLICY "Allow public delete access to visitors" 
ON public.visitors 
FOR DELETE 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_visitors_updated_at
BEFORE UPDATE ON public.visitors
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();