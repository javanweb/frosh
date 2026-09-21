import React, { useState } from 'react';
import {
  Search, Filter, Plus, User, Building, Calendar, DollarSign,
  AlertTriangle, CheckCircle2, XCircle, Sparkles, LayoutGrid,
  List, ArrowUpDown, ChevronDown, Check, Phone, Briefcase, Tag, Clock
} from 'lucide-react';
import { Opportunity, Customer, Salesperson, SalesStage } from '../types';
import { SALES_STAGES, STAGE_LABEL_MAP } from '../data/salesStages';

interface WindowsOpportunityPipelineProps {
  opportunities: Opportunity[];
  customers: Customer[];
  salespeople: Salesperson[];
  onSelectOpportunity: (opportunity: Opportunity) => void;
  onOpenQuickOpportunity: () => void;
}

export const WindowsOpportunityPipeline: React.FC<WindowsOpportunityPipelineProps> = ({
  opportunities,
  customers,
  salespeople,
  onSelectOpportunity,
  onOpenQuickOpportunity
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSalesperson, setSelectedSalesperson] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'won' | 'lost'>('all');
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');

  // Filtered deals
  const filteredDeals = opportunities.filter(deal => {
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch = !q || 
      deal.name.toLowerCase().includes(q) || 
      deal.customerName.toLowerCase().includes(q);

    const matchesSp = selectedSalesperson === 'all' || deal.owner === selectedSalesperson;
    const matchesPriority = selectedPriority === 'all' || deal.priority === selectedPriority;
    const matchesStatus = selectedStatus === 'all' || deal.status === selectedStatus;

    return matchesSearch && matchesSp && matchesPriority && matchesStatus;
  });

  // Calculate high-level pipeline stats
  const activeDeals = filteredDeals.filter(d => d.status === 'active');
  const wonDeals = filteredDeals.filter(d => d.status === 'won');
  const totalActiveValue = activeDeals.reduce((sum, d) => sum + d.potentialValue, 0);
  const overdueCount = activeDeals.filter(d => d.nextAction.isOverdue).length;

  const PIPELINE_COLUMNS: { key: string; label: string; stages: SalesStage[]; color: string; bg: string }[] = [
    {
      key: 'col_qualified',
      label: 'احراز صلاحیت و پتانسیل',
      stages: ['new', 'qualified'],
      color: 'text-sky-700 border-sky-300',
      bg: 'bg-sky-50/50'
    },
    {
      key: 'col_interested',
      label: 'علاقه‌مندی به خرید',
      stages: ['interested'],
      color: 'text-teal-700 border-teal-300',
      bg: 'bg-teal-50/50'
    },
    {
      key: 'col_price',
      label: 'بررسی قیمت و پیش‌فاکتور',
      stages: ['price_discussion'],
      color: 'text-amber-700 border-amber-300',
      bg: 'bg-amber-50/50'
    },
    {
      key: 'col_decision',
      label: 'مرحله تصمیم‌گیری',
      stages: ['decision'],
      color: 'text-indigo-700 border-indigo-300',
      bg: 'bg-indigo-50/50'
    },
    {
      key: 'col_negotiation',
      label: 'مذاکره نهایی و تسویه',
      stages: ['negotiation'],
      color: 'text-purple-700 border-purple-300',
      bg: 'bg-purple-50/50'
    },
    {
      key: 'col_won',
      label: 'معاملات موفق (WON)',
      stages: ['won'],
      color: 'text-emerald-700 border-emerald-300',
      bg: 'bg-emerald-50/50'
    },
    {
      key: 'col_lost',
      label: 'از دست رفته (LOST)',
      stages: ['lost'],
      color: 'text-rose-700 border-rose-300',
      bg: 'bg-rose-50/50'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Top SaaS Header & Filter Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-md shadow-teal-600/20 font-black">
              KB
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900">
                پایپ‌لاین مدیریت معاملات و فرصت‌های فروش (Deal Flow)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {activeDeals.length} فرصت فعال به ارزش{' '}
                <strong className="text-slate-800 font-mono">
                  {(totalActiveValue / 1000000).toLocaleString('fa-IR')} م.ت
                </strong>{' '}
                {overdueCount > 0 && (
                  <span className="text-rose-600 font-bold mr-1">
                    ({overdueCount} اقدام معوق)
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Switcher */}
            <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs">
              <button
                type="button"
                onClick={() => setViewMode('kanban')}
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 transition cursor-pointer ${
                  viewMode === 'kanban' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>کانبان</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 transition cursor-pointer ${
                  viewMode === 'list' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>جدول فشرده</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onOpenQuickOpportunity}
              className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-md shadow-teal-600/20 transition flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>ثبت فرصت فروش جدید</span>
            </button>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجو در عنوان فرصت یا نام مشتری..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-9 pl-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
          </div>

          {/* Salesperson Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 text-[11px]">بازاریاب:</span>
            <select
              value={selectedSalesperson}
              onChange={(e) => setSelectedSalesperson(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-teal-500"
            >
              <option value="all">همه بازاریاب‌ها ({salespeople.length})</option>
              {salespeople.map(sp => (
                <option key={sp.id} value={sp.name}>{sp.name}</option>
              ))}
            </select>
          </div>

          {/* Priority Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 text-[11px]">اولویت:</span>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-teal-500"
            >
              <option value="all">همه اولویت‌ها</option>
              <option value="high">فوری / بالا</option>
              <option value="normal">عادی</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 text-[11px]">وضعیت:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as any)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-teal-500"
            >
              <option value="all">همه وضعیت‌ها</option>
              <option value="active">در جریان (Active)</option>
              <option value="won">نهایی‌شده (Won)</option>
              <option value="lost">از دست رفته (Lost)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main View: Kanban Columns or Dense List */}
      {viewMode === 'kanban' ? (
        <div className="flex gap-3 overflow-x-auto pb-4 items-start min-h-[580px]">
          {PIPELINE_COLUMNS.map(col => {
            const dealsInCol = filteredDeals.filter(d => col.stages.includes(d.stage));
            const colTotalVal = dealsInCol.reduce((sum, d) => sum + d.potentialValue, 0);

            return (
              <div 
                key={col.key}
                className="w-[280px] shrink-0 bg-slate-100/70 rounded-3xl p-3 border border-slate-200/80 flex flex-col max-h-[720px]"
              >
                {/* Column Header */}
                <div className="p-2 mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black text-slate-900">{col.label}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-white text-slate-700 shadow-2xs">
                      {dealsInCol.length}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 font-mono">
                    {colTotalVal > 0 ? `${(colTotalVal / 1000000).toLocaleString('fa-IR')} م.ت` : '۰'}
                  </span>
                </div>

                {/* Column Cards */}
                <div className="space-y-2.5 overflow-y-auto flex-1 pr-0.5">
                  {dealsInCol.map(deal => (
                    <div
                      key={deal.id}
                      onClick={() => onSelectOpportunity(deal)}
                      className="p-3.5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-teal-300 transition cursor-pointer group text-right space-y-2"
                    >
                      {/* Card Header: Value & Priority */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-teal-800 font-mono">
                          {deal.potentialValueFormatted}
                        </span>
                        {deal.priority === 'high' && (
                          <span className="text-[9px] px-2 py-0.5 rounded-full font-bold bg-amber-50 text-amber-800 border border-amber-200">
                            فوری
                          </span>
                        )}
                      </div>

                      {/* Deal Name */}
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-teal-800 transition line-clamp-2 leading-relaxed">
                        {deal.name}
                      </h4>

                      {/* Customer Name */}
                      <div className="flex items-center gap-1 text-[11px] text-slate-500">
                        <Building className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{deal.customerName}</span>
                      </div>

                      {/* Next Action Chip */}
                      <div className={`p-2 rounded-xl text-[10px] font-medium flex items-center justify-between gap-1 ${
                        deal.nextAction.isOverdue && deal.status === 'active'
                          ? 'bg-rose-50 text-rose-800 border border-rose-200'
                          : 'bg-slate-50 text-slate-700 border border-slate-100'
                      }`}>
                        <span className="truncate flex-1">
                          {deal.nextAction.title}
                        </span>
                        {deal.nextAction.isOverdue && deal.status === 'active' && (
                          <span className="text-[9px] font-bold text-rose-700 shrink-0">
                            معوق
                          </span>
                        )}
                      </div>

                      {/* Footer: Owner & Close Date */}
                      <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                        <span className="flex items-center gap-1 text-slate-600">
                          <User className="w-3 h-3 text-slate-400" />
                          {deal.owner}
                        </span>
                        <span className="font-mono">{deal.expectedCloseDate}</span>
                      </div>
                    </div>
                  ))}

                  {dealsInCol.length === 0 && (
                    <div className="py-8 text-center text-[11px] text-slate-400 bg-white/40 rounded-2xl border border-dashed border-slate-200">
                      فرصتی در این مرحله نیست
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table List View */
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
                <tr>
                  <th className="p-3.5 pr-5">عنوان فرصت فروش</th>
                  <th className="p-3.5">مشتری</th>
                  <th className="p-3.5">مرحله فروش</th>
                  <th className="p-3.5">ارزش تخمینی</th>
                  <th className="p-3.5">مسئول پرونده</th>
                  <th className="p-3.5">اقدام بعدی</th>
                  <th className="p-3.5">تاریخ بسته‌شدن</th>
                  <th className="p-3.5 pl-5">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredDeals.map(deal => (
                  <tr 
                    key={deal.id}
                    onClick={() => onSelectOpportunity(deal)}
                    className="hover:bg-teal-50/40 transition cursor-pointer group"
                  >
                    <td className="p-3.5 pr-5">
                      <div className="font-bold text-slate-900 group-hover:text-teal-800 transition">
                        {deal.name}
                      </div>
                      <span className="text-[10px] text-slate-400">{deal.sourceLabel}</span>
                    </td>
                    <td className="p-3.5 text-slate-700 font-medium">{deal.customerName}</td>
                    <td className="p-3.5">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-teal-50 text-teal-800 border border-teal-200">
                        {STAGE_LABEL_MAP[deal.stage]}
                      </span>
                    </td>
                    <td className="p-3.5 font-bold font-mono text-slate-800">
                      {deal.potentialValueFormatted}
                    </td>
                    <td className="p-3.5 text-slate-600">{deal.owner}</td>
                    <td className="p-3.5">
                      <div className={`text-[11px] font-medium max-w-xs truncate ${
                        deal.nextAction.isOverdue ? 'text-rose-700 font-bold' : 'text-slate-700'
                      }`}>
                        {deal.nextAction.title}
                      </div>
                      <span className="text-[10px] text-slate-400">{deal.nextAction.dueDate}</span>
                    </td>
                    <td className="p-3.5 text-slate-500 font-mono">{deal.expectedCloseDate}</td>
                    <td className="p-3.5 pl-5">
                      <button
                        type="button"
                        className="px-3 py-1 rounded-lg bg-slate-100 group-hover:bg-teal-600 group-hover:text-white text-slate-700 text-xs font-bold transition cursor-pointer"
                      >
                        پرونده ۳۶۰ ←
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
