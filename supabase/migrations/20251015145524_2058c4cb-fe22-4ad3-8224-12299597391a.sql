-- Add status column to form_submissions table with default value 'Nuevo'
ALTER TABLE form_submissions
ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'Nuevo';