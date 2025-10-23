import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Product } from '../../../lib/types/product';
import { useUpdateProduct } from '../../../lib/hooks/products/useUpdateProduct';
import { usePublishProduct } from '../../../lib/hooks/products/usePublishProduct';
import { useDeleteProduct } from '../../../lib/hooks/products/useDeleteProduct';
import {
  updateProductSchema,
  type UpdateProductSchema,
} from '../../../lib/schemas/update-product-schema';
import { supabaseTeamsProductPhotoService } from '../../../services/supabase-storage-service';
import { ImageUpload } from '../../ui/image-upload';
import ProductStatusBadge from '../product-status-badge';
import { ProductModalActions } from './product-modal-actions';

export const ProductForm = ({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) => {
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

    if (!data.productPhoto && !image_url) {
      image_url = null;
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      {isEditing ? (
        <Controller
          name="productPhoto"
          control={control}
          render={({ field, fieldState }) => (
            <ImageUpload
              field={field}
              error={fieldState.error?.message}
              existingUrl={imageUrl}
              onRemove={() => {
                field.onChange(undefined);
                setValue('image_url', null);
              }}
            />
          )}
        />
      ) : (
        <p>No image provided yet.</p>
      )}

      <input
        {...register('title')}
        disabled={!isEditing || product.status !== 'Draft'}
        className={`border rounded p-2 ${!isEditing ? 'bg-gray-100' : ''}`}
      />
      {errors.title && (
        <p className="text-red-500 text-sm">{errors.title.message}</p>
      )}

      <textarea
        {...register('description')}
        disabled={!isEditing || product.status !== 'Draft'}
        className={`border rounded p-2 resize-none ${
          !isEditing ? 'bg-gray-100' : ''
        }`}
      />
      {errors.description && (
        <p className="text-red-500 text-sm">{errors.description.message}</p>
      )}

      <p>
        Status: <ProductStatusBadge productStatus={product.status} />
      </p>

      <ProductModalActions
        product={product}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        isUpdating={isUpdating}
        isPublishing={isPublishing}
        isDeleting={isDeleting}
        onDelete={() => deleteProduct(product.id, { onSuccess: onClose })}
        onPublish={() => publishProduct(product.id)}
      />
    </form>
  );
};
