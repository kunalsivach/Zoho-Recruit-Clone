import React, { useState } from 'react';
import { X, UserPlus, Sparkles } from 'lucide-react';
import { useRecruit } from '../../context/RecruitContext';
import { STAGES } from '../../data/seedData';
import { RecruitmentStage } from '../../types/recruit';

export const CreateCandidateModal: React.FC = () => {
  const {
    isCreateCandidateOpen,
    setIsCreateCandidateOpen,
    jobs,
    addCandidate,
    openCandidateDetail,
    setIsResumeParserOpen,
  } = useRecruit();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('San Francisco, CA');
  const [currentRole, setCurrentRole] = useState('');
  const [currentCompany, setCurrentCompany] = useState('');
  const [experienceYears, setExperienceYears] = useState('5');
  const [expectedSalary, setExpectedSalary] = useState('$185,000 / yr');
  const [source, setSource] = useState<'LinkedIn' | 'Career Portal' | 'Referral' | 'Indeed' | 'Recruiter Sourced'>('LinkedIn');
  const [stage, setStage] = useState<RecruitmentStage>('sourced');
  const [associatedJobId, setAssociatedJobId] = useState(jobs[0]?.id || '');
  const [skills, setSkills] = useState('React, TypeScript, Node.js');
  const [education, setEducation] = useState('B.S. Computer Science');

  if (!isCreateCandidateOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const targetJob = jobs.find((j) => j.id === associatedJobId) || jobs[0];

    const newCand = addCandidate({
      name,
      email,
      phone: phone || '+1 (555) 123-4567',
      location,
      currentRole: currentRole || 'Software Professional',
      currentCompany: currentCompany || 'Tech Enterprise',
      experienceYears: parseInt(experienceYears) || 4,
      expectedSalary,
      rating: 4,
      source,
      stage,
      associatedJobId: targetJob ? targetJob.id : 'job-101',
      associatedJobTitle: targetJob ? targetJob.title : 'Staff Systems Engineer',
      skills: skills.split(',').map((s) => s.trim()).filter(Boolean),
      education,
      resumeFileName: `${name.replace(/\s+/g, '_')}_CV.pdf`,
      resumeSummary: `${name} is an experienced professional in ${currentRole || 'engineering'} with ${experienceYears} years of track record.`,
    });

    setIsCreateCandidateOpen(false);
    openCandidateDetail(newCand.id);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
      <div className="bg-white rounded-lg shadow-2xl border border-slate-200 w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-emerald-600" />
            <h2 className="text-sm font-bold text-slate-900">Add Candidate to Talent Pool</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsCreateCandidateOpen(false);
                setIsResumeParserOpen(true);
              }}
              className="flex items-center gap-1 text-[11px] font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 px-2.5 py-1 rounded border border-purple-200 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>Use Resume Parser</span>
            </button>
            <button
              onClick={() => setIsCreateCandidateOpen(false)}
              className="text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs overflow-y-auto flex-1">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Jordan Hayes"
                className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs focus:bg-white focus:outline-hidden focus:border-blue-500 font-medium"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Email Address *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jordan.h@example.com"
                className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs focus:bg-white focus:outline-hidden focus:border-blue-500 font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (415) 555-0123"
                className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="San Francisco, CA"
                className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Current Job Title</label>
              <input
                type="text"
                value={currentRole}
                onChange={(e) => setCurrentRole(e.target.value)}
                placeholder="Senior Full Stack Engineer"
                className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Current Employer</label>
              <input
                type="text"
                value={currentCompany}
                onChange={(e) => setCurrentCompany(e.target.value)}
                placeholder="Uber, Stripe, etc."
                className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Years of Experience</label>
              <input
                type="number"
                value={experienceYears}
                onChange={(e) => setExperienceYears(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Target Requisition *</label>
              <select
                value={associatedJobId}
                onChange={(e) => setAssociatedJobId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs font-medium"
              >
                {jobs.map((j) => (
                  <option key={j.id} value={j.id}>
                    {j.requisitionCode} - {j.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Source</label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs"
              >
                <option value="LinkedIn">LinkedIn</option>
                <option value="Career Portal">Career Portal</option>
                <option value="Referral">Referral</option>
                <option value="Indeed">Indeed</option>
                <option value="Recruiter Sourced">Recruiter Sourced</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Initial Stage</label>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs"
              >
                {STAGES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Skills (comma separated)
            </label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="TypeScript, Python, AWS, Docker"
              className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Education</label>
            <input
              type="text"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              placeholder="B.S. in Computer Science"
              className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs"
            />
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsCreateCandidateOpen(false)}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded shadow-xs"
            >
              Add Candidate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
