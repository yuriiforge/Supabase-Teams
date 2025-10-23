-- Allow authenticated users to view (SELECT) files
create policy "Allow authenticated read access"
on storage.objects
for select
using (
  bucket_id = 'teams_products_photo' and auth.role() = 'authenticated'
);

-- Allow authenticated users to upload files
create policy "Allow authenticated uploads"
on storage.objects
for insert
with check (
  bucket_id = 'teams_products_photo' and auth.role() = 'authenticated'
);

-- Allow authenticated users to delete their own files (optional)
create policy "Allow delete for authenticated users"
on storage.objects
for delete
using (
  bucket_id = 'teams_products_photo' and auth.role() = 'authenticated'
);