import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  PiggyBank,
  TrendingUp,
  Calculator,
  Target,
  Zap,
  DollarSign,
  Calendar,
  Percent,
  AlertCircle,
  CheckCircle2,
  Plus
} from 'lucide-react';

interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  monthlyContribution: number;
  category: string;
}

interface SavingsAccount {
  id: string;
  name: string;
  balance: number;
  interestRate: number;
  type: string;
  monthlyGrowth: number;
}

const SavingsBooster = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalAmount, setNewGoalAmount] = useState('');
  const [newGoalDeadline, setNewGoalDeadline] = useState('');
  const [calculatorAmount, setCalculatorAmount] = useState('10000');
  const [calculatorRate, setCalculatorRate] = useState('3.5');
  const [calculatorYears, setCalculatorYears] = useState('5');
  const [goalLoading, setGoalLoading] = useState(false);
  const [goalSuccess, setGoalSuccess] = useState('');
  const [calcError, setCalcError] = useState('');
  const [hoveredGoal, setHoveredGoal] = useState<string | null>(null);
  const [hoveredAccount, setHoveredAccount] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  // Demo data
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([
    {
      id: '1',
      name: 'Emergency Fund',
      targetAmount: 150000,
      currentAmount: 75000,
      deadline: '2024-12-31',
      monthlyContribution: 5000,
      category: 'Emergency'
    },
    {
      id: '2',
      name: 'Dubai Marina Apartment',
      targetAmount: 500000,
      currentAmount: 185000,
      deadline: '2026-06-30',
      monthlyContribution: 12000,
      category: 'Real Estate'
    },
    {
      id: '3',
      name: 'Family Vacation',
      targetAmount: 25000,
      currentAmount: 18500,
      deadline: '2024-07-15',
      monthlyContribution: 2000,
      category: 'Travel'
    },
    {
      id: '4',
      name: 'Investment Capital',
      targetAmount: 200000,
      currentAmount: 45000,
      deadline: '2025-12-31',
      monthlyContribution: 8000,
      category: 'Investment'
    }
  ]);

  const [savingsAccounts, setSavingsAccounts] = useState<SavingsAccount[]>([
    {
      id: '1',
      name: 'ADCB High Yield Savings',
      balance: 125000,
      interestRate: 3.5,
      type: 'High Yield',
      monthlyGrowth: 365
    },
    {
      id: '2',
      name: 'Emirates NBD Islamic Savings',
      balance: 85000,
      interestRate: 2.8,
      type: 'Islamic',
      monthlyGrowth: 198
    },
    {
      id: '3',
      name: 'Mashreq Digital Savings',
      balance: 45000,
      interestRate: 4.2,
      type: 'Digital',
      monthlyGrowth: 157
    }
  ]);

  const totalSavings = savingsAccounts.reduce((sum, account) => sum + account.balance, 0);
  const totalMonthlyGrowth = savingsAccounts.reduce((sum, account) => sum + account.monthlyGrowth, 0);
  const totalGoalAmount = savingsGoals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const totalCurrentAmount = savingsGoals.reduce((sum, goal) => sum + goal.currentAmount, 0);

  const addSavingsGoal = async () => {
    if (!newGoalName || !newGoalAmount || !newGoalDeadline) {
      setGoalSuccess('Please fill in all fields');
      return;
    }

    setGoalLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newGoal: SavingsGoal = {
      id: Date.now().toString(),
      name: newGoalName,
      targetAmount: parseFloat(newGoalAmount),
      currentAmount: 0,
      deadline: newGoalDeadline,
      monthlyContribution: parseFloat(newGoalAmount) / 12,
      category: 'Custom'
    };

    setSavingsGoals(prev => [...prev, newGoal]);
    setNewGoalName('');
    setNewGoalAmount('');
    setNewGoalDeadline('');
    setGoalLoading(false);
    setGoalSuccess('Goal added successfully! 🎉');
    
    setTimeout(() => setGoalSuccess(''), 3000);
  };

  const calculateCompoundInterest = () => {
    const amount = parseFloat(calculatorAmount);
    const rate = parseFloat(calculatorRate);
    const years = parseFloat(calculatorYears);

    if (isNaN(amount) || isNaN(rate) || isNaN(years) || amount <= 0 || rate <= 0 || years <= 0) {
      return { result: 0, hasError: true };
    }

    const result = amount * Math.pow(1 + rate / 100, years);
    return { result, hasError: false };
  };

  const getGoalProgress = (goal: SavingsGoal) => {
    return (goal.currentAmount / goal.targetAmount) * 100;
  };

  const getGoalStatus = (goal: SavingsGoal) => {
    const progress = getGoalProgress(goal);
    if (progress >= 100) return { status: 'Completed', color: 'bg-green-100 text-green-800' };
    if (progress >= 75) return { status: 'On Track', color: 'bg-blue-100 text-blue-800' };
    if (progress >= 50) return { status: 'Good Progress', color: 'bg-yellow-100 text-yellow-800' };
    return { status: 'Getting Started', color: 'bg-gray-100 text-gray-800' };
  };

  const contributeTo = (goalId: string, amount: number) => {
    setSavingsGoals(prev => prev.map(goal => 
      goal.id === goalId 
        ? { ...goal, currentAmount: Math.min(goal.currentAmount + amount, goal.targetAmount) }
        : goal
    ));
  };

  const compoundResult = useMemo(() => {
    const result = calculateCompoundInterest();
    if (result.hasError) {
      setCalcError('Please enter valid positive numbers for all fields.');
    } else {
      setCalcError('');
    }
    return result;
  }, [calculatorAmount, calculatorRate, calculatorYears]);

  const handleGoalHover = (goalId: string) => {
    setHoveredGoal(goalId);
  };

  const handleAccountHover = (accountId: string) => {
    setHoveredAccount(accountId);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-200 rounded-lg"></div>
            <div className="h-96 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-color-primary">Savings Booster</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">Maximize your savings with smart strategies</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            onClick={() => setSelectedTab('calculator')}
            className="button-finera text-sm sm:text-base"
            variant="outline"
          >
            <Calculator className="w-4 h-4 mr-2" />
            Calculator
          </Button>
          <Button 
            onClick={() => setSelectedTab('add-goal')}
            className="button-finera-primary text-sm sm:text-base"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Goal
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
        <Card className="feature-card transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-gray-600">Total Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <PiggyBank className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600 mr-1 transition-transform duration-300 hover:scale-110" />
              <span className="text-lg sm:text-2xl font-bold">AED {totalSavings.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="feature-card transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-gray-600">Monthly Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 mr-1 transition-transform duration-300 hover:scale-110" />
              <span className="text-lg sm:text-2xl font-bold text-green-600">+AED {totalMonthlyGrowth.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="feature-card transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-gray-600">Goals Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Target className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 mr-1 transition-transform duration-300 hover:scale-110" />
              <span className="text-lg sm:text-2xl font-bold">
                {((totalCurrentAmount / totalGoalAmount) * 100).toFixed(1)}%
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600">Overall completion</p>
          </CardContent>
        </Card>

        <Card className="feature-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-gray-600">Annual Yield</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Percent className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600 mr-1" />
              <span className="text-lg sm:text-2xl font-bold text-purple-600">3.5%</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600">Average rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-1 bg-gray-100 p-1 rounded-lg w-fit">
        {['overview', 'goals', 'accounts', 'calculator', 'add-goal'].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-2 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <Card className="feature-card">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Savings Goals</CardTitle>
              <CardDescription className="text-sm sm:text-base">Track your financial objectives</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {savingsGoals.slice(0, 4).map((goal) => {
                  const progress = getGoalProgress(goal);
                  const status = getGoalStatus(goal);
                  return (
                    <div key={goal.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm sm:text-base">{goal.name}</span>
                        <Badge variant="outline" className={`${status.color} text-xs sm:text-sm`}>
                          <Target className="w-3 h-3 mr-1" />
                          {status.status}
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

          <Card className="feature-card transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Savings Accounts</CardTitle>
              <CardDescription className="text-sm sm:text-base">Your earning accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {savingsAccounts.map((account) => (
                  <div 
                    key={account.id} 
                    className={`flex items-center justify-between p-3 bg-gray-50 rounded-lg transition-all duration-300 hover:bg-gray-100 hover:shadow-sm cursor-pointer ${
                      hoveredAccount === account.id ? 'ring-2 ring-blue-200' : ''
                    }`}
                    onMouseEnter={() => handleAccountHover(account.id)}
                    onMouseLeave={() => setHoveredAccount(null)}
                  >
                    <div>
                      <p className="font-medium text-sm sm:text-base">{account.name}</p>
                      <p className="text-xs sm:text-sm text-gray-600">{account.type} • {account.interestRate}% APY</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm sm:text-base">AED {account.balance.toLocaleString()}</p>
                      <p className="text-xs sm:text-sm text-green-600">+AED {account.monthlyGrowth}/mo</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {selectedTab === 'goals' && (
        <Card className="feature-card">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Savings Goals</CardTitle>
            <CardDescription className="text-sm sm:text-base">Manage and track your financial objectives</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {savingsGoals.map((goal) => {
                const progress = getGoalProgress(goal);
                const status = getGoalStatus(goal);
                const daysLeft = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                
                return (
                  <Card 
                    key={goal.id} 
                    className={`border-l-4 border-l-emerald-500 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer ${
                      hoveredGoal === goal.id ? 'ring-2 ring-emerald-200' : ''
                    }`}
                    onMouseEnter={() => handleGoalHover(goal.id)}
                    onMouseLeave={() => setHoveredGoal(null)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base sm:text-lg">{goal.name}</CardTitle>
                        <Badge variant="outline" className="text-xs sm:text-sm">{goal.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-xs sm:text-sm text-gray-600">Progress</span>
                          <span className="font-semibold text-sm sm:text-base">{progress.toFixed(1)}%</span>
                        </div>
                        <Progress value={Math.min(progress, 100)} className="h-3 progress-animate" />
                        <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                          <div>
                            <span className="text-gray-600">Current</span>
                            <p className="font-semibold">AED {goal.currentAmount.toLocaleString()}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Target</span>
                            <p className="font-semibold">AED {goal.targetAmount.toLocaleString()}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Deadline</span>
                            <p className="font-semibold">{daysLeft} days</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Status</span>
                            <Badge variant="outline" className={`${status.color} text-xs`}>
                              {status.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => contributeTo(goal.id, 1000)}
                            className="flex-1 text-xs sm:text-sm transition-all duration-300 hover:scale-105 hover:shadow-md group"
                          >
                            <span className="group-hover:scale-110 transition-transform duration-200">+AED 1K</span>
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => contributeTo(goal.id, 5000)}
                            className="flex-1 text-xs sm:text-sm transition-all duration-300 hover:scale-105 hover:shadow-md group"
                          >
                            <span className="group-hover:scale-110 transition-transform duration-200">+AED 5K</span>
                          </Button>
                          <Button 
                            size="sm" 
                            className="flex-1 button-finera-primary text-xs sm:text-sm transition-all duration-300 hover:scale-105 hover:shadow-md group"
                            onClick={() => {
                              const amount = prompt('Enter contribution amount (AED):');
                              if (amount && !isNaN(parseFloat(amount))) {
                                contributeTo(goal.id, parseFloat(amount));
                              }
                            }}
                          >
                            <span className="group-hover:scale-110 transition-transform duration-200">Custom</span>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {selectedTab === 'accounts' && (
        <Card className="feature-card">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Savings Accounts</CardTitle>
            <CardDescription className="text-sm sm:text-base">Manage your earning accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 text-xs sm:text-sm">Account</th>
                    <th className="text-left py-3 px-2 text-xs sm:text-sm">Type</th>
                    <th className="text-right py-3 px-2 text-xs sm:text-sm">Balance</th>
                    <th className="text-right py-3 px-2 text-xs sm:text-sm">Interest Rate</th>
                    <th className="text-right py-3 px-2 text-xs sm:text-sm">Monthly Growth</th>
                    <th className="text-center py-3 px-2 text-xs sm:text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {savingsAccounts.map((account) => (
                    <tr key={account.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-2 font-medium text-xs sm:text-sm">{account.name}</td>
                      <td className="py-3 px-2">
                        <Badge variant="outline" className="text-xs">{account.type}</Badge>
                      </td>
                      <td className="py-3 px-2 text-right font-semibold text-xs sm:text-sm">
                        AED {account.balance.toLocaleString()}
                      </td>
                      <td className="py-3 px-2 text-right text-green-600 font-semibold text-xs sm:text-sm">
                        {account.interestRate}%
                      </td>
                      <td className="py-3 px-2 text-right text-green-600 font-semibold text-xs sm:text-sm">
                        +AED {account.monthlyGrowth}
                      </td>
                      <td className="py-3 px-2 text-center">
                        <Button size="sm" variant="outline" className="text-xs">
                          Manage
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedTab === 'calculator' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <Card className="feature-card">
            <CardHeader>
              <CardTitle className="flex items-center text-lg sm:text-xl">
                <Calculator className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Compound Interest Calculator
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">Calculate your savings growth potential</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-xs sm:text-sm font-medium">Initial Amount (AED)</label>
                  <Input
                    placeholder="Enter initial amount"
                    value={calculatorAmount}
                    onChange={(e) => setCalculatorAmount(e.target.value)}
                    type="number"
                    className="text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="text-xs sm:text-sm font-medium">Annual Interest Rate (%)</label>
                  <Input
                    placeholder="Enter interest rate"
                    value={calculatorRate}
                    onChange={(e) => setCalculatorRate(e.target.value)}
                    type="number"
                    step="0.1"
                    className="text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="text-xs sm:text-sm font-medium">Time Period (Years)</label>
                  <Input
                    placeholder="Enter number of years"
                    value={calculatorYears}
                    onChange={(e) => setCalculatorYears(e.target.value)}
                    type="number"
                    className="text-sm sm:text-base"
                  />
                </div>
                {calcError && <div className="text-red-600 text-xs sm:text-sm">{calcError}</div>}
              </div>
            </CardContent>
          </Card>

          <Card className="feature-card">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Calculation Results</CardTitle>
              <CardDescription className="text-sm sm:text-base">Your potential savings growth</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {calcError ? (
                  <div className="text-red-600 text-xs sm:text-sm">{calcError}</div>
                ) : (
                  <>
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                      <div className="flex justify-between items-center">
                        <span className="text-xs sm:text-sm text-green-700">Final Amount</span>
                        <span className="text-lg sm:text-2xl font-bold text-green-800">
                          AED {compoundResult.result.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                      <div className="flex justify-between items-center">
                        <span className="text-xs sm:text-sm text-blue-700">Total Interest Earned</span>
                        <span className="text-base sm:text-xl font-bold text-blue-800">
                          AED {(compoundResult.result - parseFloat(calculatorAmount)).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                      <div className="flex justify-between items-center">
                        <span className="text-xs sm:text-sm text-purple-700">Suggested Monthly Contribution</span>
                        <span className="text-base sm:text-xl font-bold text-purple-800">
                          AED {(parseFloat(calculatorAmount) * (parseFloat(calculatorRate) / 100) / 12).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      <p>
                        By consistently saving and earning {calculatorRate}% annually, 
                        your AED {parseFloat(calculatorAmount).toLocaleString()} will grow to 
                        AED {compoundResult.result.toLocaleString()} in {calculatorYears} years.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {selectedTab === 'add-goal' && (
        <Card className="feature-card max-w-lg mx-auto">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Create New Savings Goal</CardTitle>
            <CardDescription className="text-sm sm:text-base">Set a new financial target to work towards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-xs sm:text-sm font-medium">Goal Name</label>
                <Input
                  placeholder="e.g., New Car, Vacation, Emergency Fund"
                  value={newGoalName}
                  onChange={(e) => setNewGoalName(e.target.value)}
                  className="text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="text-xs sm:text-sm font-medium">Target Amount (AED)</label>
                <Input
                  placeholder="Enter target amount"
                  value={newGoalAmount}
                  onChange={(e) => setNewGoalAmount(e.target.value)}
                  type="number"
                  className="text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="text-xs sm:text-sm font-medium">Target Date</label>
                <Input
                  type="date"
                  value={newGoalDeadline}
                  onChange={(e) => setNewGoalDeadline(e.target.value)}
                  className="text-sm sm:text-base"
                />
              </div>
              <Button 
                onClick={addSavingsGoal}
                className="w-full button-finera-primary text-sm sm:text-base"
                disabled={!newGoalName || !newGoalAmount || !newGoalDeadline || goalLoading}
              >
                {goalLoading ? 'Creating...' : 'Create Savings Goal'}
              </Button>
              {goalSuccess && <div className="text-green-600 text-xs sm:text-sm text-center mt-2">{goalSuccess}</div>}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SavingsBooster;