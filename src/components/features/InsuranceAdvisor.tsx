import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Shield,
  Heart,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Calendar,
  Users,
  FileText,
  Star,
  IndianRupee,
  Clock,
  Zap
} from 'lucide-react';

const InsuranceAdvisor: React.FC = () => {
  const currentCoverage = {
    healthInsurance: {
      hasPolicy: true,
      provider: 'Star Health',
      coverage: 500000,
      premium: 18500,
      familyMembers: 4,
      lastClaim: '2023-03-15',
      renewalDate: '2024-08-20'
    },
    termInsurance: {
      hasPolicy: true,
      provider: 'LIC',
      coverage: 10000000,
      premium: 24000,
      term: 25,
      renewalDate: '2024-11-10'
    },
    vehicleInsurance: {
      hasPolicy: true,
      provider: 'ICICI Lombard',
      coverage: 'Comprehensive',
      premium: 12800,
      renewalDate: '2024-05-15'
    }
  };

  const recommendations = [
    {
      type: 'health',
      title: 'Increase Health Coverage',
      priority: 'high',
      description: 'Current ₹5L family floater may be insufficient for rising medical costs',
      recommendation: 'Upgrade to ₹10L coverage or add super top-up',
      expectedCost: 8500,
      potentialSavings: 0,
      impact: 'Reduce out-of-pocket medical expenses by ₹3-5L'
    },
    {
      type: 'term',
      title: 'Term Insurance Optimization',
      priority: 'medium',
      description: 'Current coverage is adequate but premium can be optimized',
      recommendation: 'Compare with online term plans for better rates',
      expectedCost: -3600,
      potentialSavings: 3600,
      impact: 'Save ₹3,600 annually with same coverage'
    },
    {
      type: 'disability',
      title: 'Add Disability Insurance',
      priority: 'medium',
      description: 'No disability coverage found - critical for income protection',
      recommendation: 'Add disability rider or standalone policy',
      expectedCost: 6000,
      potentialSavings: 0,
      impact: 'Protect 70% of income in case of disability'
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
          Health Insurance Advisor
        </h1>
        <p className="text-muted-foreground mt-2">
          Comprehensive insurance planning and optimization recommendations
        </p>
      </div>

      {/* Current Coverage Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 slide-up">
        <Card className="widget">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Health Insurance</p>
                <p className="text-2xl font-bold">₹{(currentCoverage.healthInsurance.coverage / 100000).toFixed(0)}L</p>
                <p className="text-sm text-muted-foreground">{currentCoverage.healthInsurance.provider}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="widget">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Term Insurance</p>
                <p className="text-2xl font-bold">₹{(currentCoverage.termInsurance.coverage / 10000000).toFixed(0)}Cr</p>
                <p className="text-sm text-muted-foreground">{currentCoverage.termInsurance.provider}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="widget">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Premium</p>
                <p className="text-2xl font-bold">₹{((currentCoverage.healthInsurance.premium + currentCoverage.termInsurance.premium + currentCoverage.vehicleInsurance.premium) / 1000).toFixed(0)}K</p>
                <p className="text-sm text-green-500">Annual cost</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                <IndianRupee className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recommendations" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
          <TabsTrigger value="coverage">Coverage Analysis</TabsTrigger>
          <TabsTrigger value="renewals">Policy Management</TabsTrigger>
        </TabsList>

        <TabsContent value="recommendations" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendations.map((rec, index) => (
              <Card key={index} className="widget">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{rec.title}</CardTitle>
                    <Badge className={getPriorityColor(rec.priority)}>
                      {rec.priority} priority
                    </Badge>
                  </div>
                  <CardDescription>{rec.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                      <p className="text-sm font-medium text-blue-800">Recommendation:</p>
                      <p className="text-sm text-blue-700">{rec.recommendation}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Cost Impact</p>
                        <p className={`font-semibold ${rec.expectedCost > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {rec.expectedCost > 0 ? '+' : ''}₹{Math.abs(rec.expectedCost).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Annual Savings</p>
                        <p className="font-semibold text-green-600">₹{rec.potentialSavings.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                      <p className="text-sm font-medium text-green-800">Impact:</p>
                      <p className="text-sm text-green-700">{rec.impact}</p>
                    </div>

                    <Button variant="outline" className="w-full">
                      Get Quote
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="coverage" className="space-y-6">
          <Card className="widget">
            <CardHeader>
              <CardTitle>Coverage Gap Analysis</CardTitle>
              <CardDescription>
                Identified gaps in your current insurance coverage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg border border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">Insufficient Health Coverage</h4>
                      <p className="text-sm text-muted-foreground">Current ₹5L may not cover major procedures in tier-1 cities</p>
                    </div>
                    <Badge className="text-red-600 bg-red-50 border-red-200">
                      High Impact
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <div>
                      <p className="text-sm font-medium text-blue-800">Recommendation:</p>
                      <p className="text-sm text-blue-700">Increase to ₹10L or add super top-up of ₹15L</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Estimated Cost</p>
                      <p className="font-semibold">₹8,500/year</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">Missing Disability Insurance</h4>
                      <p className="text-sm text-muted-foreground">No income protection in case of disability</p>
                    </div>
                    <Badge className="text-yellow-600 bg-yellow-50 border-yellow-200">
                      Medium Impact
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <div>
                      <p className="text-sm font-medium text-blue-800">Recommendation:</p>
                      <p className="text-sm text-blue-700">Add disability income rider or standalone policy</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Estimated Cost</p>
                      <p className="font-semibold">₹6,000/year</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="renewals" className="space-y-6">
          <Card className="widget">
            <CardHeader>
              <CardTitle>Policy Renewal Optimization</CardTitle>
              <CardDescription>
                Upcoming renewals and optimization opportunities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 rounded-lg border border-yellow-200 bg-yellow-50">
                  <div className="flex items-center mb-3">
                    <Calendar className="w-5 h-5 text-yellow-600 mr-2" />
                    <h4 className="font-semibold text-yellow-800">Vehicle Insurance</h4>
                  </div>
                  <p className="text-sm text-yellow-700 mb-2">Renewal Due: May 15, 2024</p>
                  <p className="text-xs text-yellow-600 mb-3">Current Premium: ₹12,800</p>
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-yellow-800">Optimization Tips:</p>
                    <ul className="text-xs text-yellow-700 space-y-1">
                      <li>• Compare NCB benefits</li>
                      <li>• Consider add-on covers</li>
                      <li>• Check for loyalty discounts</li>
                    </ul>
                  </div>
                </div>
                
                <div className="p-4 rounded-lg border border-blue-200 bg-blue-50">
                  <div className="flex items-center mb-3">
                    <Heart className="w-5 h-5 text-blue-600 mr-2" />
                    <h4 className="font-semibold text-blue-800">Health Insurance</h4>
                  </div>
                  <p className="text-sm text-blue-700 mb-2">Renewal Due: Aug 20, 2024</p>
                  <p className="text-xs text-blue-600 mb-3">Current Premium: ₹18,500</p>
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-blue-800">Optimization Tips:</p>
                    <ul className="text-xs text-blue-700 space-y-1">
                      <li>• Consider higher coverage</li>
                      <li>• Add parents to policy</li>
                      <li>• Compare with competitors</li>
                    </ul>
                  </div>
                </div>
                
                <div className="p-4 rounded-lg border border-green-200 bg-green-50">
                  <div className="flex items-center mb-3">
                    <Shield className="w-5 h-5 text-green-600 mr-2" />
                    <h4 className="font-semibold text-green-800">Term Insurance</h4>
                  </div>
                  <p className="text-sm text-green-700 mb-2">Renewal Due: Nov 10, 2024</p>
                  <p className="text-xs text-green-600 mb-3">Current Premium: ₹24,000</p>
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-green-800">Optimization Tips:</p>
                    <ul className="text-xs text-green-700 space-y-1">
                      <li>• Compare online term plans</li>
                      <li>• Consider additional riders</li>
                      <li>• Review coverage adequacy</li>
                    </ul>
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

export default InsuranceAdvisor; 