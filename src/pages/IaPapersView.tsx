import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  FileCheck2,
  Download,
  Eye,
  CheckCircle2,
  Calendar,
  Clock,
  Award,
  Layers,
} from 'lucide-react';
import { IA_PAPERS } from '../data/mockData';
import { IaPaper } from '../types';
import { Modal } from '../components/Modal';

export const IaPapersView: React.FC = () => {
  const { searchQuery } = useOutletContext<{ searchQuery: string }>();
  const [selectedScheme, setSelectedScheme] = useState('All');
  const [selectedIaType, setSelectedIaType] = useState('All');
  const [previewPaper, setPreviewPaper] = useState<IaPaper | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const filtered = IA_PAPERS.filter((p) => {
    const matchesSearch =
      p.subjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subjectCode.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesScheme = selectedScheme === 'All' || p.scheme === selectedScheme;
    const matchesIaType = selectedIaType === 'All' || p.iaType === selectedIaType;
    return matchesSearch && matchesScheme && matchesIaType;
  });

  const handleDownloadPaper = (paper: IaPaper) => {
    setToastMsg(`Downloaded ${paper.iaType} Question Paper: ${paper.subjectCode}`);
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#252532] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-xs sm:text-sm">
          <Download className="w-4 h-4 text-[#C8B4E8]" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8DDF5] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#553b7d]">
              Examination Controller Archive
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#252532] font-['Space_Grotesk'] mt-1">
            Internal Assessment (IA) Question Papers
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
            Previous IA-1, IA-2, IA-3 test papers and official VTU model solutions with marking rubrics.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedIaType}
            onChange={(e) => setSelectedIaType(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-[#F8F7FB] border border-[#E8DDF5] text-xs font-bold text-[#252532]"
          >
            <option value="All">All Tests (IA 1, 2, 3)</option>
            <option value="IA-1">IA-1 Only</option>
            <option value="IA-2">IA-2 Only</option>
            <option value="Semester End">Semester End VTU</option>
          </select>

          <select
            value={selectedScheme}
            onChange={(e) => setSelectedScheme(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-[#F8F7FB] border border-[#E8DDF5] text-xs font-bold text-[#252532]"
          >
            <option value="All">All Schemes</option>
            <option value="2022 Scheme">2022 Scheme</option>
            <option value="2021 Scheme">2021 Scheme</option>
          </select>
        </div>
      </div>

      {/* Grid of IA Papers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((paper) => (
          <div
            key={paper.id}
            className="p-5 rounded-3xl bg-white border border-[#E8DDF5] shadow-xs hover:border-[#C8B4E8] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#E8DDF5] text-[#553b7d]">
                  {paper.iaType}
                </span>
                <span className="text-[10px] font-mono text-neutral-500">
                  {paper.scheme}
                </span>
              </div>

              <h3 className="text-base font-bold text-[#252532] mb-1 line-clamp-1">
                {paper.subjectName}
              </h3>
              <p className="text-xs font-mono font-semibold text-[#7c51b0] mb-3">
                {paper.subjectCode} • Sem {paper.semester}
              </p>

              <div className="p-3 rounded-2xl bg-[#F8F7FB] border border-[#E8DDF5] space-y-1.5 text-xs text-neutral-600 mb-4">
                <div className="flex justify-between">
                  <span>Max Marks:</span>
                  <span className="font-bold text-[#252532]">{paper.maxMarks} marks</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-bold text-[#252532]">{paper.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span>Academic Year:</span>
                  <span>{paper.academicYear}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
              <div>
                {paper.hasSolutionKey ? (
                  <span className="text-[10px] font-bold text-emerald-700 bg-[#D5EBE5] px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Model Solution
                  </span>
                ) : (
                  <span className="text-[10px] text-neutral-400">Question Paper</span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPreviewPaper(paper)}
                  className="p-1.5 rounded-xl bg-[#F8F7FB] hover:bg-[#E8DDF5] text-neutral-600 hover:text-[#252532] transition-colors"
                  title="View Details"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDownloadPaper(paper)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#C8B4E8] hover:bg-[#baa0e2] text-[#252532] text-xs font-bold transition-all shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF ({paper.fileSize})</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      <Modal
        isOpen={!!previewPaper}
        onClose={() => setPreviewPaper(null)}
        title={`${previewPaper?.subjectName} (${previewPaper?.iaType})`}
        subtitle={`Course Code: ${previewPaper?.subjectCode} • ${previewPaper?.scheme}`}
      >
        {previewPaper && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-[#F8F7FB] border border-[#E8DDF5] text-xs space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <p><strong>Evaluation:</strong> {previewPaper.iaType} (CIE Component)</p>
                <p><strong>Max Marks:</strong> {previewPaper.maxMarks}</p>
                <p><strong>Duration:</strong> {previewPaper.duration}</p>
                <p><strong>Scheme:</strong> {previewPaper.scheme}</p>
              </div>
              <p className="pt-2 border-t border-[#E8DDF5] text-neutral-600">
                Official question paper structured adhering to VTU Bloom's Taxonomy (L1 Remember, L2 Understand, L3 Apply, L4 Analyze).
              </p>
            </div>

            <div className="p-5 rounded-2xl border-2 border-dashed border-[#E8DDF5] text-center space-y-1">
              <Award className="w-8 h-8 text-[#7c51b0] mx-auto mb-1" />
              <p className="text-xs font-bold text-[#252532]">
                Includes Model Answer Key with Step-by-Step Marking Scheme
              </p>
              <p className="text-[11px] text-neutral-500">
                Prepared by JCET Senior Faculty & Board of Examiners
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setPreviewPaper(null)}
                className="px-4 py-2 rounded-xl border border-neutral-200 text-xs font-semibold"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleDownloadPaper(previewPaper);
                  setPreviewPaper(null);
                }}
                className="px-5 py-2 rounded-xl bg-[#C8B4E8] text-xs font-bold text-[#252532]"
              >
                Download Paper ({previewPaper.fileSize})
              </button>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};
