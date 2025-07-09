
import React, { useState } from 'react';
import AuthForm from '@/components/AuthForm';
import Navigation from '@/components/Navigation';
import Dashboard from '@/components/Dashboard';
import FeaturePlaceholder from '@/components/FeaturePlaceholder';
import {
  TrendingUp,
  Wallet,
  PiggyBank,
  CreditCard,
  Calendar,
  Shield,
  Target,
  Mic,
  Settings
} from 'lucide-react';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');

  const handleLogin = (email: string, password: string) => {
    // In a real app, you would validate credentials here
    console.log('Login attempt:', { email, password });
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveSection('dashboard');
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      
      case 'portfolio':
        return (
          <FeaturePlaceholder
            title="Portfolio Manager"
            description="Analyze and optimize your investment portfolio with AI-powered insights"
            icon={TrendingUp}
            features={[
              "Real-time portfolio performance tracking",
              "Asset allocation analysis and recommendations",
              "Risk assessment and management tools",
              "Rebalancing suggestions based on market conditions",
              "Historical performance comparisons",
              "Tax-loss harvesting opportunities"
            ]}
            comingSoon
          />
        );
      
      case 'budget':
        return (
          <FeaturePlaceholder
            title="Budget Manager"
            description="Take control of your spending with intelligent budget tracking and optimization"
            icon={Wallet}
            features={[
              "Automatic transaction categorization",
              "Monthly budget planning and tracking",
              "Expense pattern analysis",
              "Budget leak identification",
              "Income and expense forecasting",
              "Custom spending categories"
            ]}
            comingSoon
          />
        );
      
      case 'savings':
        return (
          <FeaturePlaceholder
            title="Personal Savings Booster"
            description="Maximize your savings potential with AI-driven cost optimization"
            icon={PiggyBank}
            features={[
              "Duplicate subscription detection",
              "Cost-saving opportunity alerts",
              "Automated savings recommendations",
              "Expense reduction strategies",
              "Alternative service suggestions",
              "Monthly savings progress tracking"
            ]}
            comingSoon
          />
        );
      
      case 'credit':
        return (
          <FeaturePlaceholder
            title="AI Credit Slashing System"
            description="Optimize your credit health with intelligent payment strategies"
            icon={CreditCard}
            features={[
              "Credit score monitoring and improvement tips",
              "Payment strategy optimization",
              "Credit utilization analysis",
              "Fee avoidance recommendations",
              "Credit card comparison and suggestions",
              "Debt payoff planning"
            ]}
            comingSoon
          />
        );
      
      case 'commitments':
        return (
          <FeaturePlaceholder
            title="Commitment Recommendation System"
            description="Make informed decisions about major financial commitments"
            icon={Calendar}
            features={[
              "Financial readiness assessment",
              "Optimal timing recommendations",
              "Affordability analysis",
              "Risk evaluation for major purchases",
              "Emergency fund impact assessment",
              "Long-term financial planning"
            ]}
            comingSoon
          />
        );
      
      case 'insurance':
        return (
          <FeaturePlaceholder
            title="Health Insurance Advisor"
            description="Find the perfect insurance coverage for your needs and budget"
            icon={Shield}
            features={[
              "Personalized insurance recommendations",
              "Coverage gap analysis",
              "Premium comparison across providers",
              "Health and term insurance planning",
              "Emergency fund backup strategies",
              "Policy renewal optimization"
            ]}
            comingSoon
          />
        );
      
      case 'goals':
        return (
          <FeaturePlaceholder
            title="AI Jar (Goal Planning)"
            description="Achieve your financial dreams with intelligent goal planning and tracking"
            icon={Target}
            features={[
              "Smart goal setting and tracking",
              "Step-by-step achievement plans",
              "Progress monitoring and adjustments",
              "Milestone celebration system",
              "Goal priority optimization",
              "Timeline and budget planning"
            ]}
            comingSoon
          />
        );
      
      case 'voice':
        return (
          <FeaturePlaceholder
            title="Voice Bot Assistant"
            description="Access your financial information hands-free with voice commands"
            icon={Mic}
            features={[
              "Voice-activated financial queries",
              "Personalized voice recognition",
              "Hands-free account summaries",
              "Spoken alerts and notifications",
              "Voice-controlled transaction searches",
              "Natural language financial insights"
            ]}
            comingSoon
          />
        );
      
      case 'settings':
        return (
          <FeaturePlaceholder
            title="Settings & Preferences"
            description="Customize your AI Money Companion experience"
            icon={Settings}
            features={[
              "Account and profile management",
              "Privacy and security settings",
              "Notification preferences",
              "Data export and backup options",
              "Integration with financial institutions",
              "Personalization and themes"
            ]}
            comingSoon
          />
        );
      
      default:
        return <Dashboard />;
    }
  };

  if (!isAuthenticated) {
    return <AuthForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-cyan-100">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-400/10 to-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/5 to-pink-500/5 rounded-full blur-3xl"></div>
      </div>

      <Navigation 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onLogout={handleLogout}
      />
      
      <main className="ml-20 p-6">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Index;
