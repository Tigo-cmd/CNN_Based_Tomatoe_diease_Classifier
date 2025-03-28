
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Camera, Upload } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const Hero: React.FC = () => {
  return (
    <AnimatedSection 
      id="hero"
      className="flex flex-col items-center justify-center min-h-screen text-center px-4 md:px-8 pt-20 pb-16"
      animation="fade-in-up"
    >
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
        Tomato Leaf Disease Classifier
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
      Detect 10 different tomato leaf diseases in seconds—upload an image, and the CNN-based deep learning model will analyze, 
      diagnose, and suggest treatments.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          size="lg"
          className="font-medium"
          onClick={() => {
            const uploadSection = document.getElementById('upload');
            if (uploadSection) {
              uploadSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          Get Started <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </AnimatedSection>
  );
};

export default Hero;
