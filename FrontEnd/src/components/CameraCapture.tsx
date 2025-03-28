import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, RotateCcw, Check, Video, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CameraCaptureProps {
  onCapture: (imageData: string) => void;
  isLoading: boolean;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, isLoading }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isStarting, setIsStarting] = useState(true);
  const { toast } = useToast();

  // Auto-start camera on mount
  useEffect(() => {
    const startCamera = async () => {
      try {
        setIsStarting(true);
        setCameraError(null);
        
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "environment",
            width: { ideal: 1280 },
            height: { ideal: 720 }
          }
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          
          // Wait for video to be ready
          await new Promise((resolve) => {
            if (videoRef.current) {
              videoRef.current.onloadedmetadata = () => {
                videoRef.current?.play().then(resolve).catch(e => {
                  throw new Error("Failed to play video");
                });
              };
            }
          });
        }
      } catch (error) {
        let errorMessage = "Failed to access camera";
        if (error instanceof DOMException) {
          if (error.name === "NotAllowedError") {
            errorMessage = "Camera access denied. Please enable permissions";
          } else if (error.name === "NotFoundError") {
            errorMessage = "No camera found on this device";
          }
        }
        setCameraError(errorMessage);
        toast({
          title: "Camera Error",
          description: errorMessage,
          variant: "destructive"
        });
      } finally {
        setIsStarting(false);
      }
    };

    startCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [toast]);

  const captureImage = () => {
    if (!videoRef.current || !videoRef.current.srcObject) return;
    
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    ctx.drawImage(videoRef.current, 0, 0);
    setCapturedImage(canvas.toDataURL("image/jpeg"));
    
    // Stop camera after capture
    const stream = videoRef.current.srcObject as MediaStream;
    stream.getTracks().forEach(track => track.stop());
    videoRef.current.srcObject = null;
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    // Restart camera
    window.location.reload(); // Simplest way to restart everything
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Camera Capture</h2>
      
      <Card>
        <CardContent className="p-4">
          {!capturedImage ? (
            <div className="space-y-4">
              {cameraError ? (
                <div className="text-center py-8 space-y-4">
                  <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
                  <p className="text-red-500">{cameraError}</p>
                  <Button onClick={() => window.location.reload()}>
                    <Video className="mr-2 h-5 w-5" /> Try Again
                  </Button>
                </div>
              ) : (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full bg-black rounded-md"
                    style={{ height: "50vh", display: isStarting ? "none" : "block" }}
                  />
                  {isStarting && (
                    <div className="flex items-center justify-center bg-black rounded-md" style={{ height: "50vh" }}>
                      <p>Starting camera...</p>
                    </div>
                  )}
                  <Button 
                    onClick={captureImage} 
                    className="w-full"
                    size="lg"
                    disabled={isStarting || !!cameraError}
                  >
                    {isStarting ? (
                      "Initializing Camera..."
                    ) : (
                      <>
                        <Camera className="mr-2 h-5 w-5" /> Take Picture
                      </>
                    )}
                  </Button>
                </>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <img 
                src={capturedImage} 
                alt="Captured" 
                className="w-full bg-black rounded-md"
                style={{ height: "50vh", objectFit: "contain" }}
              />
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={retakePhoto}
                  className="flex-1"
                >
                  <RotateCcw className="mr-2 h-4 w-4" /> Retake
                </Button>
                <Button 
                  onClick={() => onCapture(capturedImage)} 
                  disabled={isLoading}
                  className="flex-1"
                >
                  {isLoading ? "Processing..." : (
                    <>
                      <Check className="mr-2 h-4 w-4" /> Use Photo
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CameraCapture;