import React, { useState } from 'react';
import { X, ClipboardCheck, Star } from 'lucide-react';
import { useRecruit } from '../../context/RecruitContext';

export const ScorecardModal: React.FC = () => {
  const {
    isScorecardModalOpen,
    closeScorecardModal,
    activeInterviewForScorecard,
    submitScorecard,
  } = useRecruit();

  const [interviewerName, setInterviewerName] = useState(
    activeInterviewForScorecard?.interviewerNames[0] || 'Anita Patel (Head of SRE)'
  );
  const [technicalSkills, setTechnicalSkills] = useState(4);
  const [problemSolving, setProblemSolving] = useState(5);
  const [communication, setCommunication] = useState(4);
  const [culturalFit, setCulturalFit] = useState(5);
  const [overallRecommendation, setOverallRecommendation] = useState<
    'Strong Hire' | 'Hire' | 'Hold' | 'Strong No Hire'
  >('Strong Hire');
  const [summaryNotes, setSummaryNotes] = useState(
    'Demonstrated thorough domain mastery, clear thinking under ambiguous constraints, and strong alignment with team core values.'
  );

  if (!isScorecardModalOpen || !activeInterviewForScorecard) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitScorecard({
      interviewId: activeInterviewForScorecard.id,
      interviewerName,
      technicalSkills,
      problemSolving,
      communication,
      culturalFit,
      overallRecommendation,
      summaryNotes,
    });
    closeScorecardModal();
  };

  const renderStarSelector = (value: number, setValue: (v: number) => void) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setValue(star)}
          className="p-1 hover:scale-110 transition-transform cursor-pointer"
        >
          <Star
            className={`w-5 h-5 ${
              star <= value ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
            }`}
          />
        </button>
      ))}
      <span className="text-xs font-bold text-slate-700 ml-2 font-mono">{value}/5</span>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
      <div className="bg-white rounded-lg shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ClipboardCheck className="w-5 h-5 text-emerald-600" />
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Evaluation Scorecard
              </h2>
              <div className="text-[11px] text-slate-500">
                Candidate: {activeInterviewForScorecard.candidateName} · {activeInterviewForScorecard.roundName}
              </div>
            </div>
          </div>
          <button onClick={closeScorecardModal} className="text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Evaluator / Interviewer Name</label>
            <input
              type="text"
              required
              value={interviewerName}
              onChange={(e) => setInterviewerName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-1.5 text-xs focus:bg-white focus:outline-hidden focus:border-blue-500 font-medium"
            />
          </div>

          {/* Rating Criteria Matrix */}
          <div className="space-y-3 bg-slate-50 p-4 rounded-lg border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-800 block">Technical Craft & Domain Mastery</span>
                <span className="text-[10px] text-slate-400">System depth, correctness, code clarity</span>
              </div>
              {renderStarSelector(technicalSkills, setTechnicalSkills)}
            </div>

            <div className="flex items-center justify-between border-t border-slate-200 pt-2.5">
              <div>
                <span className="font-bold text-slate-800 block">Problem Solving & Analytical Rigor</span>
                <span className="text-[10px] text-slate-400">Trade-off evaluation, edge cases, speed</span>
              </div>
              {renderStarSelector(problemSolving, setProblemSolving)}
            </div>

            <div className="flex items-center justify-between border-t border-slate-200 pt-2.5">
              <div>
                <span className="font-bold text-slate-800 block">Communication & Articulation</span>
                <span className="text-[10px] text-slate-400">Listening, concise explanations, clarity</span>
              </div>
              {renderStarSelector(communication, setCommunication)}
            </div>

            <div className="flex items-center justify-between border-t border-slate-200 pt-2.5">
              <div>
                <span className="font-bold text-slate-800 block">Culture & Mission Alignment</span>
                <span className="text-[10px] text-slate-400">Collaboration, growth mindset, ownership</span>
              </div>
              {renderStarSelector(culturalFit, setCulturalFit)}
            </div>
          </div>

          {/* Overall Recommendation Segmented Control */}
          <div>
            <label className="block text-slate-700 font-bold mb-2">Overall Recommendation *</label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'Strong Hire', color: 'border-emerald-600 bg-emerald-50 text-emerald-800' },
                { id: 'Hire', color: 'border-blue-600 bg-blue-50 text-blue-800' },
                { id: 'Hold', color: 'border-amber-600 bg-amber-50 text-amber-800' },
                { id: 'Strong No Hire', color: 'border-red-600 bg-red-50 text-red-800' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setOverallRecommendation(opt.id as any)}
                  className={`p-2 rounded border text-center font-bold text-xs transition-all cursor-pointer ${
                    overallRecommendation === opt.id
                      ? `${opt.color} ring-2 ring-offset-1`
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {opt.id}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Debrief Summary & Feedback</label>
            <textarea
              rows={3}
              value={summaryNotes}
              onChange={(e) => setSummaryNotes(e.target.value)}
              placeholder="Detailed feedback for the hiring committee..."
              className="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-xs focus:bg-white focus:outline-hidden focus:border-blue-500"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={closeScorecardModal}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded shadow-xs"
            >
              Submit Scorecard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
