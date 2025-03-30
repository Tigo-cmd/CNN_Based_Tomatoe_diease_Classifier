import React, { useState } from 'react';
import FileUpload from './FileUpload';
import CameraCapture from './CameraCapture';
import DiseaseResult, { Disease } from './DiseaseResult';
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Upload } from 'lucide-react';
import {Default_Url_predict} from './URL.tsx'
// import { InferenceEngine } from "inferencejs";
// const inferEngine = new InferenceEngine();

// Sample data (fallback if API fails)
const sampleDiseases: Record<string, Disease> = {
  "Demo": {
    name: "Unknown",
    probability: 0.92,
    description: "A Demo Due to API Error",
    symptoms: [
      "Dark, water-soaked spots on leaves",
      "White, fuzzy growth on leaf undersides",
      "Brown lesions on stems",
      "Firm, irregular brown spots on fruits"
    ],
    treatment: [
      "Remove and destroy infected plants",
      "Apply fungicides preventatively",
      "Increase plant spacing for better air circulation",
      "Avoid overhead watering",
      "Plant resistant varieties"
    ]
  }
};

// const workerId = await inferEngine.startWorker("tomato-leaf-diseases", "1", "rf_fWlSSmzV78UkawsdzojuwPv768j1");
// console.log(workerId);

// const BACKEND_URL_KEY = 'tomato_classifier_backend_url';


const TomatoClassifier: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleUpload = async (file: File) => {
    // Set loading state
    setIsLoading(true);
    setShowResult(false);
    
    // Save the image URL for display
    setImageUrl(URL.createObjectURL(file));
    
     try {
      // Get the current backend URL
      const apiUrl = Default_Url_predict;
      
      // Create form data for API
      const formData = new FormData();
      formData.append('file', file);
      console.log(formData);
      
      // Call Python backend API
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
      });
      console.log(response.body)
  
      if (!response.ok) {
        throw new Error('API request failed');
      }
      
      const result = await response.json();
      console.log(result)

      // const result = await inferEngine.infer(workerId, file); // infer on image
      // console.log(result);
     
     // Get the disease details from API or fallback to sample data
      const diseaseInfo = sampleDiseases[result.disease] || {
        name: result.disease.replace(/_/g, ' '),
        probability: result.probability,
        description: result.description,
        symptoms: result.symptoms,
        treatment: result.treatment
      };

    
      
      setSelectedDisease(diseaseInfo);
      setShowResult(true);
      
      toast({
        title: "Analysis Complete",
        description: `Analysis shows ${diseaseInfo.name} with ${Math.round(diseaseInfo.probability * 100)}% confidence.`,
      });
      
      // Scroll to result
      setTimeout(() => {
        const resultElement = document.getElementById('result');
        if (resultElement) {
          resultElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (error) {
      console.error("API Error:", error);
      toast({
        title: "Analysis Failed",
        description: "Could not connect to the analysis server. Using demo mode instead.",
        variant: "destructive"
      });
      
      // Fallback to demo mode
      const diseaseKeys = Object.keys(sampleDiseases);
      const randomDisease = sampleDiseases[diseaseKeys[Math.floor(Math.random() * diseaseKeys.length)]];
      
      setSelectedDisease(randomDisease);
      setShowResult(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCapturedImage = async (imageData: string) => {
    // Set loading state
    setIsLoading(true);
    setShowResult(false);
    
    // Save the image URL for display
    setImageUrl(imageData);
    
    try {
      // Get the current backend URL
      const apiUrl = Default_Url_predict;
      
      // Convert base64 to blob
      const response = await fetch(imageData);
      const blob = await response.blob();
      const file = new File([blob], "captured-image.jpg", { type: "image/jpeg" });
      
      // Create form data for API
      const formData = new FormData();
      formData.append('file', file);
      
      // Call Python backend API
      const apiResponse = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
      });
      
      if (!apiResponse.ok) {
        throw new Error('API request failed');
      }
      
      const result = await apiResponse.json();
      
      // Get the disease details from API or fallback to sample data
      const diseaseInfo = sampleDiseases[result.disease] || {
        name: result.disease.replace(/_/g, ' '),
        probability: result.probability,
        description: result.description || "No description available.",
        symptoms: result.symptoms || ["No symptoms information available."],
        treatment: result.treatment || ["No treatment information available."]
      };
      
      setSelectedDisease(diseaseInfo);
      setShowResult(true);
      
      toast({
        title: "Analysis Complete",
        description: `Analysis shows ${diseaseInfo.name} with ${Math.round(diseaseInfo.probability * 100)}% confidence.`,
      });
      
      // Scroll to result
      setTimeout(() => {
        const resultElement = document.getElementById('result');
        if (resultElement) {
          resultElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (error) {
      console.error("API Error:", error);
      toast({
        title: "Analysis Failed",
        description: "Could not connect to the analysis server. Using demo mode instead.",
        variant: "destructive"
      });
      
      // Fallback to demo mode
      const diseaseKeys = Object.keys(sampleDiseases);
      const randomDisease = sampleDiseases[diseaseKeys[Math.floor(Math.random() * diseaseKeys.length)]];
      
      setSelectedDisease(randomDisease);
      setShowResult(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Tabs defaultValue="upload" className="max-w-3xl mx-auto">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="upload" className="flex items-center justify-center">
            <Upload className="mr-2 h-4 w-4" /> Upload Image
          </TabsTrigger>
          <TabsTrigger value="camera" className="flex items-center justify-center">
            <Camera className="mr-2 h-4 w-4" /> Use Camera
          </TabsTrigger>
        </TabsList>
        <TabsContent value="upload">
          <FileUpload onUpload={handleUpload} isLoading={isLoading} setIsLoading={setIsLoading} />
        </TabsContent>
        <TabsContent value="camera">
          <CameraCapture onCapture={handleCapturedImage} isLoading={isLoading} />
        </TabsContent>
      </Tabs>
      
      <DiseaseResult 
        isVisible={showResult} 
        disease={selectedDisease} 
        imageUrl={imageUrl} 
      />
    </div>
  );
};

export default TomatoClassifier;
