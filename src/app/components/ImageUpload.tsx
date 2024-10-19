import React, { useRef, useState } from 'react';
import Image from 'next/image';

interface ImageUploadProps {
  onImageChange: (file: File | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageChange }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    console.log("ImageUpload: File selected", file);
    
    if (file) {
      onImageChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        console.log("ImageUpload: Preview set");
      };
      reader.readAsDataURL(file);
    } else {
      onImageChange(null);
      setPreview(null);
      console.log("ImageUpload: Preview cleared");
    }
  };

  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-700">Upload an image of your room</label>
      <input
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        className="mt-1 block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-violet-50 file:text-violet-700
          hover:file:bg-violet-100"
      />
      {preview && (
        <div className="mt-2">
          <Image src={preview} alt="Preview" width={300} height={300} className="mx-auto" />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
