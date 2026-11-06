import {
  UserProfile,
  AttendanceSubject,
  IaScore,
  Assignment,
  AcademicResource,
  IaPaper,
  Internship,
  Announcement,
  ChatMessage,
} from '../types';

export const CURRENT_STUDENT: UserProfile = {
  id: 'usr_rohan_2jc22cs045',
  name: 'Rohan M. Verma',
  role: 'student',
  usnOrId: '2JC22CS045',
  email: 'rohan.verma@jcet.ac.in',
  department: 'Computer Science & Engineering',
  semester: 6,
  section: 'B',
  verified: true,
};

export const SAMPLE_USERS: Record<string, UserProfile> = {
  student: CURRENT_STUDENT,
  faculty: {
    id: 'fac_meenakshi_108',
    name: 'Dr. Meenakshi Patil',
    role: 'faculty',
    usnOrId: 'JCET-FAC-108',
    email: 'm.patil@jcet.ac.in',
    department: 'Computer Science & Engineering',
    verified: true,
  },
  admin: {
    id: 'adm_campus_it',
    name: 'College Dean of Academics (Admin)',
    role: 'admin',
    usnOrId: 'JCET-ADM-001',
    email: 'admin.portal@jcet.ac.in',
    department: 'Academic Administration',
    verified: true,
  },
};

export const ATTENDANCE_LIST: AttendanceSubject[] = [
  {
    code: '21CS61',
    name: 'Software Engineering & Agile',
    faculty: 'Prof. Ananya Hegde',
    attended: 38,
    total: 42,
    percentage: 90.5,
    status: 'safe',
  },
  {
    code: '21CS62',
    name: 'Computer Networks',
    faculty: 'Dr. Srinivas K.',
    attended: 35,
    total: 40,
    percentage: 87.5,
    status: 'safe',
  },
  {
    code: '21CS63',
    name: 'Full Stack Web Development',
    faculty: 'Prof. Rajesh Kulkarni',
    attended: 42,
    total: 45,
    percentage: 93.3,
    status: 'safe',
  },
  {
    code: '21CS641',
    name: 'Cloud Computing Architecture',
    faculty: 'Prof. Geeta Joshi',
    attended: 28,
    total: 36,
    percentage: 77.8,
    status: 'warning',
  },
  {
    code: '21CSL66',
    name: 'Computer Networks Lab',
    faculty: 'Dr. Srinivas K.',
    attended: 22,
    total: 24,
    percentage: 91.7,
    status: 'safe',
  },
  {
    code: '21CSMP67',
    name: 'Mini Project Evaluation',
    faculty: 'Dr. Meenakshi Patil',
    attended: 14,
    total: 16,
    percentage: 87.5,
    status: 'safe',
  },
];

export const IA_SCORES: IaScore[] = [
  {
    subjectCode: '21CS61',
    subjectName: 'Software Engineering',
    ia1: 27,
    ia2: 28,
    maxMarks: 30,
    average: 27.5,
    trend: 'up',
  },
  {
    subjectCode: '21CS62',
    subjectName: 'Computer Networks',
    ia1: 24,
    ia2: 26,
    maxMarks: 30,
    average: 25.0,
    trend: 'up',
  },
  {
    subjectCode: '21CS63',
    subjectName: 'Full Stack Development',
    ia1: 29,
    ia2: 29,
    maxMarks: 30,
    average: 29.0,
    trend: 'steady',
  },
  {
    subjectCode: '21CS641',
    subjectName: 'Cloud Computing',
    ia1: 22,
    ia2: 25,
    maxMarks: 30,
    average: 23.5,
    trend: 'up',
  },
  {
    subjectCode: '21CSL66',
    subjectName: 'Networks Laboratory',
    ia1: 28,
    ia2: 30,
    maxMarks: 30,
    average: 29.0,
    trend: 'up',
  },
];

