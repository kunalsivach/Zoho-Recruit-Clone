import React, { useState } from 'react';
import {
  FileCheck,
  Plus,
  Send,
  CheckCircle,
  XCircle,
  Calendar,
  DollarSign,
  TrendingUp,
  FileText,
} from 'lucide-react';
import { useRecruit } from '../../context/RecruitContext';
import { Offer } from '../../types/recruit';

export const OffersModule: React.FC = () => {
  const {
    offers,
    updateOfferStatus,
    openCreateOfferModal,
    openCandidateDetail,
  } = useRecruit();

  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredOffers = offers.filter((o) => {
    if (filterStatus === 'all') return true;
    return o.status === filterStatus;
  });

  const totalValue = offers.reduce((acc, o) => acc + o.annualSalary, 0);
  const acceptedOffers = offers.filter((o) => o.status === 'Accepted');
  const pendingOffers = offers.filter((o) => o.status === 'Sent');

  return (
    <div className="p-6 space-y-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900">Offers & Placements</h1>
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
              {filteredOffers.length} Offers
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Generate formal employment offers, track candidate acceptances, and finalize onboarding dates.
          </p>
        </div>

        <button
          onClick={() => openCreateOfferModal()}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#0073e6] hover:bg-[#0062c4] rounded-md shadow-xs transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>+ Create Offer Proposal</span>
        </button>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
          <div className="text-xs font-medium text-slate-500">Total Compensation Extended</div>
          <div className="mt-1 text-2xl font-bold font-mono tabular-nums text-slate-900">
            ${(totalValue / 1000).toFixed(0)}k <span className="text-xs font-normal text-slate-400">ARR</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Across all active & accepted proposals</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
          <div className="text-xs font-medium text-slate-500">Accepted Hires</div>
          <div className="mt-1 text-2xl font-bold font-mono tabular-nums text-emerald-600">
            {acceptedOffers.length}
          </div>
          <div className="text-[11px] text-emerald-600 mt-1 font-medium">Ready for onboarding kickoff</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
          <div className="text-xs font-medium text-slate-500">Awaiting Candidate Signature</div>
          <div className="mt-1 text-2xl font-bold font-mono tabular-nums text-amber-600">
            {pendingOffers.length}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Offers under candidate review</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-md">
          {['all', 'Sent', 'Accepted', 'Draft', 'Declined'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1 text-xs font-medium rounded transition-all cursor-pointer ${
                filterStatus === st
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {st === 'all' ? 'All Proposals' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Offers Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-2.5 px-3">Candidate</th>
                <th className="py-2.5 px-3">Position & Requisition</th>
                <th className="py-2.5 px-3">Base Compensation</th>
                <th className="py-2.5 px-3">Bonus & Equity</th>
                <th className="py-2.5 px-3">Start Date</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOffers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    <FileCheck className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="font-semibold text-slate-700">No offers found</p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Create an offer from the button above or from candidate 360° view.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredOffers.map((offer) => {
                  const isSent = offer.status === 'Sent';
                  const isAccepted = offer.status === 'Accepted';

                  return (
                    <tr key={offer.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-3">
                        <div
                          onClick={() => openCandidateDetail(offer.candidateId)}
                          className="font-bold text-slate-900 hover:text-blue-600 cursor-pointer text-sm"
                        >
                          {offer.candidateName}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Drafted {offer.createdDate}
                        </div>
                      </td>

                      <td className="py-3 px-3">
                        <div className="font-medium text-slate-800">{offer.jobTitle}</div>
                      </td>

                      <td className="py-3 px-3 font-mono tabular-nums font-bold text-slate-900">
                        ${offer.annualSalary.toLocaleString()}
                        <span className="text-[10px] text-slate-400 font-normal block font-sans">
                          Annual Base Salary
                        </span>
                      </td>

                      <td className="py-3 px-3 text-slate-700">
                        <div>{offer.bonusPercentage}% Target Bonus</div>
                        {offer.stockUnits && (
                          <div className="text-[11px] text-slate-500 font-mono">
                            {offer.stockUnits.toLocaleString()} Equity Units
                          </div>
                        )}
                      </td>

                      <td className="py-3 px-3 text-slate-700">
                        <div className="flex items-center gap-1 font-mono">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          <span>{offer.joiningDate}</span>
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Expires: {offer.expirationDate}
                        </div>
                      </td>

                      <td className="py-3 px-3">
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded border uppercase ${
                            isAccepted
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : isSent
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-slate-100 text-slate-700 border-slate-200'
                          }`}
                        >
                          {offer.status}
                        </span>
                      </td>

                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {offer.status === 'Draft' && (
                            <button
                              onClick={() => updateOfferStatus(offer.id, 'Sent')}
                              className="px-2.5 py-1 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded border border-blue-200 flex items-center gap-1"
                            >
                              <Send className="w-3 h-3" />
                              <span>Send Offer</span>
                            </button>
                          )}
                          {isSent && (
                            <>
                              <button
                                onClick={() => updateOfferStatus(offer.id, 'Accepted')}
                                className="px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded border border-emerald-200 flex items-center gap-1"
                              >
                                <CheckCircle className="w-3 h-3" />
                                <span>Accepted</span>
                              </button>
                              <button
                                onClick={() => updateOfferStatus(offer.id, 'Declined')}
                                className="p-1 text-slate-400 hover:text-red-600 rounded"
                                title="Mark Declined"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          {isAccepted && (
                            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                              Placed & Hired
                            </span>
                          )}
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
