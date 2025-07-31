import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle2, AlertTriangle, Info, Calendar, Heart, Home, Car, Plane, User, Shield, ArrowRight, ArrowLeft } from 'lucide-react';

const questions = [
  {
    id: 'age',
    question: 'What is your age?',
    type: 'number',
    required: true
  },
  {
    id: 'family',
    question: 'How many family members do you have?',
    type: 'number',
    required: true
  },
  {
    id: 'income',
    question: 'What is your annual income range?',
    type: 'select',
    options: ['Under AED 100,000', 'AED 100,000 - 200,000', 'AED 200,000 - 500,000', 'Over AED 500,000'],
    required: true
  },
  {
    id: 'travelsPerYear',
    question: 'How many times do you travel abroad per year?',
    type: 'number',
    required: true
  },
  {
    id: 'ownsCar',
    question: 'Do you own a car?',
    type: 'select',
    options: ['Yes', 'No'],
    required: true
  },
  {
    id: 'ownsHome',
    question: 'Do you own a home?',
    type: 'select',
    options: ['Yes', 'No'],
    required: true
  },
  {
    id: 'hasExistingHealth',
    question: 'Do you have existing health insurance?',
    type: 'select',
    options: ['Yes', 'No'],
    required: true
  },
  {
    id: 'hasExistingLife',
    question: 'Do you have existing life insurance?',
    type: 'select',
    options: ['Yes', 'No'],
    required: true
  },
  {
    id: 'occupation',
    question: 'What is your occupation?',
    type: 'select',
    options: ['Employee', 'Business Owner', 'Freelancer', 'Student', 'Retired'],
    required: true
  },
  {
    id: 'healthConditions',
    question: 'Do you have any pre-existing health conditions?',
    type: 'select',
    options: ['None', 'Minor conditions', 'Major conditions'],
    required: true
  }
];

