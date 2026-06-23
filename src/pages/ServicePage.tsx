import { useEffect, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { services } from '../data/services';
import {
  Monitor, Globe, Layout, RefreshCw, TrendingUp, Share2,
  Mail, PenTool, Layers, User, Presentation, Zap,
  ArrowRight, ArrowLeft, CheckCircle, ChevronRight,
  Star, BarChart2, Search, Target, Rocket, Shield,
  Activity, Cpu, MousePointer, Award, Clock, TrendingDown,
  MessageCircle, Heart, Eye, Play, FileText, Palette,
  LineChart, Users, DollarSign, Percent, ArrowUpRight,
} from 'lucide-react';
import Footer from '../components/Footer';

const iconMap: Record<string, React.ElementType> = {
  Monitor, Globe, Layout, RefreshCw, TrendingUp, Share2,
  Mail, PenTool, Layers, User, Presentation, Zap,
};

/* ── Service-specific hero visual mockups ─────────────────────── */
function WebsiteDevVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Browser window */}
      <div className="w-full max-w-sm bg-gray-900/90 rounded-2xl border border-blue-500/30 shadow-2xl shadow-blue-500/10 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 bg-black/50 border-b border-white/5">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
          <div className="flex-1 mx-3 bg-white/5 rounded-full px-3 py-1 text-xs text-white/30 font-mono">https://yoursite.com</div>
        </div>
        <div className="p-4 space-y-3">
          <div className="h-24 rounded-xl bg-gradient-to-br from-blue-600/30 to-blue-900/30 border border-blue-500/20 flex items-center justify-center">
            <div className="text-center">
              <div className="w-8 h-1 bg-blue-400/60 rounded mx-auto mb-2" />
              <div className="w-16 h-1 bg-white/20 rounded mx-auto mb-1" />
              <div className="w-12 h-1 bg-white/10 rounded mx-auto" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[1,2,3].map(i => (
              <div key={i} className="h-12 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center">
                <div className="w-4 h-4 rounded bg-blue-500/30" />
              </div>
            ))}
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-3/4 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
          </div>
        </div>
      </div>
      {/* Floating metric card */}
      <div className="absolute -bottom-2 -right-2 bg-blue-600/90 backdrop-blur-xl rounded-xl px-4 py-2.5 border border-blue-400/30 shadow-lg">
        <div className="text-xs text-blue-200 mb-0.5">PageSpeed Score</div>
        <div className="text-xl font-bold text-white">98 <span className="text-green-400 text-sm">+12</span></div>
      </div>
      <div className="absolute -top-2 -left-2 bg-gray-900/90 backdrop-blur-xl rounded-xl px-4 py-2.5 border border-white/10 shadow-lg">
        <div className="text-xs text-white/40 mb-0.5">Conversion Rate</div>
        <div className="text-xl font-bold text-white">4.8% <span className="text-green-400 text-sm">↑</span></div>
      </div>
    </div>
  );
}

function SEOVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="w-full max-w-sm space-y-3">
        {/* Ranking chart */}
        <div className="bg-gray-900/90 rounded-2xl border border-blue-500/30 p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-white/50 font-medium">Keyword Rankings</span>
            <span className="text-xs text-green-400 font-bold">+47 positions</span>
          </div>
          <div className="flex items-end gap-1.5 h-20">
            {[30, 55, 45, 70, 60, 85, 80, 95].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, background: i > 4 ? 'linear-gradient(to top, #2563eb, #60a5fa)' : 'rgba(59,130,246,0.2)' }} />
            ))}
          </div>
        </div>
        {/* Search results mockup */}
        {['#1 Brand Strategy Guide', '#2 Digital Marketing Tips', '#3 SEO Best Practices'].map((item, i) => (
          <div key={i} className={`rounded-xl px-4 py-3 flex items-center gap-3 border transition-all ${i === 0 ? 'bg-blue-600/20 border-blue-500/40' : 'bg-white/3 border-white/5'}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${i === 0 ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/40'}`}>{i + 1}</div>
            <span className={`text-sm ${i === 0 ? 'text-white font-medium' : 'text-white/40'}`}>{item}</span>
          </div>
        ))}
      </div>
      <div className="absolute -top-2 -right-2 bg-green-600/90 rounded-xl px-3 py-2 border border-green-400/30">
        <div className="text-xs text-green-200 mb-0.5">Organic Traffic</div>
        <div className="text-lg font-bold text-white">+340%</div>
      </div>
    </div>
  );
}

function SocialMediaVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="w-full max-w-sm space-y-3">
        <div className="bg-gray-900/90 rounded-2xl border border-blue-500/30 p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-white">Engagement Dashboard</span>
            <span className="text-xs text-blue-400">This Month</span>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[{ icon: Heart, label: 'Likes', val: '12.4K', c: 'text-pink-400' }, { icon: MessageCircle, label: 'Comments', val: '1.8K', c: 'text-blue-400' }, { icon: Eye, label: 'Reach', val: '84K', c: 'text-purple-400' }].map(({ icon: Icon, label, val, c }) => (
              <div key={label} className="bg-white/5 rounded-xl p-3 text-center">
                <Icon className={`w-4 h-4 mx-auto mb-1 ${c}`} />
                <div className="text-sm font-bold text-white">{val}</div>
                <div className="text-xs text-white/40">{label}</div>
              </div>
            ))}
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-pink-500 to-blue-500" />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-white/30">Goal Progress</span>
            <span className="text-xs text-blue-400">80%</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[{ name: 'Instagram', col: 'from-pink-600/30 to-orange-600/30', b: 'border-pink-500/20' }, { name: 'LinkedIn', col: 'from-blue-700/30 to-blue-500/30', b: 'border-blue-500/20' }].map(({ name, col, b }) => (
            <div key={name} className={`rounded-xl p-3 bg-gradient-to-br ${col} border ${b}`}>
              <div className="text-xs text-white/60 mb-1">{name}</div>
              <div className="text-sm font-bold text-white">↑ 28%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BrandingVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="w-full max-w-sm space-y-3">
        <div className="bg-gray-900/90 rounded-2xl border border-blue-500/30 p-5">
          <div className="text-xs text-white/40 mb-3 uppercase tracking-widest">Brand Identity System</div>
          {/* Logo area */}
          <div className="h-20 rounded-xl bg-gradient-to-br from-blue-600/20 to-blue-900/10 border border-blue-500/20 flex items-center justify-center mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                <Star className="w-5 h-5 text-white" fill="white" />
              </div>
              <div>
                <div className="w-16 h-2 bg-white/60 rounded mb-1" />
                <div className="w-10 h-1 bg-white/20 rounded" />
              </div>
            </div>
          </div>
          {/* Color palette */}
          <div className="flex gap-2 mb-3">
            {['#0066FF', '#1a1a2e', '#60a5fa', '#0ea5e9', '#f8fafc', '#1e293b'].map(c => (
              <div key={c} className="flex-1 h-8 rounded-lg" style={{ backgroundColor: c }} />
            ))}
          </div>
          {/* Typography */}
          <div className="space-y-1">
            <div className="text-sm font-bold text-white" style={{ fontFamily: 'serif' }}>Aa Heading Font</div>
            <div className="text-xs text-white/40">Body Text — Clean & Professional</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {['Business Card', 'Letterhead', 'Favicon'].map(item => (
            <div key={item} className="rounded-xl bg-white/5 border border-white/5 p-2 text-center">
              <div className="w-6 h-6 rounded-lg bg-blue-500/20 mx-auto mb-1 flex items-center justify-center">
                <Palette className="w-3 h-3 text-blue-400" />
              </div>
              <div className="text-xs text-white/40">{item}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContentVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="w-full max-w-sm space-y-3">
        <div className="bg-gray-900/90 rounded-2xl border border-blue-500/30 p-4">
          <div className="text-xs text-white/40 mb-3 uppercase tracking-widest">Content Calendar</div>
          <div className="grid grid-cols-7 gap-1 mb-3">
            {['M','T','W','T','F','S','S'].map((d, i) => (
              <div key={i} className="text-center text-xs text-white/30 pb-1">{d}</div>
            ))}
            {Array.from({ length: 28 }, (_, i) => (
              <div key={i} className={`rounded h-6 flex items-center justify-center text-xs ${[2,5,9,13,16,20,23].includes(i) ? 'bg-blue-500/40 text-blue-200 font-bold' : 'bg-white/5 text-white/20'}`}>
                {i + 1}
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[{ icon: FileText, label: 'Blog Posts', val: '8/mo', c: 'text-blue-400' }, { icon: Play, label: 'Videos', val: '4/mo', c: 'text-red-400' }, { icon: PenTool, label: 'Graphics', val: '12/mo', c: 'text-purple-400' }, { icon: Mail, label: 'Newsletters', val: '4/mo', c: 'text-green-400' }].map(({ icon: Icon, label, val, c }) => (
            <div key={label} className="rounded-xl bg-white/5 border border-white/5 p-3 flex items-center gap-2">
              <Icon className={`w-4 h-4 ${c} flex-shrink-0`} />
              <div>
                <div className="text-xs text-white/40">{label}</div>
                <div className="text-sm font-bold text-white">{val}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EmailVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="w-full max-w-sm space-y-3">
        <div className="bg-gray-900/90 rounded-2xl border border-blue-500/30 p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-white/50">Email Performance</span>
            <span className="text-xs text-green-400">Live</span>
          </div>
          {[{ label: 'Open Rate', val: 47, color: 'from-blue-500 to-cyan-400' }, { label: 'Click Rate', val: 12, color: 'from-purple-500 to-pink-400' }, { label: 'Conversion', val: 6, color: 'from-green-500 to-emerald-400' }].map(({ label, val, color }) => (
            <div key={label} className="mb-3">
              <div className="flex justify-between mb-1">
                <span className="text-xs text-white/50">{label}</span>
                <span className="text-xs text-white font-bold">{val}%</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div className={`h-full rounded-full bg-gradient-to-r ${color}`} style={{ width: `${val * 2}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="bg-gray-900/90 rounded-2xl border border-white/10 p-4">
          <div className="h-6 w-3/4 bg-white/10 rounded mb-2" />
          <div className="h-2 w-full bg-white/5 rounded mb-1" />
          <div className="h-2 w-4/5 bg-white/5 rounded mb-3" />
          <div className="inline-block bg-blue-600 text-white text-xs px-4 py-1.5 rounded-full">Open Now →</div>
        </div>
      </div>
    </div>
  );
}

function GenericVisual({ icon: Icon, gradient }: { icon: React.ElementType; gradient: string }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="w-full max-w-sm space-y-3">
        <div className="bg-gray-900/90 rounded-2xl border border-blue-500/30 p-6 flex items-center justify-center">
          <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-2xl`}>
            <Icon className="w-12 h-12 text-white" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[{ label: 'Avg. ROI', val: '340%' }, { label: 'Delivery', val: '< 4 wks' }, { label: 'Revisions', val: 'Unlimited' }, { label: 'Support', val: '90 days' }].map(({ label, val }) => (
            <div key={label} className="rounded-xl bg-white/5 border border-white/5 p-3">
              <div className="text-xs text-white/40 mb-1">{label}</div>
              <div className="text-sm font-bold text-white">{val}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const serviceVisuals: Record<string, React.FC> = {
  'website-development': WebsiteDevVisual,
  'wordpress-development': () => <GenericVisual icon={Globe} gradient="from-blue-600 to-indigo-700" />,
  'wix-development': () => <GenericVisual icon={Layout} gradient="from-cyan-500 to-blue-600" />,
  'website-revamp': () => <GenericVisual icon={RefreshCw} gradient="from-orange-500 to-blue-600" />,
  'seo-optimization': SEOVisual,
  'social-media-marketing': SocialMediaVisual,
  'email-marketing': EmailVisual,
  'content-creation': ContentVisual,
  'brand-identity-design': BrandingVisual,
  'personal-branding': () => <GenericVisual icon={User} gradient="from-blue-600 to-purple-600" />,
  'presentation-design': () => <GenericVisual icon={Presentation} gradient="from-blue-500 to-cyan-400" />,
  'digital-marketing-solutions': () => <GenericVisual icon={Zap} gradient="from-yellow-500 to-orange-500" />,
};

/* ── Service-specific results metrics ────────────────────────── */
const serviceMetrics: Record<string, { label: string; val: string; sub: string; icon: React.ElementType; color: string }[]> = {
  'website-development': [
    { label: 'PageSpeed Score', val: '95+', sub: 'avg. after launch', icon: Activity, color: 'text-blue-400' },
    { label: 'Conversion Lift', val: '+68%', sub: 'vs. old site', icon: TrendingUp, color: 'text-green-400' },
    { label: 'Bounce Rate Drop', val: '-34%', sub: 'in 60 days', icon: TrendingDown, color: 'text-pink-400' },
    { label: 'Time on Site', val: '+2.4x', sub: 'avg. session', icon: Clock, color: 'text-purple-400' },
  ],
  'seo-optimization': [
    { label: 'Organic Traffic', val: '+340%', sub: 'in 6 months', icon: TrendingUp, color: 'text-green-400' },
    { label: 'Keyword Rankings', val: 'Top 3', sub: 'targeted terms', icon: Search, color: 'text-blue-400' },
    { label: 'Domain Authority', val: '+18pts', sub: 'avg. increase', icon: Award, color: 'text-yellow-400' },
    { label: 'Leads via SEO', val: '+4.2x', sub: 'qualified leads', icon: Target, color: 'text-pink-400' },
  ],
  'social-media-marketing': [
    { label: 'Follower Growth', val: '+210%', sub: 'in 3 months', icon: Users, color: 'text-pink-400' },
    { label: 'Engagement Rate', val: '8.4%', sub: 'avg. per post', icon: Heart, color: 'text-red-400' },
    { label: 'Brand Reach', val: '+5.6x', sub: 'vs. baseline', icon: Eye, color: 'text-blue-400' },
    { label: 'Social Revenue', val: '+180%', sub: 'attributed sales', icon: DollarSign, color: 'text-green-400' },
  ],
  'email-marketing': [
    { label: 'Open Rates', val: '42%+', sub: 'vs. 21% industry avg', icon: Mail, color: 'text-blue-400' },
    { label: 'ROI Delivered', val: '$38:1', sub: 'per $ invested', icon: DollarSign, color: 'text-green-400' },
    { label: 'List Growth', val: '+3.1x', sub: 'in 6 months', icon: TrendingUp, color: 'text-purple-400' },
    { label: 'Revenue from Email', val: '22%', sub: 'of total revenue', icon: Percent, color: 'text-yellow-400' },
  ],
  'brand-identity-design': [
    { label: 'Brand Recall', val: '+85%', sub: 'after rebrand', icon: Star, color: 'text-yellow-400' },
    { label: 'Premium Pricing', val: '+30%', sub: 'price increase enabled', icon: DollarSign, color: 'text-green-400' },
    { label: 'Trust Score', val: '9.2/10', sub: 'customer surveys', icon: Shield, color: 'text-blue-400' },
    { label: 'Time to Recognise', val: '< 3s', sub: 'brand recognition', icon: Clock, color: 'text-pink-400' },
  ],
};

const defaultMetrics = [
  { label: 'Client Satisfaction', val: '98%', sub: 'retention rate', icon: Star, color: 'text-yellow-400' },
  { label: 'Avg. ROI', val: '4.2x', sub: 'on investment', icon: TrendingUp, color: 'text-green-400' },
  { label: 'Projects Delivered', val: '100+', sub: 'and counting', icon: Rocket, color: 'text-blue-400' },
  { label: 'Revenue Generated', val: '$2M+', sub: 'for clients', icon: DollarSign, color: 'text-purple-400' },
];

/* ── Why Astra Nexora data ────────────────────────────────────── */
const whyUs = [
  { icon: Target, title: 'Conversion-Focused', desc: 'Every decision is made to move the needle — more leads, more sales, more growth.' },
  { icon: Award, title: 'Premium Design Quality', desc: 'We refuse mediocrity. Every deliverable is crafted to world-class agency standards.' },
  { icon: Search, title: 'SEO-Ready by Default', desc: 'All our work is built with discoverability baked in from day one.' },
  { icon: Cpu, title: 'Performance-Driven', desc: 'Fast load times, clean code, optimized assets — speed is a feature, not an afterthought.' },
  { icon: Rocket, title: 'Scalable Solutions', desc: 'We build for where you\'re going, not just where you are right now.' },
];

/* ── Scroll reveal hook ──────────────────────────────────────── */
function useReveal(threshold = 0.1) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

/* ── Main component ──────────────────────────────────────────── */
export default function ServicePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const service = services.find(s => s.id === id);

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  if (!service) {
    return (
      <div className="min-h-screen bg-black-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/50 mb-4">Service not found</p>
          <Link to="/" className="btn-primary inline-flex">Go Home</Link>
        </div>
      </div>
    );
  }

  const Icon = iconMap[service.icon] || Zap;
  const HeroVisual = serviceVisuals[service.id] || (() => <GenericVisual icon={Icon} gradient="from-blue-600 to-cyan-500" />);
  const metrics = serviceMetrics[service.id] || defaultMetrics;

  const deliverSection = useReveal();
  const processSection = useReveal();
  const whySection = useReveal();
  const metricsSection = useReveal();

  return (
    <div className="min-h-screen bg-black-950 text-white overflow-x-hidden">

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
        {/* Animated background layers */}
        <div className="absolute inset-0 bg-black-950" />
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(0,102,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,102,255,0.04) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute inset-0 aurora-bg opacity-40" />

        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-15 blur-3xl animate-float" style={{ background: 'radial-gradient(circle, #0066FF, transparent)' }} />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, #06b6d4, transparent)', animation: 'float 6s ease-in-out infinite reverse' }} />
        <div className="absolute top-1/2 left-1/2 w-48 h-48 rounded-full opacity-8 blur-2xl" style={{ background: 'radial-gradient(circle, #3b82f6, transparent)', animation: 'float 8s ease-in-out infinite' }} />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="absolute w-1 h-1 rounded-full bg-blue-400/30 animate-float"
              style={{ left: `${(i * 23 + 7) % 100}%`, top: `${(i * 17 + 13) % 100}%`, animationDelay: `${i * 0.4}s`, animationDuration: `${4 + (i % 4)}s` }} />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 w-full">
          {/* Back button - clearly separated from content */}
          <div className="mb-8">
            <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Services
            </button>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Content */}
            <div>
              {/* Service icon and label - clearly below back button */}
              <div className="inline-flex items-center gap-3 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <Icon className="w-7 h-7 text-electric" />
                </div>
                <div className="h-px w-12 bg-gradient-to-r from-blue-500 to-transparent" />
                <span className="text-xs text-blue-400 uppercase tracking-widest font-semibold">Service</span>
              </div>

              <h1 className="font-display font-bold text-5xl md:text-6xl xl:text-7xl text-white leading-[1.05] mb-6">
                {service.hero.split(' ').slice(0, -1).join(' ')}{' '}
                <span className="text-gradient-blue">{service.hero.split(' ').slice(-1)}</span>
              </h1>

              <p className="text-white/60 text-xl leading-relaxed mb-10 max-w-lg">{service.description}</p>

              <div className="flex flex-wrap gap-4">
                <a href="/#contact" className="btn-primary text-base px-8 py-3.5">
                  <span className="relative z-10 flex items-center gap-2">
                    Start Your Project <ArrowRight className="w-5 h-5" />
                  </span>
                </a>
                <a href="mailto:info.astranexora@gmail.com" className="btn-outline text-base px-8 py-3.5">
                  Book Free Consultation
                </a>
              </div>

              {/* Quick trust signals */}
              <div className="flex items-center gap-6 mt-10 pt-8 border-t border-white/5">
                {[{ label: '48hr', sub: 'Response Time' }, { label: '100+', sub: 'Projects Done' }, { label: '98%', sub: 'Client Satisfaction' }].map(({ label, sub }) => (
                  <div key={sub}>
                    <div className="text-lg font-bold text-white">{label}</div>
                    <div className="text-xs text-white/40">{sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Visual */}
            <div className="relative hidden lg:block">
              <div className="relative bg-gray-900/40 backdrop-blur-xl rounded-3xl p-8 border border-blue-500/20 shadow-2xl shadow-blue-500/5" style={{ minHeight: 380 }}>
                {/* Glow border effect */}
                <div className="absolute inset-0 rounded-3xl opacity-20 blur-xl" style={{ background: 'linear-gradient(135deg, #0066FF, transparent, #06b6d4)' }} />
                <HeroVisual />
              </div>
              {/* Corner accents */}
              <div className="absolute -top-3 -right-3 w-12 h-12 border-t-2 border-r-2 border-blue-500/40 rounded-tr-2xl" />
              <div className="absolute -bottom-3 -left-3 w-12 h-12 border-b-2 border-l-2 border-blue-500/40 rounded-bl-2xl" />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      </section>

      {/* ── WHAT WE DELIVER ───────────────────────────────────── */}
      <section className="py-28 bg-black-900 relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-10" />
        <div ref={deliverSection.ref} className="relative z-10 max-w-7xl mx-auto px-6">
          <div className={`text-center mb-16 transition-all duration-700 ${deliverSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="section-label justify-center mb-4">
              <span className="w-6 h-px bg-electric" />
              <span>Deliverables</span>
              <span className="w-6 h-px bg-electric" />
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
              What We <span className="text-gradient-blue">Deliver</span>
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">Concrete deliverables engineered to drive results — not vague promises.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {service.features.map((feature, i) => (
              <div
                key={feature}
                className={`group relative glass-blue rounded-2xl p-6 border border-blue-500/15 hover:border-blue-500/40 hover:-translate-y-1 transition-all duration-300 cursor-default ${deliverSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(135deg, rgba(0,102,255,0.05), transparent)' }} />
                <div className="flex items-start gap-4 relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/30 transition-colors">
                    <CheckCircle className="w-5 h-5 text-electric" />
                  </div>
                  <div>
                    <p className="text-white/80 text-sm leading-relaxed font-medium">{feature}</p>
                  </div>
                </div>
                {/* Glow on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(90deg, transparent, #0066FF, transparent)' }} />
              </div>
            ))}
          </div>

          {/* Benefits below */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {service.benefits.map((b, i) => (
              <div
                key={b.title}
                className={`group glass rounded-2xl p-7 border border-white/5 hover:border-blue-500/30 hover:-translate-y-1 transition-all duration-300 ${deliverSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${(service.features.length + i) * 80}ms` }}
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                  <span className="text-xs font-bold text-electric">0{i + 1}</span>
                </div>
                <h4 className="font-display font-bold text-white mb-2">{b.title}</h4>
                <p className="text-sm text-white/50 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR PROCESS ───────────────────────────────────────── */}
      <section className="py-28 bg-black-950 relative overflow-hidden">
        <div className="absolute inset-0 mesh-bg opacity-15" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

        <div ref={processSection.ref} className="relative z-10 max-w-7xl mx-auto px-6">
          <div className={`text-center mb-16 transition-all duration-700 ${processSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="section-label justify-center mb-4">
              <span className="w-6 h-px bg-electric" />
              <span>Process</span>
              <span className="w-6 h-px bg-electric" />
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
              Our <span className="text-gradient-blue">Proven Process</span>
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">A rigorous methodology refined across 100+ projects to deliver consistent, exceptional results.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process.map((step, i) => (
              <div
                key={step.step}
                className={`relative group transition-all duration-700 ${processSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                {/* Connector line */}
                {i < service.process.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-px z-0" style={{ background: 'linear-gradient(90deg, rgba(0,102,255,0.4), transparent)', width: 'calc(100% - 2rem)', left: 'calc(100% - 1rem)' }} />
                )}
                <div className="glass-blue rounded-2xl p-7 border border-blue-500/15 hover:border-blue-500/40 hover:-translate-y-1 transition-all duration-300 h-full relative z-10 overflow-hidden">
                  <div className="absolute top-0 right-0 text-6xl font-black text-blue-500/5 leading-none select-none pr-3 pt-1">{step.step}</div>
                  {/* Step number badge */}
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center mb-5 shadow-lg shadow-blue-500/20">
                    <span className="text-xs font-bold text-white">{step.step}</span>
                  </div>
                  <h3 className="font-display font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{step.desc}</p>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(90deg, transparent, #0066FF, transparent)' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY ASTRA NEXORA ──────────────────────────────────── */}
      <section className="py-28 bg-black-900 relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-10" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

        <div ref={whySection.ref} className="relative z-10 max-w-7xl mx-auto px-6">
          <div className={`text-center mb-16 transition-all duration-700 ${whySection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="section-label justify-center mb-4">
              <span className="w-6 h-px bg-electric" />
              <span>Why Us</span>
              <span className="w-6 h-px bg-electric" />
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
              Why <span className="text-gradient-blue">Astra Nexora</span>
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">We're not just an agency. We're a growth partner obsessed with your results.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-5">
            {whyUs.map(({ icon: WIcon, title, desc }, i) => (
              <div
                key={title}
                className={`group glass-blue rounded-2xl p-6 border border-blue-500/15 hover:border-blue-500/40 hover:-translate-y-2 transition-all duration-300 text-center ${whySection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/25 group-hover:scale-110 transition-all duration-300">
                  <WIcon className="w-6 h-6 text-electric" />
                </div>
                <h4 className="font-display font-bold text-white text-sm mb-2">{title}</h4>
                <p className="text-xs text-white/45 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPECTED RESULTS ──────────────────────────────────── */}
      <section className="py-28 bg-black-950 relative overflow-hidden">
        <div className="absolute inset-0 aurora-bg opacity-20" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

        <div ref={metricsSection.ref} className="relative z-10 max-w-7xl mx-auto px-6">
          <div className={`text-center mb-16 transition-all duration-700 ${metricsSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="section-label justify-center mb-4">
              <span className="w-6 h-px bg-electric" />
              <span>Results</span>
              <span className="w-6 h-px bg-electric" />
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
              Expected <span className="text-gradient-blue">Results</span>
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">Real metrics from real clients. What you can expect when we work together.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {metrics.map(({ label, val, sub, icon: MIcon, color }, i) => (
              <div
                key={label}
                className={`group relative glass rounded-2xl p-8 border border-white/5 hover:border-blue-500/30 hover:-translate-y-1 transition-all duration-300 overflow-hidden ${metricsSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(135deg, rgba(0,102,255,0.04), transparent)' }} />
                <MIcon className={`w-8 h-8 ${color} mb-5 relative z-10`} />
                <div className={`font-display font-black text-4xl ${color} mb-1 relative z-10`}>{val}</div>
                <div className="font-display font-semibold text-white text-sm mb-1 relative z-10">{label}</div>
                <div className="text-xs text-white/40 relative z-10">{sub}</div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(90deg, transparent, #0066FF, transparent)' }} />
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div className="max-w-3xl mx-auto">
            <h3 className="font-display font-bold text-2xl text-white text-center mb-8">Common <span className="text-gradient-blue">Questions</span></h3>
            <div className="space-y-3">
              {service.faqs.map((faq, i) => (
                <details key={i} className="group glass rounded-2xl overflow-hidden border border-white/5 hover:border-blue-500/30 transition-all duration-300">
                  <summary className="p-5 cursor-pointer flex items-center justify-between text-white/80 hover:text-white font-display font-medium text-sm list-none">
                    {faq.q}
                    <ChevronRight className="w-4 h-4 text-electric flex-shrink-0 group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="px-5 pb-5 text-white/50 text-sm leading-relaxed border-t border-white/5 pt-4">{faq.a}</div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────── */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-black-900" />
        <div className="absolute inset-0 aurora-bg opacity-50" />
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(0,102,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,102,255,0.04) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] opacity-20 blur-3xl" style={{ background: 'radial-gradient(ellipse, #0066FF, transparent)' }} />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <div className="inline-flex w-16 h-16 rounded-2xl bg-blue-500/15 border border-blue-500/30 items-center justify-center mb-8 mx-auto shadow-lg shadow-blue-500/20">
            <Rocket className="w-8 h-8 text-electric" />
          </div>

          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-5 leading-tight">
            Ready to Grow Your
            <br />
            <span className="text-gradient-blue">Business?</span>
          </h2>
          <p className="text-white/55 text-xl mb-10 max-w-lg mx-auto leading-relaxed">
            Let's build a powerful digital presence that drives measurable results. No fluff — just strategy, execution and growth.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/#contact" className="btn-primary text-base px-10 py-4">
              <span className="relative z-10 flex items-center gap-2">
                Start Your Project <ArrowRight className="w-5 h-5" />
              </span>
            </a>
            <a href="mailto:info.astranexora@gmail.com" className="btn-outline text-base px-10 py-4">
              <span className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Book a Free Consultation
              </span>
            </a>
          </div>

          <p className="text-white/25 text-sm mt-8">No commitment required. We respond within 24 hours.</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
