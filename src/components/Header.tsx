import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  Search,
  Bell,
  Sparkles,
  ChevronDown,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  X,
} from 'lucide-react';
import { CURRENT_STUDENT, ANNOUNCEMENTS } from '../data/mockData';

interface HeaderProps {
  onMenuToggle: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onMenuToggle,
  searchQuery,
  onSearchChange,
}) => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);

  return (
    <header className="sticky top-0 z-30 bg-[#F8F7FB]/90 backdrop-blur-md border-b border-[#E8DDF5]/80 px-4 sm:px-6 lg:px-8 py-3.5 transition-all">
      <div className="flex items-center justify-between gap-4">
        
        {/* Left: Hamburger & Search */}
        <div className="flex items-center gap-3 flex-1 max-w-xl">
          <button
            onClick={onMenuToggle}
            className="p-2 rounded-xl text-neutral-600 hover:bg-[#E8DDF5]/60 hover:text-[#252532] lg:hidden transition-colors"
            aria-label="Open mobile menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search Bar */}
          <div className="relative w-full">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search syllabus, notes, IA papers, assignments..."
              className="w-full pl-10 pr-9 py-2 rounded-xl bg-white border border-[#E8DDF5] text-sm text-[#252532] placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#C8B4E8] focus:border-[#C8B4E8] transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Right Action Widgets */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Quick Date Display */}
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E8DDF5] text-xs font-medium text-neutral-600 shadow-2xs">
            <Calendar className="w-3.5 h-3.5 text-[#7c51b0]" />
            <span>Odd Sem 2026-27</span>
          </div>

          {/* AI Shortcut Button */}
          <button
            onClick={() => navigate('/dashboard/ai-assistant')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#E8DDF5] hover:bg-[#dfd0f1] text-[#4d2c79] text-xs font-bold transition-colors active:scale-95 shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#7c51b0]" />
            <span>AI Helper</span>
          </button>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                if (unreadCount > 0) setUnreadCount(0);
              }}
              className="p-2.5 rounded-xl bg-white border border-[#E8DDF5] hover:bg-[#F8F7FB] text-neutral-600 hover:text-[#252532] relative transition-colors shadow-2xs"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white border border-[#E8DDF5] shadow-xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#252532]">Campus Notices</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#E8DDF5] text-[#553b7d] text-[10px] font-bold">
                      JCET Official
                    </span>
                  </div>
                  <button
                    onClick={() => navigate('/dashboard/announcements')}
                    className="text-xs font-semibold text-[#7c51b0] hover:underline"
                  >
                    View All
                  </button>
                </div>

                <div className="divide-y divide-neutral-100 mt-2 max-h-72 overflow-y-auto">
                  {ANNOUNCEMENTS.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setShowNotifications(false);
                        navigate('/dashboard/announcements');
                      }}
                      className="py-2.5 px-1 hover:bg-[#F8F7FB] rounded-lg cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#D5EBE5] text-[#1b5e4f]">
                          {item.category}
                        </span>
                        <span className="text-[10px] text-neutral-400">{item.date}</span>
                      </div>
                      <p className="text-xs font-semibold text-neutral-800 mt-1 line-clamp-1">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-neutral-500 line-clamp-2 mt-0.5">
                        {item.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Student Badge / Profile Pill */}
          <div
            onClick={() => navigate('/dashboard/settings')}
            className="flex items-center gap-2.5 pl-2 pr-3 py-1 rounded-2xl bg-white border border-[#E8DDF5] cursor-pointer hover:border-[#C8B4E8] transition-all shadow-2xs group"
          >
            <div className="w-8 h-8 rounded-xl bg-[#C8B4E8] text-[#252532] font-bold text-xs flex items-center justify-center">
              RV
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-bold text-[#252532] group-hover:text-[#7c51b0] transition-colors leading-tight">
                {CURRENT_STUDENT.name.split(' ')[0]}
              </span>
              <span className="text-[10px] font-medium text-neutral-500">
                CSE • Sem 6
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#252532] transition-colors" />
          </div>

        </div>

      </div>
    </header>
  );
};
