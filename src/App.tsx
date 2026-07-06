import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Compass, 
  Heart, 
  Activity, 
  ChevronRight, 
  ChevronLeft, 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  X, 
  Check, 
  CheckCircle2, 
  ArrowRight, 
  Menu, 
  Phone, 
  MapPin, 
  MessageSquare, 
  Info,
  BookOpen,
  UserCheck,
  Award,
  TrendingUp,
  ShieldCheck,
  Flower2,
  Moon,
  Sun,
  Eye,
  HeartHandshake
} from 'lucide-react';


interface Service {
  id: string;
  title: string;
  category: 'individual' | 'group' | 'wellness' | 'corporate';
  tagline: string;
  description: string;
  duration: string;
  investment: string;
  features: string[];
  therapeuticFocus: string;
}

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  stateBefore: string;
  stateAfter: string;
}

interface EmpathyPathway {
  id: string;
  emoji: string;
  feeling: string;
  description: string;
  personalNote: string;
  healingPillar: string;
  suggestedFocus: string;
}

const SERVICES_DATA: Service[] = [
  {
    id: 'ind-coaching',
    title: 'Individual Coaching Journey',
    category: 'individual',
    tagline: 'Deep 1-on-1 Emotional Re-alignment & Growth',
    description: 'A beautifully held, highly customized sanctuary program. Designed to safely unpack limiting patterns, regulate a fatigued nervous system, process major identity shifts, and restore steady, unwavering internal trust.',
    duration: '12 Weeks (Bi-weekly deep-dives)',
    investment: 'Premium Coaching Program',
    features: [
      'Private 75-minute high-presence sessions',
      'Trauma-informed somatic regulation tools',
      'Unlimited integrated text support between sessions',
      'Tailored self-trust & boundary blueprint templates'
    ],
    therapeuticFocus: 'Somatic integration, shadow integration, and nervous system resilience.'
  },
  {
    id: 'grp-coaching',
    title: 'Group Emergence Collective',
    category: 'group',
    tagline: 'Heal and Remember in Sacred Community',
    description: 'An intimate, highly supportive group crucible where you can lay down your heavy armor. We practice collective emotional safety, raw sharing, and mutual validation to remember that you are never walking alone.',
    duration: '8 Weeks (Weekly gatherings)',
    investment: 'Shared Sanctuary Program',
    features: [
      'Weekly facilitated video group councils',
      'Strictly capped at 8 participants for safety',
      'Shared group reflection journals & somatic homework',
      'Lifetime peer-support alumni alignment circle'
    ],
    therapeuticFocus: 'Interpersonal healing, active witnessing, and relational trust.'
  },
  {
    id: 'well-conv',
    title: 'Wellness Conversations',
    category: 'wellness',
    tagline: 'A Single Breakthrough Safe Haven',
    description: 'An intensive, deeply warm single consultation to bring immediate light into current chaos. Perfect for moments of acute decision anxiety, transition blockages, or when you simply need a professional, loving space to process.',
    duration: 'Single 95-minute intensive call',
    investment: 'Single Safe-Haven Session',
    features: [
      'Comprehensive pre-session energetic analysis',
      'Uninterrupted, fully-contained empathetic dialogue',
      'Immediate grounding map & integration check-list',
      'Curated somatic practices for post-session ease'
    ],
    therapeuticFocus: 'Immediate alignment, stress relief, and actionable emotional mapping.'
  },
  {
    id: 'corp-well',
    title: 'Corporate Emotional Wellness',
    category: 'corporate',
    tagline: 'Bringing Emotional Safety & Ease to Professional Workspaces',
    description: 'Bespoke corporate workshops focused on burnout mitigation, relational intelligence, and creating trauma-aware systems of safety for high-stress professional teams navigating modern transitions.',
    duration: 'Half-Day Workshops / Multi-Month Engagements',
    investment: 'Tailored Corporate Packages',
    features: [
      'Exhaustive executive stress & somatic assessment',
      'Experiential nervous system regulation training',
      'Sustainable boundaries & communicative safety systems',
      'Private executive 1-on-1 breakout coaching'
    ],
    therapeuticFocus: 'Systemic safety, collective regulation, and professional boundaries.'
  }
];

