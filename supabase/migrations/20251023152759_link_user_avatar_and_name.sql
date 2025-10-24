CREATE OR REPLACE FUNCTION public.handle_user_update() 
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.profiles
  SET 
    full_name = COALESCE(new.raw_user_meta_data->>'full_name', old.raw_user_meta_data->>'full_name'),
    avatar_url = COALESCE(new.raw_user_meta_data->>'avatar_url', old.raw_user_meta_data->>'avatar_url')
  WHERE
    id = new.id;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;

CREATE TRIGGER on_auth_user_updated
  AFTER UPDATE ON auth.users
  FOR EACH ROW
  WHEN (OLD.raw_user_meta_data <> NEW.raw_user_meta_data)
  EXECUTE PROCEDURE public.handle_user_update();