-- Users can read products that are in their team.
CREATE POLICY "Users can read products on their team"
ON public.products FOR SELECT
USING (
  team_id = public.get_my_team_id() AND status <> 'Deleted'
);

-- Users can update products on their team.
CREATE POLICY "Users can update products on their team"
ON public.products FOR UPDATE
USING (
  team_id = public.get_my_team_id()
);
