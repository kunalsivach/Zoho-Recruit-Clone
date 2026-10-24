import React from 'react';
import { RecruitProvider, useRecruit } from './context/RecruitContext';
import { TopHeader } from './components/layout/TopHeader';
import { ModuleNav } from './components/layout/ModuleNav';
import { DashboardModule } from './components/modules/DashboardModule';
import { JobOpeningsModule } from './components/modules/JobOpeningsModule';
import { CandidatesModule } from './components/modules/CandidatesModule';
import { InterviewsModule } from './components/modules/InterviewsModule';
import { ClientsModule } from './components/modules/ClientsModule';
import { OffersModule } from './components/modules/OffersModule';
import { AnalyticsModule } from './components/modules/AnalyticsModule';

import { CandidateDetailModal } from './components/modals/CandidateDetailModal';
import { ResumeParserModal } from './components/modals/ResumeParserModal';
import { CreateJobModal } from './components/modals/CreateJobModal';
import { ScheduleInterviewModal } from './components/modals/ScheduleInterviewModal';
import { ScorecardModal } from './components/modals/ScorecardModal';
import { CreateCandidateModal } from './components/modals/CreateCandidateModal';
import { CreateOfferModal } from './components/modals/CreateOfferModal';
import { CheckCircle2, Info, AlertTriangle, AlertCircle, X } from 'lucide-react';

const MainView: React.FC = () => {
  const { activeModule, toasts, removeToast } = useRecruit();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900">
      {/* Zoho Top Bar & Module Ribbon */}
      <TopHeader />
      <ModuleNav />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {activeModule === 'dashboard' && <DashboardModule />}
        {activeModule === 'jobs' && <JobOpeningsModule />}
        {activeModule === 'candidates' && <CandidatesModule />}
        {activeModule === 'interviews' && <InterviewsModule />}
        {activeModule === 'clients' && <ClientsModule />}
        {activeModule === 'offers' && <OffersModule />}
        {activeModule === 'analytics' && <AnalyticsModule />}
      </main>

      {/* Modals */}
      <CandidateDetailModal />
      <ResumeParserModal />
      <CreateJobModal />
      <ScheduleInterviewModal />
      <ScorecardModal />
      <CreateCandidateModal />
      <CreateOfferModal />

      {/* Toast Notification Container */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        {toasts.map((toast) => {
          let bg = 'bg-slate-900 text-white';
          let Icon = Info;
          if (toast.type === 'success') {
            bg = 'bg-emerald-900/95 text-emerald-50 border border-emerald-700';
            Icon = CheckCircle2;
          } else if (toast.type === 'warning') {
            bg = 'bg-amber-900/95 text-amber-50 border border-amber-700';
            Icon = AlertTriangle;
          } else if (toast.type === 'error') {
            bg = 'bg-red-900/95 text-red-50 border border-red-700';
            Icon = AlertCircle;
          }

          return (
            <div
              key={toast.id}
              className={`p-3 rounded-lg shadow-xl text-xs flex items-center justify-between gap-3 pointer-events-auto animate-in slide-in-from-bottom-2 duration-150 ${bg}`}
            >
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4 shrink-0 text-emerald-400" />
                <span className="font-medium leading-tight">{toast.message}</span>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="opacity-70 hover:opacity-100 p-0.5 rounded cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <RecruitProvider>
      <MainView />
    </RecruitProvider>
  );
}
