import type { ProductsResponse } from '../../lib/types/product';
import ProductStatusBadge from './product-status-badge';

interface ProductsTableProps {
  products: ProductsResponse['data'];
  isLoading: boolean;
  isError: boolean;
  error?: Error | undefined;
  onRowClick?: (product: ProductsResponse['data'][number]) => void;
}

const ProductsTable: React.FC<ProductsTableProps> = ({
  products,
  isLoading,
  isError,
  error,
  onRowClick,
}) => {
  if (isLoading) return <p className="text-gray-500">Loading products...</p>;
  if (isError) return <p className="text-red-500">Error: {error?.message}</p>;
  if (!products.length)
    return <p className="text-gray-500">No products found.</p>;

  return (
    <div className="overflow-x-auto border rounded-lg shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created At
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created By
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product, idx) => (
            <tr
              key={product.id}
              className={`
        ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
        hover:bg-gray-100 transition-colors duration-200
      `}
              onClick={() => onRowClick?.(product)}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {product.title}
              </td>
              <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">
                {product.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                <ProductStatusBadge productStatus={product.status} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {new Date(product.created_at).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 flex items-center gap-3">
                <img
                  src={product.profiles.avatar_url || '/default-image.png'}
                  alt={product.profiles.full_name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span>{product.profiles.full_name}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
