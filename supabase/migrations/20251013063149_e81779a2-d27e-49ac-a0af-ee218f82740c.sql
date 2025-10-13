-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "Anyone can submit forms" ON form_submissions;

-- Create a permissive policy that allows anyone (including anonymous users) to insert
CREATE POLICY "Anyone can submit forms"
ON form_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);