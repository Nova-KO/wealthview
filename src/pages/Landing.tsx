import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Sphere, Box, Torus, Text3D, Center, Environment } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import {
  DollarSign,
  TrendingUp,
  Shield,
  Target,
  Zap,
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  BarChart3,
  Brain,
  Clock
} from 'lucide-react';
import * as THREE from 'three';

// Error Boundary Component
class Scene3DErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn('3D Scene Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

// 3D Scene Components
const FloatingCoin = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    try {
      if (meshRef.current) {
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
        meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      }
    } catch (error) {
      console.warn('FloatingCoin animation error:', error);
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <cylinderGeometry args={[0.5, 0.5, 0.1, 32]} />
        <meshStandardMaterial color="#ffd700" metalness={0.8} roughness={0.2} />
      </mesh>
    </Float>
  );
};

const AnimatedSphere = ({ position, color }: { position: [number, number, number], color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    try {
      if (meshRef.current) {
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.2;
        meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      }
    } catch (error) {
      console.warn('AnimatedSphere animation error:', error);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial color={color} transparent opacity={0.8} />
    </mesh>
  );
};

const Scene3D = () => {
  try {
    return (
      <>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        {/* Floating Elements */}
        <FloatingCoin position={[-2, 1, 0]} />
        <FloatingCoin position={[2, -1, 0]} />
        <FloatingCoin position={[0, 2, -1]} />
        
        <AnimatedSphere position={[-3, 0, -1]} color="#22d3ee" />
        <AnimatedSphere position={[3, 1, -1]} color="#3b82f6" />
        <AnimatedSphere position={[0, -2, -1]} color="#8b5cf6" />
        
        {/* Central rotating torus */}
        <Float speed={1} rotationIntensity={2}>
          <Torus args={[1.5, 0.3, 16, 100]} position={[0, 0, -2]}>
            <meshStandardMaterial color="#06b6d4" transparent opacity={0.6} />
          </Torus>
        </Float>
        
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </>
    );
  } catch (error) {
    console.warn('Scene3D render error:', error);
    return (
      <>
        <ambientLight intensity={0.5} />
        <mesh>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial color="#06b6d4" transparent opacity={0.3} />
        </mesh>
      </>
    );
  }
};

const Landing: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Portfolio Manager",
      description: "Analyze and optimize your investment portfolio with AI-powered insights. Track stocks, mutual funds, and get rebalancing recommendations.",
      status: "available"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Budget Manager",
      description: "Take control of your spending with intelligent budget tracking. Monitor expenses, set category limits, and get spending insights.",
      status: "available"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Savings Booster",
      description: "Maximize your savings potential with AI-driven cost optimization. Find duplicate subscriptions and money-saving opportunities.",
      status: "available"
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Credit Manager",
      description: "Optimize your credit health with intelligent payment strategies. Monitor CIBIL score and get improvement recommendations.",
      status: "coming-soon"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Insurance Advisor",
      description: "Find the perfect insurance coverage for your needs. Get personalized recommendations and policy comparisons.",
      status: "coming-soon"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "AI Jar (Goal Planning)",
      description: "Achieve your financial dreams with intelligent goal planning. Set targets, track progress, and get step-by-step guidance.",
      status: "coming-soon"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Voice Bot Assistant",
      description: "Access your financial information hands-free with voice commands. Get spoken insights and natural language queries.",
      status: "coming-soon"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Commitment Advisor",
      description: "Make informed decisions about major financial commitments. Get timing recommendations and affordability analysis.",
      status: "coming-soon"
    }
  ];

  const stats = [
    { value: "₹50L+", label: "Money Saved" },
    { value: "10K+", label: "Happy Users" },
    { value: "95%", label: "Success Rate" },
    { value: "24/7", label: "AI Support" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-cyan-100 overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
          <Scene3DErrorBoundary 
            fallback={
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-100/50 via-blue-100/50 to-purple-100/50">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1)_0%,transparent_50%)]"></div>
              </div>
            }
          >
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }} gl={{ antialias: true, alpha: true }}>
              <Suspense fallback={
                <mesh>
                  <sphereGeometry args={[0.5, 32, 32]} />
                  <meshBasicMaterial color="#06b6d4" transparent opacity={0.3} />
                </mesh>
              }>
                <Scene3D />
              </Suspense>
            </Canvas>
          </Scene3DErrorBoundary>
        </div>

        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-400/20 to-cyan-500/20 rounded-full blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 lg:px-6">
          <Badge className="mb-4 lg:mb-6 bg-white/20 border-white/30 text-primary backdrop-blur-sm text-sm">
            <Star className="w-3 h-3 lg:w-4 lg:h-4 mr-2" />
            India's #1 AI Financial Assistant
          </Badge>
          
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 lg:mb-6 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
            Your Money,
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Powered by AI
            </span>
          </h1>
          
          <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-muted-foreground mb-6 lg:mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform your financial future with intelligent insights, automated savings, 
            and personalized investment strategies designed for Indian investors.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center items-center mb-8 lg:mb-12">
            <Button 
              size="lg" 
              className="w-full sm:w-auto text-base lg:text-lg px-6 lg:px-8 py-4 lg:py-6 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => navigate('/app')}
            >
              Start Your Journey
              <ArrowRight className="ml-2 w-4 h-4 lg:w-5 lg:h-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto text-base lg:text-lg px-6 lg:px-8 py-4 lg:py-6 bg-white/20 border-white/30 backdrop-blur-sm hover:bg-white/30 transition-all duration-300"
            >
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-primary mb-1 lg:mb-2">{stat.value}</div>
                <div className="text-xs lg:text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 lg:py-20 px-4 lg:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 lg:mb-6 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Complete Financial Management Suite
            </h2>
            <p className="text-base lg:text-xl text-muted-foreground max-w-3xl mx-auto mb-6 lg:mb-8">
              Discover how AI can revolutionize your relationship with money
            </p>
            
            {/* Available Features Highlight */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-4 lg:p-6 mb-8 lg:mb-12 border border-green-200">
              <div className="flex items-center justify-center mb-3 lg:mb-4">
                <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-green-600 mr-2" />
                <span className="text-base lg:text-lg font-semibold text-green-800">Now Available</span>
              </div>
              <p className="text-sm lg:text-base text-green-700">
                <strong>Portfolio Manager, Budget Tracker & Savings Booster</strong> are live and ready to transform your finances!
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-white/20 relative">
                <CardHeader className="p-4 lg:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 lg:w-16 lg:h-16 rounded-xl ${
                      feature.status === 'available' 
                        ? 'bg-gradient-to-br from-cyan-400 to-blue-600' 
                        : 'bg-gradient-to-br from-gray-400 to-gray-600'
                    } flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                      <div className="scale-75 lg:scale-100">
                        {feature.icon}
                      </div>
                    </div>
                    <Badge 
                      variant={feature.status === 'available' ? 'default' : 'secondary'}
                      className={feature.status === 'available' 
                        ? 'bg-green-100 text-green-700 border-green-200' 
                        : 'bg-orange-100 text-orange-700 border-orange-200'
                      }
                    >
                      {feature.status === 'available' ? (
                        <>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Available
                        </>
                      ) : (
                        <>
                          <Clock className="w-3 h-3 mr-1" />
                          Coming Soon
                        </>
                      )}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg lg:text-xl mb-2">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 lg:p-6 pt-0">
                  <CardDescription className="text-sm lg:text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                  {feature.status === 'available' && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-4 w-full"
                      onClick={() => navigate('/app')}
                    >
                      Try Now
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white border-none shadow-2xl">
            <CardContent className="p-12">
              <h3 className="text-4xl font-bold mb-6">
                Start Managing Your Money Smarter Today
              </h3>
              <p className="text-xl mb-6 opacity-90">
                Get instant access to Portfolio Management, Budget Tracking, and Savings Optimization
              </p>
              
              {/* Feature Pills */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                <Badge className="bg-white/20 text-white border-white/30 px-4 py-2 text-sm">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Track Investments
                </Badge>
                <Badge className="bg-white/20 text-white border-white/30 px-4 py-2 text-sm">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Monitor Budget
                </Badge>
                <Badge className="bg-white/20 text-white border-white/30 px-4 py-2 text-sm">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Boost Savings
                </Badge>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="text-lg px-8 py-6 bg-white text-primary hover:bg-gray-100"
                  onClick={() => navigate('/app')}
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
              
              <p className="text-sm opacity-75 mt-4">
                No credit card required • Full access to available features • More coming soon
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Landing;