export const ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg-01',
    title: 'Sprint Planning & User Stories Document',
    subjectCode: '21CS61',
    subjectName: 'Software Engineering & Agile',
    professor: 'Prof. Ananya Hegde',
    dueDate: 'Nov 08, 2026',
    daysRemaining: 3,
    priority: 'High',
    status: 'pending',
    maxScore: 20,
    description: 'Prepare an Agile sprint backlog with 5 user stories, acceptance criteria, story point estimation using Planning Poker, and Burndown chart sketch for an e-commerce checkout flow.',
    attachedFile: 'Sprint_Template_JCET_CSE.pdf',
  },
  {
    id: 'asg-02',
    title: 'TCP vs UDP Congestion Control Analysis',
    subjectCode: '21CS62',
    subjectName: 'Computer Networks',
    professor: 'Dr. Srinivas K.',
    dueDate: 'Nov 12, 2026',
    daysRemaining: 7,
    priority: 'Medium',
    status: 'pending',
    maxScore: 25,
    description: 'Submit Wireshark packet capture analysis demonstrating three-way handshake, slow-start window size adjustments, and fast retransmit behaviour under 5% synthetic packet loss.',
    attachedFile: 'Wireshark_Experiment_Manual.pdf',
  },
  {
    id: 'asg-03',
    title: 'RESTful API with JWT Authentication',
    subjectCode: '21CS63',
    subjectName: 'Full Stack Development',
    professor: 'Prof. Rajesh Kulkarni',
    dueDate: 'Nov 02, 2026',
    daysRemaining: 0,
    priority: 'High',
    status: 'submitted',
    score: '19.5/20',
    maxScore: 20,
    description: 'Implement secure JWT Bearer authorization with token refresh cycle, password bcrypt hashing, and role guard middleware in Node/Express.',
    submittedFile: '2JC22CS045_FullStack_LabAssgn3.zip',
    submissionDate: 'Nov 01, 2026 at 09:42 PM',
  },
  {
    id: 'asg-04',
    title: 'Serverless Lambda & S3 Bucket Policy Design',
    subjectCode: '21CS641',
    subjectName: 'Cloud Computing Architecture',
    professor: 'Prof. Geeta Joshi',
    dueDate: 'Nov 18, 2026',
    daysRemaining: 13,
    priority: 'Low',
    status: 'pending',
    maxScore: 20,
    description: 'Write JSON policies restricting bucket access to specific VPC endpoints and configure Lambda triggers for automatic thumbnail resizing on S3 upload event.',
  },
];

export const ACADEMIC_RESOURCES: AcademicResource[] = [
  {
    id: 'res-01',
    title: 'Complete Module 1-5 Lecture Notes: Agile & DevOps',
    subjectCode: '21CS61',
    subjectName: 'Software Engineering',
    semester: 6,
    department: 'CSE',
    type: 'Lecture Notes',
    format: 'PDF',
    fileSize: '4.8 MB',
    uploadedBy: 'Prof. Ananya Hegde',
    uploadDate: 'Oct 28, 2026',
    downloadsCount: 342,
    rating: 4.9,
    previewSnippet: 'Comprehensive coverage of Scrum ceremonies, XP practices, CI/CD pipeline architectural blueprint, and automated testing pyramid.',
  },
  {
    id: 'res-02',
    title: 'Computer Networks IA-2 Question Bank with Solutions',
    subjectCode: '21CS62',
    subjectName: 'Computer Networks',
    semester: 6,
    department: 'CSE',
    type: 'Question Bank',
    format: 'PDF',
    fileSize: '2.4 MB',
    uploadedBy: 'Dr. Srinivas K.',
    uploadDate: 'Oct 29, 2026',
    downloadsCount: 518,
    rating: 5.0,
    previewSnippet: 'Detailed solutions to 45 VTU repeated questions covering Subnetting, CIDR, Distance Vector Routing, OSPF, and BGP protocols.',
  },
  {
    id: 'res-03',
    title: 'Lab Manual: Network Simulator (NS-3 & Wireshark)',
    subjectCode: '21CSL66',
    subjectName: 'Computer Networks Lab',
    semester: 6,
    department: 'CSE',
    type: 'Lab Manual',
    format: 'PDF',
    fileSize: '7.1 MB',
    uploadedBy: 'Lab Incharge CSE',
    uploadDate: 'Oct 15, 2026',
    downloadsCount: 420,
    rating: 4.8,
    previewSnippet: 'Step-by-step experiment instructions for building topologies, capturing traces, plotting throughput curves with Gnuplot.',
  },
  {
    id: 'res-04',
    title: 'React 19 & Modern Web Architecture Handbook',
    subjectCode: '21CS63',
    subjectName: 'Full Stack Development',
    semester: 6,
    department: 'CSE',
    type: 'Lecture Notes',
    format: 'PDF',
    fileSize: '3.6 MB',
    uploadedBy: 'Prof. Rajesh Kulkarni',
    uploadDate: 'Oct 24, 2026',
    downloadsCount: 295,
    rating: 4.9,
    previewSnippet: 'Component lifecycle, React hooks, state management patterns, and REST API integration best practices for VTU 2022 scheme.',
  },
  {
    id: 'res-05',
    title: 'Cloud Computing Syllabus Copy & Scheme Scheme-2022',
    subjectCode: '21CS641',
    subjectName: 'Cloud Computing Architecture',
    semester: 6,
    department: 'CSE',
    type: 'Syllabus',
    format: 'PDF',
    fileSize: '1.1 MB',
    uploadedBy: 'Department Office',
    uploadDate: 'Sep 05, 2026',
    downloadsCount: 680,
    rating: 4.7,
    previewSnippet: 'Official VTU syllabus matrix with Bloom taxonomy levels, course outcomes (COs), and reference textbook lists.',
  },
  {
    id: 'res-06',
    title: 'Microcontroller 8051 & ARM Cortex IA-1 Model Answers',
    subjectCode: '21CS43',
    subjectName: 'Microcontrollers & Embedded',
    semester: 4,
    department: 'CSE',
    type: 'Model Solution',
    format: 'PDF',
    fileSize: '3.2 MB',
    uploadedBy: 'Prof. Mahesh Joshi',
    uploadDate: 'Oct 12, 2026',
    downloadsCount: 388,
    rating: 4.8,
    previewSnippet: 'Assembly programs with timing diagrams and circuit pin connections for 8051 DAC/ADC interfacing.',
  },
];

