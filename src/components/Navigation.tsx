
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
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Globe */}
            <circle cx="16" cy="16" r="10" fill="none" stroke="#FFFFFF" strokeWidth="1.5"/>
            
            {/* Continents */}
            <path d="M10 12 Q12 11 14 12 Q13 14 11 13 Z" fill="#FFFFFF" opacity="0.9"/>
            <path d="M18 10 Q21 9 23 12 Q21 13 19 12 Q17 11 18 10 Z" fill="#FFFFFF" opacity="0.8"/>
            <path d="M13 18 Q16 17 17 20 Q15 21 13 20 Q12 19 13 18 Z" fill="#FFFFFF" opacity="0.9"/>
            
            {/* Grid Lines */}
            <path d="M6 16 Q16 14 26 16" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.4" fill="none"/>
            <ellipse cx="16" cy="16" rx="10" ry="5" fill="none" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.3"/>
            
            {/* Growth Arrow */}
            <path d="M22 10 L25 7 L24 6 L27 6 L27 9 L26 8 L23 11 Z" fill="#10B981"/>
          </svg>
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
