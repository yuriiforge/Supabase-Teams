import { useState } from 'react';
import { useCreateProduct } from '../../lib/hooks/products/useCreateProduct';
import { supabaseTeamsProductPhotoService } from '../../services/supabase-storage-service';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { CreateProductPayload } from '../../lib/types/product';
import {
  createProductSchema,
  type CreateProductSchema,
} from '../../lib/schemas/create-product-schema';
import { ImageUpload } from '../ui/image-upload';

export default function CreateProductModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { mutate: createProduct } = useCreateProduct();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      title: '',
      description: '',
      productPhoto: undefined,
    },
  });

  const onSubmit = async (data: CreateProductSchema) => {
    setIsUploading(true);
    let image_url: string | null = '';

    if (data.productPhoto) {
      image_url = await supabaseTeamsProductPhotoService.createFile(
        data.productPhoto
      );
    }

    if (!data.productPhoto) {
      image_url = null;
    }

    const payload: CreateProductPayload = {
      title: data.title,
      description: data.description,
      image_url,
    };

    createProduct(payload, {
      onSuccess: () => {
        reset();
        setIsOpen(false);
      },
      onSettled: () => {
        setIsUploading(false);
      },
    });
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Create Product
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              onClick={() => setIsOpen(false)}
              className="cursor-pointer absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4">Create Product</h2>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-3"
            >
              <input
                {...register('title')}
                type="text"
                placeholder="Product title"
                className="border border-gray-300 p-2 rounded"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}

              <textarea
                placeholder="Description (optional)"
                {...register('description')}
                className="border border-gray-300 p-2 rounded resize-none"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}

              <Controller
                name="productPhoto"
                control={control}
                render={({ field, fieldState }) => (
                  <ImageUpload
                    field={field}
                    error={fieldState.error?.message}
                    onRemove={() => field.onChange(null)}
                  />
                )}
              />

              <button
                type="submit"
                disabled={isUploading}
                className="bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
              >
                {isUploading ? 'Creating...' : 'Create'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
