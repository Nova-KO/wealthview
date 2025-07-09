import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  PieChart,
  Target,
  AlertTriangle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  IndianRupee
} from 'lucide-react';

const PortfolioManager: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('1M');

  const portfolioOverview = {
    totalValue: 9850000, // ₹98.5L
    totalInvested: 8200000, // ₹82L
    totalGains: 1650000, // ₹16.5L
    gainPercentage: 20.12,
    dayChange: 45000, // ₹45K
    dayChangePercent: 0.46
  };

  const holdings = [
    {
      name: 'HDFC Bank',
      symbol: 'HDFCBANK',
      shares: 150,
      currentPrice: 1680,
      invested: 225000,
      currentValue: 252000,
      gain: 27000,
      gainPercent: 12.0,
      sector: 'Banking'
    },
    {
      name: 'Infosys',
      symbol: 'INFY',
      shares: 200,
      currentPrice: 1420,
      invested: 260000,
      currentValue: 284000,
      gain: 24000,
      gainPercent: 9.23,
      sector: 'IT'
    },
    {
      name: 'Reliance Industries',
      symbol: 'RELIANCE',
      shares: 80,
      currentPrice: 2850,
      invested: 216000,
      currentValue: 228000,
      gain: 12000,
      gainPercent: 5.56,
      sector: 'Oil & Gas'
    },
    {
      name: 'SBI Bluechip Fund',
      symbol: 'SBI-BC',
      units: 5000,
      currentPrice: 85.50,
      invested: 400000,
      currentValue: 427500,
      gain: 27500,
      gainPercent: 6.88,
      sector: 'Mutual Fund'
    }
  ];

  const sectorAllocation = [
    { sector: 'Banking', percentage: 35, value: 3447500, color: 'from-blue-400 to-blue-600' },
    { sector: 'IT', percentage: 25, value: 2462500, color: 'from-green-400 to-green-600' },
    { sector: 'Mutual Funds', percentage: 20, value: 1970000, color: 'from-purple-400 to-purple-600' },
    { sector: 'Oil & Gas', percentage: 15, value: 1477500, color: 'from-red-400 to-red-600' },
    { sector: 'Others', percentage: 5, value: 492500, color: 'from-yellow-400 to-yellow-600' }
  ];

  const recommendations = [
    {
      type: 'rebalance',
      title: 'Rebalance Portfolio',
      description: 'Your banking allocation is 5% above target. Consider reducing exposure.',
      priority: 'medium',
      action: 'Sell ₹1.5L worth of banking stocks'
    },
    {
      type: 'opportunity',
      title: 'Investment Opportunity',
      description: 'HDFC Pharma Fund showing strong momentum with low correlation to your existing holdings.',
      priority: 'high',
      action: 'Consider investing ₹2L'
    },
    {
      type: 'risk',
      title: 'Risk Alert',
      description: 'High concentration in financial sector. Diversify across sectors.',
      priority: 'high',
      action: 'Add technology and healthcare exposure'
    }
  ];

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
          Portfolio Manager
        </h1>
        <p className="text-muted-foreground mt-2">
          Analyze and optimize your investment portfolio with AI-powered insights
        </p>
      </div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 slide-up">
        <Card className="widget">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold">₹{(portfolioOverview.totalValue / 100000).toFixed(1)}L</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">+{portfolioOverview.gainPercentage}%</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="widget">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Gains</p>
                <p className="text-2xl font-bold text-green-600">₹{(portfolioOverview.totalGains / 100000).toFixed(1)}L</p>
                <p className="text-sm text-muted-foreground">vs ₹{(portfolioOverview.totalInvested / 100000).toFixed(1)}L invested</p>
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
                <p className="text-sm font-medium text-muted-foreground">Day Change</p>
                <p className="text-2xl font-bold text-green-600">₹{(portfolioOverview.dayChange / 1000).toFixed(0)}K</p>
                <div className="flex items-center mt-1">
                  <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">+{portfolioOverview.dayChangePercent}%</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center">
                <IndianRupee className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="widget">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Risk Score</p>
                <p className="text-2xl font-bold">7.2</p>
                <p className="text-sm text-yellow-500">Moderate</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="holdings" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="holdings">Holdings</TabsTrigger>
          <TabsTrigger value="allocation">Allocation</TabsTrigger>
          <TabsTrigger value="recommendations">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="holdings" className="space-y-4">
          <Card className="widget">
            <CardHeader>
              <CardTitle>Your Holdings</CardTitle>
              <CardDescription>Track individual investment performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {holdings.map((holding, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div>
                          <h4 className="font-semibold">{holding.name}</h4>
                          <p className="text-sm text-muted-foreground">{holding.symbol} • {holding.sector}</p>
                        </div>
                        <Badge variant="outline">{holding.sector}</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₹{holding.currentValue.toLocaleString()}</p>
                      <div className="flex items-center gap-1">
                        {holding.gain > 0 ? (
                          <ArrowUpRight className="w-4 h-4 text-green-500" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 text-red-500" />
                        )}
                        <span className={`text-sm ${holding.gain > 0 ? 'text-green-500' : 'text-red-500'}`}>
                          +₹{holding.gain.toLocaleString()} ({holding.gainPercent}%)
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="allocation" className="space-y-4">
          <Card className="widget">
            <CardHeader>
              <CardTitle>Sector Allocation</CardTitle>
              <CardDescription>Diversification across different sectors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {sectorAllocation.map((sector, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{sector.sector}</span>
                      <div className="text-right">
                        <span className="font-semibold">{sector.percentage}%</span>
                        <p className="text-sm text-muted-foreground">₹{(sector.value / 100000).toFixed(1)}L</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${sector.color} transition-all duration-500`}
                        style={{ width: `${sector.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <div className="grid gap-4">
            {recommendations.map((rec, index) => (
              <Card key={index} className={`border-l-4 ${getPriorityColor(rec.priority)}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{rec.title}</CardTitle>
                      <CardDescription className="mt-1">{rec.description}</CardDescription>
                    </div>
                    <Badge variant="outline" className={getPriorityColor(rec.priority)}>
                      {rec.priority.charAt(0).toUpperCase() + rec.priority.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{rec.action}</p>
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

export default PortfolioManager;