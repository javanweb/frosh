import React, { useState } from 'react';
import { 
  X, Phone, Calendar, Clock, DollarSign, User, Building, 
  ArrowRight, CheckCircle2, XCircle, AlertTriangle, Sparkles, 
  ChevronRight, RefreshCw, Send, Plus, Award, AlertOctagon,
  FileText, Briefcase, Tag, Check, MessageSquare
} from 'lucide-react';
import { Opportunity, SalesStage, Customer } from '../types';
import { SALES_STAGES, STAGE_LABEL_MAP, LOST_REASONS, getSmartNextAction } from '../data/salesStages';

interface Opportunity360ModalProps {
  isOpen: boolean;
  onClose: () => void;
  opportunity: Opportunity;
  customer?: Customer;
  onUpdateOpportunity: (updated: Opportunity) => void;
  onOpenCustomerProfile?: (customerId: string) => void;
  onStartVisitForOpportunity?: (opportunity: Opportunity) => void;
}

export const Opportunity360Modal: React.FC<Opportunity360ModalProps> = ({
  isOpen,
  onClose,
  opportunity,
  customer,
  onUpdateOpportunity,
  onOpenCustomerProfile,
  onStartVisitForOpportunity
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'tasks'>('overview');
  const [showStageModal, setShowStageModal] = useState(false);
  const [showWonModal, setShowWonModal] = useState(false);
  const [showLostModal, setShowLostModal] = useState(false);
  const [newNote, setNewNote] = useState('');

  // Lost form state
  const [lostReason, setLostReason] = useState<any>('competitor');
  const [competitorName, setCompetitorName] = useState('');
  const [lostNotes, setLostNotes] = useState('');

  // Won form state
  const [wonNotes, setWonNotes] = useState('قرارداد نهایی امضا شد و سفارش به خط تولید ابلاغ گردید.');

  // Stage change transition state
  const [targetStage, setTargetStage] = useState<SalesStage>(opportunity.stage);
  const [transitionNextAction, setTransitionNextAction] = useState('');
  const [transitionDate, setTransitionDate] = useState('فردا ۱۰:۰۰');

  if (!isOpen) return null;

  const handleOpenStageModal = (newStage: SalesStage) => {
    setTargetStage(newStage);
    const smart = getSmartNextAction(newStage);
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
      actor: opportunity.owner,
      previousStage: prevStage,
      newStage: targetStage,
      badge: 'تغییر مرحله'
    };

    const updated: Opportunity = {
      ...opportunity,
      stage: targetStage,
      status: targetStage === 'won' ? 'won' : targetStage === 'lost' ? 'lost' : 'active',
      lastActivity: `تغییر مرحله به ${stageTitle} — هم‌اکنون`,
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
      lastActivity: 'معامله با موفقیت نهایی شد (Won)',
      timeline: [
        {
          id: `opt-won-${Date.now()}`,
          date: 'امروز',
          time: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
          type: 'won',
          title: 'معامله با موفقیت نهایی شد (WON)',
          description: wonNotes,
          actor: opportunity.owner,
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
          actor: opportunity.owner,
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
      lastActivity: 'فعال‌سازی مجدد فرصت فروش',
      nextAction: {
        type: 'تماس',
        title: 'تماس مجدد و ارزیابی مجدد نیازهای مشتری',
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
          description: 'فرصت مجدداً به چرخه فروش و مرحله احراز صلاحیت بازگردانده شد.',
          actor: opportunity.owner,
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
      title: 'یادداشت جدید بازاریاب',
      description: newNote.trim(),
      actor: opportunity.owner,
      badge: 'یادداشت'
    };

    onUpdateOpportunity({
      ...opportunity,
      lastActivity: `ثبت یادداشت — هم‌اکنون`,
      timeline: [event, ...opportunity.timeline]
    });
    setNewNote('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden text-right flex flex-col max-h-[94vh]"
        dir="rtl"
      >
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/80 flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold border ${
                opportunity.status === 'won'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                  : opportunity.status === 'lost'
                  ? 'bg-rose-50 text-rose-700 border-rose-300'
                  : 'bg-teal-50 text-teal-700 border-teal-200'
              }`}>
                {opportunity.status === 'won' ? 'موفق (Won)' : opportunity.status === 'lost' ? 'از دست رفته (Lost)' : 'فرصت فعال'}
              </span>

              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                opportunity.priority === 'high' ? 'bg-amber-50 text-amber-800 border-amber-200' : 'bg-slate-100 text-slate-600 border-slate-200'
              }`}>
                اولویت: {opportunity.priority === 'high' ? 'فوری/بالا' : 'عادی'}
              </span>

              {opportunity.nextAction.isOverdue && opportunity.status === 'active' && (
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1 animate-pulse">
                  <AlertTriangle className="w-3 h-3" />
                  پیگیری معوق
                </span>
              )}
            </div>

            <h2 className="text-base sm:text-lg font-black text-slate-900 truncate">
              {opportunity.name}
            </h2>

            <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 flex-wrap">
              <span className="flex items-center gap-1 font-medium text-teal-800">
                <Building className="w-3.5 h-3.5 text-teal-600" />
                {opportunity.customerName}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-slate-400" />
                مسئول: {opportunity.owner}
              </span>
              <span>•</span>
              <span className="font-bold text-slate-800 font-mono">
                {opportunity.potentialValueFormatted}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 flex items-center justify-center transition shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Sales Pipeline Stepper Bar */}
        <div className="px-4 py-3 bg-white border-b border-slate-100 overflow-x-auto">
          <div className="text-[11px] font-bold text-slate-500 mb-2 flex items-center justify-between">
            <span>مسیر معامله (Deal Stage):</span>
            <span className="text-teal-700 font-bold">
              مرحله کنونی: {STAGE_LABEL_MAP[opportunity.stage]}
            </span>
          </div>

          <div className="flex items-center gap-1.5 min-w-[500px]">
            {SALES_STAGES.filter(s => s.key !== 'won' && s.key !== 'lost').map((s, idx) => {
              const currentStep = SALES_STAGES.find(st => st.key === opportunity.stage)?.step || 1;
              const isPast = s.step < currentStep;
              const isCurrent = s.key === opportunity.stage;

              return (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => handleOpenStageModal(s.key)}
                  className={`flex-1 py-1.5 px-2 rounded-xl text-[11px] font-bold text-center border transition cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                    isCurrent
                      ? 'bg-teal-600 text-white border-teal-600 shadow-sm shadow-teal-600/20 ring-2 ring-teal-100'
                      : isPast
                      ? 'bg-teal-50 text-teal-800 border-teal-200 hover:bg-teal-100'
                      : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-[9px] opacity-75">{s.step}</span>
                  <span className="truncate w-full">{s.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Action Toolbar */}
        <div className="p-3 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center gap-1.5 shrink-0">
            {customer?.phone && (
              <a
                href={`tel:${customer.phone}`}
                className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold transition flex items-center gap-1.5 shadow-2xs"
              >
                <Phone className="w-3.5 h-3.5 text-teal-600" />
                <span>تماس ({customer.phone})</span>
              </a>
            )}

            {onStartVisitForOpportunity && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onStartVisitForOpportunity(opportunity);
                }}
                className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold transition flex items-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <Briefcase className="w-3.5 h-3.5 text-sky-600" />
                <span>ثبت ویزیت این فرصت</span>
              </button>
            )}

            {onOpenCustomerProfile && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenCustomerProfile(opportunity.customerId);
                }}
                className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold transition flex items-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <Building className="w-3.5 h-3.5 text-slate-500" />
                <span>پرونده ۳۶۰ مشتری</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {opportunity.status === 'active' ? (
              <>
                <button
                  type="button"
                  onClick={() => setShowWonModal(true)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1 shadow-xs cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>ثبت موفقیت (Won)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowLostModal(true)}
                  className="px-2.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                >
                  <XCircle className="w-3.5 h-3.5 text-rose-600" />
                  <span>از دست رفته (Lost)</span>
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={handleReopen}
                className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>فعال‌سازی مجدد (Re-open)</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 px-4 bg-white">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-2.5 px-4 text-xs font-bold border-b-2 transition ${
              activeTab === 'overview'
                ? 'border-teal-600 text-teal-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            خلاصه و اقدام بعدی
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`py-2.5 px-4 text-xs font-bold border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'timeline'
                ? 'border-teal-600 text-teal-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>گاه‌شمار معامله (Timeline)</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-600">
              {opportunity.timeline.length}
            </span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-4">
          {activeTab === 'overview' ? (
            <>
              {/* Next Action Card */}
              <div className={`p-4 rounded-2xl border transition ${
                opportunity.nextAction.isOverdue && opportunity.status === 'active'
                  ? 'bg-rose-50/70 border-rose-200'
                  : 'bg-teal-50/60 border-teal-200/80'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-teal-600" />
                    اقدام بعدی (Next Action)
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    opportunity.nextAction.isOverdue
                      ? 'bg-rose-100 text-rose-700'
                      : 'bg-teal-100 text-teal-800'
                  }`}>
                    مهلت: {opportunity.nextAction.dueDate}
                  </span>
                </div>

                <p className="text-xs font-bold text-slate-800 leading-relaxed">
                  {opportunity.nextAction.title}
                </p>

                {opportunity.nextAction.notes && (
                  <p className="text-[11px] text-slate-500 mt-1.5 bg-white/70 p-2 rounded-xl border border-slate-200/60">
                    یادداشت: {opportunity.nextAction.notes}
                  </p>
                )}

                <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                  <span>مسئول انجام: <strong className="text-slate-700">{opportunity.nextAction.assignedTo}</strong></span>
                  <button
                    type="button"
                    onClick={() => handleOpenStageModal(opportunity.stage)}
                    className="text-teal-700 font-bold hover:underline cursor-pointer"
                  >
                    تغییر اقدام / مرحله ←
                  </button>
                </div>
              </div>

              {/* Won Banner if closed */}
              {opportunity.status === 'won' && opportunity.winDetails && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900">
                  <div className="flex items-center gap-2 font-black text-xs text-emerald-800 mb-1">
                    <Award className="w-4 h-4 text-emerald-600" />
                    <span>معامله با موفقیت به نتیجه رسید (WON)</span>
                  </div>
                  <p className="text-xs text-emerald-800/90 leading-relaxed">
                    {opportunity.winDetails.notes}
                  </p>
                  <span className="text-[10px] text-emerald-700 block mt-1">
                    تاریخ نهایی‌سازی: {opportunity.winDetails.wonDate}
                  </span>
                </div>
              )}

              {/* Lost Banner if lost */}
              {opportunity.status === 'lost' && opportunity.lostDetails && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900">
                  <div className="flex items-center gap-2 font-black text-xs text-rose-800 mb-1">
                    <AlertOctagon className="w-4 h-4 text-rose-600" />
                    <span>معامله از دست رفت (LOST)</span>
                  </div>
                  <p className="text-xs text-rose-800/90 leading-relaxed">
                    علت: <strong>{opportunity.lostDetails.reasonLabel}</strong>
                    {opportunity.lostDetails.competitorName && ` • رقیب: ${opportunity.lostDetails.competitorName}`}
                  </p>
                  {opportunity.lostDetails.notes && (
                    <p className="text-[11px] text-rose-700 mt-1">
                      توضیحات: {opportunity.lostDetails.notes}
                    </p>
                  )}
                  <div className="mt-2 pt-2 border-t border-rose-200 flex items-center justify-between">
                    <span className="text-[10px] text-rose-600">تاریخ: {opportunity.lostDetails.lostDate}</span>
                    <button
                      type="button"
                      onClick={handleReopen}
                      className="text-xs font-bold text-teal-700 hover:underline cursor-pointer"
                    >
                      امکان فعال‌سازی مجدد معامله ←
                    </button>
                  </div>
                </div>
              )}

              {/* Key Deal Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 block mb-0.5">ارزش تخمینی پتانسیل</span>
                  <span className="text-xs font-black text-slate-800">{opportunity.potentialValueFormatted}</span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 block mb-0.5">منبع فرصت</span>
                  <span className="text-xs font-bold text-slate-800">{opportunity.sourceLabel}</span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 block mb-0.5">تاریخ پیش‌بینی اتمام</span>
                  <span className="text-xs font-bold text-slate-800">{opportunity.expectedCloseDate}</span>
                </div>
              </div>

              {/* Quick Note Add */}
              <form onSubmit={handleAddNote} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-700 block">ثبت یادداشت یا گزارش پیشرفت:</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="مثال: تماس با مهندس ناظر و توافق روی ارسال نمونه اتصالات..."
                    className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-teal-500 transition"
                  />
                  <button
                    type="submit"
                    disabled={!newNote.trim()}
                    className="px-3 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold disabled:opacity-50 transition cursor-pointer flex items-center gap-1"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>ثبت</span>
                  </button>
                </div>
              </form>
            </>
          ) : (
            /* Story of Sales: Chronological Timeline */
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-500 mb-2">
                رویدادهای ثبت‌شده در این فرصت فروش:
              </div>

              <div className="relative pr-4 border-r-2 border-slate-200 space-y-4">
                {opportunity.timeline.map((event) => (
                  <div key={event.id} className="relative group">
                    {/* Timeline Node */}
                    <div className="absolute -right-[23px] top-1 w-3.5 h-3.5 rounded-full bg-white border-2 border-teal-600 group-hover:scale-125 transition" />

                    <div className="bg-slate-50 hover:bg-slate-100/70 p-3.5 rounded-2xl border border-slate-200 transition">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-xs font-black text-slate-900">{event.title}</span>
                        <div className="flex items-center gap-1.5">
                          {event.badge && (
                            <span className="text-[9px] px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 font-bold">
                              {event.badge}
                            </span>
                          )}
                          <span className="text-[10px] text-slate-400 font-mono">
                            {event.date} - {event.time}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">{event.description}</p>

                      <div className="mt-2 text-[10px] text-slate-400">
                        ثبت‌کننده: <strong className="text-slate-600">{event.actor}</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stage Transition Modal */}
      {showStageModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white rounded-3xl p-5 border border-slate-200 shadow-2xl text-right" dir="rtl">
            <h3 className="text-sm font-black text-slate-900 mb-1">
              انتقال مرحله معامله
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              با تغییر مرحله، اقدام بعدی و زمان پیگیری را به‌روزرسانی کنید:
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">انتخاب مرحله جدید</label>
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
                    <option key={s.key} value={s.key}>
                      {s.step}. {s.label} ({s.description})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  اقدام بعدی پیشنهادی متناسب با این مرحله
                </label>
                <input
                  type="text"
                  value={transitionNextAction}
                  onChange={(e) => setTransitionNextAction(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">مهلت پیگیری</label>
                <input
                  type="text"
                  value={transitionDate}
                  onChange={(e) => setTransitionDate(e.target.value)}
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
                تایید انتقال مرحله
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Won Modal */}
      {showWonModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-3xl p-5 border border-slate-200 shadow-2xl text-right" dir="rtl">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black text-slate-900 mb-1">
              ثبت موفقیت معامله (Won)
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              معامله به ارزش {opportunity.potentialValueFormatted} نهایی شده است.
            </p>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">توضیحات نهایی‌سازی سفارش</label>
              <textarea
                rows={3}
                value={wonNotes}
                onChange={(e) => setWonNotes(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowWonModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-600 hover:bg-slate-50"
              >
                انصراف
              </button>
              <button
                type="button"
                onClick={handleConfirmWon}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700"
              >
                ثبت قطعی پیروزی معامله
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lost Modal */}
      {showLostModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-3xl p-5 border border-slate-200 shadow-2xl text-right" dir="rtl">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center mb-3">
              <AlertOctagon className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black text-slate-900 mb-1">
              ثبت عدم موفقیت معامله (Lost)
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              ثبت دقیق علت عدم خرید به بهینه‌سازی سیاست‌های بازاریابی و قیمت‌گذاری کمک می‌کند:
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">علت اصلی از دست رفتن</label>
                <select
                  value={lostReason}
                  onChange={(e) => setLostReason(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 font-bold focus:outline-none focus:border-rose-500"
                >
                  {LOST_REASONS.map(r => (
                    <option key={r.key} value={r.key}>{r.label}</option>
                  ))}
                </select>
              </div>

              {lostReason === 'competitor' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">نام برند رقیب برنده</label>
                  <input
                    type="text"
                    value={competitorName}
                    onChange={(e) => setCompetitorName(e.target.value)}
                    placeholder="مثال: سوپرپایپ / نیوپایپ / آذین"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-rose-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">توضیحات و یادداشت تکمیلی</label>
                <textarea
                  rows={2}
                  value={lostNotes}
                  onChange={(e) => setLostNotes(e.target.value)}
                  placeholder="علت دقیق‌تر تخفیف رقیب یا توقف پروژه..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowLostModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-600 hover:bg-slate-50"
              >
                انصراف
              </button>
              <button
                type="button"
                onClick={handleConfirmLost}
                className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700"
              >
                ثبت وضعیت Lost
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
