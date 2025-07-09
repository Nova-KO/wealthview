
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Target, 
  CreditCard, 
  PiggyBank,
  AlertTriangle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const portfolioData = {
    totalValue: 125450,
    change: 2.4,
    isPositive: true
  };

  const budgetData = {
    spent: 3240,
    budget: 4500,
    categories: [
      { name: 'Food & Dining', spent: 890, budget: 1200 },
      { name: 'Transportation', spent: 450, budget: 600 },
      { name: 'Entertainment', spent: 320, budget: 400 },
      { name: 'Shopping', spent: 680, budget: 800 }
    ]
  };

  const savingsGoals = [
    { name: 'Emergency Fund', current: 8500, target: 15000, color: 'from-green-400 to-green-600' },
    { name: 'Vacation', current: 2300, target: 5000, color: 'from-blue-400 to-blue-600' },
    { name: 'New Car', current: 12000, target: 25000, color: 'from-purple-400 to-purple-600' }
  ];

  const creditScore = 745;
  const creditUtilization = 23;

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="fade-in">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
          Welcome back, Alex! 👋
        </h1>
        <p className="text-muted-foreground mt-2">
          Here's your financial overview for today
        </p>
      </div>

      {/* Key Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 slide-up">
        <Card className="widget">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Portfolio Value</p>
                <p className="text-2xl font-bold">${portfolioData.totalValue.toLocaleString()}</p>
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
                <p className="text-2xl font-bold">${budgetData.spent}</p>
                <p className="text-sm text-muted-foreground">of ${budgetData.budget}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
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
              <DollarSign className="w-5 h-5 mr-2 text-primary" />
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
                      ${category.spent} / ${category.budget}
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
                      ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
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
                    Cancel unused Netflix subscription to save $15/month
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
