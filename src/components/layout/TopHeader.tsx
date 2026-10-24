import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Plus,
  Building2,
  Briefcase,
  FileText,
  Calendar,
  UserPlus,
  RefreshCw,
  X,
  ChevronDown,
  User,
} from 'lucide-react';
import { useRecruit } from '../../context/RecruitContext';

export const TopHeader: React.FC = () => {
  const {
    mode,
    setMode,
    searchQuery,
    setSearchQuery,
    candidates,
    jobs,
    openCandidateDetail,
    setIsResumeParserOpen,
    setIsCreateJobOpen,
    setIsCreateCandidateOpen,
    openScheduleInterviewModal,
    resetToSeedData,
  } = useRecruit();

  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const quickAddRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (quickAddRef.current && !quickAddRef.current.contains(e.target as Node)) {
        setIsQuickAddOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchResults = searchQuery.trim()
    ? {
        candidates: candidates.filter(
          (c) =>
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
        ),
        jobs: jobs.filter(
          (j) =>
            j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            j.requisitionCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
            j.departmentOrClient.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      }
    : null;

  return (
    <header className="bg-[#0f2537] text-white border-b border-[#1b3a54] px-4 py-2 sticky top-0 z-30 select-none">
      <div className="flex items-center justify-between gap-4">
        {/* Left Zone: Zoho Recruit Brand Lockup & Mode Switcher */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            {/* Zoho 4-Color Block mark */}
            <div className="grid grid-cols-2 gap-0.5 w-6 h-6 shrink-0">
              <span className="bg-[#e53935] rounded-xs"></span>
              <span className="bg-[#1e88e5] rounded-xs"></span>
              <span className="bg-[#43a047] rounded-xs"></span>
              <span className="bg-[#fdd835] rounded-xs"></span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-white leading-tight">
                ZOHO <span className="font-semibold text-sky-400">Recruit</span>
              </span>
              <span className="text-[10px] text-slate-300 font-mono tracking-wider">
                ENTERPRISE ATS
              </span>
            </div>
          </div>

          {/* Mode Switcher: Corporate HR vs Staffing Agency */}
          <div className="hidden md:flex items-center bg-[#18354c] p-0.5 rounded border border-[#234b6c]">
            <button
              onClick={() => setMode('corporate')}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-all whitespace-nowrap ${
                mode === 'corporate'
                  ? 'bg-[#0073e6] text-white shadow-xs font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Corporate HR
            </button>
            <button
              onClick={() => setMode('agency')}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-all whitespace-nowrap ${
                mode === 'agency'
                  ? 'bg-[#0073e6] text-white shadow-xs font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Staffing Agency
            </button>
          </div>
        </div>

        {/* Center Zone: Global Search Bar */}
        <div ref={searchRef} className="relative flex-1 max-w-lg hidden sm:block">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              placeholder={`Search candidates, skills, ${mode === 'corporate' ? 'requisitions, departments' : 'job orders, clients'}...`}
              className="w-full bg-[#18354c] text-slate-100 placeholder-slate-400 text-xs rounded-md pl-9 pr-8 py-2 border border-[#244b6b] focus:outline-hidden focus:border-sky-400 focus:bg-[#1a3d59] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          {isSearchFocused && searchResults && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white text-slate-800 rounded-md shadow-xl border border-slate-200 overflow-hidden z-50 max-h-96 overflow-y-auto">
              <div className="p-2 border-b border-slate-100 bg-slate-50 flex justify-between items-center text-[11px] text-slate-600">
                <span>Search results for &quot;{searchQuery}&quot;</span>
                <span className="font-mono">
                  {searchResults.candidates.length + searchResults.jobs.length} found
                </span>
              </div>

              {/* Matching Candidates */}
              {searchResults.candidates.length > 0 && (
                <div className="py-1">
                  <div className="px-3 py-1 text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                    Candidates ({searchResults.candidates.length})
                  </div>
                  {searchResults.candidates.slice(0, 4).map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        openCandidateDetail(c.id);
                        setIsSearchFocused(false);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center justify-between text-xs border-b border-slate-100 last:border-0"
                    >
                      <div>
                        <div className="font-semibold text-slate-900">{c.name}</div>
                        <div className="text-[11px] text-slate-500">
                          {c.currentRole} · {c.currentCompany}
                        </div>
                      </div>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                        {c.stage.replace(/_/g, ' ')}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* Matching Jobs */}
              {searchResults.jobs.length > 0 && (
                <div className="py-1 border-t border-slate-100">
                  <div className="px-3 py-1 text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                    Job Requisitions ({searchResults.jobs.length})
                  </div>
                  {searchResults.jobs.slice(0, 3).map((j) => (
                    <div
                      key={j.id}
                      className="px-3 py-2 hover:bg-slate-50 flex items-center justify-between text-xs border-b border-slate-100 last:border-0"
                    >
                      <div>
                        <div className="font-semibold text-slate-900">{j.title}</div>
                        <div className="text-[11px] text-slate-500 font-mono">
                          {j.requisitionCode} · {j.departmentOrClient}
                        </div>
                      </div>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {j.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {searchResults.candidates.length === 0 && searchResults.jobs.length === 0 && (
                <div className="p-4 text-center text-xs text-slate-500">
                  No records matching &quot;{searchQuery}&quot; found.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Zone: Quick Create (+), Reset Data, Profile */}
        <div className="flex items-center gap-2">
          {/* Quick Create (+) Dropdown */}
          <div ref={quickAddRef} className="relative">
            <button
              onClick={() => setIsQuickAddOpen(!isQuickAddOpen)}
              className="flex items-center gap-1 bg-[#0073e6] hover:bg-[#0062c4] text-white px-2.5 py-1.5 rounded text-xs font-semibold shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Create</span>
              <ChevronDown className="w-3 h-3 opacity-70" />
            </button>

            {isQuickAddOpen && (
              <div className="absolute right-0 mt-1.5 w-56 bg-white text-slate-800 rounded-md shadow-xl border border-slate-200 py-1.5 z-50">
                <div className="px-3 py-1 text-[10px] font-semibold text-slate-600 uppercase tracking-wider">
                  Quick Actions
                </div>
                <button
                  onClick={() => {
                    setIsQuickAddOpen(false);
                    setIsCreateJobOpen(true);
                  }}
                  className="w-full text-left px-3 py-2 text-xs flex items-center gap-2.5 hover:bg-slate-50 text-slate-700"
                >
                  <Briefcase className="w-4 h-4 text-blue-600" />
                  <span>New Job Opening</span>
                </button>
                <button
                  onClick={() => {
                    setIsQuickAddOpen(false);
                    setIsCreateCandidateOpen(true);
                  }}
                  className="w-full text-left px-3 py-2 text-xs flex items-center gap-2.5 hover:bg-slate-50 text-slate-700"
                >
                  <UserPlus className="w-4 h-4 text-emerald-600" />
                  <span>Add Candidate Manually</span>
                </button>
                <button
                  onClick={() => {
                    setIsQuickAddOpen(false);
                    setIsResumeParserOpen(true);
                  }}
                  className="w-full text-left px-3 py-2 text-xs flex items-center gap-2.5 hover:bg-slate-50 text-slate-700"
                >
                  <FileText className="w-4 h-4 text-purple-600" />
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-900">Parse Resume</span>
                    <span className="text-[10px] text-slate-500">Auto-extract candidate details</span>
                  </div>
                </button>
                <div className="my-1 border-t border-slate-100"></div>
                <button
                  onClick={() => {
                    setIsQuickAddOpen(false);
                    openScheduleInterviewModal();
                  }}
                  className="w-full text-left px-3 py-2 text-xs flex items-center gap-2.5 hover:bg-slate-50 text-slate-700"
                >
                  <Calendar className="w-4 h-4 text-amber-600" />
                  <span>Schedule Interview</span>
                </button>
              </div>
            )}
          </div>

          {/* Reset Demo Data */}
          <button
            onClick={resetToSeedData}
            title="Reset system data to initial state"
            className="p-1.5 text-slate-300 hover:text-white hover:bg-[#18354c] rounded transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          {/* Recruiter Profile Lockup */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center gap-2 pl-2 border-l border-[#1f425f] hover:opacity-90"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-sky-600 to-blue-500 text-white font-semibold text-xs flex items-center justify-center border border-sky-300">
                SJ
              </div>
              <div className="hidden lg:flex flex-col text-left">
                <span className="text-xs font-semibold text-white leading-tight">
                  Sarah Jenkins
                </span>
                <span className="text-[10px] text-slate-300">Talent Acquisition Lead</span>
              </div>
            </button>

            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-1.5 w-60 bg-white text-slate-800 rounded-md shadow-xl border border-slate-200 py-2 z-50">
                <div className="px-3 pb-2 border-b border-slate-100">
                  <div className="text-xs font-bold text-slate-900">Sarah Jenkins</div>
                  <div className="text-[11px] text-slate-500">sarah.jenkins@enterprise.corp</div>
                  <div className="mt-1 inline-block text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                    Role: Lead Recruiter & Admin
                  </div>
                </div>
                <div className="pt-2 px-1">
                  <button
                    onClick={() => {
                      setMode(mode === 'corporate' ? 'agency' : 'corporate');
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full text-left px-2 py-1.5 text-xs text-slate-700 hover:bg-slate-50 rounded flex items-center gap-2"
                  >
                    <Building2 className="w-3.5 h-3.5 text-slate-500" />
                    <span>
                      Switch to {mode === 'corporate' ? 'Agency Mode' : 'Corporate HR Mode'}
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      resetToSeedData();
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full text-left px-2 py-1.5 text-xs text-slate-700 hover:bg-slate-50 rounded flex items-center gap-2"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
                    <span>Reset All Demo Records</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
