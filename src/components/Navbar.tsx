import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  Menu,
  X,
  Compass,
  BookOpen,
  Layers,
  ShieldCheck,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Overview', href: '#overview' },
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Benefits', href: '#benefits' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#F8F7FB]/90 backdrop-blur-md border-b border-[#E8DDF5]/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/jcet-official-logo.png"
              alt="JCET"
              className="w-11 h-11 object-contain drop-shadow-xs group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-[#252532] font-['Space_Grotesk']">
                  JCET<span className="text-[#845bb3]">-Bridge</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#E8DDF5] text-[#553b7d] hidden sm:inline-block">
                  VTU Portal
                </span>
              </div>
              <span className="text-xs text-neutral-500 font-medium">
                One Portal. Endless Possibilities.
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-white/70 px-3 py-1.5 rounded-full border border-[#E8DDF5] shadow-xs">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-1.5 text-sm font-medium text-neutral-600 hover:text-[#252532] hover:bg-[#F8F7FB] rounded-full transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/auth"
              state={{ mode: 'login' }}
              className="px-4 py-2 text-sm font-semibold text-[#252532] hover:text-[#553b7d] transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/auth"
              state={{ mode: 'register' }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C8B4E8] hover:bg-[#bba0e4] text-[#252532] text-sm font-semibold shadow-xs hover:shadow-md transition-all active:scale-95"
            >
              <span>Student Portal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/auth"
              className="px-3 py-1.5 rounded-lg bg-[#C8B4E8] text-[#252532] text-xs font-semibold"
            >
              Login
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-neutral-700 hover:bg-[#E8DDF5]/50 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E8DDF5] bg-white/95 backdrop-blur-md px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-[#F8F7FB] rounded-lg"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-neutral-100 flex flex-col gap-2">
            <Link
              to="/auth"
              state={{ mode: 'login' }}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl border border-[#C8B4E8] text-[#252532] text-sm font-semibold"
            >
              Sign In to Portal
            </Link>
            <Link
              to="/auth"
              state={{ mode: 'register' }}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl bg-[#C8B4E8] text-[#252532] text-sm font-semibold"
            >
              Activate Student Account
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
