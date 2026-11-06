import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  BookOpen,
  Download,
  Eye,
  Filter,
  Search,
  FileText,
  Star,
  CheckCircle2,
  FolderOpen,
} from 'lucide-react';
import { ACADEMIC_RESOURCES } from '../data/mockData';
import { AcademicResource } from '../types';
import { Modal } from '../components/Modal';

export const ResourcesView: React.FC = () => {
  const { searchQuery } = useOutletContext<{ searchQuery: string }>();
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedDept, setSelectedDept] = useState<string>('CSE');
  const [selectedResource, setSelectedResource] = useState<AcademicResource | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const resourceTypes = ['All', 'Lecture Notes', 'Question Bank', 'Lab Manual', 'Syllabus', 'Model Solution'];

  const filtered = ACADEMIC_RESOURCES.filter((res) => {
    const matchesSearch =
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.subjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.subjectCode.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'All' || res.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleDownload = (res: AcademicResource) => {
    setToastMsg(`Downloaded "${res.title}" (${res.fileSize})`);
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
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#553b7d]">
              Verified VTU Repository
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#252532] font-['Space_Grotesk'] mt-1">
            Academic Resources & Question Banks
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
            Peer-reviewed lecture notes, VTU model question papers, and laboratory experiment guides.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-neutral-500">Dept:</span>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-[#F8F7FB] border border-[#E8DDF5] text-xs font-bold text-[#252532]"
          >
            <option value="CSE">CSE (Computer Science)</option>
            <option value="ISE">ISE (Info Science)</option>
            <option value="ECE">ECE (Electronics)</option>
            <option value="AI&DS">AI & Data Science</option>
          </select>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {resourceTypes.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedType === type
                ? 'bg-[#C8B4E8] text-[#252532] shadow-xs'
                : 'bg-white border border-[#E8DDF5] text-neutral-600 hover:bg-[#F8F7FB]'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((res) => (
          <div
            key={res.id}
            className="p-5 rounded-3xl bg-white border border-[#E8DDF5] shadow-xs hover:border-[#C8B4E8] transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E8DDF5] text-[#553b7d]">
                  {res.type}
                </span>
                <span className="text-[10px] font-mono text-neutral-400">
                  {res.format} • {res.fileSize}
                </span>
              </div>

              <h3 className="text-sm font-bold text-[#252532] group-hover:text-[#7c51b0] transition-colors line-clamp-1 mb-1">
                {res.title}
              </h3>

              <div className="text-xs text-neutral-500 mb-2 font-medium">
                {res.subjectName} ({res.subjectCode}) • Sem {res.semester}
              </div>

              <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                {res.previewSnippet}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between">
              <div className="text-[11px] text-neutral-400">
                Uploaded by {res.uploadedBy}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedResource(res)}
                  className="p-1.5 rounded-xl bg-[#F8F7FB] hover:bg-[#E8DDF5] text-neutral-600 hover:text-[#252532] transition-colors"
                  title="Preview"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDownload(res)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#C8B4E8] hover:bg-[#b89fe0] text-[#252532] text-xs font-bold transition-all shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Get PDF</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="p-12 text-center bg-white rounded-3xl border border-[#E8DDF5]">
          <FolderOpen className="w-12 h-12 text-neutral-300 mx-auto mb-2" />
          <h4 className="font-bold text-sm text-[#252532]">No matching resources found</h4>
          <p className="text-xs text-neutral-500 mt-1">Try resetting the filter pills or clear the search query.</p>
        </div>
      )}

      {/* Preview Modal */}
      <Modal
        isOpen={!!selectedResource}
        onClose={() => setSelectedResource(null)}
        title={selectedResource?.title || 'Resource'}
        subtitle={`${selectedResource?.subjectName} (${selectedResource?.subjectCode})`}
      >
        {selectedResource && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-[#F8F7FB] border border-[#E8DDF5] space-y-1.5 text-xs text-neutral-700">
              <p><strong>Faculty Incharge:</strong> {selectedResource.uploadedBy}</p>
              <p><strong>Upload Date:</strong> {selectedResource.uploadDate}</p>
              <p><strong>Curriculum:</strong> VTU 2022 Scheme</p>
              <p className="pt-2 border-t border-[#E8DDF5]"><strong>Summary:</strong> {selectedResource.previewSnippet}</p>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedResource(null)}
                className="px-4 py-2 rounded-xl border border-neutral-200 text-xs font-semibold"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleDownload(selectedResource);
                  setSelectedResource(null);
                }}
                className="px-4 py-2 rounded-xl bg-[#C8B4E8] text-xs font-bold text-[#252532]"
              >
                Download ({selectedResource.fileSize})
              </button>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};
