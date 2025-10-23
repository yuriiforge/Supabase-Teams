import { useState, useEffect } from 'react';
import {
  type ControllerRenderProps,
  type FieldValues,
  type Path,
} from 'react-hook-form';

interface ImageUploadProps<T extends FieldValues> {
  field: ControllerRenderProps<T, Path<T>>;
  error?: string;
  existingUrl?: string | null;
  onRemove: () => void;
}

export function ImageUpload<T extends FieldValues>({
  field,
  error,
  existingUrl,
  onRemove,
}: ImageUploadProps<T>) {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    const file = field.value as File | undefined;
    let objectUrl: string | null = null;

    if (file instanceof File) {
      objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    } else {
      setPreview(existingUrl || null);
    }

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [field.value, existingUrl]);

  const handleRemove = () => {
    onRemove();
  };

  return (
    <div className="relative inline-block">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => field.onChange(e.target.files?.[0])}
        className="text-sm"
      />

      {preview && (
        <div className="relative mt-2 w-32 h-32">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover rounded-md border"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-700"
          >
            ✕
          </button>
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
