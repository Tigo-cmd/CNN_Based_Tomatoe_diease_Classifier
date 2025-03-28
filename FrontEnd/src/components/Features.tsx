
import React from 'react';
import AnimatedSection from './AnimatedSection';
import { Layers, Sparkles, Clock, Shield } from 'lucide-react';

const features = [
  {
    title: 'Beautiful Simplicity',
    description: 'Elegant designs that communicate clearly without unnecessary elements or distractions.',
    icon: Sparkles,
    delay: 100
  },
  {
    title: 'Thoughtful Details',
    description: 'Every element is crafted with precision, focusing on the fine details that elevate the experience.',
    icon: Layers,
    delay: 200
  },
  {
    title: 'Timeless Design',
    description: 'Create products that remain relevant and functional regardless of passing trends.',
    icon: Clock,
    delay: 300
  },
  {
    title: 'Intuitive Security',
    description: 'Protection that works seamlessly in the background without compromising the user experience.',
    icon: Shield,
    delay: 400
  }
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 px-6 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block bg-secondary text-primary px-4 py-1.5 mb-4 rounded-full text-sm font-medium">Features</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-5">Designed with purpose</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Every feature is thoughtfully created to enhance functionality while maintaining an elegant simplicity.
          </p>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <AnimatedSection key={index} delay={feature.delay} className="glass-card p-8 flex flex-col items-start">
              <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-lg mb-5">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground text-pretty">{feature.description}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute -top-64 -right-64 w-[500px] h-[500px] bg-secondary rounded-full opacity-50 blur-3xl"></div>
    </section>
  );
};

export default Features;
