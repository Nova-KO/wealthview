import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  PieChart,
  Plus,
  Minus,
  Target,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface Holding {
  id: string;
  symbol: string;
  name: string;
  shares: number;
  currentPrice: number;
  totalValue: number;
  dayChange: number;
  dayChangePercent: number;
  allocation: number;
}

const PortfolioManager = forwardRef((props, ref) => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [newInvestmentAmount, setNewInvestmentAmount] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isRebalancing, setIsRebalancing] = useState(false);
  const [showAddInvestment, setShowAddInvestment] = useState(false);
  const [investmentSymbol, setInvestmentSymbol] = useState('AAPL');
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [quickSymbol, setQuickSymbol] = useState('');

  // Demo portfolio data
  const [holdings, setHoldings] = useState<Holding[]>([
    {
      id: '1',
      symbol: 'AAPL',
      name: 'Apple Inc.',
      shares: 50,
      currentPrice: 175.25,
      totalValue: 8762.50,
      dayChange: 125.50,
      dayChangePercent: 1.45,
      allocation: 25.2
    },
    {
      id: '2',
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      shares: 30,
      currentPrice: 342.75,
      totalValue: 10282.50,
      dayChange: -89.25,
      dayChangePercent: -0.86,
      allocation: 29.6
    },
    {
      id: '3',
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      shares: 20,
      currentPrice: 142.80,
      totalValue: 2856.00,
      dayChange: 42.80,
      dayChangePercent: 1.52,
      allocation: 8.2
    },
    {
      id: '4',
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      shares: 25,
      currentPrice: 195.50,
      totalValue: 4887.50,
      dayChange: -195.50,
      dayChangePercent: -3.84,
      allocation: 14.1
    },
    {
      id: '5',
      symbol: 'ADCB',
      name: 'Abu Dhabi Commercial Bank',
      shares: 500,
      currentPrice: 8.45,
      totalValue: 4225.00,
      dayChange: 42.25,
      dayChangePercent: 1.01,
      allocation: 12.2
    },
    {
      id: '6',
      symbol: 'EMAAR',
      name: 'Emaar Properties',
      shares: 800,
      currentPrice: 4.25,
      totalValue: 3400.00,
      dayChange: -68.00,
      dayChangePercent: -1.96,
      allocation: 9.8
    }
  ]);

  // Set initial quickSymbol value
  useEffect(() => {
    if (holdings.length > 0 && !quickSymbol) {
      setQuickSymbol(holdings[0].symbol);
    }
  }, [holdings, quickSymbol]);

  const totalPortfolioValue = holdings.reduce((sum, holding) => sum + holding.totalValue, 0);
  const totalDayChange = holdings.reduce((sum, holding) => sum + holding.dayChange, 0);
  const totalDayChangePercent = (totalDayChange / totalPortfolioValue) * 100;

  const handleBuyStock = (symbol: string) => {
    const amount = parseFloat(newInvestmentAmount);
    if (amount && amount > 0) {
      const holding = holdings.find(h => h.symbol === symbol);
      if (holding) {
        const newShares = amount / holding.currentPrice;
        const updatedHoldings = holdings.map(h => 
          h.symbol === symbol 
            ? { 
                ...h, 
                shares: h.shares + newShares,
                totalValue: h.totalValue + amount
              }
            : h
        );
        setHoldings(updatedHoldings);
        setNewInvestmentAmount('');
        alert(`Successfully invested AED ${amount.toLocaleString()} in ${symbol}!`);
      }
    }
  };

  const handleSellStock = (symbol: string) => {
    const amount = parseFloat(newInvestmentAmount);
    if (amount && amount > 0) {
      const holding = holdings.find(h => h.symbol === symbol);
      if (holding && amount <= holding.totalValue) {
        const sharesToSell = amount / holding.currentPrice;
        const updatedHoldings = holdings.map(h => 
          h.symbol === symbol 
            ? { 
                ...h, 
                shares: h.shares - sharesToSell,
                totalValue: h.totalValue - amount
              }
            : h
        );
        setHoldings(updatedHoldings);
        setNewInvestmentAmount('');
        alert(`Successfully sold AED ${amount.toLocaleString()} of ${symbol}!`);
      } else {
        alert('Insufficient holdings to sell this amount.');
      }
    }
  };

  const rebalancePortfolio = async () => {
    setIsRebalancing(true);
    await new Promise(res => setTimeout(res, 1200));
    setIsRebalancing(false);
    alert('Portfolio successfully rebalanced! Your allocation is now optimized.');
  };

  const handleAddInvestment = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(investmentAmount);
    if (amount && amount > 0) {
      const holding = holdings.find(h => h.symbol === investmentSymbol);
      if (holding) {
        const newShares = amount / holding.currentPrice;
        const updatedHoldings = holdings.map(h => 
          h.symbol === investmentSymbol 
            ? { 
                ...h, 
                shares: h.shares + newShares,
                totalValue: h.totalValue + amount
              }
            : h
        );
        setHoldings(updatedHoldings);
        setShowAddInvestment(false);
        setInvestmentAmount('');
        alert(`Successfully invested AED ${amount.toLocaleString()} in ${investmentSymbol}!`);
      }
    }
  };

  useImperativeHandle(ref, () => ({
    refresh: async () => {
      setIsRefreshing(true);
      // Simulate data fetch
      await new Promise(res => setTimeout(res, 1000));
      setIsRefreshing(false);
    }
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-color-primary">Portfolio Manager</h1>
          <p className="text-gray-600 mt-1">Manage your investments with AI-powered insights</p>
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={rebalancePortfolio}
            className="button-finera"
            variant="outline"
            disabled={isRebalancing}
          >
            <Target className="w-4 h-4 mr-2" />
            {isRebalancing ? 'Rebalancing...' : 'Auto Rebalance'}
          </Button>
          <Button className="button-finera-primary" onClick={() => setShowAddInvestment(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Investment
          </Button>
        </div>
      </div>
      {/* Add Investment Modal */}
      <Dialog open={showAddInvestment} onOpenChange={setShowAddInvestment}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Investment</DialogTitle>
            <DialogDescription>Select holding and amount to invest</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddInvestment} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Select Holding</label>
              <select
                className="w-full border rounded-md p-2 mt-1"
                value={investmentSymbol}
                onChange={e => setInvestmentSymbol(e.target.value)}
              >
                {holdings.map(h => (
                  <option key={h.symbol} value={h.symbol}>{h.symbol} - {h.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Amount (AED)</label>
              <Input
                type="number"
                value={investmentAmount}
                onChange={e => setInvestmentAmount(e.target.value)}
                placeholder="Enter amount"
                min={1}
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setShowAddInvestment(false)}>Cancel</Button>
              <Button type="submit" className="button-finera-primary">Add</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Portfolio Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="feature-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="w-4 h-4 text-emerald-600 mr-1" />
              <span className="text-2xl font-bold">AED {totalPortfolioValue.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="feature-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Today's Change</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              {totalDayChange >= 0 ? (
                <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
              )}
              <span className={`text-2xl font-bold ${totalDayChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {totalDayChange >= 0 ? '+' : ''}AED {totalDayChange.toLocaleString()}
              </span>
            </div>
            <p className={`text-sm ${totalDayChangePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totalDayChangePercent >= 0 ? '+' : ''}{totalDayChangePercent.toFixed(2)}%
            </p>
          </CardContent>
        </Card>

        <Card className="feature-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Holdings</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold">{holdings.length}</span>
            <p className="text-sm text-gray-600">Active positions</p>
          </CardContent>
        </Card>

        <Card className="feature-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BarChart3 className="w-4 h-4 text-blue-600 mr-1" />
              <span className="text-2xl font-bold text-green-600">+12.4%</span>
            </div>
            <p className="text-sm text-gray-600">This year</p>
          </CardContent>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        {['overview', 'holdings', 'analytics'].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              selectedTab === tab
                ? 'bg-white text-emerald-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {selectedTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Asset Allocation */}
          <Card className="feature-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="w-5 h-5 mr-2" />
                Asset Allocation
              </CardTitle>
              <CardDescription>Your portfolio distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {holdings.slice(0, 5).map((holding) => (
                  <div key={holding.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500"></div>
                      <span className="font-medium">{holding.symbol}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold">{holding.allocation}%</span>
                      <Progress value={holding.allocation} className="w-20 h-2 mt-1" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="feature-card">
            <CardHeader>
              <CardTitle>Quick Investment</CardTitle>
              <CardDescription>Buy or sell your holdings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Select Holding</label>
                  <select
                    className="w-full border rounded-md p-2 mt-1"
                    value={quickSymbol}
                    onChange={e => setQuickSymbol(e.target.value)}
                  >
                    {holdings.map(h => (
                      <option key={h.symbol} value={h.symbol}>{h.symbol} - {h.name}</option>
                    ))}
                  </select>
                </div>
                <Input
                  placeholder="Enter amount (AED)"
                  value={newInvestmentAmount}
                  onChange={(e) => setNewInvestmentAmount(e.target.value)}
                  type="number"
                />
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline"
                    className="text-green-600 border-green-600 hover:bg-green-50"
                    onClick={() => handleBuyStock(quickSymbol)}
                    disabled={!newInvestmentAmount}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Buy {quickSymbol}
                  </Button>
                  <Button 
                    variant="outline"
                    className="text-red-600 border-red-600 hover:bg-red-50"
                    onClick={() => handleSellStock(quickSymbol)}
                    disabled={!newInvestmentAmount}
                  >
                    <Minus className="w-4 h-4 mr-2" />
                    Sell {quickSymbol}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {selectedTab === 'holdings' && (
        <Card className="feature-card">
          <CardHeader>
            <CardTitle>Your Holdings</CardTitle>
            <CardDescription>Detailed view of your investment positions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2">Symbol</th>
                    <th className="text-left py-3 px-2">Name</th>
                    <th className="text-right py-3 px-2">Shares</th>
                    <th className="text-right py-3 px-2">Price</th>
                    <th className="text-right py-3 px-2">Value</th>
                    <th className="text-right py-3 px-2">Change</th>
                    <th className="text-center py-3 px-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {holdings.map((holding) => (
                    <tr key={holding.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-2">
                        <span className="font-semibold">{holding.symbol}</span>
                      </td>
                      <td className="py-3 px-2 text-gray-600">{holding.name}</td>
                      <td className="py-3 px-2 text-right">{holding.shares.toFixed(2)}</td>
                      <td className="py-3 px-2 text-right">AED {holding.currentPrice.toFixed(2)}</td>
                      <td className="py-3 px-2 text-right font-semibold">
                        AED {holding.totalValue.toLocaleString()}
                      </td>
                      <td className="py-3 px-2 text-right">
                        <span className={holding.dayChangePercent >= 0 ? 'text-green-600' : 'text-red-600'}>
                          {holding.dayChangePercent >= 0 ? '+' : ''}{holding.dayChangePercent.toFixed(2)}%
                        </span>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <div className="flex justify-center space-x-1">
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="text-green-600 border-green-600 hover:bg-green-50"
                            onClick={() => handleBuyStock(holding.symbol)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="text-red-600 border-red-600 hover:bg-red-50"
                            onClick={() => handleSellStock(holding.symbol)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="feature-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-amber-600" />
                Risk Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Portfolio Risk Score</span>
                  <Badge variant="outline" className="bg-amber-50 text-amber-700">Moderate</Badge>
                </div>
                <Progress value={65} className="h-3" />
                <p className="text-sm text-gray-600">
                  Your portfolio has moderate risk with good diversification across sectors and geographies.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="feature-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-2 text-green-600" />
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <p className="text-sm text-blue-800">
                    Consider increasing UAE equity exposure by 5% for better local market participation.
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <p className="text-sm text-green-800">
                    Your tech allocation is well-balanced. Continue current strategy.
                  </p>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg border-l-4 border-amber-500">
                  <p className="text-sm text-amber-800">
                    Tesla position shows high volatility. Consider reducing by 2%.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      {isRefreshing && (
        <div className="flex items-center justify-center py-4">
          <span className="animate-spin mr-2">🔄</span> Refreshing portfolio data...
        </div>
      )}
    </div>
  );
});

export default PortfolioManager;