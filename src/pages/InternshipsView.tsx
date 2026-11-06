import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  Briefcase,
  MapPin,
  Calendar,
  CheckCircle2,
  ExternalLink,
  Award,
  Filter,
  Send,
} from 'lucide-react';
import { INTERNSHIPS, CURRENT_STUDENT } from '../data/mockData';
import { Internship } from '../types';
import { Modal } from '../components/Modal';

export const InternshipsView: React.FC = () => {
  const { searchQuery } = useOutletContext<{ searchQuery: string }>();
  const [internshipsList, setInternshipsList] = useState<Internship[]>(INTERNSHIPS);
  const [selectedIntern, setSelectedIntern] = useState<Internship | null>(null);
  const [applySuccess, setApplySuccess] = useState(false);
  const [appliedRole, setAppliedRole] = useState<string | null>(null);

  const filtered = internshipsList.filter(
    (i) =>
      i.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleApply = (intern: Internship) => {
    setSelectedIntern(intern);
    setApplySuccess(false);
  };

  const handleConfirmApply = () => {
    if (!selectedIntern) return;
    setApplySuccess(true);
    setTimeout(() => {
      setInternshipsList((prev) =>
        prev.map((item) =>
          item.id === selectedIntern.id ? { ...item, applied: true } : item
        )
      );
      setAppliedRole(selectedIntern.role);
      setSelectedIntern(null);
      setApplySuccess(false);
    }, 1200);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Toast */}
      {appliedRole && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#252532] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-xs sm:text-sm">
          <CheckCircle2 className="w-4 h-4 text-[#C8B4E8]" />
          <span>Application forwarded to Training & Placement Cell for {appliedRole}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8DDF5] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#1b5e4f]">
              VTU Training & Placement Cell
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#252532] font-['Space_Grotesk'] mt-1">
            Industrial Internship Opportunities
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
            Verified company internships eligible for 6th & 7th semester academic credits (21CS75/85).
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#F8E7FB] border border-[#E8DDF5] text-xs font-semibold">
          <span>Student CGPA:</span>
          <strong className="text-[#553b7d]">8.72 (Eligible for all postings)</strong>
        </div>
      </div>

      {/* Internships Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-3xl bg-white border border-[#E8DDF5] shadow-xs hover:border-[#C8B4E8] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-base font-bold text-[#252532] font-['Space_Grotesk']">
                  {item.company}
                </span>
                <span className="text-xs font-bold text-emerald-800 bg-[#D5EBE5] px-3 py-1 rounded-full">
                  {item.stipend}
                </span>
              </div>

              <h3 className="text-sm sm:text-base font-semibold text-[#7c51b0] mb-2">
                {item.role}
              </h3>

              <div className="grid grid-cols-2 gap-2 text-xs text-neutral-600 mb-4 bg-[#F8F7FB] p-3 rounded-2xl border border-[#E8DDF5]">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{item.location} ({item.type})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Duration: {item.duration}</span>
                </div>
                <div>Min CGPA: <strong>{item.minCgpa}</strong></div>
                <div>Deadline: <strong className="text-rose-600">{item.deadline}</strong></div>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {item.skills.map((s) => (
                  <span
                    key={s}
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-neutral-100 text-neutral-600"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
              <span className="text-[11px] text-neutral-400">
                Eligible: {item.eligibleBranches.join(', ')}
              </span>

              {item.applied ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-[#D5EBE5] px-4 py-2 rounded-xl">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Applied
                </span>
              ) : (
                <button
                  onClick={() => handleApply(item)}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#C8B4E8] hover:bg-[#b89fe0] text-[#252532] text-xs font-bold transition-all shadow-2xs cursor-pointer active:scale-95"
                >
                  <span>Apply Now</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Apply Modal */}
      <Modal
        isOpen={!!selectedIntern}
        onClose={() => setSelectedIntern(null)}
        title={`Apply to ${selectedIntern?.company}`}
        subtitle={selectedIntern?.role}
      >
        {selectedIntern && (
          <div className="space-y-4">
            {applySuccess ? (
              <div className="text-center py-6 space-y-2">
                <div className="w-12 h-12 rounded-full bg-[#D5EBE5] text-[#1b5e4f] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="font-bold text-[#252532]">Application Registered!</h4>
                <p className="text-xs text-neutral-500">
                  Transferred profile details to {selectedIntern.company} portal via JCET Training & Placement Cell.
                </p>
              </div>
            ) : (
              <div>
                <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                  Your academic records from JCET-Bridge will be transmitted to the company recruiter:
                </p>

                <div className="p-4 rounded-2xl bg-[#F8F7FB] border border-[#E8DDF5] space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span>Student:</span>
                    <strong>{CURRENT_STUDENT.name} ({CURRENT_STUDENT.usnOrId})</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Branch & Sem:</span>
                    <span>{CURRENT_STUDENT.department} • 6th Sem</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cumulative CGPA:</span>
                    <strong className="text-emerald-700">8.72 (Criteria: {selectedIntern.minCgpa})</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>College Email:</span>
                    <span>{CURRENT_STUDENT.email}</span>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <button
                    onClick={() => setSelectedIntern(null)}
                    className="px-4 py-2 rounded-xl border border-neutral-200 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmApply}
                    className="px-5 py-2 rounded-xl bg-[#C8B4E8] text-xs font-bold text-[#252532]"
                  >
                    Confirm Application
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>

    </div>
  );
};
