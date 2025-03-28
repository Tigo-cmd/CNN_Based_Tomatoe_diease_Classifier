
import React from 'react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-muted py-12 mt-16">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">CNN-Based Tomato Leaf Disease Classification</h3>
            <p className="text-muted-foreground text-sm max-w-xs">
            Upload images of your plant leaves, and our advanced CNN model will analyze them instantly providing accurate disease identification 
            and actionable treatment recommendations for farmers and gardeners."
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Foddiesmartz Express</li>
              <li>+2348035280142</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-muted-foreground/20 text-center text-sm text-muted-foreground">
          <p>© {year} CNN-Based Tomato Leaf Disease Classification. All rights reserved.</p>
          <p className="mt-2">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            {' · '}
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
