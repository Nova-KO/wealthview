
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  CreditCard, 
  BarChart3,
  DollarSign,
  Users,
  Shield,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  AlertTriangle,
  Activity,
  Globe,
  PieChart,
  Clock,
  Target,
  PiggyBank,
  RotateCcw
} from 'lucide-react';

interface DashboardProps {
  onQuickAction?: (section: string) => void;
  onRefreshPortfolio?: () => Promise<void> | void;
  isRefreshingPortfolio?: boolean;
}

const Dashboard = ({ onQuickAction, onRefreshPortfolio, isRefreshingPortfolio }: DashboardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [pulseAnimation, setPulseAnimation] = useState(false);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Wealth & Investment Data
  const investmentStats = {
    totalPortfolio: 2847500,
    monthlyContributions: 12470,
    annualReturn: 12.7,
    riskScore: 3.2
  };

  const wealthData = {
    thisMonth: 425600,
    lastMonth: 398200,
    growth: 6.9,
    projectedYear: 5100000
  };

  const portfolioMetrics = [
    { name: 'Portfolio Value', value: 'AED 2,847,500', change: '+12.3%', trend: 'up', icon: TrendingUp, color: 'text-green-600' },
    { name: 'Monthly Contributions', value: 'AED 12,470', change: '+5.7%', trend: 'up', icon: DollarSign, color: 'text-blue-600' },
    { name: 'Annual Returns', value: '12.7%', change: '+2.1%', trend: 'up', icon: BarChart3, color: 'text-purple-600' },
    { name: 'Risk Score', value: '3.2/10', change: '-0.3', trend: 'down', icon: Shield, color: 'text-emerald-600' }
  ];

  const recentTransactions = [
    { id: 1, type: 'Investment Purchase', amount: 'AED 25,000', status: 'Successful', time: '2 min ago', merchant: 'Emirates NBD Securities' },
    { id: 2, type: 'Real Estate Fund', amount: 'AED 50,000', status: 'Processing', time: '8 min ago', merchant: 'Dubai Properties Fund' },
    { id: 3, type: 'Gold Investment', amount: 'AED 15,000', status: 'Successful', time: '1 hour ago', merchant: 'Dubai Gold & Commodities' },
    { id: 4, type: 'Islamic Fund', amount: 'AED 12,000', status: 'Successful', time: '3 hours ago', merchant: 'ADCB Islamic Banking' }
  ];

  const financialGoals = [
    { name: 'Emergency Fund', current: 150000, target: 200000, color: 'bg-gradient-to-r from-green-500 to-emerald-600' },
    { name: 'Dubai Marina Apartment', current: 500000, target: 1200000, color: 'bg-gradient-to-r from-blue-500 to-cyan-600' },
    { name: 'Retirement Portfolio', current: 850000, target: 2000000, color: 'bg-gradient-to-r from-purple-500 to-indigo-600' }
  ];

  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: 'Good morning', icon: '🌅' };
    if (hour < 17) return { text: 'Good afternoon', icon: '☀️' };
    return { text: 'Good evening', icon: '🌙' };
  };

  const greeting = getCurrentGreeting();

  const handleCardHover = (cardId: string) => {
    setHoveredCard(cardId);
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
  };

  const triggerPulse = () => {
    setPulseAnimation(true);
    setTimeout(() => setPulseAnimation(false), 600);
  };

  if (isLoading) {
    return (
      <div className="space-y-8 p-1">
        <div className="animate-pulse">
          <div className="h-32 bg-gray-200 rounded-lg mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-64 bg-gray-200 rounded-lg"></div>
            <div className="h-64 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-1 relative">
      {/* Floating Refresh Button */}
      <div className="fixed top-6 right-8 z-30">
        <Button
          variant="outline"
          className={`flex items-center gap-2 button-finera shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105 ${
            isRefreshingPortfolio ? 'animate-pulse' : ''
          }`}
          onClick={() => {
            onRefreshPortfolio?.();
            triggerPulse();
          }}
          disabled={isRefreshingPortfolio}
          title="Refresh Portfolio Data"
        >
          <RotateCcw className={`w-5 h-5 transition-transform duration-300 ${
            isRefreshingPortfolio ? 'animate-spin' : 'hover:rotate-180'
          }`} />
          {isRefreshingPortfolio ? 'Refreshing...' : 'Refresh'}
        </Button>
      </div>

      {/* Welcome Section */}
      <div 
        className="feature-card p-8 relative overflow-hidden transition-all duration-500 hover:shadow-xl hover:scale-[1.02] cursor-pointer"
        onMouseEnter={() => handleCardHover('welcome')}
        onMouseLeave={handleCardLeave}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 opacity-60 transition-opacity duration-300"></div>
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center shadow-lg transition-all duration-300 ${
                  hoveredCard === 'welcome' ? 'scale-110 rotate-12' : ''
                }`}>
                  <span className="text-2xl font-bold text-white">A</span>
                </div>
                <div>
                  <h1 className="heading-style-h2 text-color-primary">
                    {greeting.text}, Anjali! {greeting.icon}
                  </h1>
                  <p className="text-gray-600 text-lg">
                    {new Date().toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-green-700">Portfolio growing strong</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium text-blue-700">All payments secured</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium text-purple-700">3 goals on track</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-3xl font-bold text-color-primary">
                AED {wealthData.thisMonth.toLocaleString()}
              </div>
              <div className="text-gray-600">Monthly Wealth Growth</div>
              <div className="flex items-center justify-end mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-600 font-medium">+{wealthData.growth}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {portfolioMetrics.map((metric, index) => (
          <Card 
            key={metric.name}
            className={`feature-card border-none transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer ${
              hoveredCard === metric.name ? 'ring-2 ring-blue-200' : ''
            }`}
            onMouseEnter={() => handleCardHover(metric.name)}
            onMouseLeave={handleCardLeave}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">{metric.name}</CardTitle>
                <div className={`w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center transition-all duration-300 ${
                  hoveredCard === metric.name ? 'scale-110 rotate-12' : ''
                }`}>
                  <metric.icon className={`w-4 h-4 ${metric.color}`} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                <div className="flex items-center space-x-2">
                  {metric.trend === 'up' ? (
                    <ArrowUpRight className="w-4 h-4 text-green-600" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-600" />
                  )}
                  <span className={`text-sm font-medium ${
                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Transactions */}
        <Card className="feature-card border-none transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-blue-600" />
              <span>Recent Transactions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentTransactions.map((transaction, index) => (
              <div 
                key={transaction.id}
                className={`flex items-center justify-between p-4 rounded-lg border border-gray-100 transition-all duration-300 hover:bg-gray-50 hover:shadow-sm cursor-pointer ${
                  hoveredCard === `transaction-${transaction.id}` ? 'ring-2 ring-blue-200' : ''
                }`}
                onMouseEnter={() => handleCardHover(`transaction-${transaction.id}`)}
                onMouseLeave={handleCardLeave}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center transition-all duration-300 ${
                    hoveredCard === `transaction-${transaction.id}` ? 'scale-110' : ''
                  }`}>
                    <CreditCard className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-color-primary">{transaction.type}</div>
                    <div className="text-sm text-gray-600">{transaction.merchant}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-color-primary">{transaction.amount}</div>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      transaction.status === 'Successful' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {transaction.status}
                    </span>
                    <span className="text-xs text-gray-500">{transaction.time}</span>
                  </div>
                </div>
              </div>
            ))}
            <Button 
              variant="outline" 
              className="w-full button-finera hover:bg-emerald-50 transition-all duration-200"
              onClick={() => onQuickAction ? onQuickAction('portfolio') : window.alert('Transaction History feature coming soon! 📋')}
            >
              View All Transactions
            </Button>
          </CardContent>
        </Card>

        {/* Financial Goals */}
        <Card className="feature-card border-none transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-purple-600" />
              <span>Financial Goals</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {financialGoals.map((goal, index) => {
              const progress = (goal.current / goal.target) * 100;
              return (
                <div 
                  key={goal.name}
                  className={`space-y-3 transition-all duration-300 hover:bg-gray-50 p-3 rounded-lg cursor-pointer ${
                    hoveredCard === `goal-${goal.name}` ? 'ring-2 ring-purple-200' : ''
                  }`}
                  onMouseEnter={() => handleCardHover(`goal-${goal.name}`)}
                  onMouseLeave={handleCardLeave}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">{goal.name}</h3>
                    <span className="text-sm text-gray-600">{progress.toFixed(1)}%</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">AED {goal.current.toLocaleString()}</span>
                      <span className="text-gray-600">AED {goal.target.toLocaleString()}</span>
                    </div>
                    <div className="relative">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-1000 ease-out ${goal.color}`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <Button 
              variant="outline" 
              className="w-full button-finera hover:bg-emerald-50 transition-all duration-200"
              onClick={() => onQuickAction ? onQuickAction('goals') : window.alert('Goal Management feature coming soon! 🎯')}
            >
              Manage Goals
            </Button>
          </CardContent>
        </Card>
      </div>

              {/* Investment Analytics & AI Insights */}
        <div className="grid-2-col gap-8">
          {/* Investment Performance */}
          <Card className="feature-card border-none">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <span>Investment Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-lg bg-blue-50">
                  <div className="text-2xl font-bold text-blue-600">{investmentStats.annualReturn}%</div>
                  <div className="text-sm text-blue-700">Annual Return</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-green-50">
                  <div className="text-2xl font-bold text-green-600">{investmentStats.riskScore}/10</div>
                  <div className="text-sm text-green-700">Risk Score</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-purple-50">
                  <div className="text-2xl font-bold text-purple-600">{investmentStats.monthlyContributions.toLocaleString()}</div>
                  <div className="text-sm text-purple-700">Monthly Contributions</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-orange-50">
                  <div className="text-2xl font-bold text-orange-600">
                    AED {(investmentStats.totalPortfolio / 1000000).toFixed(1)}M
                  </div>
                  <div className="text-sm text-orange-700">Total Portfolio</div>
                </div>
              </div>
            </CardContent>
          </Card>

        {/* AI Recommendations */}
        <Card className="feature-card border-none transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-yellow-600" />
              <span>AI Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-green-50 border border-green-200 transition-all duration-300 hover:bg-green-100 cursor-pointer">
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0 transition-transform duration-300 hover:scale-110" />
                <div>
                  <h4 className="font-semibold text-green-800">Portfolio Optimization</h4>
                  <p className="text-sm text-green-700 mt-1">
                    Consider increasing exposure to UAE real estate for 15-20% returns
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 transition-all duration-300 hover:bg-blue-100 cursor-pointer">
              <div className="flex items-start space-x-3">
                <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0 transition-transform duration-300 hover:scale-110" />
                <div>
                  <h4 className="font-semibold text-blue-800">Islamic Investment</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Explore Shariah-compliant funds for ethical wealth growth
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-purple-50 border border-purple-200 transition-all duration-300 hover:bg-purple-100 cursor-pointer">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0 transition-transform duration-300 hover:scale-110" />
                <div>
                  <h4 className="font-semibold text-purple-800">Risk Management</h4>
                  <p className="text-sm text-purple-700 mt-1">
                    Consider gold investments for portfolio diversification
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="feature-card border-none transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              className="button-finera h-20 flex-col space-y-2 hover:scale-105 transition-all duration-300 hover:shadow-lg group"
              onClick={() => {
                onQuickAction ? onQuickAction('portfolio') : window.alert('New Investment feature coming soon! 🚀');
                triggerPulse();
              }}
            >
              <DollarSign className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
              <span>New Investment</span>
            </Button>
            <Button 
              className="button-finera h-20 flex-col space-y-2 hover:scale-105 transition-all duration-300 hover:shadow-lg group"
              onClick={() => {
                onQuickAction ? onQuickAction('goals') : window.alert('Goal Planning feature coming soon! 🎯');
                triggerPulse();
              }}
            >
              <Target className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
              <span>Set Goals</span>
            </Button>
            <Button 
              className="button-finera h-20 flex-col space-y-2 hover:scale-105 transition-all duration-300 hover:shadow-lg group"
              onClick={() => {
                if (onQuickAction) {
                  onQuickAction('portfolio');
                } else {
                  window.alert('Investment Reports feature coming soon! 📊');
                }
                triggerPulse();
              }}
            >
              <BarChart3 className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
              <span>View Reports</span>
            </Button>
            <Button 
              className="button-finera h-20 flex-col space-y-2 hover:scale-105 transition-all duration-300 hover:shadow-lg group"
              onClick={() => {
                if (onQuickAction) {
                  onQuickAction('savings');
                } else {
                  window.alert('Savings Plan feature coming soon! 🐷');
                }
                triggerPulse();
              }}
            >
              <PiggyBank className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
              <span>Savings Plan</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
