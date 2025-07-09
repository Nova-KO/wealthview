import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  PiggyBank,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Search,
  IndianRupee,
  Calendar,
  Zap,
  Target,
  ShoppingBag,
  Smartphone,
  Tv,
  Car
} from 'lucide-react';

const SavingsBooster: React.FC = () => {
  const savingsOverview = {
    monthlySavings: 45000, // ₹45K
    potentialSavings: 18500, // ₹18.5K additional possible
    yearlyProjection: 540000, // ₹5.4L
    savingsRate: 36 // 36%
  };

  const duplicateSubscriptions = [
    {
      service: 'Music Streaming',
      subscriptions: ['Spotify Premium', 'YouTube Music'],
      monthlyCost: 358,
      recommendation: 'Keep Spotify, cancel YouTube Music',
      potentialSaving: 149
    },
    {
      service: 'Cloud Storage',
      subscriptions: ['Google Drive 200GB', 'iCloud 200GB'],
      monthlyCost: 390,
      recommendation: 'Consolidate to Google Drive only',
      potentialSaving: 195
    },
    {
      service: 'Food Delivery',
      subscriptions: ['Swiggy One', 'Zomato Pro'],
      monthlyCost: 398,
      recommendation: 'Choose based on usage patterns',
      potentialSaving: 199
    }
  ];

  const savingOpportunities = [
    {
      category: 'Subscriptions',
      icon: <Smartphone className="w-5 h-5" />,
      currentSpend: 2500,
      potentialSaving: 800,
      opportunities: [
        { item: 'Unused Hotstar VIP', saving: 299, action: 'Cancel' },
        { item: 'Multiple news apps', saving: 350, action: 'Consolidate' },
        { item: 'Gym membership (unused)', saving: 1500, action: 'Cancel or use' }
      ],
      color: 'from-purple-400 to-purple-600'
    },
    {
      category: 'Utilities',
      icon: <Zap className="w-5 h-5" />,
      currentSpend: 3200,
      potentialSaving: 600,
      opportunities: [
        { item: 'Switch to LED bulbs', saving: 200, action: 'Upgrade' },
        { item: 'Optimize AC usage', saving: 400, action: 'Schedule' }
      ],
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      category: 'Transportation',
      icon: <Car className="w-5 h-5" />,
      currentSpend: 8500,
      potentialSaving: 2100,
      opportunities: [
        { item: 'Use metro instead of cab', saving: 1200, action: 'Plan routes' },
        { item: 'Carpool for office', saving: 900, action: 'Find colleagues' }
      ],
      color: 'from-blue-400 to-blue-600'
    },
    {
      category: 'Shopping',
      icon: <ShoppingBag className="w-5 h-5" />,
      currentSpend: 12000,
      potentialSaving: 3500,
      opportunities: [
        { item: 'Buy groceries in bulk', saving: 1500, action: 'Plan weekly' },
        { item: 'Use cashback credit cards', saving: 800, action: 'Switch cards' },
        { item: 'Compare prices online', saving: 1200, action: 'Use apps' }
      ],
      color: 'from-green-400 to-green-600'
    }
  ];

  const alternativeServices = [
    {
      current: 'Netflix Premium',
      currentCost: 649,
      alternative: 'Netflix Basic + Regional OTT',
      alternativeCost: 348,
      savings: 301,
      features: 'Similar content library with regional shows'
    },
    {
      current: 'Uber/Ola Regular',
      currentCost: 4500,
      alternative: 'Metro + Occasional ride',
      alternativeCost: 2200,
      savings: 2300,
      features: 'Faster commute during rush hours'
    },
    {
      current: 'Branded groceries',
      currentCost: 15000,
      alternative: 'Local brands + bulk buying',
      alternativeCost: 11000,
      savings: 4000,
      features: 'Same quality, better prices'
    }
  ];

  const savingsGoals = [
    {
      name: 'Emergency Fund',
      target: 600000, // ₹6L
      current: 420000, // ₹4.2L
      monthlyContribution: 35000,
      timeToGoal: 5, // months
      progress: 70
    },
    {
      name: 'Goa Vacation',
      target: 150000, // ₹1.5L
      current: 85000, // ₹85K
      monthlyContribution: 15000,
      timeToGoal: 4, // months
      progress: 57
    },
    {
      name: 'Car Down Payment',
      target: 500000, // ₹5L
      current: 180000, // ₹1.8L
      monthlyContribution: 25000,
      timeToGoal: 13, // months
      progress: 36
    }
  ];

  return (
    <div className="space-y-6">
      <div className="fade-in">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
          Personal Savings Booster
        </h1>
        <p className="text-muted-foreground mt-2">
          Maximize your savings potential with AI-driven cost optimization
        </p>
      </div>

      {/* Savings Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 slide-up">
        <Card className="widget">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Savings</p>
                <p className="text-2xl font-bold">₹{(savingsOverview.monthlySavings / 1000).toFixed(0)}K</p>
                <p className="text-sm text-green-500">{savingsOverview.savingsRate}% of income</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                <PiggyBank className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="widget">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Potential Savings</p>
                <p className="text-2xl font-bold text-orange-600">₹{(savingsOverview.potentialSavings / 1000).toFixed(1)}K</p>
                <p className="text-sm text-muted-foreground">Additional monthly</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="widget">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Yearly Projection</p>
                <p className="text-2xl font-bold">₹{(savingsOverview.yearlyProjection / 100000).toFixed(1)}L</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">On track</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="widget">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Optimization Score</p>
                <p className="text-2xl font-bold">8.2</p>
                <p className="text-sm text-green-500">Very Good</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="opportunities" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          <TabsTrigger value="duplicates">Duplicates</TabsTrigger>
          <TabsTrigger value="alternatives">Alternatives</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
        </TabsList>

        <TabsContent value="opportunities" className="space-y-4">
          <div className="grid gap-4">
            {savingOpportunities.map((category, index) => (
              <Card key={index} className="widget">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center text-white`}>
                        {category.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{category.category}</CardTitle>
                        <CardDescription>
                          Spending ₹{category.currentSpend.toLocaleString()}/month • Save up to ₹{category.potentialSaving.toLocaleString()}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-700">
                      ₹{category.potentialSaving.toLocaleString()} potential
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.opportunities.map((opportunity, oppIndex) => (
                      <div key={oppIndex} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-medium">{opportunity.item}</p>
                          <p className="text-sm text-muted-foreground">Save ₹{opportunity.saving}/month</p>
                        </div>
                        <Button variant="outline" size="sm">
                          {opportunity.action}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="duplicates" className="space-y-4">
          <Card className="widget">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                Duplicate Subscriptions Detected
              </CardTitle>
              <CardDescription>
                You're paying for similar services multiple times
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {duplicateSubscriptions.map((duplicate, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{duplicate.service}</h4>
                      <Badge variant="destructive">₹{duplicate.potentialSaving}/month saving</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>Current subscriptions: {duplicate.subscriptions.join(', ')}</p>
                      <p>Total cost: ₹{duplicate.monthlyCost}/month</p>
                    </div>
                    <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-green-800">{duplicate.recommendation}</p>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Apply Fix
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alternatives" className="space-y-4">
          <Card className="widget">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5 text-blue-500" />
                Cost-Saving Alternatives
              </CardTitle>
              <CardDescription>
                Better options for your current spending
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alternativeServices.map((service, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-red-600">Current</h5>
                        <p className="text-sm">{service.current}</p>
                        <p className="text-sm font-semibold">₹{service.currentCost}/month</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-green-600">Alternative</h5>
                        <p className="text-sm">{service.alternative}</p>
                        <p className="text-sm font-semibold">₹{service.alternativeCost}/month</p>
                      </div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm text-blue-800">{service.features}</p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="font-semibold text-green-600">Save ₹{service.savings}/month</p>
                        <Button size="sm" variant="outline">
                          Learn More
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-4">
          <Card className="widget">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-500" />
                Savings Goals Progress
              </CardTitle>
              <CardDescription>
                Track your progress towards financial goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {savingsGoals.map((goal, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{goal.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          ₹{(goal.current / 1000).toFixed(0)}K of ₹{(goal.target / 1000).toFixed(0)}K
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{goal.progress}%</p>
                        <p className="text-sm text-muted-foreground">{goal.timeToGoal} months left</p>
                      </div>
                    </div>
                    <Progress value={goal.progress} className="h-3" />
                    <div className="flex items-center justify-between text-sm">
                      <span>Monthly: ₹{(goal.monthlyContribution / 1000).toFixed(0)}K</span>
                      <Button variant="outline" size="sm">
                        Boost Savings
                      </Button>
                    </div>
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

export default SavingsBooster;