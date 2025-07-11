
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, DollarSign, Shield, TrendingUp } from 'lucide-react';

interface AuthFormProps {
  onLogin: (email: string, password: string) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      onLogin(email, password);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 lg:p-8 bg-gradient-to-br from-cyan-50 via-blue-50 to-cyan-100">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-60 h-60 lg:w-80 lg:h-80 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-60 h-60 lg:w-80 lg:h-80 bg-gradient-to-tr from-blue-400/20 to-cyan-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo and branding */}
        <div className="text-center mb-6 lg:mb-8 fade-in">
          <div className="inline-flex items-center justify-center w-14 h-14 lg:w-16 lg:h-16 rounded-2xl gradient-primary mb-4 shadow-lg">
            <DollarSign className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            AI Money Companion
          </h1>
          <p className="text-sm lg:text-base text-muted-foreground mt-2">Your intelligent financial assistant</p>
        </div>

        {/* Auth form */}
        <Card className="glass-card slide-up">
          <CardHeader className="text-center">
            <CardTitle className="text-xl lg:text-2xl font-bold">
              {isLogin ? 'Welcome Back' : 'Get Started'}
            </CardTitle>
            <CardDescription className="text-sm lg:text-base">
              {isLogin 
                ? 'Sign in to access your financial dashboard' 
                : 'Create your account to begin your financial journey'
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="glass"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="glass pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="glass"
                  />
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full gradient-primary text-white hover:scale-105 transition-all duration-300"
                disabled={loading}
              >
                {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <Button
                variant="outline"
                onClick={() => onLogin('demo@demo.com', 'demo')}
                className="w-full mb-4"
              >
                Skip for now (Demo Mode)
              </Button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <Button
                  variant="link"
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-1 p-0 h-auto text-primary hover:text-primary/80"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Features preview */}
        <div className="grid grid-cols-3 gap-2 lg:gap-4 mt-6 lg:mt-8 fade-in">
          <div className="glass-card text-center p-3 lg:p-4">
            <Shield className="w-5 h-5 lg:w-6 lg:h-6 text-primary mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">Secure & Encrypted</p>
          </div>
          <div className="glass-card text-center p-3 lg:p-4">
            <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-primary mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">Smart Analytics</p>
          </div>
          <div className="glass-card text-center p-3 lg:p-4">
            <DollarSign className="w-5 h-5 lg:w-6 lg:h-6 text-primary mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">AI Recommendations</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
