import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Users,
  Clock,
  Target,
  Award,
  Filter,
} from 'lucide-react';
import { useRecruit } from '../../context/RecruitContext';
import { STAGES } from '../../data/seedData';

export const AnalyticsModule: React.FC = () => {
  const { candidates, jobs, offers, mode } = useRecruit();

  // Calculations for funnel
  const sourcedCount = candidates.length;
  const screeningCount = candidates.filter((c) => c.stage !== 'sourced').length;
  const interviewCount = candidates.filter(
    (c) =>
      c.stage === 'interview_round_1' ||
      c.stage === 'interview_round_2' ||
      c.stage === 'offered' ||
      c.stage === 'hired'
  ).length;
  const offerCount = candidates.filter((c) => c.stage === 'offered' || c.stage === 'hired').length;
  const hiredCount = candidates.filter((c) => c.stage === 'hired').length;

  const funnelData = [
    { name: '1. Sourced & Ingested', count: sourcedCount, pct: 100 },
    {
      name: '2. Screening Passed',
      count: screeningCount,
      pct: sourcedCount ? Math.round((screeningCount / sourcedCount) * 100) : 0,
    },
    {
      name: '3. Technical & Exec Interviews',
      count: interviewCount,
      pct: sourcedCount ? Math.round((interviewCount / sourcedCount) * 100) : 0,
    },
    {
      name: '4. Offer Extended',
      count: offerCount,
      pct: sourcedCount ? Math.round((offerCount / sourcedCount) * 100) : 0,
    },
    {
      name: '5. Placed / Hired',
      count: hiredCount,
      pct: sourcedCount ? Math.round((hiredCount / sourcedCount) * 100) : 0,
    },
  ];

  // Sources breakdown
  const sources = ['LinkedIn', 'Referral', 'Career Portal', 'Indeed', 'Recruiter Sourced'];
  const sourceStats = sources.map((src) => {
    const total = candidates.filter((c) => c.source === src).length;
    const hired = candidates.filter((c) => c.source === src && c.stage === 'hired').length;
    return {
      source: src,
      total,
      hired,
      conversionPct: total ? Math.round((hired / total) * 100) : 0,
    };
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="pb-2 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-slate-900">Talent Analytics & Performance Reports</h1>
          <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
            Zoho Intelligence
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-0.5">
          Comprehensive conversion telemetry, source effectiveness, and recruitment cycle velocity.
        </p>
      </div>

      {/* Top Velocity Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
          <span className="text-xs font-medium text-slate-500">Funnel Conversion Rate</span>
          <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 mt-1">
            {sourcedCount ? ((hiredCount / sourcedCount) * 100).toFixed(1) : 0}%
          </div>
          <span className="text-[11px] text-emerald-600 mt-1 block">Top quartile benchmark (12-18%)</span>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
          <span className="text-xs font-medium text-slate-500">Average Time-to-Hire</span>
          <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 mt-1">
            21 <span className="text-sm font-normal text-slate-400">Days</span>
          </div>
          <span className="text-[11px] text-emerald-600 mt-1 block">↓ 4 days faster this quarter</span>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
          <span className="text-xs font-medium text-slate-500">Offer Acceptance Rate</span>
          <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 mt-1">
            85.7%
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">6 of 7 offers accepted</span>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
          <span className="text-xs font-medium text-slate-500">Candidate Quality Rating</span>
          <div className="text-2xl font-bold font-mono tabular-nums text-amber-500 mt-1">
            4.4 <span className="text-xs font-normal text-slate-400">/ 5.0</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Avg score from hiring panels</span>
        </div>
      </div>

      {/* 2-Column Analytics: Recruitment Conversion Funnel & Source Effectiveness */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left (7 cols): Visual Funnel */}
        <div className="lg:col-span-7 bg-white rounded-lg border border-slate-200 p-5 shadow-xs space-y-4">
          <div>
            <h2 className="text-sm font-bold text-slate-900">End-to-End Recruitment Conversion Funnel</h2>
            <p className="text-xs text-slate-500">Drop-off and retention across hiring pipeline gates</p>
          </div>

          <div className="space-y-3 pt-2">
            {funnelData.map((step, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-800">{step.name}</span>
                  <span className="font-mono tabular-nums text-slate-600">
                    <span className="font-bold text-slate-900">{step.count}</span> candidates ({step.pct}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-5 rounded overflow-hidden p-0.5 border border-slate-200">
                  <div
                    className="h-full rounded bg-gradient-to-r from-blue-600 to-sky-500 transition-all duration-500"
                    style={{ width: `${Math.max(step.pct, 4)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-50 rounded border border-slate-200 text-xs text-slate-600">
            <span className="font-bold text-slate-800">Pipeline Insight:</span> Highest drop-off occurs between Screening and Round 1 Technical (32% conversion). Interview scorecards indicate stringent system design bar is working effectively.
          </div>
        </div>

        {/* Right (5 cols): Source Effectiveness */}
        <div className="lg:col-span-5 bg-white rounded-lg border border-slate-200 p-5 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Sourcing Channel Quality & Yield</h2>
            <p className="text-xs text-slate-500">Comparing candidate volume against final hires</p>

            <div className="mt-4 divide-y divide-slate-100">
              {sourceStats.map((stat, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-800">{stat.source}</div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      {stat.total} applicants · {stat.hired} hires
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold font-mono text-blue-600 text-sm">
                      {stat.conversionPct}%
                    </div>
                    <div className="text-[10px] text-slate-400">Hire yield</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-emerald-50 rounded border border-emerald-200 text-xs text-emerald-800">
            <span className="font-bold">Top Performing Channel:</span> Referrals produce a 40% offer rate with 38% faster time-to-sign than public career portals.
          </div>
        </div>
      </div>
    </div>
  );
};
