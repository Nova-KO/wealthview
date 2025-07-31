import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Calendar, CreditCard, Home, Wifi, Zap, Plus, CheckCircle2, AlertTriangle, Info, Trash2 } from 'lucide-react';

const demoCommitments = [
  {
    id: 1,
    name: 'Rent Payment',
    dueDate: '2024-08-01',
    amount: 6500,
    type: 'Housing',
    status: 'upcoming',
    icon: Home,
    recurring: 'Monthly',
    uae: true
  },
  {
    id: 2,
    name: 'Credit Card Bill',
    dueDate: '2024-07-25',
    amount: 3200,
    type: 'Credit Card',
    status: 'due',
    icon: CreditCard,
    recurring: 'Monthly',
    uae: true
  },
  {
    id: 3,
    name: 'Du Internet',
    dueDate: '2024-07-20',
    amount: 399,
    type: 'Utilities',
    status: 'paid',
    icon: Wifi,
    recurring: 'Monthly',
    uae: true
  },
  {
    id: 4,
    name: 'Car Loan EMI',
    dueDate: '2024-07-28',
    amount: 2100,
    type: 'Loan',
    status: 'upcoming',
    icon: Zap,
    recurring: 'Monthly',
    uae: true
  }
];

const aiTips = [
  {
    icon: CheckCircle2,
    color: 'text-green-600',
    title: 'Automate Recurring Payments',
    description: 'Set up auto-pay for rent, utilities, and loans to avoid late fees and improve your credit score.'
  },
  {
    icon: AlertTriangle,
    color: 'text-amber-600',
    title: 'Track Due Dates',
    description: 'Add reminders for all upcoming commitments to your calendar or enable SMS alerts.'
  },
  {
    icon: Info,
    color: 'text-blue-600',
    title: 'Review Subscriptions',
    description: 'Regularly review and cancel unused subscriptions to save money.'
  }
];

const CommitmentAdvisor = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [commitments, setCommitments] = useState(demoCommitments);
  const [newName, setNewName] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newType, setNewType] = useState('');
  const [adding, setAdding] = useState(false);

  const markAsPaid = (id: number) => {
    setCommitments(commitments.map(c => c.id === id ? { ...c, status: 'paid' } : c));
  };

  const deleteCommitment = (id: number) => {
    setCommitments(commitments.filter(c => c.id !== id));
  };

  const addCommitment = () => {
    if (newName && newAmount && newDate && newType) {
      setAdding(true);
      setTimeout(() => {
        setCommitments([
          ...commitments,
          {
            id: Date.now(),
            name: newName,
            dueDate: newDate,
            amount: parseFloat(newAmount),
            type: newType,
            status: 'upcoming',
            icon: Calendar,
            recurring: 'One-time',
            uae: true
          }
        ]);
        setNewName('');
        setNewAmount('');
        setNewDate('');
        setNewType('');
        setAdding(false);
        alert('Commitment added!');
      }, 800);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-color-primary">Commitment Advisor</h1>
          <p className="text-gray-600 mt-1">Plan and track your financial commitments with smart reminders</p>
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={() => setSelectedTab('add')}
            className="button-finera"
            variant="outline"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Commitment
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        {['overview', 'calendar', 'add'].map((tab) => (
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
              <CardTitle>Upcoming Commitments</CardTitle>
              <CardDescription>Your next bills, loans, and subscriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {commitments.filter(c => c.status !== 'paid').map((c) => {
                  const IconComponent = c.icon;
                  return (
                    <div key={c.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <IconComponent className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium">{c.name}</p>
                          <p className="text-xs text-gray-600">{c.type} • {c.recurring}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">AED {c.amount.toLocaleString()}</p>
                        <p className="text-xs text-gray-600">Due: {c.dueDate}</p>
                        <div className="flex gap-2 mt-1">
                          <Button size="sm" variant="outline" onClick={() => markAsPaid(c.id)}>
                            Mark as Paid
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => deleteCommitment(c.id)}>
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="feature-card">
            <CardHeader>
              <CardTitle>AI Tips</CardTitle>
              <CardDescription>Smart reminders and financial advice</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {aiTips.map((tip, idx) => {
                  const IconComponent = tip.icon;
                  return (
                    <div key={idx} className={`flex items-start space-x-3 p-3 rounded-lg border-l-4 bg-gray-50 ${tip.color}` }>
                      <IconComponent className={`w-5 h-5 mt-1 ${tip.color}`} />
                      <div>
                        <p className="font-semibold">{tip.title}</p>
                        <p className="text-sm text-gray-700">{tip.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {selectedTab === 'calendar' && (
        <Card className="feature-card">
          <CardHeader>
            <CardTitle>Commitment Calendar</CardTitle>
            <CardDescription>See all your upcoming and past commitments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 px-2 text-left">Commitment</th>
                    <th className="py-2 px-2 text-left">Type</th>
                    <th className="py-2 px-2 text-right">Amount</th>
                    <th className="py-2 px-2 text-left">Due Date</th>
                    <th className="py-2 px-2 text-left">Status</th>
                    <th className="py-2 px-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {commitments.map((c) => (
                    <tr key={c.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-2 font-semibold flex items-center gap-2">
                        <c.icon className="w-4 h-4 text-blue-600" /> {c.name}
                      </td>
                      <td className="py-2 px-2">{c.type}</td>
                      <td className="py-2 px-2 text-right">AED {c.amount.toLocaleString()}</td>
                      <td className="py-2 px-2">{c.dueDate}</td>
                      <td className="py-2 px-2">
                        <Badge variant="outline" className={c.status === 'paid' ? 'text-green-600' : c.status === 'due' ? 'text-red-600' : 'text-blue-600'}>
                          {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="py-2 px-2 flex gap-2">
                        {c.status !== 'paid' && (
                          <Button size="sm" variant="outline" onClick={() => markAsPaid(c.id)}>
                            Mark as Paid
                          </Button>
                        )}
                        <Button size="sm" variant="ghost" onClick={() => deleteCommitment(c.id)}>
                          <Trash2 className="w-4 h-4 text-red-500" />
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

      {selectedTab === 'add' && (
        <Card className="feature-card max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>Add New Commitment</CardTitle>
            <CardDescription>Track a new bill, loan, or subscription</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Commitment Name</label>
                <Input
                  placeholder="e.g., School Fees, Gym Membership"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Amount (AED)</label>
                <Input
                  placeholder="Enter amount"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  type="number"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Due Date</label>
                <Input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Type</label>
                <Input
                  placeholder="e.g., Loan, Subscription, Utility"
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                />
              </div>
              <Button 
                onClick={addCommitment}
                className="w-full button-finera-primary"
                disabled={adding || !newName || !newAmount || !newDate || !newType}
              >
                <Zap className="w-4 h-4 mr-2" />
                Add Commitment
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CommitmentAdvisor; 