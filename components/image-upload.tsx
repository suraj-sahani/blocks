import { IKImage, IKUpload } from "imagekitio-next";
import {
  IKUploadResponse,
  UploadError,
} from "imagekitio-next/dist/types/components/IKUpload/props";
import { ImageUp } from "lucide-react";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";

type ImageUploadProps = {
  multiple?: boolean;
  onUploadComplete: (e: IKUploadResponse) => void;
  onProgressStart: () => void;
};
const ImageUpload = ({
  multiple = false,
  onUploadComplete,
  onProgressStart,
}: ImageUploadProps) => {
  const IkUploadRef = useRef<HTMLInputElement | null>(null);
  const [showUploadProgress, setShowUploadProgress] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<IKUploadResponse[]>(
    []
  );
  const onError = (err: UploadError) => {
    toast.error("Failed to upload image.");
    console.error("Error", err);
  };

  const onSuccess = (res: IKUploadResponse) => {
    toast.success("Image Uploaded Successfully.");
    setUploadedImageUrl((prev) => [...prev, res]);
    onUploadComplete(res);
  };

  const onProgress = (e: ProgressEvent<XMLHttpRequestEventTarget>) => {
    setShowUploadProgress(true);
    onProgressStart();
    const progressvalue = Math.ceil((e?.loaded / e?.total) * 100);
    setProgress(progressvalue);
    if (progressvalue === 100) setShowUploadProgress(false);
  };
  return (
    <>
      <IKUpload
        multiple={true}
        fileName="test-upload.png"
        onError={onError}
        onSuccess={onSuccess}
        className="hidden"
        ref={IkUploadRef}
        validateFile={(file) =>
          ["image/png", "image/jpeg", "image/jpeg", "image/webp"].includes(
            file.type
          )
        }
        onUploadProgress={onProgress}
      />
      <button
        type="button"
        className="min-h-[120px] border-dashed border-2 border-slate-300 flex justify-center items-center gap-2 w-full rounded-xl font-bold cursor-pointer"
        onClick={() => IkUploadRef?.current?.click()}
      >
        {showUploadProgress ? (
          <div className="relative size-15">
            <svg
              className="size-full -rotate-90"
              viewBox="0 0 36 36"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                className="stroke-current text-gray-200 dark:text-neutral-700"
                strokeWidth="2"
              ></circle>
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                className="stroke-current text-blue-600 dark:text-blue-500 transition-all ease-in-out duration-400"
                strokeWidth="2"
                strokeDasharray="100"
                strokeDashoffset={100 - progress}
                strokeLinecap="round"
              ></circle>
            </svg>

            <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
              <span className="text-center text-md font-bold text-blue-600 dark:text-blue-500">
                {progress}%
              </span>
            </div>
          </div>
        ) : (
          <>
            <ImageUp />
            Upload Image
          </>
        )}
      </button>
      {uploadedImageUrl.length ? (
        <div>
          <p className="mb-1 text-sm font-bold">Uploaded Image :</p>
          <div className="grid grid-cols-2 gap-2">
            {uploadedImageUrl.map((image) => (
              <IKImage
                src={image.url}
                height={80}
                width={200}
                alt={image.name}
                key={image.name}
                className="rounded-xl"
              />
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ImageUpload;
