import React, { useState } from 'react';
import {
  Briefcase,
  Plus,
  Search,
  Users,
  MapPin,
  Calendar,
  Building,
  MoreVertical,
  CheckCircle2,
  Trash2,
} from 'lucide-react';
import { useRecruit } from '../../context/RecruitContext';
import { JobOpening } from '../../types/recruit';

export const JobOpeningsModule: React.FC = () => {
  const {
    mode,
    jobs,
    candidates,
    updateJobStatus,
    deleteJob,
    setIsCreateJobOpen,
    setActiveModule,
    setSearchQuery,
  } = useRecruit();

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeMenuJobId, setActiveMenuJobId] = useState<string | null>(null);

  const filteredJobs = jobs.filter((j) => {
    const matchesStatus = filterStatus === 'all' || j.status === filterStatus;
    const matchesSearch =
      j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.requisitionCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.departmentOrClient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getCandidateCountForJob = (jobId: string) => {
    return candidates.filter((c) => c.associatedJobId === jobId && c.stage !== 'rejected').length;
  };

  const handleViewApplicants = (job: JobOpening) => {
    setSearchQuery(job.title);
    setActiveModule('candidates');
  };

  return (
    <div className="p-6 space-y-4 max-w-7xl mx-auto">
      {/* Module Sub-Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900">
              {mode === 'corporate' ? 'Job Openings & Requisitions' : 'Job Orders & Client Requisitions'}
            </h1>
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
              {filteredJobs.length} records
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage requisition approvals, headcounts, salary budgets, and recruitment velocity.
          </p>
        </div>

        <button
          onClick={() => setIsCreateJobOpen(true)}
          className="flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#0073e6] hover:bg-[#0062c4] rounded-md shadow-xs transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>+ New {mode === 'corporate' ? 'Job Opening' : 'Job Order'}</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-md w-full md:w-auto overflow-x-auto">
          {['all', 'In-progress', 'Filled', 'On-hold', 'Draft'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1 text-xs font-medium rounded transition-all whitespace-nowrap cursor-pointer ${
                filterStatus === status
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {status === 'all' ? 'All Requisitions' : status}
            </button>
          ))}
        </div>

        {/* Local Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter by title, code, client..."
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-md pl-8 pr-3 py-1.5 focus:bg-white focus:outline-hidden focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      {/* High-Density Requisitions Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-2.5 px-3">Req Code</th>
                <th className="py-2.5 px-3">Job Title & Skills</th>
                <th className="py-2.5 px-3">
                  {mode === 'corporate' ? 'Department / Hiring Mgr' : 'Client / Contact'}
                </th>
                <th className="py-2.5 px-3">Location & Type</th>
                <th className="py-2.5 px-3">Compensation</th>
                <th className="py-2.5 px-3 text-center">Active Applicants</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500">
                    <Briefcase className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="font-medium text-slate-700">No job openings found</p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Create your first requisition to start sourcing candidates.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredJobs.map((job) => {
                  const applicantCount = getCandidateCountForJob(job.id);
                  const isFilled = job.status === 'Filled';
                  const isInProgress = job.status === 'In-progress';

                  return (
                    <tr
                      key={job.id}
                      className="hover:bg-slate-50 transition-colors group"
                    >
                      <td className="py-3 px-3 font-mono font-medium text-blue-600">
                        {job.requisitionCode}
                      </td>

                      <td className="py-3 px-3">
                        <div
                          onClick={() => handleViewApplicants(job)}
                          className="font-bold text-slate-900 hover:text-blue-600 cursor-pointer text-sm"
                        >
                          {job.title}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {job.requiredSkills.slice(0, 3).map((skill, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded"
                            >
                              {skill}
                            </span>
                          ))}
                          {job.requiredSkills.length > 3 && (
                            <span className="text-[10px] text-slate-400">
                              +{job.requiredSkills.length - 3} more
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-3 px-3">
                        <div className="flex items-center gap-1.5 font-medium text-slate-800">
                          <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{job.departmentOrClient}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {job.hiringManagerOrContact}
                        </div>
                      </td>

                      <td className="py-3 px-3">
                        <div className="flex items-center gap-1 text-slate-700">
                          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                          <span>{job.location}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                          {job.type}
                        </div>
                      </td>

                      <td className="py-3 px-3 font-mono tabular-nums text-slate-700">
                        {mode === 'corporate' ? (
                          <div>
                            ${(job.salaryMin / 1000).toFixed(0)}k - ${(job.salaryMax / 1000).toFixed(0)}k
                            <span className="text-[10px] text-slate-400 block font-sans">USD / Year</span>
                          </div>
                        ) : (
                          <div>
                            <span className="font-semibold text-emerald-700">{job.billRate || '$135/hr'}</span>
                            <span className="text-[10px] text-slate-400 block font-sans">Bill Rate</span>
                          </div>
                        )}
                      </td>

                      <td className="py-3 px-3 text-center">
                        <button
                          onClick={() => handleViewApplicants(job)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold font-mono text-xs transition-colors cursor-pointer"
                        >
                          <Users className="w-3.5 h-3.5" />
                          <span>{applicantCount}</span>
                        </button>
                      </td>

                      <td className="py-3 px-3">
                        <span
                          className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded border ${
                            isInProgress
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : isFilled
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-slate-100 text-slate-600 border-slate-200'
                          }`}
                        >
                          {job.status}
                        </span>
                        <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>Target: {job.targetDate}</span>
                        </div>
                      </td>

                      <td className="py-3 px-3 text-right relative">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleViewApplicants(job)}
                            className="px-2 py-1 text-[11px] font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded transition-colors"
                          >
                            Applicants
                          </button>

                          <div className="relative">
                            <button
                              onClick={() =>
                                setActiveMenuJobId(activeMenuJobId === job.id ? null : job.id)
                              }
                              className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>

                            {activeMenuJobId === job.id && (
                              <div className="absolute right-0 mt-1 w-44 bg-white rounded-md shadow-xl border border-slate-200 py-1 z-30 text-left">
                                <div className="px-3 py-1 text-[10px] uppercase font-semibold text-slate-400">
                                  Change Status
                                </div>
                                <button
                                  onClick={() => {
                                    updateJobStatus(job.id, 'In-progress');
                                    setActiveMenuJobId(null);
                                  }}
                                  className="w-full px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                                  <span>In-progress</span>
                                </button>
                                <button
                                  onClick={() => {
                                    updateJobStatus(job.id, 'Filled');
                                    setActiveMenuJobId(null);
                                  }}
                                  className="w-full px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                  <span>Mark Filled</span>
                                </button>
                                <button
                                  onClick={() => {
                                    updateJobStatus(job.id, 'On-hold');
                                    setActiveMenuJobId(null);
                                  }}
                                  className="w-full px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                                  <span>Put On-hold</span>
                                </button>
                                <div className="my-1 border-t border-slate-100"></div>
                                <button
                                  onClick={() => {
                                    deleteJob(job.id);
                                    setActiveMenuJobId(null);
                                  }}
                                  className="w-full px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  <span>Delete Requisition</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
