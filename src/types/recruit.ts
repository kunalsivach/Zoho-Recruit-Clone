/**
 * Zoho Recruit Data Models and Types
 */

export type AppMode = 'corporate' | 'agency';

export type RecruitmentStage =
  | 'sourced'
  | 'screening'
  | 'interview_round_1'
  | 'interview_round_2'
  | 'offered'
  | 'hired'
  | 'rejected';

export interface StageDefinition {
  id: RecruitmentStage;
  label: string;
  color: string;
  badgeBg: string;
  badgeText: string;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  currentRole: string;
  currentCompany: string;
  experienceYears: number;
  expectedSalary: string;
  location: string;
  rating: number; // 1-5
  source: 'LinkedIn' | 'Career Portal' | 'Referral' | 'Indeed' | 'Recruiter Sourced' | 'Agency Submission';
  stage: RecruitmentStage;
  associatedJobId: string;
  associatedJobTitle: string;
  skills: string[];
  education: string;
  appliedDate: string;
  resumeFileName?: string;
  resumeSummary?: string;
  notes: CandidateNote[];
  callLogs: CallLog[];
}

export interface CandidateNote {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

export interface CallLog {
  id: string;
  caller: string;
  durationMinutes: number;
  outcome: 'Interested' | 'Not Interested' | 'Callback Requested' | 'Voicemail' | 'Screening Passed';
  notes: string;
  callDate: string;
}

export interface JobOpening {
  id: string;
  title: string;
  requisitionCode: string;
  departmentOrClient: string;
  hiringManagerOrContact: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Remote' | 'Part-time';
  status: 'In-progress' | 'Draft' | 'On-hold' | 'Filled' | 'Cancelled';
  openDate: string;
  targetDate: string;
  salaryMin: number;
  salaryMax: number;
  billRate?: string; // for staffing agency mode
  requiredSkills: string[];
  description: string;
  openPositions: number;
  recruiter: string;
}

export interface Interview {
  id: string;
  candidateId: string;
  candidateName: string;
  jobId: string;
  jobTitle: string;
  roundName: string; // e.g. "Screening Call", "Technical Round 1", "System Design", "Executive Bar Raiser"
  date: string;
  time: string;
  durationMinutes: number;
  interviewerNames: string[];
  type: 'Video Call' | 'In-person' | 'Phone Call';
  meetingLink?: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled' | 'Rescheduled';
  scorecard?: Scorecard;
}

export interface Scorecard {
  id: string;
  interviewId: string;
  interviewerName: string;
  technicalSkills: number; // 1-5
  problemSolving: number; // 1-5
  communication: number; // 1-5
  culturalFit: number; // 1-5
  overallRecommendation: 'Strong Hire' | 'Hire' | 'Hold' | 'Strong No Hire';
  summaryNotes: string;
  submittedAt: string;
}

export interface Offer {
  id: string;
  candidateId: string;
  candidateName: string;
  jobId: string;
  jobTitle: string;
  annualSalary: number;
  bonusPercentage: number;
  stockUnits?: number;
  joiningDate: string;
  expirationDate: string;
  status: 'Draft' | 'Sent' | 'Accepted' | 'Declined' | 'Withdrawn';
  specialTerms?: string;
  createdDate: string;
}

export interface ClientOrDepartment {
  id: string;
  name: string;
  code: string;
  industryOrFunction: string;
  leadPerson: string;
  email: string;
  phone: string;
  activeOpeningsCount: number;
  totalHiresCount: number;
  location: string;
  type: 'client' | 'department';
}

export interface ActivityItem {
  id: string;
  type: 'candidate_added' | 'stage_changed' | 'interview_scheduled' | 'scorecard_submitted' | 'offer_created' | 'job_created';
  description: string;
  entityName: string;
  timestamp: string;
  actor: string;
}
