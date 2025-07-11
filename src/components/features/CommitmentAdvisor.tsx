import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Calendar,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Home,
  Car,
  Plane,
  GraduationCap,
  Shield,
  Target,
  IndianRupee,
  Clock
} from 'lucide-react';

const CommitmentAdvisor: React.FC = () => {
  const financialReadiness = {
    emergencyFund: { current: 450000, required: 600000, status: 'moderate' },
    monthlyIncome: 125000,
    monthlyExpenses: 67500,
    savingsRate: 46,
    debtToIncome: 15,
    creditScore: 768,
    overallReadiness: 78
  };

  const majorCommitments = [
    {
      type: 'home',
      title: 'Home Purchase',
      icon: <Home className="w-6 h-6" />,
      cost: 8500000,
      downPayment: 1700000,
      currentSavings: 850000,
      timeline: 18,
      readiness: 65,
      recommendation: 'Wait 12-18 months',
      status: 'caution',
      risks: ['Insufficient emergency fund', 'High EMI-to-income ratio']
    },
    {
      type: 'car',
      title: 'Car Purchase (Tata Nexon)',
      icon: <Car className="w-6 h-6" />,
      cost: 1200000,
      downPayment: 300000,
      currentSavings: 620000,
      timeline: 3,
      readiness: 85,
      recommendation: 'Good time to buy',
      status: 'ready',
      risks: ['Consider fuel efficiency for long-term savings']
    },
    {
      type: 'vacation',
      title: 'Europe Vacation',
      icon: <Plane className="w-6 h-6" />,
      cost: 350000,
      downPayment: 350000,
      currentSavings: 185000,
      timeline: 8,
      readiness: 75,
      recommendation: 'Plan for next year',
      status: 'moderate',
      risks: ['Impact on emergency fund']
    },
    {
      type: 'education',
      title: 'MBA Program',
      icon: <GraduationCap className="w-6 h-6" />,
      cost: 2500000,
      downPayment: 500000,
      currentSavings: 180000,
      timeline: 24,
      readiness: 45,
      recommendation: 'Need more preparation',
      status: 'not-ready',
      risks: ['Major income disruption', 'Large debt burden']
    }
  ];

  const timingAnalysis = [
    {
      commitment: 'Home Purchase',
      currentTiming: 'Not Optimal',
      optimalTiming: 'Q3 2025',
      reasons: [
        'Real estate prices expected to moderate',
        'Better emergency fund by then',
        'Potential salary increment'
      ],
      financialImpact: 'Save ₹85,000 in down payment'
    },
    {
      commitment: 'Car Purchase',
      currentTiming: 'Good',
      optimalTiming: 'Q1 2024',
      reasons: [
        'Current car maintenance costs rising',
        'Good financing rates available',
        'Sufficient savings available'
      ],
      financialImpact: 'No major savings difference'
    },
    {
      commitment: 'Europe Vacation',
      currentTiming: 'Moderate',
      optimalTiming: 'Q2 2024',
      reasons: [
        'Better exchange rates expected',
        'Off-season travel discounts',
        'Emergency fund will be stronger'
      ],
      financialImpact: 'Save ₹35,000 on travel costs'
    }
  ];

  const riskAssessment = [
    {
      category: 'Emergency Fund',
      currentStatus: 'Moderate Risk',
      description: 'Emergency fund covers 6.7 months of expenses',
      recommendation: 'Increase to 8-12 months before major purchases',
      impact: 'Medium'
    },
    {
      category: 'Income Stability',
      currentStatus: 'Low Risk',
      description: 'Stable job with good growth prospects',
      recommendation: 'Consider side income for faster goal achievement',
      impact: 'Low'
    },
    {
      category: 'Market Conditions',
      currentStatus: 'Moderate Risk',
      description: 'Real estate prices at peak, volatile stock market',
      recommendation: 'Wait for market corrections on major purchases',
      impact: 'High'
    },
    {
      category: 'Debt Management',
      currentStatus: 'Low Risk',
      description: 'Current debt-to-income ratio is healthy at 15%',
      recommendation: 'Maintain ratio below 30% after new commitments',
      impact: 'Medium'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'text-green-600 bg-green-50 border-green-200';
      case 'moderate': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'caution': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'not-ready': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getReadinessScore = (score: number) => {
    if (score >= 80) return 'ready';
    if (score >= 60) return 'moderate';
    if (score >= 40) return 'caution';
    return 'not-ready';
  };

  return (
    <div className="space-y-6">
      <div className="fade-in">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
          Commitment Recommendation System
        </h1>
        <p className="text-muted-foreground mt-2">
          Make informed decisions about major financial commitments
        </p>
      </div>

      {/* Financial Readiness Overview */}
      <Card className="widget">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="w-5 h-5 mr-2 text-primary" />
            Financial Readiness Score
          </CardTitle>
          <CardDescription>
            Overall assessment of your readiness for major financial commitments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {financialReadiness.overallReadiness}%
              </div>
              <p className="text-sm text-muted-foreground">Overall Readiness</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {financialReadiness.savingsRate}%
              </div>
              <p className="text-sm text-muted-foreground">Savings Rate</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {financialReadiness.creditScore}
              </div>
              <p className="text-sm text-muted-foreground">Credit Score</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {financialReadiness.debtToIncome}%
              </div>
              <p className="text-sm text-muted-foreground">Debt-to-Income</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Emergency Fund Progress</span>
                <span>₹{(financialReadiness.emergencyFund.current / 100000).toFixed(1)}L / ₹{(financialReadiness.emergencyFund.required / 100000).toFixed(0)}L</span>
              </div>
              <Progress 
                value={(financialReadiness.emergencyFund.current / financialReadiness.emergencyFund.required) * 100} 
                className="h-3" 
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="commitments" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="commitments">Major Commitments</TabsTrigger>
          <TabsTrigger value="timing">Timing Analysis</TabsTrigger>
          <TabsTrigger value="risks">Risk Assessment</TabsTrigger>
          <TabsTrigger value="planning">Long-term Planning</TabsTrigger>
        </TabsList>

        <TabsContent value="commitments" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {majorCommitments.map((commitment, index) => (
              <Card key={index} className="widget">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white mr-3">
                        {commitment.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{commitment.title}</CardTitle>
                        <CardDescription>₹{(commitment.cost / 100000).toFixed(1)}L total cost</CardDescription>
                      </div>
                    </div>
                    <Badge className={getStatusColor(commitment.status)}>
                      {commitment.recommendation}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Readiness Score</span>
                        <span>{commitment.readiness}%</span>
                      </div>
                      <Progress value={commitment.readiness} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Down Payment</p>
                        <p className="font-semibold">₹{(commitment.downPayment / 100000).toFixed(1)}L</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Current Savings</p>
                        <p className="font-semibold">₹{(commitment.currentSavings / 100000).toFixed(1)}L</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Timeline: {commitment.timeline} months</p>
                      <Progress value={(commitment.timeline / 24) * 100} className="h-2" />
                    </div>

                    {commitment.risks.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm font-medium text-red-600 mb-2">Risk Factors:</p>
                        {commitment.risks.map((risk, riskIndex) => (
                          <div key={riskIndex} className="flex items-start text-sm text-red-600">
                            <AlertTriangle className="w-3 h-3 mr-1 mt-0.5 flex-shrink-0" />
                            {risk}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="timing" className="space-y-6">
          <div className="space-y-6">
            {timingAnalysis.map((analysis, index) => (
              <Card key={index} className="widget">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{analysis.commitment}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{analysis.optimalTiming}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Timing Analysis</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Current Timing:</span>
                          <Badge className={analysis.currentTiming === 'Good' ? getStatusColor('ready') : getStatusColor('moderate')}>
                            {analysis.currentTiming}
                          </Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Optimal Timing:</span>
                          <span className="font-medium">{analysis.optimalTiming}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Financial Impact:</span>
                          <p className="font-medium text-green-600">{analysis.financialImpact}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Key Reasons</h4>
                      <div className="space-y-2">
                        {analysis.reasons.map((reason, reasonIndex) => (
                          <div key={reasonIndex} className="flex items-start text-sm">
                            <CheckCircle className="w-3 h-3 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                            {reason}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="risks" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {riskAssessment.map((risk, index) => (
              <Card key={index} className="widget">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{risk.category}</CardTitle>
                    <Badge className={getStatusColor(risk.currentStatus.includes('Low') ? 'ready' : risk.currentStatus.includes('Moderate') ? 'moderate' : 'caution')}>
                      {risk.impact} Impact
                    </Badge>
                  </div>
                  <CardDescription>{risk.currentStatus}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">{risk.description}</p>
                    <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                      <p className="text-sm font-medium text-blue-800">Recommendation:</p>
                      <p className="text-sm text-blue-700">{risk.recommendation}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="planning" className="space-y-6">
          <Card className="widget">
            <CardHeader>
              <CardTitle>Long-term Financial Planning</CardTitle>
              <CardDescription>
                Strategic roadmap for achieving your major financial goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
                      1
                    </div>
                    <h3 className="font-semibold mb-2">Short-term (0-2 years)</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Build emergency fund to ₹8L</li>
                      <li>• Purchase car (Tata Nexon)</li>
                      <li>• Europe vacation</li>
                      <li>• Increase credit score to 800+</li>
                    </ul>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
                      2
                    </div>
                    <h3 className="font-semibold mb-2">Medium-term (2-5 years)</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Home down payment ready</li>
                      <li>• MBA program funding</li>
                      <li>• Investment portfolio growth</li>
                      <li>• Insurance coverage review</li>
                    </ul>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
                      3
                    </div>
                    <h3 className="font-semibold mb-2">Long-term (5+ years)</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Home ownership</li>
                      <li>• Retirement planning</li>
                      <li>• Children's education fund</li>
                      <li>• Wealth preservation</li>
                    </ul>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-semibold mb-4">Monthly Action Items</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                      <h5 className="font-medium text-green-800 mb-2">Immediate Actions</h5>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Increase emergency fund by ₹15K/month</li>
                        <li>• Research car financing options</li>
                        <li>• Set up separate vacation savings account</li>
                      </ul>
                    </div>
                    <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                      <h5 className="font-medium text-blue-800 mb-2">Ongoing Monitoring</h5>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Track real estate market trends</li>
                        <li>• Monitor credit score monthly</li>
                        <li>• Review and adjust savings targets</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommitmentAdvisor; 