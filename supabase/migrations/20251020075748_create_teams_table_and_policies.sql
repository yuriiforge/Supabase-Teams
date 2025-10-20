-- 1. Create the teams table
CREATE TABLE public.teams (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    name text NOT NULL,
    invite_code text NOT NULL UNIQUE
);

-- 2. Enable row-level security
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;

-- 3. Policy for access
CREATE POLICY "Authenticated users can create teams"
ON public.teams FOR INSERT
TO authenticated WITH CHECK (true);