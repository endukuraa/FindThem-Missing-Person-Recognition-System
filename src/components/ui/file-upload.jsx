import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image } from 'lucide-react';
import { cn } from '@/lib/utils';

export const FileUpload = ({
  onFilesChange,
  multiple = false,
  accept = 'image/*',
  maxSize = 5242880, // 5MB
  className
}) => {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = multiple ? [...files, ...acceptedFiles] : acceptedFiles;
    setFiles(newFiles);
    onFilesChange(newFiles);

    // Create previews
    const newPreviews = acceptedFiles.map(file => URL.createObjectURL(file));
    setPreviews(prev => multiple ? [...prev, ...newPreviews] : newPreviews);
  }, [files, multiple, onFilesChange]);

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    
    // Revoke URL to prevent memory leaks
    URL.revokeObjectURL(previews[index]);
    
    setFiles(newFiles);
    setPreviews(newPreviews);
    onFilesChange(newFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { [accept]: [] },
    maxSize,
    multiple
  });

  return (
    <div className={cn('space-y-4', className)}>
      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
          isDragActive
            ? 'border-primary bg-primary/10'
            : 'border-gray-300 hover:border-primary hover:bg-primary/5',
          'dark:border-gray-600 dark:hover:border-primary'
        )}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
          {isDragActive ? 'Drop the files here' : 'Drag & drop files here'}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          or click to select files
        </p>
        <p className="text-xs text-gray-400 mt-2">
          {multiple ? 'Multiple files allowed' : 'Single file only'} • Max size: {Math.round(maxSize / 1024 / 1024)}MB
        </p>
      </div>

      {previews.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {previews.map((preview, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={() => removeFile(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                <Image className="inline h-3 w-3 mr-1" />
                {files[index]?.name}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};