import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  AppMode,
  Candidate,
  JobOpening,
  Interview,
  Offer,
  ClientOrDepartment,
  ActivityItem,
  RecruitmentStage,
  Scorecard,
  CandidateNote,
  CallLog,
} from '../types/recruit';
import {
  INITIAL_JOBS,
  INITIAL_CANDIDATES,
  INITIAL_INTERVIEWS,
  INITIAL_OFFERS,
  INITIAL_CLIENTS_AND_DEPTS,
  INITIAL_ACTIVITIES,
} from '../data/seedData';

export type ActiveModule =
  | 'dashboard'
  | 'jobs'
  | 'candidates'
  | 'interviews'
  | 'clients'
  | 'offers'
  | 'analytics';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface RecruitContextType {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  activeModule: ActiveModule;
  setActiveModule: (mod: ActiveModule) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Data Collections
  candidates: Candidate[];
  jobs: JobOpening[];
  interviews: Interview[];
  offers: Offer[];
  clientsOrDepts: ClientOrDepartment[];
  activities: ActivityItem[];

  // Candidate Operations
  addCandidate: (candidate: Omit<Candidate, 'id' | 'appliedDate' | 'notes' | 'callLogs'>) => Candidate;
  updateCandidateStage: (candidateId: string, newStage: RecruitmentStage) => void;
  addCandidateNote: (candidateId: string, text: string, author?: string) => void;
  logCandidateCall: (candidateId: string, log: Omit<CallLog, 'id'>) => void;
  deleteCandidate: (candidateId: string) => void;

  // Job Operations
  addJob: (job: Omit<JobOpening, 'id' | 'requisitionCode' | 'openDate'>) => JobOpening;
  updateJobStatus: (jobId: string, newStatus: JobOpening['status']) => void;
  deleteJob: (jobId: string) => void;

  // Interview Operations
  scheduleInterview: (interview: Omit<Interview, 'id' | 'status'>) => Interview;
  submitScorecard: (scorecard: Omit<Scorecard, 'id' | 'submittedAt'>) => void;
  updateInterviewStatus: (interviewId: string, status: Interview['status']) => void;

  // Offer Operations
  createOffer: (offer: Omit<Offer, 'id' | 'createdDate'>) => Offer;
  updateOfferStatus: (offerId: string, status: Offer['status']) => void;

  // Client/Department Operations
  addClientOrDept: (item: Omit<ClientOrDepartment, 'id' | 'activeOpeningsCount' | 'totalHiresCount'>) => void;

  // Modals & Active Selections
  selectedCandidate: Candidate | null;
  openCandidateDetail: (candidateId: string) => void;
  closeCandidateDetail: () => void;

  isResumeParserOpen: boolean;
  setIsResumeParserOpen: (open: boolean) => void;

  isCreateJobOpen: boolean;
  setIsCreateJobOpen: (open: boolean) => void;

  isCreateCandidateOpen: boolean;
  setIsCreateCandidateOpen: (open: boolean) => void;

  isScheduleInterviewOpen: boolean;
  preselectedCandidateForInterview: Candidate | null;
  openScheduleInterviewModal: (candidate?: Candidate) => void;
  closeScheduleInterviewModal: () => void;

  isScorecardModalOpen: boolean;
  activeInterviewForScorecard: Interview | null;
  openScorecardModal: (interview: Interview) => void;
  closeScorecardModal: () => void;

  isCreateOfferOpen: boolean;
  preselectedCandidateForOffer: Candidate | null;
  openCreateOfferModal: (candidate?: Candidate) => void;
  closeCreateOfferModal: () => void;

  // Toasts
  toasts: Toast[];
  showToast: (message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;

  // Quick Reset
  resetToSeedData: () => void;
}

const RecruitContext = createContext<RecruitContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_PREFIX = 'zoho_recruit_clone_v1_';

export const RecruitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<AppMode>(() => {
    return (localStorage.getItem(LOCAL_STORAGE_KEY_PREFIX + 'mode') as AppMode) || 'corporate';
  });

  const [activeModule, setActiveModule] = useState<ActiveModule>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  // Collections with LocalStorage fallbacks
  const [candidates, setCandidates] = useState<Candidate[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_PREFIX + 'candidates');
    return saved ? JSON.parse(saved) : INITIAL_CANDIDATES;
  });

  const [jobs, setJobs] = useState<JobOpening[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_PREFIX + 'jobs');
    return saved ? JSON.parse(saved) : INITIAL_JOBS;
  });

  const [interviews, setInterviews] = useState<Interview[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_PREFIX + 'interviews');
    return saved ? JSON.parse(saved) : INITIAL_INTERVIEWS;
  });

  const [offers, setOffers] = useState<Offer[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_PREFIX + 'offers');
    return saved ? JSON.parse(saved) : INITIAL_OFFERS;
  });

  const [clientsOrDepts, setClientsOrDepts] = useState<ClientOrDepartment[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_PREFIX + 'clients_depts');
    return saved ? JSON.parse(saved) : INITIAL_CLIENTS_AND_DEPTS;
  });

  const [activities, setActivities] = useState<ActivityItem[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_PREFIX + 'activities');
    return saved ? JSON.parse(saved) : INITIAL_ACTIVITIES;
  });

  // Modal States
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const [isResumeParserOpen, setIsResumeParserOpen] = useState(false);
  const [isCreateJobOpen, setIsCreateJobOpen] = useState(false);
  const [isCreateCandidateOpen, setIsCreateCandidateOpen] = useState(false);

  const [isScheduleInterviewOpen, setIsScheduleInterviewOpen] = useState(false);
  const [preselectedCandidateForInterview, setPreselectedCandidateForInterview] = useState<Candidate | null>(null);

  const [isScorecardModalOpen, setIsScorecardModalOpen] = useState(false);
  const [activeInterviewForScorecard, setActiveInterviewForScorecard] = useState<Interview | null>(null);

  const [isCreateOfferOpen, setIsCreateOfferOpen] = useState(false);
  const [preselectedCandidateForOffer, setPreselectedCandidateForOffer] = useState<Candidate | null>(null);

  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + 'mode', mode);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + 'candidates', JSON.stringify(candidates));
  }, [candidates]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + 'jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + 'interviews', JSON.stringify(interviews));
  }, [interviews]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + 'offers', JSON.stringify(offers));
  }, [offers]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + 'clients_depts', JSON.stringify(clientsOrDepts));
  }, [clientsOrDepts]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + 'activities', JSON.stringify(activities));
  }, [activities]);

  const setMode = (newMode: AppMode) => {
    setModeState(newMode);
    showToast(
      newMode === 'corporate'
        ? 'Switched to Corporate In-House HR Mode (Departments & Requisitions)'
        : 'Switched to Staffing Agency Mode (Clients & Bill Rates)',
      'info'
    );
  };

  const showToast = (message: string, type: Toast['type'] = 'success') => {
    const id = 'toast_' + Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addActivity = (
    type: ActivityItem['type'],
    description: string,
    entityName: string,
    actor: string = 'Current Recruiter'
  ) => {
    const newAct: ActivityItem = {
      id: 'act-' + Date.now(),
      type,
      description,
      entityName,
      timestamp: 'Just now',
      actor,
    };
    setActivities((prev) => [newAct, ...prev.slice(0, 30)]);
  };

  // Candidate Operations
  const addCandidate = (data: Omit<Candidate, 'id' | 'appliedDate' | 'notes' | 'callLogs'>) => {
    const newCand: Candidate = {
      ...data,
      id: 'cand-' + Date.now(),
      appliedDate: new Date().toISOString().split('T')[0],
      notes: [],
      callLogs: [],
    };
    setCandidates((prev) => [newCand, ...prev]);
    addActivity('candidate_added', `Added candidate profile (${data.stage})`, newCand.name);
    showToast(`Candidate ${newCand.name} successfully added to Zoho Talent Pool`);
    return newCand;
  };

  const updateCandidateStage = (candidateId: string, newStage: RecruitmentStage) => {
    setCandidates((prev) =>
      prev.map((c) => {
        if (c.id === candidateId) {
          const oldStage = c.stage;
          if (oldStage !== newStage) {
            addActivity('stage_changed', `Advanced stage: ${oldStage} → ${newStage}`, c.name);
            showToast(`${c.name} moved to stage: ${newStage.replace(/_/g, ' ').toUpperCase()}`);
          }
          return { ...c, stage: newStage };
        }
        return c;
      })
    );
  };

  const addCandidateNote = (candidateId: string, text: string, author: string = 'Sarah Jenkins') => {
    const note: CandidateNote = {
      id: 'n-' + Date.now(),
      author,
      text,
      createdAt: new Date().toLocaleString(),
    };
    setCandidates((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, notes: [note, ...c.notes] } : c))
    );
    showToast('Recruiter note saved');
  };

  const logCandidateCall = (candidateId: string, logData: Omit<CallLog, 'id'>) => {
    const callLog: CallLog = {
      ...logData,
      id: 'cl-' + Date.now(),
    };
    setCandidates((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, callLogs: [callLog, ...c.callLogs] } : c))
    );
    showToast(`Call logged: ${logData.outcome}`);
  };

  const deleteCandidate = (candidateId: string) => {
    const cand = candidates.find((c) => c.id === candidateId);
    setCandidates((prev) => prev.filter((c) => c.id !== candidateId));
    if (cand) {
      showToast(`Candidate ${cand.name} archived`, 'info');
    }
    if (selectedCandidateId === candidateId) {
      setSelectedCandidateId(null);
    }
  };

  // Job Operations
  const addJob = (jobData: Omit<JobOpening, 'id' | 'requisitionCode' | 'openDate'>) => {
    const randomReqNum = Math.floor(100 + Math.random() * 900);
    const newJob: JobOpening = {
      ...jobData,
      id: 'job-' + Date.now(),
      requisitionCode: `REQ-2026-${randomReqNum}`,
      openDate: new Date().toISOString().split('T')[0],
    };
    setJobs((prev) => [newJob, ...prev]);
    addActivity('job_created', 'Created new job requisition', newJob.title);
    showToast(`Job Requisition ${newJob.requisitionCode} created!`);
    return newJob;
  };

  const updateJobStatus = (jobId: string, newStatus: JobOpening['status']) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, status: newStatus } : j))
    );
    showToast(`Job status updated to ${newStatus}`);
  };

  const deleteJob = (jobId: string) => {
    setJobs((prev) => prev.filter((j) => j.id !== jobId));
    showToast('Job requisition deleted', 'info');
  };

  // Interview Operations
  const scheduleInterview = (interviewData: Omit<Interview, 'id' | 'status'>) => {
    const newInt: Interview = {
      ...interviewData,
      id: 'int-' + Date.now(),
      status: 'Scheduled',
    };
    setInterviews((prev) => [newInt, ...prev]);
    addActivity('interview_scheduled', `Scheduled ${newInt.roundName}`, newInt.candidateName);
    showToast(`Interview scheduled for ${newInt.candidateName}`);
    return newInt;
  };

  const submitScorecard = (scorecardData: Omit<Scorecard, 'id' | 'submittedAt'>) => {
    const scorecard: Scorecard = {
      ...scorecardData,
      id: 'sc-' + Date.now(),
      submittedAt: new Date().toLocaleString(),
    };
    setInterviews((prev) =>
      prev.map((i) =>
        i.id === scorecardData.interviewId
          ? { ...i, status: 'Completed', scorecard }
          : i
      )
    );
    const targetInterview = interviews.find((i) => i.id === scorecardData.interviewId);
    if (targetInterview) {
      addActivity(
        'scorecard_submitted',
        `Evaluated: ${scorecard.overallRecommendation}`,
        targetInterview.candidateName,
        scorecard.interviewerName
      );
    }
    showToast('Evaluation scorecard submitted!');
  };

  const updateInterviewStatus = (interviewId: string, status: Interview['status']) => {
    setInterviews((prev) =>
      prev.map((i) => (i.id === interviewId ? { ...i, status } : i))
    );
    showToast(`Interview marked as ${status}`);
  };

  // Offer Operations
  const createOffer = (offerData: Omit<Offer, 'id' | 'createdDate'>) => {
    const newOffer: Offer = {
      ...offerData,
      id: 'off-' + Date.now(),
      createdDate: new Date().toISOString().split('T')[0],
    };
    setOffers((prev) => [newOffer, ...prev]);
    // update candidate stage to offered
    updateCandidateStage(offerData.candidateId, 'offered');
    addActivity('offer_created', `Generated formal offer letter`, offerData.candidateName);
    showToast(`Offer letter created for ${offerData.candidateName}!`);
    return newOffer;
  };

  const updateOfferStatus = (offerId: string, status: Offer['status']) => {
    setOffers((prev) =>
      prev.map((o) => {
        if (o.id === offerId) {
          if (status === 'Accepted') {
            updateCandidateStage(o.candidateId, 'hired');
          }
          return { ...o, status };
        }
        return o;
      })
    );
    showToast(`Offer status updated to ${status}`);
  };

  // Client/Dept Operations
  const addClientOrDept = (item: Omit<ClientOrDepartment, 'id' | 'activeOpeningsCount' | 'totalHiresCount'>) => {
    const newItem: ClientOrDepartment = {
      ...item,
      id: (item.type === 'client' ? 'client-' : 'dept-') + Date.now(),
      activeOpeningsCount: 0,
      totalHiresCount: 0,
    };
    setClientsOrDepts((prev) => [...prev, newItem]);
    showToast(`Added ${item.type === 'client' ? 'Client Account' : 'Department'}: ${item.name}`);
  };

  // Candidate Detail Selection
  const selectedCandidate = candidates.find((c) => c.id === selectedCandidateId) || null;
  const openCandidateDetail = (candidateId: string) => setSelectedCandidateId(candidateId);
  const closeCandidateDetail = () => setSelectedCandidateId(null);

  // Modal controls
  const openScheduleInterviewModal = (cand?: Candidate) => {
    setPreselectedCandidateForInterview(cand || null);
    setIsScheduleInterviewOpen(true);
  };
  const closeScheduleInterviewModal = () => {
    setIsScheduleInterviewOpen(false);
    setPreselectedCandidateForInterview(null);
  };

  const openScorecardModal = (interview: Interview) => {
    setActiveInterviewForScorecard(interview);
    setIsScorecardModalOpen(true);
  };
  const closeScorecardModal = () => {
    setIsScorecardModalOpen(false);
    setActiveInterviewForScorecard(null);
  };

  const openCreateOfferModal = (cand?: Candidate) => {
    setPreselectedCandidateForOffer(cand || null);
    setIsCreateOfferOpen(true);
  };
  const closeCreateOfferModal = () => {
    setIsCreateOfferOpen(false);
    setPreselectedCandidateForOffer(null);
  };

  const resetToSeedData = () => {
    setCandidates(INITIAL_CANDIDATES);
    setJobs(INITIAL_JOBS);
    setInterviews(INITIAL_INTERVIEWS);
    setOffers(INITIAL_OFFERS);
    setClientsOrDepts(INITIAL_CLIENTS_AND_DEPTS);
    setActivities(INITIAL_ACTIVITIES);
    localStorage.removeItem(LOCAL_STORAGE_KEY_PREFIX + 'candidates');
    localStorage.removeItem(LOCAL_STORAGE_KEY_PREFIX + 'jobs');
    localStorage.removeItem(LOCAL_STORAGE_KEY_PREFIX + 'interviews');
    localStorage.removeItem(LOCAL_STORAGE_KEY_PREFIX + 'offers');
    localStorage.removeItem(LOCAL_STORAGE_KEY_PREFIX + 'clients_depts');
    localStorage.removeItem(LOCAL_STORAGE_KEY_PREFIX + 'activities');
    showToast('System data reset to initial Zoho Recruit seed state', 'info');
  };

  return (
    <RecruitContext.Provider
      value={{
        mode,
        setMode,
        activeModule,
        setActiveModule,
        searchQuery,
        setSearchQuery,
        candidates,
        jobs,
        interviews,
        offers,
        clientsOrDepts,
        activities,
        addCandidate,
        updateCandidateStage,
        addCandidateNote,
        logCandidateCall,
        deleteCandidate,
        addJob,
        updateJobStatus,
        deleteJob,
        scheduleInterview,
        submitScorecard,
        updateInterviewStatus,
        createOffer,
        updateOfferStatus,
        addClientOrDept,
        selectedCandidate,
        openCandidateDetail,
        closeCandidateDetail,
        isResumeParserOpen,
        setIsResumeParserOpen,
        isCreateJobOpen,
        setIsCreateJobOpen,
        isCreateCandidateOpen,
        setIsCreateCandidateOpen,
        isScheduleInterviewOpen,
        preselectedCandidateForInterview,
        openScheduleInterviewModal,
        closeScheduleInterviewModal,
        isScorecardModalOpen,
        activeInterviewForScorecard,
        openScorecardModal,
        closeScorecardModal,
        isCreateOfferOpen,
        preselectedCandidateForOffer,
        openCreateOfferModal,
        closeCreateOfferModal,
        toasts,
        showToast,
        removeToast,
        resetToSeedData,
      }}
    >
      {children}
    </RecruitContext.Provider>
  );
};

export const useRecruit = () => {
  const context = useContext(RecruitContext);
  if (!context) {
    throw new Error('useRecruit must be used within a RecruitProvider');
  }
  return context;
};
