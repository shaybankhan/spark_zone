import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Star, Zap, Trophy, Target, Users, Code, Palette, Calculator, Brain, PenTool, Smartphone, ArrowRight, Play, Award, TrendingUp } from "lucide-react";
import { useState } from "react";

type ChallengeStep = 'selection' | 'challenge' | 'result' | null;
type ChallengeType = 'coding' | 'design' | 'math' | 'logic' | 'writing';

interface Challenge {
  id: string;
  type: ChallengeType;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  question: string;
  options?: string[];
  correctAnswer?: string;
  code?: string;
  xp: number;
}

export default function Index() {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", message: "" });
  const [challengeStep, setChallengeStep] = useState<ChallengeStep>(null);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);

  const challengeTypes = [
    {
      type: 'coding' as ChallengeType,
      title: 'Coding Challenge',
      icon: Code,
      color: 'from-skillsnap-blue-500 to-skillsnap-blue-600',
      description: 'Solve programming problems and algorithms'
    },
    {
      type: 'design' as ChallengeType,
      title: 'Design Challenge',
      icon: Palette,
      color: 'from-skillsnap-purple-500 to-skillsnap-purple-600',
      description: 'Create and improve user interfaces'
    },
    {
      type: 'math' as ChallengeType,
      title: 'Math Challenge',
      icon: Calculator,
      color: 'from-skillsnap-yellow-500 to-skillsnap-yellow-600',
      description: 'Solve mathematical problems and equations'
    },
    {
      type: 'logic' as ChallengeType,
      title: 'Logic Challenge',
      icon: Brain,
      color: 'from-green-500 to-green-600',
      description: 'Test your reasoning and problem-solving skills'
    },
    {
      type: 'writing' as ChallengeType,
      title: 'Writing Challenge',
      icon: PenTool,
      color: 'from-orange-500 to-orange-600',
      description: 'Improve your communication and writing skills'
    }
  ];

  const challenges: Record<ChallengeType, Challenge[]> = {
    coding: [
      {
        id: 'js-reverse',
        type: 'coding',
        title: 'Reverse String Function',
        description: 'Write a function to reverse a string',
        difficulty: 'Beginner',
        duration: '5 minutes',
        question: 'Complete the function to reverse the input string:',
        code: 'function reverseString(str) {\n  // Your code here\n  \n}',
        correctAnswer: 'return str.split("").reverse().join("");',
        xp: 150
      },
      {
        id: 'js-fibonacci',
        type: 'coding',
        title: 'Fibonacci Sequence',
        description: 'Generate fibonacci numbers',
        difficulty: 'Intermediate',
        duration: '8 minutes',
        question: 'Write a function that returns the nth fibonacci number:',
        code: 'function fibonacci(n) {\n  // Your code here\n  \n}',
        correctAnswer: 'if (n <= 1) return n;\nreturn fibonacci(n-1) + fibonacci(n-2);',
        xp: 250
      }
    ],
    design: [
      {
        id: 'color-theory',
        type: 'design',
        title: 'Color Theory Basics',
        description: 'Understanding color relationships',
        difficulty: 'Beginner',
        duration: '6 minutes',
        question: 'Which color combination creates the best contrast for accessibility?',
        options: ['Red text on green background', 'Dark blue text on light blue background', 'Black text on white background', 'Yellow text on orange background'],
        correctAnswer: 'Black text on white background',
        xp: 120
      }
    ],
    math: [
      {
        id: 'algebra-basic',
        type: 'math',
        title: 'Linear Equations',
        description: 'Solve basic algebraic equations',
        difficulty: 'Beginner',
        duration: '7 minutes',
        question: 'Solve for x: 3x + 7 = 22',
        options: ['x = 3', 'x = 5', 'x = 7', 'x = 9'],
        correctAnswer: 'x = 5',
        xp: 100
      }
    ],
    logic: [
      {
        id: 'pattern-recognition',
        type: 'logic',
        title: 'Pattern Recognition',
        description: 'Identify patterns in sequences',
        difficulty: 'Intermediate',
        duration: '8 minutes',
        question: 'What comes next in this sequence: 2, 4, 8, 16, ?',
        options: ['24', '28', '32', '64'],
        correctAnswer: '32',
        xp: 180
      }
    ],
    writing: [
      {
        id: 'grammar-basics',
        type: 'writing',
        title: 'Grammar Fundamentals',
        description: 'Test your grammar knowledge',
        difficulty: 'Beginner',
        duration: '5 minutes',
        question: 'Choose the correct sentence:',
        options: [
          'Their going to the store later.',
          'There going to the store later.',
          "They're going to the store later.",
          'Theyre going to the store later.'
        ],
        correctAnswer: "They're going to the store later.",
        xp: 80
      }
    ]
  };

  const showComingSoon = (feature: string) => {
    setModalContent({
      title: "Coming Soon!",
      message: `${feature} will be available soon. Sign up to get notified when it's ready!`
    });
    setShowModal(true);
    setChallengeStep(null);
  };

  const handleSignUp = () => {
    setModalContent({
      title: "Start Your Journey!",
      message: "Sign up functionality will redirect you to our registration page. Ready to begin your learning adventure?"
    });
    setShowModal(true);
    setChallengeStep(null);
  };

  const handleTryChallenge = () => {
    setShowModal(true);
    setChallengeStep('selection');
  };

  const handleSkillChallenge = (skill: string) => {
    const challengeType = skill.toLowerCase() as ChallengeType;
    if (challenges[challengeType] && challenges[challengeType].length > 0) {
      const randomChallenge = challenges[challengeType][Math.floor(Math.random() * challenges[challengeType].length)];
      setSelectedChallenge(randomChallenge);
      setShowModal(true);
      setChallengeStep('challenge');
      setUserAnswer("");
      setShowResult(false);
    } else {
      showComingSoon(`${skill} challenges`);
    }
  };

  const handleChallengeTypeSelect = (type: ChallengeType) => {
    if (challenges[type] && challenges[type].length > 0) {
      const randomChallenge = challenges[type][Math.floor(Math.random() * challenges[type].length)];
      setSelectedChallenge(randomChallenge);
      setChallengeStep('challenge');
      setUserAnswer("");
      setShowResult(false);
    } else {
      showComingSoon(`${type} challenges`);
    }
  };

  const handleSubmitAnswer = () => {
    setShowResult(true);
    setChallengeStep('result');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setChallengeStep(null);
    setSelectedChallenge(null);
    setUserAnswer("");
    setShowResult(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-skillsnap-blue-50 via-white to-skillsnap-purple-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-skillsnap-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-skillsnap-blue-500 to-skillsnap-purple-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-heading font-bold text-gray-900">SkillSnap</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('how-it-works')} className="text-gray-600 hover:text-skillsnap-blue-600 font-medium transition-colors">How It Works</button>
              <button onClick={() => scrollToSection('skills')} className="text-gray-600 hover:text-skillsnap-blue-600 font-medium transition-colors">Skills</button>
              <button onClick={() => scrollToSection('pricing')} className="text-gray-600 hover:text-skillsnap-blue-600 font-medium transition-colors">Pricing</button>
              <Button variant="outline" onClick={() => showComingSoon("Sign In")} className="border-skillsnap-blue-500 text-skillsnap-blue-600 hover:bg-skillsnap-blue-50">
                Sign In
              </Button>
              <Button onClick={handleSignUp} className="bg-gradient-to-r from-skillsnap-blue-500 to-skillsnap-purple-500 hover:from-skillsnap-blue-600 hover:to-skillsnap-purple-600">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-skillsnap-blue-500/10 via-transparent to-skillsnap-purple-500/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <Badge className="mb-4 bg-skillsnap-yellow-100 text-skillsnap-yellow-600 border-skillsnap-yellow-200">
                ✨ AI-Powered Learning
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-900 mb-6 leading-tight">
                Learn Smart.
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-skillsnap-blue-500 to-skillsnap-purple-500">
                  Learn Fast.
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                Master new skills with AI-powered 10-minute micro challenges. Perfect for busy students and professionals who want to level up efficiently.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button onClick={handleTryChallenge} size="lg" className="bg-gradient-to-r from-skillsnap-blue-500 to-skillsnap-purple-500 hover:from-skillsnap-blue-600 hover:to-skillsnap-purple-600 text-lg px-8 py-6 shadow-large">
                  <Play className="w-5 h-5 mr-2" />
                  Try Free Challenge
                </Button>
                <Button onClick={() => showComingSoon("Demo Video")} size="lg" variant="outline" className="border-skillsnap-blue-500 text-skillsnap-blue-600 hover:bg-skillsnap-blue-50 text-lg px-8 py-6">
                  Watch Demo
                </Button>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-6 mt-8 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Free to start
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  No credit card
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Instant feedback
                </div>
              </div>
            </div>

            {/* Device Mockup */}
            <div className="relative">
              <div className="relative mx-auto w-full max-w-md">
                <div className="relative bg-gray-900 rounded-3xl p-2 shadow-large">
                  <div className="bg-white rounded-2xl overflow-hidden">
                    <div className="bg-gradient-to-br from-skillsnap-blue-500 to-skillsnap-purple-500 h-6"></div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-skillsnap-yellow-100 rounded-lg flex items-center justify-center">
                          <Code className="w-5 h-5 text-skillsnap-yellow-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm">JavaScript Challenge</h3>
                          <p className="text-xs text-gray-500">10 minutes • Beginner</p>
                        </div>
                      </div>
                      <div className="bg-gray-100 rounded-lg p-3 mb-4 text-xs font-mono">
                        function reverseString(str) {`{`}<br />
                        &nbsp;&nbsp;// Your code here<br />
                        {`}`}
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-skillsnap-blue-100 rounded-full flex items-center justify-center">
                            <Trophy className="w-4 h-4 text-skillsnap-blue-600" />
                          </div>
                          <span className="text-xs font-medium">+250 XP</span>
                        </div>
                        <Badge className="bg-green-100 text-green-600 text-xs">Active</Badge>
                      </div>
                      <Button size="sm" className="w-full bg-gradient-to-r from-skillsnap-blue-500 to-skillsnap-purple-500 text-xs">
                        Start Challenge
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-skillsnap-yellow-500 rounded-full flex items-center justify-center animate-bounce-slow">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-skillsnap-purple-500 rounded-full flex items-center justify-center animate-float">
                  <Star className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps to accelerate your learning journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-skillsnap-blue-500 to-skillsnap-purple-500 rounded-2xl flex items-center justify-center mx-auto shadow-medium group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-skillsnap-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  1
                </div>
              </div>
              <h3 className="text-xl font-heading font-semibold text-gray-900 mb-3">Pick Your Skill</h3>
              <p className="text-gray-600">Choose from coding, design, math, logic, or writing challenges tailored to your level.</p>
            </div>

            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-skillsnap-purple-500 to-skillsnap-blue-500 rounded-2xl flex items-center justify-center mx-auto shadow-medium group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-skillsnap-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  2
                </div>
              </div>
              <h3 className="text-xl font-heading font-semibold text-gray-900 mb-3">10-Min AI Challenge</h3>
              <p className="text-gray-600">Engage with personalized, bite-sized challenges designed by AI for maximum learning efficiency.</p>
            </div>

            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-skillsnap-yellow-500 to-skillsnap-purple-500 rounded-2xl flex items-center justify-center mx-auto shadow-medium group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-skillsnap-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  3
                </div>
              </div>
              <h3 className="text-xl font-heading font-semibold text-gray-900 mb-3">Get Instant Feedback</h3>
              <p className="text-gray-600">Receive AI-powered insights and personalized recommendations to improve faster.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Skill Categories Section */}
      <section id="skills" className="py-20 bg-gradient-to-br from-skillsnap-blue-50 to-skillsnap-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              Master Every Skill
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Diverse challenges across multiple domains to keep you engaged and growing
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="group hover:shadow-large transition-all duration-300 hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-skillsnap-blue-500 to-skillsnap-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-heading">Coding</CardTitle>
                <CardDescription>JavaScript, Python, React, algorithms & data structures</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-500">150+ challenges</span>
                  <Badge className="bg-skillsnap-blue-100 text-skillsnap-blue-600">Popular</Badge>
                </div>
                <Button onClick={() => handleSkillChallenge("Coding")} className="w-full bg-skillsnap-blue-500 hover:bg-skillsnap-blue-600" size="sm">
                  Start Coding
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-large transition-all duration-300 hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-skillsnap-purple-500 to-skillsnap-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Palette className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-heading">Design</CardTitle>
                <CardDescription>UI/UX principles, color theory, typography & layouts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-500">85+ challenges</span>
                  <Badge className="bg-skillsnap-purple-100 text-skillsnap-purple-600">Creative</Badge>
                </div>
                <Button onClick={() => handleSkillChallenge("Design")} className="w-full bg-skillsnap-purple-500 hover:bg-skillsnap-purple-600" size="sm">
                  Start Designing
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-large transition-all duration-300 hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-skillsnap-yellow-500 to-skillsnap-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Calculator className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-heading">Math</CardTitle>
                <CardDescription>Algebra, calculus, statistics & problem solving</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-500">120+ challenges</span>
                  <Badge className="bg-skillsnap-yellow-100 text-skillsnap-yellow-600">Essential</Badge>
                </div>
                <Button onClick={() => handleSkillChallenge("Math")} className="w-full bg-skillsnap-yellow-500 hover:bg-skillsnap-yellow-600" size="sm">
                  Start Learning
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-large transition-all duration-300 hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-heading">Logic</CardTitle>
                <CardDescription>Critical thinking, puzzles & reasoning challenges</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-500">95+ challenges</span>
                  <Badge className="bg-green-100 text-green-600">Brain Boost</Badge>
                </div>
                <Button onClick={() => handleSkillChallenge("Logic")} className="w-full bg-green-500 hover:bg-green-600" size="sm">
                  Start Thinking
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-large transition-all duration-300 hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <PenTool className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-heading">Writing</CardTitle>
                <CardDescription>Creative writing, technical docs & communication</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-500">75+ challenges</span>
                  <Badge className="bg-orange-100 text-orange-600">Express</Badge>
                </div>
                <Button onClick={() => handleSkillChallenge("Writing")} className="w-full bg-orange-500 hover:bg-orange-600" size="sm">
                  Start Writing
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-large transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-to-br from-skillsnap-blue-500 to-skillsnap-purple-500 text-white">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-heading text-white">More Coming Soon</CardTitle>
                <CardDescription className="text-white/80">New skill categories added every month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-white/80">Stay tuned!</span>
                  <Badge className="bg-white/20 text-white">New</Badge>
                </div>
                <Button onClick={() => showComingSoon("New Skills")} className="w-full bg-white/20 hover:bg-white/30 text-white border-white/20" size="sm" variant="outline">
                  Get Notified
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Gamification Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              Level Up Your Learning
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Track your progress, earn rewards, and compete with friends through our gamified learning system
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-6 text-center hover:shadow-medium transition-shadow">
                  <div className="w-12 h-12 bg-skillsnap-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-skillsnap-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">XP System</h3>
                  <p className="text-2xl font-bold text-skillsnap-blue-600">2,450</p>
                  <p className="text-sm text-gray-500">Total XP</p>
                </Card>

                <Card className="p-6 text-center hover:shadow-medium transition-shadow">
                  <div className="w-12 h-12 bg-skillsnap-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Trophy className="w-6 h-6 text-skillsnap-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Level</h3>
                  <p className="text-2xl font-bold text-skillsnap-purple-600">12</p>
                  <p className="text-sm text-gray-500">Expert</p>
                </Card>

                <Card className="p-6 text-center hover:shadow-medium transition-shadow">
                  <div className="w-12 h-12 bg-skillsnap-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Award className="w-6 h-6 text-skillsnap-yellow-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Badges</h3>
                  <p className="text-2xl font-bold text-skillsnap-yellow-600">24</p>
                  <p className="text-sm text-gray-500">Earned</p>
                </Card>

                <Card className="p-6 text-center hover:shadow-medium transition-shadow">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Zap className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Streak</h3>
                  <p className="text-2xl font-bold text-green-600">15</p>
                  <p className="text-sm text-gray-500">Days</p>
                </Card>
              </div>
            </div>

            <div>
              <Card className="p-8 bg-gradient-to-br from-skillsnap-blue-50 to-skillsnap-purple-50 border-0">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-skillsnap-blue-500 to-skillsnap-purple-500 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-semibold text-gray-900">Your Dashboard</h3>
                    <p className="text-gray-600">Track everything in one place</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-skillsnap-blue-100 rounded-lg flex items-center justify-center">
                        <Code className="w-4 h-4 text-skillsnap-blue-600" />
                      </div>
                      <span className="font-medium">JavaScript Mastery</span>
                    </div>
                    <Badge className="bg-green-100 text-green-600">85%</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-skillsnap-purple-100 rounded-lg flex items-center justify-center">
                        <Palette className="w-4 h-4 text-skillsnap-purple-600" />
                      </div>
                      <span className="font-medium">Design Principles</span>
                    </div>
                    <Badge className="bg-skillsnap-yellow-100 text-skillsnap-yellow-600">72%</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-skillsnap-yellow-100 rounded-lg flex items-center justify-center">
                        <Calculator className="w-4 h-4 text-skillsnap-yellow-600" />
                      </div>
                      <span className="font-medium">Statistics</span>
                    </div>
                    <Badge className="bg-skillsnap-blue-100 text-skillsnap-blue-600">91%</Badge>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="pricing" className="py-20 bg-gradient-to-br from-gray-50 to-skillsnap-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Start free and upgrade when you're ready to unlock advanced features
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="relative p-8 border-2 hover:shadow-large transition-all duration-300">
              <CardHeader className="text-center p-0 mb-6">
                <CardTitle className="text-2xl font-heading font-bold text-gray-900 mb-2">Free</CardTitle>
                <div className="text-4xl font-bold text-gray-900 mb-2">$0<span className="text-lg font-normal text-gray-500">/month</span></div>
                <CardDescription>Perfect for getting started</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>5 challenges per day</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Basic feedback</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Progress tracking</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Community access</span>
                  </div>
                </div>
                <Button onClick={handleSignUp} className="w-full" variant="outline">
                  Get Started Free
                </Button>
              </CardContent>
            </Card>

            <Card className="relative p-8 border-2 border-skillsnap-blue-500 hover:shadow-large transition-all duration-300 bg-gradient-to-br from-white to-skillsnap-blue-50">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-skillsnap-blue-500 to-skillsnap-purple-500 text-white px-4 py-1">
                  Most Popular
                </Badge>
              </div>
              <CardHeader className="text-center p-0 mb-6">
                <CardTitle className="text-2xl font-heading font-bold text-gray-900 mb-2">Premium</CardTitle>
                <div className="text-4xl font-bold text-gray-900 mb-2">$12<span className="text-lg font-normal text-gray-500">/month</span></div>
                <CardDescription>For serious learners</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Unlimited challenges</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>AI-powered feedback</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Advanced analytics</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Custom learning paths</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Priority support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Offline mode</span>
                  </div>
                </div>
                <Button onClick={() => showComingSoon("Premium Upgrade")} className="w-full bg-gradient-to-r from-skillsnap-blue-500 to-skillsnap-purple-500 hover:from-skillsnap-blue-600 hover:to-skillsnap-purple-600">
                  Upgrade to Premium
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of learners who are already leveling up their skills
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-medium transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-skillsnap-blue-500 to-skillsnap-purple-500 flex items-center justify-center text-white font-bold">
                  S
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Sarah Chen</h4>
                  <p className="text-sm text-gray-500">Frontend Developer</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-skillsnap-yellow-500 text-skillsnap-yellow-500" />
                ))}
              </div>
              <p className="text-gray-600">
                "SkillSnap's 10-minute challenges fit perfectly into my busy schedule. I've improved my React skills significantly in just 2 months!"
              </p>
            </Card>

            <Card className="p-6 hover:shadow-medium transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-skillsnap-purple-500 to-skillsnap-yellow-500 flex items-center justify-center text-white font-bold">
                  M
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Marcus Johnson</h4>
                  <p className="text-sm text-gray-500">UX Designer</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-skillsnap-yellow-500 text-skillsnap-yellow-500" />
                ))}
              </div>
              <p className="text-gray-600">
                "The AI feedback is incredibly insightful. It's like having a personal mentor guiding me through design principles."
              </p>
            </Card>

            <Card className="p-6 hover:shadow-medium transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-skillsnap-yellow-500 to-skillsnap-blue-500 flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Aisha Patel</h4>
                  <p className="text-sm text-gray-500">Computer Science Student</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-skillsnap-yellow-500 text-skillsnap-yellow-500" />
                ))}
              </div>
              <p className="text-gray-600">
                "Game-changing for exam prep! The bite-sized challenges make complex algorithms much easier to understand and remember."
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-skillsnap-blue-500 via-skillsnap-purple-500 to-skillsnap-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
            Start Your First Challenge Now
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join over 50,000 learners who are already mastering new skills with SkillSnap. Your learning journey starts with just one click.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={handleTryChallenge}
              size="lg"
              className="bg-white text-skillsnap-blue-600 hover:bg-gray-100 text-lg px-8 py-6 shadow-large"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Free Challenge
            </Button>

            <Button
              onClick={() => scrollToSection('how-it-works')}
              size="lg"
              className="bg-white text-skillsnap-blue-600 hover:bg-gray-100 text-lg px-8 py-6 shadow-large"
            >
              Learn More
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

          </div>
          <div className="flex items-center justify-center gap-6 mt-8 text-sm opacity-80">
            <div className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4" />
              Free to start
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4" />
              No credit card required
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4" />
              Cancel anytime
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">

            {/* Challenge Type Selection */}
            {challengeStep === 'selection' && (
              <div className="p-8">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-skillsnap-blue-500 to-skillsnap-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-heading font-bold text-gray-900 mb-4">
                    Choose Your Challenge
                  </h3>
                  <p className="text-gray-600 text-lg">
                    Select a skill area to start your 10-minute learning challenge
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {challengeTypes.map((challengeType) => {
                    const IconComponent = challengeType.icon;
                    return (
                      <Card
                        key={challengeType.type}
                        className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 hover:border-skillsnap-blue-300"
                        onClick={() => handleChallengeTypeSelect(challengeType.type)}
                      >
                        <CardHeader className="text-center pb-2">
                          <div className={`w-16 h-16 bg-gradient-to-br ${challengeType.color} rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                            <IconComponent className="w-8 h-8 text-white" />
                          </div>
                          <CardTitle className="text-lg font-heading">{challengeType.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                          <p className="text-sm text-gray-600 mb-4">{challengeType.description}</p>
                          <Badge className="bg-skillsnap-blue-100 text-skillsnap-blue-600">
                            {challenges[challengeType.type]?.length || 0} challenges
                          </Badge>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                <div className="flex justify-center mt-8">
                  <Button onClick={handleCloseModal} variant="outline" size="lg">
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* Challenge Display */}
            {challengeStep === 'challenge' && selectedChallenge && (
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-skillsnap-blue-500 to-skillsnap-purple-500 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-heading font-bold text-gray-900">{selectedChallenge.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{selectedChallenge.duration}</span>
                        <Badge className="bg-skillsnap-yellow-100 text-skillsnap-yellow-600">
                          {selectedChallenge.difficulty}
                        </Badge>
                        <span className="flex items-center gap-1">
                          <Trophy className="w-4 h-4" />
                          +{selectedChallenge.xp} XP
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button onClick={() => setChallengeStep('selection')} variant="outline" size="sm">
                    ← Back
                  </Button>
                </div>

                <Card className="p-6 mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">{selectedChallenge.question}</h4>

                  {/* Code Challenge */}
                  {selectedChallenge.code && (
                    <div className="space-y-4">
                      <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-green-400 overflow-x-auto">
                        <pre>{selectedChallenge.code}</pre>
                      </div>
                      <textarea
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        placeholder="Write your solution here..."
                        className="w-full h-32 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-skillsnap-blue-500 focus:border-transparent"
                      />
                    </div>
                  )}

                  {/* Multiple Choice */}
                  {selectedChallenge.options && (
                    <div className="space-y-3">
                      {selectedChallenge.options.map((option, index) => (
                        <label
                          key={index}
                          className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="answer"
                            value={option}
                            checked={userAnswer === option}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            className="w-4 h-4 text-skillsnap-blue-600"
                          />
                          <span className="text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </Card>

                <div className="flex justify-between">
                  <Button onClick={handleCloseModal} variant="outline">
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmitAnswer}
                    disabled={!userAnswer.trim()}
                    className="bg-gradient-to-r from-skillsnap-blue-500 to-skillsnap-purple-500 hover:from-skillsnap-blue-600 hover:to-skillsnap-purple-600"
                  >
                    Submit Answer
                  </Button>
                </div>
              </div>
            )}

            {/* Challenge Result */}
            {challengeStep === 'result' && selectedChallenge && (
              <div className="p-8 text-center">
                <div className="mb-6">
                  {userAnswer === selectedChallenge.correctAnswer ? (
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                  ) : (
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="w-10 h-10 text-red-600" />
                    </div>
                  )}

                  <h3 className="text-3xl font-heading font-bold text-gray-900 mb-4">
                    {userAnswer === selectedChallenge.correctAnswer ? 'Excellent Work!' : 'Good Attempt!'}
                  </h3>

                  {userAnswer === selectedChallenge.correctAnswer ? (
                    <div className="space-y-4">
                      <p className="text-lg text-green-600 mb-4">
                        🎉 Correct! You've earned {selectedChallenge.xp} XP
                      </p>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <p className="text-green-800">
                          Great job! You're mastering {selectedChallenge.type} skills. Keep up the momentum!
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-lg text-orange-600 mb-4">
                        Not quite right, but you're learning! 📚
                      </p>
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-left">
                        <p className="text-orange-800 font-semibold mb-2">Correct Answer:</p>
                        <p className="text-orange-700 font-mono bg-white p-2 rounded border">
                          {selectedChallenge.correctAnswer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => setChallengeStep('selection')}
                    variant="outline"
                    size="lg"
                  >
                    Try Another Challenge
                  </Button>
                  <Button
                    onClick={handleSignUp}
                    size="lg"
                    className="bg-gradient-to-r from-skillsnap-blue-500 to-skillsnap-purple-500 hover:from-skillsnap-blue-600 hover:to-skillsnap-purple-600"
                  >
                    Sign Up for More
                  </Button>
                </div>
              </div>
            )}

            {/* Regular Modal Content (for other buttons) */}
            {!challengeStep && (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-skillsnap-blue-500 to-skillsnap-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-gray-900 mb-4">
                  {modalContent.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {modalContent.message}
                </p>
                <div className="flex gap-3 justify-center">
                  <Button onClick={handleCloseModal} variant="outline">
                    Close
                  </Button>
                  <Button onClick={handleCloseModal} className="bg-gradient-to-r from-skillsnap-blue-500 to-skillsnap-purple-500 hover:from-skillsnap-blue-600 hover:to-skillsnap-purple-600">
                    Got it!
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-8 mb-8">



            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-skillsnap-blue-500 to-skillsnap-purple-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-heading font-bold">SkillSnap</span>
              </div>
              <p className="text-gray-400 mb-4">
                AI-powered micro learning for the modern world.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                  <span className="text-xs">T</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                  <span className="text-xs">L</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                  <span className="text-xs">G</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Challenges</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Dashboard</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Leaderboard</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mobile App</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2024 SkillSnap. All rights reserved.</p>
            <p className="text-gray-400 mt-4 md:mt-0">Made with ❤️ for learners everywhere</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
