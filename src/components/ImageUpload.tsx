"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const MAX_SIZE_BYTES = 5 * 1024 * 1024;

type ImageUploadProps = {
  value: File | null;
  onChange: (file: File | null) => void;
  error?: string;
  onError?: (message: string | null) => void;
};

function validateFile(file: File): string | null {
  if (!file.type.startsWith("image/")) {
    return "Please upload an image file.";
  }
  if (file.size > MAX_SIZE_BYTES) {
    return "Image must be 5 MB or smaller.";
  }
  return null;
}

export function ImageUpload({ value, onChange, error, onError }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();

  const previewUrl = useMemo(() => (value ? URL.createObjectURL(value) : null), [value]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      const file = files?.[0];
      if (!file) return;

      const validationError = validateFile(file);
      if (validationError) {
        onError?.(validationError);
        return;
      }
      onError?.(null);
      onChange(file);
    },
    [onChange, onError]
  );

  return (
    <div>
      <label htmlFor={inputId} className="mb-2 block text-sm font-medium text-foreground/80">
        Add a photo (optional)
      </label>

      <div
        role="button"
        tabIndex={0}
        aria-describedby={error ? `${inputId}-error` : undefined}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed px-4 py-8 text-center transition-colors",
          isDragging ? "border-rose-300 bg-rose-300/10" : "border-white/20 bg-white/5 hover:bg-white/10",
          error && "border-red-400/70"
        )}
      >
        <span className="text-sm text-foreground/70">
          Drag & drop an image, or <span className="text-rose-300 underline">browse</span>
        </span>
        <span className="text-xs text-foreground/40">PNG, JPG, or GIF up to 5 MB</span>
      </div>

      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {error && (
        <p id={`${inputId}-error`} className="mt-2 text-sm text-red-300">
          {error}
        </p>
      )}

      <AnimatePresence>
        {previewUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative mt-3 inline-block"
          >
            <img
              src={previewUrl}
              alt="Selected upload preview"
              className="h-32 w-32 rounded-2xl object-cover shadow-lg"
            />
            <button
              type="button"
              onClick={() => {
                onChange(null);
                onError?.(null);
                if (inputRef.current) inputRef.current.value = "";
              }}
              aria-label="Remove selected image"
              className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-plum-950 text-foreground shadow-md ring-1 ring-white/20 cursor-pointer"
            >
              &times;
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