export const IA_PAPERS: IaPaper[] = [
  {
    id: 'ia-2026-cs61-ia1',
    subjectCode: '21CS61',
    subjectName: 'Software Engineering & Agile',
    semester: 6,
    iaType: 'IA-1',
    academicYear: '2026-27 (Odd Sem)',
    maxMarks: 30,
    duration: '60 Mins',
    fileSize: '1.2 MB',
    scheme: '2022 Scheme',
    hasSolutionKey: true,
  },
  {
    id: 'ia-2026-cs62-ia1',
    subjectCode: '21CS62',
    subjectName: 'Computer Networks',
    semester: 6,
    iaType: 'IA-1',
    academicYear: '2026-27 (Odd Sem)',
    maxMarks: 30,
    duration: '60 Mins',
    fileSize: '1.5 MB',
    scheme: '2022 Scheme',
    hasSolutionKey: true,
  },
  {
    id: 'ia-2026-cs63-ia1',
    subjectCode: '21CS63',
    subjectName: 'Full Stack Web Development',
    semester: 6,
    iaType: 'IA-1',
    academicYear: '2026-27 (Odd Sem)',
    maxMarks: 30,
    duration: '60 Mins',
    fileSize: '1.1 MB',
    scheme: '2022 Scheme',
    hasSolutionKey: false,
  },
  {
    id: 'ia-2025-cs51-ia2',
    subjectCode: '21CS51',
    subjectName: 'Automata Theory & Computability',
    semester: 5,
    iaType: 'IA-2',
    academicYear: '2025-26',
    maxMarks: 30,
    duration: '60 Mins',
    fileSize: '2.1 MB',
    scheme: '2022 Scheme',
    hasSolutionKey: true,
  },
  {
    id: 'ia-2025-cs52-ia2',
    subjectCode: '21CS52',
    subjectName: 'Database Management Systems',
    semester: 5,
    iaType: 'IA-2',
    academicYear: '2025-26',
    maxMarks: 30,
    duration: '60 Mins',
    fileSize: '1.8 MB',
    scheme: '2022 Scheme',
    hasSolutionKey: true,
  },
  {
    id: 'ia-2025-vtu-sem-cs4',
    subjectCode: '21CS42',
    subjectName: 'Design & Analysis of Algorithms',
    semester: 4,
    iaType: 'Semester End',
    academicYear: '2024-25',
    maxMarks: 100,
    duration: '3 Hours',
    fileSize: '3.4 MB',
    scheme: '2022 Scheme',
    hasSolutionKey: true,
  },
];