const InsuranceAdvisor = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [selectedType, setSelectedType] = useState('Health');
  const [quoteRequested, setQuoteRequested] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);

  const handleAnswer = (value: any) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: value
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowRecommendations(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const resetQuestionnaire = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowRecommendations(false);
    setSelectedType('Health');
    setQuoteRequested(false);
    setCompareOpen(false);
  };

  // Generate recommendations based on answers
  const generateRecommendations = () => {
    const profile = {
      age: parseInt(answers.age) || 30,
      family: parseInt(answers.family) || 1,
      income: answers.income || 'AED 100,000 - 200,000',
      travelsPerYear: parseInt(answers.travelsPerYear) || 0,
      ownsCar: answers.ownsCar === 'Yes',
      ownsHome: answers.ownsHome === 'Yes',
      hasExistingHealth: answers.hasExistingHealth === 'Yes',
      hasExistingLife: answers.hasExistingLife === 'Yes',
      occupation: answers.occupation || 'Employee',
      healthConditions: answers.healthConditions || 'None'
    };

    return [
      {
        type: 'Health',
        icon: Heart,
        recommended: !profile.hasExistingHealth || profile.healthConditions !== 'None',
        advice: profile.hasExistingHealth 
          ? 'You have existing health insurance. Consider upgrading for better coverage.'
          : 'Health insurance is essential for you and your family. Consider a comprehensive plan.',
        plans: [
          { name: 'ADNIC Family Health', price: 4200, features: ['Maternity', 'Dental', 'UAE-wide'] },
          { name: 'Daman Essential', price: 3200, features: ['Basic', 'UAE-wide'] },
        ],
      },
      {
        type: 'Life',
        icon: User,
        recommended: profile.family > 1 || profile.occupation === 'Business Owner',
        advice: profile.family > 1 
          ? 'Life insurance is crucial to protect your dependents. Consider a term plan.'
          : 'Life insurance provides financial security for your loved ones.',
        plans: [
          { name: 'MetLife Term', price: 1800, features: ['Critical Illness', 'Flexible Term'] },
          { name: 'Zurich Life', price: 2100, features: ['Whole Life', 'Global'] },
        ],
      },
      {
        type: 'Travel',
        icon: Plane,
        recommended: profile.travelsPerYear > 0,
        advice: profile.travelsPerYear > 0
          ? 'You travel frequently. Annual travel insurance is cost-effective.'
          : 'Travel insurance is optional unless you have upcoming trips.',
        plans: [
          { name: 'AXA Annual Travel', price: 600, features: ['Multi-trip', 'Worldwide'] },
          { name: 'Oman Insurance Single Trip', price: 120, features: ['Single Trip', 'UAE to Europe'] },
        ],
      },
      {
        type: 'Car',
        icon: Car,
        recommended: profile.ownsCar,
        advice: profile.ownsCar
          ? 'Car insurance is mandatory in the UAE. Consider comprehensive cover.'
          : 'Car insurance is not needed unless you own a car.',
        plans: [
          { name: 'RSA Comprehensive', price: 2200, features: ['Comprehensive', 'Roadside Assistance'] },
          { name: 'Orient TPL', price: 950, features: ['Third Party', 'Basic'] },
        ],
      },
      {
        type: 'Home',
        icon: Home,
        recommended: profile.ownsHome,
        advice: profile.ownsHome
          ? 'Home insurance protects your property and belongings.'
          : 'Home insurance is not needed unless you own a home.',
        plans: [
          { name: 'AXA Home Secure', price: 1200, features: ['Contents', 'Fire', 'Theft'] },
          { name: 'Oman Insurance Home', price: 950, features: ['Basic', 'Fire'] },
        ],
      },
    ];
  };

  const insuranceOptions = showRecommendations ? generateRecommendations() : [];
  const selected = insuranceOptions.find(opt => opt.type === selectedType);

  if (!showRecommendations) {
    const question = questions[currentQuestion];
    const currentAnswer = answers[question.id];

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-color-primary">Insurance Advisor</h1>
            <p className="text-gray-600 mt-1">Answer a few questions to get personalized recommendations</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-emerald-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
        <div className="text-sm text-gray-600 text-center">
          Question {currentQuestion + 1} of {questions.length}
        </div>

        {/* Question Card */}
        <Card className="feature-card max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-xl">{question.question}</CardTitle>
            <CardDescription>
              {question.required && <span className="text-red-500">* Required</span>}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {question.type === 'number' && (
              <div>
                <Label htmlFor={question.id}>Your answer</Label>
                <Input
                  id={question.id}
                  type="number"
                  value={currentAnswer || ''}
                  onChange={(e) => handleAnswer(e.target.value)}
                  placeholder="Enter your answer"
                  className="mt-1"
                />
              </div>
            )}
            
            {question.type === 'select' && (
              <div>
                <Label htmlFor={question.id}>Select an option</Label>
                <Select value={currentAnswer || ''} onValueChange={handleAnswer}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Choose an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {question.options?.map(option => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>
              
              <Button
                className="button-finera-primary flex items-center gap-2"
                onClick={nextQuestion}
                disabled={!currentAnswer}
              >
                {currentQuestion === questions.length - 1 ? 'Get Recommendations' : 'Next'}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-color-primary">Insurance Advisor</h1>
          <p className="text-gray-600 mt-1">Personalized recommendations based on your profile</p>
        </div>
        <Button variant="outline" onClick={resetQuestionnaire} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Retake Assessment
        </Button>
      </div>

      {/* Insurance Type Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        {insuranceOptions.map(opt => (
          <button
            key={opt.type}
            onClick={() => { setSelectedType(opt.type); setQuoteRequested(false); setCompareOpen(false); }}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              selectedType === opt.type
                ? 'bg-white text-emerald-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <opt.icon className="w-4 h-4 mr-1 inline" />
            {opt.type}
          </button>
        ))}
      </div>

      {/* Recommendation Card */}
      {selected && (
        <Card className="feature-card max-w-xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <selected.icon className="w-5 h-5 text-blue-600" />
              {selected.type} Insurance
              {selected.recommended ? (
                <Badge className="ml-2" variant="secondary"><CheckCircle2 className="w-4 h-4 mr-1" /> Recommended</Badge>
              ) : (
                <Badge className="ml-2" variant="outline"><Info className="w-4 h-4 mr-1" /> Optional</Badge>
              )}
            </CardTitle>
            <CardDescription>{selected.advice}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Button className="button-finera-primary" onClick={() => setQuoteRequested(true)}>
                  Request Quote
                </Button>
                <Button variant="outline" onClick={() => setCompareOpen(v => !v)}>
                  {compareOpen ? 'Hide Comparison' : 'Compare Plans'}
                </Button>
              </div>
              {quoteRequested && (
                <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500 mt-2 text-green-700">
                  <CheckCircle2 className="w-4 h-4 mr-1 inline" /> Quote request submitted! Our advisor will contact you soon.
                </div>
              )}
              {compareOpen && (
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Compare Plans</h4>
                  <div className="space-y-2">
                    {selected.plans.map(plan => (
                      <div key={plan.name} className="p-3 rounded-lg border border-gray-200 flex items-center justify-between">
                        <div>
                          <div className="font-medium">{plan.name}</div>
                          <div className="text-xs text-gray-600">{plan.features.join(', ')}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-blue-600">AED {plan.price}</div>
                          <Button size="sm" className="ml-2 button-finera-primary" onClick={() => setQuoteRequested(true)}>
                            Get Quote
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InsuranceAdvisor; 