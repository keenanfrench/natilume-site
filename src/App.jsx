import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Menu, X, ArrowUpRight, ArrowRight, Phone, Mail, MapPin,
  Aperture, Clapperboard, Music2, Camera, Heart, Upload,
  CheckCircle2, AtSign, Trash2,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

const SERVICES = [
  { icon: Clapperboard, title: 'Commercial & Brand Film', text: 'Ads, product films, and brand stories shot for broadcast, web, and social.' },
  { icon: Music2, title: 'Music Videos', text: 'Performance, narrative, or one-take — directed and shot to match the track.' },
  { icon: Camera, title: 'Portrait & Headshot Photography', text: 'Studio or on-location portraits, headshots, and personal branding sets.' },
  { icon: Heart, title: 'Weddings & Events', text: 'Full-day coverage with a same-week highlight reel and a full film delivered after.' },
]

function Logo({ dark }) {
  return (
    <a href="#home" className="flex items-center gap-2.5 group shrink-0">
      <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-primary">
        <Aperture className="h-5 w-5 text-background" strokeWidth={2.3} />
        <span className="absolute inset-0 rounded-full ring-2 ring-primary/30 group-hover:ring-primary/50 transition" />
      </span>
      <span
        className={`font-wordmark text-lg ${dark ? 'text-ink' : 'text-white'} transition-colors`}
        style={{ letterSpacing: '0.02em' }}
      >
        NATILUME
      </span>
    </a>
  )
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl rounded-full px-4 sm:px-6 py-2.5 transition-all duration-300 ${
          scrolled ? 'glass' : ''
        }`}
      >
        <div className="flex items-center justify-between">
          <Logo dark={scrolled} />
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`text-sm font-medium lift-on-hover ${scrolled ? 'text-ink/80 hover:text-ink' : 'text-white/85 hover:text-white'}`}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="hidden lg:block">
            <a
              href="#contact"
              className="magnetic-btn inline-flex items-center gap-2 bg-primary text-background px-5 py-2.5 rounded-full font-semibold text-sm shadow-lg shadow-primary/30"
            >
              Start a project <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <button
            onClick={() => setOpen(true)}
            className={`lg:hidden p-2 rounded-full ${scrolled ? 'text-ink' : 'text-white'}`}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] bg-deep/95 backdrop-blur-2xl flex flex-col">
          <div className="flex items-center justify-between px-6 py-5">
            <Logo dark={false} />
            <button onClick={() => setOpen(false)} className="p-2 text-white" aria-label="Close menu">
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 flex flex-col items-start justify-center gap-6 px-8">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-4xl text-white tracking-tight"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="magnetic-btn mt-4 inline-flex items-center gap-2 bg-primary text-background px-6 py-3 rounded-full font-semibold"
            >
              Start a project <ArrowUpRight className="h-4 w-4" />
            </a>
          </nav>
        </div>
      )}
    </>
  )
}

function Hero() {
  const ref = useRef(null)
  useEffect(() => {
    if (prefersReducedMotion) return
    const ctx = gsap.context(() => {
      gsap.from('.hero-line-1', { y: 40, opacity: 0, duration: 1, delay: 0.3, ease: 'power3.out' })
      gsap.from('.hero-line-2', { y: 60, opacity: 0, duration: 1.2, delay: 0.5, ease: 'power3.out' })
      gsap.from('.hero-cta, .hero-meta', { y: 24, opacity: 0, duration: 0.8, delay: 0.8, stagger: 0.12, ease: 'power3.out' })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="home" ref={ref} className="relative min-h-[100dvh] overflow-hidden bg-deep">
      <img
        src="https://images.unsplash.com/photo-1625690303837-654c9666d2d0?w=2400&q=80&auto=format&fit=crop"
        alt="Cinematographer filming on a tripod, lit in warm and cool light"
        className="absolute inset-0 h-full w-full object-cover brightness-[0.5]"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-deep/85 via-deep/45 to-deep/75" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-deep to-transparent" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-deep/60 to-transparent" />

      <div className="absolute top-28 right-8 sm:right-16 hidden sm:block pointer-events-none">
        {[0, 1.2, 2.1].map((delay, i) => (
          <span
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              width: 5 + i * 2,
              height: 12 + i * 5,
              right: i * 26,
              top: i * 34,
              background: i % 2 === 0
                ? 'linear-gradient(180deg,#e6a562,#e0913f)'
                : 'linear-gradient(180deg,#6f8798,#5b6f7d)',
              filter: 'blur(0.3px)',
              opacity: 0.8,
              animationDelay: `${delay}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-32 pb-20 min-h-[100dvh] flex flex-col justify-end">
        <p className="hero-meta font-mono text-xs uppercase tracking-[0.25em] text-white/70 mb-6">
          Melbourne, Australia — Photography &amp; Film Studio
        </p>
        <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-semibold text-white tracking-tighter leading-[0.95] max-w-5xl text-balance">
          <span className="hero-line-1 block">Photography and film,</span>
          <span className="hero-line-2 block font-serif italic font-medium">built on light.</span>
        </h1>
        <p className="hero-meta mt-8 max-w-xl text-white/70 text-base sm:text-lg leading-relaxed">
          Natilume is a Melbourne production studio for commercial and brand film, music videos, portraits,
          and weddings — shot, graded, and delivered with the same care from first frame to last.
        </p>
        <div className="hero-cta mt-10 flex flex-wrap gap-3">
          <a
            href="#contact"
            className="magnetic-btn inline-flex items-center gap-2 bg-primary text-background px-6 py-3 rounded-full font-semibold shadow-lg shadow-primary/30"
          >
            Start a project <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href="tel:+61408649887"
            className="magnetic-btn inline-flex items-center gap-2 glass-dark text-white px-6 py-3 rounded-full font-semibold border border-white/15"
          >
            <Phone className="h-4 w-4" /> 0408 649 887
          </a>
        </div>
      </div>
    </section>
  )
}

