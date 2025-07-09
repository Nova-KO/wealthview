import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  IndianRupee,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Car,
  Home,
  Utensils,
  Gamepad2,
  AlertTriangle,
  CheckCircle,
  Calendar,
  BarChart3
} from 'lucide-react';

const BudgetManager: React.FC = () => {
  const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
  
  const budgetOverview = {
    totalIncome: 125000, // ₹1.25L
    totalBudget: 95000, // ₹95K
    totalSpent: 67500, // ₹67.5K
    remaining: 27500, // ₹27.5K
    savingsTarget: 30000, // ₹30K
    actualSavings: 57500 // ₹57.5K
  };

  const categories = [
    {
      name: 'Food & Groceries',
      icon: <Utensils className="w-5 h-5" />,
      budgeted: 18000,
      spent: 15750,
      transactions: 23,
      trend: 'down',
      trendPercent: -5.2,
      color: 'from-green-400 to-green-600'
    },
    {
      name: 'Transportation',
      icon: <Car className="w-5 h-5" />,
      budgeted: 12000,
      spent: 11200,
      transactions: 15,
      trend: 'up',
      trendPercent: 2.1,
      color: 'from-blue-400 to-blue-600'
    },
    {
      name: 'Entertainment',
      icon: <Gamepad2 className="w-5 h-5" />,
      budgeted: 8000,
      spent: 9500,
      transactions: 12,
      trend: 'up',
      trendPercent: 18.8,
      color: 'from-purple-400 to-purple-600'
    },
    {
      name: 'Shopping & Bills',
      icon: <ShoppingCart className="w-5 h-5" />,
      budgeted: 25000,
      spent: 19750,
      transactions: 18,
      trend: 'down',
      trendPercent: -8.3,
      color: 'from-cyan-400 to-cyan-600'
    },
    {
      name: 'Housing',
      icon: <Home className="w-5 h-5" />,
      budgeted: 32000,
      spent: 11300,
      transactions: 3,
      trend: 'down',
      trendPercent: -2.1,
      color: 'from-orange-400 to-orange-600'
    }
  ];

  const recentTransactions = [
    { date: '2024-07-09', merchant: 'Big Bazaar', category: 'Food & Groceries', amount: -2340, type: 'expense' },
    { date: '2024-07-08', merchant: 'Netflix', category: 'Entertainment', amount: -649, type: 'subscription' },
    { date: '2024-07-08', merchant: 'Ola Cabs', category: 'Transportation', amount: -280, type: 'expense' },
    { date: '2024-07-07', merchant: 'Amazon', category: 'Shopping', amount: -1899, type: 'expense' },
    { date: '2024-07-06', merchant: 'Swiggy', category: 'Food & Groceries', amount: -450, type: 'expense' },
    { date: '2024-07-05', merchant: 'Salary Credit', category: 'Income', amount: 125000, type: 'income' }
  ];

  const budgetInsights = [
    {
      type: 'warning',
      title: 'Entertainment Over Budget',
      description: 'You\'ve exceeded your entertainment budget by ₹1,500 this month.',
      action: 'Consider reducing dining out expenses',
      icon: <AlertTriangle className="w-5 h-5" />
    },
    {
      type: 'success',
      title: 'Great Savings!',
      description: 'You\'re saving ₹27.5K more than your target this month.',
      action: 'Consider increasing your investment allocation',
      icon: <CheckCircle className="w-5 h-5" />
    },
    {
      type: 'info',
      title: 'Subscription Alert',
      description: 'You have 3 subscriptions renewing this week for ₹1,847.',
      action: 'Review and cancel unused subscriptions',
      icon: <Calendar className="w-5 h-5" />
    }
  ];

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'warning': return 'border-l-yellow-500 bg-yellow-50';
      case 'success': return 'border-l-green-500 bg-green-50';
      case 'info': return 'border-l-blue-500 bg-blue-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="fade-in">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
          Budget Manager
        </h1>
        <p className="text-muted-foreground mt-2">
          Take control of your spending with intelligent budget tracking for {currentMonth}
        </p>
      </div>

      {/* Budget Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 slide-up">
        <Card className="widget">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Income</p>
                <p className="text-2xl font-bold">₹{(budgetOverview.totalIncome / 1000).toFixed(0)}K</p>
                <p className="text-sm text-green-500">Salary + Side income</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                <IndianRupee className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="widget">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
                <p className="text-2xl font-bold">₹{(budgetOverview.totalSpent / 1000).toFixed(1)}K</p>
                <p className="text-sm text-muted-foreground">of ₹{(budgetOverview.totalBudget / 1000).toFixed(0)}K budget</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="widget">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Remaining Budget</p>
                <p className="text-2xl font-bold text-green-600">₹{(budgetOverview.remaining / 1000).toFixed(1)}K</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">29% left</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="widget">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Savings This Month</p>
                <p className="text-2xl font-bold text-purple-600">₹{(budgetOverview.actualSavings / 1000).toFixed(1)}K</p>
                <p className="text-sm text-green-500">192% of target!</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="categories" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="space-y-4">
          <Card className="widget">
            <CardHeader>
              <CardTitle>Spending by Category</CardTitle>
              <CardDescription>Track your expenses across different categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {categories.map((category, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center text-white`}>
                          {category.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold">{category.name}</h4>
                          <p className="text-sm text-muted-foreground">{category.transactions} transactions</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹{category.spent.toLocaleString()}</p>
                        <div className="flex items-center gap-1">
                          {category.trend === 'up' ? (
                            <TrendingUp className="w-4 h-4 text-red-500" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-green-500" />
                          )}
                          <span className={`text-sm ${category.trend === 'up' ? 'text-red-500' : 'text-green-500'}`}>
                            {category.trendPercent > 0 ? '+' : ''}{category.trendPercent}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Budget: ₹{category.budgeted.toLocaleString()}</span>
                        <span>{((category.spent / category.budgeted) * 100).toFixed(0)}% used</span>
                      </div>
                      <Progress 
                        value={(category.spent / category.budgeted) * 100} 
                        className={`h-2 ${category.spent > category.budgeted ? 'text-red-500' : ''}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card className="widget">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest spending activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${transaction.type === 'income' ? 'bg-green-500' : transaction.type === 'subscription' ? 'bg-purple-500' : 'bg-blue-500'}`}></div>
                      <div>
                        <h4 className="font-medium">{transaction.merchant}</h4>
                        <p className="text-sm text-muted-foreground">{transaction.category} • {transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-gray-900'}`}>
                        {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {transaction.type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Transactions
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid gap-4">
            {budgetInsights.map((insight, index) => (
              <Card key={index} className={`border-l-4 ${getInsightColor(insight.type)}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      insight.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                      insight.type === 'success' ? 'bg-green-100 text-green-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {insight.icon}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{insight.title}</CardTitle>
                      <CardDescription className="mt-1">{insight.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{insight.action}</p>
                    <Button variant="outline" size="sm">
                      Take Action
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BudgetManager;