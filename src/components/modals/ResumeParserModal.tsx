import React, { useState } from 'react';
import {
  X,
  Sparkles,
  FileText,
  Upload,
  CheckCircle,
  ArrowRight,
  Briefcase,
  UserCheck,
} from 'lucide-react';
import { useRecruit } from '../../context/RecruitContext';
import { SAMPLE_RESUMES } from '../../data/seedData';

export const ResumeParserModal: React.FC = () => {
  const {
    isResumeParserOpen,
    setIsResumeParserOpen,
    jobs,
    addCandidate,
    openCandidateDetail,
  } = useRecruit();

  const [resumeText, setResumeText] = useState(SAMPLE_RESUMES[0].sampleText);
  const [selectedJobId, setSelectedJobId] = useState<string>(jobs[0]?.id || '');
  const [isParsing, setIsParsing] = useState(false);
  const [parsedData, setParsedData] = useState<{
    name: string;
    email: string;
    phone: string;
    location: string;
    currentRole: string;
    currentCompany: string;
    experienceYears: number;
    education: string;
    skills: string[];
    summary: string;
  } | null>(null);

  if (!isResumeParserOpen) return null;

  const handleSelectSample = (sampleId: string) => {
    const sample = SAMPLE_RESUMES.find((s) => s.id === sampleId);
    if (sample) {
      setResumeText(sample.sampleText);
      setParsedData(null);
    }
  };

  // Rule-based resume parser simulator
  const handleParse = () => {
    setIsParsing(true);
    setTimeout(() => {
      const lines = resumeText.split('\n').map((l) => l.trim()).filter(Boolean);

      // Extract name (usually first non-empty line)
      const name = lines[0]?.replace(/[^a-zA-Z\s]/g, '') || 'Karan Mehra';

      // Extract email regex
      const emailMatch = resumeText.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/i);
      const email = emailMatch ? emailMatch[1] : 'karan.mehra@devtech.org';

      // Extract phone regex
      const phoneMatch = resumeText.match(/(\+?\d{1,2}[\s-]?)?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}/);
      const phone = phoneMatch ? phoneMatch[0] : '+1 (415) 789-2045';

      // Location
      let location = 'San Francisco, CA';
      if (resumeText.toLowerCase().includes('austin')) location = 'Austin, TX';
      if (resumeText.toLowerCase().includes('new york')) location = 'New York, NY';
      if (resumeText.toLowerCase().includes('seattle')) location = 'Seattle, WA';

      // Role & company
      let currentRole = 'Staff Distributed Systems Engineer';
      let currentCompany = 'CloudScale Inc.';
      if (resumeText.toLowerCase().includes('devops') || resumeText.toLowerCase().includes('infrastructure')) {
        currentRole = 'Lead Infrastructure Architect';
        currentCompany = 'HyperScale Cloud';
      } else if (resumeText.toLowerCase().includes('product')) {
        currentRole = 'VP of Product Management';
        currentCompany = 'Enterprise Flow Solutions';
      }

      // Experience years
      let experienceYears = 8;
      const expMatch = resumeText.match(/(\d+)\+?\s*years/i);
      if (expMatch) experienceYears = parseInt(expMatch[1]) || 8;

      // Education
      let education = 'B.S. in Computer Science | University of Michigan (2018)';
      if (resumeText.toLowerCase().includes('harvard')) {
        education = 'MBA, Harvard Business School (2015)';
      } else if (resumeText.toLowerCase().includes('texas')) {
        education = 'B.S. Electrical & Computer Engineering, UT Austin';
      }

      // Skills extraction
      const skillKeywords = [
        'TypeScript',
        'React',
        'Node.js',
        'Go',
        'Python',
        'PostgreSQL',
        'Kafka',
        'Docker',
        'Kubernetes',
        'Terraform',
        'AWS',
        'CI/CD',
        'Product Strategy',
        'B2B SaaS',
        'ArgoCD',
        'Microservices',
      ];
      const foundSkills = skillKeywords.filter((sk) =>
        resumeText.toLowerCase().includes(sk.toLowerCase())
      );
      if (foundSkills.length < 3) {
        foundSkills.push('Full Stack Development', 'System Architecture', 'Agile');
      }

      setParsedData({
        name,
        email,
        phone,
        location,
        currentRole,
        currentCompany,
        experienceYears,
        education,
        skills: foundSkills,
        summary: `Seasoned professional with ${experienceYears}+ years proven expertise in building high-performance systems and cross-functional leadership.`,
      });
      setIsParsing(false);
    }, 400);
  };

  const handleImportToPipeline = () => {
    if (!parsedData) return;
    const targetJob = jobs.find((j) => j.id === selectedJobId) || jobs[0];

    const newCandidate = addCandidate({
      name: parsedData.name,
      email: parsedData.email,
      phone: parsedData.phone,
      location: parsedData.location,
      currentRole: parsedData.currentRole,
      currentCompany: parsedData.currentCompany,
      experienceYears: parsedData.experienceYears,
      expectedSalary: '$210,000 / yr',
      rating: 5,
      source: 'Recruiter Sourced',
      stage: 'screening',
      associatedJobId: targetJob ? targetJob.id : 'job-101',
      associatedJobTitle: targetJob ? targetJob.title : 'Staff Full-Stack Engineer',
      skills: parsedData.skills,
      education: parsedData.education,
      resumeFileName: `${parsedData.name.replace(/\s+/g, '_')}_Parsed_Resume.pdf`,
      resumeSummary: parsedData.summary,
    });

    setIsResumeParserOpen(false);
    openCandidateDetail(newCandidate.id);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
      <div className="bg-white rounded-lg shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-purple-100 text-purple-700 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Zoho Talent Hub: Resume Parser Engine
              </h2>
              <p className="text-[11px] text-slate-500">
                Automatic entity extraction: contact details, experience history, and skill taxonomies
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsResumeParserOpen(false)}
            className="text-slate-400 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Split view */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 flex-1 overflow-y-auto">
          {/* Left Side: Resume Input & Preset selection */}
          <div className="p-5 space-y-3.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-800">Resume Source Text</span>
                <span className="text-[11px] text-slate-500">or load sample:</span>
              </div>

              {/* Sample Buttons */}
              <div className="flex items-center gap-1.5 mb-3 flex-wrap">
                {SAMPLE_RESUMES.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => handleSelectSample(sample.id)}
                    className="text-[10px] font-semibold px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded border border-slate-200 transition-colors"
                  >
                    {sample.name.split(' - ')[1]}
                  </button>
                ))}
              </div>

              <textarea
                rows={12}
                value={resumeText}
                onChange={(e) => {
                  setResumeText(e.target.value);
                  setParsedData(null);
                }}
                placeholder="Paste plain resume text or CV here..."
                className="w-full bg-slate-50 border border-slate-200 rounded p-3 text-xs font-mono focus:bg-white focus:outline-hidden focus:border-purple-500 leading-relaxed"
              />
            </div>

            <div className="pt-2">
              <button
                onClick={handleParse}
                disabled={isParsing || !resumeText.trim()}
                className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-md shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isParsing ? 'Extracting Entities...' : 'Run Zoho Resume Parser'}</span>
              </button>
            </div>
          </div>

          {/* Right Side: Parsed Entities & Assignment */}
          <div className="p-5 flex flex-col justify-between bg-slate-50/50">
            {parsedData ? (
              <div className="space-y-4 text-xs">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs bg-emerald-50 p-2.5 rounded border border-emerald-200">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>Resume Extracted with 98% Taxonomy Confidence</span>
                </div>

                {/* Candidate Summary */}
                <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-2">
                  <div className="font-bold text-slate-900 text-sm">{parsedData.name}</div>
                  <div className="text-slate-600 text-xs font-medium">
                    {parsedData.currentRole} at {parsedData.currentCompany}
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    {parsedData.email} · {parsedData.phone}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Location: {parsedData.location} · {parsedData.experienceYears} Years Exp
                  </div>
                  <div className="text-[11px] text-slate-600 border-t border-slate-100 pt-2">
                    <span className="font-semibold text-slate-700">Education:</span> {parsedData.education}
                  </div>
                </div>

                {/* Extracted Skills */}
                <div>
                  <span className="font-bold text-slate-700 block mb-1.5">
                    Extracted Skills ({parsedData.skills.length})
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {parsedData.skills.map((s, idx) => (
                      <span
                        key={idx}
                        className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded text-[11px] font-semibold border border-purple-200"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Associate Requisition */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Map to Job Requisition *
                  </label>
                  <select
                    value={selectedJobId}
                    onChange={(e) => setSelectedJobId(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded p-2 text-xs text-slate-800 font-medium"
                  >
                    {jobs.map((j) => (
                      <option key={j.id} value={j.id}>
                        {j.requisitionCode} - {j.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-400">
                <FileText className="w-12 h-12 text-slate-300 mb-3" />
                <p className="font-bold text-slate-700 text-sm">Awaiting Resume Parse</p>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                  Click &quot;Run Zoho Resume Parser&quot; on the left to extract structured candidate entities.
                </p>
              </div>
            )}

            {/* Bottom Ingest Action */}
            {parsedData && (
              <div className="pt-4 border-t border-slate-200">
                <button
                  onClick={handleImportToPipeline}
                  className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-md shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Ingest Candidate into Pipeline</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
