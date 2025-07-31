import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  TrendingUp, 
  Shield, 
  Target, 
  PiggyBank, 
  CreditCard, 
  BarChart3, 
  Zap,
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Globe,
  Smartphone,
  Lock
} from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 transition-all duration-300 hover:bg-white/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3 group cursor-pointer transition-all duration-300 hover:scale-105">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:scale-110">
                <span className="text-white font-bold text-sm">W</span>
              </div>
              <span className="font-semibold text-gray-900 text-lg transition-colors duration-300 group-hover:text-emerald-600">Wealthwise</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-all duration-300 hover:scale-105 relative group">
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-all duration-300 hover:scale-105 relative group">
                How it Works
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>
            <Link to="/login">
              <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <Badge className="mb-6 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200 transition-all duration-300 hover:scale-105 hover:shadow-md cursor-pointer">
              <Brain className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:rotate-12" />
              AI-Powered Personal Finance
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight transition-all duration-300 hover:scale-[1.02]">
              Your Financial Future,
              <br />
              <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Intelligently Orchestrated
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto transition-all duration-300 hover:text-gray-700">
              Step into a new era of personal finance with Wealthwise – the smart, secure AI companion designed to optimize your financial decisions and drive wealth growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/login">
                <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white px-8 py-3 text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl group">
                  Start Your Journey
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Hero Visual */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="relative transition-all duration-300 hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-blue-400/20 rounded-3xl blur-3xl transition-all duration-300 hover:blur-2xl"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl transition-all duration-300 hover:shadow-3xl hover:bg-white/90">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-gradient-to-br hover:from-emerald-100 hover:to-emerald-200 cursor-pointer group">
                    <TrendingUp className="w-8 h-8 text-emerald-600 mb-3 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
                    <h3 className="font-semibold text-gray-900 transition-colors duration-300 group-hover:text-emerald-700">Portfolio Growth</h3>
                    <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">AI-optimized investment strategies</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-gradient-to-br hover:from-blue-100 hover:to-blue-200 cursor-pointer group">
                    <Shield className="w-8 h-8 text-blue-600 mb-3 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
                    <h3 className="font-semibold text-gray-900 transition-colors duration-300 group-hover:text-blue-700">Smart Security</h3>
                    <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">Advanced fraud protection</p>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-32 h-32 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:rotate-6 cursor-pointer group">
                    <Brain className="w-16 h-16 text-white transition-all duration-300 group-hover:scale-110" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-gradient-to-br hover:from-purple-100 hover:to-purple-200 cursor-pointer group">
                    <Target className="w-8 h-8 text-purple-600 mb-3 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
                    <h3 className="font-semibold text-gray-900 transition-colors duration-300 group-hover:text-purple-700">Goal Planning</h3>
                    <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">Personalized financial goals</p>
                  </div>
                  <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-gradient-to-br hover:from-pink-100 hover:to-pink-200 cursor-pointer group">
                    <Zap className="w-8 h-8 text-pink-600 mb-3 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
                    <h3 className="font-semibold text-gray-900 transition-colors duration-300 group-hover:text-pink-700">Instant Insights</h3>
                    <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">Real-time financial analysis</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200 transition-all duration-300 hover:scale-105 hover:shadow-md cursor-pointer">
              MEET WEALTHWISE
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 transition-all duration-300 hover:scale-[1.02]">
              A Complete AI-Powered
              <br />
              <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Financial Platform
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto transition-all duration-300 hover:text-gray-700">
              Everything you need to manage, grow, and protect your wealth in one intelligent platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-emerald-50 to-emerald-100 hover:scale-105 hover:bg-gradient-to-br hover:from-emerald-100 hover:to-emerald-200 cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-lg">
                  <TrendingUp className="w-6 h-6 text-white transition-all duration-300 group-hover:scale-110" />
                </div>
                <CardTitle className="text-xl transition-colors duration-300 group-hover:text-emerald-700">Portfolio Management</CardTitle>
                <CardDescription className="transition-colors duration-300 group-hover:text-gray-700">
                  AI-driven investment strategies and real-time portfolio optimization.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-blue-100 hover:scale-105 hover:bg-gradient-to-br hover:from-blue-100 hover:to-blue-200 cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-lg">
                  <PiggyBank className="w-6 h-6 text-white transition-all duration-300 group-hover:scale-110" />
                </div>
                <CardTitle className="text-xl transition-colors duration-300 group-hover:text-blue-700">Savings Booster</CardTitle>
                <CardDescription className="transition-colors duration-300 group-hover:text-gray-700">
                  Smart savings strategies and automated goal tracking.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 to-purple-100 hover:scale-105 hover:bg-gradient-to-br hover:from-purple-100 hover:to-purple-200 cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-lg">
                  <CreditCard className="w-6 h-6 text-white transition-all duration-300 group-hover:scale-110" />
                </div>
                <CardTitle className="text-xl transition-colors duration-300 group-hover:text-purple-700">Credit Management</CardTitle>
                <CardDescription className="transition-colors duration-300 group-hover:text-gray-700">
                  Monitor and improve your credit score with AI insights.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-pink-50 to-pink-100 hover:scale-105 hover:bg-gradient-to-br hover:from-pink-100 hover:to-pink-200 cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-lg">
                  <Target className="w-6 h-6 text-white transition-all duration-300 group-hover:scale-110" />
                </div>
                <CardTitle className="text-xl transition-colors duration-300 group-hover:text-pink-700">Goal Planning</CardTitle>
                <CardDescription className="transition-colors duration-300 group-hover:text-gray-700">
                  Personalized financial goals with AI-powered recommendations.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-orange-50 to-orange-100 hover:scale-105 hover:bg-gradient-to-br hover:from-orange-100 hover:to-orange-200 cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-lg">
                  <BarChart3 className="w-6 h-6 text-white transition-all duration-300 group-hover:scale-110" />
                </div>
                <CardTitle className="text-xl transition-colors duration-300 group-hover:text-orange-700">Budget Manager</CardTitle>
                <CardDescription className="transition-colors duration-300 group-hover:text-gray-700">
                  Intelligent budgeting with spending insights and recommendations.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-indigo-50 to-indigo-100 hover:scale-105 hover:bg-gradient-to-br hover:from-indigo-100 hover:to-indigo-200 cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-lg">
                  <Shield className="w-6 h-6 text-white transition-all duration-300 group-hover:scale-110" />
                </div>
                <CardTitle className="text-xl transition-colors duration-300 group-hover:text-indigo-700">Insurance Advisor</CardTitle>
                <CardDescription className="transition-colors duration-300 group-hover:text-gray-700">
                  AI-powered insurance recommendations and coverage analysis.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-emerald-100 to-blue-100 text-emerald-700 border-emerald-200 transition-all duration-300 hover:scale-105 hover:shadow-md cursor-pointer">
              Simple Onboarding, Fast Results
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 transition-all duration-300 hover:scale-[1.02]">
              How to Get Started
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center transition-all duration-300 hover:scale-105 cursor-pointer group">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-lg">
                <span className="text-white font-bold text-xl transition-all duration-300 group-hover:scale-110">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 transition-colors duration-300 group-hover:text-emerald-600">Sign Up & Connect</h3>
              <p className="text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
                Create your account and securely connect your financial accounts in minutes.
              </p>
            </div>

            <div className="text-center transition-all duration-300 hover:scale-105 cursor-pointer group">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-lg">
                <span className="text-white font-bold text-xl transition-all duration-300 group-hover:scale-110">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 transition-colors duration-300 group-hover:text-emerald-600">AI Analysis</h3>
              <p className="text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
                Our AI analyzes your financial situation and creates personalized recommendations.
              </p>
            </div>

            <div className="text-center transition-all duration-300 hover:scale-105 cursor-pointer group">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-lg">
                <span className="text-white font-bold text-xl transition-all duration-300 group-hover:scale-110">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 transition-colors duration-300 group-hover:text-emerald-600">Start Growing</h3>
              <p className="text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
                Begin implementing AI-powered strategies to grow your wealth and achieve your goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200 transition-all duration-300 hover:scale-105 hover:shadow-md cursor-pointer">
                Your Ally in Financial Innovation
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 transition-all duration-300 hover:scale-[1.02]">
                Your Ally in
                <br />
                <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  Financial Innovation
                </span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 transition-all duration-300 hover:text-gray-700">
                Users worldwide trust Wealthwise for intelligent, reliable financial management solutions tailored to today's demands. Our innovative AI platform simplifies personal finance, supporting individuals of all backgrounds to operate efficiently and grow wealth with confidence.
              </p>
              <Link to="/login">
                <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg group">
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-gradient-to-br hover:from-emerald-100 hover:to-emerald-200 cursor-pointer group">
                  <CheckCircle className="w-8 h-8 text-emerald-600 mb-3 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
                  <h3 className="font-semibold text-gray-900 transition-colors duration-300 group-hover:text-emerald-700">AI-Powered Insights</h3>
                  <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">Get personalized financial advice</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-gradient-to-br hover:from-blue-100 hover:to-blue-200 cursor-pointer group">
                  <Lock className="w-8 h-8 text-blue-600 mb-3 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
                  <h3 className="font-semibold text-gray-900 transition-colors duration-300 group-hover:text-blue-700">Bank-Level Security</h3>
                  <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">Your data is always protected</p>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-gradient-to-br hover:from-purple-100 hover:to-purple-200 cursor-pointer group">
                  <Globe className="w-8 h-8 text-purple-600 mb-3 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
                  <h3 className="font-semibold text-gray-900 transition-colors duration-300 group-hover:text-purple-700">Global Access</h3>
                  <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">Manage finances anywhere</p>
                </div>
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-gradient-to-br hover:from-pink-100 hover:to-pink-200 cursor-pointer group">
                  <Smartphone className="w-8 h-8 text-pink-600 mb-3 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
                  <h3 className="font-semibold text-gray-900 transition-colors duration-300 group-hover:text-pink-700">Mobile First</h3>
                  <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">Optimized for all devices</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 transition-all duration-300 hover:scale-[1.02]">
              Trusted by Users Worldwide
            </h2>
            <p className="text-xl text-gray-600 transition-all duration-300 hover:text-gray-700">
              See what our users say about their Wealthwise experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current transition-all duration-300 group-hover:scale-110" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 transition-colors duration-300 group-hover:text-gray-700">
                  "Wealthwise has completely transformed how I manage my finances. The AI insights are incredibly accurate and have helped me save more than ever before."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mr-3 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                    <span className="text-white font-semibold">S</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 transition-colors duration-300 group-hover:text-emerald-600">Sarah Johnson</p>
                    <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">Software Engineer</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current transition-all duration-300 group-hover:scale-110" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 transition-colors duration-300 group-hover:text-gray-700">
                  "The portfolio management feature is amazing. It's like having a personal financial advisor available 24/7. My investments have never been better."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-3 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                    <span className="text-white font-semibold">M</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 transition-colors duration-300 group-hover:text-purple-600">Michael Chen</p>
                    <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">Entrepreneur</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current transition-all duration-300 group-hover:scale-110" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 transition-colors duration-300 group-hover:text-gray-700">
                  "Finally, a financial app that actually understands my goals and helps me achieve them. The goal planning feature is a game-changer."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mr-3 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                    <span className="text-white font-semibold">E</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 transition-colors duration-300 group-hover:text-orange-600">Emily Rodriguez</p>
                    <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">Marketing Manager</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-blue-600 transition-all duration-300 hover:from-emerald-700 hover:to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 transition-all duration-300 hover:scale-[1.02]">
            Simplify Finance,
            <br />
            Amplify Success
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-3xl mx-auto transition-all duration-300 hover:text-white">
            Let's make personal finance simpler, smarter, and stress-free. Partner with Wealthwise for innovative AI solutions designed to meet your unique financial needs.
          </p>
          <Link to="/login">
            <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-3 text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl group">
              Get Started Today
              <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 transition-all duration-300 hover:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="flex items-center space-x-3 mb-4 md:mb-0 group cursor-pointer transition-all duration-300 hover:scale-105">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-lg">
                <span className="text-white font-bold text-sm">W</span>
              </div>
              <span className="font-semibold text-lg transition-colors duration-300 group-hover:text-emerald-400">Wealthwise</span>
            </div>
            <p className="text-gray-400 max-w-xl text-center md:text-left transition-all duration-300 hover:text-gray-300">
              Your financial future, intelligently orchestrated with AI-powered insights and personalized recommendations.
            </p>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 transition-all duration-300 hover:text-gray-300">
            <p>&copy; 2024 Wealthwise. All rights reserved. Your financial future, intelligently orchestrated by sharp minds at BSH Tech and SIcherHaven</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;