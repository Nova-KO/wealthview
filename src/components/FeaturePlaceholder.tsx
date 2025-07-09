
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface FeaturePlaceholderProps {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  comingSoon?: boolean;
}

const FeaturePlaceholder: React.FC<FeaturePlaceholderProps> = ({
  title,
  description,
  icon: Icon,
  features,
  comingSoon = false
}) => {
  return (
    <div className="space-y-6">
      <div className="fade-in">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mr-4">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              {title}
            </h1>
            {comingSoon && (
              <span className="inline-block px-3 py-1 text-xs font-semibold bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full mt-2">
                Coming Soon
              </span>
            )}
          </div>
        </div>
        <p className="text-muted-foreground">
          {description}
        </p>
      </div>

      <Card className="widget slide-up">
        <CardHeader>
          <CardTitle>Features Overview</CardTitle>
          <CardDescription>
            What you can expect from this feature
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start p-4 rounded-lg bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200/50">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 mr-3 mt-2"></div>
                <p className="text-sm font-medium text-gray-700">{feature}</p>
              </div>
            ))}
          </div>
          
          {comingSoon ? (
            <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200">
              <p className="text-center text-amber-800 font-medium">
                🚀 This feature is under development and will be available soon!
              </p>
            </div>
          ) : (
            <Button className="w-full mt-6 gradient-primary text-white hover:scale-105 transition-all duration-300">
              Get Started
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FeaturePlaceholder;
