"use client";

import { useCallback, useState } from "react";
import { Camera, Upload, X, FileImage } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { PhotoCategory } from "./PhotoGallery";

interface PhotoFile {
  id: string;
  file: File;
  preview: string;
  category: PhotoCategory;
  caption: string;
}

interface PhotoUploaderProps {
  onUpload?: (files: PhotoFile[]) => Promise<void>;
  onCancel?: () => void;
  className?: string;
}

const ACCEPTED_FILE_TYPES = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/heic": [".heic"],
  "image/webp": [".webp"],
  "application/pdf": [".pdf"],
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export function PhotoUploader({
  onUpload,
  onCancel,
  className,
}: PhotoUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<PhotoFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const generateId = () => Math.random().toString(36).substring(2, 15);

  const validateFile = (file: File): string | null => {
    // Check file type
    const fileType = file.type;
    const acceptedTypes = Object.keys(ACCEPTED_FILE_TYPES);
    if (!acceptedTypes.includes(fileType)) {
      return `File type ${fileType} is not supported. Please upload JPG, PNG, HEIC, WEBP, or PDF files.`;
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return `File ${file.name} is too large. Maximum size is 10MB.`;
    }

    return null;
  };

  const processFiles = useCallback((fileList: FileList | null) => {
    if (!fileList) {
      return;
    }

    const newFiles: PhotoFile[] = [];
    const errors: string[] = [];

    Array.from(fileList).forEach((file) => {
      const error = validateFile(file);
      if (error) {
        errors.push(error);
        return;
      }

      const preview = URL.createObjectURL(file);
      newFiles.push({
        id: generateId(),
        file,
        preview,
        category: "other",
        caption: "",
      });
    });

    if (errors.length > 0) {
      // TODO: Show toast notifications for upload errors
    }

    setFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const { files: droppedFiles } = e.dataTransfer;
      processFiles(droppedFiles);
    },
    [processFiles]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      processFiles(e.target.files);
      // Reset input value to allow selecting the same file again
      e.target.value = "";
    },
    [processFiles]
  );

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => {
      const file = prev.find((f) => f.id === id);
      if (file) {
        URL.revokeObjectURL(file.preview);
      }
      return prev.filter((f) => f.id !== id);
    });
  }, []);

  const updateFileCategory = useCallback(
    (id: string, category: PhotoCategory) => {
      setFiles((prev) =>
        prev.map((f) => (f.id === id ? { ...f, category } : f))
      );
    },
    []
  );

  const updateFileCaption = useCallback((id: string, caption: string) => {
    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, caption } : f)));
  }, []);

  const handleUpload = async () => {
    if (files.length === 0 || !onUpload) {
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      await onUpload(files);

      clearInterval(progressInterval);
      setUploadProgress(100);

      // Clean up previews
      files.forEach((file) => {
        URL.revokeObjectURL(file.preview);
      });

      // Reset state
      setTimeout(() => {
        setFiles([]);
        setIsUploading(false);
        setUploadProgress(0);
      }, 500);
    } catch (error) {
      // TODO: Show error toast notification
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleCancel = () => {
    // Clean up previews
    files.forEach((file) => {
      URL.revokeObjectURL(file.preview);
    });
    setFiles([]);
    onCancel?.();
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) {
      return `${bytes} B`;
    }
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getCategoryColor = (category: PhotoCategory): string => {
    switch (category) {
      case "before":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "during":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "after":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="size-5" />
          Upload Photos
        </CardTitle>
        <CardDescription>
          Add photos to document this job. Supported formats: JPG, PNG, HEIC,
          WEBP, PDF (max 10MB)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Drop Zone */}
        <div
          className={cn(
            "relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-muted-foreground/50"
          )}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            accept={Object.values(ACCEPTED_FILE_TYPES).flat().join(",")}
            className="absolute inset-0 cursor-pointer opacity-0"
            id="file-upload"
            multiple
            onChange={handleFileInput}
            type="file"
          />
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
              <Camera className="size-6 text-primary" />
            </div>
            <div>
              <p className="font-medium">
                Drag and drop files here, or click to browse
              </p>
              <p className="text-muted-foreground text-sm">
                JPG, PNG, HEIC, WEBP, or PDF up to 10MB
              </p>
            </div>
          </div>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-sm">
                Selected Files ({files.length})
              </h3>
              <Button
                onClick={() => {
                  files.forEach((file) => {
                    URL.revokeObjectURL(file.preview);
                  });
                  setFiles([]);
                }}
                size="sm"
                variant="ghost"
              >
                Clear All
              </Button>
            </div>

            <div className="space-y-3">
              {files.map((photoFile) => (
                <div
                  key={photoFile.id}
                  className="flex gap-4 rounded-lg border bg-muted/30 p-3"
                >
                  {/* Preview */}
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-md bg-muted">
                    {photoFile.file.type.startsWith("image/") ? (
                      <Image
                        alt={photoFile.file.name}
                        className="object-cover"
                        fill
                        src={photoFile.preview}
                      />
                    ) : (
                      <div className="flex size-full items-center justify-center">
                        <FileImage className="size-8 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex flex-1 flex-col gap-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="truncate font-medium text-sm">
                          {photoFile.file.name}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {formatFileSize(photoFile.file.size)}
                        </p>
                      </div>
                      <Button
                        onClick={() => removeFile(photoFile.id)}
                        size="sm"
                        variant="ghost"
                      >
                        <X className="size-4" />
                      </Button>
                    </div>

                    {/* Category Select */}
                    <div className="flex items-center gap-2">
                      <Label className="text-xs" htmlFor={`category-${photoFile.id}`}>
                        Category:
                      </Label>
                      <Select
                        onValueChange={(value) =>
                          updateFileCategory(
                            photoFile.id,
                            value as PhotoCategory
                          )
                        }
                        value={photoFile.category}
                      >
                        <SelectTrigger
                          className="h-8 w-[120px]"
                          id={`category-${photoFile.id}`}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="before">Before</SelectItem>
                          <SelectItem value="during">During</SelectItem>
                          <SelectItem value="after">After</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <Badge className={cn("text-xs", getCategoryColor(photoFile.category))}>
                        {photoFile.category}
                      </Badge>
                    </div>

                    {/* Caption Input */}
                    <Input
                      className="h-8 text-xs"
                      onChange={(e) =>
                        updateFileCaption(photoFile.id, e.target.value)
                      }
                      placeholder="Add a caption (optional)"
                      value={photoFile.caption}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Progress */}
        {isUploading && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Uploading...</span>
              <span className="font-medium">{uploadProgress}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <Button disabled={isUploading} onClick={handleCancel} variant="outline">
            Cancel
          </Button>
          <Button
            disabled={files.length === 0 || isUploading}
            onClick={handleUpload}
          >
            {isUploading ? (
              <>Uploading...</>
            ) : (
              <>
                <Upload className="mr-2 size-4" />
                Upload {files.length} {files.length === 1 ? "Photo" : "Photos"}
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