/* ---------- Feature 1: stacked shuffler (Commercial & Brand Film) ---------- */
function FormatShuffler() {
  const FRAMES = [
    { label: 'BROADCAST SPOT', ratio: '16 : 9', grad: 'linear-gradient(135deg,#e0913f22,#12101100)' },
    { label: 'SOCIAL CUTDOWN', ratio: '9 : 16', grad: 'linear-gradient(135deg,#6f879822,#12101100)' },
    { label: 'TEASER · 60s', ratio: '1 : 1', grad: 'linear-gradient(135deg,#e6a56222,#12101100)' },
  ]
  const [front, setFront] = useState(0)
  useEffect(() => {
    if (prefersReducedMotion) return
    const id = setInterval(() => setFront((f) => (f + 1) % FRAMES.length), 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative h-44 rounded-3xl overflow-hidden bg-deep border border-white/10">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 30% 20%, rgba(224,145,63,0.18), transparent 60%)' }} />
      <div className="relative h-full w-full flex items-center justify-center">
        {FRAMES.map((f, i) => {
          const order = (i - front + FRAMES.length) % FRAMES.length
          return (
            <div
              key={f.label}
              className="absolute w-32 h-24 rounded-2xl border border-white/15 flex flex-col items-center justify-center gap-1 transition-all duration-700 ease-out"
              style={{
                background: f.grad,
                transform:
                  order === 0
                    ? 'translateY(0) scale(1)'
                    : order === 1
                    ? 'translateY(10px) scale(0.94)'
                    : 'translateY(18px) scale(0.88)',
                filter: order === 0 ? 'none' : `blur(${order}px)`,
                opacity: order === 0 ? 1 : order === 1 ? 0.7 : 0.4,
                zIndex: FRAMES.length - order,
              }}
            >
              <span className="font-mono text-[9px] tracking-[0.15em] text-white/70">{f.label}</span>
              <span className="font-mono text-[10px] text-primary-light">{f.ratio}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ---------- Feature 2: signature animation — aperture + falling light ---------- */
function ApertureLight() {
  const STATUSES = ['Rolling', 'Framing', 'Grading', 'Delivered']
  const [status, setStatus] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setStatus((s) => (s + 1) % STATUSES.length), 2300)
    return () => clearInterval(id)
  }, [])

  const shards = [0, 1, 2, 3, 4, 5, 6]

  return (
    <div
      className="relative h-44 rounded-3xl overflow-hidden border border-white/10"
      style={{ background: 'linear-gradient(180deg, #17130f 0%, #1c1819 70%, #211c17 100%)' }}
    >
      <div className="absolute top-3 left-4 right-4 flex items-center justify-between z-10">
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/50">Every frame, metered</span>
        <span className="font-mono text-[9px] text-primary-light">f/2.8</span>
      </div>

      <svg viewBox="0 0 40 40" className="absolute top-6 left-1/2 -translate-x-1/2 h-10 w-10 opacity-90">
        <circle cx="20" cy="20" r="12" fill="none" stroke="rgba(236,230,220,0.35)" strokeWidth="1.3" />
        <g stroke="#e0913f" strokeWidth="1.6" strokeLinecap="round">
          <line x1="20" y1="7" x2="20" y2="12.5" />
          <line x1="30.2" y1="12.5" x2="25.8" y2="15.4" />
          <line x1="30.2" y1="27.5" x2="25.8" y2="24.6" />
          <line x1="20" y1="33" x2="20" y2="27.5" />
          <line x1="9.8" y1="27.5" x2="14.2" y2="24.6" />
          <line x1="9.8" y1="12.5" x2="14.2" y2="15.4" />
        </g>
      </svg>

      <div className="absolute inset-0">
        {shards.map((i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${14 + i * 11}%`,
              top: 34,
              width: 3,
              height: i % 2 === 0 ? 16 : 11,
              background: i % 2 === 0
                ? 'linear-gradient(180deg,#e6a562,#e0913f)'
                : 'linear-gradient(180deg,#8fa4b0,#6f8798)',
              animation: 'shard-fall 2.6s linear infinite',
              animationDelay: `${i * 0.32}s`,
            }}
          />
        ))}
      </div>

      <svg viewBox="0 0 300 20" className="absolute bottom-8 left-0 w-full h-4" preserveAspectRatio="none">
        <path d="M0,10 Q75,4 150,10 T300,10" fill="none" stroke="rgba(236,230,220,0.18)" strokeWidth="1.2" />
      </svg>

      <div className="absolute bottom-8 left-0 w-full h-0">
        {[20, 45, 70].map((left, i) => (
          <span
            key={left}
            className="absolute rounded-full border"
            style={{
              left: `${left}%`,
              width: 10,
              height: 10,
              borderColor: 'rgba(224,145,63,0.55)',
              animation: 'shard-ripple 2.6s linear infinite',
              animationDelay: `${i * 0.6 + 0.4}s`,
            }}
          />
        ))}
      </div>

      <div className="absolute bottom-3 left-4 right-4 flex items-center gap-2 z-10">
        <span className="relative h-1.5 w-1.5 rounded-full bg-primary">
          <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-60" />
        </span>
        <span key={status} className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/70" style={{ animation: 'shard-fadein 0.4s ease-out' }}>
          {STATUSES[status]}
        </span>
      </div>

      <style>{`
        @keyframes shard-fall {
          0%   { transform: translateY(0); opacity: 0; }
          12%  { opacity: 1; }
          78%  { opacity: 1; }
          100% { transform: translateY(60px); opacity: 0; }
        }
        @keyframes shard-ripple {
          0%   { transform: scale(0.4); opacity: 0.9; }
          80%  { transform: scale(3.2); opacity: 0; }
          100% { transform: scale(3.2); opacity: 0; }
        }
        @keyframes shard-fadein {
          from { opacity: 0; transform: translateY(2px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

/* ---------- Feature 3: cursor + calendar (Weddings & Events) ---------- */
function BookingCursor() {
  const [step, setStep] = useState(0)
  useEffect(() => {
    if (prefersReducedMotion) return
    const id = setInterval(() => setStep((s) => (s + 1) % 5), 1400)
    return () => clearInterval(id)
  }, [])

  const days = Array.from({ length: 14 }, (_, i) => i + 1)
  const targetDay = 9
  const cursorX = step >= 1 && step < 4 ? '58%' : '20%'
  const cursorY = step >= 1 && step < 4 ? '52%' : '30%'

  return (
    <div className="relative h-44 rounded-3xl bg-surface border border-divider p-4 overflow-hidden">
      <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted mb-2">Availability — March</p>
      <div className="grid grid-cols-7 gap-1">
        {days.map((d) => (
          <div
            key={d}
            className={`h-4 rounded-[4px] flex items-center justify-center font-mono text-[8px] transition-colors duration-300 ${
              d === targetDay && step >= 2
                ? 'bg-primary text-background'
                : 'bg-background text-white/40 border border-white/5'
            }`}
          >
            {d}
          </div>
        ))}
      </div>
      {step >= 3 && (
        <div className="mt-3 flex items-center gap-1.5 text-primary-light">
          <CheckCircle2 className="h-3.5 w-3.5" />
          <span className="font-mono text-[9px] uppercase tracking-[0.14em]">Date held — Mar 9</span>
        </div>
      )}
      <div
        className="absolute h-3 w-3 rounded-full bg-white shadow-lg transition-all duration-700 ease-out pointer-events-none"
        style={{ left: cursorX, top: cursorY, transform: 'translate(-50%,-50%)', opacity: prefersReducedMotion ? 0 : 1 }}
      >
        <span className={`absolute inset-0 rounded-full bg-white ${step === 2 ? 'animate-ping' : ''}`} />
      </div>
    </div>
  )
}

function Features() {
  const ref = useRef(null)
  useEffect(() => {
    if (prefersReducedMotion || !ref.current) return
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
        y: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const CARDS = [
    {
      eyebrow: 'Commercial & Brand Film',
      title: 'One shoot day, every format.',
      body: 'Broadcast spot, vertical cutdown, and a teaser — scoped and shot together so nothing feels like an afterthought.',
      bullets: ['Broadcast, social & web cutdowns', 'Full pre-production support'],
      demo: <FormatShuffler />,
    },
    {
      eyebrow: 'Our Craft',
      title: 'Shot in light, not around it.',
      body: 'We treat colour the way a DP treats a scene: tungsten against daylight, metered on purpose, then graded to match — frame by frame.',
      bullets: ['Colour-graded to one Kelvin palette', 'Delivered cinema- and social-ready'],
      demo: <ApertureLight />,
    },
    {
      eyebrow: 'Weddings & Events',
      title: 'Book your date.',
      body: 'Full-day coverage, a same-week highlight reel, and the full film delivered within six weeks.',
      bullets: ['Ceremony, reception & speeches covered', 'Second shooter available on request'],
      demo: <BookingCursor />,
    },
  ]

  return (
    <section id="services" ref={ref} className="relative py-24 sm:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-3">What we shoot</p>
        <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tighter text-balance max-w-3xl">
          Three ways we work with light.
        </h2>
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {CARDS.map((c) => (
            <div key={c.title} className="feature-card rounded-3xl bg-surface border border-divider p-6 sm:p-8 flex flex-col">
              <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.18em] text-primary mb-2">{c.eyebrow}</p>
              <h3 className="font-display text-xl sm:text-2xl font-semibold mb-5">{c.title}</h3>
              {c.demo}
              <p className="mt-5 text-white/65 text-sm leading-relaxed">{c.body}</p>
              <ul className="mt-4 space-y-1.5">
                {c.bullets.map((b) => (
                  <li key={b} className="text-white/50 text-xs flex items-start gap-2">
                    <span className="text-primary mt-1">—</span> {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Protocol — sticky stack ---------- */
const STEPS = [
  {
    n: '01',
    eyebrow: 'Pre-production',
    title: 'Concept & Prep',
    body: 'We start with a short creative call — references, shot list, locations, gear. You get a one-page treatment before anyone picks up a camera.',
    bullets: ['Shot list & treatment', 'Location scout', 'Gear & crew booked'],
    img: 'https://images.unsplash.com/photo-1515634928627-2a4e0dae3ddf?w=1200&q=80&auto=format&fit=crop',
    alt: 'Clapperboard held up on a film set',
  },
  {
    n: '02',
    eyebrow: 'Production',
    title: 'On Set',
    body: 'Camera, lighting, and sound run on one plan. Every setup is metered and logged so grading matches across the whole shoot.',
    bullets: ['Multi-camera coverage', 'On-set monitoring', 'Same-day proof selects'],
    img: 'https://images.unsplash.com/photo-1632187981988-40f3cbaeef5e?w=1200&q=80&auto=format&fit=crop',
    alt: 'Crew gathered around a camera setup on set',
  },
  {
    n: '03',
    eyebrow: 'Post-production',
    title: 'Grade & Deliver',
    body: 'Edit, colour grade, and sound mix — delivered in every cut and aspect ratio your campaign needs, usually within two to four weeks.',
    bullets: ['Colour-graded to spec', 'Broadcast + social cuts', 'Archive of full raw files'],
    img: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&q=80&auto=format&fit=crop',
    alt: 'Video editing timeline with colour-graded clips',
  },
]

function Protocol() {
  const cardRefs = useRef([])
  useEffect(() => {
    if (prefersReducedMotion) return
    const ctx = gsap.context(() => {
      cardRefs.current.slice(0, -1).forEach((card) => {
        if (!card) return
        gsap.to(card, {
          scrollTrigger: { trigger: card, start: 'top top+=100', end: '+=500', scrub: 1 },
          scale: 0.92, filter: 'blur(6px) saturate(0.7)', opacity: 0.5, ease: 'none',
        })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="process" className="relative bg-background py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mb-10">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-3">How a project runs</p>
        <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tighter text-balance max-w-3xl">
          Three stages, one plan.
        </h2>
      </div>
      <div className="relative" style={{ minHeight: '260vh' }}>
        {STEPS.map((s, i) => (
          <div
            key={s.n}
            ref={(el) => (cardRefs.current[i] = el)}
            className="sticky top-24 mb-6"
          >
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center rounded-4xl bg-surface border border-divider p-6 sm:p-10 shadow-2xl shadow-black/40">
                <div className="lg:col-span-3">
                  <span className="font-mono text-5xl sm:text-6xl text-primary/25 font-semibold">{s.n}</span>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary mt-2 mb-2">{s.eyebrow}</p>
                  <h3 className="font-display text-2xl sm:text-3xl font-semibold mb-4">{s.title}</h3>
                  <p className="text-white/65 text-sm sm:text-base leading-relaxed max-w-lg">{s.body}</p>
                  <ul className="mt-5 space-y-1.5">
                    {s.bullets.map((b) => (
                      <li key={b} className="text-white/50 text-sm flex items-start gap-2">
                        <span className="text-primary mt-0.5">—</span> {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="lg:col-span-2">
                  <img src={s.img} alt={s.alt} className="w-full h-56 sm:h-64 object-cover rounded-3xl" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function ServicesGrid() {
  const ref = useRef(null)
  useEffect(() => {
    if (prefersReducedMotion || !ref.current) return
    const ctx = gsap.context(() => {
      gsap.from('.svc-tile', {
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
        y: 30, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="bg-deep text-white py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-3">Full list</p>
        <h2 className="font-display text-3xl sm:text-5xl font-semibold tracking-tighter mb-12">Everything we shoot.</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
          {SERVICES.map((s) => {
            const Icon = s.icon
            return (
              <div key={s.title} className="svc-tile group bg-deep p-8 sm:p-10 transition-colors hover:bg-white/[0.03]">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 mb-6">
                  <Icon className="h-5 w-5 text-primary-light transition-transform group-hover:scale-110" strokeWidth={2.2} />
                </span>
                <h3 className="font-display text-xl font-semibold mb-2">{s.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{s.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Field({ label, ...props }) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-white/60 mb-1.5">{label}</span>
      <input
        {...props}
        className="w-full rounded-xl bg-background border border-divider px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
      />
    </label>
  )
}

function ContactForm() {
  const [status, setStatus] = useState('idle')
  const [files, setFiles] = useState([])

  const onDrop = (e) => {
    e.preventDefault()
    const list = [...e.dataTransfer.files].filter((f) => f.type.startsWith('image/')).slice(0, 5 - files.length)
    setFiles((prev) => [...prev, ...list])
  }
  const onPick = (e) => {
    const list = [...e.target.files].slice(0, 5 - files.length)
    setFiles((prev) => [...prev, ...list])
  }
  const removeFile = (i) => setFiles((prev) => prev.filter((_, idx) => idx !== i))

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    const form = new FormData(e.target)
    const date = form.get('date')?.trim()
    const message = form.get('message')?.trim() ?? ''

    try {
      const res = await fetch('https://loopline-ten.vercel.app/api/v1/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer loop_d3e4e803f7a25f93c4061f4275e8bd257378ceceb5d83072',
        },
        body: JSON.stringify({
          name: form.get('name'),
          email: form.get('email'),
          phone: form.get('phone') || undefined,
          message: date ? `Shoot date: ${date}\n\n${message}` : message,
          source: 'natilume-site',
        }),
      })
      if (!res.ok) throw new Error('request failed')
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="bg-background py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-3">Get in touch</p>
            <h2 className="font-display text-3xl sm:text-5xl font-semibold tracking-tighter mb-6 text-balance">
              Tell us about the shoot.
            </h2>
            <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-md mb-10">
              Send a few details and any references — we'll reply with availability and next steps, usually within a day.
            </p>
            <div className="space-y-4">
              <a href="tel:+61408649887" className="flex items-center gap-3 lift-on-hover">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10">
                  <Phone className="h-4 w-4 text-primary-light" />
                </span>
                <span className="text-sm text-white/80">0408 649 887</span>
              </a>
              <a href="mailto:keenanfrench13@gmail.com" className="flex items-center gap-3 lift-on-hover">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10">
                  <Mail className="h-4 w-4 text-primary-light" />
                </span>
                <span className="text-sm text-white/80">keenanfrench13@gmail.com</span>
              </a>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10">
                  <MapPin className="h-4 w-4 text-primary-light" />
                </span>
                <span className="text-sm text-white/80">Melbourne, Australia</span>
              </div>
            </div>
            <p className="mt-10 text-xs text-white/40 max-w-sm leading-relaxed">
              Reference files stay private — used only to scope your project, never shared or sold.
            </p>
          </div>

          <div className="lg:col-span-7">
            {status === 'sent' ? (
              <div className="rounded-3xl bg-surface border border-divider p-10 sm:p-14 flex flex-col items-center text-center h-full justify-center">
                <CheckCircle2 className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-display text-2xl font-semibold mb-2">Thanks — we'll be in touch.</h3>
                <p className="text-white/60 text-sm max-w-sm">We usually reply within one business day with availability and a quote.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="rounded-3xl bg-surface border border-divider p-6 sm:p-10 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Name" type="text" name="name" placeholder="Your name" required />
                  <Field label="Email" type="email" name="email" placeholder="you@email.com" required />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Phone" type="tel" name="phone" placeholder="04xx xxx xxx" />
                  <Field label="Shoot date (if known)" type="text" name="date" placeholder="e.g. March 2027" />
                </div>
                <label className="block">
                  <span className="block text-xs font-medium text-white/60 mb-1.5">Project details</span>
                  <textarea
                    rows={5}
                    name="message"
                    placeholder="What are you shooting, and what's it for?"
                    required
                    className="w-full rounded-xl bg-background border border-divider px-4 py-3 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition resize-none"
                  />
                </label>

                <div>
                  <span className="block text-xs font-medium text-white/60 mb-1.5">References / mood board (optional)</span>
                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={onDrop}
                    className="rounded-xl border-2 border-dashed border-divider px-4 py-6 text-center cursor-pointer hover:border-primary/50 transition"
                    onClick={() => document.getElementById('file-input')?.click()}
                  >
                    <Upload className="h-5 w-5 text-muted mx-auto mb-2" />
                    <p className="text-xs text-white/50">Drag images here, or click to browse — up to 5</p>
                    <input id="file-input" type="file" accept="image/*" multiple hidden onChange={onPick} />
                  </div>
                  {files.length > 0 && (
                    <ul className="mt-3 space-y-1.5">
                      {files.map((f, i) => (
                        <li key={i} className="flex items-center justify-between text-xs text-white/60 bg-background rounded-lg px-3 py-2">
                          <span className="truncate max-w-[80%]">{f.name}</span>
                          <button type="button" onClick={() => removeFile(i)} aria-label={`Remove ${f.name}`}>
                            <Trash2 className="h-3.5 w-3.5 text-muted hover:text-primary transition" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {status === 'error' && (
                  <p className="text-xs text-primary-light">
                    Something went wrong sending that — mind trying again, or emailing us directly?
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="magnetic-btn w-full inline-flex items-center justify-center gap-2 bg-primary text-background px-6 py-3.5 rounded-full font-semibold disabled:opacity-60"
                >
                  {status === 'sending' ? 'Sending…' : 'Send enquiry'}
                  {status !== 'sending' && <ArrowRight className="h-4 w-4" />}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-deep text-white pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid lg:grid-cols-5 gap-12 pb-14">
          <div className="lg:col-span-2 flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <Aperture className="h-5 w-5 text-background" strokeWidth={2.3} />
              </span>
              <span className="font-wordmark text-2xl" style={{ letterSpacing: '0.02em' }}>NATILUME</span>
            </div>
            <p className="font-serif italic text-white/70 text-lg max-w-xs">Built on light.</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="relative h-2 w-2 rounded-full bg-primary">
                <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/60">Currently booking</span>
            </div>
            <a
              href="https://www.instagram.com/nati.lume/"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm text-white/60 lift-on-hover w-fit"
            >
              <AtSign className="h-4 w-4" /> nati.lume
            </a>
          </div>

          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/50 mb-4">Services</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              {SERVICES.map((s) => (
                <li key={s.title}><a href="#services" className="lift-on-hover">{s.title}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/50 mb-4">Studio</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><a href="#services" className="lift-on-hover">Work</a></li>
              <li><a href="#process" className="lift-on-hover">Process</a></li>
              <li><a href="#contact" className="lift-on-hover">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/50 mb-4">Contact</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>0408 649 887</li>
              <li>keenanfrench13@gmail.com</li>
              <li>Melbourne, Australia</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">© {new Date().getFullYear()} Natilume Media. All rights reserved.</p>
          <div className="flex items-center gap-6 text-xs text-white/40">
            <Link to="/privacy" className="lift-on-hover">Privacy</Link>
            <Link to="/terms" className="lift-on-hover">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 200)
    return () => clearTimeout(id)
  }, [])

  return (
    <div className="relative">
      <div className="noise-overlay" />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Protocol />
        <ServicesGrid />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}
