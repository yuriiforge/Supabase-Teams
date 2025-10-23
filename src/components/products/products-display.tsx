import React, { useState } from 'react';
import ProductFilter from './products-filter';
import ProductsTable from './products-table';
import Pagination from './products-pagination';
import { useGetProducts } from '../../lib/hooks/products/useGetProducts';
import type { Product } from '../../lib/types/product';
import { ProductModal } from './product-modal/product-modal';

interface ProductsDisplayProps {
  initialPage?: number;
  pageSize?: number;
}

const ProductsDisplay: React.FC<ProductsDisplayProps> = ({
  initialPage = 1,
  pageSize = 10,
}) => {
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
