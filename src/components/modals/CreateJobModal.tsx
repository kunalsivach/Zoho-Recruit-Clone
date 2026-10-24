import React, { useState } from 'react';
import { X, Briefcase } from 'lucide-react';
import { useRecruit } from '../../context/RecruitContext';

export const CreateJobModal: React.FC = () => {
  const {
    isCreateJobOpen,
    setIsCreateJobOpen,
    mode,
    clientsOrDepts,
    addJob,
  } = useRecruit();

  const [title, setTitle] = useState('');
  const [departmentOrClient, setDepartmentOrClient] = useState(
    clientsOrDepts[0]?.name || 'Core Platform Engineering'
  );
  const [hiringManagerOrContact, setHiringManagerOrContact] = useState('Elena Rostova (VP Eng)');
  const [location, setLocation] = useState('San Francisco, CA / Remote');
  const [type, setType] = useState<'Full-time' | 'Contract' | 'Remote' | 'Part-time'>('Full-time');
  const [salaryMin, setSalaryMin] = useState('170000');
  const [salaryMax, setSalaryMax] = useState('210000');
  const [billRate, setBillRate] = useState('$130/hr');
  const [requiredSkills, setRequiredSkills] = useState('TypeScript, React, PostgreSQL');
  const [targetDate, setTargetDate] = useState('2026-12-01');
  const [openPositions, setOpenPositions] = useState('1');
  const [description, setDescription] = useState('');

  if (!isCreateJobOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    addJob({
      title,
      departmentOrClient,
      hiringManagerOrContact,
      location,
      type,
      status: 'In-progress',
      targetDate,
      salaryMin: parseInt(salaryMin) || 160000,
      salaryMax: parseInt(salaryMax) || 200000,
      billRate,
      requiredSkills: requiredSkills.split(',').map((s) => s.trim()).filter(Boolean),
      description: description || `Lead technical initiatives for ${title}.`,
      openPositions: parseInt(openPositions) || 1,
      recruiter: 'Sarah Jenkins',
    });

    setIsCreateJobOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
      <div className="bg-white rounded-lg shadow-2xl border border-slate-200 w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-900">
              Create {mode === 'corporate' ? 'Job Opening Requisition' : 'Client Job Order'}
            </h2>
          </div>
          <button
            onClick={() => setIsCreateJobOpen(false)}
            className="text-slate-400 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs overflow-y-auto flex-1">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Position Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Senior Backend Systems Architect"
              className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs focus:bg-white focus:outline-hidden focus:border-blue-500 font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                {mode === 'corporate' ? 'Department' : 'Client Organization'} *
              </label>
              <select
                value={departmentOrClient}
                onChange={(e) => setDepartmentOrClient(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs focus:bg-white focus:outline-hidden focus:border-blue-500 font-medium"
              >
                {clientsOrDepts.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                {mode === 'corporate' ? 'Hiring Manager' : 'Contact Person'}
              </label>
              <input
                type="text"
                value={hiringManagerOrContact}
                onChange={(e) => setHiringManagerOrContact(e.target.value)}
                placeholder="Elena Rostova (VP Eng)"
                className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs focus:bg-white focus:outline-hidden focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Employment Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs focus:bg-white focus:outline-hidden focus:border-blue-500"
              >
                <option value="Full-time">Full-time</option>
                <option value="Contract">Contract</option>
                <option value="Remote">Remote</option>
                <option value="Part-time">Part-time</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="San Francisco, CA / Remote"
                className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs focus:bg-white focus:outline-hidden focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Min Annual Salary ($)</label>
              <input
                type="number"
                value={salaryMin}
                onChange={(e) => setSalaryMin(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs focus:bg-white focus:outline-hidden focus:border-blue-500 font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Max Annual Salary ($)</label>
              <input
                type="number"
                value={salaryMax}
                onChange={(e) => setSalaryMax(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs focus:bg-white focus:outline-hidden focus:border-blue-500 font-mono"
              />
            </div>
          </div>

          {mode === 'agency' && (
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Bill Rate to Client</label>
              <input
                type="text"
                value={billRate}
                onChange={(e) => setBillRate(e.target.value)}
                placeholder="$135/hr"
                className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs font-mono"
              />
            </div>
          )}

          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Required Skills (comma separated)
            </label>
            <input
              type="text"
              value={requiredSkills}
              onChange={(e) => setRequiredSkills(e.target.value)}
              placeholder="React, TypeScript, Node.js, GraphQL"
              className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs focus:bg-white focus:outline-hidden focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Target Close Date</label>
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Open Headcount Positions</label>
              <input
                type="number"
                min="1"
                value={openPositions}
                onChange={(e) => setOpenPositions(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Job Description & Responsibilities</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Key mission, requirements, and day-to-day expectations..."
              className="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-xs focus:bg-white focus:outline-hidden focus:border-blue-500"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsCreateJobOpen(false)}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#0073e6] hover:bg-[#0062c4] text-white font-bold rounded shadow-xs"
            >
              Create Requisition
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
