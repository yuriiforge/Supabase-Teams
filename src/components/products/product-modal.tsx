import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabaseTeamsProductPhotoService } from '../../services/supabase-storage-service';
import { useUpdateProduct } from '../../lib/hooks/products/useUpdateProduct';
import { useDeleteProduct } from '../../lib/hooks/products/useDeleteProduct';
import type { Product } from '../../lib/types/product';
import {
  updateProductSchema,
  type UpdateProductSchema,
} from '../../lib/schemas/update-product-schema';
import ProductStatusBadge from './product-status-badge';
import { usePublishProduct } from '../../lib/hooks/products/usePublishProduct';
import { ImageUpload } from '../ui/image-upload';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);

  const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct();
  const { mutate: publishProduct, isPending: isPublishing } =
    usePublishProduct();
  const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProduct();
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UpdateProductSchema>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      title: product.title,
      description: product.description,
      image_url: product.image_url,
    },
  });

  const onSubmit = async (data: UpdateProductSchema) => {
    let image_url = data.image_url;

    if (data.productPhoto) {
      image_url = await supabaseTeamsProductPhotoService.createFile(
        data.productPhoto
      );
    }

    updateProduct(
      { productId: product.id, ...data, image_url },
      {
        onSuccess: () => {
          setIsEditing(false);
          reset({ ...data, image_url });
        },
      }
    );
  };

  const imageUrl = watch('image_url');

  const handlePublicProduct = () => {
    publishProduct(product.id);
  };

  const handleDelete = () => {
    deleteProduct(product.id, { onSuccess: onClose });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">{product.title}</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div className="flex justify-center mb-4">
            <Controller
              name="productPhoto"
              control={control}
              render={({ field, fieldState }) => {
                return (
                  <ImageUpload
                    field={field}
                    error={fieldState.error?.message}
                    existingUrl={imageUrl}
                    onRemove={() => {
                      field.onChange(undefined);
                      setValue('image_url', undefined);
                    }}
                  />
                );
              }}
            />
          </div>

          <input
            {...register('title')}
            disabled={!isEditing || product.status !== 'Draft'}
            className={`border rounded p-2 ${
              !isEditing || product.status !== 'Draft' ? 'bg-gray-100' : ''
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}

          <textarea
            {...register('description')}
            disabled={!isEditing || product.status !== 'Draft'}
            className={`border rounded p-2 resize-none ${
              !isEditing || product.status !== 'Draft' ? 'bg-gray-100' : ''
            }`}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}

          <p>
            Status: <ProductStatusBadge productStatus={product.status} />
          </p>

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
                  onClick={() => handlePublicProduct()}
                  disabled={isPublishing}
                >
                  {isPublishing ? 'Publishing...' : 'Publish'}
                </button>
              </div>
            )}
            <div className="flex items-center gap-3">
              {product.status === 'Draft' && isEditing && (
                <>
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
                    onClick={() => {
                      setIsEditing(false);
                      reset();
                    }}
                  >
                    Cancel
                  </button>
                </>
              )}

              {product.status !== 'Deleted' && isEditing && (
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="ml-auto bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 disabled:opacity-50 "
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
