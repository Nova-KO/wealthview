
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Target, 
  CreditCard, 
  PiggyBank,
  AlertTriangle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  PieChart
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const portfolioData = {
    totalValue: 9850000, // ₹98.5 lakhs
    change: 3.2,
    isPositive: true
  };

  const budgetData = {
    spent: 45000, // ₹45,000
    budget: 65000, // ₹65,000
    categories: [
      { name: 'Food & Groceries', spent: 12500, budget: 18000 },
      { name: 'Transportation', spent: 8500, budget: 12000 },
      { name: 'Entertainment', spent: 6000, budget: 8000 },
      { name: 'Shopping & Bills', spent: 18000, budget: 27000 }
    ]
  };

  const savingsGoals = [
    { name: 'Emergency Fund', current: 450000, target: 800000, color: 'from-green-400 to-green-600' }, // ₹4.5L to ₹8L
    { name: 'Goa Trip', current: 85000, target: 150000, color: 'from-blue-400 to-blue-600' }, // ₹85K to ₹1.5L
    { name: 'New Car (Tata Nexon)', current: 620000, target: 1200000, color: 'from-purple-400 to-purple-600' } // ₹6.2L to ₹12L
  ];

  const creditScore = 768; // Good CIBIL score range in India
  const creditUtilization = 28;

  return (
    <div className="space-y-6">
      {/* Enhanced Welcome Header */}
      <div className="fade-in">
        <Card className="widget mb-8 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-purple-50 opacity-60"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-400/10 to-pink-400/10 rounded-full blur-3xl translate-y-24 -translate-x-24"></div>
          
          <CardContent className="p-8 relative z-10">
            <div className="flex items-center justify-between">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg">
                    <span className="text-2xl font-bold text-white">A</span>
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-cyan-600 bg-clip-text text-transparent">
                      Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}, Anjali! 
                      <span className="ml-2">
                        {new Date().getHours() < 12 ? '🌅' : new Date().getHours() < 17 ? '☀️' : '🌙'}
                      </span>
                    </h1>
                    <p className="text-lg text-muted-foreground mt-1">
                      {new Date().toLocaleDateString('en-IN', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6 mt-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-green-700">Portfolio growing strong</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium text-blue-700">3 goals on track</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-medium text-purple-700">₹2.4K savings this month</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right space-y-2">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Net Worth</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    ₹{(portfolioData.totalValue / 100000).toFixed(1)}L
                  </p>
                  <div className="flex items-center justify-end mt-1">
                    <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm font-medium text-green-600">+₹15.2K today</span>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-white/50 rounded-lg border border-white/20 backdrop-blur-sm">
                  <p className="text-xs text-muted-foreground mb-1">Today's Financial Score</p>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                      <span className="text-xs font-bold text-white">A+</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Excellent</p>
                      <p className="text-xs text-muted-foreground">Keep it up!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quick Action Bar */}
            <div className="mt-6 pt-6 border-t border-white/20">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">Quick Actions</p>
                <div className="flex space-x-3">
                  <Button size="sm" variant="outline" className="bg-white/50 border-white/30 hover:bg-white/70">
                    💰 Add Income
                  </Button>
                  <Button size="sm" variant="outline" className="bg-white/50 border-white/30 hover:bg-white/70">
                    📊 View Report
                  </Button>
                  <Button size="sm" variant="outline" className="bg-white/50 border-white/30 hover:bg-white/70">
                    🎯 Set Goal
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 slide-up">
        <Card className="widget">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Portfolio Value</p>
                <p className="text-2xl font-bold">₹{(portfolioData.totalValue / 100000).toFixed(1)}L</p>
                <div className="flex items-center mt-1">
                  {portfolioData.isPositive ? (
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm ${portfolioData.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {portfolioData.change}%
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="widget">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Budget</p>
                <p className="text-2xl font-bold">₹{budgetData.spent.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">of ₹{budgetData.budget.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <Wallet className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="widget">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Credit Score</p>
                <p className="text-2xl font-bold">{creditScore}</p>
                <p className="text-sm text-green-500">Excellent</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="widget">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Savings Rate</p>
                <p className="text-2xl font-bold">28%</p>
                <p className="text-sm text-green-500">Above target</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center">
                <PiggyBank className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Budget Overview */}
        <Card className="widget">
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="w-5 h-5 mr-2 text-primary" />
              Budget Overview
            </CardTitle>
            <CardDescription>Track your spending across categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {budgetData.categories.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{category.name}</span>
                    <span className="text-muted-foreground">
                      ₹{category.spent.toLocaleString()} / ₹{category.budget.toLocaleString()}
                    </span>
                  </div>
                  <Progress 
                    value={(category.spent / category.budget) * 100} 
                    className="h-2"
                  />
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 glass-button">
              View Detailed Budget
            </Button>
          </CardContent>
        </Card>

        {/* Savings Goals */}
        <Card className="widget">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="w-5 h-5 mr-2 text-primary" />
              Savings Goals
            </CardTitle>
            <CardDescription>Track progress towards your financial goals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {savingsGoals.map((goal, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{goal.name}</span>
                    <span className="text-muted-foreground">
                      ₹{(goal.current / 100000).toFixed(1)}L / ₹{(goal.target / 100000).toFixed(1)}L
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${goal.color} transition-all duration-500`}
                      style={{ width: `${(goal.current / goal.target) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 glass-button">
              Manage Goals
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* AI Recommendations */}
      <Card className="widget">
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-primary" />
            AI Recommendations
          </CardTitle>
          <CardDescription>Personalized insights to improve your financial health</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-green-50 border border-green-200">
              <div className="flex items-start">
                <ArrowUpRight className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-green-800">Optimize Savings</h4>
                  <p className="text-sm text-green-700 mt-1">
                    Cancel unused Hotstar subscription to save ₹1,499/year
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex items-start">
                <TrendingUp className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-800">Investment Opportunity</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Consider rebalancing portfolio for better diversification
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
              <div className="flex items-start">
                <CreditCard className="w-5 h-5 text-purple-600 mr-2 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-purple-800">Credit Optimization</h4>
                  <p className="text-sm text-purple-700 mt-1">
                    Pay down credit card to improve utilization ratio
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
