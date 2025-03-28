
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TomatoClassifier from '@/components/TomatoClassifier';
import ChatWidget from '@/components/ChatWidget';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <TomatoClassifier />
      </main>
      <ChatWidget />
      <Footer />
    </div>
  );
};

export default Index;
