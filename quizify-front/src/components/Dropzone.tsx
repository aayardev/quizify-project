/* eslint-disable @next/next/no-img-element */
"use client";
import {
  useCallback,
  useMemo,
  type CSSProperties,
  useState,
  useRef,
} from "react";
import { useDropzone } from "react-dropzone";
import { useToast } from "./ui/use-toast";
import { useFormContext } from "react-hook-form";
import { Trash2 } from "lucide-react";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumbStyle = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

export default function Dropzone({
  onChange,
}: {
  onChange: (file: File) => void;
}) {
  const [image, setImage] = useState<
    | {
        preview: string;
      }
    | undefined
  >(undefined);

  const { setValue, resetField } = useFormContext();

  const { toast } = useToast();
  const onDrop = useCallback(
    <T,>(acceptedFiles: T[]): void => {
      const file = acceptedFiles[0] as File;
      onChange(file as File);
      setImage(
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
    },
    [onChange]
  );
  const onError = useCallback(
    (error: any) => {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    },
    [toast]
  );
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    isDragActive,
  } = useDropzone({
    onDrop,
    onError,
    accept: { "image/*": [] },
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const ref = useRef<HTMLInputElement | null>(null);

  const deleteSelectedImage = useCallback(() => {
    setImage(undefined);
    setValue("profile_image", undefined);
    if (ref.current) {
      ref.current.files = null;
    }
  }, [setValue]);

  const thumb = image ? (
    <div>
      <div style={thumbStyle as CSSProperties}>
        <div style={thumbInner} className="relative">
          <img
            src={image.preview}
            style={img}
            // Revoke data uri after image is loaded
            onLoad={() => {
              URL.revokeObjectURL(image.preview);
            }}
            alt="Thumbnail"
          />

          <button
            onClick={deleteSelectedImage}
            className="absolute -right-1 -top-1 bg-white p-1 rounded-full"
          >
            <Trash2 className="text-red-500 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <div>
      <div {...getRootProps({ style: style as CSSProperties })}>
        <input {...getInputProps()} name="profile_image" />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag & drop some files here, or click to select files</p>
        )}
      </div>
      <aside style={thumbsContainer as CSSProperties}>{thumb}</aside>
    </div>
  );
}
