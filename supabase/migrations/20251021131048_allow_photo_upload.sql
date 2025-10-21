-- Allow authenticated users to upload to this bucket
CREATE POLICY "Allow uploads for authenticated users"
ON storage.objects
FOR INSERT
WITH CHECK (
  auth.role() = 'authenticated' AND bucket_id = 'teams_products_photo'
);

CREATE POLICY "Allow read for everyone"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'teams_products_photo'
);