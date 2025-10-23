import React, { useMemo, useState } from 'react';
import ProductFilter from './products-filter';
import ProductsTable from './products-table';
import Pagination from './products-pagination';
import { useGetProducts } from '../../lib/hooks/products/useGetProducts';
import type { Product } from '../../lib/types/product';
import { ProductModal } from './product-modal/product-modal';
import { useTeamPresence } from '../../lib/hooks/teams/useTeamPresence';
import { useProfile } from '../../lib/hooks/useProfile';

interface ProductsDisplayProps {
  initialPage?: number;
  pageSize?: number;
}

const ProductsDisplay: React.FC<ProductsDisplayProps> = ({
  initialPage = 1,
  pageSize = 10,
}) => {
  const { data: profile, isLoading: isProfileLoading } = useProfile();
  const [page, setPage] = useState(initialPage);
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const [queryParams, setQueryParams] = useState({ status: '', search: '' });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const { data, isLoading, isError, isFetching } = useGetProducts({
    ...queryParams,
    page,
    limit: pageSize,
    enabled: true,
  });

  const profileForPresence = useMemo(() => {
    if (!profile) return null;
    return {
      id: profile.id,
      full_name: profile.full_name,
      avatar_url: profile.avatar_url,
      team_id: profile.team_id,
    };
  }, [profile]);

  const { onlineUsers } = useTeamPresence(profile?.team_id, profileForPresence);
  const onlineUserIds = useMemo(
    () => new Set(onlineUsers.map((u) => u.id)),
    [onlineUsers]
  );

  if (isProfileLoading) {
    return <p className="text-gray-500">Loading profile...</p>;
  }

  return (
    <div>
      <ProductFilter
        status={status}
        search={search}
        onStatusChange={setStatus}
        onSearchChange={setSearch}
        onApply={() => setQueryParams({ status, search })}
      />

      <ProductsTable
        products={data?.data ?? []}
        isLoading={isLoading}
        isError={isError}
        onRowClick={(product) => setEditingProduct(product)}
        onlineUserIds={onlineUserIds}
      />

      {data && data.count > 0 && (
        <Pagination
          page={page}
          pageSize={pageSize}
          total={data.count}
          onPageChange={setPage}
        />
      )}

      {isFetching && <p>Refreshing products...</p>}

      {editingProduct && (
        <ProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
        />
      )}
    </div>
  );
};

export default ProductsDisplay;
