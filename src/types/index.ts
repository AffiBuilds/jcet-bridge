export type UserRole = 'student' | 'faculty' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  usnOrId: string;
  email: string;
  department: string;
  semester?: number;
  section?: string;
  avatarUrl?: string;
  verified: boolean;
}

export interface AttendanceSubject {
  code: string;
  name: string;
  faculty: string;
  attended: number;
  total: number;
  percentage: number;
  status: 'safe' | 'warning' | 'critical';
}

export interface IaScore {
  subjectCode: string;
  subjectName: string;
  ia1: number; // out of 30 or 25
  ia2: number;
  ia3?: number;
  maxMarks: number;
  average: number;
  trend: 'up' | 'steady' | 'down';
}

export interface Assignment {
  id: string;
  title: string;
  subjectCode: string;
  subjectName: string;
  professor: string;
  dueDate: string;
  daysRemaining: number;
  priority: 'High' | 'Medium' | 'Low';
  status: 'pending' | 'submitted' | 'graded';
  score?: string;
  maxScore: number;
  description: string;
  attachedFile?: string;
  submittedFile?: string;
  submissionDate?: string;
}

export interface AcademicResource {
  id: string;
  title: string;
  subjectCode: string;
  subjectName: string;
  semester: number;
  department: string;
  type: 'Lecture Notes' | 'Question Bank' | 'Lab Manual' | 'Syllabus' | 'Model Solution';
  format: 'PDF' | 'DOCX' | 'ZIP';
  fileSize: string;
  uploadedBy: string;
  uploadDate: string;
  downloadsCount: number;
  rating: number;
  downloadUrl?: string;
  previewSnippet?: string;
}

export interface IaPaper {
  id: string;
  subjectCode: string;
  subjectName: string;
  semester: number;
  iaType: 'IA-1' | 'IA-2' | 'IA-3' | 'Semester End';
  academicYear: string;
  maxMarks: number;
  duration: string;
  fileSize: string;
  scheme: '2022 Scheme' | '2021 Scheme' | '2018 Scheme';
  hasSolutionKey: boolean;
}

export interface Internship {
  id: string;
  company: string;
  role: string;
  location: string;
  type: 'Full-time' | 'Remote' | 'Hybrid';
  stipend: string;
  duration: string;
  deadline: string;
  eligibleBranches: string[];
  minCgpa: number;
  skills: string[];
  applied?: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  date: string;
  category: 'Academics' | 'Examinations' | 'Placement' | 'Events' | 'Sports';
  author: string;
  content: string;
  isUrgent?: boolean;
  attachmentName?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedFollowUps?: string[];
  codeSnippet?: string;
}
