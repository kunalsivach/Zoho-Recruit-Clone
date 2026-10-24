import React, { useState } from 'react';
import {
  X,
  Mail,
  Phone,
  Building,
  MapPin,
  Calendar,
  Star,
  FileText,
  PhoneCall,
  MessageSquare,
  Plus,
  Clock,
  CheckCircle,
  FileCheck,
  Send,
  Sparkles,
} from 'lucide-react';
import { useRecruit } from '../../context/RecruitContext';
import { STAGES } from '../../data/seedData';
import { RecruitmentStage } from '../../types/recruit';

export const CandidateDetailModal: React.FC = () => {
  const {
    selectedCandidate,
    closeCandidateDetail,
    updateCandidateStage,
    addCandidateNote,
    logCandidateCall,
    openScheduleInterviewModal,
    openCreateOfferModal,
    interviews,
    deleteCandidate,
  } = useRecruit();

  const [activeTab, setActiveTab] = useState<'overview' | 'resume' | 'activity' | 'interviews'>('overview');
  const [newNote, setNewNote] = useState('');
  const [callDuration, setCallDuration] = useState('20');
  const [callOutcome, setCallOutcome] = useState<'Screening Passed' | 'Interested' | 'Not Interested' | 'Callback Requested'>('Screening Passed');
  const [callNotes, setCallNotes] = useState('');
  const [showCallForm, setShowCallForm] = useState(false);

  if (!selectedCandidate) return null;

  const candidateInterviews = interviews.filter((i) => i.candidateId === selectedCandidate.id);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    addCandidateNote(selectedCandidate.id, newNote);
    setNewNote('');
  };

  const handleLogCall = (e: React.FormEvent) => {
    e.preventDefault();
    logCandidateCall(selectedCandidate.id, {
      caller: 'Sarah Jenkins',
      durationMinutes: parseInt(callDuration) || 15,
      outcome: callOutcome,
      notes: callNotes || 'Initial candidate screening call conducted.',
      callDate: new Date().toLocaleString(),
    });
    setCallNotes('');
    setShowCallForm(false);
  };

  const currentStageDef = STAGES.find((s) => s.id === selectedCandidate.stage);

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex justify-end z-50 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl h-full shadow-2xl flex flex-col border-l border-slate-200 overflow-hidden">
        {/* Top Header */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">
              Candidate Dossier 360°
            </span>
            <span className="text-xs text-slate-400">ID: {selectedCandidate.id}</span>
          </div>

          <button
            onClick={closeCandidateDetail}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Candidate Profile Strip */}
        <div className="p-6 bg-white border-b border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-sky-600 to-blue-700 text-white font-bold text-xl flex items-center justify-center shrink-0 shadow-md">
                {selectedCandidate.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-slate-900">{selectedCandidate.name}</h2>
                  <div className="flex items-center text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="text-xs font-bold text-slate-700 ml-1">
                      {selectedCandidate.rating}.0
                    </span>
                  </div>
                </div>

                <div className="text-xs font-semibold text-slate-700 mt-0.5">
                  {selectedCandidate.currentRole} at {selectedCandidate.currentCompany}
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-500 mt-2 flex-wrap">
                  <div className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <a href={`mailto:${selectedCandidate.email}`} className="text-blue-600 hover:underline">
                      {selectedCandidate.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{selectedCandidate.phone}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{selectedCandidate.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stage Selector */}
            <div className="text-right shrink-0">
              <label className="text-[10px] font-semibold uppercase text-slate-400 block mb-1">
                Recruitment Stage
              </label>
              <select
                value={selectedCandidate.stage}
                onChange={(e) =>
                  updateCandidateStage(selectedCandidate.id, e.target.value as RecruitmentStage)
                }
                className="text-xs font-bold rounded-md px-3 py-1.5 border border-slate-300 bg-slate-50 text-slate-800 shadow-2xs focus:outline-hidden focus:border-blue-500 cursor-pointer"
              >
                {STAGES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2 flex-wrap">
            <button
              onClick={() => openScheduleInterviewModal(selectedCandidate)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              <span>Schedule Interview</span>
            </button>

            <button
              onClick={() => openCreateOfferModal(selectedCandidate)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
            >
              <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Draft Offer Letter</span>
            </button>

            <button
              onClick={() => setShowCallForm(!showCallForm)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-600" />
              <span>Log Phone Call</span>
            </button>

            <button
              onClick={() => deleteCandidate(selectedCandidate.id)}
              className="ml-auto text-xs text-red-500 hover:text-red-700 hover:underline cursor-pointer"
            >
              Archive Candidate
            </button>
          </div>

          {/* Inline Log Call Drawer */}
          {showCallForm && (
            <form onSubmit={handleLogCall} className="mt-3 p-3 bg-amber-50/70 border border-amber-200 rounded-md space-y-2 text-xs">
              <div className="font-semibold text-amber-900 flex items-center justify-between">
                <span>Log Screening or Follow-up Call</span>
                <button type="button" onClick={() => setShowCallForm(false)} className="text-amber-700 hover:text-amber-900">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-600 block">Duration (min)</label>
                  <input
                    type="number"
                    value={callDuration}
                    onChange={(e) => setCallDuration(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-600 block">Outcome</label>
                  <select
                    value={callOutcome}
                    onChange={(e) => setCallOutcome(e.target.value as any)}
                    className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs"
                  >
                    <option value="Screening Passed">Screening Passed</option>
                    <option value="Interested">Interested</option>
                    <option value="Callback Requested">Callback Requested</option>
                    <option value="Not Interested">Not Interested</option>
                  </select>
                </div>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Call discussion notes..."
                  value={callNotes}
                  onChange={(e) => setCallNotes(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs"
                />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded text-xs">
                  Save Call Record
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Tab Strip */}
        <div className="flex items-center border-b border-slate-200 bg-slate-50 px-6 text-xs">
          {[
            { id: 'overview', label: 'Candidate Overview' },
            { id: 'resume', label: 'Resume & Dossier' },
            { id: 'activity', label: `Recruiter Notes (${selectedCandidate.notes.length})` },
            { id: 'interviews', label: `Interviews (${candidateInterviews.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-4 font-semibold border-b-2 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-700 bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1 text-xs space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-5">
              {/* Applied Requisition Info */}
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                <div className="text-[11px] font-semibold uppercase text-slate-400">
                  Target Requisition
                </div>
                <div className="text-sm font-bold text-slate-900">
                  {selectedCandidate.associatedJobTitle}
                </div>
                <div className="text-slate-500 text-[11px] flex items-center gap-3">
                  <span>Applied on: {selectedCandidate.appliedDate}</span>
                  <span>·</span>
                  <span>Sourced via: {selectedCandidate.source}</span>
                </div>
              </div>

              {/* Core Information Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-white border border-slate-200 rounded-md">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Total Experience</span>
                  <span className="text-sm font-bold text-slate-900">{selectedCandidate.experienceYears} Years</span>
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-md">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Expected Salary</span>
                  <span className="text-sm font-bold text-slate-900 font-mono">{selectedCandidate.expectedSalary}</span>
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-md col-span-2">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Education</span>
                  <span className="text-xs font-medium text-slate-800">{selectedCandidate.education}</span>
                </div>
              </div>

              {/* Skills Tags */}
              <div>
                <span className="text-xs font-bold text-slate-900 block mb-2">Verified Skill Competencies</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCandidate.skills.map((skill, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-800 px-2.5 py-1 rounded text-xs font-medium border border-slate-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recent Call Logs if any */}
              {selectedCandidate.callLogs.length > 0 && (
                <div>
                  <span className="text-xs font-bold text-slate-900 block mb-2">Screening Call History</span>
                  <div className="space-y-2">
                    {selectedCandidate.callLogs.map((log) => (
                      <div key={log.id} className="p-3 bg-slate-50 border border-slate-200 rounded-md text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-800">{log.outcome} ({log.durationMinutes} min)</span>
                          <span className="text-[10px] text-slate-400 font-mono">{log.callDate}</span>
                        </div>
                        <p className="text-slate-600">{log.notes}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: RESUME & DOSSIER */}
          {activeTab === 'resume' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-bold text-slate-900">{selectedCandidate.resumeFileName || `${selectedCandidate.name}_Resume.pdf`}</div>
                    <div className="text-[10px] text-slate-400 font-mono">Parsed via Zoho Talent Ingestion Engine</div>
                  </div>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Parsed & Verified
                </span>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-1.5">Executive Summary</h3>
                <p className="text-slate-600 bg-slate-50 p-3.5 rounded border border-slate-200 leading-relaxed text-xs">
                  {selectedCandidate.resumeSummary || 'Standard candidate profile ingested into recruitment database.'}
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-1.5">Parsed Resume Preview</h3>
                <div className="bg-slate-900 text-slate-200 p-4 rounded-lg font-mono text-[11px] whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto border border-slate-800">
                  {`${selectedCandidate.name.toUpperCase()}
Email: ${selectedCandidate.email} | Phone: ${selectedCandidate.phone}
Location: ${selectedCandidate.location}
Current Position: ${selectedCandidate.currentRole} at ${selectedCandidate.currentCompany}

EDUCATION:
${selectedCandidate.education}

CORE SKILLS:
${selectedCandidate.skills.join(', ')}

EXPERIENCE OVERVIEW:
- ${selectedCandidate.experienceYears} years of progressive experience delivering enterprise solutions.
- ${selectedCandidate.resumeSummary}
- Spearheaded core initiatives resulting in improved velocity, maintainability, and customer satisfaction.`}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: NOTES & ACTIVITY */}
          {activeTab === 'activity' && (
            <div className="space-y-4">
              <form onSubmit={handleAddNote} className="space-y-2">
                <label className="text-xs font-bold text-slate-900 block">Add Recruiter Note / Debrief</label>
                <textarea
                  rows={3}
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Record interview notes, compensation discussions, or manager feedback..."
                  className="w-full bg-slate-50 border border-slate-200 rounded p-2.5 text-xs focus:bg-white focus:outline-hidden focus:border-blue-500"
                />
                <div className="flex justify-end">
                  <button type="submit" className="px-3.5 py-1.5 bg-[#0073e6] hover:bg-[#0062c4] text-white font-semibold rounded text-xs shadow-xs">
                    Post Note
                  </button>
                </div>
              </form>

              <div className="border-t border-slate-200 pt-4 space-y-3">
                {selectedCandidate.notes.length === 0 ? (
                  <p className="text-slate-400 italic text-center py-4">No notes added yet for this candidate.</p>
                ) : (
                  selectedCandidate.notes.map((note) => (
                    <div key={note.id} className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-slate-900">{note.author}</span>
                        <span className="text-slate-400 font-mono">{note.createdAt}</span>
                      </div>
                      <p className="text-slate-700 leading-normal">{note.text}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 4: INTERVIEWS */}
          {activeTab === 'interviews' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900">Scheduled & Completed Rounds</h3>
                <button
                  onClick={() => openScheduleInterviewModal(selectedCandidate)}
                  className="text-xs font-semibold text-blue-600 hover:underline"
                >
                  + Schedule Next Round
                </button>
              </div>

              {candidateInterviews.length === 0 ? (
                <div className="p-6 bg-slate-50 rounded border border-slate-200 text-center text-slate-400">
                  No interview rounds scheduled yet.
                </div>
              ) : (
                candidateInterviews.map((int) => (
                  <div key={int.id} className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-sm">{int.roundName}</span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded uppercase ${
                        int.status === 'Scheduled' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        {int.status}
                      </span>
                    </div>

                    <div className="text-xs text-slate-600">
                      Date: <span className="font-mono font-medium">{int.date} at {int.time}</span>
                    </div>
                    <div className="text-xs text-slate-600">
                      Panel: <span className="font-medium">{int.interviewerNames.join(', ')}</span>
                    </div>

                    {int.scorecard && (
                      <div className="mt-2 pt-2 border-t border-slate-200 text-xs text-slate-700">
                        <div className="font-semibold text-emerald-700">
                          Scorecard: {int.scorecard.overallRecommendation}
                        </div>
                        <p className="italic text-[11px] text-slate-600 mt-0.5">
                          &quot;{int.scorecard.summaryNotes}&quot;
                        </p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
