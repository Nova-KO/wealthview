import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  CreditCard,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  Calendar,
  Percent,
  Shield,
  Building2,
  Info
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface CreditCard {
  id: string;
  name: string;
  bank: string;
  balance: number;
  limit: number;
  interestRate: number;
  minPayment: number;
  dueDate: string;
  utilization: number;
}

const CreditManager = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [showCreditReport, setShowCreditReport] = useState(false);
  const [showApplyCard, setShowApplyCard] = useState(false);
  const [applyCardBank, setApplyCardBank] = useState('Emirates NBD');
  const [applyCardName, setApplyCardName] = useState('Platinum');
  const [applyCardLoading, setApplyCardLoading] = useState(false);
  const [applyCardSuccess, setApplyCardSuccess] = useState('');

  // Demo data
  const creditScore = 785;
  const scoreRange = { min: 300, max: 850 };
  const lastMonthScore = 770;

  const [creditCards, setCreditCards] = useState<CreditCard[]>([
    {
      id: '1',
      name: 'Emirates NBD Platinum',
      bank: 'Emirates NBD',
      balance: 8500,
      limit: 50000,
      interestRate: 2.99,
      minPayment: 425,
      dueDate: '2024-02-15',
      utilization: 17
    },
    {
      id: '2',
      name: 'ADCB Touchpoints',
      bank: 'ADCB',
      balance: 3200,
      limit: 25000,
      interestRate: 3.49,
      minPayment: 160,
      dueDate: '2024-02-20',
      utilization: 12.8
    },
    {
      id: '3',
      name: 'FAB Infinite',
      bank: 'First Abu Dhabi Bank',
      balance: 12000,
      limit: 75000,
      interestRate: 2.75,
      minPayment: 600,
      dueDate: '2024-02-18',
      utilization: 16
    }
  ]);

  const totalBalance = creditCards.reduce((sum, card) => sum + card.balance, 0);
  const totalLimit = creditCards.reduce((sum, card) => sum + card.limit, 0);
  const totalMinPayment = creditCards.reduce((sum, card) => sum + card.minPayment, 0);
  const overallUtilization = (totalBalance / totalLimit) * 100;

  const getScoreStatus = () => {
    if (creditScore >= 800) return { color: 'text-green-600', status: 'Excellent', description: 'You have excellent credit!' };
    if (creditScore >= 740) return { color: 'text-blue-600', status: 'Very Good', description: 'Your credit is in great shape' };
    if (creditScore >= 670) return { color: 'text-amber-600', status: 'Good', description: 'Good credit with room to improve' };
    if (creditScore >= 580) return { color: 'text-orange-600', status: 'Fair', description: 'Consider improving your credit' };
    return { color: 'text-red-600', status: 'Poor', description: 'Focus on building better credit' };
  };

  const getUtilizationStatus = (utilization: number) => {
    if (utilization <= 10) return { color: 'text-green-600', status: 'Excellent', icon: CheckCircle2 };
    if (utilization <= 30) return { color: 'text-blue-600', status: 'Good', icon: CheckCircle2 };
    if (utilization <= 50) return { color: 'text-amber-600', status: 'Fair', icon: AlertTriangle };
    return { color: 'text-red-600', status: 'High', icon: AlertTriangle };
  };

  const payCard = (cardId: string, amount: number) => {
    const updatedCards = creditCards.map(card => 
      card.id === cardId 
        ? { 
            ...card, 
            balance: Math.max(0, card.balance - amount),
            utilization: Math.max(0, ((card.balance - amount) / card.limit) * 100)
          }
        : card
    );
    setCreditCards(updatedCards);
    alert(`Payment of AED ${amount.toLocaleString()} processed successfully!`);
  };

  const handleApplyCard = async (e: React.FormEvent) => {
    e.preventDefault();
    setApplyCardLoading(true);
    setApplyCardSuccess('');
    await new Promise(res => setTimeout(res, 1200));
    setApplyCardLoading(false);
    setApplyCardSuccess('Your credit card application has been submitted!');
  };

  const scoreStatus = getScoreStatus();
  const utilizationStatus = getUtilizationStatus(overallUtilization);

  return (
    <div className="space-y-6">
      {/* Header */}
          <div className="flex items-center justify-between">
                <div>
          <h1 className="text-3xl font-bold text-color-primary">Credit Manager</h1>
          <p className="text-gray-600 mt-1">Monitor and improve your credit health in UAE</p>
                </div>
        <div className="flex gap-3">
          <Button 
            className="button-finera"
            variant="outline"
            onClick={() => setShowCreditReport(true)}
          >
            <Shield className="w-4 h-4 mr-2" />
            Credit Report
          </Button>
          <Button className="button-finera-primary" onClick={() => setShowApplyCard(true)}>
            <Building2 className="w-4 h-4 mr-2" />
            Apply for Card
          </Button>
              </div>
            </div>
            
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="feature-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Credit Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <span className={`text-3xl font-bold ${scoreStatus.color}`}>{creditScore}</span>
                <div className="flex items-center mt-1">
                  {creditScore > lastMonthScore ? (
                    <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                  )}
                  <span className={`text-sm ${creditScore > lastMonthScore ? 'text-green-600' : 'text-red-600'}`}>
                    {creditScore > lastMonthScore ? '+' : ''}{creditScore - lastMonthScore} pts
                  </span>
                </div>
              </div>
              <Badge variant="outline" className={scoreStatus.color}>
                {scoreStatus.status}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="feature-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CreditCard className="w-4 h-4 text-red-600 mr-1" />
              <span className="text-2xl font-bold text-red-600">AED {totalBalance.toLocaleString()}</span>
            </div>
            <p className="text-sm text-gray-600">of AED {totalLimit.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="feature-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Credit Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Percent className="w-4 h-4 text-amber-600 mr-1" />
              <span className={`text-2xl font-bold ${utilizationStatus.color}`}>
                {overallUtilization.toFixed(1)}%
              </span>
            </div>
            <Badge variant="outline" className={utilizationStatus.color}>
              {utilizationStatus.status}
            </Badge>
          </CardContent>
        </Card>

        <Card className="feature-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Min Payment Due</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 text-blue-600 mr-1" />
              <span className="text-2xl font-bold">AED {totalMinPayment.toLocaleString()}</span>
            </div>
            <p className="text-sm text-gray-600">Next 7 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        {['overview', 'cards', 'score-tips'].map((tab) => (
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
              <CardTitle>Credit Score Progress</CardTitle>
              <CardDescription>Your credit score journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Current Score</span>
                  <span className={`font-bold text-2xl ${scoreStatus.color}`}>{creditScore}</span>
                </div>
                <Progress value={((creditScore - scoreRange.min) / (scoreRange.max - scoreRange.min)) * 100} className="h-4" />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{scoreRange.min}</span>
                  <span>{scoreRange.max}</span>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <p className="text-sm text-blue-800">{scoreStatus.description}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Payment History (35%)</span>
                    <span className="text-green-600">Excellent</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Credit Utilization (30%)</span>
                    <span className={utilizationStatus.color}>{utilizationStatus.status}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Credit Age (15%)</span>
                    <span className="text-green-600">Good</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Credit Mix (10%)</span>
                    <span className="text-blue-600">Very Good</span>
                </div>
                  <div className="flex justify-between text-sm">
                    <span>New Credit (10%)</span>
                    <span className="text-green-600">Excellent</span>
                    </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="feature-card">
            <CardHeader>
              <CardTitle>Credit Utilization</CardTitle>
              <CardDescription>Keep utilization below 30% for optimal score</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {creditCards.map((card) => {
                  const cardUtilizationStatus = getUtilizationStatus(card.utilization);
                  return (
                    <div key={card.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{card.name}</span>
                        <Badge variant="outline" className={cardUtilizationStatus.color}>
                          {card.utilization.toFixed(1)}%
                        </Badge>
                      </div>
                      <Progress value={card.utilization} className="h-2" />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>AED {card.balance.toLocaleString()}</span>
                        <span>AED {card.limit.toLocaleString()}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
                  </div>
      )}

      {selectedTab === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {creditCards.map((card) => {
            const utilizationStatus = getUtilizationStatus(card.utilization);
            const daysUntilDue = Math.ceil((new Date(card.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
            
            return (
              <Card key={card.id} className="feature-card border-l-4 border-l-blue-500">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{card.name}</CardTitle>
                    <Badge variant="outline">{card.bank}</Badge>
                  </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Balance</span>
                        <p className="font-semibold text-red-600">AED {card.balance.toLocaleString()}</p>
                      </div>
                        <div>
                        <span className="text-gray-600">Limit</span>
                        <p className="font-semibold">AED {card.limit.toLocaleString()}</p>
                        </div>
                      <div>
                        <span className="text-gray-600">Utilization</span>
                        <Badge variant="outline" className={utilizationStatus.color}>
                          {card.utilization.toFixed(1)}%
                        </Badge>
                      </div>
                      <div>
                        <span className="text-gray-600">Interest Rate</span>
                        <p className="font-semibold">{card.interestRate}%</p>
                      </div>
                    </div>
                    <Progress value={card.utilization} className="h-3" />
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-600">Min Payment Due</p>
                          <p className="font-semibold">AED {card.minPayment.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Due in</p>
                          <p className="font-semibold">{daysUntilDue} days</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => payCard(card.id, card.minPayment)}
                        className="flex-1"
                      >
                        Pay Min
                      </Button>
                      <Button 
                        size="sm" 
                        className="flex-1 button-finera-primary"
                        onClick={() => {
                          const amount = prompt('Enter payment amount (AED):');
                          if (amount && !isNaN(parseFloat(amount))) {
                            payCard(card.id, parseFloat(amount));
                          }
                        }}
                      >
                        Pay Custom
                        </Button>
                    </div>
                </div>
              </CardContent>
            </Card>
            );
          })}
          </div>
      )}

      {selectedTab === 'score-tips' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="feature-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-2 text-green-600" />
                Tips to Improve Your Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-medium text-green-800">Keep Utilization Low</h4>
                  <p className="text-sm text-green-700">Maintain credit card usage below 30% of your limit</p>
                      </div>
                <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-medium text-blue-800">Pay On Time</h4>
                  <p className="text-sm text-blue-700">Never miss payment deadlines - set up automatic payments</p>
                    </div>
                <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-medium text-purple-800">Don't Close Old Cards</h4>
                  <p className="text-sm text-purple-700">Keep older accounts open to maintain credit history length</p>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg border-l-4 border-amber-500">
                  <h4 className="font-medium text-amber-800">Limit New Applications</h4>
                  <p className="text-sm text-amber-700">Avoid applying for multiple credit cards in short periods</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="feature-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Info className="w-5 h-5 mr-2 text-blue-600" />
                UAE Credit Bureau Info
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium">Al Etihad Credit Bureau (AECB)</h4>
                  <p className="text-sm text-gray-600">The official credit bureau of the UAE</p>
                </div>
                  <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Score Range</span>
                    <span className="font-medium">300 - 900</span>
                        </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Excellent</span>
                    <span className="font-medium text-green-600">781 - 900</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Very Good</span>
                    <span className="font-medium text-blue-600">661 - 780</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Good</span>
                    <span className="font-medium text-amber-600">541 - 660</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Fair</span>
                    <span className="font-medium text-orange-600">300 - 540</span>
                  </div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    Your current score of {creditScore} puts you in the top 15% of UAE residents!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      {/* Credit Report Modal */}
      <Dialog open={showCreditReport} onOpenChange={setShowCreditReport}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Credit Report</DialogTitle>
            <DialogDescription>Demo credit report for UAE</DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="font-semibold">Credit Score:</span>
              <span className="text-lg font-bold text-green-700">{creditScore}</span>
            </div>
            <div className="text-sm text-gray-700">Status: <span className={scoreStatus.color}>{scoreStatus.status}</span></div>
            <div className="text-sm text-gray-700">Total Credit Cards: {creditCards.length}</div>
            <div className="text-sm text-gray-700">Total Balance: AED {totalBalance.toLocaleString()}</div>
            <div className="text-sm text-gray-700">Utilization: {overallUtilization.toFixed(1)}%</div>
            <div className="text-sm text-gray-700">No late payments reported.</div>
            <div className="text-sm text-gray-700">No loan defaults.</div>
            <div className="text-sm text-gray-700">Last updated: {new Date().toLocaleDateString('en-GB')}</div>
          </div>
        </DialogContent>
      </Dialog>
      {/* Apply for Card Modal */}
      <Dialog open={showApplyCard} onOpenChange={setShowApplyCard}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Apply for a New Credit Card</DialogTitle>
            <DialogDescription>Submit your application to a UAE bank</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleApplyCard} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Bank</label>
              <select
                className="w-full border rounded-md p-2 mt-1"
                value={applyCardBank}
                onChange={e => setApplyCardBank(e.target.value)}
              >
                <option>Emirates NBD</option>
                <option>ADCB</option>
                <option>First Abu Dhabi Bank</option>
                <option>Dubai Islamic Bank</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Card Type</label>
              <select
                className="w-full border rounded-md p-2 mt-1"
                value={applyCardName}
                onChange={e => setApplyCardName(e.target.value)}
              >
                <option>Platinum</option>
                <option>Infinite</option>
                <option>Touchpoints</option>
                <option>Gold</option>
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setShowApplyCard(false)}>Cancel</Button>
              <Button type="submit" className="button-finera-primary" disabled={applyCardLoading}>
                {applyCardLoading ? 'Applying...' : 'Apply'}
              </Button>
            </div>
            {applyCardSuccess && <div className="text-green-600 text-sm text-center mt-2">{applyCardSuccess}</div>}
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreditManager; 