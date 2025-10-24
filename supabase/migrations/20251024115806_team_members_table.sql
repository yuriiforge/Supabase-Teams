CREATE TABLE public.team_members (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'member',
    joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    
    CONSTRAINT team_members_pkey PRIMARY KEY (id),
    CONSTRAINT team_members_unique UNIQUE (team_id, user_id)
);

ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Members can read their team
CREATE POLICY "Members can view team members"
ON public.team_members
FOR SELECT
TO authenticated
USING (
  team_id IN (
    SELECT team_id 
    FROM public.team_members 
    WHERE user_id = auth.uid()
  )
);

-- Users can join a team (insert self)
CREATE POLICY "Users can join a team"
ON public.team_members
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can read teams they belong to"
ON public.teams
FOR SELECT
TO authenticated
USING (
  id IN (
    SELECT team_id 
    FROM public.team_members 
    WHERE user_id = auth.uid()
  )
);