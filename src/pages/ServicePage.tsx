import { useEffect, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { services } from '../data/services';
import {
  Monitor, Globe, Layout, RefreshCw, TrendingUp, Share2,
  Mail, PenTool, Layers, User, Presentation, Zap,
  ArrowRight, ArrowLeft, CheckCircle, ChevronRight,
  Star, Search, Target, Rocket, Shield,
  Activity, Cpu, Award, Clock, TrendingDown,
  MessageCircle, Heart, Eye, Play, FileText, Palette,
  Users, DollarSign, Percent,
} from 'lucide-react';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

const iconMap: Record<string, React.ElementType> = {
  Monitor, Globe, Layout, RefreshCw, TrendingUp, Share2,
  Mail, PenTool, Layers, User, Cpu, Zap,
};

/* ── Service-specific hero visual mockups ─────────────────────── */
function WebsiteDevVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Browser window */}
      <div className="w-full max-w-sm bg-white rounded-2xl border border-brand-900/20 shadow-xl shadow-brand-900/5 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 bg-mist border-b border-ink-200">
          <div className="w-3 h-3 rounded-full bg-red-400/70" />
          <div className="w-3 h-3 rounded-full bg-amber-400/70" />
          <div className="w-3 h-3 rounded-full bg-green-400/70" />
          <div className="flex-1 mx-3 bg-ink-100 rounded-full px-3 py-1 text-xs text-ink-300 font-mono">https://yoursite.com</div>
        </div>
        <div className="p-4 space-y-3">
          <div className="h-24 rounded-xl bg-gradient-to-br from-brand-900/15 to-brand-950/10 border border-brand-900/20 flex items-center justify-center">
            <div className="text-center">
              <div className="w-8 h-1 bg-brand-900/50 rounded mx-auto mb-2" />
              <div className="w-16 h-1 bg-ink-200 rounded mx-auto mb-1" />
              <div className="w-12 h-1 bg-ink-100 rounded mx-auto" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[1,2,3].map(i => (
              <div key={i} className="h-12 rounded-lg bg-mist border border-ink-200 flex items-center justify-center">
                <div className="w-4 h-4 rounded bg-brand-900/20" />
              </div>
            ))}
          </div>
          <div className="h-2 bg-ink-100 rounded-full overflow-hidden">
            <div className="h-full w-3/4 bg-gradient-to-r from-brand-900 to-brand-500 rounded-full" />
          </div>
        </div>
      </div>
      {/* Floating metric card */}
      <div className="absolute -bottom-2 -right-2 bg-brand-900/90 backdrop-blur-xl rounded-xl px-4 py-2.5 border border-brand-900/30 shadow-lg">
        <div className="text-xs text-white mb-0.5">PageSpeed Score</div>
        <div className="text-xl font-bold text-white">98 <span className="text-green-300 text-sm">+12</span></div>
      </div>
      <div className="absolute -top-2 -left-2 bg-white/90 backdrop-blur-xl rounded-xl px-4 py-2.5 border border-ink-200 shadow-lg">
        <div className="text-xs text-ink-400 mb-0.5">Conversion Rate</div>
        <div className="text-xl font-bold text-ink-900">4.8% <span className="text-green-600 text-sm">↑</span></div>
      </div>
    </div>
  );
}

function SEOVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="w-full max-w-sm space-y-3">
        {/* Ranking chart */}
        <div className="bg-white rounded-2xl border border-brand-900/20 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-ink-500 font-medium">Keyword Rankings</span>
            <span className="text-xs text-green-600 font-bold">+47 positions</span>
          </div>
          <div className="flex items-end gap-1.5 h-20">
            {[30, 55, 45, 70, 60, 85, 80, 95].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, background: i > 4 ? 'linear-gradient(to top, #0F1B3D, #3B4A78)' : 'rgba(15,27,61,0.15)' }} />
            ))}
          </div>
        </div>
        {/* Search results mockup */}
        {['#1 Brand Strategy Guide', '#2 Digital Marketing Tips', '#3 SEO Best Practices'].map((item, i) => (
          <div key={i} className={`rounded-xl px-4 py-3 flex items-center gap-3 border transition-all ${i === 0 ? 'bg-brand-900/10 border-brand-900/30' : 'bg-mist border-ink-200'}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${i === 0 ? 'bg-brand-900 text-white' : 'bg-ink-100 text-ink-400'}`}>{i + 1}</div>
            <span className={`text-sm ${i === 0 ? 'text-ink-900 font-medium' : 'text-ink-400'}`}>{item}</span>
          </div>
        ))}
      </div>
      <div className="absolute -top-2 -right-2 bg-green-600/90 rounded-xl px-3 py-2 border border-green-400/30">
        <div className="text-xs text-white mb-0.5">Organic Traffic</div>
        <div className="text-lg font-bold text-white">+340%</div>
      </div>
    </div>
  );
}

function SocialMediaVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="w-full max-w-sm space-y-3">
        <div className="bg-white rounded-2xl border border-brand-900/20 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-ink-900">Engagement Dashboard</span>
            <span className="text-xs text-brand-900">This Month</span>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[{ icon: Heart, label: 'Likes', val: '12.4K', c: 'text-pink-400' }, { icon: MessageCircle, label: 'Comments', val: '1.8K', c: 'text-brand-900' }, { icon: Eye, label: 'Reach', val: '84K', c: 'text-purple-400' }].map(({ icon: Icon, label, val, c }) => (
              <div key={label} className="bg-mist rounded-xl p-3 text-center">
                <Icon className={`w-4 h-4 mx-auto mb-1 ${c}`} />
                <div className="text-sm font-bold text-ink-900">{val}</div>
                <div className="text-xs text-ink-400">{label}</div>
              </div>
            ))}
          </div>
          <div className="h-1.5 bg-ink-100 rounded-full overflow-hidden">
            <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-pink-500 to-brand-900" />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-ink-300">Goal Progress</span>
            <span className="text-xs text-brand-900">80%</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[{ name: 'Instagram', col: 'from-pink-500/15 to-orange-500/15', b: 'border-pink-500/20' }, { name: 'LinkedIn', col: 'from-brand-900/15 to-brand-950/15', b: 'border-brand-900/20' }].map(({ name, col, b }) => (
            <div key={name} className={`rounded-xl p-3 bg-gradient-to-br ${col} border ${b}`}>
              <div className="text-xs text-ink-500 mb-1">{name}</div>
              <div className="text-sm font-bold text-ink-900">↑ 28%</div>
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
        <div className="bg-white rounded-2xl border border-brand-900/20 p-5 shadow-sm">
          <div className="text-xs text-ink-400 mb-3 uppercase tracking-widest">Brand Identity System</div>
          {/* Logo area */}
          <div className="h-20 rounded-xl bg-gradient-to-br from-brand-900/10 to-brand-950/5 border border-brand-900/20 flex items-center justify-center mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-900 to-brand-500 flex items-center justify-center">
                <Star className="w-5 h-5 text-white" fill="white" />
              </div>
              <div>
                <div className="w-16 h-2 bg-ink-300 rounded mb-1" />
                <div className="w-10 h-1 bg-ink-200 rounded" />
              </div>
            </div>
          </div>
          {/* Color palette */}
          <div className="flex gap-2 mb-3">
            {['#0F1B3D', '#1a1a2e', '#3B4A78', '#0ea5e9', '#f8fafc', '#1e293b'].map(c => (
              <div key={c} className="flex-1 h-8 rounded-lg" style={{ backgroundColor: c }} />
            ))}
          </div>
          {/* Typography */}
          <div className="space-y-1">
            <div className="text-sm font-bold text-ink-900" style={{ fontFamily: 'serif' }}>Aa Heading Font</div>
            <div className="text-xs text-ink-400">Body Text — Clean & Professional</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {['Business Card', 'Letterhead', 'Favicon'].map(item => (
            <div key={item} className="rounded-xl bg-mist border border-ink-200 p-2 text-center">
              <div className="w-6 h-6 rounded-lg bg-brand-900/10 mx-auto mb-1 flex items-center justify-center">
                <Palette className="w-3 h-3 text-brand-900" />
              </div>
              <div className="text-xs text-ink-400">{item}</div>
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
        <div className="bg-white rounded-2xl border border-brand-900/20 p-4 shadow-sm">
          <div className="text-xs text-ink-400 mb-3 uppercase tracking-widest">Content Calendar</div>
          <div className="grid grid-cols-7 gap-1 mb-3">
            {['M','T','W','T','F','S','S'].map((d, i) => (
              <div key={i} className="text-center text-xs text-ink-300 pb-1">{d}</div>
            ))}
            {Array.from({ length: 28 }, (_, i) => (
              <div key={i} className={`rounded h-6 flex items-center justify-center text-xs ${[2,5,9,13,16,20,23].includes(i) ? 'bg-brand-900/30 text-brand-900 font-bold' : 'bg-mist text-ink-300'}`}>
                {i + 1}
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[{ icon: FileText, label: 'Blog Posts', val: '8/mo', c: 'text-brand-900' }, { icon: Play, label: 'Videos', val: '4/mo', c: 'text-red-400' }, { icon: PenTool, label: 'Graphics', val: '12/mo', c: 'text-purple-400' }, { icon: Mail, label: 'Newsletters', val: '4/mo', c: 'text-green-600' }].map(({ icon: Icon, label, val, c }) => (
            <div key={label} className="rounded-xl bg-mist border border-ink-200 p-3 flex items-center gap-2">
              <Icon className={`w-4 h-4 ${c} flex-shrink-0`} />
              <div>
                <div className="text-xs text-ink-400">{label}</div>
                <div className="text-sm font-bold text-ink-900">{val}</div>
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
        <div className="bg-white rounded-2xl border border-brand-900/20 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-ink-500">Email Performance</span>
            <span className="text-xs text-green-600">Live</span>
          </div>
          {[{ label: 'Open Rate', val: 47, color: 'from-brand-900 to-brand-500' }, { label: 'Click Rate', val: 12, color: 'from-brand-950 to-brand-900' }, { label: 'Conversion', val: 6, color: 'from-green-500 to-emerald-400' }].map(({ label, val, color }) => (
            <div key={label} className="mb-3">
              <div className="flex justify-between mb-1">
                <span className="text-xs text-ink-500">{label}</span>
                <span className="text-xs text-ink-900 font-bold">{val}%</span>
              </div>
              <div className="h-2 bg-ink-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full bg-gradient-to-r ${color}`} style={{ width: `${val * 2}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl border border-ink-200 p-4 shadow-sm">
          <div className="h-6 w-3/4 bg-ink-100 rounded mb-2" />
          <div className="h-2 w-full bg-ink-100 rounded mb-1" />
          <div className="h-2 w-4/5 bg-ink-100 rounded mb-3" />
          <div className="inline-block bg-brand-900 text-white text-xs px-4 py-1.5 rounded-full">Open Now →</div>
        </div>
      </div>
    </div>
  );
}

function GenericVisual({ icon: Icon, gradient }: { icon: React.ElementType; gradient: string }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="w-full max-w-sm space-y-3">
        <div className="bg-white rounded-2xl border border-brand-900/20 p-6 flex items-center justify-center shadow-sm">
          <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-xl`}>
            <Icon className="w-12 h-12 text-white" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[{ label: 'Avg. ROI', val: '340%' }, { label: 'Delivery', val: '< 4 wks' }, { label: 'Revisions', val: 'Unlimited' }, { label: 'Support', val: '90 days' }].map(({ label, val }) => (
            <div key={label} className="rounded-xl bg-mist border border-ink-200 p-3">
              <div className="text-xs text-ink-400 mb-1">{label}</div>
              <div className="text-sm font-bold text-ink-900">{val}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const serviceVisuals: Record<string, React.FC> = {
  'website-development': WebsiteDevVisual,
  'wordpress-development': () => <GenericVisual icon={Globe} gradient="from-brand-900 to-brand-950" />,
  'wix-development': () => <GenericVisual icon={Layout} gradient="from-brand-900 to-brand-950" />,
  'website-revamp': () => <GenericVisual icon={RefreshCw} gradient="from-orange-500 to-brand-900" />,
  'seo-optimization': SEOVisual,
  'social-media-marketing': SocialMediaVisual,
  'email-marketing': EmailVisual,
  'content-creation': ContentVisual,
  'brand-identity-design': BrandingVisual,
  'personal-branding': () => <GenericVisual icon={User} gradient="from-brand-900 to-brand-950" />,
  'presentation-design': () => <GenericVisual icon={Presentation} gradient="from-brand-900 to-brand-500" />,
  'digital-marketing-solutions': () => <GenericVisual icon={Zap} gradient="from-amber-400 to-orange-500" />,
};

/* ── Service-specific results metrics ────────────────────────── */
const serviceMetrics: Record<string, { label: string; val: string; sub: string; icon: React.ElementType; color: string }[]> = {
  'website-development': [
    { label: 'PageSpeed Score', val: '95+', sub: 'avg. after launch', icon: Activity, color: 'text-brand-900' },
    { label: 'Conversion Lift', val: '+68%', sub: 'vs. old site', icon: TrendingUp, color: 'text-green-600' },
    { label: 'Bounce Rate Drop', val: '-34%', sub: 'in 60 days', icon: TrendingDown, color: 'text-pink-400' },
    { label: 'Time on Site', val: '+2.4x', sub: 'avg. session', icon: Clock, color: 'text-purple-400' },
  ],
  'seo-optimization': [
    { label: 'Organic Traffic', val: '+340%', sub: 'in 6 months', icon: TrendingUp, color: 'text-green-600' },
    { label: 'Keyword Rankings', val: 'Top 3', sub: 'targeted terms', icon: Search, color: 'text-brand-900' },
    { label: 'Domain Authority', val: '+18pts', sub: 'avg. increase', icon: Award, color: 'text-amber-400' },
    { label: 'Leads via SEO', val: '+4.2x', sub: 'qualified leads', icon: Target, color: 'text-pink-400' },
  ],
  'social-media-marketing': [
    { label: 'Follower Growth', val: '+210%', sub: 'in 3 months', icon: Users, color: 'text-pink-400' },
    { label: 'Engagement Rate', val: '8.4%', sub: 'avg. per post', icon: Heart, color: 'text-red-400' },
    { label: 'Brand Reach', val: '+5.6x', sub: 'vs. baseline', icon: Eye, color: 'text-brand-900' },
    { label: 'Social Revenue', val: '+180%', sub: 'attributed sales', icon: DollarSign, color: 'text-green-600' },
  ],
  'email-marketing': [
    { label: 'Open Rates', val: '42%+', sub: 'vs. 21% industry avg', icon: Mail, color: 'text-brand-900' },
    { label: 'ROI Delivered', val: '$38:1', sub: 'per $ invested', icon: DollarSign, color: 'text-green-600' },
    { label: 'List Growth', val: '+3.1x', sub: 'in 6 months', icon: TrendingUp, color: 'text-purple-400' },
    { label: 'Revenue from Email', val: '22%', sub: 'of total revenue', icon: Percent, color: 'text-amber-400' },
  ],
  'brand-identity-design': [
    { label: 'Brand Recall', val: '+85%', sub: 'after rebrand', icon: Star, color: 'text-amber-400' },
    { label: 'Premium Pricing', val: '+30%', sub: 'price increase enabled', icon: DollarSign, color: 'text-green-600' },
    { label: 'Trust Score', val: '9.2/10', sub: 'customer surveys', icon: Shield, color: 'text-brand-900' },
    { label: 'Time to Recognise', val: '< 3s', sub: 'brand recognition', icon: Clock, color: 'text-pink-400' },
  ],
};

const defaultMetrics = [
  { label: 'Client Satisfaction', val: '98%', sub: 'retention rate', icon: Star, color: 'text-amber-400' },
  { label: 'Avg. ROI', val: '4.2x', sub: 'on investment', icon: TrendingUp, color: 'text-green-600' },
  { label: 'Projects Delivered', val: '100+', sub: 'and counting', icon: Rocket, color: 'text-brand-900' },
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
      <div className="min-h-screen bg-cloud flex items-center justify-center">
        <div className="text-center">
          <p className="text-ink-500 mb-4">Service not found</p>
          <Link to="/" className="btn-primary inline-flex">Go Home</Link>
        </div>
      </div>
    );
  }

  const Icon = iconMap[service.icon] || Zap;
  const HeroVisual = serviceVisuals[service.id] || (() => <GenericVisual icon={Icon} gradient="from-brand-900 to-brand-500" />);
  const metrics = serviceMetrics[service.id] || defaultMetrics;

  const deliverSection = useReveal();
  const processSection = useReveal();
  const whySection = useReveal();
  const metricsSection = useReveal();

  return (
    <div className="min-h-screen bg-cloud text-ink-900 overflow-x-hidden">

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
        {/* Animated background layers */}
        <div className="absolute inset-0 bg-cloud" />
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(15,27,61,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(15,27,61,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute inset-0 aurora-bg opacity-30" />

        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl animate-float" style={{ background: 'radial-gradient(circle, #0F1B3D, transparent)' }} />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full opacity-8 blur-3xl" style={{ background: 'radial-gradient(circle, #3B4A78, transparent)', animation: 'float 6s ease-in-out infinite reverse' }} />
        <div className="absolute top-1/2 left-1/2 w-48 h-48 rounded-full opacity-5 blur-2xl" style={{ background: 'radial-gradient(circle, #3b82f6, transparent)', animation: 'float 8s ease-in-out infinite' }} />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="absolute w-1 h-1 rounded-full bg-brand-900/20 animate-float"
              style={{ left: `${(i * 23 + 7) % 100}%`, top: `${(i * 17 + 13) % 100}%`, animationDelay: `${i * 0.4}s`, animationDuration: `${4 + (i % 4)}s` }} />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 w-full">
          {/* Back button - clearly separated from content */}
          <div className="mb-8">
            <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-ink-400 hover:text-ink-900 transition-colors text-sm group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Services
            </button>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Content */}
            <div>
              {/* Service icon and label - clearly below back button */}
              <div className="inline-flex items-center gap-3 mb-8">
                <div className="w-14 h-14 rounded-full bg-brand-900 flex items-center justify-center shadow-lg shadow-brand-900/10">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="h-px w-12 bg-gradient-to-r from-brand-900 to-transparent" />
                <span className="text-xs text-brand-900 uppercase tracking-widest font-semibold">Service</span>
              </div>

              <h1 className="font-display font-bold text-5xl md:text-6xl xl:text-7xl text-ink-900 leading-[1.05] mb-6">
                {service.hero.split(' ').slice(0, -1).join(' ')}{' '}
                <span className="text-gradient-navy">{service.hero.split(' ').slice(-1)}</span>
              </h1>

              <p className="text-ink-500 text-xl leading-relaxed mb-10 max-w-lg">{service.description}</p>

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
              <div className="flex items-center gap-6 mt-10 pt-8 border-t border-ink-200">
                {[{ label: '48hr', sub: 'Response Time' }, { label: '100+', sub: 'Projects Done' }, { label: '98%', sub: 'Client Satisfaction' }].map(({ label, sub }) => (
                  <div key={sub}>
                    <div className="text-lg font-bold text-ink-900">{label}</div>
                    <div className="text-xs text-ink-400">{sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Visual */}
            <div className="relative hidden lg:block">
              <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-brand-900/20 shadow-2xl shadow-brand-900/5" style={{ minHeight: 380 }}>
                {/* Glow border effect */}
                <div className="absolute inset-0 rounded-3xl opacity-10 blur-xl" style={{ background: 'linear-gradient(135deg, #0F1B3D, transparent, #3B4A78)' }} />
                <HeroVisual />
              </div>
              {/* Corner accents */}
              <div className="absolute -top-3 -right-3 w-12 h-12 border-t-2 border-r-2 border-brand-900/30 rounded-tr-2xl" />
              <div className="absolute -bottom-3 -left-3 w-12 h-12 border-b-2 border-l-2 border-brand-900/30 rounded-bl-2xl" />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-900/20 to-transparent" />
      </section>

      {/* ── WHAT WE DELIVER ───────────────────────────────────── */}
      <section className="py-28 bg-mist relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-10" />
        <div ref={deliverSection.ref} className="relative z-10 max-w-7xl mx-auto px-6">
          <div className={`text-center mb-16 transition-all duration-700 ${deliverSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="section-label justify-center mb-4">
              <span className="w-6 h-px bg-brand-900" />
              <span>Deliverables</span>
              <span className="w-6 h-px bg-brand-900" />
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-ink-900 mb-4">
              What We <span className="text-gradient-navy">Deliver</span>
            </h2>
            <p className="text-ink-500 text-lg max-w-xl mx-auto">Concrete deliverables engineered to drive results — not vague promises.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {service.features.map((feature, i) => (
              <div
                key={feature}
                className={`group relative glass-blue rounded-2xl p-6 border border-brand-900/15 hover:border-brand-900/40 hover:-translate-y-1 transition-all duration-300 cursor-default ${deliverSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(135deg, rgba(15,27,61,0.04), transparent)' }} />
                <div className="flex items-start gap-4 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-brand-900 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-ink-700 text-sm leading-relaxed font-medium">{feature}</p>
                  </div>
                </div>
                {/* Glow on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(90deg, transparent, #0F1B3D, transparent)' }} />
              </div>
            ))}
          </div>

          {/* Benefits below */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {service.benefits.map((b, i) => (
              <div
                key={b.title}
                className={`group glass rounded-2xl p-7 border border-ink-200 hover:border-brand-900/30 hover:-translate-y-1 transition-all duration-300 ${deliverSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${(service.features.length + i) * 80}ms` }}
              >
                <div className="w-10 h-10 rounded-full bg-brand-900 flex items-center justify-center mb-4">
                  <span className="text-xs font-bold text-white">0{i + 1}</span>
                </div>
                <h4 className="font-display font-bold text-ink-900 mb-2">{b.title}</h4>
                <p className="text-sm text-ink-500 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR PROCESS ───────────────────────────────────────── */}
      <section className="py-28 bg-cloud relative overflow-hidden">
        <div className="absolute inset-0 mesh-bg opacity-10" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-900/15 to-transparent" />

        <div ref={processSection.ref} className="relative z-10 max-w-7xl mx-auto px-6">
          <div className={`text-center mb-16 transition-all duration-700 ${processSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="section-label justify-center mb-4">
              <span className="w-6 h-px bg-brand-900" />
              <span>Process</span>
              <span className="w-6 h-px bg-brand-900" />
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-ink-900 mb-4">
              Our <span className="text-gradient-navy">Proven Process</span>
            </h2>
            <p className="text-ink-500 text-lg max-w-xl mx-auto">A rigorous methodology refined across 100+ projects to deliver consistent, exceptional results.</p>
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
                  <div className="hidden lg:block absolute top-10 left-full w-full h-px z-0" style={{ background: 'linear-gradient(90deg, rgba(15,27,61,0.3), transparent)', width: 'calc(100% - 2rem)', left: 'calc(100% - 1rem)' }} />
                )}
                <div className="glass-blue rounded-2xl p-7 border border-brand-900/15 hover:border-brand-900/40 hover:-translate-y-1 transition-all duration-300 h-full relative z-10 overflow-hidden">
                  <div className="absolute top-0 right-0 text-6xl font-black text-brand-900/5 leading-none select-none pr-3 pt-1">{step.step}</div>
                  {/* Step number badge */}
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-900 to-brand-950 flex items-center justify-center mb-5 shadow-lg shadow-brand-900/10">
                    <span className="text-xs font-bold text-white">{step.step}</span>
                  </div>
                  <h3 className="font-display font-bold text-ink-900 mb-3">{step.title}</h3>
                  <p className="text-sm text-ink-500 leading-relaxed">{step.desc}</p>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(90deg, transparent, #0F1B3D, transparent)' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY ASTRA NEXORA ──────────────────────────────────── */}
      <section className="py-28 bg-mist relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-10" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-900/15 to-transparent" />

        <div ref={whySection.ref} className="relative z-10 max-w-7xl mx-auto px-6">
          <div className={`text-center mb-16 transition-all duration-700 ${whySection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="section-label justify-center mb-4">
              <span className="w-6 h-px bg-brand-900" />
              <span>Why Us</span>
              <span className="w-6 h-px bg-brand-900" />
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-ink-900 mb-4">
              Why <span className="text-gradient-navy">Astra Nexora</span>
            </h2>
            <p className="text-ink-500 text-lg max-w-xl mx-auto">We're not just an agency. We're a growth partner obsessed with your results.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-5">
            {whyUs.map(({ icon: WIcon, title, desc }, i) => (
              <div
                key={title}
                className={`group glass-blue rounded-2xl p-6 border border-brand-900/15 hover:border-brand-900/40 hover:-translate-y-2 transition-all duration-300 text-center ${whySection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-12 h-12 rounded-full bg-brand-900 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300">
                  <WIcon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-display font-bold text-ink-900 text-sm mb-2">{title}</h4>
                <p className="text-xs text-ink-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPECTED RESULTS ──────────────────────────────────── */}
      <section className="py-28 bg-cloud relative overflow-hidden">
        <div className="absolute inset-0 aurora-bg opacity-15" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-900/15 to-transparent" />

        <div ref={metricsSection.ref} className="relative z-10 max-w-7xl mx-auto px-6">
          <div className={`text-center mb-16 transition-all duration-700 ${metricsSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="section-label justify-center mb-4">
              <span className="w-6 h-px bg-brand-900" />
              <span>Results</span>
              <span className="w-6 h-px bg-brand-900" />
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-ink-900 mb-4">
              Expected <span className="text-gradient-navy">Results</span>
            </h2>
            <p className="text-ink-500 text-lg max-w-xl mx-auto">Real metrics from real clients. What you can expect when we work together.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {metrics.map(({ label, val, sub, icon: MIcon, color }, i) => (
              <div
                key={label}
                className={`group relative glass rounded-2xl p-8 border border-ink-200 hover:border-brand-900/30 hover:-translate-y-1 transition-all duration-300 overflow-hidden ${metricsSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(135deg, rgba(15,27,61,0.03), transparent)' }} />
                <MIcon className={`w-8 h-8 ${color} mb-5 relative z-10`} />
                <div className={`font-display font-black text-4xl ${color} mb-1 relative z-10`}>{val}</div>
                <div className="font-display font-semibold text-ink-900 text-sm mb-1 relative z-10">{label}</div>
                <div className="text-xs text-ink-400 relative z-10">{sub}</div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(90deg, transparent, #0F1B3D, transparent)' }} />
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div className="max-w-3xl mx-auto">
            <h3 className="font-display font-bold text-2xl text-ink-900 text-center mb-8">Common <span className="text-gradient-navy">Questions</span></h3>
            <div className="space-y-3">
              {service.faqs.map((faq, i) => (
                <details key={i} className="group glass rounded-2xl overflow-hidden border border-ink-200 hover:border-brand-900/30 transition-all duration-300">
                  <summary className="p-5 cursor-pointer flex items-center justify-between text-ink-700 hover:text-ink-900 font-display font-medium text-sm list-none">
                    {faq.q}
                    <ChevronRight className="w-4 h-4 text-brand-900 flex-shrink-0 group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="px-5 pb-5 text-ink-500 text-sm leading-relaxed border-t border-ink-200 pt-4">{faq.a}</div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────── */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-mist" />
        <div className="absolute inset-0 aurora-bg opacity-40" />
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(15,27,61,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(15,27,61,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] opacity-10 blur-3xl" style={{ background: 'radial-gradient(ellipse, #0F1B3D, transparent)' }} />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <div className="inline-flex w-16 h-16 rounded-full bg-brand-900 items-center justify-center mb-8 mx-auto shadow-lg shadow-brand-900/10">
            <Rocket className="w-8 h-8 text-white" />
          </div>

          <h2 className="font-display font-bold text-4xl md:text-5xl text-ink-900 mb-5 leading-tight">
            Ready to Grow Your
            <br />
            <span className="text-gradient-navy">Business?</span>
          </h2>
          <p className="text-ink-500 text-xl mb-10 max-w-lg mx-auto leading-relaxed">
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

          <p className="text-ink-300 text-sm mt-8">No commitment required. We respond within 24 hours.</p>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
