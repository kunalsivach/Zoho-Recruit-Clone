import React from 'react';
import {
  Briefcase,
  Users,
  Calendar,
  FileCheck,
  TrendingUp,
  Clock,
  ArrowRight,
  Video,
  ClipboardCheck,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { useRecruit } from '../../context/RecruitContext';
import { STAGES } from '../../data/seedData';

export const DashboardModule: React.FC = () => {
  const {
    mode,
    jobs,
    candidates,
    interviews,
    offers,
    activities,
    setActiveModule,
    openCandidateDetail,
    openScorecardModal,
    setIsResumeParserOpen,
    setIsCreateJobOpen,
    openScheduleInterviewModal,
  } = useRecruit();

  const activeJobs = jobs.filter((j) => j.status === 'In-progress');
  const activeCandidates = candidates.filter((c) => c.stage !== 'rejected');
  const scheduledInterviews = interviews.filter((i) => i.status === 'Scheduled');
  const hiredCandidates = candidates.filter((c) => c.stage === 'hired');
  const pendingOffers = offers.filter((o) => o.status === 'Sent');

  // Stage distribution counts
  const stageCounts = STAGES.map((s) => ({
    ...s,
    count: candidates.filter((c) => c.stage === s.id).length,
  }));

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Talent Acquisition Command Center
            </h1>
            <span className="text-[11px] font-semibold uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
              {mode === 'corporate' ? 'Corporate HR Mode' : 'Staffing Agency Mode'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time hiring velocity, candidate pipeline progression, and interviewer evaluations.
          </p>
        </div>

        {/* Quick Launch Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => setIsResumeParserOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-md transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Resume Parser</span>
          </button>
          <button
            onClick={() => openScheduleInterviewModal()}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-md transition-colors"
          >
            <Calendar className="w-3.5 h-3.5 text-slate-600" />
            <span>Schedule Round</span>
          </button>
          <button
            onClick={() => setIsCreateJobOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0073e6] hover:bg-[#0062c4] rounded-md shadow-xs transition-colors"
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>+ {mode === 'corporate' ? 'Job Opening' : 'Job Order'}</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
        <div
          onClick={() => setActiveModule('jobs')}
          className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs hover:border-blue-400 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Open Positions</span>
            <Briefcase className="w-4 h-4 text-blue-600" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono tabular-nums text-slate-900">
            {activeJobs.length}
          </div>
          <div className="mt-1 text-[11px] text-slate-500 flex items-center gap-1">
            <span className="text-emerald-600 font-semibold">Active</span> across departments
          </div>
        </div>

        <div
          onClick={() => setActiveModule('candidates')}
          className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs hover:border-blue-400 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Pipeline Candidates</span>
            <Users className="w-4 h-4 text-sky-600" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono tabular-nums text-slate-900">
            {activeCandidates.length}
          </div>
          <div className="mt-1 text-[11px] text-slate-500 flex items-center gap-1">
            <span className="text-sky-600 font-semibold">{candidates.length}</span> total in talent pool
          </div>
        </div>

        <div
          onClick={() => setActiveModule('interviews')}
          className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs hover:border-blue-400 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Scheduled Interviews</span>
            <Calendar className="w-4 h-4 text-violet-600" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono tabular-nums text-slate-900">
            {scheduledInterviews.length}
          </div>
          <div className="mt-1 text-[11px] text-slate-500 flex items-center gap-1">
            <Clock className="w-3 h-3 text-violet-500" />
            <span>Upcoming this week</span>
          </div>
        </div>

        <div
          onClick={() => setActiveModule('offers')}
          className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs hover:border-blue-400 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Pending Offers</span>
            <FileCheck className="w-4 h-4 text-amber-600" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono tabular-nums text-slate-900">
            {pendingOffers.length}
          </div>
          <div className="mt-1 text-[11px] text-slate-500 flex items-center gap-1">
            <span className="text-emerald-600 font-semibold">{hiredCandidates.length}</span> hired to date
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Avg Time-to-Fill</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono tabular-nums text-slate-900">
            21.4 <span className="text-sm font-normal text-slate-500">days</span>
          </div>
          <div className="mt-1 text-[11px] text-emerald-600 font-medium">
            ↓ 4.2 days faster vs Q3
          </div>
        </div>
      </div>

      {/* Recruitment Pipeline Funnel Overview */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Hiring Pipeline Stage Breakdown</h2>
            <p className="text-xs text-slate-500">Active distribution of applicants across evaluation stages</p>
          </div>
          <button
            onClick={() => setActiveModule('candidates')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <span>Open Kanban Board</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Funnel Stage Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2.5 mt-4">
          {stageCounts.map((s) => (
            <div
              key={s.id}
              onClick={() => setActiveModule('candidates')}
              className="p-3 rounded-md border border-slate-200 bg-slate-50 hover:bg-white hover:border-blue-300 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                <span className="text-base font-bold font-mono tabular-nums text-slate-900 group-hover:text-blue-600">
                  {s.count}
                </span>
              </div>
              <div className="text-xs font-medium text-slate-700 mt-2 truncate">{s.label}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                {candidates.length > 0 ? Math.round((s.count / candidates.length) * 100) : 0}% of pool
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two-Column Cockpit: Upcoming Interviews & Activity Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Scheduled Interviews & Pending Evaluations */}
        <div className="lg:col-span-7 bg-white rounded-lg border border-slate-200 shadow-xs flex flex-col">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Scheduled Interviews & Action Queue</h2>
              <p className="text-xs text-slate-500">Rounds requiring execution or scorecard submission</p>
            </div>
            <button
              onClick={() => setActiveModule('interviews')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100 flex-1">
            {interviews.slice(0, 4).map((int) => {
              const isScheduled = int.status === 'Scheduled';
              const hasScorecard = Boolean(int.scorecard);

              return (
                <div key={int.id} className="p-4 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 hover:text-blue-600 cursor-pointer" onClick={() => openCandidateDetail(int.candidateId)}>
                        {int.candidateName}
                      </span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        isScheduled ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        {int.status}
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 font-medium">{int.roundName}</div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-3">
                      <span>{int.jobTitle}</span>
                      <span>·</span>
                      <span className="font-mono text-slate-600">{int.date} at {int.time}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    {int.meetingLink && isScheduled && (
                      <a
                        href={int.meetingLink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded border border-blue-200"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Join Call</span>
                      </a>
                    )}
                    {isScheduled ? (
                      <button
                        onClick={() => openScorecardModal(int)}
                        className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 rounded border border-slate-300"
                      >
                        <ClipboardCheck className="w-3.5 h-3.5 text-slate-600" />
                        <span>Evaluate</span>
                      </button>
                    ) : hasScorecard ? (
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                        Evaluated: {int.scorecard?.overallRecommendation}
                      </span>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (5 cols): Zoho Recruit Timeline Stream */}
        <div className="lg:col-span-5 bg-white rounded-lg border border-slate-200 shadow-xs flex flex-col">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Recruitment Activity Stream</h2>
              <p className="text-xs text-slate-500">Live system audit log and candidate transitions</p>
            </div>
          </div>

          <div className="p-4 space-y-3.5 flex-1 overflow-y-auto max-h-[380px]">
            {activities.slice(0, 6).map((act) => (
              <div key={act.id} className="flex items-start gap-3 text-xs">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-slate-800 leading-snug">
                    <span className="font-semibold text-slate-900">{act.entityName}</span>: {act.description}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-2">
                    <span>by {act.actor}</span>
                    <span>·</span>
                    <span className="font-mono">{act.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
