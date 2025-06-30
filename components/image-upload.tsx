import { ImageUp, X } from "lucide-react";
import Image from "next/image";
import React, { useRef } from "react";
import { Button } from "./ui/button";

type ImageUploadProps = {
  multiple?: boolean;
  uploadedImages: File[];
  setUploadedImages: React.Dispatch<React.SetStateAction<File[]>>;
  onChange?: (e: File[] | undefined) => void;
};
const ImageUpload = ({
  multiple = false,
  uploadedImages,
  setUploadedImages,
  onChange,
}: ImageUploadProps) => {
  // Create a ref for the file input element to access its files easily
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    // Only trigger file input click
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Convert FileList to Array and append to existing images
    const newFiles = Array.from(files);
    onChange?.([...uploadedImages, ...newFiles]);
    setUploadedImages((prev) => {
      return [...prev, ...newFiles];
    });
  };

  const handleImageRemove = (indexToRemove: number) => {
    setUploadedImages((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
    // Reset the file input value to allow re-uploading the same file
    // This is necessary because the file input does not allow selecting the same file again
    // after it has been selected once
    // This is a workaround to reset the file input
    // to allow re-uploading the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        multiple={multiple}
        accept="image/*"
      />
      <button
        type="button"
        className="min-h-[120px] border-dashed border-2 border-slate-300 flex justify-center items-center gap-2 w-full rounded-xl font-bold cursor-pointer"
        onClick={handleClick}
      >
        <ImageUp />
        Upload Image
      </button>
      {uploadedImages?.length ? (
        <div>
          <p className="mb-1 text-sm font-bold">Uploaded Image :</p>
          <div className="grid grid-cols-2 gap-2">
            {uploadedImages?.length &&
              uploadedImages.map((image, index) => (
                <div className="relative w-fit" key={image.name + index}>
                  <Image
                    src={URL.createObjectURL(image) || ""}
                    height={60}
                    width={150}
                    alt={image.name || ""}
                    key={image.name}
                    className="rounded-xl"
                  />
                  <Button
                    size={"icon"}
                    className="text-black size-6 absolute -top-2 -right-2 bg-slate-300 rounded-full border border-black hover:bg-slate-500 hover:text-white"
                    onClick={() => handleImageRemove(index)}
                  >
                    <X />
                  </Button>
                </div>
              ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ImageUpload;