export const INTERNSHIPS: Internship[] = [
  {
    id: 'int-01',
    company: 'Infosys Springboard',
    role: 'Full Stack Software Engineering Intern',
    location: 'Bengaluru / Hubballi Hub',
    type: 'Hybrid',
    stipend: '₹25,000 / month',
    duration: '6 Months',
    deadline: 'Nov 20, 2026',
    eligibleBranches: ['CSE', 'ISE', 'ECE', 'AI&DS'],
    minCgpa: 7.5,
    skills: ['React', 'Node.js', 'PostgreSQL', 'Git'],
    applied: true,
  },
  {
    id: 'int-02',
    company: 'Bosch Global Software',
    role: 'Embedded Systems & IoT Intern',
    location: 'Bengaluru / Coimbatore',
    type: 'Full-time',
    stipend: '₹30,000 / month',
    duration: '6 Months',
    deadline: 'Nov 25, 2026',
    eligibleBranches: ['CSE', 'ECE', 'EEE'],
    minCgpa: 8.0,
    skills: ['C/C++', 'RTOS', 'CAN Protocol', 'Linux'],
    applied: false,
  },
  {
    id: 'int-03',
    company: 'TCS Research & Innovation',
    role: 'AI & Data Science Research Intern',
    location: 'Remote',
    type: 'Remote',
    stipend: '₹22,000 / month',
    duration: '3 Months',
    deadline: 'Nov 15, 2026',
    eligibleBranches: ['CSE', 'ISE', 'AI&DS'],
    minCgpa: 7.8,
    skills: ['Python', 'PyTorch', 'NLP', 'Data Structures'],
    applied: false,
  },
  {
    id: 'int-04',
    company: 'Deshpande Startups Incubator',
    role: 'Product Development & UI/UX Fellow',
    location: 'Hubballi Campus',
    type: 'Hybrid',
    stipend: '₹18,000 / month',
    duration: '4 Months',
    deadline: 'Nov 30, 2026',
    eligibleBranches: ['All Branches'],
    minCgpa: 6.8,
    skills: ['Figma', 'React', 'User Research', 'Tailwind'],
    applied: false,
  },
];

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'anc-01',
    title: 'IA-2 Timetable Scheduled for 6th Semester CSE/ISE',
    date: 'Nov 01, 2026',
    category: 'Examinations',
    author: 'Controller of Examinations, JCET',
    content: 'The Second Internal Assessment (IA-2) for 6th and 8th semester B.E. programs will commence from November 16, 2026. Hall tickets and seating arrangement will be published on JCET-Bridge portal 3 days prior.',
    isUrgent: true,
    attachmentName: 'IA2_Schedule_Nov2026_Final.pdf',
  },
  {
    id: 'anc-02',
    title: 'VTU Mandatory Internship Submission Deadline Notice',
    date: 'Oct 29, 2026',
    category: 'Academics',
    author: 'Dean Academics & Training Cell',
    content: 'All 6th semester students must submit their institutional internship certificate and mid-term evaluation logbook signed by their industry mentors by November 28, 2026.',
    isUrgent: false,
    attachmentName: 'VTU_Internship_Guidelines_Format.pdf',
  },
  {
    id: 'anc-03',
    title: 'HackHubballi 2026 – Annual Inter-College Hackathon',
    date: 'Oct 25, 2026',
    category: 'Events',
    author: 'JCET Coding Club & IEEE Student Branch',
    content: 'Cash prizes worth ₹1,50,000! Tracks include AI for Healthcare, Smart Agritech, and Sustainable Cities. Registrations open on JCET-Bridge.',
    isUrgent: false,
  },
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-01',
    sender: 'assistant',
    text: "Hello Rohan! I am your JCET Academic AI Assistant. I have indexed your 6th Sem CSE syllabus, textbook solutions, IA question banks, and upcoming assignment guidelines. How can I help you excel today?",
    timestamp: '10:00 AM',
    suggestedFollowUps: [
      "Explain Dijkstra's Algorithm step-by-step for IA-2",
      "What is the syllabus weightage for Computer Networks Module 3?",
      "How to calculate VTU SGPA from credits?",
      "Show tips for Agile Sprint Planning Assignment",
    ],
  },
];

