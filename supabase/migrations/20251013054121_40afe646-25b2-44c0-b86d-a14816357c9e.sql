-- Create table for form submissions
CREATE TABLE public.form_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  city TEXT NOT NULL,
  project_type TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert form submissions
CREATE POLICY "Anyone can submit forms" 
ON public.form_submissions 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow admins to view all submissions (for future use)
CREATE POLICY "Admins can view all submissions" 
ON public.form_submissions 
FOR SELECT 
USING (true);

-- Add index for better query performance
CREATE INDEX idx_form_submissions_created_at ON public.form_submissions(created_at DESC);