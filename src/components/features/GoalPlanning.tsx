import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import {
  Target,
  TrendingUp,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  Home,
  Car,
  Plane,
  GraduationCap,
  Heart,
  Trophy,
  Star,
  Plus,
  AlertCircle,
  Calculator,
  Zap
} from 'lucide-react';

const GoalPlanning = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalAmount, setNewGoalAmount] = useState('');
  const [newGoalDate, setNewGoalDate] = useState('');
  const [goalLoading, setGoalLoading] = useState(false);
  const [goalSuccess, setGoalSuccess] = useState('');
  const [calcAmount, setCalcAmount] = useState('');
  const [calcYears, setCalcYears] = useState('');
  const [calcReturn, setCalcReturn] = useState('');
  const [calcError, setCalcError] = useState('');
  const [calcResult, setCalcResult] = useState<{monthly: number, total: number, interest: number} | null>(null);

  const [financialGoals, setFinancialGoals] = useState([
    {
      id: 1,
      title: 'Emergency Fund',
      description: '6-12 months of living expenses in UAE',
      category: 'Security',
      icon: Heart,
      targetAmount: 180000,
      currentAmount: 135000,
      monthlyContribution: 4500,
      targetDate: '2024-12-31',
      priority: 'high',
      status: 'on-track'
    },
    {
      id: 2,
      title: 'Dubai Marina Apartment',
      description: '20% down payment for AED 2.5M property',
      category: 'Investment',
      icon: Home,
      targetAmount: 500000,
      currentAmount: 250000,
      monthlyContribution: 15000,
      targetDate: '2025-08-31',
      priority: 'high',
      status: 'behind'
    },
    {
      id: 3,
      title: 'Family Vacation to Europe',
      description: '15-day luxury trip for family of 4',
      category: 'Lifestyle',
      icon: Plane,
      targetAmount: 85000,
      currentAmount: 45000,
      monthlyContribution: 3500,
      targetDate: '2024-09-30',
      priority: 'medium',
      status: 'on-track'
    },
    {
      id: 4,
      title: 'Children Education Fund',
      description: 'University education fund for 2 children',
      category: 'Education',
      icon: GraduationCap,
      targetAmount: 750000,
      currentAmount: 85000,
      monthlyContribution: 5500,
      targetDate: '2035-06-30',
      priority: 'medium',
      status: 'on-track'
    },
    {
      id: 5,
      title: 'Luxury Car Purchase',
      description: 'Mercedes-Benz GLE 450 purchase',
      category: 'Lifestyle',
      icon: Car,
      targetAmount: 320000,
      currentAmount: 185000,
      monthlyContribution: 6000,
      targetDate: '2025-03-31',
      priority: 'low',
      status: 'ahead'
    }
  ]);

  const addGoal = async () => {
    if (newGoalName && newGoalAmount && newGoalDate) {
      setGoalLoading(true);
      setGoalSuccess('');
      await new Promise(res => setTimeout(res, 1000));
      const newGoal = {
        id: Date.now(),
        title: newGoalName,
        description: `Custom goal: ${newGoalName}`,
        category: 'Personal',
        icon: Target,
        targetAmount: parseFloat(newGoalAmount),
        currentAmount: 0,
        monthlyContribution: 0,
        targetDate: newGoalDate,
        priority: 'medium',
        status: 'on-track'
      };
      setFinancialGoals([...financialGoals, newGoal]);
      setNewGoalName('');
      setNewGoalAmount('');
      setNewGoalDate('');
      setGoalLoading(false);
      setGoalSuccess(`Goal "${newGoal.title}" created successfully! Start contributing to reach your target.`);
    }
  };

  const contributeToGoal = (goalId: number, amount: number) => {
    const updatedGoals = financialGoals.map(goal => 
      goal.id === goalId 
        ? { ...goal, currentAmount: goal.currentAmount + amount }
        : goal
    );
    setFinancialGoals(updatedGoals);
    alert(`AED ${amount.toLocaleString()} contributed successfully!`);
  };

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

  const handleGoalCalculator = (e: React.FormEvent) => {
    e.preventDefault();
    setCalcError('');
    setCalcResult(null);
    const amount = parseFloat(calcAmount);
    const years = parseFloat(calcYears);
    const rate = parseFloat(calcReturn) / 100;
    if (isNaN(amount) || isNaN(years) || isNaN(rate) || amount <= 0 || years <= 0 || rate < 0) {
      setCalcError('Please enter valid positive numbers for all fields.');
      return;
    }
    // Formula for monthly contribution: FV = P * [((1 + r)^n - 1) / r], solve for P
    // FV = amount, n = years*12, r = rate/12
    const n = years * 12;
    const r = rate / 12;
    let monthly = 0;
    if (r > 0) {
      monthly = amount * r / (Math.pow(1 + r, n) - 1);
    } else {
      monthly = amount / n;
    }
    const total = monthly * n;
    const interest = total - amount;
    setCalcResult({ monthly, total, interest });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-color-primary">Goal Planning</h1>
          <p className="text-gray-600 mt-1">Set and achieve your financial goals with AI-powered planning</p>
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={() => setSelectedTab('add-goal')}
            className="button-finera"
            variant="outline"
          >
            <Calculator className="w-4 h-4 mr-2" />
            Goal Calculator
          </Button>
          <Button 
            onClick={() => setSelectedTab('add-goal')}
            className="button-finera-primary"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Goal
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="feature-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Target className="w-4 h-4 text-blue-600 mr-1" />
              <span className="text-2xl font-bold">{progressInsights.totalGoals}</span>
            </div>
            <p className="text-sm text-gray-600">{progressInsights.onTrack} on track</p>
          </CardContent>
        </Card>

        <Card className="feature-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Average Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-2xl font-bold text-green-600">{progressInsights.averageProgress}%</span>
            </div>
            <p className="text-sm text-gray-600">Across all goals</p>
          </CardContent>
        </Card>

        <Card className="feature-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Target Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="w-4 h-4 text-purple-600 mr-1" />
              <span className="text-2xl font-bold">AED {progressInsights.totalTargetAmount.toLocaleString()}</span>
            </div>
            <p className="text-sm text-gray-600">Total across goals</p>
          </CardContent>
        </Card>

        <Card className="feature-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Monthly Commitment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 text-emerald-600 mr-1" />
              <span className="text-2xl font-bold">AED {progressInsights.monthlyCommitment.toLocaleString()}</span>
            </div>
            <p className="text-sm text-gray-600">Total monthly</p>
          </CardContent>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        {['overview', 'goals', 'add-goal', 'goal-calculator'].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              selectedTab === tab
                ? 'bg-white text-emerald-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {selectedTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="feature-card">
            <CardHeader>
              <CardTitle>Goal Progress Overview</CardTitle>
              <CardDescription>Track your progress across all financial goals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {financialGoals.slice(0, 4).map((goal) => {
                  const progress = (goal.currentAmount / goal.targetAmount) * 100;
                  const IconComponent = goal.icon;
                  return (
                    <div key={goal.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <IconComponent className="w-4 h-4" />
                          <span className="font-medium">{goal.title}</span>
                        </div>
                        <Badge variant="outline" className={getStatusColor(goal.status)}>
                          {goal.status.replace('-', ' ')}
                        </Badge>
                      </div>
                      <Progress value={Math.min(progress, 100)} className="h-2" />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>AED {goal.currentAmount.toLocaleString()}</span>
                        <span>AED {goal.targetAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="feature-card">
            <CardHeader>
              <CardTitle>AI Recommendations</CardTitle>
              <CardDescription>Smart suggestions for faster goal achievement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <p className="text-sm text-blue-800">
                    Increase your Emergency Fund contribution by AED 500/month to reach your target 2 months earlier.
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <p className="text-sm text-green-800">
                    Your Dubai Marina apartment goal is behind schedule. Consider reallocating funds from lower priority goals.
                  </p>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg border-l-4 border-amber-500">
                  <p className="text-sm text-amber-800">
                    You're ahead on your car purchase goal! Consider redirecting excess funds to education savings.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {selectedTab === 'goals' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {financialGoals.map((goal) => {
            const progress = (goal.currentAmount / goal.targetAmount) * 100;
            const IconComponent = goal.icon;
            const daysLeft = Math.ceil((new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
            
            return (
              <Card key={goal.id} className="feature-card border-l-4 border-l-blue-500">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                      <div>
                        <CardTitle className="text-lg">{goal.title}</CardTitle>
                        <Badge variant="outline">{goal.category}</Badge>
                      </div>
                    </div>
                    <Badge variant="outline" className={getStatusColor(goal.status)}>
                      {goal.status.replace('-', ' ')}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">{goal.description}</p>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Progress</span>
                      <span className="font-semibold">{progress.toFixed(1)}%</span>
                    </div>
                    <Progress value={Math.min(progress, 100)} className="h-3" />
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Current</span>
                        <p className="font-semibold">AED {goal.currentAmount.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Target</span>
                        <p className="font-semibold">AED {goal.targetAmount.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Days Left</span>
                        <p className="font-semibold">{daysLeft > 0 ? daysLeft : 'Overdue'}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Monthly</span>
                        <p className="font-semibold">AED {goal.monthlyContribution.toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => contributeToGoal(goal.id, 1000)}
                        className="flex-1"
                      >
                        +AED 1K
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => contributeToGoal(goal.id, 5000)}
                        className="flex-1"
                      >
                        +AED 5K
                      </Button>
                      <Button 
                        size="sm" 
                        className="flex-1 button-finera-primary"
                        onClick={() => {
                          const amount = prompt('Enter contribution amount (AED):');
                          if (amount && !isNaN(parseFloat(amount))) {
                            contributeToGoal(goal.id, parseFloat(amount));
                          }
                        }}
                      >
                        Custom
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {selectedTab === 'add-goal' && (
        <Card className="feature-card max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>Create New Financial Goal</CardTitle>
            <CardDescription>Set a new financial target with AI-powered planning</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Goal Name</label>
                <Input
                  placeholder="e.g., Dream Car, House Down Payment, Vacation"
                  value={newGoalName}
                  onChange={(e) => setNewGoalName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Target Amount (AED)</label>
                <Input
                  placeholder="Enter target amount"
                  value={newGoalAmount}
                  onChange={(e) => setNewGoalAmount(e.target.value)}
                  type="number"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Target Date</label>
                <Input
                  type="date"
                  value={newGoalDate}
                  onChange={(e) => setNewGoalDate(e.target.value)}
                />
              </div>
              <Button 
                onClick={addGoal}
                className="w-full button-finera-primary"
                disabled={!newGoalName || !newGoalAmount || !newGoalDate || goalLoading}
              >
                {goalLoading ? 'Creating...' : (<><Zap className="w-4 h-4 mr-2" />Create Goal with AI Planning</>)}
              </Button>
              {goalSuccess && <div className="text-green-600 text-sm text-center mt-2">{goalSuccess}</div>}
            </div>
          </CardContent>
        </Card>
      )}
      {selectedTab === 'goal-calculator' && (
        <Card className="feature-card max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>Goal Calculator</CardTitle>
            <CardDescription>Calculate how much to save monthly to reach your goal</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleGoalCalculator} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Goal Amount (AED)</label>
                <Input
                  type="number"
                  value={calcAmount}
                  onChange={e => setCalcAmount(e.target.value)}
                  placeholder="Enter target amount"
                  min={1}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Time Horizon (Years)</label>
                <Input
                  type="number"
                  value={calcYears}
                  onChange={e => setCalcYears(e.target.value)}
                  placeholder="Enter number of years"
                  min={1}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Expected Annual Return (%)</label>
                <Input
                  type="number"
                  value={calcReturn}
                  onChange={e => setCalcReturn(e.target.value)}
                  placeholder="e.g. 5"
                  min={0}
                  required
                />
              </div>
              <Button type="submit" className="w-full button-finera-primary">Calculate</Button>
              {calcError && <div className="text-red-600 text-sm text-center mt-2">{calcError}</div>}
              {calcResult && !calcError && (
                <div className="mt-4 space-y-2">
                  <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <span className="font-semibold">Required Monthly Contribution:</span>
                    <span className="ml-2 text-lg font-bold text-green-700">AED {calcResult.monthly.toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                    <span className="font-semibold">Total Contributed:</span>
                    <span className="ml-2 text-lg font-bold text-blue-700">AED {calcResult.total.toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                    <span className="font-semibold">Total Interest Earned:</span>
                    <span className="ml-2 text-lg font-bold text-purple-700">AED {calcResult.interest.toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
                  </div>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GoalPlanning; 