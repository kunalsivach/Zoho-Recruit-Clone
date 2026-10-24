import React from 'react';
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Calendar,
  Building2,
  FileCheck,
  BarChart3,
} from 'lucide-react';
import { useRecruit, ActiveModule } from '../../context/RecruitContext';

export const ModuleNav: React.FC = () => {
  const {
    activeModule,
    setActiveModule,
    mode,
    jobs,
    candidates,
    interviews,
    offers,
  } = useRecruit();

  const activeJobsCount = jobs.filter((j) => j.status === 'In-progress').length;
  const activeCandidatesCount = candidates.filter((c) => c.stage !== 'rejected').length;
  const scheduledInterviewsCount = interviews.filter((i) => i.status === 'Scheduled').length;
  const pendingOffersCount = offers.filter((o) => o.status === 'Sent').length;

  const navItems: {
    id: ActiveModule;
    label: string;
    icon: React.ElementType;
    badge?: number;
  }[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'jobs',
      label: mode === 'corporate' ? 'Job Openings' : 'Job Orders',
      icon: Briefcase,
      badge: activeJobsCount,
    },
    {
      id: 'candidates',
      label: 'Candidates',
      icon: Users,
      badge: activeCandidatesCount,
    },
    {
      id: 'interviews',
      label: 'Interviews & Evaluations',
      icon: Calendar,
      badge: scheduledInterviewsCount,
    },
    {
      id: 'clients',
      label: mode === 'corporate' ? 'Departments' : 'Clients & Accounts',
      icon: Building2,
    },
    {
      id: 'offers',
      label: 'Offers & Placements',
      icon: FileCheck,
      badge: pendingOffersCount > 0 ? pendingOffersCount : undefined,
    },
    {
      id: 'analytics',
      label: 'Analytics & Reports',
      icon: BarChart3,
    },
  ];

  return (
    <nav className="bg-[#162d42] text-slate-300 border-b border-[#214362] px-4 overflow-x-auto scrollbar-none select-none">
      <div className="flex items-center space-x-1 min-w-max">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeModule === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id)}
              className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-medium border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'border-sky-400 text-white font-semibold bg-[#1b3650]'
                  : 'border-transparent text-slate-300 hover:text-white hover:bg-[#1a354e]'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
              <span>{item.label}</span>
              {typeof item.badge === 'number' && (
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full font-semibold ${
                    isActive
                      ? 'bg-sky-400 text-slate-900'
                      : 'bg-[#25496b] text-slate-200'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
