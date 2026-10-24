import React, { useState } from 'react';
import { X, FileCheck, DollarSign } from 'lucide-react';
import { useRecruit } from '../../context/RecruitContext';

export const CreateOfferModal: React.FC = () => {
  const {
    isCreateOfferOpen,
    closeCreateOfferModal,
    preselectedCandidateForOffer,
    candidates,
    jobs,
    createOffer,
  } = useRecruit();

  const [candidateId, setCandidateId] = useState(
    preselectedCandidateForOffer?.id || candidates[0]?.id || ''
  );
  const [annualSalary, setAnnualSalary] = useState('210000');
  const [bonusPercentage, setBonusPercentage] = useState('15');
  const [stockUnits, setStockUnits] = useState('10000');
  const [joiningDate, setJoiningDate] = useState('2026-11-15');
  const [expirationDate, setExpirationDate] = useState('2026-10-31');
  const [specialTerms, setSpecialTerms] = useState(
    '$25,000 sign-on bonus upon successful completion of 90 days; flexible remote equipment allowance.'
  );

  if (!isCreateOfferOpen) return null;

  const currentCandidate = candidates.find((c) => c.id === candidateId) || candidates[0];
  const associatedJob = jobs.find((j) => j.id === currentCandidate?.associatedJobId) || jobs[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCandidate) return;

    createOffer({
      candidateId: currentCandidate.id,
      candidateName: currentCandidate.name,
      jobId: associatedJob?.id || 'job-101',
      jobTitle: associatedJob?.title || currentCandidate.associatedJobTitle,
      annualSalary: parseInt(annualSalary) || 200000,
      bonusPercentage: parseInt(bonusPercentage) || 15,
      stockUnits: parseInt(stockUnits) || 0,
      joiningDate,
      expirationDate,
      status: 'Sent',
      specialTerms,
    });

    closeCreateOfferModal();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
      <div className="bg-white rounded-lg shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-emerald-600" />
            <h2 className="text-sm font-bold text-slate-900">
              Draft & Extend Offer Letter
            </h2>
          </div>
          <button onClick={closeCreateOfferModal} className="text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Target Candidate *</label>
            <select
              value={candidateId}
              onChange={(e) => setCandidateId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs focus:bg-white focus:outline-hidden focus:border-blue-500 font-medium"
            >
              {candidates.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} — {c.associatedJobTitle}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Annual Base Salary ($ USD) *
              </label>
              <input
                type="number"
                required
                value={annualSalary}
                onChange={(e) => setAnnualSalary(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs focus:bg-white focus:outline-hidden focus:border-blue-500 font-mono font-bold"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Target Annual Bonus (%)
              </label>
              <input
                type="number"
                value={bonusPercentage}
                onChange={(e) => setBonusPercentage(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Stock / Equity Units</label>
              <input
                type="number"
                value={stockUnits}
                onChange={(e) => setStockUnits(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Target Start Date</label>
              <input
                type="date"
                required
                value={joiningDate}
                onChange={(e) => setJoiningDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Offer Expiration Date</label>
            <input
              type="date"
              required
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Special Terms & Sign-on Bonuses</label>
            <textarea
              rows={3}
              value={specialTerms}
              onChange={(e) => setSpecialTerms(e.target.value)}
              placeholder="Clawback clauses, relocation allowances, sign-on commitments..."
              className="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-xs focus:bg-white focus:outline-hidden focus:border-blue-500"
            />
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={closeCreateOfferModal}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded shadow-xs"
            >
              Extend Formal Offer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
