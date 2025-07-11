import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Mic,
  MicOff,
  Send,
  X,
  Volume2,
  TrendingUp,
  DollarSign,
  PieChart,
  Calendar,
  Wallet,
  Target,
  CreditCard,
  Heart
} from 'lucide-react';

interface VoiceQuery {
  id: string;
  query: string;
  response: string;
  type: 'portfolio' | 'budget' | 'credit' | 'goals' | 'general';
  data?: any;
}

const FloatingVoiceBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [conversation, setConversation] = useState<Array<{
    type: 'user' | 'bot';
    message: string;
    data?: any;
    timestamp: Date;
  }>>([]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const conversationRef = useRef<HTMLDivElement>(null);

  // Demo financial data
  const demoData = {
    portfolio: {
      totalValue: 1245000,
      todayChange: 15750,
      todayChangePercent: 1.28,
      topPerformer: 'HDFC Bank',
      topPerformerGain: 8.5,
      allocation: {
        equity: 65,
        debt: 25,
        gold: 10
      },
      holdings: [
        { name: 'HDFC Bank', value: 285000, change: 8.5 },
        { name: 'Reliance Industries', value: 220000, change: -2.1 },
        { name: 'ICICI Bank', value: 185000, change: 4.2 },
        { name: 'SBI ETF Gold', value: 125000, change: 0.8 }
      ]
    },
    budget: {
      monthlyIncome: 125000,
      monthlyExpenses: 67500,
      savingsRate: 46,
      topExpenseCategory: 'Food & Dining',
      topExpenseAmount: 18500
    },
    credit: {
      creditScore: 768,
      totalLimit: 350000,
      utilization: 28,
      nextDueDate: '15 May 2024'
    },
    goals: {
      totalGoals: 5,
      onTrack: 4,
      emergencyFund: 450000,
      emergencyFundTarget: 600000
    }
  };

  // Voice queries with responses
  const voiceQueries: VoiceQuery[] = [
    {
      id: '1',
      query: 'what is my current portfolio standing',
      response: `Your portfolio is currently valued at ₹12.45 lakhs, up by ₹15,750 today (1.28%). Your top performer is HDFC Bank with 8.5% gains. Your allocation is 65% equity, 25% debt, and 10% gold.`,
      type: 'portfolio',
      data: demoData.portfolio
    },
    {
      id: '2',
      query: 'how is my portfolio performing',
      response: `Your portfolio is performing well today with a gain of ₹15,750 (1.28%). HDFC Bank is your top performer with 8.5% gains, while Reliance is down 2.1%. Overall, you're maintaining a balanced allocation.`,
      type: 'portfolio',
      data: demoData.portfolio
    },
    {
      id: '3',
      query: 'what are my top holdings',
      response: `Your top holdings are: HDFC Bank (₹2.85L, +8.5%), Reliance Industries (₹2.20L, -2.1%), ICICI Bank (₹1.85L, +4.2%), and SBI ETF Gold (₹1.25L, +0.8%).`,
      type: 'portfolio',
      data: demoData.portfolio
    },
    {
      id: '4',
      query: 'show me my budget summary',
      response: `Your monthly income is ₹1.25 lakhs with expenses of ₹67,500, giving you a healthy 46% savings rate. Your top expense category is Food & Dining at ₹18,500.`,
      type: 'budget',
      data: demoData.budget
    },
    {
      id: '5',
      query: 'what is my credit score',
      response: `Your credit score is 768, which is excellent. Your total credit limit is ₹3.5 lakhs with 28% utilization. Your next payment is due on 15th May 2024.`,
      type: 'credit',
      data: demoData.credit
    },
    {
      id: '6',
      query: 'how are my financial goals',
      response: `You have 5 active financial goals with 4 on track. Your emergency fund is at ₹4.5 lakhs, which is 75% of your ₹6 lakh target.`,
      type: 'goals',
      data: demoData.goals
    }
  ];

  const processVoiceQuery = (query: string): VoiceQuery | null => {
    const normalizedQuery = query.toLowerCase().trim();
    
    return voiceQueries.find(vq => 
      normalizedQuery.includes('portfolio') ||
      normalizedQuery.includes('holdings') ||
      normalizedQuery.includes('budget') ||
      normalizedQuery.includes('credit score') ||
      normalizedQuery.includes('goals') ||
      normalizedQuery.includes('performing')
    ) || null;
  };

  const handleVoiceInput = async () => {
    if (isListening) {
      setIsListening(false);
      setIsProcessing(true);
      
      // Simulate processing delay
      setTimeout(() => {
        const demoQuery = voiceQueries[0]; // Default to portfolio query
        setConversation(prev => [
          ...prev,
          {
            type: 'user',
            message: demoQuery.query,
            timestamp: new Date()
          },
          {
            type: 'bot',
            message: demoQuery.response,
            data: demoQuery.data,
            timestamp: new Date()
          }
        ]);
        setIsProcessing(false);
      }, 2000);
    } else {
      setIsListening(true);
      // Auto-stop listening after 3 seconds for demo
      setTimeout(() => {
        if (isListening) {
          handleVoiceInput();
        }
      }, 3000);
    }
  };

  const handleTextSubmit = () => {
    if (!textInput.trim()) return;

    const matchedQuery = processVoiceQuery(textInput);
    
    setConversation(prev => [
      ...prev,
      {
        type: 'user',
        message: textInput,
        timestamp: new Date()
      }
    ]);

    if (matchedQuery) {
      setTimeout(() => {
        setConversation(prev => [
          ...prev,
          {
            type: 'bot',
            message: matchedQuery.response,
            data: matchedQuery.data,
            timestamp: new Date()
          }
        ]);
      }, 1000);
    } else {
      setTimeout(() => {
        setConversation(prev => [
          ...prev,
          {
            type: 'bot',
            message: "I can help you with portfolio status, budget summary, credit score, and financial goals. Try asking 'What is my current portfolio standing?' or 'Show me my budget summary'.",
            timestamp: new Date()
          }
        ]);
      }, 1000);
    }

    setTextInput('');
  };

  const renderDataVisualization = (data: any, type: string) => {
    switch (type) {
      case 'portfolio':
        return (
          <div className="mt-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground">Total Value:</span>
                <p className="font-semibold">₹{(data.totalValue / 100000).toFixed(2)}L</p>
              </div>
              <div>
                <span className="text-muted-foreground">Today's Change:</span>
                <p className="font-semibold text-green-600">+₹{(data.todayChange / 1000).toFixed(1)}K</p>
              </div>
            </div>
          </div>
        );
      
      case 'budget':
        return (
          <div className="mt-3 p-3 rounded-lg bg-green-50 border border-green-200">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground">Savings Rate:</span>
                <p className="font-semibold text-green-600">{data.savingsRate}%</p>
              </div>
              <div>
                <span className="text-muted-foreground">Monthly Save:</span>
                <p className="font-semibold">₹{((data.monthlyIncome - data.monthlyExpenses) / 1000).toFixed(0)}K</p>
              </div>
            </div>
          </div>
        );
      
      case 'credit':
        return (
          <div className="mt-3 p-3 rounded-lg bg-purple-50 border border-purple-200">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground">Credit Score:</span>
                <p className="font-semibold text-purple-600">{data.creditScore}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Utilization:</span>
                <p className="font-semibold">{data.utilization}%</p>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    // Small delay to ensure DOM is ready, then trigger animation
    setTimeout(() => setIsAnimating(true), 10);
  };

  const handleClose = () => {
    setIsAnimating(false);
    // Delay the actual close to allow animation to complete
    setTimeout(() => setIsOpen(false), 300);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation, isProcessing]);

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-4 right-4 lg:bottom-6 lg:right-6 z-50">
        <Button
          onClick={handleOpen}
          className={`w-12 h-12 lg:w-14 lg:h-14 rounded-full shadow-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 hover:scale-110 ${
            isOpen ? 'scale-95 opacity-75' : 'animate-pulse hover:animate-none'
          }`}
          size="icon"
        >
          <Mic className={`w-5 h-5 lg:w-6 lg:h-6 text-white transition-transform duration-200 ${
            isOpen ? '' : 'group-hover:scale-110'
          }`} />
        </Button>
      </div>

      {/* Voice Bot Modal */}
      {isOpen && (
        <div 
          className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-end justify-end p-4 lg:p-6 transition-all duration-300 ${
            isAnimating ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={handleClose}
        >
          <Card 
            className={`w-full lg:w-96 h-[80vh] lg:h-[500px] max-h-[600px] glass shadow-2xl flex flex-col transform transition-all duration-300 ease-out ${
              isAnimating 
                ? 'translate-y-0 translate-x-0 scale-100 opacity-100' 
                : 'translate-y-8 translate-x-4 lg:translate-x-8 scale-95 opacity-0'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center mr-3">
                    <Mic className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-base lg:text-lg">Voice Assistant</CardTitle>
                    <CardDescription className="text-sm">Ask about your finances</CardDescription>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClose}
                  className="h-8 w-8 hover:bg-red-100 hover:text-red-600 transition-colors duration-200"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-3 lg:p-4 min-h-0">
              {/* Conversation Area */}
              <div 
                ref={conversationRef}
                className="flex-1 overflow-y-auto overflow-x-hidden space-y-3 mb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 min-h-0 max-h-full"
                style={{ scrollbarWidth: 'thin' }}
              >
                {conversation.length === 0 && (
                  <div className="text-center text-muted-foreground py-6 lg:py-8 animate-in fade-in-50 duration-500">
                    <Volume2 className="w-6 h-6 lg:w-8 lg:h-8 mx-auto mb-2 opacity-50 animate-pulse" />
                    <p className="text-sm mb-2">Try asking:</p>
                    <div className="mt-2 space-y-1 text-xs">
                      <p className="animate-in slide-in-from-bottom-2 duration-500" style={{animationDelay: '200ms'}}>"What is my portfolio standing?"</p>
                      <p className="animate-in slide-in-from-bottom-2 duration-500" style={{animationDelay: '400ms'}}>"Show me my budget summary"</p>
                      <p className="animate-in slide-in-from-bottom-2 duration-500" style={{animationDelay: '600ms'}}>"What is my credit score?"</p>
                    </div>
                  </div>
                )}
                
                {conversation.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300 flex-shrink-0`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`max-w-[85%] lg:max-w-[80%] p-2 lg:p-3 rounded-lg text-xs lg:text-sm transform transition-all duration-200 hover:scale-[1.02] break-words ${
                      msg.type === 'user' 
                        ? 'bg-blue-500 text-white shadow-lg' 
                        : 'bg-gray-100 text-gray-800 shadow-md'
                    }`}>
                      <p>{msg.message}</p>
                      {msg.data && renderDataVisualization(msg.data, conversation[index-1]?.message.includes('portfolio') ? 'portfolio' : 
                        conversation[index-1]?.message.includes('budget') ? 'budget' :
                        conversation[index-1]?.message.includes('credit') ? 'credit' : 'general')}
                    </div>
                  </div>
                ))}
                
                {isProcessing && (
                  <div className="flex justify-start animate-in slide-in-from-left-2 duration-300">
                    <div className="bg-gray-100 text-gray-800 p-3 rounded-lg text-sm shadow-md">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Invisible element to scroll to */}
                <div ref={messagesEndRef} />
              </div>

              {/* Voice Input Area */}
              <div className="space-y-3 border-t pt-3 flex-shrink-0">
                <div className="flex items-center justify-center">
                  <Button
                    onClick={handleVoiceInput}
                    disabled={isProcessing}
                    className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                      isListening 
                        ? 'bg-red-500 hover:bg-red-600 animate-pulse shadow-lg shadow-red-500/50' 
                        : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-lg shadow-cyan-500/50'
                    }`}
                    size="icon"
                  >
                    {isListening ? <MicOff className="w-4 h-4 lg:w-5 lg:h-5" /> : <Mic className="w-4 h-4 lg:w-5 lg:h-5" />}
                  </Button>
                </div>
                
                <div className="flex space-x-2">
                  <Input
                    placeholder="Or type your question..."
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleTextSubmit()}
                    className="flex-1 text-sm transition-all duration-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 hover:border-gray-300"
                  />
                  <Button
                    onClick={handleTextSubmit}
                    size="icon"
                    variant="outline"
                    className="shrink-0 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-200 transform hover:scale-105 active:scale-95"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                
                {isListening && (
                  <div className="text-center text-sm text-muted-foreground animate-in slide-in-from-bottom-3 duration-300">
                    <div className="flex items-center justify-center space-x-1">
                      <div className="w-1 h-4 bg-cyan-500 rounded animate-pulse"></div>
                      <div className="w-1 h-6 bg-cyan-500 rounded animate-pulse" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-1 h-3 bg-cyan-500 rounded animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-1 h-5 bg-cyan-500 rounded animate-pulse" style={{animationDelay: '0.3s'}}></div>
                      <div className="w-1 h-2 bg-cyan-500 rounded animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                    <p className="mt-2 animate-pulse">Listening...</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default FloatingVoiceBot; 