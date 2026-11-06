import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin, ExternalLink, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-[#E8DDF5] pt-14 pb-8 text-[#252532]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-100">
          
          {/* Brand & Accreditation */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C8B4E8] flex items-center justify-center text-[#252532] shadow-xs">
                <GraduationCap className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <span className="text-xl font-bold font-['Space_Grotesk'] text-[#252532]">
                  JCET<span className="text-[#7c51b0]">-Bridge</span>
                </span>
                <p className="text-xs text-neutral-500">One Portal. Endless Possibilities.</p>
              </div>
            </div>
            
            <p className="text-sm text-neutral-600 leading-relaxed max-w-sm">
              The unified academic digital gateway for students of 
              Jain College of Engineering & Technology (JCET), Hubballi. Streamlining peer study resources, 
              assignments, IA records, and academic assistance.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8DDF5] text-xs font-semibold text-[#543b7b]">
                <ShieldCheck className="w-3.5 h-3.5" />
                Affiliated to VTU, Belagavi
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D5EBE5] text-xs font-semibold text-[#1f594b]">
                AICTE Approved
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-800 mb-4">
              Portal Modules
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-600">
              <li>
                <Link to="/auth" className="hover:text-[#7c51b0] transition-colors">
                  Student Sign In
                </Link>
              </li>
              <li>
                <Link to="/dashboard/resources" className="hover:text-[#7c51b0] transition-colors">
                  Peer Study Resources
                </Link>
              </li>
              <li>
                <Link to="/dashboard/resources" className="hover:text-[#7c51b0] transition-colors">
                  Academic Resources
                </Link>
              </li>
              <li>
                <Link to="/dashboard/assignments" className="hover:text-[#7c51b0] transition-colors">
                  Assignments Tracker
                </Link>
              </li>
              <li>
                <Link to="/dashboard/ia-papers" className="hover:text-[#7c51b0] transition-colors">
                  IA Question Papers
                </Link>
              </li>
            </ul>
          </div>

          {/* Academics & Depts */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-800 mb-4">
              Departments
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-600">
              <li>Computer Science & Engg</li>
              <li>Information Science & Engg</li>
              <li>Electronics & Communication</li>
              <li>Artificial Intelligence & DS</li>
              <li>Mechanical Engineering</li>
              <li>Civil Engineering</li>
            </ul>
          </div>

          {/* College Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-800 mb-4">
              Campus Contact
            </h4>
            <div className="flex items-start gap-2.5 text-xs text-neutral-600">
              <MapPin className="w-4 h-4 text-[#7c51b0] shrink-0 mt-0.5" />
              <span>Jain College of Engineering & Technology, Hubballi - 580031, Karnataka, India</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-neutral-600">
              <Phone className="w-4 h-4 text-[#7c51b0] shrink-0" />
              <span>+91 836 223 9999 / 9998</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-neutral-600">
              <Mail className="w-4 h-4 text-[#7c51b0] shrink-0" />
              <span>support.bridge@jcet.ac.in</span>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>
            © {new Date().getFullYear()} JCET-Bridge. Jain College of Engineering & Technology. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#252532] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#252532] cursor-pointer">Terms of Service</span>
            <span className="hover:text-[#252532] cursor-pointer">VTU Portal Sync</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
