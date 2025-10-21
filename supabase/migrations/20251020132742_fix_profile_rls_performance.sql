ALTER POLICY "Users can view their own profile"
ON public.profiles
USING (id = (select auth.uid()));

ALTER POLICY "Users can insert their own profile"
ON public.profiles
WITH CHECK (id = (select auth.uid()));

ALTER POLICY "Users can update their own profile"
ON public.profiles
USING (id = (select auth.uid()));

ALTER POLICY "Users can view profiles of their teammates"
ON public.profiles
USING (
  team_id IN (
    SELECT team_id FROM public.profiles WHERE id = (select auth.uid())
  )
);