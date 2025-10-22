import type { ProductsResponse } from '../../lib/types/product';

interface ProductsTableProps {
  products: ProductsResponse['data'];
  isLoading: boolean;
  isError: boolean;
  error?: Error | undefined;
}

const ProductsTable: React.FC<ProductsTableProps> = ({
  products,
  isLoading,
  isError,
  error,
}) => {
  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p>Error: {error?.message}</p>;
  if (!products.length) return <p>No products found.</p>;

  return (
    <table className="w-full border">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Status</th>
          <th>Created At</th>
          <th>Created By</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.title}</td>
            <td>{product.description}</td>
            <td>{product.status}</td>
            <td>{new Date(product.created_at).toLocaleString()}</td>
            <td>{product.user_id.full_name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductsTable;
