import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  CreditCard,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Calendar,
  Target,
  BarChart3,
  Shield,
  IndianRupee,
  Star
} from 'lucide-react';

const CreditManager: React.FC = () => {
  const creditOverview = {
    creditScore: 768,
    scoreChange: 15,
    utilization: 28,
    totalLimit: 350000,
    totalUsed: 98000,
    monthlyPayment: 12500,
    nextDueDate: '2024-07-15'
  };

  const creditCards = [
    {
      name: 'HDFC Regalia',
      limit: 150000,
      used: 42000,
      minimumDue: 4200,
      dueDate: '2024-07-15',
      interestRate: 3.49,
      utilization: 28,
      status: 'good'
    },
    {
      name: 'SBI Elite',
      limit: 100000,
      used: 35000,
      minimumDue: 3500,
      dueDate: '2024-07-18',
      interestRate: 3.25,
      utilization: 35,
      status: 'warning'
    },
    {
      name: 'ICICI Platinum',
      limit: 100000,
      used: 21000,
      minimumDue: 2100,
      dueDate: '2024-07-20',
      interestRate: 3.75,
      utilization: 21,
      status: 'good'
    }
  ];

  const paymentStrategy = [
    {
      card: 'SBI Elite',
      recommendation: 'Pay ₹15,000 extra to reduce utilization below 30%',
      impact: 'Could improve credit score by 10-15 points',
      priority: 'high',
      savings: 2800
    },
    {
      card: 'HDFC Regalia',
      recommendation: 'Set up auto-pay for full amount',
      impact: 'Avoid late fees and maintain good payment history',
      priority: 'medium',
      savings: 1500
    },
    {
      card: 'ICICI Platinum',
      recommendation: 'Consider using for rent payments',
      impact: 'Maximize reward points while maintaining low utilization',
      priority: 'low',
      savings: 800
    }
  ];

  const creditScoreFactors = [
    { factor: 'Payment History', score: 92, weight: 35, status: 'excellent' },
    { factor: 'Credit Utilization', score: 72, weight: 30, status: 'good' },
    { factor: 'Credit History Length', score: 85, weight: 15, status: 'very good' },
    { factor: 'Credit Mix', score: 78, weight: 10, status: 'good' },
    { factor: 'New Credit Inquiries', score: 88, weight: 10, status: 'very good' }
  ];

  const spendingAnalysis = {
    categories: [
      { category: 'Fuel', amount: 18500, percentage: 28, trend: 'increasing' },
      { category: 'Travel', amount: 12000, percentage: 18, trend: 'stable' },
      { category: 'Dining', amount: 9500, percentage: 14, trend: 'increasing' },
      { category: 'Shopping', amount: 8200, percentage: 12, trend: 'decreasing' },
      { category: 'Utilities', amount: 6500, percentage: 10, trend: 'stable' },
      { category: 'Others', amount: 12300, percentage: 18, trend: 'stable' }
    ],
    totalSpending: 67000,
    topCategory: 'Fuel',
    secondaryCategory: 'Travel'
  };

  const smartCardRecommendations = [
    {
      category: 'Fuel',
      currentSpending: 18500,
      currentRewards: 185, // 1% on current cards
      recommendedCards: [
        {
          name: 'IOCL HDFC Credit Card',
          issuer: 'HDFC Bank',
          fuelRewards: '5% cashback on IOCL fuel',
          annualFee: 500,
          potentialRewards: 925,
          additionalBenefits: ['1% on all other spends', 'Fuel surcharge waiver'],
          rating: 4.2,
          bestFor: 'High fuel spending'
        },
        {
          name: 'HP Petro SBI Card',
          issuer: 'SBI Card',
          fuelRewards: '7% reward points on HP Petro',
          annualFee: 999,
          potentialRewards: 1295,
          additionalBenefits: ['Fuel surcharge waiver', '1% on other spends'],
          rating: 4.0,
          bestFor: 'HP Petro stations'
        },
        {
          name: 'BPCL SBI Card Octane',
          issuer: 'SBI Card',
          fuelRewards: '13X reward points on BPCL',
          annualFee: 1499,
          potentialRewards: 1850,
          additionalBenefits: ['Accelerated rewards on fuel', 'Annual fee waiver on spends'],
          rating: 4.3,
          bestFor: 'BPCL fuel stations'
        }
      ]
    },
    {
      category: 'Travel',
      currentSpending: 12000,
      currentRewards: 120,
      recommendedCards: [
        {
          name: 'Axis Bank Atlas Credit Card',
          issuer: 'Axis Bank',
          fuelRewards: '10 EDGE Miles per ₹100 on travel',
          annualFee: 5000,
          potentialRewards: 1200,
          additionalBenefits: ['Airport lounge access', 'Travel insurance', 'Hotel partnerships'],
          rating: 4.5,
          bestFor: 'Frequent travelers'
        },
        {
          name: 'American Express Platinum Travel',
          issuer: 'American Express',
          fuelRewards: '5X points on flights and hotels',
          annualFee: 3500,
          potentialRewards: 600,
          additionalBenefits: ['Global lounge access', 'Travel concierge', 'Insurance coverage'],
          rating: 4.4,
          bestFor: 'Premium travel benefits'
        },
        {
          name: 'HDFC Diners Club Miles',
          issuer: 'HDFC Bank',
          fuelRewards: '4 reward points per ₹100 on travel',
          annualFee: 2500,
          potentialRewards: 480,
          additionalBenefits: ['Lounge access', 'Golf privileges', 'Travel insurance'],
          rating: 4.1,
          bestFor: 'Miles accumulation'
        }
      ]
    },
    {
      category: 'Dining',
      currentSpending: 9500,
      currentRewards: 95,
      recommendedCards: [
        {
          name: 'Zomato HDFC Credit Card',
          issuer: 'HDFC Bank',
          fuelRewards: '10% cashback on Zomato orders',
          annualFee: 500,
          potentialRewards: 950,
          additionalBenefits: ['Zomato Pro membership', '5% on other dining'],
          rating: 4.3,
          bestFor: 'Food delivery and dining'
        },
        {
          name: 'Swiggy HDFC Credit Card',
          issuer: 'HDFC Bank',
          fuelRewards: '10% cashback on Swiggy',
          annualFee: 500,
          potentialRewards: 950,
          additionalBenefits: ['Swiggy One membership', 'Dining discounts'],
          rating: 4.2,
          bestFor: 'Food delivery'
        }
      ]
    }
  ];

  // Gamification elements
  const gamificationData = {
    level: 7,
    xp: 2850,
    nextLevelXp: 3500,
    badges: [
      { name: 'Credit Score Hero', icon: '🏆', unlocked: true, description: 'Maintained 750+ credit score for 6 months' },
      { name: 'Reward Optimizer', icon: '💎', unlocked: true, description: 'Maximized rewards across 3 categories' },
      { name: 'Payment Perfectionist', icon: '⚡', unlocked: true, description: 'No missed payments for 12 months' },
      { name: 'Utilization Master', icon: '🎯', unlocked: false, description: 'Keep utilization below 10% for 3 months' },
      { name: 'FI Journey', icon: '🚀', unlocked: false, description: 'Start your Financial Independence journey' }
    ],
    streak: 18,
    achievements: [
      { title: 'Credit Score Milestone', description: 'Reached 768 credit score', reward: '+100 XP', completed: true },
      { title: 'Debt Destroyer', description: 'Paid off ₹50,000 in credit debt', reward: '+150 XP', completed: true },
      { title: 'Smart Spender', description: 'Optimized rewards for fuel category', reward: '+75 XP', completed: false }
    ]
  };

  // Financial Independence Calculator
  const fiCalculator = {
    currentAge: 28,
    currentSavings: 1250000, // ₹12.5L
    monthlyIncome: 85000,
    monthlyExpenses: 67000,
    monthlySavings: 18000,
    expectedReturn: 12, // 12% annual return
    retirementGoals: [
      { age: 40, requiredCorpus: 30000000, monthlyRequired: 45000, feasible: false },
      { age: 45, requiredCorpus: 25000000, monthlyRequired: 35000, feasible: true },
      { age: 50, requiredCorpus: 20000000, monthlyRequired: 28000, feasible: true },
      { age: 55, requiredCorpus: 15000000, monthlyRequired: 22000, feasible: true }
    ],
    fiNumber: 25000000, // 25x annual expenses
    currentFiProgress: 5, // 5% towards FI
    yearsToFi: 17,
    optimizationTips: [
      { category: 'Increase Income', impact: 'Reduce FI timeline by 3 years', action: 'Skill development, side income' },
      { category: 'Reduce Expenses', impact: 'Reduce FI timeline by 2 years', action: 'Optimize subscriptions, lifestyle' },
      { category: 'Investment Returns', impact: 'Reduce FI timeline by 4 years', action: 'Diversify, optimize portfolio' }
    ]
  };

  const recommendations = [
    {
      type: 'urgent',
      title: 'Reduce Credit Utilization',
      description: 'Your SBI Elite card utilization is 35%. Pay down ₹5,000 to get below 30%.',
      action: 'Pay Now',
      impact: '+10 credit score points',
      xpReward: 75
    },
    {
      type: 'improvement',
      title: 'Optimize Fuel Rewards',
      description: 'You spend ₹18,500 monthly on fuel but earn only 1% rewards. Switch to IOCL HDFC for 5% cashback.',
      action: 'Apply for IOCL Card',
      impact: 'Earn ₹740 extra monthly on fuel',
      xpReward: 100
    },
    {
      type: 'opportunity',
      title: 'Travel Card Addition',
      description: 'Your travel spending of ₹12,000 can earn 10X rewards with Axis Atlas card.',
      action: 'Apply for Atlas Card',
      impact: 'Earn 1,200 miles monthly',
      xpReward: 85
    },
    {
      type: 'improvement',
      title: 'Dining Rewards Optimization',
      description: 'Get Zomato HDFC card for 10% cashback on your ₹9,500 dining spends.',
      action: 'Apply for Zomato Card',
      impact: 'Save ₹855 monthly on dining',
      xpReward: 60
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-50 border-green-200';
      case 'very good': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'good': return 'text-cyan-600 bg-cyan-50 border-cyan-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'poor': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="fade-in">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
          AI Credit Slashing System
        </h1>
        <p className="text-muted-foreground mt-2">
          Optimize your credit health with intelligent payment strategies
        </p>
      </div>

      {/* Gamification Header */}
      <Card className="widget mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mr-3">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Credit Master</p>
                  <p className="text-xl font-bold">Level {gamificationData.level}</p>
                </div>
              </div>
              
              <div className="flex-1 max-w-xs">
                <div className="flex justify-between text-sm mb-1">
                  <span>XP: {gamificationData.xp}</span>
                  <span>{gamificationData.nextLevelXp}</span>
                </div>
                <Progress value={(gamificationData.xp / gamificationData.nextLevelXp) * 100} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {gamificationData.nextLevelXp - gamificationData.xp} XP to Level {gamificationData.level + 1}
                </p>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Streak</p>
                <p className="text-2xl font-bold text-orange-500">{gamificationData.streak}</p>
                <p className="text-xs text-muted-foreground">days</p>
              </div>
            </div>
            
            <div className="flex space-x-2">
              {gamificationData.badges.slice(0, 3).map((badge, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-lg border ${
                    badge.unlocked
                      ? 'bg-yellow-50 border-yellow-200 text-yellow-800'
                      : 'bg-gray-50 border-gray-200 text-gray-400'
                  }`}
                  title={badge.description}
                >
                  <span className="text-lg">{badge.icon}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Credit Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 slide-up">
        <Card className="widget">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Credit Score</p>
                <p className="text-2xl font-bold">{creditOverview.creditScore}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">+{creditOverview.scoreChange} this month</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="widget">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Credit Utilization</p>
                <p className="text-2xl font-bold">{creditOverview.utilization}%</p>
                <p className="text-sm text-green-500">Below 30% target</p>
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
                <p className="text-sm font-medium text-muted-foreground">Total Limit</p>
                <p className="text-2xl font-bold">₹{(creditOverview.totalLimit / 1000).toFixed(0)}K</p>
                <p className="text-sm text-muted-foreground">₹{(creditOverview.totalUsed / 1000).toFixed(0)}K used</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="widget">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Payment</p>
                <p className="text-2xl font-bold">₹{(creditOverview.monthlyPayment / 1000).toFixed(1)}K</p>
                <p className="text-sm text-muted-foreground">Due in 6 days</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Financial Tip */}
      <Card className="widget mb-6">
        <CardContent className="p-4">
          <div className="flex items-center">
            <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg mr-4">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-indigo-800">💡 Today's Financial Wisdom</h4>
              <p className="text-sm text-muted-foreground">
                "The path to financial independence isn't about earning more, it's about being intentional with every rupee. 
                Your fuel spending optimization could save ₹8,880 annually - that's ₹74K towards your FI goal over 10 years!"
              </p>
            </div>
            <Badge className="bg-indigo-100 text-indigo-800">
              Day {gamificationData.streak}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="cards" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="cards">Credit Cards</TabsTrigger>
          <TabsTrigger value="spending">Spending Analysis</TabsTrigger>
          <TabsTrigger value="smart-cards">Smart Recommendations</TabsTrigger>
          <TabsTrigger value="fi-calculator">FI Calculator</TabsTrigger>
          <TabsTrigger value="strategy">Payment Strategy</TabsTrigger>
          <TabsTrigger value="score">Score Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="cards" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {creditCards.map((card, index) => (
              <Card key={index} className="widget">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{card.name}</CardTitle>
                    <Badge className={getStatusColor(card.status)}>
                      {card.status === 'good' ? 'Healthy' : 'Review Needed'}
                    </Badge>
                  </div>
                  <CardDescription>
                    Limit: ₹{(card.limit / 1000).toFixed(0)}K • Due: {card.dueDate}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Utilization</span>
                        <span>{card.utilization}%</span>
                      </div>
                      <Progress value={card.utilization} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Used</p>
                        <p className="font-semibold">₹{(card.used / 1000).toFixed(0)}K</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Min Due</p>
                        <p className="font-semibold">₹{(card.minimumDue / 1000).toFixed(1)}K</p>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" className="flex-1">
                        View Details
                      </Button>
                      <Button size="sm" variant="default" className="px-3">
                        Pay +25 XP
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="spending" className="space-y-6">
          <Card className="widget">
            <CardHeader>
              <CardTitle>Spending Category Analysis</CardTitle>
              <CardDescription>
                AI-powered analysis of your spending patterns to optimize rewards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-2">₹{(spendingAnalysis.totalSpending / 1000).toFixed(0)}K</div>
                    <p className="text-sm text-muted-foreground">Monthly Spending</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-2">{spendingAnalysis.topCategory}</div>
                    <p className="text-sm text-muted-foreground">Top Category</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-2">₹2.4K</div>
                    <p className="text-sm text-muted-foreground">Potential Monthly Savings</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {spendingAnalysis.categories.map((cat, index) => (
                    <div key={index} className="p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-3 ${
                            cat.category === 'Fuel' ? 'bg-red-500' :
                            cat.category === 'Travel' ? 'bg-blue-500' :
                            cat.category === 'Dining' ? 'bg-green-500' :
                            cat.category === 'Shopping' ? 'bg-purple-500' :
                            cat.category === 'Utilities' ? 'bg-yellow-500' : 'bg-gray-500'
                          }`}></div>
                          <h4 className="font-semibold">{cat.category}</h4>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">₹{(cat.amount / 1000).toFixed(1)}K</p>
                          <p className="text-sm text-muted-foreground">{cat.percentage}%</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Progress value={cat.percentage} className="flex-1 mr-4" />
                        <Badge className={
                          cat.trend === 'increasing' ? 'text-red-600 bg-red-50 border-red-200' :
                          cat.trend === 'decreasing' ? 'text-green-600 bg-green-50 border-green-200' :
                          'text-blue-600 bg-blue-50 border-blue-200'
                        }>
                          {cat.trend}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="smart-cards" className="space-y-6">
          <Card className="widget">
            <CardHeader>
              <CardTitle>AI-Powered Card Recommendations</CardTitle>
              <CardDescription>
                Smart recommendations based on your spending patterns to maximize rewards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {smartCardRecommendations.map((categoryRec, catIndex) => (
                  <div key={catIndex}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">{categoryRec.category} Cards</h3>
                      <div className="text-right text-sm">
                        <p className="text-muted-foreground">Monthly Spending: ₹{(categoryRec.currentSpending / 1000).toFixed(1)}K</p>
                        <p className="font-medium text-red-600">Current Rewards: ₹{categoryRec.currentRewards}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {categoryRec.recommendedCards.map((card, cardIndex) => (
                        <div key={cardIndex} className="p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-semibold text-sm mb-1">{card.name}</h4>
                              <p className="text-xs text-muted-foreground">{card.issuer}</p>
                            </div>
                            <div className="flex items-center">
                              <Star className="w-3 h-3 text-yellow-500 mr-1" />
                              <span className="text-xs font-medium">{card.rating}</span>
                            </div>
                          </div>
                          
                          <div className="space-y-2 mb-4">
                            <div className="p-2 rounded bg-green-50 border border-green-200">
                              <p className="text-xs font-medium text-green-800">{card.fuelRewards}</p>
                            </div>
                            
                            <div className="text-xs">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Annual Fee:</span>
                                <span className="font-medium">₹{card.annualFee}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Potential Rewards:</span>
                                <span className="font-medium text-green-600">₹{card.potentialRewards}/month</span>
                              </div>
                              <div className="flex justify-between font-semibold text-green-600">
                                <span>Net Monthly Benefit:</span>
                                <span>+₹{(card.potentialRewards - categoryRec.currentRewards - card.annualFee/12).toFixed(0)}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-2 mb-4">
                            <p className="text-xs font-medium text-muted-foreground">Key Benefits:</p>
                            <ul className="text-xs space-y-1">
                              {card.additionalBenefits.slice(0, 2).map((benefit, benefitIndex) => (
                                <li key={benefitIndex} className="flex items-start">
                                  <CheckCircle className="w-2 h-2 text-green-500 mr-1 mt-0.5 flex-shrink-0" />
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <Badge className="text-xs">
                              {card.bestFor}
                            </Badge>
                            <Button size="sm" variant="outline" className="text-xs px-3 py-1">
                              Apply Now
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fi-calculator" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card className="widget">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg mr-3">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  Financial Independence Journey
                </CardTitle>
                <CardDescription>
                  Can I retire by... Let's calculate your path to financial freedom!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                    <div className="text-3xl font-bold text-green-600 mb-2">₹{(fiCalculator.fiNumber / 10000000).toFixed(1)}Cr</div>
                    <p className="text-sm text-muted-foreground">Your FI Number (25x annual expenses)</p>
                    <div className="mt-4">
                      <Progress value={fiCalculator.currentFiProgress} className="h-3" />
                      <p className="text-xs text-muted-foreground mt-2">
                        {fiCalculator.currentFiProgress}% complete • {fiCalculator.yearsToFi} years to go
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">₹{(fiCalculator.currentSavings / 100000).toFixed(1)}L</div>
                      <p className="text-sm text-muted-foreground">Current Corpus</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">₹{(fiCalculator.monthlySavings / 1000).toFixed(0)}K</div>
                      <p className="text-sm text-muted-foreground">Monthly SIP</p>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-2">🎯 Quick FI Fact</h4>
                    <p className="text-sm text-blue-700">
                      At your current savings rate of ₹18K/month with 12% returns, you'll reach FI by age {fiCalculator.currentAge + fiCalculator.yearsToFi}!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="widget">
              <CardHeader>
                <CardTitle>Retirement Age Scenarios</CardTitle>
                <CardDescription>
                  Different retirement timelines and what they require
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {fiCalculator.retirementGoals.map((goal, index) => (
                    <div 
                      key={index} 
                      className={`p-4 rounded-lg border ${
                        goal.feasible 
                          ? 'border-green-200 bg-green-50' 
                          : 'border-red-200 bg-red-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">Retire by {goal.age}</h4>
                          <p className="text-sm text-muted-foreground">
                            {goal.age - fiCalculator.currentAge} years from now
                          </p>
                        </div>
                        <Badge className={goal.feasible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {goal.feasible ? '✅ Achievable' : '❌ Challenging'}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-muted-foreground">Required Corpus</p>
                          <p className="font-semibold">₹{(goal.requiredCorpus / 10000000).toFixed(1)}Cr</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Monthly SIP Needed</p>
                          <p className="font-semibold">₹{(goal.monthlyRequired / 1000).toFixed(0)}K</p>
                        </div>
                      </div>
                      
                      {goal.feasible && (
                        <Button variant="outline" size="sm" className="mt-3 w-full">
                          Plan for Age {goal.age}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="widget">
            <CardHeader>
              <CardTitle>🚀 FI Optimization Strategies</CardTitle>
              <CardDescription>
                Level up your Financial Independence journey with these power moves
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {fiCalculator.optimizationTips.map((tip, index) => (
                  <div key={index} className="p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-sm">{tip.category}</h4>
                      <div className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                        Level Up!
                      </div>
                    </div>
                    
                    <p className="text-sm font-medium text-green-600 mb-2">{tip.impact}</p>
                    <p className="text-sm text-muted-foreground mb-4">{tip.action}</p>
                    
                    <Button variant="outline" size="sm" className="w-full text-xs">
                      Start Challenge
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-purple-500 rounded-lg mr-3">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                  <h4 className="font-semibold text-purple-800">Unlock FI Journey Badge!</h4>
                </div>
                <p className="text-sm text-purple-700 mb-3">
                  Complete any optimization challenge to unlock the 🚀 FI Journey badge and earn 200 XP!
                </p>
                <div className="flex items-center space-x-2">
                  <Button variant="default" size="sm" className="bg-purple-600 hover:bg-purple-700">
                    Accept Challenge
                  </Button>
                  <span className="text-xs text-purple-600 font-medium">+200 XP Reward</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strategy" className="space-y-6">
          {/* Gamified Achievements Section */}
          <Card className="widget mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg mr-3">
                  <Star className="w-5 h-5 text-white" />
                </div>
                Your Financial Achievements
              </CardTitle>
              <CardDescription>
                Level up your financial skills and unlock new badges!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-4">🏆 Unlocked Badges</h4>
                  <div className="space-y-3">
                    {gamificationData.badges.filter(badge => badge.unlocked).map((badge, index) => (
                      <div key={index} className="flex items-center p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <span className="text-2xl mr-3">{badge.icon}</span>
                        <div>
                          <p className="font-semibold text-yellow-800">{badge.name}</p>
                          <p className="text-sm text-yellow-700">{badge.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-4">🎯 Next Challenges</h4>
                  <div className="space-y-3">
                    {gamificationData.badges.filter(badge => !badge.unlocked).map((badge, index) => (
                      <div key={index} className="flex items-center p-3 bg-gray-50 border border-gray-200 rounded-lg">
                        <span className="text-2xl mr-3 opacity-50">{badge.icon}</span>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-700">{badge.name}</p>
                          <p className="text-sm text-gray-600">{badge.description}</p>
                        </div>
                        <Button size="sm" variant="outline">
                          Start
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {gamificationData.achievements.map((achievement, index) => (
                  <div 
                    key={index} 
                    className={`p-4 rounded-lg border ${
                      achievement.completed 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-blue-200 bg-blue-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-semibold text-sm">{achievement.title}</h5>
                      {achievement.completed ? (
                        <Badge className="bg-green-100 text-green-800">✅ Done</Badge>
                      ) : (
                        <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-green-600">{achievement.reward}</span>
                      {!achievement.completed && (
                        <Button size="sm" variant="outline" className="text-xs px-2 py-1">
                          Complete
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="widget">
            <CardHeader>
              <CardTitle>Payment Strategy Recommendations</CardTitle>
              <CardDescription>
                AI-optimized payment plans to improve your credit score
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentStrategy.map((strategy, index) => (
                  <div key={index} className={`p-4 rounded-lg border-l-4 ${getPriorityColor(strategy.priority)}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{strategy.card}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{strategy.recommendation}</p>
                        <p className="text-sm font-medium text-green-600">{strategy.impact}</p>
                      </div>
                      <div className="ml-4 text-right">
                        <Badge className={getPriorityColor(strategy.priority)}>
                          {strategy.priority} priority
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-1">
                          Save ₹{strategy.savings}/year
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="score" className="space-y-6">
          <Card className="widget">
            <CardHeader>
              <CardTitle>Credit Score Analysis</CardTitle>
              <CardDescription>
                Breakdown of factors affecting your credit score
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {creditScoreFactors.map((factor, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">{factor.factor}</span>
                        <span className="text-sm text-muted-foreground ml-2">({factor.weight}% weight)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(factor.status)}>
                          {factor.status}
                        </Badge>
                        <span className="font-semibold">{factor.score}/100</span>
                      </div>
                    </div>
                    <Progress value={factor.score} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>


      </Tabs>
    </div>
  );
};

export default CreditManager; 