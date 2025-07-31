import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Eye, 
  EyeOff, 
  ArrowRight,
  Lock,
  Mail,
  Shield,
  CheckCircle,
  Play
} from 'lucide-react';

interface LoginProps {
  onAuthSuccess: () => void;
}

const Login = ({ onAuthSuccess }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate authentication (replace with actual auth logic)
    setTimeout(() => {
      if (email && password) {
        // For demo purposes, accept any email/password
        onAuthSuccess();
        navigate('/app');
      } else {
        setError('Please enter both email and password');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleDemoLogin = () => {
    setIsLoading(true);
    setError('');
    
    // Auto-fill demo credentials
    setEmail('demo@wealthwise.com');
    setPassword('demo123');
    
    // Simulate demo login
    setTimeout(() => {
      onAuthSuccess();
      navigate('/app');
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Brand */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">W</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Wealthwise</h1>
          <p className="text-gray-600">Your AI-powered financial companion</p>
        </div>

        {/* Demo Login Button */}
        <div className="mb-6">
          <Button
            onClick={handleDemoLogin}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 mb-4"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Loading demo...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Play className="w-4 h-4" />
                <span>Try Demo</span>
              </div>
            )}
          </Button>
          
          <div className="text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              <Shield className="w-3 h-3 mr-1" />
              Perfect for client demos
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 text-gray-500">or sign in manually</span>
          </div>
        </div>

        {/* Login Card */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl font-semibold text-gray-900">
              Sign in to your account
            </CardTitle>
            <CardDescription className="text-gray-600">
              Access your personalized financial dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-white/50 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 bg-white/50 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-md p-3">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white py-3"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>Sign in</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg border border-emerald-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                <Shield className="w-4 h-4 mr-2 text-emerald-600" />
                Demo Credentials
              </h3>
              <p className="text-xs text-gray-600 mb-2">
                Use any email and password to sign in for demo purposes:
              </p>
              <div className="text-xs text-gray-700 space-y-1">
                <div><strong>Email:</strong> demo@wealthwise.com</div>
                <div><strong>Password:</strong> any password</div>
              </div>
            </div>

            {/* Additional Links */}
            <div className="mt-6 text-center space-y-2">
              <Link to="/" className="text-sm text-emerald-600 hover:text-emerald-700 transition-colors">
                ← Back to landing page
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Features Preview */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Brain className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-xs text-gray-600">AI Insights</p>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-xs text-gray-600">Smart Planning</p>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Shield className="w-4 h-4 text-purple-600" />
            </div>
            <p className="text-xs text-gray-600">Secure</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 