-- 1. Create SECURITY DEFINER function to safely get team_id
CREATE OR REPLACE FUNCTION public.get_my_team_id()
RETURNS uuid AS $$
  SELECT team_id FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER;

-- 2. Drop old recursive policy 
DROP POLICY IF EXISTS "Users can view profiles of their teammates" ON public.profiles;

-- 3. Create new safe policy using the function
CREATE POLICY "Users can view profiles of their teammates"
ON public.profiles FOR SELECT
TO authenticated
USING (
  team_id = get_my_team_id()
);
