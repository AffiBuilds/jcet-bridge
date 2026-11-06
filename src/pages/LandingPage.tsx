import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Globe,
  ExternalLink,
  BookOpen,
  MessageSquare,
  Compass,
  ArrowRight,
  Menu,
  X,
  FileText,
  ClipboardList,
  Sparkles,
  Briefcase,
  TrendingUp,
  ChevronDown,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [langDropdown, setLangDropdown] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Features', href: '#features' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const features = [
    {
      title: 'Academic Resources',
      desc: 'Centralized repository of verified lecture notes, VTU syllabus modules, lab manuals, and question banks shared across JCET student circles.',
      icon: BookOpen,
      to: '/dashboard/resources',
    },
    {
      title: 'Assignments Tracker',
      desc: 'Never miss an academic submission. Real-time deadlines, digital PDF uploads, peer benchmarks, and automated priority alerts.',
      icon: ClipboardList,
      to: '/dashboard/assignments',
    },
    {
      title: 'IA Papers & Answer Keys',
      desc: 'Access past Internal Assessment (IA-1, IA-2, IA-3) question papers, VTU scheme blueprints, and model answer keys.',
      icon: FileText,
      to: '/dashboard/ia-papers',
    },
    {
      title: 'Academic Track Record',
      desc: 'Detailed visualization of subject-wise attendance percentages, IA performance trends, SGPA/CGPA credits, and eligibility thresholds.',
      icon: TrendingUp,
      to: '/dashboard/track-record',
    },
    {
      title: 'AI Academic Assistant',
      desc: 'Interactive smart companion trained on VTU curriculum. Ask doubt resolutions, algorithm walkthroughs, and exam preparation guides.',
      icon: Sparkles,
      to: '/dashboard/ai-assistant',
    },
    {
      title: 'Internship Opportunities',
      desc: 'Curated verified VTU-compliant industrial internships, placement cell alerts, and incubator fellowships tailored to your branch.',
      icon: Briefcase,
      to: '/dashboard/internships',
    },
  ];

  return (
    <div id="home" className="min-h-screen flex flex-col bg-[#F8F7FB] text-[#252532] font-sans selection:bg-[#E8DDF5] selection:text-[#252532]">
      
      {/* 1. MOODLE-STYLE HEADER / NAVBAR (Light Pastel Lavender & White Theme) */}
      <header className="bg-white/95 backdrop-blur-md border-b border-[#E8DDF5] sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            
            {/* Left: Official JCET College Logo with JCET-Bridge branding */}
            <Link to="/" className="flex items-center gap-3 shrink-0 group">
              <img
                src="/jcet-official-logo.png"
                alt="Jain College of Engineering & Technology"
                className="h-11 w-11 object-contain drop-shadow-xs transition-transform group-hover:scale-105"
              />
              <div className="flex flex-col">
                <div className="flex items-baseline font-bold tracking-tight">
                  <span className="text-[#7C51B0] font-extrabold text-2xl font-['Playfair_Display',Georgia,serif]">
                    jcet
                  </span>
                  <span className="text-[#252532] font-bold text-2xl font-['Playfair_Display',Georgia,serif]">
                    -bridge
                  </span>
                  <span className="text-[10px] text-[#7C51B0] font-mono ml-0.5 font-bold uppercase">
                    TM
                  </span>
                </div>
                <span className="text-[10px] text-neutral-500 font-medium tracking-wide">
                  Jain College of Engineering & Technology
                </span>
              </div>
            </Link>

            {/* Right: Moodle Navbar items */}
            <div className="hidden lg:flex items-center gap-6">
              
              {/* Primary links */}
              <nav className="flex items-center gap-6 text-sm font-semibold text-[#252532]">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="hover:text-[#7C51B0] transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              {/* Search pill input */}
              <div className="relative">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  placeholder="Search"
                  className="pl-9 pr-4 py-2 w-48 rounded-full bg-[#F8F7FB] border border-[#E8DDF5] text-xs text-[#252532] placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#C8B4E8] focus:bg-white transition-all"
                />
              </div>

              {/* Language Selector */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setLangDropdown(!langDropdown)}
                  className="flex items-center gap-1.5 text-xs font-medium text-neutral-600 hover:text-[#252532]"
                >
                  <Globe className="w-4 h-4 text-[#7C51B0]" />
                  <span>English (en)</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                {langDropdown && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-[#E8DDF5] py-1.5 z-50 text-xs">
                    <button
                      onClick={() => setLangDropdown(false)}
                      className="w-full text-left px-3 py-1.5 hover:bg-[#F8F7FB] font-semibold text-[#7C51B0]"
                    >
                      English (en) • VTU
                    </button>
                    <button
                      onClick={() => setLangDropdown(false)}
                      className="w-full text-left px-3 py-1.5 hover:bg-[#F8F7FB] text-neutral-600"
                    >
                      Kannada (kn)
                    </button>
                  </div>
                )}
              </div>

              {/* Login link */}
              <Link
                to="/auth"
                state={{ mode: 'login' }}
                className="text-sm font-semibold text-[#252532] hover:text-[#7C51B0] transition-colors"
              >
                Log in
              </Link>

              {/* Get Started Button */}
              <Link
                to="/auth"
                state={{ mode: 'register' }}
                className="px-5 py-2.5 rounded-full bg-[#C8B4E8] hover:bg-[#B89FE0] text-[#252532] text-xs font-bold transition-all shadow-xs"
              >
                Get Started
              </Link>

              {/* Moodle 3x3 grid launcher icon */}
              <div
                onClick={() => navigate('/dashboard')}
                title="JCET Academic Modules"
                className="p-1.5 text-neutral-600 hover:text-[#7C51B0] cursor-pointer"
              >
                <div className="grid grid-cols-3 gap-0.5 w-4 h-4">
                  <div className="w-1 h-1 bg-current rounded-xs" />
                  <div className="w-1 h-1 bg-current rounded-xs" />
                  <div className="w-1 h-1 bg-current rounded-xs" />
                  <div className="w-1 h-1 bg-current rounded-xs" />
                  <div className="w-1 h-1 bg-current rounded-xs" />
                  <div className="w-1 h-1 bg-current rounded-xs" />
                  <div className="w-1 h-1 bg-current rounded-xs" />
                  <div className="w-1 h-1 bg-current rounded-xs" />
                  <div className="w-1 h-1 bg-current rounded-xs" />
                </div>
              </div>
            </div>

            {/* Mobile menu toggle */}
            <div className="flex lg:hidden items-center gap-2">
              <Link
                to="/auth"
                className="text-xs font-bold px-3 py-1.5 rounded-full bg-[#C8B4E8] text-[#252532]"
              >
                Log in
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-neutral-700"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E8DDF5] bg-white px-5 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-semibold text-[#252532]"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-[#E8DDF5] flex gap-2">
              <Link
                to="/auth"
                state={{ mode: 'login' }}
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center py-2.5 rounded-full border border-[#E8DDF5] text-xs font-bold text-[#252532]"
              >
                Log in
              </Link>
              <Link
                to="/auth"
                state={{ mode: 'register' }}
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center py-2.5 rounded-full bg-[#C8B4E8] text-[#252532] text-xs font-bold"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-8 py-6 space-y-12">
        
        {/* 2. DUAL GUIDANCE BANNER (Light Pastel Lavender & White Theme) */}
        <div className="w-full rounded-2xl overflow-hidden flex flex-col md:flex-row border border-[#E8DDF5] shadow-xs">
          
          {/* Left Lavender Mist Banner */}
          <div className="flex-1 bg-white px-6 sm:px-8 py-5 flex flex-col justify-center">
            <h3 className="text-base sm:text-lg font-bold text-[#252532]">
              Need guidance on the best learning solution for you?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1 flex items-center gap-1.5 flex-wrap">
              <span>Learn more about course modules, IA question papers, and resources at</span>
              <Link
                to="/dashboard/resources"
                className="text-[#7C51B0] font-semibold underline underline-offset-2 inline-flex items-center gap-1 hover:text-[#5D3A8E]"
              >
                <span>JCET-Bridge.ac.in</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </p>
          </div>

          {/* Right Pastel Lavender Box with cursor arrow clicker */}
          <div className="bg-[#E8DDF5] px-8 sm:px-12 py-5 flex items-center justify-center relative min-w-[280px]">
            <div className="relative flex items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center p-1.5 shadow-xs border border-white">
                <img
                  src="/jcet-official-logo.png"
                  alt="JCET"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-[#4A2E73] font-bold text-2xl tracking-tight">
                .ac.in
              </span>

              {/* Lavender cursor pointer graphic */}
              <div className="absolute -bottom-3 -right-6 transform translate-x-2 translate-y-2 pointer-events-none">
                <svg
                  className="w-7 h-7 text-[#7C51B0] filter drop-shadow-xs"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M4 0l16 12.279-6.951 1.17 4.325 8.817-3.596 1.734-4.35-8.879-5.428 5.428v-20.549z" />
                </svg>
              </div>
            </div>
          </div>

        </div>

        {/* 3. HERO SECTION (Exact Moodle layout: Heading & Text on Left, Curved Atrium Crowd on Right) */}
        <section className="pt-2 pb-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
          
          {/* Left Column: Heading, description, and action button */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Exact Heading from user prompt in Moodle typography */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-bold text-[#252532] leading-[1.12] tracking-tight font-['Playfair_Display',Georgia,serif]">
              Your Campus.<br />
              Your Learning.<br />
              One Connected Bridge.
            </h1>

            {/* Exact Description from user prompt customized for student-to-student */}
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-lg font-normal">
              A centralized academic platform connecting JCET students through peer learning resources, assignments, academic records and opportunities.
            </p>

            {/* Existing buttons with Login and Get Started */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/auth"
                state={{ mode: 'register' }}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full border-2 border-[#7C51B0] text-[#7C51B0] hover:bg-[#7C51B0] hover:text-white text-base font-semibold transition-all active:scale-95 group"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/auth"
                state={{ mode: 'login' }}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#C8B4E8] hover:bg-[#B89FE0] text-[#252532] text-base font-semibold shadow-xs hover:shadow-md transition-all active:scale-95"
              >
                <span>Login</span>
              </Link>
            </div>

          </div>

          {/* Right Column: Exact Curved Hero Graphic with College Atrium Crowd Photo (Pastel Lavender Arc) */}
          <div className="lg:col-span-7 flex flex-col items-end relative">
            <div className="w-full max-w-[800px] overflow-hidden rounded-l-[140px] rounded-r-3xl shadow-sm border border-[#E8DDF5] bg-[#E8DDF5] relative group">
              <img
                src="/moodle-hero-graphic.png"
                alt="JCET Campus Community"
                className="w-full h-auto object-cover object-center"
              />
            </div>

            {/* Statistics Placement (Exact placement below the image as in Moodle screenshot) */}
            <div className="w-full max-w-[800px] pt-6 flex flex-wrap items-center justify-between gap-4">
              
              <div className="flex items-center gap-8 sm:gap-12 flex-wrap">
                
                {/* Stat 1: Courses & Resources (was 59,134,207+ Courses) */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E8DDF5] flex items-center justify-center text-[#7C51B0] shrink-0">
                    <BookOpen className="w-6 h-6 stroke-[2]" />
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-extrabold text-[#252532] font-mono leading-none">
                      2,400+
                    </div>
                    <div className="text-xs text-neutral-500 font-medium mt-1">
                      Students & Enrolled
                    </div>
                  </div>
                </div>

                {/* Stat 2: Student Study Hubs (was Faculty & Mentors) */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E8DDF5] flex items-center justify-center text-[#7C51B0] shrink-0">
                    <MessageSquare className="w-6 h-6 stroke-[2]" />
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-extrabold text-[#252532] font-mono leading-none">
                      140+
                    </div>
                    <div className="text-xs text-neutral-500 font-medium mt-1">
                      Student Study Hubs
                    </div>
                  </div>
                </div>

                {/* Stat 3: Countries / Accreditation (was 235+ Countries) */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E8DDF5] flex items-center justify-center text-[#7C51B0] shrink-0">
                    <Compass className="w-6 h-6 stroke-[2]" />
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-extrabold text-[#252532] font-mono leading-none">
                      100%
                    </div>
                    <div className="text-xs text-neutral-500 font-medium mt-1">
                      VTU Accredited
                    </div>
                  </div>
                </div>

              </div>

              {/* Help button '?' in light square (as seen in Moodle screenshot bottom right) */}
              <div
                title="JCET Academic Helpdesk"
                onClick={() => navigate('/dashboard/ai-assistant')}
                className="w-9 h-9 rounded-xl bg-[#E8DDF5] hover:bg-[#C8B4E8] text-[#4A2E73] flex items-center justify-center cursor-pointer transition-colors shadow-2xs font-bold text-sm"
              >
                ?
              </div>

            </div>

          </div>

        </section>

        {/* 4. JCET-BRIDGE FEATURES (Pastel Lavender & White Grid Cards) */}
        <section id="features" className="pt-8 border-t border-[#E8DDF5]">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7C51B0] px-3 py-1 rounded-full bg-[#E8DDF5]">
              JCET Academic Portal Modules
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#252532] font-['Playfair_Display',Georgia,serif] mt-2">
              Engineered for VTU Curriculum & Campus Success
            </h2>
            <p className="text-sm text-neutral-500 mt-1 max-w-2xl">
              One unified digital gateway replacing fragmented WhatsApp groups and lost paperwork with structured academic tracking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat) => (
              <div
                key={feat.title}
                className="p-6 rounded-2xl bg-white border border-[#E8DDF5] hover:border-[#C8B4E8] hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#F8F7FB] border border-[#E8DDF5] text-[#7C51B0] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <feat.icon className="w-6 h-6 stroke-[2]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#252532] mb-2 font-['Playfair_Display',Georgia,serif]">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#E8DDF5]/60 flex items-center justify-between text-xs font-bold text-[#7C51B0]">
                  <span>Explore Module</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. ABOUT SECTION (Clean White & Pastel Lavender) */}
        <section id="about" className="p-8 sm:p-10 rounded-3xl bg-white border border-[#E8DDF5] shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7C51B0] px-3 py-1 rounded-full bg-[#E8DDF5]">
                About JCET-Bridge
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#252532] font-['Playfair_Display',Georgia,serif]">
                Jain College of Engineering & Technology, Hubballi
              </h2>
              <p className="text-sm text-neutral-600 leading-relaxed">
                JCET-Bridge is the digital campus bridge authorized for Visvesvaraya Technological University (VTU) 
                affiliations. It synchronizes Continuous Internal Evaluation (CIE) test scores, module syllabus guidelines, 
                and assignment verification across all engineering disciplines.
              </p>
              <div className="flex flex-wrap gap-3 pt-2 text-xs font-semibold text-[#4A2E73]">
                <span className="px-3 py-1.5 rounded-full bg-[#F8F7FB] border border-[#E8DDF5]">VTU 2022 Scheme</span>
                <span className="px-3 py-1.5 rounded-full bg-[#F8F7FB] border border-[#E8DDF5]">AICTE Approved</span>
                <span className="px-3 py-1.5 rounded-full bg-[#F8F7FB] border border-[#E8DDF5]">JGI Group of Institutions</span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-[#F8F7FB] border border-[#E8DDF5] text-center">
              <img
                src="/jcet-official-logo.png"
                alt="JGI Logo"
                className="w-20 h-20 object-contain mb-3"
              />
              <div className="font-bold text-sm text-[#252532]">
                Jain College of Engg. & Tech.
              </div>
              <div className="text-xs text-neutral-500 mt-1">
                Hubballi - Dharwad Bypass Road, Karnataka
              </div>
            </div>
          </div>
        </section>

        {/* 6. CONTACT SECTION (Light Pastel Lavender & White Card) */}
        <section id="contact" className="p-8 rounded-3xl bg-white border border-[#E8DDF5] text-[#252532] shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <h4 className="font-bold text-base text-[#252532] font-['Playfair_Display',Georgia,serif]">
                Examination Cell & Support
              </h4>
              <p className="text-xs text-neutral-600">
                For USN discrepancies, IA paper verification, and academic syllabus access.
              </p>
              <p className="text-xs font-mono text-[#7C51B0] font-semibold pt-1">
                support.bridge@jcet.ac.in
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-base text-[#252532] font-['Playfair_Display',Georgia,serif]">
                Dean of Academics
              </h4>
              <p className="text-xs text-neutral-600">
                Supervising Continuous Internal Evaluation and attendance adherence.
              </p>
              <p className="text-xs text-neutral-600 pt-1">
                Phone: +91 836 223 9999 / 9998
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-base text-[#252532] font-['Playfair_Display',Georgia,serif]">
                Authorized Student Access
              </h4>
              <p className="text-xs text-neutral-600">
                JCET students can access the secure portal directly with their Student USN.
              </p>
              <div className="pt-2">
                <Link
                  to="/auth"
                  className="inline-block px-5 py-2 rounded-full bg-[#C8B4E8] hover:bg-[#B89FE0] text-[#252532] text-xs font-bold transition-all shadow-xs"
                >
                  Student Portal Login →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 7. VTU REFERENCES SECTION */}
        <section id="vtu-references" className="p-8 sm:p-10 rounded-3xl bg-white border border-[#E8DDF5] shadow-xs">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7C51B0] px-3 py-1 rounded-full bg-[#E8DDF5]">
              Curated Academic Portals
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#252532] font-['Playfair_Display',Georgia,serif] mt-2">
              VTU References
            </h2>
            <p className="text-sm text-neutral-500 mt-1 max-w-2xl">
              Essential direct references, portals, calculators, and official university evaluation resources for VTU and JCET engineering students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Quick Links Group */}
            <div className="p-6 rounded-2xl bg-[#F8F7FB] border border-[#E8DDF5] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E8DDF5]">
                  <h3 className="text-lg font-bold text-[#252532] font-['Playfair_Display',Georgia,serif]">
                    Quick Links
                  </h3>
                  <span className="text-[11px] font-semibold text-[#7C51B0] bg-white px-2.5 py-0.5 rounded-full border border-[#E8DDF5]">
                    4 Resources
                  </span>
                </div>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="https://vtusync.in/vtu-sgpa-calculator/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#E8DDF5]/80 hover:border-[#C8B4E8] hover:shadow-xs transition-all text-sm font-semibold text-[#252532] hover:text-[#7C51B0]"
                    >
                      <span>VTU SGPA Calculator</span>
                      <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-[#7C51B0] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://vtusync.in/vtu-scheme-of-evaluation/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#E8DDF5]/80 hover:border-[#C8B4E8] hover:shadow-xs transition-all text-sm font-semibold text-[#252532] hover:text-[#7C51B0]"
                    >
                      <span>VTU Scheme of Evaluation</span>
                      <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-[#7C51B0] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://vtusync.in/vtu-pyqfinder/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#E8DDF5]/80 hover:border-[#C8B4E8] hover:shadow-xs transition-all text-sm font-semibold text-[#252532] hover:text-[#7C51B0]"
                    >
                      <span>VTU PYQ Finder</span>
                      <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-[#7C51B0] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://vtusync.in/vtu-syllabus/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#E8DDF5]/80 hover:border-[#C8B4E8] hover:shadow-xs transition-all text-sm font-semibold text-[#252532] hover:text-[#7C51B0]"
                    >
                      <span>VTU Syllabus</span>
                      <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-[#7C51B0] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* VTU Links Group */}
            <div className="p-6 rounded-2xl bg-[#F8F7FB] border border-[#E8DDF5] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E8DDF5]">
                  <h3 className="text-lg font-bold text-[#252532] font-['Playfair_Display',Georgia,serif]">
                    VTU Links
                  </h3>
                  <span className="text-[11px] font-semibold text-[#7C51B0] bg-white px-2.5 py-0.5 rounded-full border border-[#E8DDF5]">
                    Official Portals
                  </span>
                </div>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="https://vtu.ac.in/academic-calendar/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#E8DDF5]/80 hover:border-[#C8B4E8] hover:shadow-xs transition-all text-sm font-semibold text-[#252532] hover:text-[#7C51B0]"
                    >
                      <span>Academic Calendar</span>
                      <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-[#7C51B0] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://results.vtu.ac.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#E8DDF5]/80 hover:border-[#C8B4E8] hover:shadow-xs transition-all text-sm font-semibold text-[#252532] hover:text-[#7C51B0]"
                    >
                      <span>VTU Results</span>
                      <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-[#7C51B0] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-[#E8DDF5] py-6 text-xs text-neutral-500">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img
              src="/jcet-official-logo.png"
              alt="JCET"
              className="w-5 h-5 object-contain"
            />
            <span>
              © {new Date().getFullYear()} JCET-Bridge. Jain College of Engineering & Technology, Hubballi. All rights reserved.
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/auth" className="hover:text-[#7C51B0]">Student Login</Link>
            <Link to="/dashboard/resources" className="hover:text-[#7C51B0]">Academic Resources</Link>
            <Link to="/dashboard" className="hover:text-[#7C51B0]">Dashboard Demo</Link>
          </div>
        </div>
      </footer>

    </div>
  );
};
