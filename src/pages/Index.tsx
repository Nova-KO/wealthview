
import React, { useState } from 'react';
import AuthForm from '@/components/AuthForm';
import Navigation from '@/components/Navigation';
import Dashboard from '@/components/Dashboard';
import PortfolioManager from '@/components/features/PortfolioManager';
import BudgetManager from '@/components/features/BudgetManager';
import SavingsBooster from '@/components/features/SavingsBooster';
import CreditManager from '@/components/features/CreditManager';
import CommitmentAdvisor from '@/components/features/CommitmentAdvisor';
import InsuranceAdvisor from '@/components/features/InsuranceAdvisor';
import GoalPlanning from '@/components/features/GoalPlanning';
import Settings from '@/components/features/Settings';
import FloatingVoiceBot from '@/components/FloatingVoiceBot';
import FeaturePlaceholder from '@/components/FeaturePlaceholder';
import {
  TrendingUp,
  Wallet,
  PiggyBank,
  CreditCard,
  Calendar,
  Shield,
  Target,
  Settings as SettingsIcon
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
        return <PortfolioManager />;
      
      case 'budget':
        return <BudgetManager />;
      
      case 'savings':
        return <SavingsBooster />;
      
      case 'credit':
        return <CreditManager />;
      
      case 'commitments':
        return <CommitmentAdvisor />;
      
      case 'insurance':
        return <InsuranceAdvisor />;
      
      case 'goals':
        return <GoalPlanning />;
      

      
      case 'settings':
        return <Settings />;
      
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
      
      <main className="lg:ml-20 p-4 lg:p-6 pt-20 lg:pt-6">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>

      {/* Floating Voice Bot */}
      <FloatingVoiceBot />
    </div>
  );
};

export default Index;
