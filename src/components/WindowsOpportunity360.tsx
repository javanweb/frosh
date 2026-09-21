import React, { useState } from 'react';
import {
  X, User, Building, Phone, Calendar, DollarSign, Clock,
  ArrowRight, CheckCircle2, XCircle, AlertTriangle, Sparkles,
  RefreshCw, Send, Plus, Award, AlertOctagon, UserCheck, ShieldAlert,
  ChevronLeft, FileText, Check, MessageSquare, History, Tag, ArrowUpRight
} from 'lucide-react';
import { Opportunity, Customer, Salesperson, SalesStage } from '../types';
import { SALES_STAGES, STAGE_LABEL_MAP, LOST_REASONS, getSmartNextAction } from '../data/salesStages';

interface WindowsOpportunity360Props {
  isOpen: boolean;
  onClose: () => void;
  opportunity: Opportunity;
  customer?: Customer;
  salespeople: Salesperson[];
  onUpdateOpportunity: (updated: Opportunity) => void;
  onOpenCustomer360?: (customer: Customer) => void;
}

export const WindowsOpportunity360: React.FC<WindowsOpportunity360Props> = ({
  isOpen,
  onClose,
  opportunity,
  customer,
  salespeople,
  onUpdateOpportunity,
  onOpenCustomer360
}) => {
  const [showReassignModal, setShowReassignModal] = useState(false);
  const [newOwnerName, setNewOwnerName] = useState(opportunity.owner);
  const [reassignReason, setReassignReason] = useState('تخصیص مجدد منطقه و پیگیری تخصصی');

  const [showStageModal, setShowStageModal] = useState(false);
  const [targetStage, setTargetStage] = useState<SalesStage>(opportunity.stage);
  const [transitionNextAction, setTransitionNextAction] = useState('');
  const [transitionDate, setTransitionDate] = useState('فردا ۱۰:۰۰');

  const [showWonModal, setShowWonModal] = useState(false);
  const [wonNotes, setWonNotes] = useState('قرارداد نهایی امضا شد و سفارش به خط تولید ابلاغ گردید.');

  const [showLostModal, setShowLostModal] = useState(false);
  const [lostReason, setLostReason] = useState<any>('competitor');
  const [competitorName, setCompetitorName] = useState('');
  const [lostNotes, setLostNotes] = useState('');

  const [newNote, setNewNote] = useState('');

  if (!isOpen) return null;

  // Handle owner reassignment preserving full history
  const handleConfirmReassign = () => {
    if (newOwnerName === opportunity.owner) {
      setShowReassignModal(false);
      return;
    }

    const prevOwner = opportunity.owner;
    const historyEntry = {
      date: 'امروز',
      previousOwner: prevOwner,
      newOwner: newOwnerName,
      reason: reassignReason
    };

    const timelineEntry = {
      id: `opt-owner-${Date.now()}`,
      date: 'امروز',
      time: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
      type: 'owner_changed' as const,
      title: `تغییر مسئول بازاریاب: ${prevOwner} ← ${newOwnerName}`,
      description: `علت تغییر: ${reassignReason}`,
      actor: 'مدیر سیستم',
      badge: 'تغییر مسئول'
    };

    const updated: Opportunity = {
      ...opportunity,
      owner: newOwnerName,
      ownerHistory: [...opportunity.ownerHistory, historyEntry],
      lastActivity: `واگذاری پرونده به ${newOwnerName} توسط مدیر`,
      nextAction: {
        ...opportunity.nextAction,
        assignedTo: newOwnerName
      },
      timeline: [timelineEntry, ...opportunity.timeline]
    };

    onUpdateOpportunity(updated);
    setShowReassignModal(false);
  };

  const handleOpenStageChange = (st: SalesStage) => {
    setTargetStage(st);
    const smart = getSmartNextAction(st);
    setTransitionNextAction(smart.title);
    setShowStageModal(true);
  };

  const handleConfirmStageTransition = () => {
    const prevStage = opportunity.stage;
    const stageConf = SALES_STAGES.find(s => s.key === targetStage);
    const stageTitle = stageConf?.label || targetStage;

    const newTimelineEvent = {
      id: `opt-ev-${Date.now()}`,
      date: 'امروز',
      time: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
      type: 'stage_changed' as const,
      title: `انتقال مرحله: ${STAGE_LABEL_MAP[prevStage]} ← ${stageTitle}`,
      description: `اقدام بعدی تعیین شد: ${transitionNextAction}`,
      actor: 'مدیر فروش',
      previousStage: prevStage,
      newStage: targetStage,
      badge: 'تغییر مرحله'
    };

    const updated: Opportunity = {
      ...opportunity,
      stage: targetStage,
      status: targetStage === 'won' ? 'won' : targetStage === 'lost' ? 'lost' : 'active',
      lastActivity: `تغییر مرحله به ${stageTitle} توسط مدیر`,
      nextAction: {
        ...opportunity.nextAction,
        title: transitionNextAction || opportunity.nextAction.title,
        dueDate: transitionDate || opportunity.nextAction.dueDate,
        isOverdue: false
      },
      timeline: [newTimelineEvent, ...opportunity.timeline]
    };

    onUpdateOpportunity(updated);
    setShowStageModal(false);
  };

  const handleConfirmWon = () => {
    const updated: Opportunity = {
      ...opportunity,
      stage: 'won',
      status: 'won',
      winDetails: {
        wonDate: 'امروز',
        finalValue: opportunity.potentialValueFormatted,
        notes: wonNotes
      },
      lastActivity: 'معامله با موفقیت تایید شد (WON)',
      timeline: [
        {
          id: `opt-won-${Date.now()}`,
          date: 'امروز',
          time: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
          type: 'won',
          title: 'معامله با موفقیت نهایی شد (WON)',
          description: wonNotes,
          actor: 'مدیر فروش',
          badge: 'موفق'
        },
        ...opportunity.timeline
      ]
    };
    onUpdateOpportunity(updated);
    setShowWonModal(false);
  };

  const handleConfirmLost = () => {
    const reasonObj = LOST_REASONS.find(r => r.key === lostReason);
    const updated: Opportunity = {
      ...opportunity,
      stage: 'lost',
      status: 'lost',
      lostDetails: {
        lostDate: 'امروز',
        reason: lostReason,
        reasonLabel: reasonObj?.label || 'عدم توافق',
        competitorName: competitorName.trim() || undefined,
        notes: lostNotes
      },
      lastActivity: `فرصت از دست رفت (${reasonObj?.label})`,
      timeline: [
        {
          id: `opt-lost-${Date.now()}`,
          date: 'امروز',
          time: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
          type: 'lost',
          title: 'فرصت فروش از دست رفت (LOST)',
          description: `دلیل: ${reasonObj?.label}${competitorName ? ` | رقیب: ${competitorName}` : ''} - ${lostNotes}`,
          actor: 'مدیر فروش',
          badge: 'از دست رفته'
        },
        ...opportunity.timeline
      ]
    };
    onUpdateOpportunity(updated);
    setShowLostModal(false);
  };

  const handleReopen = () => {
    const updated: Opportunity = {
      ...opportunity,
      stage: 'qualified',
      status: 'active',
      reopenedAt: 'امروز',
      lastActivity: 'فعال‌سازی مجدد فرصت فروش توسط مدیریت',
      nextAction: {
        type: 'تماس',
        title: 'تماس مجدد و بررسی فعال‌سازی مجدد پروژه',
        dueDate: 'فردا ۱۰:۰۰',
        assignedTo: opportunity.owner,
        isOverdue: false
      },
      timeline: [
        {
          id: `opt-reopen-${Date.now()}`,
          date: 'امروز',
          time: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
          type: 'reopened',
          title: 'فعال‌سازی مجدد فرصت فروش (Re-opened)',
          description: 'مدیریت فرصت را مجدداً به پایپ‌لاین فعال منتقل نمود.',
          actor: 'مدیر فروش',
          badge: 'بازگشایی'
        },
        ...opportunity.timeline
      ]
    };
    onUpdateOpportunity(updated);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    const event = {
      id: `opt-note-${Date.now()}`,
      date: 'امروز',
      time: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
      type: 'note' as const,
      title: 'یادداشت مدیریت',
      description: newNote.trim(),
      actor: 'مدیر فروش',
      badge: 'دستور مدیر'
    };

    onUpdateOpportunity({
      ...opportunity,
      lastActivity: `ثبت دستور مدیریتی — هم‌اکنون`,
      timeline: [event, ...opportunity.timeline]
    });
    setNewNote('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-5xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden text-right flex flex-col max-h-[92vh]"
        dir="rtl"
      >
        {/* Top Header Bar */}
        <div className="p-4 px-6 border-b border-slate-100 bg-slate-50/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-md shadow-teal-600/20 font-black text-sm">
              ۳۶۰
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black text-slate-900">{opportunity.name}</h2>
                <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold border ${
                  opportunity.status === 'won'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                    : opportunity.status === 'lost'
                    ? 'bg-rose-50 text-rose-700 border-rose-300'
                    : 'bg-teal-50 text-teal-700 border-teal-200'
                }`}>
                  {opportunity.status === 'won' ? 'موفق (Won)' : opportunity.status === 'lost' ? 'از دست رفته (Lost)' : 'فرصت فعال'}
                </span>
                {opportunity.nextAction.isOverdue && opportunity.status === 'active' && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    پیگیری معوق
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                پرونده ۳۶۰ درجه فرصت فروش • مدیریت کلان معاملات کویر بسپار
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {opportunity.status === 'active' ? (
              <>
                <button
                  type="button"
                  onClick={() => setShowWonModal(true)}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>ثبت موفقیت (Won)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowLostModal(true)}
                  className="px-3.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <XCircle className="w-3.5 h-3.5 text-rose-600" />
                  <span>ثبت از دست رفتن (Lost)</span>
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={handleReopen}
                className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>فعال‌سازی مجدد معامله (Re-open)</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3-Zone Architecture */}
        <div className="grid grid-cols-12 flex-1 overflow-hidden">
          {/* Zone 1 (Right in RTL / Left in LTR): Identity & Customer Details (3 cols) */}
          <div className="col-span-12 md:col-span-4 border-l border-slate-200 p-5 overflow-y-auto space-y-4 bg-slate-50/50">
            {/* Customer Box */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-400">مشتری طرف قرارداد</span>
                {customer && onOpenCustomer360 && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenCustomer360(customer);
                    }}
                    className="text-[11px] text-teal-700 font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
                  >
                    <span>مشاهده ۳۶۰ مشتری</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                )}
              </div>
              <h4 className="text-sm font-black text-slate-900">{opportunity.customerName}</h4>
              <p className="text-xs text-slate-500 mt-0.5">{opportunity.customerType}</p>
              {customer?.phone && (
                <p className="text-xs text-slate-600 mt-2 font-mono flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  {customer.phone}
                </p>
              )}
            </div>

            {/* Owner & Reassignment Box */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-400">بازاریاب مسئول (Owner)</span>
                <button
                  type="button"
                  onClick={() => setShowReassignModal(true)}
                  className="text-[11px] text-teal-700 font-bold hover:underline cursor-pointer"
                >
                  تغییر مسئول ←
                </button>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs">
                  {opportunity.owner.slice(0, 2)}
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900">{opportunity.owner}</h4>
                  <span className="text-[10px] text-slate-400">مسئول پیگیری میدانی</span>
                </div>
              </div>

              {/* Ownership History */}
              {opportunity.ownerHistory && opportunity.ownerHistory.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-slate-100 text-[10px] text-slate-500">
                  <span className="font-bold text-slate-600 block mb-1 flex items-center gap-1">
                    <History className="w-3 h-3 text-slate-400" />
                    تاریخچه تخصیص پرونده:
                  </span>
                  {opportunity.ownerHistory.map((h, i) => (
                    <div key={i} className="py-0.5">
                      {h.date}: {h.previousOwner} ← {h.newOwner}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Financial & Source Overview */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">ارزش پتانسیل:</span>
                <span className="font-black text-slate-900 font-mono">{opportunity.potentialValueFormatted}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">منبع فرصت:</span>
                <span className="font-bold text-slate-700">{opportunity.sourceLabel}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">تاریخ بسته‌شدن مورد انتظار:</span>
                <span className="font-bold text-slate-700">{opportunity.expectedCloseDate}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">اولویت فروش:</span>
                <span className={`font-bold ${opportunity.priority === 'high' ? 'text-amber-700' : 'text-slate-700'}`}>
                  {opportunity.priority === 'high' ? 'فوری / بالا' : 'عادی'}
                </span>
              </div>
            </div>
          </div>

          {/* Zone 2: Story of Sales & Timeline (5 cols) */}
          <div className="col-span-12 md:col-span-5 p-5 overflow-y-auto space-y-4 border-l border-slate-200">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                <History className="w-4 h-4 text-teal-600" />
                <span>گاه‌شمار کامل مذاکرات و پیشرفت (Story of Sales)</span>
              </h3>
              <span className="text-[10px] text-slate-400">
                {opportunity.timeline.length} رویداد ثبت‌شده
              </span>
            </div>

            {/* Add Directive Note */}
            <form onSubmit={handleAddNote} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-[11px] font-bold text-slate-700 block">ثبت دستور یا یادداشت مدیریتی:</span>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="دستور مدیر برای بازاریاب یا نتیجه جلسه..."
                  className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                />
                <button
                  type="submit"
                  disabled={!newNote.trim()}
                  className="px-3 py-1.5 rounded-xl bg-teal-600 text-white text-xs font-bold disabled:opacity-50 cursor-pointer"
                >
                  ثبت
                </button>
              </div>
            </form>

            {/* Timeline Stream */}
            <div className="relative pr-4 border-r-2 border-slate-200 space-y-3 pt-2">
              {opportunity.timeline.map((event) => (
                <div key={event.id} className="relative group">
                  <div className="absolute -right-[23px] top-1.5 w-3.5 h-3.5 rounded-full bg-white border-2 border-teal-600 group-hover:scale-125 transition" />
                  <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-teal-200 transition">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-black text-slate-900">{event.title}</span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {event.date} {event.time}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{event.description}</p>
                    <div className="mt-2 text-[10px] text-slate-400 flex items-center justify-between">
                      <span>ثبت توسط: <strong>{event.actor}</strong></span>
                      {event.badge && (
                        <span className="px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-bold">
                          {event.badge}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Zone 3: Stage Progression & Next Action (3 cols) */}
          <div className="col-span-12 md:col-span-3 p-5 overflow-y-auto space-y-4 bg-slate-50/50">
            {/* Current Stage Box */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-[11px] font-bold text-slate-400 block mb-1">مرحله فعلی فروش</span>
              <div className="flex items-center justify-between">
                <span className="text-sm font-black text-teal-800">
                  {STAGE_LABEL_MAP[opportunity.stage]}
                </span>
                <span className="text-xs text-teal-600 font-bold font-mono">
                  گام {SALES_STAGES.find(s => s.key === opportunity.stage)?.step || 1} از ۶
                </span>
              </div>

              {/* Stage Stepper list */}
              <div className="mt-3 space-y-1">
                {SALES_STAGES.filter(s => s.key !== 'won' && s.key !== 'lost').map((s) => {
                  const isCurrent = s.key === opportunity.stage;
                  const isPast = s.step < (SALES_STAGES.find(st => st.key === opportunity.stage)?.step || 1);

                  return (
                    <button
                      key={s.key}
                      type="button"
                      onClick={() => handleOpenStageChange(s.key)}
                      className={`w-full py-1.5 px-2.5 rounded-xl text-right text-[11px] font-bold flex items-center justify-between transition cursor-pointer ${
                        isCurrent
                          ? 'bg-teal-600 text-white shadow-xs'
                          : isPast
                          ? 'bg-teal-50 text-teal-800 hover:bg-teal-100'
                          : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                      }`}
                    >
                      <span>{s.step}. {s.label}</span>
                      {isPast && <Check className="w-3 h-3 text-teal-700" />}
                      {isCurrent && <span className="text-[9px] bg-white/20 px-1.5 rounded">جاری</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Next Action Box */}
            <div className={`p-4 rounded-2xl border transition shadow-2xs ${
              opportunity.nextAction.isOverdue && opportunity.status === 'active'
                ? 'bg-rose-50 border-rose-200'
                : 'bg-white border-slate-200'
            }`}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-black text-slate-900 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                  اقدام بعدی معامله
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                  opportunity.nextAction.isOverdue ? 'bg-rose-100 text-rose-700' : 'bg-teal-50 text-teal-800'
                }`}>
                  {opportunity.nextAction.dueDate}
                </span>
              </div>
              <p className="text-xs font-bold text-slate-800 leading-relaxed">
                {opportunity.nextAction.title}
              </p>
              <div className="mt-2 text-[10px] text-slate-400">
                مسئول: <strong className="text-slate-700">{opportunity.nextAction.assignedTo}</strong>
              </div>
            </div>

            {/* Won/Lost Info if completed */}
            {opportunity.winDetails && (
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs">
                <span className="font-bold flex items-center gap-1 text-emerald-800 mb-1">
                  <Award className="w-3.5 h-3.5" />
                  معامله با موفقیت نهایی شده:
                </span>
                <p className="text-[11px] leading-relaxed">{opportunity.winDetails.notes}</p>
              </div>
            )}

            {opportunity.lostDetails && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs">
                <span className="font-bold flex items-center gap-1 text-rose-800 mb-1">
                  <AlertOctagon className="w-3.5 h-3.5" />
                  علت از دست رفتن:
                </span>
                <p className="text-[11px] leading-relaxed font-bold">{opportunity.lostDetails.reasonLabel}</p>
                {opportunity.lostDetails.notes && (
                  <p className="text-[10px] text-rose-700 mt-1">{opportunity.lostDetails.notes}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reassign Owner Modal */}
      {showReassignModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white rounded-3xl p-5 border border-slate-200 shadow-2xl text-right" dir="rtl">
            <h3 className="text-sm font-black text-slate-900 mb-1">
              تغییر بازاریاب مسئول پرونده
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              با تغییر مسئول، تمام سوابق قبلی محفوظ می‌ماند و در تایم‌لاین ثبت می‌شود.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">انتخاب بازاریاب جدید</label>
                <select
                  value={newOwnerName}
                  onChange={(e) => setNewOwnerName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 font-bold focus:outline-none focus:border-teal-500"
                >
                  {salespeople.map(sp => (
                    <option key={sp.id} value={sp.name}>{sp.name} ({sp.zone})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">علت واگذاری پرونده</label>
                <input
                  type="text"
                  value={reassignReason}
                  onChange={(e) => setReassignReason(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowReassignModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-600 hover:bg-slate-50"
              >
                انصراف
              </button>
              <button
                type="button"
                onClick={handleConfirmReassign}
                className="px-4 py-2 rounded-xl bg-teal-600 text-white text-xs font-bold hover:bg-teal-700"
              >
                تایید تغییر مسئول
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stage Transition Modal */}
      {showStageModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-3xl p-5 border border-slate-200 shadow-2xl text-right" dir="rtl">
            <h3 className="text-sm font-black text-slate-900 mb-1">تغییر مرحله معامله</h3>
            <p className="text-xs text-slate-500 mb-4">اقدام بعدی متناسب با این مرحله را تنظیم نمایید:</p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">مرحله جدید</label>
                <select
                  value={targetStage}
                  onChange={(e) => {
                    const st = e.target.value as SalesStage;
                    setTargetStage(st);
                    const smart = getSmartNextAction(st);
                    setTransitionNextAction(smart.title);
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 font-bold focus:outline-none focus:border-teal-500"
                >
                  {SALES_STAGES.filter(s => s.key !== 'won' && s.key !== 'lost').map(s => (
                    <option key={s.key} value={s.key}>{s.step}. {s.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">اقدام بعدی</label>
                <input
                  type="text"
                  value={transitionNextAction}
                  onChange={(e) => setTransitionNextAction(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowStageModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-600 hover:bg-slate-50"
              >
                انصراف
              </button>
              <button
                type="button"
                onClick={handleConfirmStageTransition}
                className="px-4 py-2 rounded-xl bg-teal-600 text-white text-xs font-bold hover:bg-teal-700"
              >
                اعمال تغییر مرحله
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Won Modal */}
      {showWonModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-3xl p-5 border border-slate-200 shadow-2xl text-right" dir="rtl">
            <h3 className="text-base font-black text-slate-900 mb-1">ثبت پیروزی معامله (Won)</h3>
            <p className="text-xs text-slate-500 mb-4">معامله به ارزش {opportunity.potentialValueFormatted} ثبت موفقیت شد.</p>
            <textarea
              rows={3}
              value={wonNotes}
              onChange={(e) => setWonNotes(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
            />
            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowWonModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-600"
              >
                انصراف
              </button>
              <button
                type="button"
                onClick={handleConfirmWon}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700"
              >
                ثبت قطعی موفقیت
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lost Modal */}
      {showLostModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-3xl p-5 border border-slate-200 shadow-2xl text-right" dir="rtl">
            <h3 className="text-base font-black text-slate-900 mb-1">ثبت عدم موفقیت معامله (Lost)</h3>
            <p className="text-xs text-slate-500 mb-4">دلیل عدم خرید برای تحلیل بازار ثبت می‌شود:</p>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">علت</label>
                <select
                  value={lostReason}
                  onChange={(e) => setLostReason(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs text-slate-900"
                >
                  {LOST_REASONS.map(r => (
                    <option key={r.key} value={r.key}>{r.label}</option>
                  ))}
                </select>
              </div>
              {lostReason === 'competitor' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">نام رقیب</label>
                  <input
                    type="text"
                    value={competitorName}
                    onChange={(e) => setCompetitorName(e.target.value)}
                    placeholder="مثال: سوپرپایپ"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs text-slate-900"
                  />
                </div>
              )}
            </div>
            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowLostModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-600"
              >
                انصراف
              </button>
              <button
                type="button"
                onClick={handleConfirmLost}
                className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700"
              >
                ثبت Lost
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
