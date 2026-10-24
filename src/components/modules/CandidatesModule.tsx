import React, { useState } from 'react';
import {
  Users,
  Kanban,
  List,
  Search,
  Filter,
  Plus,
  Sparkles,
  Star,
  Calendar,
  Building,
  Mail,
  ArrowRight,
  MoreVertical,
  Check,
  Download,
} from 'lucide-react';
import { useRecruit } from '../../context/RecruitContext';
import { STAGES } from '../../data/seedData';
import { RecruitmentStage } from '../../types/recruit';

export const CandidatesModule: React.FC = () => {
  const {
    candidates,
    jobs,
    updateCandidateStage,
    openCandidateDetail,
    setIsCreateCandidateOpen,
    setIsResumeParserOpen,
    openScheduleInterviewModal,
    showToast,
  } = useRecruit();

  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [selectedJobFilter, setSelectedJobFilter] = useState<string>('all');
  const [selectedSourceFilter, setSelectedSourceFilter] = useState<string>('all');
  const [candidateSearch, setCandidateSearch] = useState<string>('');
  const [selectedCandidateIds, setSelectedCandidateIds] = useState<string[]>([]);
  const [draggedCandidateId, setDraggedCandidateId] = useState<string | null>(null);

  // Filter candidates
  const filteredCandidates = candidates.filter((c) => {
    const matchesJob = selectedJobFilter === 'all' || c.associatedJobId === selectedJobFilter;
    const matchesSource = selectedSourceFilter === 'all' || c.source === selectedSourceFilter;
    const matchesSearch =
      c.name.toLowerCase().includes(candidateSearch.toLowerCase()) ||
      c.currentRole.toLowerCase().includes(candidateSearch.toLowerCase()) ||
      c.currentCompany.toLowerCase().includes(candidateSearch.toLowerCase()) ||
      c.skills.some((s) => s.toLowerCase().includes(candidateSearch.toLowerCase()));
    return matchesJob && matchesSource && matchesSearch;
  });

  // Drag and drop handlers for Kanban columns
  const handleDragStart = (id: string) => {
    setDraggedCandidateId(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetStage: RecruitmentStage) => {
    e.preventDefault();
    if (draggedCandidateId) {
      updateCandidateStage(draggedCandidateId, targetStage);
      setDraggedCandidateId(null);
    }
  };

  // Bulk actions
  const toggleSelectCandidate = (id: string) => {
    setSelectedCandidateIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedCandidateIds.length === filteredCandidates.length) {
      setSelectedCandidateIds([]);
    } else {
      setSelectedCandidateIds(filteredCandidates.map((c) => c.id));
    }
  };

  const handleBulkStageChange = (newStage: RecruitmentStage) => {
    selectedCandidateIds.forEach((id) => updateCandidateStage(id, newStage));
    showToast(`Updated ${selectedCandidateIds.length} candidates to ${newStage.replace(/_/g, ' ')}`);
    setSelectedCandidateIds([]);
  };

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Name,Email,Phone,Current Role,Company,Stage,Job,Experience,Rating']
        .concat(
          filteredCandidates.map(
            (c) =>
              `"${c.name}","${c.email}","${c.phone}","${c.currentRole}","${c.currentCompany}","${c.stage}","${c.associatedJobTitle}","${c.experienceYears}y","${c.rating}/5"`
          )
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `zoho_candidates_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported candidate records to CSV');
  };

  return (
    <div className="p-6 space-y-4 max-w-full mx-auto">
      {/* Top Controls Strip */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900">Talent Pool & Candidate Pipeline</h1>
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
              {filteredCandidates.length} Candidates
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Advance candidates across interview stages, review resume profiles, and schedule rounds.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* View Toggle */}
          <div className="flex items-center bg-slate-200 p-0.5 rounded-md border border-slate-300">
            <button
              onClick={() => setViewMode('kanban')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded transition-all cursor-pointer ${
                viewMode === 'kanban'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Kanban className="w-3.5 h-3.5" />
              <span>Kanban</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded transition-all cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>List Grid</span>
            </button>
          </div>

          <button
            onClick={handleExportCSV}
            title="Export to CSV"
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-md transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export</span>
          </button>

          <button
            onClick={() => setIsResumeParserOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-md shadow-xs transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Parse Resume</span>
          </button>

          <button
            onClick={() => setIsCreateCandidateOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0073e6] hover:bg-[#0062c4] rounded-md shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ Candidate</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
          {/* Job Opening Filter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-medium">Job:</span>
            <select
              value={selectedJobFilter}
              onChange={(e) => setSelectedJobFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-xs text-slate-800 focus:bg-white focus:outline-hidden focus:border-blue-500"
            >
              <option value="all">All Job Requisitions</option>
              {jobs.map((j) => (
                <option key={j.id} value={j.id}>
                  {j.requisitionCode} - {j.title}
                </option>
              ))}
            </select>
          </div>

          {/* Source Filter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <span className="font-medium">Source:</span>
            <select
              value={selectedSourceFilter}
              onChange={(e) => setSelectedSourceFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-xs text-slate-800 focus:bg-white focus:outline-hidden focus:border-blue-500"
            >
              <option value="all">All Sources</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Career Portal">Career Portal</option>
              <option value="Referral">Referral</option>
              <option value="Indeed">Indeed</option>
              <option value="Recruiter Sourced">Recruiter Sourced</option>
            </select>
          </div>

          {/* Bulk Action Bar (when candidates selected) */}
          {selectedCandidateIds.length > 0 && (
            <div className="flex items-center gap-2 bg-blue-50 text-blue-800 px-3 py-1 rounded border border-blue-200 text-xs">
              <span className="font-semibold">{selectedCandidateIds.length} selected:</span>
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    handleBulkStageChange(e.target.value as RecruitmentStage);
                    e.target.value = '';
                  }
                }}
                defaultValue=""
                className="bg-white border border-blue-300 rounded px-2 py-0.5 text-xs text-slate-800"
              >
                <option value="" disabled>
                  Move to Stage...
                </option>
                {STAGES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setSelectedCandidateIds([])}
                className="text-[11px] underline text-blue-600 hover:text-blue-900 ml-1"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {/* Local Search Input */}
        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            value={candidateSearch}
            onChange={(e) => setCandidateSearch(e.target.value)}
            placeholder="Search by name, company, skill..."
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-md pl-8 pr-3 py-1.5 focus:bg-white focus:outline-hidden focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      {/* VIEW: KANBAN BOARD */}
      {viewMode === 'kanban' && (
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-3 min-w-[1300px] items-start">
            {STAGES.map((stage) => {
              const stageCandidates = filteredCandidates.filter((c) => c.stage === stage.id);

              return (
                <div
                  key={stage.id}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, stage.id)}
                  className="flex-1 min-w-[210px] bg-slate-100/90 rounded-lg border border-slate-200 flex flex-col max-h-[calc(100vh-210px)]"
                >
                  {/* Column Header */}
                  <div className="p-3 border-b border-slate-200 bg-white rounded-t-lg flex items-center justify-between sticky top-0 z-10">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: stage.color }}
                      />
                      <span className="text-xs font-bold text-slate-800">{stage.label}</span>
                    </div>
                    <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                      {stageCandidates.length}
                    </span>
                  </div>

                  {/* Cards Container */}
                  <div className="p-2 space-y-2 overflow-y-auto flex-1">
                    {stageCandidates.length === 0 ? (
                      <div className="py-8 text-center text-[11px] text-slate-400 border border-dashed border-slate-200 rounded-md">
                        Drop candidate here
                      </div>
                    ) : (
                      stageCandidates.map((candidate) => (
                        <div
                          key={candidate.id}
                          draggable
                          onDragStart={() => handleDragStart(candidate.id)}
                          className="bg-white p-3 rounded-md border border-slate-200 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all cursor-grab active:cursor-grabbing group relative"
                        >
                          {/* Card Header */}
                          <div className="flex items-start justify-between gap-1">
                            <div
                              onClick={() => openCandidateDetail(candidate.id)}
                              className="font-bold text-xs text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer"
                            >
                              {candidate.name}
                            </div>
                            {/* Star rating */}
                            <div className="flex items-center text-amber-400 shrink-0">
                              <Star className="w-3 h-3 fill-amber-400" />
                              <span className="text-[10px] font-mono font-bold text-slate-600 ml-0.5">
                                {candidate.rating}
                              </span>
                            </div>
                          </div>

                          {/* Current Role & Company */}
                          <div className="text-[11px] text-slate-600 mt-1 font-medium truncate">
                            {candidate.currentRole}
                          </div>
                          <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5 truncate">
                            <Building className="w-3 h-3 shrink-0" />
                            <span>{candidate.currentCompany}</span>
                            <span>·</span>
                            <span>{candidate.experienceYears}y exp</span>
                          </div>

                          {/* Associated Requisition */}
                          <div className="mt-2 text-[10px] text-blue-700 bg-blue-50/70 p-1 rounded font-medium truncate">
                            {candidate.associatedJobTitle}
                          </div>

                          {/* Skills Preview */}
                          <div className="flex flex-wrap gap-1 mt-2">
                            {candidate.skills.slice(0, 2).map((skill, idx) => (
                              <span
                                key={idx}
                                className="text-[9px] text-slate-500 bg-slate-100 px-1 py-0.2 rounded"
                              >
                                {skill}
                              </span>
                            ))}
                            {candidate.skills.length > 2 && (
                              <span className="text-[9px] text-slate-400">
                                +{candidate.skills.length - 2}
                              </span>
                            )}
                          </div>

                          {/* Card Bottom Quick Actions */}
                          <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                            <button
                              onClick={() => openScheduleInterviewModal(candidate)}
                              title="Schedule Interview Round"
                              className="flex items-center gap-1 text-slate-500 hover:text-blue-600 transition-colors"
                            >
                              <Calendar className="w-3 h-3" />
                              <span className="text-[10px]">Interview</span>
                            </button>

                            <button
                              onClick={() => openCandidateDetail(candidate.id)}
                              className="text-blue-600 font-semibold hover:underline text-[10px] flex items-center gap-0.5"
                            >
                              <span>Dossier</span>
                              <ArrowRight className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW: HIGH-DENSITY LIST TABLE */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-2.5 px-3 w-8">
                    <input
                      type="checkbox"
                      checked={
                        selectedCandidateIds.length > 0 &&
                        selectedCandidateIds.length === filteredCandidates.length
                      }
                      onChange={selectAll}
                      className="rounded text-blue-600 focus:ring-0"
                    />
                  </th>
                  <th className="py-2.5 px-3">Candidate Name</th>
                  <th className="py-2.5 px-3">Current Role & Company</th>
                  <th className="py-2.5 px-3">Associated Requisition</th>
                  <th className="py-2.5 px-3">Stage</th>
                  <th className="py-2.5 px-3">Rating</th>
                  <th className="py-2.5 px-3">Source</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCandidates.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-500">
                      <Users className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                      <p className="font-medium text-slate-700">No candidates found</p>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Try clearing search filters or add a new candidate.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredCandidates.map((cand) => {
                    const isSelected = selectedCandidateIds.includes(cand.id);

                    return (
                      <tr
                        key={cand.id}
                        className={`hover:bg-slate-50 transition-colors ${
                          isSelected ? 'bg-blue-50/50' : ''
                        }`}
                      >
                        <td className="py-3 px-3">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelectCandidate(cand.id)}
                            className="rounded text-blue-600 focus:ring-0"
                          />
                        </td>

                        <td className="py-3 px-3">
                          <div
                            onClick={() => openCandidateDetail(cand.id)}
                            className="font-bold text-slate-900 hover:text-blue-600 cursor-pointer text-sm"
                          >
                            {cand.name}
                          </div>
                          <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                            <span>{cand.email}</span>
                            <span>·</span>
                            <span>{cand.phone}</span>
                          </div>
                        </td>

                        <td className="py-3 px-3">
                          <div className="font-medium text-slate-800">{cand.currentRole}</div>
                          <div className="text-[11px] text-slate-500">
                            {cand.currentCompany} ({cand.experienceYears} yrs)
                          </div>
                        </td>

                        <td className="py-3 px-3">
                          <div className="text-slate-800 font-medium truncate max-w-xs">
                            {cand.associatedJobTitle}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            Applied on {cand.appliedDate}
                          </div>
                        </td>

                        <td className="py-3 px-3">
                          <select
                            value={cand.stage}
                            onChange={(e) =>
                              updateCandidateStage(cand.id, e.target.value as RecruitmentStage)
                            }
                            className="text-xs bg-slate-50 border border-slate-200 rounded px-2 py-1 font-semibold text-slate-800"
                          >
                            {STAGES.map((s) => (
                              <option key={s.id} value={s.id}>
                                {s.label}
                              </option>
                            ))}
                          </select>
                        </td>

                        <td className="py-3 px-3">
                          <div className="flex items-center text-amber-400">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < cand.rating
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'text-slate-200'
                                }`}
                              />
                            ))}
                          </div>
                        </td>

                        <td className="py-3 px-3 text-slate-600 font-medium text-[11px]">
                          {cand.source}
                        </td>

                        <td className="py-3 px-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => openScheduleInterviewModal(cand)}
                              title="Schedule Interview"
                              className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded"
                            >
                              <Calendar className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => openCandidateDetail(cand.id)}
                              className="px-2.5 py-1 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded transition-colors"
                            >
                              View 360°
                            </button>
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
      )}
    </div>
  );
};
