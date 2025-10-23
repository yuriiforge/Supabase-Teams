CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_product_update ON products;

CREATE TRIGGER on_product_update
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

SELECT cron.schedule(
  'purge-deleted-products', 
  '0 0 * * *',              
  $$
    DELETE FROM products
    WHERE
      status = 'Deleted'
      AND updated_at < (now() - interval '2 weeks');
  $$
);