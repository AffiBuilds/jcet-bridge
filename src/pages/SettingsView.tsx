import React, { useState } from 'react';
import {
  Settings,
  User,
  ShieldCheck,
  Bell,
  Database,
  Lock,
  CheckCircle2,
  Save,
  Server,
  FileCheck,
} from 'lucide-react';
import { CURRENT_STUDENT } from '../data/mockData';

export const SettingsView: React.FC = () => {
  const [notifyDeadlines, setNotifyDeadlines] = useState(true);
  const [notifyIaTimetable, setNotifyIaTimetable] = useState(true);
  const [notifyInternships, setNotifyInternships] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8DDF5] shadow-xs">
        <h1 className="text-2xl font-extrabold text-[#252532] font-['Space_Grotesk']">
          Portal Settings & Student Profile
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
          Manage your institutional credentials, notification alert thresholds, and system preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Profile Card (1 col) */}
        <div className="p-6 rounded-3xl bg-white border border-[#E8DDF5] shadow-xs space-y-4">
          <div className="text-center pb-4 border-b border-neutral-100">
            <div className="w-20 h-20 rounded-3xl bg-[#C8B4E8] flex items-center justify-center text-[#252532] font-extrabold text-2xl mx-auto shadow-sm mb-3">
              RV
            </div>
            <h3 className="text-base font-bold text-[#252532]">
              {CURRENT_STUDENT.name}
            </h3>
            <p className="text-xs font-mono font-semibold text-[#7c51b0]">
              {CURRENT_STUDENT.usnOrId}
            </p>
            <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D5EBE5] text-[11px] font-bold text-[#1b5e4f]">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified VTU Student
            </div>
          </div>

          <div className="space-y-2 text-xs text-neutral-600">
            <div className="flex justify-between py-1 border-b border-neutral-50">
              <span>Department:</span>
              <strong className="text-neutral-800">{CURRENT_STUDENT.department}</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-neutral-50">
              <span>Semester:</span>
              <strong className="text-neutral-800">{CURRENT_STUDENT.semester}th Semester (Sec {CURRENT_STUDENT.section})</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-neutral-50">
              <span>College Email:</span>
              <strong className="text-neutral-800">{CURRENT_STUDENT.email}</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-neutral-50">
              <span>Curriculum Scheme:</span>
              <strong className="text-neutral-800">VTU 2022 Scheme</strong>
            </div>
            <div className="flex justify-between py-1">
              <span>Campus:</span>
              <strong className="text-neutral-800">JCET Hubballi</strong>
            </div>
          </div>
        </div>

        {/* Right: Notifications & Backend Integration Ready info (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Notification Preferences */}
          <form onSubmit={handleSaveSettings} className="p-6 rounded-3xl bg-white border border-[#E8DDF5] shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#E8DDF5] flex items-center justify-center text-[#553b7d]">
                  <Bell className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-[#252532] font-['Space_Grotesk']">
                  Academic Alerts & Reminders
                </h3>
              </div>
              {saveSuccess && (
                <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4" /> Preferences Saved!
                </span>
              )}
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F8F7FB] border border-[#E8DDF5] cursor-pointer hover:border-[#C8B4E8] transition-colors">
                <div>
                  <div className="font-bold text-[#252532]">Assignment Deadline Alerts</div>
                  <div className="text-xs text-neutral-500">Send reminder notifications 24 hours prior to cut-off</div>
                </div>
                <input
                  type="checkbox"
                  checked={notifyDeadlines}
                  onChange={(e) => setNotifyDeadlines(e.target.checked)}
                  className="w-4 h-4 text-[#7c51b0] rounded focus:ring-[#C8B4E8]"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F8F7FB] border border-[#E8DDF5] cursor-pointer hover:border-[#C8B4E8] transition-colors">
                <div>
                  <div className="font-bold text-[#252532]">IA Test Timetable & Seating Notices</div>
                  <div className="text-xs text-neutral-500">Receive priority broadcast notifications from Exam Cell</div>
                </div>
                <input
                  type="checkbox"
                  checked={notifyIaTimetable}
                  onChange={(e) => setNotifyIaTimetable(e.target.checked)}
                  className="w-4 h-4 text-[#7c51b0] rounded focus:ring-[#C8B4E8]"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F8F7FB] border border-[#E8DDF5] cursor-pointer hover:border-[#C8B4E8] transition-colors">
                <div>
                  <div className="font-bold text-[#252532]">Placement & Internship Broadcasts</div>
                  <div className="text-xs text-neutral-500">Instant alerts for new campus hiring drives matching your CGPA</div>
                </div>
                <input
                  type="checkbox"
                  checked={notifyInternships}
                  onChange={(e) => setNotifyInternships(e.target.checked)}
                  className="w-4 h-4 text-[#7c51b0] rounded focus:ring-[#C8B4E8]"
                />
              </label>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C8B4E8] hover:bg-[#b89fe0] text-[#252532] text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Preferences</span>
              </button>
            </div>
          </form>

          {/* Backend Integration Architecture Ready (Django & PostgreSQL) */}
          <div className="p-6 rounded-3xl bg-white border border-[#E8DDF5] shadow-xs space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#D5EBE5] flex items-center justify-center text-[#195244]">
                <Server className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#252532] font-['Space_Grotesk']">
                  Backend Integration Readiness (Django & PostgreSQL)
                </h4>
                <p className="text-[11px] text-neutral-500">
                  Architectural standard adhering to JCET deployment guidelines
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#F8F7FB] border border-[#E8DDF5] text-xs text-neutral-600 space-y-2">
              <p>
                JCET-Bridge frontend endpoints, authentication contracts (USN/Faculty ID token authorization), 
                and data models are structured for seamless connection to future <strong>Django REST Framework (DRF)</strong> views 
                backed by <strong>PostgreSQL</strong> relational tables for students, faculty, attendance registers, and assignments.
              </p>
              <div className="flex flex-wrap gap-2 pt-1 font-mono text-[10px]">
                <span className="px-2 py-0.5 rounded bg-white border border-[#E8DDF5] text-[#553b7d]">GET /api/v1/students/me</span>
                <span className="px-2 py-0.5 rounded bg-white border border-[#E8DDF5] text-[#553b7d]">POST /api/v1/assignments/:id/submit</span>
                <span className="px-2 py-0.5 rounded bg-white border border-[#E8DDF5] text-[#553b7d]">GET /api/v1/ia-papers</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
