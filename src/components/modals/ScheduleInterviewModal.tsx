import React, { useState } from 'react';
import { X, Calendar, Video, Clock } from 'lucide-react';
import { useRecruit } from '../../context/RecruitContext';

export const ScheduleInterviewModal: React.FC = () => {
  const {
    isScheduleInterviewOpen,
    closeScheduleInterviewModal,
    preselectedCandidateForInterview,
    candidates,
    jobs,
    scheduleInterview,
  } = useRecruit();

  const [candidateId, setCandidateId] = useState(
    preselectedCandidateForInterview?.id || candidates[0]?.id || ''
  );
  const [roundName, setRoundName] = useState('Round 1: Technical System Architecture');
  const [date, setDate] = useState('2026-10-25');
  const [time, setTime] = useState('14:00 - 15:00');
  const [durationMinutes, setDurationMinutes] = useState('60');
  const [interviewers, setInterviewers] = useState('Anita Patel (Head of SRE), Carl Wu (Senior SRE)');
  const [type, setType] = useState<'Video Call' | 'In-person' | 'Phone Call'>('Video Call');
  const [meetingLink, setMeetingLink] = useState('https://meet.zoho.com/rec-eval-round');

  if (!isScheduleInterviewOpen) return null;

  const currentCandidate = candidates.find((c) => c.id === candidateId) || candidates[0];
  const associatedJob = jobs.find((j) => j.id === currentCandidate?.associatedJobId) || jobs[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCandidate) return;

    scheduleInterview({
      candidateId: currentCandidate.id,
      candidateName: currentCandidate.name,
      jobId: associatedJob?.id || 'job-101',
      jobTitle: associatedJob?.title || currentCandidate.associatedJobTitle,
      roundName,
      date,
      time,
      durationMinutes: parseInt(durationMinutes) || 60,
      interviewerNames: interviewers.split(',').map((s) => s.trim()).filter(Boolean),
      type,
      meetingLink,
    });

    closeScheduleInterviewModal();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
      <div className="bg-white rounded-lg shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-900">Schedule Interview Round</h2>
          </div>
          <button onClick={closeScheduleInterviewModal} className="text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Candidate *</label>
            <select
              value={candidateId}
              onChange={(e) => setCandidateId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs focus:bg-white focus:outline-hidden focus:border-blue-500 font-medium"
            >
              {candidates.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.associatedJobTitle})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Interview Round Title *</label>
            <input
              type="text"
              required
              value={roundName}
              onChange={(e) => setRoundName(e.target.value)}
              placeholder="e.g. Round 2: Executive Bar Raiser"
              className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs focus:bg-white focus:outline-hidden focus:border-blue-500 font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Date</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Time Slot</label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="14:00 - 15:00"
                className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Interviewers / Hiring Panel (comma separated)
            </label>
            <input
              type="text"
              value={interviewers}
              onChange={(e) => setInterviewers(e.target.value)}
              placeholder="Elena Rostova (VP Eng), Sarah Jenkins"
              className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Format</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs"
              >
                <option value="Video Call">Video Call</option>
                <option value="Phone Call">Phone Call</option>
                <option value="In-person">In-person</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Duration (minutes)</label>
              <input
                type="number"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs font-mono"
              />
            </div>
          </div>

          {type === 'Video Call' && (
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Zoho Meeting Link</label>
              <input
                type="text"
                value={meetingLink}
                onChange={(e) => setMeetingLink(e.target.value)}
                placeholder="https://meet.zoho.com/rec-call"
                className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs font-mono"
              />
            </div>
          )}

          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={closeScheduleInterviewModal}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#0073e6] hover:bg-[#0062c4] text-white font-bold rounded shadow-xs"
            >
              Schedule Interview
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
