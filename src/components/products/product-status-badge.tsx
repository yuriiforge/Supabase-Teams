import type { Status } from '../../lib/types/product';

interface Props {
  productStatus: Status;
}

const ProductStatusBadge = ({ productStatus }: Props) => {
  return (
    <span
      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
        productStatus === 'Active'
          ? 'bg-green-100 text-green-800'
          : productStatus === 'Draft'
          ? 'bg-yellow-100 text-yellow-800'
          : 'bg-red-100 text-red-800'
      }`}
    >
      {productStatus}
    </span>
  );
};

export default ProductStatusBadge;
