
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import AnimatedSection from './AnimatedSection';

export interface Disease {
  name: string;
  probability: number;
  description: string;
  symptoms: string[];
  treatment: string[];
}

interface DiseaseResultProps {
  isVisible: boolean;
  disease: Disease | null;
  imageUrl: string | null;
}

const DiseaseResult: React.FC<DiseaseResultProps> = ({ isVisible, disease, imageUrl }) => {
  if (!isVisible || !disease) return null;

  return (
    <AnimatedSection 
      id="result"
      className="py-16 px-4 md:px-8 max-w-4xl mx-auto"
      animation="fade-in-up"
      delay={100}
    >
      <h2 className="text-3xl font-bold text-center mb-8">Analysis Results</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5">
          {imageUrl && (
            <Card>
              <CardHeader>
                <CardTitle>Analyzed Image</CardTitle>
                <CardDescription>The leaf image you uploaded</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-square rounded-md overflow-hidden">
                  <img src={imageUrl} alt="Analyzed leaf" className="w-full h-full object-cover" />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div className="lg:col-span-7">
          <Card>
            <CardHeader>
              <CardTitle>{disease.name}</CardTitle>
              <CardDescription>Detection confidence: {Math.round(disease.probability * 1.00)}%</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Progress value={disease.probability * 100} className="h-2" />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">About this Disease</h3>
                <p className="text-muted-foreground">{disease.description}</p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Common Symptoms</h3>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  {disease.symptoms.map((symptom, index) => (
                    <li key={index}>{symptom}</li>
                  ))}
                </ul>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Recommended Treatment</h3>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  {disease.treatment.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default DiseaseResult;
