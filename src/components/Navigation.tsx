
import React from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Wallet, 
  PiggyBank, 
  CreditCard, 
  Calendar,
  Shield,
  Target,
  Mic,
  Settings,
  LogOut
} from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onLogout: () => void;
}

const navigationItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'portfolio', icon: TrendingUp, label: 'Portfolio' },
  { id: 'budget', icon: Wallet, label: 'Budget' },
  { id: 'savings', icon: PiggyBank, label: 'Savings Booster' },
  { id: 'credit', icon: CreditCard, label: 'Credit Manager' },
  { id: 'commitments', icon: Calendar, label: 'Commitments' },
  { id: 'insurance', icon: Shield, label: 'Insurance' },
  { id: 'goals', icon: Target, label: 'AI Jar' },
  { id: 'voice', icon: Mic, label: 'Voice Bot' },
];

const Navigation: React.FC<NavigationProps> = ({ 
  activeSection, 
  onSectionChange, 
  onLogout 
}) => {
  return (
    <div className="fixed left-0 top-0 h-full w-20 glass border-r border-glass-border z-50 flex flex-col">
      {/* Logo */}
      <div className="flex items-center justify-center h-20 border-b border-glass-border">
        <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-lg">$</span>
        </div>
      </div>

      {/* Navigation items */}
      <nav className="flex-1 py-6">
        <div className="space-y-3 px-3">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`nav-icon group relative ${
                activeSection === item.id ? 'active' : ''
              }`}
              title={item.label}
            >
              <item.icon className="w-5 h-5" />
              
              {/* Tooltip */}
              <div className="absolute left-full ml-3 px-3 py-2 bg-black text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50">
                {item.label}
                <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-black"></div>
              </div>
            </button>
          ))}
        </div>
      </nav>

      {/* Bottom actions */}
      <div className="p-3 border-t border-glass-border space-y-3">
        <button
          onClick={() => onSectionChange('settings')}
          className={`nav-icon ${activeSection === 'settings' ? 'active' : ''}`}
          title="Settings"
        >
          <Settings className="w-5 h-5" />
        </button>
        
        <button
          onClick={onLogout}
          className="nav-icon hover:bg-red-500/20 hover:text-red-500"
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Navigation;
