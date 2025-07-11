import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Palette,
  Database,
  Target,
  Bot,
  Download,
  Upload,
  Trash2,
  Eye,
  EyeOff,
  Moon,
  Sun,
  Globe,
  Smartphone,
  Mail,
  Lock,
  CreditCard,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  IndianRupee
} from 'lucide-react';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    // Personal Settings
    displayName: 'Anjali',
    email: 'anjali@example.com',
    phone: '+91 98765 43210',
    dateOfBirth: '1995-06-15',
    occupation: 'Software Engineer',
    
    // Financial Preferences
    currency: 'INR',
    language: 'en',
    fiscalYearStart: 'april',
    riskTolerance: 'moderate',
    investmentHorizon: 'long_term',
    monthlyIncome: 85000,
    
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    weeklyReports: true,
    goalReminders: true,
    billReminders: true,
    marketAlerts: false,
    
    // Privacy & Security
    biometricAuth: true,
    twoFactorAuth: false,
    dataSharing: false,
    analyticsTracking: true,
    
    // AI Assistant
    aiPersonality: 'friendly',
    responseDetail: 'detailed',
    proactiveInsights: true,
    voiceEnabled: true,
    
    // App Preferences
    theme: 'system',
    compactMode: false,
    showTips: true,
    autoRefresh: true,
    refreshInterval: 5
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const currencyOptions = [
    { value: 'INR', label: '₹ Indian Rupee', symbol: '₹' },
    { value: 'USD', label: '$ US Dollar', symbol: '$' },
    { value: 'EUR', label: '€ Euro', symbol: '€' },
    { value: 'GBP', label: '£ British Pound', symbol: '£' }
  ];

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'hi', label: 'हिन्दी (Hindi)' },
    { value: 'bn', label: 'বাংলা (Bengali)' },
    { value: 'ta', label: 'தமிழ் (Tamil)' }
  ];

  const riskToleranceOptions = [
    { value: 'conservative', label: 'Conservative', description: 'Lower risk, stable returns' },
    { value: 'moderate', label: 'Moderate', description: 'Balanced risk and returns' },
    { value: 'aggressive', label: 'Aggressive', description: 'Higher risk, potential for high returns' }
  ];

  return (
    <div className="space-y-6">
      <div className="fade-in">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Settings & Preferences
        </h1>
        <p className="text-muted-foreground mt-2">
          Customize your AI financial companion to match your preferences
        </p>
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="ai">AI Assistant</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <Card className="widget">
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mr-3">
                  <User className="w-5 h-5 text-white" />
                </div>
                Personal Information
              </CardTitle>
              <CardDescription>
                Update your personal details and profile information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input
                    id="displayName"
                    value={settings.displayName}
                    onChange={(e) => handleSettingChange('displayName', e.target.value)}
                    placeholder="Your display name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) => handleSettingChange('email', e.target.value)}
                    placeholder="your@email.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={settings.phone}
                    onChange={(e) => handleSettingChange('phone', e.target.value)}
                    placeholder="+91 12345 67890"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input
                    id="occupation"
                    value={settings.occupation}
                    onChange={(e) => handleSettingChange('occupation', e.target.value)}
                    placeholder="Your profession"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={settings.dateOfBirth}
                    onChange={(e) => handleSettingChange('dateOfBirth', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="monthlyIncome">Monthly Income</Label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="monthlyIncome"
                      type="number"
                      value={settings.monthlyIncome}
                      onChange={(e) => handleSettingChange('monthlyIncome', parseInt(e.target.value))}
                      placeholder="85000"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <Card className="widget">
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg mr-3">
                  <Target className="w-5 h-5 text-white" />
                </div>
                Financial Preferences
              </CardTitle>
              <CardDescription>
                Configure your financial settings and investment preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Currency</Label>
                  <Select value={settings.currency} onValueChange={(value) => handleSettingChange('currency', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencyOptions.map((currency) => (
                        <SelectItem key={currency.value} value={currency.value}>
                          {currency.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select value={settings.language} onValueChange={(value) => handleSettingChange('language', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languageOptions.map((language) => (
                        <SelectItem key={language.value} value={language.value}>
                          {language.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Fiscal Year Start</Label>
                  <Select value={settings.fiscalYearStart} onValueChange={(value) => handleSettingChange('fiscalYearStart', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="april">April (Indian FY)</SelectItem>
                      <SelectItem value="january">January (Calendar Year)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Investment Horizon</Label>
                  <Select value={settings.investmentHorizon} onValueChange={(value) => handleSettingChange('investmentHorizon', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short_term">Short Term (1-3 years)</SelectItem>
                      <SelectItem value="medium_term">Medium Term (3-7 years)</SelectItem>
                      <SelectItem value="long_term">Long Term (7+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <Label>Risk Tolerance</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {riskToleranceOptions.map((option) => (
                    <div
                      key={option.value}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                        settings.riskTolerance === option.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleSettingChange('riskTolerance', option.value)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{option.label}</h4>
                        {settings.riskTolerance === option.value && (
                          <CheckCircle className="w-5 h-5 text-blue-500" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="widget">
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg mr-3">
                  <Bell className="w-5 h-5 text-white" />
                </div>
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Choose how and when you want to receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive important updates via email</p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get instant alerts on your device</p>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Weekly Reports</Label>
                    <p className="text-sm text-muted-foreground">Receive weekly financial summaries</p>
                  </div>
                  <Switch
                    checked={settings.weeklyReports}
                    onCheckedChange={(checked) => handleSettingChange('weeklyReports', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Goal Reminders</Label>
                    <p className="text-sm text-muted-foreground">Get reminded about your financial goals</p>
                  </div>
                  <Switch
                    checked={settings.goalReminders}
                    onCheckedChange={(checked) => handleSettingChange('goalReminders', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Bill Reminders</Label>
                    <p className="text-sm text-muted-foreground">Never miss a bill payment</p>
                  </div>
                  <Switch
                    checked={settings.billReminders}
                    onCheckedChange={(checked) => handleSettingChange('billReminders', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Market Alerts</Label>
                    <p className="text-sm text-muted-foreground">Receive important market updates</p>
                  </div>
                  <Switch
                    checked={settings.marketAlerts}
                    onCheckedChange={(checked) => handleSettingChange('marketAlerts', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card className="widget">
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="p-2 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg mr-3">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                Privacy & Security
              </CardTitle>
              <CardDescription>
                Manage your privacy settings and security preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Biometric Authentication</Label>
                    <p className="text-sm text-muted-foreground">Use fingerprint/face ID to unlock the app</p>
                  </div>
                  <Switch
                    checked={settings.biometricAuth}
                    onCheckedChange={(checked) => handleSettingChange('biometricAuth', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <Switch
                    checked={settings.twoFactorAuth}
                    onCheckedChange={(checked) => handleSettingChange('twoFactorAuth', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Data Sharing</Label>
                    <p className="text-sm text-muted-foreground">Share anonymized data to improve AI recommendations</p>
                  </div>
                  <Switch
                    checked={settings.dataSharing}
                    onCheckedChange={(checked) => handleSettingChange('dataSharing', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Analytics Tracking</Label>
                    <p className="text-sm text-muted-foreground">Help us improve the app with usage analytics</p>
                  </div>
                  <Switch
                    checked={settings.analyticsTracking}
                    onCheckedChange={(checked) => handleSettingChange('analyticsTracking', checked)}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h4 className="font-semibold">Data Management</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="flex items-center">
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                  <Button variant="outline" className="flex items-center">
                    <Upload className="w-4 h-4 mr-2" />
                    Import Data
                  </Button>
                  <Button variant="destructive" className="flex items-center">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="space-y-6">
          <Card className="widget">
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg mr-3">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                AI Assistant Settings
              </CardTitle>
              <CardDescription>
                Customize your AI financial companion's behavior and responses
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>AI Personality</Label>
                  <Select value={settings.aiPersonality} onValueChange={(value) => handleSettingChange('aiPersonality', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="friendly">Friendly</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="formal">Formal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Response Detail Level</Label>
                  <Select value={settings.responseDetail} onValueChange={(value) => handleSettingChange('responseDetail', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="brief">Brief</SelectItem>
                      <SelectItem value="detailed">Detailed</SelectItem>
                      <SelectItem value="comprehensive">Comprehensive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Proactive Insights</Label>
                    <p className="text-sm text-muted-foreground">AI will proactively suggest optimizations</p>
                  </div>
                  <Switch
                    checked={settings.proactiveInsights}
                    onCheckedChange={(checked) => handleSettingChange('proactiveInsights', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Voice Assistant</Label>
                    <p className="text-sm text-muted-foreground">Enable voice interactions with the AI</p>
                  </div>
                  <Switch
                    checked={settings.voiceEnabled}
                    onCheckedChange={(checked) => handleSettingChange('voiceEnabled', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card className="widget">
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="p-2 bg-gradient-to-r from-gray-500 to-gray-600 rounded-lg mr-3">
                  <SettingsIcon className="w-5 h-5 text-white" />
                </div>
                Advanced Settings
              </CardTitle>
              <CardDescription>
                Configure advanced app behavior and performance settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <Select value={settings.theme} onValueChange={(value) => handleSettingChange('theme', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Auto Refresh Interval (minutes)</Label>
                  <div className="px-3">
                    <Slider
                      value={[settings.refreshInterval]}
                      onValueChange={(value) => handleSettingChange('refreshInterval', value[0])}
                      max={30}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-1">
                      <span>1 min</span>
                      <span>{settings.refreshInterval} min</span>
                      <span>30 min</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Compact Mode</Label>
                    <p className="text-sm text-muted-foreground">Show more information in less space</p>
                  </div>
                  <Switch
                    checked={settings.compactMode}
                    onCheckedChange={(checked) => handleSettingChange('compactMode', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Show Tips</Label>
                    <p className="text-sm text-muted-foreground">Display helpful tips throughout the app</p>
                  </div>
                  <Switch
                    checked={settings.showTips}
                    onCheckedChange={(checked) => handleSettingChange('showTips', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Auto Refresh</Label>
                    <p className="text-sm text-muted-foreground">Automatically refresh data in the background</p>
                  </div>
                  <Switch
                    checked={settings.autoRefresh}
                    onCheckedChange={(checked) => handleSettingChange('autoRefresh', checked)}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h4 className="font-semibold">Reset Options</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline">Reset to Defaults</Button>
                  <Button variant="outline">Clear Cache</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings; 