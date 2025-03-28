import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Upload } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { useToast } from "@/hooks/use-toast";

interface FileUploadProps {
  onUpload: (file: File) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;  // ✅ Added this prop
}

const FileUpload: React.FC<FileUploadProps> = ({ onUpload, isLoading, setIsLoading }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a JPEG, JPG, or PNG image.",
        variant: "destructive"
      });
      return;
    }
    
    setSelectedFile(file);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsLoading(true);  // ✅ Ensure this works

    try {
      await onUpload(selectedFile);
    } finally {
      setIsLoading(false);
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <AnimatedSection 
      id="upload"
      className="py-16 px-4 md:px-8 max-w-3xl mx-auto"
      animation="fade-in-up"
    >
      <h2 className="text-3xl font-bold text-center mb-8">Upload Your Image</h2>
      
      <Card>
        <CardContent className="p-6">
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center ${
              dragActive ? 'border-primary bg-primary/5' : 'border-border'
            } transition-colors duration-200 cursor-pointer`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png"
              onChange={handleChange}
              className="hidden"
            />
            
            {!previewUrl ? (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <Upload className="h-12 w-12 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-lg font-medium">Drag & drop an image or click to browse</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Supports JPG, JPEG, PNG (max 5MB)
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative mx-auto w-40 h-40 overflow-hidden rounded-md">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm font-medium truncate">
                  {selectedFile?.name}
                </p>
              </div>
            )}
          </div>
          
          <div className="flex justify-center gap-4 mt-6">
            {previewUrl ? (
              <>
                <Button variant="outline" onClick={clearSelection} disabled={isLoading}>
                  Clear
                </Button>
                <Button onClick={handleUpload} disabled={isLoading}>
                  {isLoading ? 'Analyzing...' : 'Analyze Image'} 
                  {!isLoading && <Check className="ml-2 h-4 w-4" />}
                </Button>
              </>
            ) : (
              <Button onClick={() => fileInputRef.current?.click()}>
                Select Image
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </AnimatedSection>
  );
};

export default FileUpload;
