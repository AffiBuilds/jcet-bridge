import React from 'react';
import {
  TrendingUp,
  Award,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Calendar,
  Layers,
  GraduationCap,
} from 'lucide-react';
import { CURRENT_STUDENT, ATTENDANCE_LIST, IA_SCORES } from '../data/mockData';

export const TrackRecordView: React.FC = () => {
  // Semester GPA history for Rohan
  const semesterHistory = [
    { sem: '1st Sem (P Cycle)', sgpa: 8.45, credits: 20, status: 'Completed' },
    { sem: '2nd Sem (C Cycle)', sgpa: 8.60, credits: 20, status: 'Completed' },
    { sem: '3rd Sem (CSE Core)', sgpa: 8.85, credits: 24, status: 'Completed' },
    { sem: '4th Sem (CSE Core)', sgpa: 8.70, credits: 24, status: 'Completed' },
    { sem: '5th Sem (CSE Core)', sgpa: 8.92, credits: 25, status: 'Completed' },
    { sem: '6th Sem (Current)', sgpa: 8.88, credits: 24, status: 'Ongoing (Predicted)' },
  ];

  const totalEarnedCredits = 113;
  const currentCgpa = 8.72;

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8DDF5] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#1b5e4f]">
              VTU Academic Track Record
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#252532] font-['Space_Grotesk'] mt-1">
            Performance Ledger & Eligibility
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
            USN: <strong className="font-mono text-[#252532]">{CURRENT_STUDENT.usnOrId}</strong> • 
            {CURRENT_STUDENT.department} • 2022 Scheme
          </p>
        </div>

        {/* Quick Highlights */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-2.5 rounded-2xl bg-[#E8DDF5] text-center border border-[#d6c4eb]">
            <div className="text-lg font-extrabold text-[#553b7d] font-['Space_Grotesk']">
              {currentCgpa}
            </div>
            <div className="text-[10px] uppercase font-bold text-[#553b7d]">
              Cumulative CGPA
            </div>
          </div>
          <div className="px-4 py-2.5 rounded-2xl bg-[#D5EBE5] text-center border border-[#b2ded0]">
            <div className="text-lg font-extrabold text-[#1b5e4f] font-['Space_Grotesk']">
              {totalEarnedCredits} / 160
            </div>
            <div className="text-[10px] uppercase font-bold text-[#1b5e4f]">
              VTU Credits
            </div>
          </div>
        </div>
      </div>

      {/* SEMESTER SGPA JOURNEY */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8DDF5] shadow-xs">
        <h3 className="text-base font-bold text-[#252532] font-['Space_Grotesk'] mb-4">
          Semester-Wise SGPA Progression
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {semesterHistory.map((item) => (
            <div
              key={item.sem}
              className={`p-4 rounded-2xl border transition-all text-center ${
                item.status.includes('Ongoing')
                  ? 'bg-gradient-to-b from-[#E8DDF5]/40 to-white border-[#C8B4E8]'
                  : 'bg-[#F8F7FB] border-[#E8DDF5]'
              }`}
            >
              <span className="text-[11px] font-bold text-neutral-500 block truncate">
                {item.sem.split(' ')[0]} {item.sem.split(' ')[1]}
              </span>
              <div className="text-2xl font-extrabold text-[#252532] font-['Space_Grotesk'] my-1">
                {item.sgpa}
              </div>
              <span className="text-[10px] text-neutral-400 block font-mono">
                {item.credits} Credits
              </span>
              <span
                className={`mt-2 inline-block text-[9px] font-bold px-2 py-0.5 rounded-full ${
                  item.status === 'Completed'
                    ? 'bg-[#D5EBE5] text-[#1b5e4f]'
                    : 'bg-[#F8E7A9] text-[#705809]'
                }`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* DETAILED ATTENDANCE LEDGER */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8DDF5] shadow-xs">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-100">
          <div>
            <h3 className="text-base font-bold text-[#252532] font-['Space_Grotesk']">
              Subject-Wise Attendance Ledger (Current 6th Sem)
            </h3>
            <p className="text-xs text-neutral-500">
              Students falling below 75% are liable to be detained as per VTU Statute.
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-[#D5EBE5] px-3 py-1 rounded-xl">
            Eligible for All Exams
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E8DDF5] text-neutral-400 uppercase font-bold tracking-wider">
                <th className="pb-3 pl-2">Subject Code & Name</th>
                <th className="pb-3">Faculty Incharge</th>
                <th className="pb-3 text-center">Attended / Total</th>
                <th className="pb-3 text-center">Percentage</th>
                <th className="pb-3 text-right pr-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {ATTENDANCE_LIST.map((sub) => (
                <tr key={sub.code} className="hover:bg-[#F8F7FB] transition-colors">
                  <td className="py-3.5 pl-2">
                    <span className="font-mono font-bold text-[#553b7d] mr-2">
                      {sub.code}
                    </span>
                    <span className="font-bold text-[#252532]">{sub.name}</span>
                  </td>
                  <td className="py-3.5 text-neutral-600">{sub.faculty}</td>
                  <td className="py-3.5 text-center font-mono font-medium">
                    {sub.attended} / {sub.total} hrs
                  </td>
                  <td className="py-3.5 text-center">
                    <div className="inline-flex items-center gap-2">
                      <span className="font-bold text-[#252532]">{sub.percentage}%</span>
                      <div className="w-16 h-2 rounded-full bg-neutral-100 overflow-hidden hidden sm:block">
                        <div
                          className={`h-full rounded-full ${
                            sub.percentage < 80 ? 'bg-[#F8E7A9]' : 'bg-[#C8B4E8]'
                          }`}
                          style={{ width: `${sub.percentage}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 text-right pr-2">
                    {sub.status === 'safe' ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-[#D5EBE5] px-2.5 py-1 rounded-full">
                        <CheckCircle2 className="w-3 h-3" /> Safe (&gt;85%)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-[#F8E7A9] px-2.5 py-1 rounded-full">
                        <AlertTriangle className="w-3 h-3" /> Monitor (75-80%)
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CONTINUOUS INTERNAL EVALUATION (CIE / IA) MATRIX */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8DDF5] shadow-xs">
        <h3 className="text-base font-bold text-[#252532] font-['Space_Grotesk'] mb-4">
          Continuous Internal Evaluation (CIE) Marks Breakdown
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {IA_SCORES.map((score) => (
            <div
              key={score.subjectCode}
              className="p-4 rounded-2xl bg-[#F8F7FB] border border-[#E8DDF5] space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#7c51b0]">
                  {score.subjectCode}
                </span>
                <span className="text-xs font-extrabold text-[#252532]">
                  Avg: {score.average} / {score.maxMarks}
                </span>
              </div>
              <h4 className="text-xs font-bold text-[#252532] truncate">
                {score.subjectName}
              </h4>
              <div className="flex items-center justify-between text-xs text-neutral-600 pt-2 border-t border-[#E8DDF5]">
                <span>IA-1: <strong>{score.ia1} / 30</strong></span>
                <span>IA-2: <strong>{score.ia2} / 30</strong></span>
                <span className="text-emerald-700 font-bold">
                  {score.trend === 'up' ? '↗ Improved' : '→ Consistent'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
