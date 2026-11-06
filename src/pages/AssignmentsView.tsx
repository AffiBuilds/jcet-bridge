import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  ClipboardList,
  Clock,
  CheckCircle2,
  AlertCircle,
  Upload,
  FileCheck2,
  Calendar,
  FileText,
  Download,
} from 'lucide-react';
import { ASSIGNMENTS, CURRENT_STUDENT } from '../data/mockData';
import { Assignment } from '../types';
import { Modal } from '../components/Modal';

export const AssignmentsView: React.FC = () => {
  const { searchQuery } = useOutletContext<{ searchQuery: string }>();
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'submitted'>('all');
  const [selectedAsgn, setSelectedAsgn] = useState<Assignment | null>(null);
  const [uploadFileName, setUploadFileName] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [assignmentsList, setAssignmentsList] = useState<Assignment[]>(ASSIGNMENTS);

  const filtered = assignmentsList.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.subjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.subjectCode.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'pending' && a.status === 'pending') ||
      (activeTab === 'submitted' && a.status === 'submitted');
    return matchesSearch && matchesTab;
  });

  const handleConfirmSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFileName || !selectedAsgn) return;

    setSubmitSuccess(true);
    setTimeout(() => {
      setAssignmentsList((prev) =>
        prev.map((item) =>
          item.id === selectedAsgn.id
            ? {
                ...item,
                status: 'submitted',
                submittedFile: uploadFileName,
                submissionDate: 'Just now',
                score: 'Under Review',
              }
            : item
        )
      );
      setSubmitSuccess(false);
      setSelectedAsgn(null);
      setUploadFileName('');
    }, 1200);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8DDF5] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#705809]">
              Internal Assessment Submissions
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#252532] font-['Space_Grotesk'] mt-1">
            Course Assignments & Lab Reports
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
            Submit coursework before deadlines to secure full continuous internal evaluation (CIE) marks.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1 rounded-2xl bg-[#F8F7FB] border border-[#E8DDF5] self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'all'
                ? 'bg-[#C8B4E8] text-[#252532] shadow-xs'
                : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            All ({assignmentsList.length})
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'pending'
                ? 'bg-[#C8B4E8] text-[#252532] shadow-xs'
                : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            Pending ({assignmentsList.filter((a) => a.status === 'pending').length})
          </button>
          <button
            onClick={() => setActiveTab('submitted')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'submitted'
                ? 'bg-[#C8B4E8] text-[#252532] shadow-xs'
                : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            Submitted ({assignmentsList.filter((a) => a.status === 'submitted').length})
          </button>
        </div>
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {filtered.map((asg) => (
          <div
            key={asg.id}
            className="p-6 rounded-3xl bg-white border border-[#E8DDF5] shadow-xs hover:border-[#C8B4E8] transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-lg bg-[#E8DDF5] text-[#553b7d]">
                  {asg.subjectCode}
                </span>
                <span className="text-xs font-semibold text-neutral-600">
                  {asg.subjectName}
                </span>
                <span className="text-neutral-300">•</span>
                <span className="text-xs text-neutral-500">{asg.professor}</span>
                
                {/* Priority Chip */}
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    asg.priority === 'High'
                      ? 'bg-rose-100 text-rose-800'
                      : asg.priority === 'Medium'
                      ? 'bg-[#F8E7A9] text-[#705809]'
                      : 'bg-[#D5EBE5] text-[#1b5e4f]'
                  }`}
                >
                  {asg.priority} Priority
                </span>
              </div>

              <h3 className="text-base font-bold text-[#252532] font-['Space_Grotesk']">
                {asg.title}
              </h3>

              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-3xl">
                {asg.description}
              </p>

              {asg.status === 'submitted' && asg.submittedFile && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F8F7FB] border border-[#E8DDF5] text-xs font-mono text-neutral-700">
                  <FileText className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Submitted: {asg.submittedFile}</span>
                  <span className="text-neutral-400">({asg.submissionDate})</span>
                </div>
              )}
            </div>

            {/* Right Status & Action */}
            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 shrink-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
              <div className="text-right">
                <div className="text-xs font-semibold text-neutral-500">
                  Due: <strong className="text-[#252532]">{asg.dueDate}</strong>
                </div>
                <div className="text-[11px] text-neutral-400">
                  Max Marks: {asg.maxScore}
                </div>
              </div>

              {asg.status === 'submitted' ? (
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#D5EBE5] text-[#195244] text-xs font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{asg.score || 'Graded'}</span>
                  </span>
                </div>
              ) : (
                <button
                  onClick={() => setSelectedAsgn(asg)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C8B4E8] hover:bg-[#b89fe0] text-[#252532] text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
                >
                  <Upload className="w-4 h-4" />
                  <span>Submit Work</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Submission Modal */}
      <Modal
        isOpen={!!selectedAsgn}
        onClose={() => setSelectedAsgn(null)}
        title={`Submit: ${selectedAsgn?.title}`}
        subtitle={`${selectedAsgn?.subjectName} (${selectedAsgn?.subjectCode})`}
      >
        {selectedAsgn && (
          <div>
            {submitSuccess ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#D5EBE5] text-[#1b5e4f] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="font-bold text-[#252532]">Submitted Successfully!</h4>
                <p className="text-xs text-neutral-500">
                  Uploaded {uploadFileName} to {selectedAsgn.professor}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleConfirmSubmit} className="space-y-4">
                <div className="p-3.5 rounded-2xl bg-[#F8F7FB] border border-[#E8DDF5] text-xs text-neutral-600">
                  <span className="font-bold text-[#252532] block mb-1">Assignment Scope:</span>
                  {selectedAsgn.description}
                </div>

                <div className="border-2 border-dashed border-[#C8B4E8] rounded-2xl p-6 text-center bg-white">
                  <Upload className="w-8 h-8 text-[#7c51b0] mx-auto mb-2" />
                  <p className="text-xs font-semibold text-[#252532]">
                    {uploadFileName || 'Choose solution PDF or ZIP archive'}
                  </p>
                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={() =>
                        setUploadFileName(
                          `${CURRENT_STUDENT.usnOrId}_${selectedAsgn.subjectCode}_Asgn.pdf`
                        )
                      }
                      className="px-3 py-1.5 rounded-xl bg-[#E8DDF5] text-xs font-bold text-[#553b7d] hover:bg-[#dfd0f1]"
                    >
                      ⚡ Auto-Select "{CURRENT_STUDENT.usnOrId}_{selectedAsgn.subjectCode}_Asgn.pdf"
                    </button>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedAsgn(null)}
                    className="px-4 py-2 rounded-xl border border-neutral-200 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!uploadFileName}
                    className="px-5 py-2 rounded-xl bg-[#C8B4E8] text-xs font-bold text-[#252532] disabled:opacity-40"
                  >
                    Upload & Submit
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </Modal>

    </div>
  );
};
