import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Plus,
  Clock,
  Video,
  ClipboardCheck,
  CheckCircle,
  XCircle,
  Star,
  Users,
} from 'lucide-react';
import { useRecruit } from '../../context/RecruitContext';
import { Interview } from '../../types/recruit';

export const InterviewsModule: React.FC = () => {
  const {
    interviews,
    openScheduleInterviewModal,
    openScorecardModal,
    updateInterviewStatus,
    openCandidateDetail,
  } = useRecruit();

  const [tabFilter, setTabFilter] = useState<'all' | 'Scheduled' | 'Completed'>('all');

  const filteredInterviews = interviews.filter((i) => {
    if (tabFilter === 'all') return true;
    return i.status === tabFilter;
  });

  return (
    <div className="p-6 space-y-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900">Interviews & Evaluations</h1>
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
              {filteredInterviews.length} Sessions
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Coordinate interview rounds, interviewer panels, and quantitative evaluation scorecards.
          </p>
        </div>

        <button
          onClick={() => openScheduleInterviewModal()}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#0073e6] hover:bg-[#0062c4] rounded-md shadow-xs transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule Interview</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-md">
          <button
            onClick={() => setTabFilter('all')}
            className={`px-3 py-1 text-xs font-medium rounded transition-all cursor-pointer ${
              tabFilter === 'all'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Rounds
          </button>
          <button
            onClick={() => setTabFilter('Scheduled')}
            className={`px-3 py-1 text-xs font-medium rounded transition-all cursor-pointer ${
              tabFilter === 'Scheduled'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Scheduled ({interviews.filter((i) => i.status === 'Scheduled').length})
          </button>
          <button
            onClick={() => setTabFilter('Completed')}
            className={`px-3 py-1 text-xs font-medium rounded transition-all cursor-pointer ${
              tabFilter === 'Completed'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Completed & Evaluated ({interviews.filter((i) => i.status === 'Completed').length})
          </button>
        </div>
      </div>

      {/* Interviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredInterviews.length === 0 ? (
          <div className="col-span-2 bg-white rounded-lg border border-slate-200 p-12 text-center text-slate-500">
            <CalendarIcon className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="font-semibold text-slate-700">No interviews found</p>
            <p className="text-xs text-slate-400 mt-1">
              Click &quot;Schedule Interview&quot; to arrange an interview round.
            </p>
          </div>
        ) : (
          filteredInterviews.map((int) => {
            const isScheduled = int.status === 'Scheduled';
            const sc = int.scorecard;

            return (
              <div
                key={int.id}
                className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-blue-300 transition-all"
              >
                <div>
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div
                        onClick={() => openCandidateDetail(int.candidateId)}
                        className="font-bold text-sm text-slate-900 hover:text-blue-600 cursor-pointer"
                      >
                        {int.candidateName}
                      </div>
                      <div className="text-xs font-semibold text-blue-700 mt-0.5">
                        {int.roundName}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 truncate">
                        {int.jobTitle}
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded border uppercase ${
                        isScheduled
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}
                    >
                      {int.status}
                    </span>
                  </div>

                  {/* Date, Time, Interviewers */}
                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded border border-slate-100">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-medium">Date & Time</span>
                      <span className="font-semibold text-slate-800 font-mono">
                        {int.date} · {int.time}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-medium">Interview Panel</span>
                      <span className="font-medium text-slate-800 truncate block">
                        {int.interviewerNames.join(', ')}
                      </span>
                    </div>
                  </div>

                  {/* Scorecard Summary if completed */}
                  {sc && (
                    <div className="mt-3 p-3 bg-slate-50/70 border border-slate-200 rounded text-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-700">Evaluation Scorecard</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            sc.overallRecommendation.includes('Hire')
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {sc.overallRecommendation}
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-1 text-center text-[10px]">
                        <div className="bg-white p-1 rounded border border-slate-200">
                          <span className="text-slate-400 block">Tech</span>
                          <span className="font-bold text-slate-800">{sc.technicalSkills}/5</span>
                        </div>
                        <div className="bg-white p-1 rounded border border-slate-200">
                          <span className="text-slate-400 block">Problem</span>
                          <span className="font-bold text-slate-800">{sc.problemSolving}/5</span>
                        </div>
                        <div className="bg-white p-1 rounded border border-slate-200">
                          <span className="text-slate-400 block">Comm</span>
                          <span className="font-bold text-slate-800">{sc.communication}/5</span>
                        </div>
                        <div className="bg-white p-1 rounded border border-slate-200">
                          <span className="text-slate-400 block">Culture</span>
                          <span className="font-bold text-slate-800">{sc.culturalFit}/5</span>
                        </div>
                      </div>
                      {sc.summaryNotes && (
                        <p className="text-[11px] text-slate-600 italic">
                          &quot;{sc.summaryNotes}&quot;
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {int.meetingLink && isScheduled && (
                      <a
                        href={int.meetingLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded border border-blue-200 transition-colors"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Launch Video</span>
                      </a>
                    )}
                    {isScheduled && (
                      <button
                        onClick={() => updateInterviewStatus(int.id, 'Cancelled')}
                        className="text-xs text-slate-400 hover:text-red-600 transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>

                  {isScheduled ? (
                    <button
                      onClick={() => openScorecardModal(int)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded transition-colors shadow-xs cursor-pointer"
                    >
                      <ClipboardCheck className="w-3.5 h-3.5" />
                      <span>Submit Scorecard</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => openScorecardModal(int)}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-800"
                    >
                      View Full Scorecard
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
