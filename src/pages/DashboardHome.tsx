import React, { useState } from 'react';
import { useOutletContext, Link, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  BookOpen,
  FileCheck2,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Download,
  Eye,
  Send,
  Upload,
  Briefcase,
  Bell,
  ChevronRight,
  ExternalLink,
  Layers,
  FileText,
  Star,
  ShieldCheck,
  Flame,
} from 'lucide-react';
import {
  CURRENT_STUDENT,
  ATTENDANCE_LIST,
  IA_SCORES,
  ASSIGNMENTS,
  ACADEMIC_RESOURCES,
  ANNOUNCEMENTS,
  INTERNSHIPS,
  AI_KNOWLEDGE_BASE,
} from '../data/mockData';
import { AcademicResource, Assignment } from '../types';
import { Modal } from '../components/Modal';

export const DashboardHome: React.FC = () => {
  const { searchQuery } = useOutletContext<{ searchQuery: string }>();
  const navigate = useNavigate();

  // Resource preview modal state
  const [selectedResource, setSelectedResource] = useState<AcademicResource | null>(null);
  const [downloadSuccessToast, setDownloadSuccessToast] = useState<string | null>(null);

  // Assignment submission modal state
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [submissionFileName, setSubmissionFileName] = useState('');
  const [submissionNote, setSubmissionNote] = useState('');
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  // AI Mini Widget State
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  // Handle Mini AI Query
  const handleAskAi = (promptText?: string) => {
    const query = promptText || aiQuestion;
    if (!query.trim()) return;

    setAiLoading(true);
    setAiAnswer(null);

    const lower = query.toLowerCase();
    let responseText = '';

    if (lower.includes('dijkstra') || lower.includes('algorithm') || lower.includes('daa')) {
      responseText = AI_KNOWLEDGE_BASE.dijkstra.answer;
    } else if (lower.includes('syllabus') || lower.includes('network') || lower.includes('module')) {
      responseText = AI_KNOWLEDGE_BASE.syllabus.answer;
    } else if (lower.includes('sgpa') || lower.includes('cgpa') || lower.includes('credit')) {
      responseText = AI_KNOWLEDGE_BASE.sgpa.answer;
    } else if (lower.includes('agile') || lower.includes('sprint') || lower.includes('assignment')) {
      responseText = AI_KNOWLEDGE_BASE.agile.answer;
    } else {
      responseText = `**JCET AI Academic Guidance on "${query}"**:\n\nBased on your 6th Sem Computer Science syllabus (VTU 2022 Scheme), this concept is covered under Module 2 & 3. Key exam focus areas include architectural diagrams, state flow models, and numerical problems. Please consult Dr. Srinivas's lecture notes in the Academic Resources tab for solved model questions.`;
    }

    setTimeout(() => {
      setAiAnswer(responseText);
      setAiLoading(false);
    }, 450);
  };

  // Filter resources and assignments by top search
  const filteredResources = ACADEMIC_RESOURCES.filter(
    (res) =>
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.subjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.subjectCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingAssignments = ASSIGNMENTS.filter((a) => a.status === 'pending');

  // Trigger download feedback
  const handleDownload = (res: AcademicResource) => {
    setDownloadSuccessToast(`Downloading "${res.title}" (${res.fileSize})...`);
    setTimeout(() => {
      setDownloadSuccessToast(null);
    }, 3500);
  };

  // Submit assignment simulation
  const handleAssignmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionFileName) return;
    setSubmissionSuccess(true);
    setTimeout(() => {
      setSubmissionSuccess(false);
      setSelectedAssignment(null);
      setSubmissionFileName('');
      setSubmissionNote('');
    }, 1800);
  };

  // Attendance summary metrics
  const totalAttended = ATTENDANCE_LIST.reduce((acc, curr) => acc + curr.attended, 0);
  const totalClasses = ATTENDANCE_LIST.reduce((acc, curr) => acc + curr.total, 0);
  const aggregateAttendance = ((totalAttended / totalClasses) * 100).toFixed(1);

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      
      {/* Toast notification */}
      {downloadSuccessToast && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#252532] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-xs sm:text-sm animate-in slide-in-from-bottom duration-200">
          <Download className="w-4 h-4 text-[#C8B4E8]" />
          <span>{downloadSuccessToast}</span>
        </div>
      )}

      {/* 1. WELCOME HERO CARD */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#E8DDF5]/80 via-white to-[#F8E7A9]/40 border border-[#E8DDF5] shadow-sm relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#C8B4E8]/30 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-[#D5EBE5]/40 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#E8DDF5] text-xs font-bold text-[#553b7d] shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>VTU Scheme 2022 • Odd Semester Active</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#252532] tracking-tight font-['Space_Grotesk']">
              Welcome back, {CURRENT_STUDENT.name}!
            </h1>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-neutral-600 font-medium">
              <span className="font-mono font-bold bg-[#252532] text-white px-2.5 py-0.5 rounded-lg text-xs">
                {CURRENT_STUDENT.usnOrId}
              </span>
              <span>•</span>
              <span className="text-[#252532] font-semibold">
                {CURRENT_STUDENT.semester}th Semester
              </span>
              <span>•</span>
              <span>{CURRENT_STUDENT.department}</span>
              <span>•</span>
              <span className="px-2 py-0.5 rounded-md bg-[#E8DDF5] text-[#553b7d] font-semibold text-xs">
                Section {CURRENT_STUDENT.section}
              </span>
            </div>
          </div>

          {/* Quick Metrics Badges in Hero */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="px-4 py-3 rounded-2xl bg-white border border-[#E8DDF5] text-center shadow-xs">
              <div className="text-xl font-extrabold text-[#252532] font-['Space_Grotesk']">
                {aggregateAttendance}%
              </div>
              <div className="text-[10px] uppercase font-bold text-neutral-500">
                Attendance
              </div>
            </div>

            <div className="px-4 py-3 rounded-2xl bg-white border border-[#E8DDF5] text-center shadow-xs">
              <div className="text-xl font-extrabold text-[#252532] font-['Space_Grotesk']">
                8.72
              </div>
              <div className="text-[10px] uppercase font-bold text-neutral-500">
                Current CGPA
              </div>
            </div>

            <div className="px-4 py-3 rounded-2xl bg-white border border-[#E8DDF5] text-center shadow-xs">
              <div className="text-xl font-extrabold text-[#7c51b0] font-['Space_Grotesk']">
                {pendingAssignments.length}
              </div>
              <div className="text-[10px] uppercase font-bold text-neutral-500">
                Due Tasks
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS & ANALYTICS OVERVIEW GRID (ATTENDANCE & IA PERFORMANCE) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Attendance Card (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white border border-[#E8DDF5] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#D5EBE5] flex items-center justify-center text-[#1b5e4f]">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#252532] font-['Space_Grotesk']">
                    Attendance Overview
                  </h3>
                  <p className="text-xs text-neutral-500">
                    VTU Mandatory Threshold: 75% | Aggregate: <strong>{aggregateAttendance}%</strong> ({totalAttended}/{totalClasses} hours)
                  </p>
                </div>
              </div>
              <Link
                to="/dashboard/track-record"
                className="text-xs font-bold text-[#7c51b0] hover:underline flex items-center gap-1"
              >
                <span>Full Ledger</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Subject Attendance Bars */}
            <div className="mt-4 space-y-3.5">
              {ATTENDANCE_LIST.slice(0, 4).map((sub) => (
                <div key={sub.code} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-neutral-800">
                      {sub.name} <span className="text-neutral-400 font-mono">({sub.code})</span>
                    </span>
                    <span
                      className={`font-bold ${
                        sub.percentage < 80 ? 'text-amber-600' : 'text-emerald-700'
                      }`}
                    >
                      {sub.percentage}% ({sub.attended}/{sub.total})
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-neutral-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        sub.percentage < 80 ? 'bg-[#F8E7A9]' : 'bg-[#C8B4E8]'
                      }`}
                      style={{ width: `${sub.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500">
            <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              All subjects safely above 75% exam eligibility
            </span>
            <span className="text-neutral-400">Updated: Nov 01, 2026</span>
          </div>
        </div>

        {/* IA Performance Overview Card (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-[#E8DDF5] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#E8DDF5] flex items-center justify-center text-[#553b7d]">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#252532] font-['Space_Grotesk']">
                    IA Performance
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Internal Assessment Scores (Out of 30)
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#F8E7A9] text-[#705809] text-[10px] font-bold">
                IA-1 & IA-2
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {IA_SCORES.slice(0, 4).map((ia) => (
                <div
                  key={ia.subjectCode}
                  className="p-2.5 rounded-2xl bg-[#F8F7FB] border border-[#E8DDF5]/80 flex items-center justify-between"
                >
                  <div>
                    <p className="text-xs font-bold text-[#252532] line-clamp-1">
                      {ia.subjectName}
                    </p>
                    <p className="text-[10px] text-neutral-500 font-mono">
                      {ia.subjectCode}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-xs font-extrabold text-[#252532]">
                        {ia.average} / {ia.maxMarks}
                      </span>
                      <span className="text-[10px] text-neutral-400 block">Avg</span>
                    </div>
                    <div className="w-8 h-8 rounded-xl bg-white border border-[#E8DDF5] flex items-center justify-center text-xs font-bold text-[#7c51b0]">
                      {ia.trend === 'up' ? '↗' : '→'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-neutral-100 text-center">
            <Link
              to="/dashboard/ia-papers"
              className="text-xs font-bold text-[#7c51b0] hover:underline"
            >
              Browse Past IA Papers & Blueprint Solutions →
            </Link>
          </div>
        </div>

      </section>

      {/* 3. PENDING ASSIGNMENTS & UPCOMING DEADLINES */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#F8E7A9] flex items-center justify-center text-[#705809]">
              <Clock className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-bold text-[#252532] font-['Space_Grotesk']">
              Pending Assignments & Deadlines
            </h2>
          </div>
          <Link
            to="/dashboard/assignments"
            className="text-xs font-bold text-[#7c51b0] hover:underline flex items-center gap-1"
          >
            <span>All Assignments</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ASSIGNMENTS.slice(0, 3).map((asg) => (
            <div
              key={asg.id}
              className="p-5 rounded-3xl bg-white border border-[#E8DDF5] shadow-xs hover:border-[#C8B4E8] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E8DDF5] text-[#553b7d]">
                    {asg.subjectCode}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      asg.status === 'submitted'
                        ? 'bg-[#D5EBE5] text-[#1b5e4f]'
                        : asg.daysRemaining <= 3
                        ? 'bg-rose-100 text-rose-700 animate-pulse'
                        : 'bg-[#F8E7A9] text-[#705809]'
                    }`}
                  >
                    {asg.status === 'submitted'
                      ? '✓ Submitted'
                      : `${asg.daysRemaining} days left`}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-[#252532] mb-1 line-clamp-1">
                  {asg.title}
                </h4>
                <p className="text-xs text-neutral-500 mb-2">
                  {asg.subjectName} • {asg.professor}
                </p>
                <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                  {asg.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-neutral-500">
                  Due: {asg.dueDate}
                </span>

                {asg.status === 'submitted' ? (
                  <span className="text-xs font-bold text-emerald-700 bg-[#D5EBE5] px-3 py-1 rounded-xl">
                    Score: {asg.score || 'Grading'}
                  </span>
                ) : (
                  <button
                    onClick={() => setSelectedAssignment(asg)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#C8B4E8] hover:bg-[#bba0e4] text-[#252532] text-xs font-bold transition-all shadow-2xs"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Submit</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. AI CHATBOT PREVIEW WITH SUGGESTED QUESTIONS */}
      <section className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E8DDF5] shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-neutral-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E8DDF5] flex items-center justify-center text-[#553b7d] shadow-2xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-[#252532] font-['Space_Grotesk']">
                  JCET AI Academic Assistant
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#D5EBE5] text-[#1b5e4f] text-[10px] font-bold">
                  VTU Grounded
                </span>
              </div>
              <p className="text-xs text-neutral-500">
                Instant doubt-solver for 6th Sem Computer Science syllabus and IA preparation
              </p>
            </div>
          </div>

          <Link
            to="/dashboard/ai-assistant"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7c51b0] hover:underline"
          >
            <span>Open Full Screen Chat</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Suggested Prompt Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
            Suggested Queries:
          </span>
          <button
            onClick={() => handleAskAi("Explain Dijkstra's Algorithm step-by-step for IA-2")}
            className="text-xs px-3 py-1.5 rounded-xl bg-[#F8F7FB] border border-[#E8DDF5] hover:bg-[#E8DDF5]/50 hover:border-[#C8B4E8] text-[#252532] font-medium transition-colors cursor-pointer text-left"
          >
            💡 Explain Dijkstra's Algorithm for IA-2
          </button>
          <button
            onClick={() => handleAskAi("What is the syllabus weightage for Computer Networks Module 3?")}
            className="text-xs px-3 py-1.5 rounded-xl bg-[#F8F7FB] border border-[#E8DDF5] hover:bg-[#E8DDF5]/50 hover:border-[#C8B4E8] text-[#252532] font-medium transition-colors cursor-pointer text-left"
          >
            📖 Computer Networks Module 3 Breakdown
          </button>
          <button
            onClick={() => handleAskAi("How to calculate VTU SGPA from credits?")}
            className="text-xs px-3 py-1.5 rounded-xl bg-[#F8F7FB] border border-[#E8DDF5] hover:bg-[#E8DDF5]/50 hover:border-[#C8B4E8] text-[#252532] font-medium transition-colors cursor-pointer text-left"
          >
            🧮 VTU SGPA Credit Calculator Formula
          </button>
          <button
            onClick={() => handleAskAi("Show tips for Agile Sprint Planning Assignment")}
            className="text-xs px-3 py-1.5 rounded-xl bg-[#F8F7FB] border border-[#E8DDF5] hover:bg-[#E8DDF5]/50 hover:border-[#C8B4E8] text-[#252532] font-medium transition-colors cursor-pointer text-left"
          >
            🚀 Agile Sprint Backlog Assignment Tips
          </button>
        </div>

        {/* Chat input box */}
        <div className="relative">
          <input
            type="text"
            value={aiQuestion}
            onChange={(e) => setAiQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAskAi();
            }}
            placeholder="Type your academic question (e.g., Explain subnetting CIDR or Agile scrum ceremonies)..."
            className="w-full pl-4 pr-14 py-3 rounded-2xl bg-[#F8F7FB] border border-[#E8DDF5] text-sm text-[#252532] placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#C8B4E8] focus:bg-white transition-all shadow-2xs"
          />
          <button
            onClick={() => handleAskAi()}
            disabled={aiLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-[#C8B4E8] hover:bg-[#b89fe0] text-[#252532] transition-colors disabled:opacity-50 cursor-pointer"
            aria-label="Send AI question"
          >
            {aiLoading ? (
              <div className="w-4 h-4 border-2 border-[#252532] border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* AI Answer Display */}
        {aiAnswer && (
          <div className="mt-4 p-4 rounded-2xl bg-[#F8F7FB] border border-[#C8B4E8] text-xs sm:text-sm text-neutral-800 animate-in fade-in leading-relaxed whitespace-pre-wrap">
            <div className="flex items-center gap-2 font-bold text-[#553b7d] mb-1">
              <Sparkles className="w-4 h-4" />
              <span>AI Academic Response:</span>
            </div>
            {aiAnswer}
          </div>
        )}
      </section>

      {/* 5. RECENT ACADEMIC RESOURCES (WITH PREVIEW / DOWNLOAD UI) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#C8B4E8] flex items-center justify-center text-[#252532]">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#252532] font-['Space_Grotesk']">
                Recent Academic Resources
              </h2>
              <p className="text-xs text-neutral-500">
                Course notes, question banks, and lab manuals uploaded by department faculty
              </p>
            </div>
          </div>
          <Link
            to="/dashboard/resources"
            className="text-xs font-bold text-[#7c51b0] hover:underline flex items-center gap-1"
          >
            <span>View All ({filteredResources.length})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredResources.slice(0, 3).map((res) => (
            <div
              key={res.id}
              className="p-5 rounded-3xl bg-white border border-[#E8DDF5] shadow-xs hover:border-[#C8B4E8] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E8DDF5] text-[#553b7d]">
                    {res.type}
                  </span>
                  <span className="text-[10px] font-mono font-medium text-neutral-500">
                    {res.fileSize} • {res.format}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-[#252532] group-hover:text-[#7c51b0] transition-colors line-clamp-1 mb-1">
                  {res.title}
                </h4>

                <p className="text-xs text-neutral-500 mb-2">
                  {res.subjectName} ({res.subjectCode})
                </p>

                <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                  {res.previewSnippet}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between">
                <div className="text-[11px] text-neutral-400">
                  By {res.uploadedBy}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedResource(res)}
                    className="p-1.5 rounded-xl bg-[#F8F7FB] hover:bg-[#E8DDF5] text-neutral-600 hover:text-[#252532] transition-colors"
                    title="Quick Preview"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDownload(res)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#D5EBE5] hover:bg-[#c2e4dc] text-[#195244] text-xs font-bold transition-all shadow-2xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CAMPUS ANNOUNCEMENTS & INTERNSHIPS STRIP */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Campus Announcements */}
        <div className="p-6 rounded-3xl bg-white border border-[#E8DDF5] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#D5EBE5] flex items-center justify-center text-[#1b5e4f]">
                  <Bell className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-[#252532] font-['Space_Grotesk']">
                  Campus Announcements
                </h3>
              </div>
              <Link
                to="/dashboard/announcements"
                className="text-xs font-bold text-[#7c51b0] hover:underline"
              >
                View Notice Board
              </Link>
            </div>

            <div className="space-y-3">
              {ANNOUNCEMENTS.slice(0, 2).map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-[#F8F7FB] border border-[#E8DDF5] hover:border-[#C8B4E8] transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E8DDF5] text-[#553b7d]">
                      {item.category}
                    </span>
                    <span className="text-[10px] text-neutral-400 font-mono">
                      {item.date}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#252532] mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-neutral-600 line-clamp-2">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-neutral-100 text-xs text-neutral-500">
            Official Notices authenticated by Controller of Examinations & Dean Office.
          </div>
        </div>

        {/* Internship Opportunities */}
        <div className="p-6 rounded-3xl bg-white border border-[#E8DDF5] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#F8E7A9] flex items-center justify-center text-[#705809]">
                  <Briefcase className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-[#252532] font-['Space_Grotesk']">
                  Internship Opportunities
                </h3>
              </div>
              <Link
                to="/dashboard/internships"
                className="text-xs font-bold text-[#7c51b0] hover:underline"
              >
                Browse All
              </Link>
            </div>

            <div className="space-y-3">
              {INTERNSHIPS.slice(0, 2).map((intern) => (
                <div
                  key={intern.id}
                  className="p-3.5 rounded-2xl bg-[#F8F7FB] border border-[#E8DDF5] hover:border-[#C8B4E8] transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#252532]">
                      {intern.company}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-800 bg-[#D5EBE5] px-2 py-0.5 rounded-full">
                      {intern.stipend}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-neutral-700">
                    {intern.role}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-[10px] text-neutral-500">
                    <span>{intern.location}</span>
                    <span>•</span>
                    <span>Min CGPA: {intern.minCgpa}</span>
                    <span>•</span>
                    <span>Deadline: {intern.deadline}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-neutral-100 text-xs text-neutral-500">
            VTU recognized industrial internships for 6th/7th Semester credits.
          </div>
        </div>

      </section>

      {/* RESOURCE PREVIEW MODAL */}
      <Modal
        isOpen={!!selectedResource}
        onClose={() => setSelectedResource(null)}
        title={selectedResource?.title || 'Resource Preview'}
        subtitle={`${selectedResource?.subjectName} (${selectedResource?.subjectCode}) • ${selectedResource?.type}`}
      >
        {selectedResource && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-[#F8F7FB] border border-[#E8DDF5] space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-600">
                <span>Faculty: <strong>{selectedResource.uploadedBy}</strong></span>
                <span>Date: <strong>{selectedResource.uploadDate}</strong></span>
                <span>Format: <strong>{selectedResource.format} ({selectedResource.fileSize})</strong></span>
              </div>
              <p className="text-xs text-neutral-700 leading-relaxed pt-2 border-t border-[#E8DDF5]/80">
                {selectedResource.previewSnippet}
              </p>
            </div>

            {/* Document preview simulation */}
            <div className="p-6 rounded-2xl border-2 border-dashed border-[#E8DDF5] bg-white text-center space-y-2">
              <FileText className="w-10 h-10 text-[#7c51b0] mx-auto" />
              <div className="text-sm font-bold text-[#252532]">
                VTU Certified Study Material (PDF)
              </div>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                Indexed for JCET 2022 Scheme curriculum. Contains chapter breakdowns, formula cheatsheet, and model questions.
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedResource(null)}
                className="px-4 py-2 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-600"
              >
                Close Preview
              </button>
              <button
                onClick={() => {
                  handleDownload(selectedResource);
                  setSelectedResource(null);
                }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#C8B4E8] hover:bg-[#b89fe0] text-xs font-bold text-[#252532]"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download {selectedResource.fileSize}</span>
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* ASSIGNMENT SUBMISSION MODAL */}
      <Modal
        isOpen={!!selectedAssignment}
        onClose={() => {
          setSelectedAssignment(null);
          setSubmissionSuccess(false);
        }}
        title={`Submit: ${selectedAssignment?.title}`}
        subtitle={`${selectedAssignment?.subjectName} (${selectedAssignment?.subjectCode}) • Max Score: ${selectedAssignment?.maxScore} pts`}
      >
        {selectedAssignment && (
          <div>
            {submissionSuccess ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#D5EBE5] text-[#1b5e4f] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-base font-bold text-[#252532]">
                  Assignment Submitted Successfully!
                </h4>
                <p className="text-xs text-neutral-600">
                  Your PDF file has been registered with a VTU digital submission timestamp. 
                  {selectedAssignment.professor} has been notified for evaluation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAssignmentSubmit} className="space-y-4">
                <div className="p-3.5 rounded-2xl bg-[#F8F7FB] border border-[#E8DDF5] text-xs text-neutral-600">
                  <span className="font-bold text-[#252532] block mb-1">Instructions:</span>
                  {selectedAssignment.description}
                </div>

                {/* Upload box */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Upload Solution PDF / ZIP Archive
                  </label>
                  <div className="border-2 border-dashed border-[#C8B4E8] rounded-2xl p-6 text-center bg-white hover:bg-[#F8F7FB] transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-[#7c51b0] mx-auto mb-2" />
                    <p className="text-xs font-semibold text-[#252532]">
                      {submissionFileName || 'Click to select assignment file (PDF, ZIP, DOCX)'}
                    </p>
                    <p className="text-[10px] text-neutral-400 mt-0.5">
                      Max file size: 25 MB • Naming: USN_SubjectCode_AssignmentNumber.pdf
                    </p>
                    <div className="mt-3">
                      <button
                        type="button"
                        onClick={() => setSubmissionFileName(`${CURRENT_STUDENT.usnOrId}_${selectedAssignment.subjectCode}_Asgn.pdf`)}
                        className="px-3 py-1 rounded-lg bg-[#E8DDF5] text-[11px] font-bold text-[#553b7d] hover:bg-[#dfd0f1]"
                      >
                        ⚡ Simulate Auto-Attaching "{CURRENT_STUDENT.usnOrId}_{selectedAssignment.subjectCode}_Asgn.pdf"
                      </button>
                    </div>
                  </div>
                </div>

                {/* Student note */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Student Submission Note (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={submissionNote}
                    onChange={(e) => setSubmissionNote(e.target.value)}
                    placeholder="e.g. Attached test case traces and Wireshark capture diagrams in appendix."
                    className="w-full px-3 py-2 rounded-xl bg-[#F8F7FB] border border-[#E8DDF5] text-xs text-[#252532] focus:outline-none focus:ring-2 focus:ring-[#C8B4E8]"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedAssignment(null)}
                    className="px-4 py-2 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!submissionFileName}
                    className="px-5 py-2 rounded-xl bg-[#C8B4E8] hover:bg-[#b89fe0] text-xs font-bold text-[#252532] disabled:opacity-40"
                  >
                    Confirm Submission
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
