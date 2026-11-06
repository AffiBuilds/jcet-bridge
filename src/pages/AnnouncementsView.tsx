import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  Bell,
  Calendar,
  AlertCircle,
  FileText,
  Download,
  Share2,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import { ANNOUNCEMENTS } from '../data/mockData';
import { Announcement } from '../types';
import { Modal } from '../components/Modal';

export const AnnouncementsView: React.FC = () => {
  const { searchQuery } = useOutletContext<{ searchQuery: string }>();
  const [selectedNotice, setSelectedNotice] = useState<Announcement | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const filtered = ANNOUNCEMENTS.filter(
    (a) =>
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownloadNotice = (filename: string) => {
    setToastMsg(`Downloaded official notification: ${filename}`);
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
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-rose-800">
              Campus Notice Board
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#252532] font-['Space_Grotesk'] mt-1">
            Official JCET Announcements
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
            Verified circulars from Examination Cell, Office of Dean Academics, and Department HoDs.
          </p>
        </div>

        <span className="text-xs px-3 py-1.5 rounded-xl bg-[#F8F7FB] border border-[#E8DDF5] font-semibold text-neutral-600">
          Last Synchronized: Nov 02, 2026
        </span>
      </div>

      {/* Notices Stream */}
      <div className="space-y-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`p-6 rounded-3xl bg-white border transition-all ${
              item.isUrgent
                ? 'border-rose-200 shadow-sm'
                : 'border-[#E8DDF5] shadow-xs hover:border-[#C8B4E8]'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    item.isUrgent
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-[#D5EBE5] text-[#1b5e4f]'
                  }`}
                >
                  {item.category}
                </span>

                {item.isUrgent && (
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-600 text-white flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Urgent Notice
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <Calendar className="w-3.5 h-3.5" />
                <span>{item.date}</span>
              </div>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-[#252532] mb-2 font-['Space_Grotesk']">
              {item.title}
            </h3>

            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4">
              {item.content}
            </p>

            <div className="pt-3 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-neutral-400">
                Issued by: <strong className="text-neutral-700">{item.author}</strong>
              </div>

              <div className="flex items-center gap-2">
                {item.attachmentName && (
                  <button
                    onClick={() => handleDownloadNotice(item.attachmentName!)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F8F7FB] border border-[#E8DDF5] hover:bg-[#E8DDF5] text-xs font-semibold text-[#252532] transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Circular PDF</span>
                  </button>
                )}

                <button
                  onClick={() => setSelectedNotice(item)}
                  className="px-4 py-1.5 rounded-xl bg-[#C8B4E8] hover:bg-[#baa0e2] text-xs font-bold text-[#252532] transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Notice Detail Modal */}
      <Modal
        isOpen={!!selectedNotice}
        onClose={() => setSelectedNotice(null)}
        title={selectedNotice?.title || 'Notice'}
        subtitle={`Issued by ${selectedNotice?.author} on ${selectedNotice?.date}`}
      >
        {selectedNotice && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-[#F8F7FB] border border-[#E8DDF5] text-xs sm:text-sm text-neutral-700 leading-relaxed">
              {selectedNotice.content}
            </div>

            {selectedNotice.attachmentName && (
              <div className="p-4 rounded-2xl border border-dashed border-[#C8B4E8] flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs">
                  <FileText className="w-4 h-4 text-[#7c51b0]" />
                  <span className="font-mono">{selectedNotice.attachmentName}</span>
                </div>
                <button
                  onClick={() => {
                    handleDownloadNotice(selectedNotice.attachmentName!);
                    setSelectedNotice(null);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#D5EBE5] text-xs font-bold text-[#195244]"
                >
                  Download Circular
                </button>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedNotice(null)}
                className="px-5 py-2 rounded-xl bg-neutral-100 text-xs font-semibold text-neutral-700"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};
