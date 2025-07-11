import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Target,
  TrendingUp,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Home,
  Car,
  Plane,
  GraduationCap,
  Heart,
  Trophy,
  Star,
  IndianRupee,
  Plus,
  AlertCircle
} from 'lucide-react';

const GoalPlanning: React.FC = () => {
  const financialGoals = [
    {
      id: 1,
      title: 'Emergency Fund',
      description: '6-12 months of living expenses',
      category: 'Security',
      icon: <Heart className="w-6 h-6" />,
      targetAmount: 600000,
      currentAmount: 450000,
      monthlyContribution: 15000,
      targetDate: '2024-12-31',
      priority: 'high',
      status: 'on-track',
      milestones: [
        { amount: 200000, completed: true, date: '2023-06-01' },
        { amount: 400000, completed: true, date: '2023-12-01' },
        { amount: 600000, completed: false, date: '2024-12-31' }
      ]
    },
    {
      id: 2,
      title: 'Home Down Payment',
      description: '20% down payment for ₹85L home',
      category: 'Investment',
      icon: <Home className="w-6 h-6" />,
      targetAmount: 1700000,
      currentAmount: 850000,
      monthlyContribution: 25000,
      targetDate: '2025-08-31',
      priority: 'high',
      status: 'behind',
      milestones: [
        { amount: 500000, completed: true, date: '2023-08-01' },
        { amount: 1000000, completed: false, date: '2024-06-01' },
        { amount: 1700000, completed: false, date: '2025-08-31' }
      ]
    },
    {
      id: 3,
      title: 'Europe Vacation',
      description: '15-day Europe trip for family',
      category: 'Lifestyle',
      icon: <Plane className="w-6 h-6" />,
      targetAmount: 350000,
      currentAmount: 185000,
      monthlyContribution: 12000,
      targetDate: '2024-09-30',
      priority: 'medium',
      status: 'on-track',
      milestones: [
        { amount: 150000, completed: true, date: '2023-12-01' },
        { amount: 250000, completed: false, date: '2024-05-01' },
        { amount: 350000, completed: false, date: '2024-09-30' }
      ]
    },
    {
      id: 4,
      title: 'Child Education Fund',
      description: 'Higher education fund for children',
      category: 'Education',
      icon: <GraduationCap className="w-6 h-6" />,
      targetAmount: 2500000,
      currentAmount: 280000,
      monthlyContribution: 18000,
      targetDate: '2035-06-30',
      priority: 'medium',
      status: 'on-track',
      milestones: [
        { amount: 500000, completed: false, date: '2026-06-30' },
        { amount: 1500000, completed: false, date: '2030-06-30' },
        { amount: 2500000, completed: false, date: '2035-06-30' }
      ]
    },
    {
      id: 5,
      title: 'Car Upgrade',
      description: 'Premium SUV purchase',
      category: 'Lifestyle',
      icon: <Car className="w-6 h-6" />,
      targetAmount: 1200000,
      currentAmount: 620000,
      monthlyContribution: 20000,
      targetDate: '2025-03-31',
      priority: 'low',
      status: 'ahead',
      milestones: [
        { amount: 400000, completed: true, date: '2023-09-01' },
        { amount: 800000, completed: false, date: '2024-08-01' },
        { amount: 1200000, completed: false, date: '2025-03-31' }
      ]
    }
  ];

  const goalStrategies = [
    {
      goalId: 1,
      strategies: [
        'Automate ₹15K monthly transfer to high-yield savings',
        'Use liquid funds for better returns (6-7%)',
        'Keep 3 months in savings, rest in liquid funds',
        'Review and adjust monthly as expenses change'
      ],
      tips: [
        'Keep emergency fund separate from other savings',
        'Consider laddered FDs for higher returns',
        'Review target amount annually based on lifestyle'
      ]
    },
    {
      goalId: 2,
      strategies: [
        'Increase SIP allocation to equity funds',
        'Use step-up SIPs with salary increments',
        'Consider ELSS for tax benefits',
        'Time market entry closer to purchase date'
      ],
      tips: [
        'Start researching locations 2 years before',
        'Factor in registration and other costs (8-10%)',
        'Consider pre-approved home loans for negotiation'
      ]
    },
    {
      goalId: 3,
      strategies: [
        'Use conservative investments (debt funds)',
        'Book travel during off-season for savings',
        'Consider travel credit cards for rewards',
        'Track flight prices for best deals'
      ],
      tips: [
        'Book flights 3-4 months in advance',
        'Consider travel insurance costs',
        'Plan forex needs 2 months ahead'
      ]
    }
  ];

  const progressInsights = {
    totalGoals: financialGoals.length,
    onTrack: financialGoals.filter(g => g.status === 'on-track' || g.status === 'ahead').length,
    totalTargetAmount: financialGoals.reduce((sum, goal) => sum + goal.targetAmount, 0),
    totalCurrentAmount: financialGoals.reduce((sum, goal) => sum + goal.currentAmount, 0),
    monthlyCommitment: financialGoals.reduce((sum, goal) => sum + goal.monthlyContribution, 0),
    averageProgress: Math.round(financialGoals.reduce((sum, goal) => sum + (goal.currentAmount / goal.targetAmount * 100), 0) / financialGoals.length)
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ahead': return 'text-green-600 bg-green-50 border-green-200';
      case 'on-track': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'behind': return 'text-red-600 bg-red-50 border-red-200';
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Security': return 'from-green-400 to-green-600';
      case 'Investment': return 'from-blue-400 to-blue-600';
      case 'Lifestyle': return 'from-purple-400 to-purple-600';
      case 'Education': return 'from-orange-400 to-orange-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getTimeRemaining = (targetDate: string) => {
    const target = new Date(targetDate);
    const now = new Date();
    const diffTime = target.getTime() - now.getTime();
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
    
    if (diffMonths < 0) return 'Overdue';
    if (diffMonths === 0) return 'This month';
    if (diffMonths < 12) return `${diffMonths} months`;
    
    const years = Math.floor(diffMonths / 12);
    const months = diffMonths % 12;
    return months > 0 ? `${years}y ${months}m` : `${years} years`;
  };

  return (
    <div className="space-y-6">
      <div className="fade-in">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
          AI Jar - Goal Planning
        </h1>
        <p className="text-muted-foreground mt-2">
          Smart goal setting, tracking, and achievement with step-by-step plans
        </p>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 slide-up">
        <Card className="widget">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Goals</p>
                <p className="text-2xl font-bold">{progressInsights.totalGoals}</p>
                <p className="text-sm text-green-500">{progressInsights.onTrack} on track</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="widget">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Progress</p>
                <p className="text-2xl font-bold">{progressInsights.averageProgress}%</p>
                <p className="text-sm text-muted-foreground">Across all goals</p>
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
                <p className="text-sm font-medium text-muted-foreground">Target Amount</p>
                <p className="text-2xl font-bold">₹{(progressInsights.totalTargetAmount / 100000).toFixed(1)}L</p>
                <p className="text-sm text-muted-foreground">Total across goals</p>
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
                <p className="text-sm font-medium text-muted-foreground">Monthly SIP</p>
                <p className="text-2xl font-bold">₹{(progressInsights.monthlyCommitment / 1000).toFixed(0)}K</p>
                <p className="text-sm text-muted-foreground">Total commitment</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="goals" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="goals">My Goals</TabsTrigger>
          <TabsTrigger value="progress">Progress Tracking</TabsTrigger>
          <TabsTrigger value="strategies">AI Strategies</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
        </TabsList>

        <TabsContent value="goals" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Active Financial Goals</h3>
            <Button className="flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              Add New Goal
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {financialGoals.map((goal) => (
              <Card key={goal.id} className="widget">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getCategoryColor(goal.category)} flex items-center justify-center text-white mr-3`}>
                        {goal.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{goal.title}</CardTitle>
                        <CardDescription>{goal.description}</CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(goal.status)}>
                        {goal.status.replace('-', ' ')}
                      </Badge>
                      <Badge className={`${getPriorityColor(goal.priority)} mt-1`}>
                        {goal.priority}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>₹{(goal.currentAmount / 100000).toFixed(1)}L / ₹{(goal.targetAmount / 100000).toFixed(1)}L</span>
                      </div>
                      <Progress value={(goal.currentAmount / goal.targetAmount) * 100} className="h-3" />
                      <p className="text-xs text-muted-foreground mt-1">
                        {Math.round((goal.currentAmount / goal.targetAmount) * 100)}% completed
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Monthly SIP</p>
                        <p className="font-semibold">₹{(goal.monthlyContribution / 1000).toFixed(0)}K</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Time Remaining</p>
                        <p className="font-semibold">{getTimeRemaining(goal.targetDate)}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Target: {new Date(goal.targetDate).toLocaleDateString()}</span>
                      <span className={goal.category}>{goal.category}</span>
                    </div>

                    <Button variant="outline" size="sm" className="w-full">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <Card className="widget">
            <CardHeader>
              <CardTitle>Goal Progress Overview</CardTitle>
              <CardDescription>
                Track your progress across all financial goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {financialGoals.map((goal) => (
                  <div key={goal.id} className="p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getCategoryColor(goal.category)} flex items-center justify-center text-white mr-3`}>
                          {goal.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold">{goal.title}</h4>
                          <p className="text-sm text-muted-foreground">Target: {new Date(goal.targetDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">
                          {Math.round((goal.currentAmount / goal.targetAmount) * 100)}%
                        </p>
                        <Badge className={getStatusColor(goal.status)}>
                          {goal.status.replace('-', ' ')}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Progress value={(goal.currentAmount / goal.targetAmount) * 100} className="h-2" />
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Current</p>
                          <p className="font-semibold">₹{(goal.currentAmount / 100000).toFixed(1)}L</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Monthly SIP</p>
                          <p className="font-semibold">₹{(goal.monthlyContribution / 1000).toFixed(0)}K</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Remaining</p>
                          <p className="font-semibold">₹{((goal.targetAmount - goal.currentAmount) / 100000).toFixed(1)}L</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strategies" className="space-y-6">
          <Card className="widget">
            <CardHeader>
              <CardTitle>AI-Powered Goal Strategies</CardTitle>
              <CardDescription>
                Personalized strategies to achieve your financial goals faster
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {goalStrategies.map((strategy) => {
                  const goal = financialGoals.find(g => g.id === strategy.goalId);
                  if (!goal) return null;
                  
                  return (
                    <div key={strategy.goalId} className="p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center mb-4">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getCategoryColor(goal.category)} flex items-center justify-center text-white mr-3`}>
                          {goal.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold">{goal.title}</h4>
                          <p className="text-sm text-muted-foreground">AI-optimized strategy</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-medium mb-3 text-blue-800">Recommended Strategies</h5>
                          <ul className="space-y-2">
                            {strategy.strategies.map((item, index) => (
                              <li key={index} className="flex items-start text-sm">
                                <CheckCircle className="w-3 h-3 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h5 className="font-medium mb-3 text-green-800">Pro Tips</h5>
                          <ul className="space-y-2">
                            {strategy.tips.map((tip, index) => (
                              <li key={index} className="flex items-start text-sm">
                                <Star className="w-3 h-3 mr-2 mt-0.5 text-yellow-500 flex-shrink-0" />
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="milestones" className="space-y-6">
          <Card className="widget">
            <CardHeader>
              <CardTitle>Milestone Tracking</CardTitle>
              <CardDescription>
                Celebrate achievements and track progress milestones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {financialGoals.map((goal) => (
                  <div key={goal.id} className="p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center mb-4">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getCategoryColor(goal.category)} flex items-center justify-center text-white mr-3`}>
                        {goal.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold">{goal.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {goal.milestones.filter(m => m.completed).length} of {goal.milestones.length} milestones completed
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {goal.milestones.map((milestone, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                          <div className="flex items-center">
                            {milestone.completed ? (
                              <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                            ) : (
                              <Clock className="w-5 h-5 text-gray-400 mr-3" />
                            )}
                            <div>
                              <p className="font-medium">₹{(milestone.amount / 100000).toFixed(1)}L</p>
                              <p className="text-sm text-muted-foreground">
                                Target: {new Date(milestone.date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            {milestone.completed ? (
                              <Badge className="text-green-600 bg-green-50 border-green-200">
                                Completed
                              </Badge>
                            ) : (
                              <Badge className="text-gray-600 bg-gray-50 border-gray-200">
                                Pending
                              </Badge>
                            )}
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
      </Tabs>
    </div>
  );
};

export default GoalPlanning; 