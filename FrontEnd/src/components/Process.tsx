
import React from 'react';
import AnimatedSection from './AnimatedSection';
import { Search, Lightbulb, PenTool, Zap } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Discover',
    description: 'We start by understanding the core problem and defining clear objectives.',
    icon: Search,
    delay: 100
  },
  {
    number: '02',
    title: 'Ideate',
    description: 'Exploring multiple solutions and concepts before refining the direction.',
    icon: Lightbulb,
    delay: 200
  },
  {
    number: '03',
    title: 'Design',
    description: 'Crafting the solution with meticulous attention to every detail.',
    icon: PenTool,
    delay: 300
  },
  {
    number: '04',
    title: 'Deliver',
    description: 'Implementing the solution and ensuring it exceeds expectations.',
    icon: Zap,
    delay: 400
  },
];

const Process: React.FC = () => {
  return (
    <section id="process" className="py-24 px-6 bg-accent/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block bg-secondary text-primary px-4 py-1.5 mb-4 rounded-full text-sm font-medium">Process</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-5">How we work</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Our approach combines thoughtful methodology with creative innovation to deliver exceptional results.
          </p>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <AnimatedSection key={index} delay={step.delay} className="relative">
              <div className="bg-background rounded-2xl p-8 h-full border border-border/20 shadow-sm hover:shadow-md transition-shadow">
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  {step.number}
                </div>
                <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-lg mb-5">
                  <step.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-pretty">{step.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Process;
