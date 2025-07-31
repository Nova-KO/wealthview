
import { useRef, useState, useEffect } from 'react';
import Dashboard from '@/components/Dashboard';
import PortfolioManager from '@/components/features/PortfolioManager';
import BudgetManager from '@/components/features/BudgetManager';
import SavingsBooster from '@/components/features/SavingsBooster';
import CreditManager from '@/components/features/CreditManager';
import GoalPlanning from '@/components/features/GoalPlanning';
import FloatingVoiceBot from '@/components/FloatingVoiceBot';
import Settings from '@/components/features/Settings';
import CommitmentAdvisor from '@/components/features/CommitmentAdvisor';
import InsuranceAdvisor from '@/components/features/InsuranceAdvisor';
import { Button } from '@/components/ui/button';
import { 
  LogOut, 
  LayoutDashboard, 
  TrendingUp, 
  Wallet, 
  PiggyBank, 
  CreditCard, 
  Target, 
  Shield, 
  Calendar, 
  Settings as LucideSettings,
  Menu,
  X
} from 'lucide-react';

interface IndexProps {
  onLogout: () => void;
}

const Index = ({ onLogout }: IndexProps) => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isRefreshingPortfolio, setIsRefreshingPortfolio] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const portfolioManagerRef = useRef<any>(null);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false); // Close mobile menu when section changes
  };

  const handleRefreshPortfolio = async () => {
    setIsRefreshingPortfolio(true);
    // If PortfolioManager exposes a refresh method, call it
    if (portfolioManagerRef.current && typeof portfolioManagerRef.current.refresh === 'function') {
      await portfolioManagerRef.current.refresh();
    } else {
      // Simulate refresh delay
      await new Promise(res => setTimeout(res, 1200));
    }
    setIsRefreshingPortfolio(false);
  };

  const navigationItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'portfolio', icon: TrendingUp, label: 'Portfolio' },
    { id: 'budget', icon: Wallet, label: 'Budget' },
    { id: 'savings', icon: PiggyBank, label: 'Savings' },
    { id: 'credit', icon: CreditCard, label: 'Credit' },
    { id: 'goals', icon: Target, label: 'Goals' },
    { id: 'insurance', icon: Shield, label: 'Insurance' },
    { id: 'commitments', icon: Calendar, label: 'Commitments' },
    { id: 'settings', icon: LucideSettings, label: 'Settings' },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard onQuickAction={handleSectionChange} onRefreshPortfolio={handleRefreshPortfolio} isRefreshingPortfolio={isRefreshingPortfolio} />;
      case 'portfolio':
        return <PortfolioManager ref={portfolioManagerRef} />;
      case 'budget':
        return <BudgetManager />;
      case 'savings':
        return <SavingsBooster />;
      case 'credit':
        return <CreditManager />;
      case 'goals':
        return <GoalPlanning />;
      case 'commitments':
        return <CommitmentAdvisor />;
      case 'insurance':
        return <InsuranceAdvisor />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMobileMenuOpen]);

  return (
    <div className="min-h-screen background-color-primary">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">W</span>
              </div>
              <span className="font-semibold text-gray-900">Wealthwise</span>
            </div>
          </div>
          <Button
            onClick={() => {
              if (window.confirm('Are you sure you want to logout?')) {
                onLogout();
              }
            }}
            variant="outline"
            size="sm"
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex items-center justify-around px-2 py-2">
          {navigationItems.slice(0, 5).map((item) => (
            <button
              key={item.id}
              onClick={() => handleSectionChange(item.id)}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 min-w-0 flex-1 ${
                activeSection === item.id
                  ? 'text-emerald-600 bg-emerald-50'
                  : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium truncate">{item.label}</span>
            </button>
          ))}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 min-w-0 flex-1 ${
              isMobileMenuOpen
                ? 'text-emerald-600 bg-emerald-50'
                : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'
            }`}
          >
            <Menu className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium truncate">More</span>
          </button>
        </div>
      </div>

      {/* Mobile Extended Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed bottom-20 left-0 right-0 z-30 bg-white border-t border-gray-200 shadow-lg">
          <div className="p-4">
            <div className="grid grid-cols-3 gap-3">
              {navigationItems.slice(5).map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSectionChange(item.id)}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-200 ${
                    activeSection === item.id
                      ? 'text-emerald-600 bg-emerald-50'
                      : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-5 h-5 mb-1" />
                  <span className="text-xs font-medium text-center">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex">
        {/* Desktop Sidebar Navigation */}
        <div className="hidden lg:block">
          <div className="fixed left-0 top-0 h-full w-20 bg-white border-r border-gray-200 z-40">
            <div className="flex flex-col items-center py-6 h-full">
              {/* Logo */}
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mb-8">
                <span className="text-white font-bold text-sm">W</span>
              </div>

              {/* Navigation Items */}
              <div className="space-y-3 flex-1 overflow-y-auto">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSectionChange(item.id)}
                    className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-200 ${
                      activeSection === item.id
                        ? 'bg-emerald-100 text-emerald-600 shadow-sm'
                        : 'text-gray-400 hover:text-emerald-600 hover:bg-emerald-50'
                    }`}
                    title={item.label}
                  >
                    <item.icon className="w-5 h-5" />
                  </button>
                ))}
              </div>

              {/* Logout button at bottom */}
              <div className="mt-auto pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to logout?')) {
                      onLogout();
                    }
                  }}
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200 hover:scale-105"
                  title="Logout from Wealthwise"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-20">
          <div className="p-4 lg:p-8 pt-20 lg:pt-8 pb-24 lg:pb-8">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Floating Voice Bot */}
      <FloatingVoiceBot />
    </div>
  );
};

export default Index;
