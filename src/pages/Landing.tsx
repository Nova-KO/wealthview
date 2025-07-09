import React, { Suspense, useRef } from 'react';
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
  Brain
} from 'lucide-react';
import * as THREE from 'three';

// 3D Scene Components
const FloatingCoin = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
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
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.2;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
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
  return (
    <>
      <Environment preset="city" />
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
};

const Landing: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Insights",
      description: "Get personalized financial recommendations powered by advanced AI algorithms"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Portfolio Management",
      description: "Optimize your investments with real-time analysis and smart rebalancing"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Bank-Level Security",
      description: "Your financial data is protected with enterprise-grade encryption"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Goal Planning",
      description: "Set and achieve your financial goals with intelligent planning tools"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Insights",
      description: "Get real-time updates and alerts about your financial health"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Smart Analytics",
      description: "Visualize your spending patterns and discover saving opportunities"
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
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <Suspense fallback={null}>
              <Scene3D />
            </Suspense>
          </Canvas>
        </div>

        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-400/20 to-cyan-500/20 rounded-full blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <Badge className="mb-6 bg-white/20 border-white/30 text-primary backdrop-blur-sm">
            <Star className="w-4 h-4 mr-2" />
            India's #1 AI Financial Assistant
          </Badge>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
            Your Money,
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Powered by AI
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform your financial future with intelligent insights, automated savings, 
            and personalized investment strategies designed for Indian investors.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => navigate('/app')}
            >
              Start Your Journey
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6 bg-white/20 border-white/30 backdrop-blur-sm hover:bg-white/30 transition-all duration-300"
            >
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Intelligent Financial Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover how AI can revolutionize your relationship with money
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
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
                Ready to Transform Your Finances?
              </h3>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of Indians who are already using AI to build wealth smarter.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="text-lg px-8 py-6 bg-white text-primary hover:bg-gray-100"
                  onClick={() => navigate('/app')}
                >
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Landing;