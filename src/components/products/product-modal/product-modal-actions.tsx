import type { Product } from '../../../lib/types/product';

export interface Props {
  product: Product;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  isUpdating: boolean;
  isPublishing: boolean;
  isDeleting: boolean;
  onDelete: () => void;
  onPublish: () => void;
}

export const ProductModalActions = ({
  product,
  isEditing,
  setIsEditing,
  isUpdating,
  isPublishing,
  isDeleting,
  onDelete,
  onPublish,
}: Props) => (
  <div className="flex flex-col gap-2 mt-4">
    {product.status === 'Draft' && !isEditing && (
      <div className="flex gap-2">
        <button
          type="button"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>
        <button
          type="button"
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
          disabled={isPublishing}
          onClick={onPublish}
        >
          {isPublishing ? 'Publishing...' : 'Publish'}
        </button>
      </div>
    )}

    {isEditing && (
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isUpdating}
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {isUpdating ? 'Saving...' : 'Save'}
        </button>
        <button
          type="button"
          className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500"
          onClick={() => setIsEditing(false)}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onDelete}
          disabled={isDeleting}
          className="ml-auto bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 disabled:opacity-50"
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    )}
  </div>
);
