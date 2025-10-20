-- 1. Create a custom type for product status
CREATE TYPE public.product_status AS ENUM ('Draft', 'Active', 'Deleted');

-- 2. Create the products table
CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone,
  title text NOT NULL,
  description text,
  image_url text, -- Will store the path to the file in Supabase Storage
  status product_status DEFAULT 'Draft' NOT NULL,
  
  -- Foreign keys to link the product to a team and a user
  team_id uuid NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS policies to protect the data
CREATE OR REPLACE FUNCTION get_my_team_id()
RETURNS uuid AS $$
  SELECT team_id FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER;

-- Policy: Users can see all products within their own team.
CREATE POLICY "Users can view products in their own team"
ON public.products FOR SELECT
USING (team_id = get_my_team_id());

-- Policy: Users can create products for their own team.
CREATE POLICY "Users can create products for their team"
ON public.products FOR INSERT
WITH CHECK (team_id = get_my_team_id());

-- Policy: Users can update products in their team IF the status is 'Draft'.
CREATE POLICY "Users can update their own draft products"
ON public.products FOR UPDATE
USING (team_id = get_my_team_id() AND status = 'Draft');

-- Policy: Users can "delete" products (which is an update to the status).
CREATE POLICY "Users can delete products in their team"
ON public.products FOR UPDATE
USING (team_id = get_my_team_id());

-- 5. Create an index for full-text search
CREATE INDEX products_search_idx ON public.products
USING GIN (to_tsvector('english', title || ' ' || description));