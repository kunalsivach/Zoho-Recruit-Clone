import React, { useState } from 'react';
import {
  Building2,
  Plus,
  Briefcase,
  Users,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  X,
} from 'lucide-react';
import { useRecruit } from '../../context/RecruitContext';

export const ClientsModule: React.FC = () => {
  const {
    mode,
    clientsOrDepts,
    addClientOrDept,
    jobs,
    candidates,
    setActiveModule,
    setSearchQuery,
  } = useRecruit();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [industryOrFunction, setIndustryOrFunction] = useState('');
  const [leadPerson, setLeadPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');

  const displayType = mode === 'corporate' ? 'department' : 'client';
  const filteredList = clientsOrDepts.filter((item) => item.type === displayType);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !leadPerson) return;
    addClientOrDept({
      name,
      code: code || `ID-${Math.floor(100 + Math.random() * 900)}`,
      industryOrFunction: industryOrFunction || 'General Operations',
      leadPerson,
      email: email || 'contact@organization.com',
      phone: phone || '+1 (555) 000-0000',
      location: location || 'San Francisco, CA',
      type: displayType,
    });
    setName('');
    setCode('');
    setIndustryOrFunction('');
    setLeadPerson('');
    setEmail('');
    setPhone('');
    setLocation('');
    setIsAddModalOpen(false);
  };

  const getJobsForEntity = (entityName: string) => {
    return jobs.filter((j) => j.departmentOrClient.toLowerCase().includes(entityName.toLowerCase()));
  };

  return (
    <div className="p-6 space-y-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900">
              {mode === 'corporate' ? 'Organizational Departments' : 'Client Accounts & Contacts'}
            </h1>
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
              {filteredList.length} Entries
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {mode === 'corporate'
              ? 'Manage company business units, department heads, and internal hiring budgets.'
              : 'Manage staffing client relationships, billable agreements, and point-of-contact managers.'}
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#0073e6] hover:bg-[#0062c4] rounded-md shadow-xs transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add {mode === 'corporate' ? 'Department' : 'Client Account'}</span>
        </button>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredList.map((item) => {
          const associatedJobs = getJobsForEntity(item.name);

          return (
            <div
              key={item.id}
              className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-blue-300 transition-all"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-sm border border-blue-200">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
                    {item.code}
                  </span>
                </div>

                <h2 className="text-base font-bold text-slate-900 mt-3">{item.name}</h2>
                <p className="text-xs text-slate-500 mt-0.5">{item.industryOrFunction}</p>

                <div className="mt-4 space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400 font-medium">Head/Contact:</span>
                    <span className="font-semibold text-slate-800">{item.leadPerson}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">{item.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>

              {/* Stats Footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => {
                    setSearchQuery(item.name);
                    setActiveModule('jobs');
                  }}
                  className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800"
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>{associatedJobs.length} Open Requisitions</span>
                </button>

                <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{item.totalHiresCount || 8} Hires</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Client/Department Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900">
                Add {mode === 'corporate' ? 'Department' : 'Client Account'}
              </h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  {mode === 'corporate' ? 'Department Name' : 'Client Organization Name'} *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Core Platform Infrastructure"
                  className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1.5 focus:bg-white focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Code / Prefix</label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="ENG-PLATFORM"
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1.5 focus:bg-white focus:outline-hidden focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Industry / Function</label>
                  <input
                    type="text"
                    value={industryOrFunction}
                    onChange={(e) => setIndustryOrFunction(e.target.value)}
                    placeholder="Software Engineering"
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1.5 focus:bg-white focus:outline-hidden focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  {mode === 'corporate' ? 'Department Head / VP' : 'Key Contact Person'} *
                </label>
                <input
                  type="text"
                  required
                  value={leadPerson}
                  onChange={(e) => setLeadPerson(e.target.value)}
                  placeholder="Elena Rostova (VP Eng)"
                  className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1.5 focus:bg-white focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contact@org.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1.5 focus:bg-white focus:outline-hidden focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (415) 555-0100"
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1.5 focus:bg-white focus:outline-hidden focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="San Francisco, CA"
                  className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1.5 focus:bg-white focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#0073e6] hover:bg-[#0062c4] text-white font-semibold rounded shadow-xs"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