export const AI_KNOWLEDGE_BASE: Record<string, { answer: string; followUps: string[] }> = {
  dijkstra: {
    answer: `**Dijkstra's Shortest Path Algorithm (DAA / Computer Networks 21CS62)**:

1. **Objective**: Computes the shortest paths from a single source node to all other nodes in a weighted graph with non-negative edge weights.
2. **Key Data Structures**:
   - \`dist[]\` initialized to $\\infty$ for all vertices except source node (\`dist[src] = 0\`).
   - Priority Queue (Min-Heap) storing \`(distance, vertex)\`.
   - \`visited[]\` boolean array.
3. **Core Step (Relaxation)**:
   For every adjacent neighbor $v$ of current vertex $u$:
   If \`dist[u] + weight(u, v) < dist[v]\`, update \`dist[v] = dist[u] + weight(u, v)\`.
4. **Time Complexity**: $\\mathcal{O}((V + E) \\log V)$ with adjacency list and min-heap.
5. **VTU IA Note**: Commonly asked in 8-mark or 10-mark questions with numerical trace table!`,
    followUps: [
      "Can Dijkstra work with negative edge weights?",
      "Compare Dijkstra vs Bellman-Ford for Distance Vector Routing",
      "Show me sample IA questions on Routing algorithms",
    ],
  },
  syllabus: {
    answer: `**Computer Networks (21CS62) Module 3 Breakdown**:

• **Topics**: Network Layer & Routing Protocols.
• **Key Concepts**:
  - IPv4 Addressing & Subnetting (CIDR, VLSM calculations)
  - DHCP and NAT mechanism
  - Routing Algorithms: Link State (OSPF) & Distance Vector (RIP, Bellman-Ford)
  - Inter-AS Routing: BGP (Border Gateway Protocol)
• **Weightage in IA-2**: Approximately 15 marks out of 30 marks.
• **Recommended Study Material**: Unit 3 Notes uploaded by Dr. Srinivas K. on JCET-Bridge Resources tab.`,
    followUps: [
      "Show me CIDR subnetting practice problems",
      "Download Computer Networks IA Question Bank",
      "Review Assignment 2 details",
    ],
  },
  sgpa: {
    answer: `**VTU SGPA Calculation Formula (2022 Scheme)**:

$$\\text{SGPA} = \\frac{\\sum (C_i \\times G_i)}{\\sum C_i}$$

Where:
- $C_i$: Credit assigned to course $i$ (e.g. Theory = 3 or 4 credits, Lab = 1.5 credits).
- $G_i$: Grade point earned:
  - **O (Outstanding)**: 90–100% $\\rightarrow$ **10**
  - **A+ (Excellent)**: 80–89% $\\rightarrow$ **9**
  - **A (Very Good)**: 70–79% $\\rightarrow$ **8**
  - **B+ (Good)**: 60–69% $\\rightarrow$ **7**
  - **B (Above Avg)**: 55–59% $\\rightarrow$ **6**
  - **C (Average)**: 50–54% $\\rightarrow$ **5**
  - **P (Pass)**: 40–49% $\\rightarrow$ **4**
  - **F (Fail)**: $< 40\\%$ $\\rightarrow$ **0**

*Tip: Your current cumulative CGPA across 5 completed semesters is **8.72**.*`,
    followUps: [
      "View my semester-wise academic track record",
      "What minimum marks do I need in IA-2 for an O grade?",
    ],
  },
  agile: {
    answer: `**Tips for Software Engineering (21CS61) Assignment 1**:

1. **User Story Structure**: Follow the template: *"As a <type of user>, I want <some goal> so that <some reason>."*
2. **Acceptance Criteria**: Use Given-When-Then format (e.g., *Given a customer has items in cart, When they enter valid UPI ID, Then payment should process in <3 seconds*).
3. **Estimation**: Use Fibonacci sequence (1, 2, 3, 5, 8, 13) for Planning Poker.
4. **Burndown Chart**: Plot Total Estimated Hours vs. Days in a 10-day sprint cycle.
*Download the JCET CSE Sprint template from your Pending Assignments card!*`,
    followUps: [
      "Open Sprint Planning Assignment",
      "Explain difference between Scrum and Kanban",
    ],
  },
};