const EMPATHY_PATHWAYS: EmpathyPathway[] = [
  {
    id: 'exhausted',
    emoji: '🍂',
    feeling: 'I feel deeply exhausted or stuck',
    description: 'You are carrying the weight of constantly executing, performing, and keeping everyone else safe, but inside, you feel dry and disconnected.',
    personalNote: 'Dearest soul, your exhaustion is not a design flaw; it is your body begging you for sanctuary. In our space, you do not have to perform or prove. We will start by quietly down-regulating your nervous system, allowing you to lay your heavy responsibilities down and safely rest your heart.',
    healingPillar: 'Restorative somatic containment & cognitive boundary re-authoring.',
    suggestedFocus: 'Wellness Conversations (Single session breakthrough) or Individual 1-on-1'
  },
  {
    id: 'transition',
    emoji: '🌀',
    feeling: 'I am navigating a scary life transition',
    description: 'Whether it is a career pivot, a relational completion, or a sudden change in life trajectory, you feel suspended between what was and what is next.',
    personalNote: 'I know how terrifying the hallway between chapters can be. It feels like you are losing yourself. Let me hold the lantern for you. We will work together to honor the grief of what has ended, ground your current balance, and carefully design the blueprint of who you are actually becoming.',
    healingPillar: 'Transition mapping, identity reclamation, and step-by-step clarity frameworks.',
    suggestedFocus: '12-Week Individual Coaching Journey'
  },
  {
    id: 'anxious',
    emoji: '🌾',
    feeling: 'I carry a quiet, constant anxiety',
    description: 'You look highly successful on the outside, but underneath, there is a busy, looping voice reminding you that you are not doing enough.',
    personalNote: 'That whisper is a protector that has worked overtime for far too long. We will not battle this anxiety; we will sit with it, understand its roots, and teach your body that it is safe to slow down, take deep breaths, and exist unconditionally in the present.',
    healingPillar: 'Trauma-informed somatic processing, mindfulness integration, and self-compassion training.',
    suggestedFocus: 'Group Emergence Collective or 1-on-1 Deep-Dive'
  },
  {
    id: 'expansion',
    emoji: '✨',
    feeling: 'I am ready to expand my alignment',
    description: 'You have done incredible healing work, but you feel ready to step into a deeper iteration of your power, spiritual alignment, and voice.',
    personalNote: 'This is the golden hour. You are standing on the edge of your next true timeline. Together, we will challenge the glass ceiling of your self-worth, release the remnants of old scarcity coding, and align your life, business, and daily habits with your highest purpose.',
    healingPillar: 'Alchemical self-actualization, high-performance alignment, and visionary planning.',
    suggestedFocus: 'Premium Individual Coaching Tier'
  }
];

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Naledi D.",
    role: "Creative Director & Executive, Johannesburg",
    quote: "I came to Kamohelo completely shattered by burnout, trying to keep a brave face for my team. She created a sanctuary that felt so safe I finally cried, processed, and rebuilt my boundaries. My business is thriving, but more importantly, my nervous system is finally at peace.",
    stateBefore: "Highly anxious, chronic physical tension, boundary-less",
    stateAfter: "Grounded executive presence, deep self-trust, absolute peace"
  },
  {
    name: "Brandon M.",
    role: "Senior Consultant, Sandton",
    quote: "Kamohelo possesses a rare, profound gift. She is highly qualified and sharp, yet possesses an ancient warmth. I navigated a difficult divorce and career restructuring under her guidance. Her somatic-informed approach saved me from despair.",
    stateBefore: "Disorienting divorce, high isolation, career paralysis",
    stateAfter: "Empowered transitional clarity, somatic stability, open heart"
  },
  {
    name: "Zanele K.",
    role: "Social Entrepreneur",
    quote: "The Group Emergence Collective was a spiritual turning point. Knowing Kamohelo was holding the space with such high somatic certification and trauma-informed training meant we could lay our guard down. Highly recommend her programs.",
    stateBefore: "Imposter syndrome, deep relational fatigue",
    stateAfter: "Unapologetic speaking presence, powerful peer integration"
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'all' | 'individual' | 'group' | 'wellness' | 'corporate'>('all');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedEmpathy, setSelectedEmpathy] = useState<EmpathyPathway | null>(EMPATHY_PATHWAYS[0]);
  
  // Interactive Mindfulness Breathing States
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Grounded'>('Grounded');
  const [breathCounter, setBreathCounter] = useState(0);
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const breathTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Wheel of Life alignment simulator
  const [wheelScores, setWheelScores] = useState({
    emotional: 6,
    confidence: 5,
    transition: 4,
    career: 6,
    mindfulness: 4
  });
  const [showAssessmentResult, setShowAssessmentResult] = useState(false);

  // Scheduling system state
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingDetails, setBookingDetails] = useState({
    service: '',
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    notes: '',
    format: 'Virtual Session'
  });
  const [bookingComplete, setBookingComplete] = useState(false);

  // Newsletter form states
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  useEffect(() => {
    if (!isBreathingActive) {
      setBreathPhase('Grounded');
      setBreathCounter(0);
      if (breathTimerRef.current) clearInterval(breathTimerRef.current);
      return;
    }

    setBreathPhase('Inhale');
    setBreathCounter(4);

    breathTimerRef.current = setInterval(() => {
      setBreathCounter((prev) => {
        if (prev > 1) return prev - 1;
        
        // Phase transition logic
        setBreathPhase((currentPhase) => {
          if (currentPhase === 'Inhale') {
            setBreathCounter(7);
            return 'Hold';
          } else if (currentPhase === 'Hold') {
            setBreathCounter(8);
            return 'Exhale';
          } else {
            setBreathCounter(4);
            return 'Inhale';
          }
        });
        return 0;
      });
    }, 1000);

    return () => {
      if (breathTimerRef.current) clearInterval(breathTimerRef.current);
    };
  }, [isBreathingActive]);

  const handleScoreChange = (key: keyof typeof wheelScores, val: number) => {
    setWheelScores(prev => ({ ...prev, [key]: val }));
    setShowAssessmentResult(false);
  };

  const getAssessmentAnalysis = () => {
    const avg = Object.values(wheelScores).reduce((a, b) => a + b, 0) / 5;
    if (avg <= 4.5) {
      return {
        title: "The Call for Immediate Restorative Sanctuary",
        desc: "Your scores show your emotional reserves are currently heavily taxed. You do not need productivity hacks; you need somatic rest and a space to slowly lay down survival patterns. Kamohelo suggests starting with our gentle 1-on-1 Sanctuary roadmap.",
        action: "Inquire for Restorative Space"
      };
    } else if (avg <= 7.5) {
      return {
        title: "The Threshold of Deep Alignment",
        desc: "You have strong survival mechanisms, but you are currently suspended between chapters. There is a quiet fatigue that can be met with proper boundary mapping. Kamohelo recommends our 8-week Group Emergence or targeted 1-on-1 coaching.",
        action: "Explore Transition Support"
      };
    } else {
      return {
        title: "Visionary Self-Actualization & Expansion",
        desc: "You have solid inner stability. Now, the invitation is to expand your leadership alignment, explore higher somatic integrity, and step boldly into your intuitive power.",
        action: "Inquire for Visionary Alignment"
      };
    }
  };

  const triggerBookingFlow = (serviceName?: string) => {
    setBookingDetails(prev => ({ ...prev, service: serviceName || '15-Min Free Clarity Consultation' }));
    setBookingStep(1);
    setBookingComplete(false);
    setIsBookingModalOpen(true);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookingStep < 3) {
      setBookingStep(prev => prev + 1);
    } else {
      setBookingComplete(true);
    }
  };

  const filteredServices = activeTab === 'all' 
    ? SERVICES_DATA 
    : SERVICES_DATA.filter(s => s.category === activeTab);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2A2421] font-sans selection:bg-[#E5D5C5] selection:text-[#2A2421] overflow-x-hidden relative">
      
      {}
      <div className="fixed top-0 left-0 w-full h-[600px] bg-gradient-to-b from-[#F3ECE0] via-[#FDFBF7] to-transparent pointer-events-none z-0 opacity-80" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#EAE0D2]/30 blur-[130px] pointer-events-none z-0" />
      <div className="fixed top-1/3 left-10 w-[300px] h-[300px] rounded-full bg-[#E5D5C5]/25 blur-[100px] pointer-events-none z-0" />

      {/* Elegant Header with Soft Drop */}
      <header className="sticky top-0 z-45 backdrop-blur-md bg-[#FDFBF7]/85 border-b border-[#EAE0D2]/50 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <a href="#hero" className="flex flex-col group">
            <span className="text-lg tracking-[0.3em] font-serif font-light text-[#4A3E39] group-hover:text-[#B59670] transition-colors">
              THE BECOMING
            </span>
            <span className="text-[9px] tracking-[0.45em] font-sans text-[#8C7A6B] uppercase -mt-0.5 group-hover:text-[#4A3E39] transition-colors">
              by Kamohelo
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10 text-[11px] tracking-widest uppercase font-semibold text-[#6E5D53]">
            <a href="#welcome" className="hover:text-[#B59670] transition-colors duration-300">Sanctuary</a>
            <a href="#empathy" className="hover:text-[#B59670] transition-colors duration-300">Am I Understood?</a>
            <a href="#credentials" className="hover:text-[#B59670] transition-colors duration-300">Qualifications</a>
            <a href="#services" className="hover:text-[#B59670] transition-colors duration-300">Offerings</a>
            <a href="#alignment-tool" className="hover:text-[#B59670] transition-colors duration-300">Discovery Quiz</a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <span className="text-[11px] font-sans text-[#8C7A6B] font-light flex items-center gap-1.5 border border-[#EAE0D2] px-3.5 py-1.5 rounded-full bg-white/50">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Johannesburg & Virtual Openings
            </span>
            <button 
              onClick={() => triggerBookingFlow()}
              className="px-6 py-3 bg-[#4A3E39] text-[#FDFBF7] rounded-full hover:bg-[#B59670] text-xs tracking-widest uppercase font-semibold transition-all duration-300 shadow-sm"
            >
              Book Safe Call
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-[#4A3E39] hover:text-[#B59670]"
            aria-label="Toggle Navigation"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-24 left-0 w-full bg-[#FDFBF7] border-b border-[#EAE0D2] px-8 py-10 flex flex-col space-y-6 text-xs tracking-widest uppercase font-bold text-[#4A3E39] shadow-lg animate-fadeIn">
            <a href="#welcome" onClick={() => setIsMenuOpen(false)} className="hover:text-[#B59670]">Sanctuary</a>
            <a href="#empathy" onClick={() => setIsMenuOpen(false)} className="hover:text-[#B59670]">Am I Understood?</a>
            <a href="#credentials" onClick={() => setIsMenuOpen(false)} className="hover:text-[#B59670]">Qualifications</a>
            <a href="#services" onClick={() => setIsMenuOpen(false)} className="hover:text-[#B59670]">Offerings</a>
            <a href="#alignment-tool" onClick={() => setIsMenuOpen(false)} className="hover:text-[#B59670]">Discovery Quiz</a>
            <button 
              onClick={() => {
                setIsMenuOpen(false);
                triggerBookingFlow();
              }}
              className="w-full py-4 text-center bg-[#4A3E39] text-[#FDFBF7] rounded-full hover:bg-[#B59670] transition-all font-semibold tracking-wider"
            >
              Book 15-Min Safe Call
            </button>
          </div>
        )}
      </header>

      {}
      <section id="hero" className="relative min-h-[calc(100vh-6rem)] flex items-center justify-center px-6 py-16 overflow-hidden">
        <div className="max-w-5xl mx-auto w-full relative z-10 flex flex-col items-center text-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#EAE0D2] bg-[#F8F1E5]/60 mb-8">
            <HeartHandshake size={13} className="text-[#B59670]" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#6E5D53] font-bold font-sans">
              Your Nervous System is Welcome Here Exactly as It Is
            </span>
          </div>

          <h1 className="text-4xl md:text-7xl font-serif font-light text-[#2A2421] tracking-tight leading-[1.1] max-w-4xl mb-6">
            A serene space to lay your armor down and <br />
            <span className="font-serif italic font-normal text-[#B59670]">remember who you are.</span>
          </h1>

          <p className="text-[#6E5D53] text-sm md:text-lg max-w-2xl font-light leading-relaxed mb-12">
            Providing credentialed emotional safety, trauma-aware somatic integration, and highly personal wellness coaching. Let’s safely navigate your healing, your transitions, and your boldest expansion.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-16">
            <a 
              href="#empathy" 
              className="px-8 py-4 bg-[#4A3E39] text-[#FDFBF7] rounded-full font-semibold text-xs tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-[#B59670] hover:-translate-y-0.5 transition-all duration-300 shadow-md"
            >
              Do You Understand My Struggle?
              <ArrowRight size={14} />
            </a>
            <a 
              href="#breathing-guide" 
              className="px-8 py-4 border border-[#D5C2B1] text-[#4A3E39] rounded-full hover:border-[#4A3E39] text-xs tracking-widest uppercase flex items-center justify-center gap-2 bg-[#FBF9F5]/40 hover:-translate-y-0.5 transition-all duration-300 font-semibold"
            >
              Let’s Take a Gentle Breath
              <Flower2 size={13} className="text-[#B59670]" />
            </a>
          </div>

          {/* Healing reassurance elements */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-[#EAE0D2] w-full text-left">
            <div className="flex gap-4 items-start p-4 bg-[#F8F5EE]/40 rounded-2xl border border-[#EAE0D2]/40">
              <ShieldCheck className="text-[#B59670] mt-1 flex-shrink-0" size={18} />
              <div>
                <h4 className="text-xs uppercase font-bold text-[#4A3E39] tracking-wider">Fully Safe & Private</h4>
                <p className="text-[11px] text-[#8C7A6B] mt-0.5 font-light">Your processing is heavily protected by legal and spiritual confidentiality standards.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start p-4 bg-[#F8F5EE]/40 rounded-2xl border border-[#EAE0D2]/40">
              <Award className="text-[#B59670] mt-1 flex-shrink-0" size={18} />
              <div>
                <h4 className="text-xs uppercase font-bold text-[#4A3E39] tracking-wider">ICF Credentialed Coaching</h4>
                <p className="text-[11px] text-[#8C7A6B] mt-0.5 font-light">Deep psychophysiological and somatic training, not just advice-giving.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start p-4 bg-[#F8F5EE]/40 rounded-2xl border border-[#EAE0D2]/40">
              <Activity className="text-[#B59670] mt-1 flex-shrink-0" size={18} />
              <div>
                <h4 className="text-xs uppercase font-bold text-[#4A3E39] tracking-wider">Nervous System Attuned</h4>
                <p className="text-[11px] text-[#8C7A6B] mt-0.5 font-light">Integrating somatic breathwork to ensure stress is cleared from body tissues.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {}
      <section id="breathing-guide" className="py-20 border-y border-[#EAE0D2]/80 bg-[#FAF7F2] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#B59670] font-bold mb-3 inline-block">
            Mindful Grounding Space
          </span>
          <h2 className="text-2xl md:text-4xl font-serif text-[#2A2421] font-light tracking-tight mb-4">
            An Instant Moment of Release
          </h2>
          <p className="text-[#6E5D53] text-xs md:text-sm max-w-lg mx-auto font-light mb-10 leading-relaxed">
            Before reading further, let’s bring your awareness back inside. Click start below to activate our 4-7-8 grounding breathing tool. Simply follow the expanding circle.
          </p>

          {/* Interactive Breathing Canvas Circle */}
          <div className="flex flex-col items-center justify-center min-h-[300px]">
            <div className="relative flex items-center justify-center">
              
              {/* Outer pulsing ring */}
              <div 
                className={`absolute rounded-full bg-[#E5D5C5]/20 border border-[#B59670]/30 transition-all duration-[1000ms] ease-in-out ${
                  breathPhase === 'Inhale' ? 'w-64 h-64 scale-110 opacity-100' :
                  breathPhase === 'Hold' ? 'w-64 h-64 scale-100 opacity-90' :
                  breathPhase === 'Exhale' ? 'w-32 h-32 scale-90 opacity-40' :
                  'w-40 h-40 opacity-70'
                }`}
              />

              {/* Central Circle */}
              <div 
                className={`w-36 h-36 rounded-full bg-gradient-to-br from-[#FAF7F2] to-[#EAE0D2] border border-[#B59670]/40 flex flex-col items-center justify-center transition-all duration-1000 shadow-inner relative z-10`}
              >
                <span className="text-xs tracking-widest uppercase font-bold text-[#4A3E39]">
                  {breathPhase === 'Grounded' ? 'Ready' : breathPhase}
                </span>
                {isBreathingActive && (
                  <span className="text-2xl font-serif text-[#B59670] font-light mt-1 animate-pulse">
                    {breathCounter}s
                  </span>
                )}
              </div>

            </div>

            <div className="mt-12 space-y-4">
              <button
                onClick={() => setIsBreathingActive(!isBreathingActive)}
                className={`px-8 py-3 rounded-full text-xs tracking-widest uppercase font-bold transition-all shadow-sm ${
                  isBreathingActive 
                    ? 'bg-[#8C7A6B] text-[#FAF7F2] hover:bg-[#4A3E39]' 
                    : 'bg-[#4A3E39] text-[#FAF7F2] hover:bg-[#B59670]'
                }`}
              >
                {isBreathingActive ? 'Stop Breath Guidance' : 'Begin Grounding Breath'}
              </button>

              <p className="text-[10px] uppercase text-[#8C7A6B] tracking-wider font-semibold">
                {breathPhase === 'Inhale' && 'Breathe in slowly through your nose. Fill your lungs.'}
                {breathPhase === 'Hold' && 'Gently hold. Let the stillness settle your heart.'}
                {breathPhase === 'Exhale' && 'Audible, warm sigh out. Release all physical gripping.'}
                {breathPhase === 'Grounded' && 'Take a moment. There is nowhere else you need to be.'}
              </p>
            </div>

          </div>

        </div>
      </section>

      {}
      <section id="empathy" className="py-24 max-w-6xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#B59670] font-bold mb-3 inline-block">
            THE EMPATHY MATRIX
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-[#2A2421] tracking-tight">
            How does your heart feel today?
          </h2>
          <p className="text-[#6E5D53] text-sm md:text-base max-w-xl mx-auto font-light mt-3">
            Select the immediate state that resonates with your nervous system below to receive a direct personal note from Kamohelo’s heart to yours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Selector Columns (Col-5) */}
          <div className="lg:col-span-5 space-y-4">
            {EMPATHY_PATHWAYS.map((pathway) => (
              <button
                key={pathway.id}
                onClick={() => setSelectedEmpathy(pathway)}
                className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${
                  selectedEmpathy?.id === pathway.id
                    ? 'border-[#B59670] bg-[#F8F1E5]/70 shadow-sm'
                    : 'border-[#EAE0D2]/60 bg-white hover:border-[#B59670]/40'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl" role="img" aria-label={pathway.feeling}>
                    {pathway.emoji}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#4A3E39]">
                      {pathway.feeling}
                    </h4>
                    <p className="text-[11px] text-[#8C7A6B] font-light mt-0.5 line-clamp-1">
                      {pathway.description}
                    </p>
                  </div>
                </div>
                <ChevronRight 
                  size={16} 
                  className={`text-[#B59670] transition-transform duration-300 ${
                    selectedEmpathy?.id === pathway.id ? 'translate-x-1' : 'group-hover:translate-x-1'
                  }`} 
                />
              </button>
            ))}
          </div>

          {/* Letter response column (Col-7) */}
          <div className="lg:col-span-7 bg-[#FDFBF7] border border-[#EAE0D2] rounded-3xl p-8 md:p-12 shadow-sm relative">
            <div className="absolute top-0 right-0 p-8 text-[#B59670] opacity-15">
              <Flower2 size={120} />
            </div>

            {selectedEmpathy ? (
              <div className="relative z-10 space-y-6 animate-fadeIn">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B59670] font-bold">
                  <Heart size={14} />
                  <span>A Message for You</span>
                </div>

                {/* Simulated Handwritten Style Quote */}
                <p className="text-stone-800 font-serif italic text-base md:text-lg leading-relaxed border-l-2 border-[#B59670]/30 pl-6 py-1">
                  "{selectedEmpathy.personalNote}"
                </p>

                <div className="pt-6 border-t border-[#EAE0D2]/60 space-y-4">
                  <div>
                    <span className="block text-[10px] text-[#8C7A6B] uppercase tracking-widest font-semibold">How We Heal This:</span>
                    <p className="text-xs text-[#4A3E39] font-medium mt-1">
                      {selectedEmpathy.healingPillar}
                    </p>
                  </div>

                  <div>
                    <span className="block text-[10px] text-[#8C7A6B] uppercase tracking-widest font-semibold">Suggested Gentle Avenue:</span>
                    <p className="text-xs text-[#B59670] font-bold uppercase tracking-wider mt-1 flex items-center gap-1.5">
                      <Compass size={12} /> {selectedEmpathy.suggestedFocus}
                    </p>
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    onClick={() => triggerBookingFlow(`Clarity call regarding feeling: ${selectedEmpathy.feeling}`)}
                    className="px-6 py-3 bg-[#4A3E39] hover:bg-[#B59670] text-[#FDFBF7] rounded-full text-xs tracking-widest uppercase font-bold transition-all flex items-center gap-2 shadow-sm"
                  >
                    Let’s Talk <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <span className="text-sm text-[#8C7A6B]">Select a path on the left to show the healing roadmap.</span>
              </div>
            )}

          </div>

        </div>
      </section>

      {}
      <section id="credentials" className="py-24 border-t border-[#EAE0D2]/80 bg-[#FAF7F2] relative">
        <div className="max-w-6xl mx-auto px-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Visual credential blocks (Col-6) */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#B59670] font-bold">
                ESTABLISHED TRUST & CERTIFICATIONS
              </span>
              <h2 className="text-3xl md:text-4xl font-serif text-[#2A2421] font-light tracking-tight leading-tight">
                Deep expertise matching profound empathy.
              </h2>
              <p className="text-[#6E5D53] text-sm font-light leading-relaxed">
                Many wellness spaces offer great hope, but lack the technical psychological and physiological frameworks to handle heavy emotional moments safely. Kamohelo’s practice is built upon recognized global training, continuous supervision, and certified trauma-informed systems.
              </p>

              <div className="space-y-4 pt-4">
                
                {/* Qualification card 1 */}
                <div className="flex gap-4 p-5 bg-white border border-[#EAE0D2] rounded-2xl shadow-sm">
                  <div className="p-3 bg-[#F8F1E5] text-[#B59670] rounded-xl flex-shrink-0 h-12 w-12 flex items-center justify-center">
                    <Award size={22} />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-bold text-[#4A3E39] tracking-wider">ICF Attuned Coach (PCC Track)</h4>
                    <p className="text-[11px] text-[#8C7A6B] mt-1">International Coaching Federation guidelines applied strictly to ensure results-based, ethically structured development processes.</p>
                  </div>
                </div>

                {/* Qualification card 2 */}
                <div className="flex gap-4 p-5 bg-white border border-[#EAE0D2] rounded-2xl shadow-sm">
                  <div className="p-3 bg-[#F8F1E5] text-[#B59670] rounded-xl flex-shrink-0 h-12 w-12 flex items-center justify-center">
                    <Activity size={22} />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-bold text-[#4A3E39] tracking-wider">Certified Somatic Breath Facilitator</h4>
                    <p className="text-[11px] text-[#8C7A6B] mt-1">Specialized in trauma-aware somatic release, nervous system mapping, and diaphragmatic breath therapy for stress clearance.</p>
                  </div>
                </div>

                {/* Qualification card 3 */}
                <div className="flex gap-4 p-5 bg-white border border-[#EAE0D2] rounded-2xl shadow-sm">
                  <div className="p-3 bg-[#F8F1E5] text-[#B59670] rounded-xl flex-shrink-0 h-12 w-12 flex items-center justify-center">
                    <BookOpen size={22} />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-bold text-[#4A3E39] tracking-wider">Applied Psychology Foundations</h4>
                    <p className="text-[11px] text-[#8C7A6B] mt-1">Grounded in cognitive integration, transactional analysis, and emotional schema regulation frameworks to keep you safe.</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Explanatory Narrative Column (Col-6) */}
            <div className="lg:col-span-6 bg-white border border-[#EAE0D2] p-8 md:p-12 rounded-3xl shadow-sm">
              <span className="text-[9px] uppercase tracking-widest text-[#B59670] font-bold block mb-4">A NOTE ON MY PRACTICE</span>
              
              <div className="space-y-4 text-xs text-[#6E5D53] font-light leading-relaxed">
                <p>
                  "I started <strong>The Becoming</strong> because I watched too many brilliant individuals in Johannesburg collapse under the silent expectations of survival. They were working beautifully on paper, but dying quietly inside."
                </p>
                <p>
                  "My training is not centered on telling you what to do. Rather, it is designed to hold an anchor so steady that you can turn inward and face the parts of you that have been running on empty. We investigate limiting childhood schemas, somatized ancestral stress, and construct realistic boundary patterns."
                </p>
                <p className="font-serif italic text-sm text-[#4A3E39]">
                  "You are not broken. You are simply on the threshold of remembering your alignment."
                </p>
              </div>

              <div className="pt-8 mt-8 border-t border-[#EAE0D2] flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full border border-[#B59670] bg-[#FAF7F2] flex items-center justify-center font-serif text-xs text-[#B59670] font-semibold">
                    KBK
                  </div>
                  <div>
                    <h5 className="text-xs font-bold uppercase text-[#4A3E39] tracking-wider">Kamohelo B.K.</h5>
                    <p className="text-[10px] text-[#8C7A6B]">Practice Founder & Somatic Guide</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => triggerBookingFlow("15-Min Free Clarity Consultation")}
                  className="px-5 py-3 border border-[#4A3E39] hover:bg-[#4A3E39] hover:text-[#FDFBF7] text-[#4A3E39] text-[10px] tracking-widest uppercase font-bold rounded-full transition-all"
                >
                  Confirm Authenticity
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {}
      <section id="services" className="py-24 max-w-6xl mx-auto px-6 relative">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-8">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#B59670] font-bold mb-3 block">
              OUR CLINICAL & WELLNESS ARCHITECTURES
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#2A2421] font-light tracking-tight leading-tight">
              Bespoke Spaces of Healing & Growth
            </h2>
          </div>

          {/* Filter Categories */}
          <div className="flex flex-wrap gap-2">
            {(['all', 'individual', 'group', 'wellness', 'corporate'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-full text-[10px] tracking-wider uppercase font-semibold border transition-all duration-300 ${
                  activeTab === tab
                    ? 'border-[#4A3E39] bg-[#4A3E39] text-[#FDFBF7]'
                    : 'border-[#EAE0D2] bg-white hover:border-[#B59670] text-[#6E5D53]'
                }`}
              >
                {tab === 'all' ? 'All Spaces' : `${tab}`}
              </button>
            ))}
          </div>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredServices.map((service) => (
            <div 
              key={service.id}
              className="bg-white border border-[#EAE0D2] rounded-3xl p-8 flex flex-col justify-between hover:border-[#B59670] hover:shadow-md transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[9px] uppercase tracking-widest px-3 py-1 bg-[#FAF7F2] border border-[#EAE0D2] rounded-full text-[#B59670] font-semibold">
                    {service.category} Space
                  </span>
                  <span className="text-[10px] text-[#8C7A6B] font-light">
                    {service.duration}
                  </span>
                </div>

                <h3 className="text-2xl font-serif text-[#4A3E39] font-light mb-2 group-hover:text-[#B59670] transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-[#B59670] italic font-light tracking-wide mb-4">
                  {service.tagline}
                </p>
                <p className="text-xs text-[#6E5D53] font-light leading-relaxed mb-6">
                  {service.description}
                </p>

                <div className="space-y-2.5 mb-8">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-[#4A3E39] font-light">
                      <Check size={14} className="text-[#B59670] flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-[#EAE0D2]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="block text-[9px] text-[#8C7A6B] uppercase tracking-widest">Therapeutic Focus:</span>
                  <span className="text-[10px] text-[#4A3E39] font-semibold">{service.therapeuticFocus}</span>
                </div>
                
                <button 
                  onClick={() => triggerBookingFlow(service.title)}
                  className="px-5 py-3 bg-[#FAF7F2] hover:bg-[#4A3E39] text-[#4A3E39] hover:text-[#FAF7F2] border border-[#EAE0D2] hover:border-[#4A3E39] rounded-full text-[10px] tracking-widest uppercase font-bold transition-all text-center"
                >
                  Enter This Space
                </button>
              </div>

            </div>
          ))}
        </div>

      </section>

      {}
      <section id="alignment-tool" className="py-24 border-t border-[#EAE0D2]/80 bg-[#FAF7F2] relative">
        <div className="max-w-6xl mx-auto px-6">
          
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#B59670] font-bold mb-3 inline-block">
              INTEGRATIVE DISCOVERY QUIZ
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#2A2421] font-light tracking-tight mb-4">
              Map your current state of alignment
            </h2>
            <p className="text-[#6E5D53] text-sm md:text-base max-w-xl mx-auto font-light leading-relaxed">
              Where is your system holding stress, and where is it ready to open? Adjust these sliders based on your current feelings (1 = heavy stagnation, 10 = absolute ease).
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Sliders Container (Col-7) */}
            <div className="lg:col-span-7 bg-white border border-[#EAE0D2] p-8 md:p-10 rounded-3xl shadow-sm space-y-6">
              
              {/* Slider 1 */}
              <div>
                <div className="flex justify-between text-xs tracking-wider uppercase mb-1.5">
                  <span className="text-[#4A3E39] font-bold flex items-center gap-2">
                    <Heart size={14} className="text-[#B59670]" /> Emotional Capacity
                  </span>
                  <span className="text-[#B59670] font-bold">{wheelScores.emotional}/10</span>
                </div>
                <input 
                  type="range" min="1" max="10" 
                  value={wheelScores.emotional} 
                  onChange={(e) => handleScoreChange('emotional', parseInt(e.target.value))}
                  className="w-full accent-[#B59670] h-1 bg-[#FAF7F2] rounded-lg cursor-pointer"
                />
                <span className="text-[10px] text-[#8C7A6B] font-light block mt-0.5">Ability to sit with, process, and express deep feelings safely without flooding.</span>
              </div>

              {/* Slider 2 */}
              <div>
                <div className="flex justify-between text-xs tracking-wider uppercase mb-1.5">
                  <span className="text-[#4A3E39] font-bold flex items-center gap-2">
                    <Sparkles size={14} className="text-[#B59670]" /> Baseline Self-Worth
                  </span>
                  <span className="text-[#B59670] font-bold">{wheelScores.confidence}/10</span>
                </div>
                <input 
                  type="range" min="1" max="10" 
                  value={wheelScores.confidence} 
                  onChange={(e) => handleScoreChange('confidence', parseInt(e.target.value))}
                  className="w-full accent-[#B59670] h-1 bg-[#FAF7F2] rounded-lg cursor-pointer"
                />
                <span className="text-[10px] text-[#8C7A6B] font-light block mt-0.5">Quiet certainty of your value, free from the exhaustion of over-delivering.</span>
              </div>

              {/* Slider 3 */}
              <div>
                <div className="flex justify-between text-xs tracking-wider uppercase mb-1.5">
                  <span className="text-[#4A3E39] font-bold flex items-center gap-2">
                    <Compass size={14} className="text-[#B59670]" /> Transition Agency
                  </span>
                  <span className="text-[#B59670] font-bold">{wheelScores.transition}/10</span>
                </div>
                <input 
                  type="range" min="1" max="10" 
                  value={wheelScores.transition} 
                  onChange={(e) => handleScoreChange('transition', parseInt(e.target.value))}
                  className="w-full accent-[#B59670] h-1 bg-[#FAF7F2] rounded-lg cursor-pointer"
                />
                <span className="text-[10px] text-[#8C7A6B] font-light block mt-0.5">Navigating changes in careers, divorces, or relocations with resilience.</span>
              </div>

              {/* Slider 4 */}
              <div>
                <div className="flex justify-between text-xs tracking-wider uppercase mb-1.5">
                  <span className="text-[#4A3E39] font-bold flex items-center gap-2">
                    <TrendingUp size={14} className="text-[#B59670]" /> Purpose Alignment
                  </span>
                  <span className="text-[#B59670] font-bold">{wheelScores.career}/10</span>
                </div>
                <input 
                  type="range" min="1" max="10" 
                  value={wheelScores.career} 
                  onChange={(e) => handleScoreChange('career', parseInt(e.target.value))}
                  className="w-full accent-[#B59670] h-1 bg-[#FAF7F2] rounded-lg cursor-pointer"
                />
                <span className="text-[10px] text-[#8C7A6B] font-light block mt-0.5">How fully your daily labor matches your deeply felt internal compass.</span>
              </div>

              {/* Slider 5 */}
              <div>
                <div className="flex justify-between text-xs tracking-wider uppercase mb-1.5">
                  <span className="text-[#4A3E39] font-bold flex items-center gap-2">
                    <Activity size={14} className="text-[#B59670]" /> Nervous System Calm
                  </span>
                  <span className="text-[#B59670] font-bold">{wheelScores.mindfulness}/10</span>
                </div>
                <input 
                  type="range" min="1" max="10" 
                  value={wheelScores.mindfulness} 
                  onChange={(e) => handleScoreChange('mindfulness', parseInt(e.target.value))}
                  className="w-full accent-[#B59670] h-1 bg-[#FAF7F2] rounded-lg cursor-pointer"
                />
                <span className="text-[10px] text-[#8C7A6B] font-light block mt-0.5">Frequency of experiencing quiet, deep resting states without constant hypervigilance.</span>
              </div>

              <button 
                onClick={() => setShowAssessmentResult(true)}
                className="w-full py-4 bg-[#4A3E39] hover:bg-[#B59670] text-[#FDFBF7] font-bold text-xs tracking-widest uppercase rounded-full transition-all"
              >
                Analyze My Inner Blueprint
              </button>

            </div>

            {/* Assessment Feedback Card (Col-5) */}
            <div className="lg:col-span-5">
              {showAssessmentResult ? (
                <div className="bg-[#FDFBF7] border border-[#B59670] rounded-3xl p-8 shadow-sm text-center relative overflow-hidden animate-fadeIn">
                  <span className="text-[9px] uppercase tracking-widest text-[#B59670] font-bold">Your Attunement Analysis</span>
                  <h3 className="text-2xl font-serif text-[#4A3E39] font-light my-4">
                    {getAssessmentAnalysis().title}
                  </h3>
                  <p className="text-xs text-[#6E5D53] leading-relaxed font-light mb-8">
                    {getAssessmentAnalysis().desc}
                  </p>

                  <button 
                    onClick={() => triggerBookingFlow(`Consultation via Alignment Diagnostic`)}
                    className="px-6 py-3.5 bg-[#4A3E39] hover:bg-[#B59670] text-[#FDFBF7] text-xs tracking-widest uppercase font-bold rounded-full transition-all shadow-sm"
                  >
                    {getAssessmentAnalysis().action}
                  </button>
                </div>
              ) : (
                <div className="border border-[#EAE0D2] bg-[#FAF7F2]/40 rounded-3xl p-8 text-center flex flex-col items-center justify-center min-h-[350px]">
                  <Compass className="text-[#8C7A6B] mb-4 animate-spin" size={40} style={{ animationDuration: '25s' }} />
                  <h3 className="text-base font-serif text-[#4A3E39] font-medium mb-2">Awaiting Alignment Values</h3>
                  <p className="text-[11px] text-[#8C7A6B] max-w-xs font-light leading-relaxed">
                    Slide each value to represent your physical and emotional truth, then click "Analyze" to see custom feedback mapped out dynamically.
                  </p>
                </div>
              )}
            </div>

          </div>

        </div>
      </section>

      {}
      <section className="py-24 max-w-6xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#B59670] font-bold mb-3 inline-block">
            AUTHENTIC STORIES OF EMERGENCE
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-[#2A2421] font-light tracking-tight">
            How other weary nervous systems found peace
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div 
              key={idx}
              className="bg-white border border-[#EAE0D2] rounded-3xl p-8 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <span className="text-[#B59670] text-3xl font-serif">“</span>
                <p className="text-xs text-[#6E5D53] italic font-light leading-relaxed mb-6">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-[#EAE0D2]/60 space-y-3">
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div>
                    <span className="block text-[#8C7A6B] uppercase font-bold tracking-widest text-[9px]">Arrived:</span>
                    <span className="text-red-800/85 font-medium">{t.stateBefore}</span>
                  </div>
                  <div>
                    <span className="block text-[#8C7A6B] uppercase font-bold tracking-widest text-[9px]">Emerged:</span>
                    <span className="text-emerald-800/85 font-bold">{t.stateAfter}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <h5 className="text-xs font-bold text-[#4A3E39] uppercase tracking-wider">{t.name}</h5>
                  <p className="text-[10px] text-[#8C7A6B]">{t.role}</p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2A2421]/60 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#FDFBF7] border border-[#EAE0D2] rounded-3xl max-w-md w-full overflow-hidden relative shadow-2xl">
            
            {/* Header / Dismiss */}
            <div className="p-6 border-b border-[#EAE0D2] flex justify-between items-center bg-[#FAF7F2]">
              <div>
                <h3 className="text-xs uppercase tracking-widest font-bold text-[#4A3E39]">Sanctuary Booking Hub</h3>
                <p className="text-[10px] text-[#8C7A6B] font-light">Set up a 15-Min Free Clarity Session</p>
              </div>
              <button 
                onClick={() => setIsBookingModalOpen(false)}
                className="text-[#8C7A6B] hover:text-[#4A3E39] p-1.5 hover:bg-[#FAF7F2] rounded-full transition-all"
              >
                <X size={18} />
              </button>
            </div>

            {/* Step form content */}
            {bookingComplete ? (
              <div className="p-8 text-center flex flex-col items-center justify-center min-h-[350px]">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500 flex items-center justify-center mb-6">
                  <Check className="text-emerald-600" size={32} />
                </div>
                <h4 className="text-2xl font-serif text-[#2A2421] font-light mb-2">Space Confirmed</h4>
                <p className="text-xs text-[#6E5D53] leading-relaxed max-w-xs font-light mb-8">
                  Your safe space placeholder is logged. Kamohelo will get in touch directly on <strong className="text-[#4A3E39]">{bookingDetails.email}</strong> or phone to confirm details.
                </p>
                <button 
                  onClick={() => setIsBookingModalOpen(false)}
                  className="px-6 py-3 bg-[#4A3E39] hover:bg-[#B59670] text-[#FDFBF7] font-bold text-xs tracking-widest uppercase rounded-full transition-all"
                >
                  Return to Sanctuary
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="p-6 space-y-4">
                
                {/* Steps markers */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] text-[#8C7A6B] uppercase tracking-widest">Step {bookingStep} of 3</span>
                  <div className="flex gap-1">
                    {[1, 2, 3].map((step) => (
                      <div 
                        key={step} 
                        className={`w-4 h-1 rounded-full ${bookingStep >= step ? 'bg-[#B59670]' : 'bg-[#EAE0D2]'}`} 
                      />
                    ))}
                  </div>
                </div>

                {/* Step 1 */}
                {bookingStep === 1 && (
                  <div className="space-y-4 animate-fadeIn">
                    <label className="block">
                      <span className="block text-[10px] uppercase tracking-wider text-[#6E5D53] mb-1 font-bold">Select Requested Space</span>
                      <select 
                        value={bookingDetails.service}
                        onChange={(e) => setBookingDetails({...bookingDetails, service: e.target.value})}
                        className="w-full p-3 bg-white border border-[#EAE0D2] rounded-xl text-[#4A3E39] text-xs focus:outline-none focus:border-[#B59670]"
                        required
                      >
                        <option value="15-Min Free Clarity Consultation">15-Min Free Clarity Consultation</option>
                        <option value="Individual Coaching Journey">Individual Coaching Journey</option>
                        <option value="Group Emergence Collective">Group Emergence Collective</option>
                        <option value="Wellness Conversations">Wellness Conversations</option>
                        <option value="Corporate Emotional Wellness">Corporate Emotional Wellness</option>
                      </select>
                    </label>

                    <label className="block">
                      <span className="block text-[10px] uppercase tracking-wider text-[#6E5D53] mb-1 font-bold">Preferred Format</span>
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <button
                          type="button"
                          onClick={() => setBookingDetails({...bookingDetails, format: 'Virtual Session'})}
                          className={`p-3 border rounded-xl font-semibold tracking-wider uppercase text-[9px] ${
                            bookingDetails.format === 'Virtual Session' 
                              ? 'border-[#B59670] bg-[#F8F1E5] text-[#4A3E39]' 
                              : 'border-[#EAE0D2] bg-white text-[#6E5D53]'
                          }`}
                        >
                          Virtual Video
                        </button>
                        <button
                          type="button"
                          onClick={() => setBookingDetails({...bookingDetails, format: 'Face-to-Face Jhb'})}
                          className={`p-3 border rounded-xl font-semibold tracking-wider uppercase text-[9px] ${
                            bookingDetails.format === 'Face-to-Face Jhb' 
                              ? 'border-[#B59670] bg-[#F8F1E5] text-[#4A3E39]' 
                              : 'border-[#EAE0D2] bg-white text-[#6E5D53]'
                          }`}
                        >
                          Face-to-Face (Jhb)
                        </button>
                      </div>
                    </label>

                    <button 
                      type="button"
                      onClick={() => setBookingStep(2)}
                      className="w-full mt-4 py-3 bg-[#4A3E39] text-[#FDFBF7] hover:bg-[#B59670] font-bold text-xs tracking-widest uppercase rounded-full transition-all"
                    >
                      Next Step
                    </button>
                  </div>
                )}

                {/* Step 2 */}
                {bookingStep === 2 && (
                  <div className="space-y-4 animate-fadeIn">
                    <label className="block">
                      <span className="block text-[10px] uppercase tracking-wider text-[#6E5D53] mb-1 font-bold">Select Date</span>
                      <div className="relative">
                        <input 
                          type="date"
                          value={bookingDetails.date}
                          onChange={(e) => setBookingDetails({...bookingDetails, date: e.target.value})}
                          className="w-full p-3 bg-white border border-[#EAE0D2] rounded-xl text-[#4A3E39] text-xs focus:outline-none focus:border-[#B59670]"
                          required
                        />
                      </div>
                    </label>

                    <label className="block">
                      <span className="block text-[10px] uppercase tracking-wider text-[#6E5D53] mb-1 font-bold">Select Available Slot</span>
                      <div className="grid grid-cols-2 gap-2">
                        {['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'].map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setBookingDetails({...bookingDetails, time: t})}
                            className={`p-2.5 text-[10px] tracking-wide border rounded-xl font-bold transition-all ${
                              bookingDetails.time === t 
                                ? 'border-[#B59670] bg-[#F8F1E5] text-[#4A3E39]' 
                                : 'border-[#EAE0D2] bg-white text-[#6E5D53]'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </label>

                    <div className="grid grid-cols-2 gap-3 mt-6">
                      <button 
                        type="button" onClick={() => setBookingStep(1)}
                        className="py-3 border border-[#EAE0D2] text-[#6E5D53] text-[10px] tracking-widest uppercase rounded-full font-bold"
                      >
                        Back
                      </button>
                      <button 
                        type="button"
                        onClick={() => setBookingStep(3)}
                        disabled={!bookingDetails.date || !bookingDetails.time}
                        className="py-3 bg-[#4A3E39] disabled:bg-[#FAF7F2] disabled:text-[#8C7A6B] hover:bg-[#B59670] text-[#FDFBF7] font-bold text-xs tracking-widest uppercase rounded-full transition-all"
                      >
                        Next Step
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3 */}
                {bookingStep === 3 && (
                  <div className="space-y-4 animate-fadeIn">
                    <label className="block">
                      <span className="block text-[10px] uppercase tracking-wider text-[#6E5D53] mb-1 font-bold">Your Name</span>
                      <input 
                        type="text"
                        placeholder="Dearest Name"
                        value={bookingDetails.name}
                        onChange={(e) => setBookingDetails({...bookingDetails, name: e.target.value})}
                        className="w-full p-3 bg-white border border-[#EAE0D2] rounded-xl text-[#4A3E39] text-xs focus:outline-none focus:border-[#B59670]"
                        required
                      />
                    </label>

                    <label className="block">
                      <span className="block text-[10px] uppercase tracking-wider text-[#6E5D53] mb-1 font-bold">Email Address</span>
                      <input 
                        type="email"
                        placeholder="you@domain.co.za"
                        value={bookingDetails.email}
                        onChange={(e) => setBookingDetails({...bookingDetails, email: e.target.value})}
                        className="w-full p-3 bg-white border border-[#EAE0D2] rounded-xl text-[#4A3E39] text-xs focus:outline-none focus:border-[#B59670]"
                        required
                      />
                    </label>

                    <label className="block">
                      <span className="block text-[10px] uppercase tracking-wider text-[#6E5D53] mb-1 font-bold">Phone Number (WhatsApp friendly)</span>
                      <input 
                        type="tel"
                        placeholder="+27"
                        value={bookingDetails.phone}
                        onChange={(e) => setBookingDetails({...bookingDetails, phone: e.target.value})}
                        className="w-full p-3 bg-white border border-[#EAE0D2] rounded-xl text-[#4A3E39] text-xs focus:outline-none focus:border-[#B59670]"
                        required
                      />
                    </label>

                    <div className="grid grid-cols-2 gap-3 mt-6">
                      <button 
                        type="button" onClick={() => setBookingStep(2)}
                        className="py-3 border border-[#EAE0D2] text-[#6E5D53] text-[10px] tracking-widest uppercase rounded-full font-bold"
                      >
                        Back
                      </button>
                      <button 
                        type="submit"
                        className="py-3 bg-[#4A3E39] hover:bg-[#B59670] text-[#FDFBF7] font-bold text-xs tracking-widest uppercase rounded-full transition-all"
                      >
                        Complete Booking
                      </button>
                    </div>
                  </div>
                )}

              </form>
            )}

          </div>
        </div>
      )}

      {}
      <section className="py-24 max-w-5xl mx-auto px-6">
        <div className="bg-[#FAF7F2] border border-[#EAE0D2] rounded-[40px] p-8 md:p-16 text-center relative overflow-hidden">
          
          <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#B59670] font-bold mb-4">
              THE WEEKLY ALIGNMENT WRITING
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#2A2421] font-light tracking-tight mb-4">
              Gentle letters to your inbox
            </h2>
            <p className="text-xs text-[#6E5D53] font-light leading-relaxed mb-8">
              Every Sunday, Kamohelo shares deep somatic exercises, professional transition blueprints, and updates regarding upcoming face-to-face workshops in Rosebank, Johannesburg. No spam. Simply safety.
            </p>

            {newsletterSuccess ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs tracking-wider rounded-2xl animate-fadeIn font-bold">
                <Check className="inline mr-2" size={14} /> You are now subscribed to Kamohelo’s warm written circle.
              </div>
            ) : (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (newsletterEmail.trim()) {
                    setNewsletterSuccess(true);
                    setTimeout(() => {
                      setNewsletterSuccess(false);
                      setNewsletterEmail('');
                    }, 5000);
                  }
                }} 
                className="w-full flex flex-col sm:flex-row gap-3"
              >
                <input 
                  type="email" 
                  placeholder="Enter your email to align..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-grow p-4 bg-white border border-[#EAE0D2] rounded-full text-xs text-[#4A3E39] focus:outline-none focus:border-[#B59670] px-6"
                  required
                />
                <button 
                  type="submit"
                  className="px-8 py-4 bg-[#4A3E39] hover:bg-[#B59670] text-[#FDFBF7] font-bold text-xs tracking-widest uppercase rounded-full transition-all whitespace-nowrap"
                >
                  Join the Writing Circle
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#EAE0D2] bg-white pt-16 pb-12 relative z-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="md:col-span-2">
            <h3 className="text-lg tracking-[0.25em] font-serif font-light text-[#4A3E39] uppercase">
              THE BECOMING
            </h3>
            <span className="text-[10px] tracking-[0.4em] text-[#8C7A6B] uppercase block">
              by Kamohelo (Pty) Ltd
            </span>
            <p className="text-[#6E5D53] text-xs font-light leading-relaxed mt-4 max-w-sm">
              Providing somatic safety, transition frameworks, alignment coaching, and certified wellness spaces under deep clinical training guidelines.
            </p>
          </div>

          <div>
            <h4 className="text-[#4A3E39] text-xs uppercase tracking-widest font-bold mb-4">Core Pathways</h4>
            <ul className="space-y-2 text-[#8C7A6B] text-xs font-light">
              <li><a href="#services" className="hover:text-[#B59670] transition-colors">Individual Attunement</a></li>
              <li><a href="#services" className="hover:text-[#B59670] transition-colors">Group Collective</a></li>
              <li><a href="#services" className="hover:text-[#B59670] transition-colors">Wellness Conversations</a></li>
              <li><a href="#services" className="hover:text-[#B59670] transition-colors">Corporate Somatics</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#4A3E39] text-xs uppercase tracking-widest font-bold mb-4">Johannesburg Hub</h4>
            <ul className="space-y-3 text-[#8C7A6B] text-xs font-light">
              <li className="flex items-center gap-2">
                <MapPin size={12} className="text-[#B59670] flex-shrink-0" />
                <span>Rosebank / Sandton, South Africa</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={12} className="text-[#B59670] flex-shrink-0" />
                <span>kamohelo@thebecoming.co.za</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={12} className="text-[#B59670] flex-shrink-0" />
                <span>+27 (0) 72 456 7891</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Regulatory, clinical warnings & copyrights */}
        <div className="max-w-6xl mx-auto px-6 pt-8 border-t border-[#EAE0D2] flex flex-col sm:flex-row justify-between items-center text-[10px] text-[#8C7A6B] tracking-wider gap-4">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-center sm:text-left">
            <span>&copy; 2026 The Becoming by Kamohelo (Pty) Ltd. All Rights Reserved.</span>
            <span>Reg No: 2024/098765/07</span>
          </div>
          <div className="flex gap-4 uppercase font-bold text-[9px] text-[#4A3E39]">
            <a href="#hero" className="hover:text-[#B59670] transition-colors">Confidentiality Agreement</a>
            <span>&bull;</span>
            <a href="#hero" className="hover:text-[#B59670] transition-colors">Ethics Policy</a>
          </div>
        </div>
      </footer>

    </div>
  );
}