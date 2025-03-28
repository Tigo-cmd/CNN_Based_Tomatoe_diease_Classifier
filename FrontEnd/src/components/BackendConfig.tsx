
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, InfoIcon } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

// Config key for localStorage
const BACKEND_URL_KEY = 'tomato_classifier_backend_url';
const DEFAULT_URL = 'http://127.0.0.1:5001/predict';

export const getBackendUrl = (): string => {
  if (typeof window === 'undefined') return DEFAULT_URL;
  return localStorage.getItem(BACKEND_URL_KEY) || DEFAULT_URL;
};

const BackendConfig: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [backendUrl, setBackendUrl] = useState(getBackendUrl);
  const { toast } = useToast();

  const handleSave = () => {
    localStorage.setItem(BACKEND_URL_KEY, backendUrl);
    setIsOpen(false);
    toast({
      title: "Settings Saved",
      description: "Backend URL has been updated.",
    });
  };

  // Add a test connection feature
  const testConnection = async () => {
    try {
      const response = await fetch(`${backendUrl.replace('/api/analyze', '')}/healthcheck`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      });
      
      if (response.ok) {
        toast({
          title: "Connection Successful",
          description: "Successfully connected to the Python backend server.",
        });
      } else {
        throw new Error('Failed to connect to server');
      }
    } catch (error) {
      console.error('Connection test failed:', error);
      toast({
        title: "Connection Failed",
        description: "Could not connect to the Python backend. Please check the URL and make sure the server is running.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="fixed bottom-8 left-8 z-50">
      <Button 
        variant="outline" 
        size="icon"
        className="rounded-full h-10 w-10 bg-background shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Settings className="h-5 w-5" />
      </Button>

      {isOpen && (
        <Card className="absolute bottom-14 left-0 w-80">
          <CardHeader>
            <CardTitle>Backend Settings</CardTitle>
            <CardDescription>Configure your Python backend URL</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">API Endpoint URL</label>
                <Input
                  value={backendUrl}
                  onChange={(e) => setBackendUrl(e.target.value)}
                  placeholder="http://localhost:5000/api/analyze"
                />
                <p className="text-xs text-muted-foreground flex items-start gap-1 mt-1">
                  <InfoIcon className="h-3 w-3 mt-0.5" />
                  <span>For a local Python server, make sure CORS is enabled.</span>
                </p>
              </div>
              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={testConnection}
                >
                  Test
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  size="sm"
                  onClick={handleSave}
                >
                  Save
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BackendConfig;
