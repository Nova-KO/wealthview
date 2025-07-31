import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Plus,
  ShoppingCart,
  Car,
  Home,
  Coffee,
  Gamepad2,
  Heart,
  MoreHorizontal,
  AlertTriangle,
  CheckCircle2,
  Target
} from 'lucide-react';

interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  type: 'expense' | 'income';
}

interface Budget {
  category: string;
  budgeted: number;
  spent: number;
  remaining: number;
  percentage: number;
  icon: any;
  color: string;
}

const BudgetManager = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [newExpenseAmount, setNewExpenseAmount] = useState('');
  const [newExpenseCategory, setNewExpenseCategory] = useState('');
  const [newExpenseDescription, setNewExpenseDescription] = useState('');
  const [newBudgetCategory, setNewBudgetCategory] = useState('');
  const [newBudgetAmount, setNewBudgetAmount] = useState('');

  // Demo data
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: '1', amount: 1250, category: 'Food & Dining', description: 'Emirates Mall Food Court', date: '2024-01-15', type: 'expense' },
    { id: '2', amount: 3500, category: 'Transportation', description: 'Petrol - ADNOC', date: '2024-01-14', type: 'expense' },
    { id: '3', amount: 2800, category: 'Shopping', description: 'City Centre Clothing', date: '2024-01-13', type: 'expense' },
    { id: '4', amount: 1200, category: 'Entertainment', description: 'VOX Cinemas Dubai Mall', date: '2024-01-12', type: 'expense' },
    { id: '5', amount: 850, category: 'Healthcare', description: 'Pharmacy - Life Care', date: '2024-01-11', type: 'expense' },
    { id: '6', amount: 15000, category: 'Salary', description: 'Monthly Salary', date: '2024-01-01', type: 'income' },
    { id: '7', amount: 2500, category: 'Freelance', description: 'Consulting Work', date: '2024-01-05', type: 'income' }
  ]);

  const [budgets, setBudgets] = useState<Budget[]>([
    { category: 'Food & Dining', budgeted: 3000, spent: 1250, remaining: 1750, percentage: 41.7, icon: Coffee, color: 'bg-orange-500' },
    { category: 'Transportation', budgeted: 2000, spent: 3500, remaining: -1500, percentage: 175, icon: Car, color: 'bg-blue-500' },
    { category: 'Shopping', budgeted: 4000, spent: 2800, remaining: 1200, percentage: 70, icon: ShoppingCart, color: 'bg-purple-500' },
    { category: 'Entertainment', budgeted: 1500, spent: 1200, remaining: 300, percentage: 80, icon: Gamepad2, color: 'bg-green-500' },
    { category: 'Healthcare', budgeted: 1000, spent: 850, remaining: 150, percentage: 85, icon: Heart, color: 'bg-red-500' },
    { category: 'Housing', budgeted: 8000, spent: 0, remaining: 8000, percentage: 0, icon: Home, color: 'bg-yellow-500' }
  ]);

  const totalBudgeted = budgets.reduce((sum, budget) => sum + budget.budgeted, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
  const totalRemaining = totalBudgeted - totalSpent;
  const totalIncome = expenses.filter(e => e.type === 'income').reduce((sum, e) => sum + e.amount, 0);

  const categories = ['Food & Dining', 'Transportation', 'Shopping', 'Entertainment', 'Healthcare', 'Housing', 'Utilities', 'Education'];

  const addExpense = () => {
    if (newExpenseAmount && newExpenseCategory && newExpenseDescription) {
      const newExpense: Expense = {
        id: Date.now().toString(),
        amount: parseFloat(newExpenseAmount),
        category: newExpenseCategory,
        description: newExpenseDescription,
        date: new Date().toISOString().split('T')[0],
        type: 'expense'
      };

      setExpenses([newExpense, ...expenses]);
      
      // Update budget
      const updatedBudgets = budgets.map(budget => {
        if (budget.category === newExpenseCategory) {
          const newSpent = budget.spent + parseFloat(newExpenseAmount);
          return {
            ...budget,
            spent: newSpent,
            remaining: budget.budgeted - newSpent,
            percentage: (newSpent / budget.budgeted) * 100
          };
        }
        return budget;
      });
      setBudgets(updatedBudgets);

      setNewExpenseAmount('');
      setNewExpenseCategory('');
      setNewExpenseDescription('');
      alert(`Expense of AED ${newExpenseAmount} added to ${newExpenseCategory}!`);
    }
  };

  const addBudget = () => {
    if (newBudgetCategory && newBudgetAmount) {
      const existingBudgetIndex = budgets.findIndex(b => b.category === newBudgetCategory);
      const amount = parseFloat(newBudgetAmount);
      
      if (existingBudgetIndex >= 0) {
        // Update existing budget
        const updatedBudgets = [...budgets];
        const existing = updatedBudgets[existingBudgetIndex];
        updatedBudgets[existingBudgetIndex] = {
          ...existing,
          budgeted: amount,
          remaining: amount - existing.spent,
          percentage: (existing.spent / amount) * 100
        };
        setBudgets(updatedBudgets);
      } else {
        // Add new budget
        const newBudget: Budget = {
          category: newBudgetCategory,
          budgeted: amount,
          spent: 0,
          remaining: amount,
          percentage: 0,
          icon: MoreHorizontal,
          color: 'bg-gray-500'
        };
        setBudgets([...budgets, newBudget]);
      }

      setNewBudgetCategory('');
      setNewBudgetAmount('');
      alert(`Budget set for ${newBudgetCategory}: AED ${newBudgetAmount}`);
    }
  };

  const getBudgetStatus = (percentage: number) => {
    if (percentage >= 100) return { color: 'text-red-600', status: 'Over Budget', icon: AlertTriangle };
    if (percentage >= 80) return { color: 'text-amber-600', status: 'Near Limit', icon: AlertTriangle };
    return { color: 'text-green-600', status: 'On Track', icon: CheckCircle2 };
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return 'bg-red-500';
    if (percentage >= 80) return 'bg-amber-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-color-primary">Budget Manager</h1>
          <p className="text-gray-600 mt-1">Track expenses and manage your budgets</p>
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={() => setSelectedTab('add-expense')}
            className="button-finera"
            variant="outline"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Expense
          </Button>
          <Button 
            onClick={() => setSelectedTab('set-budget')}
            className="button-finera-primary"
          >
            <Target className="w-4 h-4 mr-2" />
            Set Budget
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="feature-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-2xl font-bold text-green-600">AED {totalIncome.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="feature-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
              <span className="text-2xl font-bold text-red-600">AED {totalSpent.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="feature-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Budget Remaining</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Wallet className="w-4 h-4 text-blue-600 mr-1" />
              <span className={`text-2xl font-bold ${totalRemaining >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                AED {totalRemaining.toLocaleString()}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="feature-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Savings Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold text-emerald-600">
              {((totalIncome - totalSpent) / totalIncome * 100).toFixed(1)}%
            </span>
            <p className="text-sm text-gray-600">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        {['overview', 'budgets', 'expenses', 'add-expense', 'set-budget'].map((tab) => (
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
              <CardTitle>Budget Overview</CardTitle>
              <CardDescription>Your spending vs budget by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {budgets.slice(0, 5).map((budget, index) => {
                  const status = getBudgetStatus(budget.percentage);
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <budget.icon className="w-4 h-4" />
                          <span className="font-medium">{budget.category}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-semibold">AED {budget.spent.toLocaleString()}</span>
                          <span className="text-gray-500"> / {budget.budgeted.toLocaleString()}</span>
                        </div>
                      </div>
                      <Progress 
                        value={Math.min(budget.percentage, 100)} 
                        className="h-2"
                      />
                      <div className="flex justify-between items-center">
                        <Badge variant="outline" className={status.color}>
                          <status.icon className="w-3 h-3 mr-1" />
                          {status.status}
                        </Badge>
                        <span className="text-sm text-gray-600">
                          {budget.percentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="feature-card">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Latest expenses and income</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {expenses.slice(0, 6).map((expense) => (
                  <div key={expense.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{expense.description}</p>
                      <p className="text-sm text-gray-600">{expense.category} • {expense.date}</p>
                    </div>
                    <span className={`font-semibold ${
                      expense.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {expense.type === 'income' ? '+' : '-'}AED {expense.amount.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {selectedTab === 'budgets' && (
        <Card className="feature-card">
          <CardHeader>
            <CardTitle>Budget Categories</CardTitle>
            <CardDescription>Manage your spending limits by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {budgets.map((budget, index) => {
                const status = getBudgetStatus(budget.percentage);
                return (
                  <Card key={index} className="border-l-4" style={{ borderLeftColor: budget.color.replace('bg-', '#') }}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-2">
                        <budget.icon className="w-5 h-5" />
                        <CardTitle className="text-lg">{budget.category}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Spent</span>
                          <span className="font-semibold">AED {budget.spent.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Budget</span>
                          <span className="font-semibold">AED {budget.budgeted.toLocaleString()}</span>
                        </div>
                        <Progress value={Math.min(budget.percentage, 100)} className="h-3" />
                        <div className="flex justify-between items-center">
                          <Badge variant="outline" className={status.color}>
                            {status.status}
                          </Badge>
                          <span className={`font-semibold ${budget.remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            AED {budget.remaining.toLocaleString()} left
                          </span>
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

      {selectedTab === 'expenses' && (
        <Card className="feature-card">
          <CardHeader>
            <CardTitle>All Transactions</CardTitle>
            <CardDescription>Complete transaction history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2">Date</th>
                    <th className="text-left py-3 px-2">Description</th>
                    <th className="text-left py-3 px-2">Category</th>
                    <th className="text-right py-3 px-2">Amount</th>
                    <th className="text-center py-3 px-2">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((expense) => (
                    <tr key={expense.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-2">{expense.date}</td>
                      <td className="py-3 px-2 font-medium">{expense.description}</td>
                      <td className="py-3 px-2">{expense.category}</td>
                      <td className={`py-3 px-2 text-right font-semibold ${
                        expense.type === 'income' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {expense.type === 'income' ? '+' : '-'}AED {expense.amount.toLocaleString()}
                      </td>
                      <td className="py-3 px-2 text-center">
                        <Badge variant={expense.type === 'income' ? 'default' : 'secondary'}>
                          {expense.type}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedTab === 'add-expense' && (
        <Card className="feature-card max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>Add New Expense</CardTitle>
            <CardDescription>Record a new expense or income</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Amount (AED)</label>
                <Input
                  placeholder="Enter amount"
                  value={newExpenseAmount}
                  onChange={(e) => setNewExpenseAmount(e.target.value)}
                  type="number"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Category</label>
                <Select value={newExpenseCategory} onValueChange={setNewExpenseCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Input
                  placeholder="Enter description"
                  value={newExpenseDescription}
                  onChange={(e) => setNewExpenseDescription(e.target.value)}
                />
              </div>
              <Button 
                onClick={addExpense}
                className="w-full button-finera-primary"
                disabled={!newExpenseAmount || !newExpenseCategory || !newExpenseDescription}
              >
                Add Expense
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedTab === 'set-budget' && (
        <Card className="feature-card max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>Set Budget</CardTitle>
            <CardDescription>Create or update budget for a category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Category</label>
                <Select value={newBudgetCategory} onValueChange={setNewBudgetCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Budget Amount (AED)</label>
                <Input
                  placeholder="Enter budget amount"
                  value={newBudgetAmount}
                  onChange={(e) => setNewBudgetAmount(e.target.value)}
                  type="number"
                />
              </div>
              <Button 
                onClick={addBudget}
                className="w-full button-finera-primary"
                disabled={!newBudgetCategory || !newBudgetAmount}
              >
                Set Budget
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BudgetManager;