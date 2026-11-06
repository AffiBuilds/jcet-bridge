import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  FileCheck2,
  TrendingUp,
  Sparkles,
  Briefcase,
  Bell,
  Settings,
  LogOut,
  GraduationCap,
  X,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { CURRENT_STUDENT } from '../data/mockData';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  pendingAssignmentsCount?: number;
  unreadAnnouncementsCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  pendingAssignmentsCount = 3,
  unreadAnnouncementsCount = 2,
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // In our prototype, route cleanly back to login page
    navigate('/auth');
  };

  const menuItems = [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      to: '/dashboard',
      end: true,
    },
    {
      label: 'Academic Resources',
      icon: BookOpen,
      to: '/dashboard/resources',
    },
    {
      label: 'Assignments',
      icon: ClipboardList,
      to: '/dashboard/assignments',
      badge: pendingAssignmentsCount > 0 ? `${pendingAssignmentsCount}` : undefined,
      badgeColor: 'bg-[#F8E7A9] text-[#705809]',
    },
    {
      label: 'IA Papers',
      icon: FileCheck2,
      to: '/dashboard/ia-papers',
    },
    {
      label: 'Academic Track Record',
      icon: TrendingUp,
      to: '/dashboard/track-record',
    },
    {
      label: 'AI Assistant',
      icon: Sparkles,
      to: '/dashboard/ai-assistant',
      badge: 'AI',
      badgeColor: 'bg-[#E8DDF5] text-[#5c378e]',
    },
    {
      label: 'Internships',
      icon: Briefcase,
      to: '/dashboard/internships',
    },
    {
      label: 'Announcements',
      icon: Bell,
      to: '/dashboard/announcements',
      badge: unreadAnnouncementsCount > 0 ? `${unreadAnnouncementsCount}` : undefined,
      badgeColor: 'bg-[#D5EBE5] text-[#1b5e4f]',
    },
    {
      label: 'Settings',
      icon: Settings,
      to: '/dashboard/settings',
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white border-r border-[#E8DDF5] flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-20 px-6 border-b border-[#E8DDF5]/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/jcet-official-logo.png"
              alt="JCET"
              className="w-10 h-10 object-contain drop-shadow-xs"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg font-['Space_Grotesk'] text-[#252532] tracking-tight">
                  JCET<span className="text-[#7c51b0]">-Bridge</span>
                </span>
              </div>
              <p className="text-[11px] font-medium text-neutral-500">
                Student Academic Portal
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-[#F8F7FB] lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Card Pill */}
        <div className="px-4 pt-4 pb-2">
          <div className="p-3 rounded-2xl bg-[#F8F7FB] border border-[#E8DDF5] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E8DDF5] flex items-center justify-center font-bold text-sm text-[#543b7b] shrink-0 border border-white">
              RV
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1">
                <p className="text-xs font-bold text-[#252532] truncate">
                  {CURRENT_STUDENT.name}
                </p>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              </div>
              <p className="text-[11px] text-neutral-500 font-mono">
                {CURRENT_STUDENT.usnOrId}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-1.5">
          <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
            Main Navigation
          </div>

          {menuItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.end}
              onClick={() => {
                if (window.innerWidth < 1024) onClose();
              }}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                  isActive
                    ? 'bg-[#C8B4E8] text-[#252532] font-semibold shadow-xs'
                    : 'text-neutral-600 hover:bg-[#F8F7FB] hover:text-[#252532]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3 min-w-0">
                    <item.icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive ? 'text-[#252532] stroke-[2.2]' : 'text-neutral-500 group-hover:text-[#252532]'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-white/80 text-[#252532]' : item.badgeColor || 'bg-neutral-100 text-neutral-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Footer with Logout */}
        <div className="p-4 border-t border-[#E8DDF5]/70 bg-white space-y-2">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-rose-700 hover:bg-rose-50 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <LogOut className="w-4 h-4 text-rose-600 group-hover:scale-110 transition-transform" />
              <span>Sign Out</span>
            </div>
            <ChevronRight className="w-4 h-4 text-rose-300" />
          </button>
          
          <div className="text-center text-[10px] text-neutral-400 pt-1">
            VTU Affiliation & JCET Exam Cell
          </div>
        </div>
      </aside>
    </>
  );
};
