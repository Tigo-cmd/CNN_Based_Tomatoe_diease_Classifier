
import React, { useState } from 'react';
import AnimatedSection from './AnimatedSection';
import { Send } from 'lucide-react';
import { toast } from 'sonner';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send the form data to your backend here
    console.log('Form submitted:', formData);
    toast.success('Message sent successfully!', {
      description: 'We will get back to you as soon as possible.',
    });
    setFormData({ name: '', email: '', message: '' });
  };
  
  return (
    <section id="contact" className="py-24 px-6 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block bg-secondary text-primary px-4 py-1.5 mb-4 rounded-full text-sm font-medium">Contact</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-5">Get in touch</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Have a question or want to work together? Send us a message and we'll get back to you soon.
          </p>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <AnimatedSection animation="fade-in-right" className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">Contact Information</h3>
              <p className="text-muted-foreground">Fill out the form or contact us directly using the information below.</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <span className="font-medium">Email</span>
                <a href="mailto:hello@minimal.com" className="text-primary hover:underline">hello@minimal.com</a>
              </div>
              
              <div className="flex flex-col gap-1">
                <span className="font-medium">Phone</span>
                <a href="tel:+1234567890" className="text-foreground hover:text-primary transition-colors">+1 (234) 567-890</a>
              </div>
              
              <div className="flex flex-col gap-1">
                <span className="font-medium">Address</span>
                <address className="text-muted-foreground not-italic">
                  123 Design Street, Minimal City<br />
                  CA 10001, United States
                </address>
              </div>
            </div>
          </AnimatedSection>
          
          <AnimatedSection animation="fade-in-left" delay={200}>
            <form onSubmit={handleSubmit} className="glass-card p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="Your name"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="Your email"
                  />
                </div>
              </div>
              
              <div className="space-y-2 mb-6">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                  placeholder="Your message..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all duration-300 text-sm font-medium"
              >
                <span>Send Message</span>
                <Send className="h-4 w-4" />
              </button>
            </form>
          </AnimatedSection>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute -top-32 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-accent/30 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Contact;
