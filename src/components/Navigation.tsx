
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { 
  CreditCard, 
  Building2, 
  TrendingUp, 
  Shield, 
  Banknote, 
  Users, 
  Settings, 
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Zap,
  Globe,
  BarChart3,
  DollarSign,
  Target,
  PiggyBank
} from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const products = [
    { 
      name: "Wealth Management", 
      href: "#", 
      icon: DollarSign, 
      description: "Smart Investment Portfolio",
      badge: "Popular"
    },
    { 
      name: "Islamic Banking", 
      href: "#", 
      icon: Building2, 
      description: "Shariah-Compliant Solutions",
      badge: "New"
    },
    { 
      name: "Real Estate Investment", 
      href: "#", 
      icon: TrendingUp, 
      description: "UAE Property Portfolio",
      badge: "Featured"
    },
    { 
      name: "Gold & Commodities", 
      href: "#", 
      icon: Banknote, 
      description: "Precious Metals Trading"
    },
    { 
      name: "Retirement Planning", 
      href: "#", 
      icon: Users, 
      description: "Secure Financial Future"
    },
    { 
      name: "Insurance Solutions", 
      href: "#", 
      icon: Shield, 
      description: "Comprehensive Protection"
    },
  ];

  const services = [
    { 
      name: "Multi-Currency Accounts", 
      href: "#", 
      description: "Manage AED, USD, EUR & More",
      icon: Globe
    },
    { 
      name: "UAE Market Access", 
      href: "#", 
      description: "Direct Access to Local Markets",
      icon: TrendingUp
    },
    { 
      name: "Risk Management", 
      href: "#", 
      description: "Advanced Portfolio Protection",
      icon: Shield
    },
    { 
      name: "Smart Rebalancing", 
      icon: Zap
    },
    { 
      name: "Real-Time Analytics", 
      href: "#", 
      description: "Live Investment Performance",
      icon: BarChart3
    },
    { 
      name: "24/7 UAE Support", 
      href: "#", 
      description: "Local Expert Financial Advisors",
      icon: Users
    },
  ];

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="navbar-finera" ref={dropdownRef}>
      <div className="navbar-container">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="flex items-center space-x-3 hover:opacity-80 transition-all duration-300 group">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <span className="text-white font-bold text-lg">W</span>
            </div>
            <span className="text-white font-semibold text-2xl tracking-tight">Wealthwise</span>
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-2">
          {/* Products Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('products')}
              className={`flex items-center space-x-2 text-gray-300 hover:text-white transition-all duration-300 py-3 px-4 rounded-lg hover:bg-white/10 ${
                activeDropdown === 'products' ? 'text-white bg-white/10' : ''
              }`}
            >
              <span className="font-medium">Products</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                activeDropdown === 'products' ? 'rotate-180' : ''
              }`} />
            </button>
            
            {activeDropdown === 'products' && (
              <div className="absolute top-full left-0 mt-2 w-[480px] bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 animate-fade-in">
                <div className="p-8">
                  <div className="grid grid-cols-2 gap-6">
                    {products.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 group"
                      >
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <item.icon className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <div className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">
                              {item.name}
                            </div>
                            {item.badge && (
                              <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">{item.description}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all duration-300" />
                      </a>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <a href="#" className="flex items-center justify-center space-x-2 text-purple-600 hover:text-purple-700 font-medium group">
                      <span>View all products</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Services Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('services')}
              className={`flex items-center space-x-2 text-gray-300 hover:text-white transition-all duration-300 py-3 px-4 rounded-lg hover:bg-white/10 ${
                activeDropdown === 'services' ? 'text-white bg-white/10' : ''
              }`}
            >
              <span className="font-medium">Services</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                activeDropdown === 'services' ? 'rotate-180' : ''
              }`} />
            </button>
            
            {activeDropdown === 'services' && (
              <div className="absolute top-full left-0 mt-2 w-[480px] bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 animate-fade-in">
                <div className="p-8">
                  <div className="grid grid-cols-2 gap-6">
                    {services.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 group"
                      >
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <item.icon className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                            {item.name}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">{item.description}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                      </a>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <a href="#" className="flex items-center justify-center space-x-2 text-blue-600 hover:text-blue-700 font-medium group">
                      <span>Explore all services</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Regular Links */}
          <a href="#" className="text-gray-300 hover:text-white transition-all duration-300 font-medium py-3 px-4 rounded-lg hover:bg-white/10">
            About Us
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition-all duration-300 font-medium py-3 px-4 rounded-lg hover:bg-white/10">
            Blog
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition-all duration-300 font-medium py-3 px-4 rounded-lg hover:bg-white/10">
            Contact
          </a>
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button 
            variant="ghost" 
            className="text-gray-300 hover:text-white hover:bg-white/10 border-none transition-all duration-300"
          >
            Sign In
          </Button>
          <Button className="button-finera-primary hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
            Start Investing
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white p-3 rounded-lg hover:bg-white/10 transition-all duration-300"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-700 animate-fade-in">
          <div className="px-6 py-8 space-y-6">
            <div className="space-y-4">
              <div className="font-semibold text-white text-lg border-b border-gray-700 pb-2">Products</div>
              <div className="grid grid-cols-1 gap-3">
                {products.slice(0, 4).map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-3 text-gray-300 hover:text-white transition-all duration-300 py-3 px-4 rounded-lg hover:bg-gray-800"
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                    {item.badge && (
                      <span className="ml-auto px-2 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </a>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="font-semibold text-white text-lg border-b border-gray-700 pb-2">Services</div>
              <div className="grid grid-cols-1 gap-3">
                {services.slice(0, 3).map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-3 text-gray-300 hover:text-white transition-all duration-300 py-3 px-4 rounded-lg hover:bg-gray-800"
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-700">
              <a href="#" className="block text-gray-300 hover:text-white transition-all duration-300 py-3 px-4 rounded-lg hover:bg-gray-800 font-medium">
                About Us
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-all duration-300 py-3 px-4 rounded-lg hover:bg-gray-800 font-medium">
                Blog
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-all duration-300 py-3 px-4 rounded-lg hover:bg-gray-800 font-medium">
                Contact
              </a>
            </div>

            <div className="space-y-3 pt-6">
              <Button variant="ghost" className="w-full text-gray-300 hover:text-white justify-start py-3 hover:bg-gray-800">
                Sign In
              </Button>
              <Button className="w-full button-finera-primary">
                Start Investing
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
