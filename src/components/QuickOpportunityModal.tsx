import React, { useState, useEffect } from 'react';
import { X, Sparkles, AlertTriangle, CheckCircle2, DollarSign, Calendar, ArrowRight, Layers, Tag, UserCheck, ShieldAlert } from 'lucide-react';
import { Customer, Opportunity, SalesStage, OpportunityPriority, OpportunitySource } from '../types';
import { SALES_STAGES, getSmartNextAction } from '../data/salesStages';
import { checkDuplicateOpportunity } from '../data/mockOpportunities';

interface QuickOpportunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  customers: Customer[];
  existingOpportunities: Opportunity[];
  preSelectedCustomer?: Customer | null;
  onOpportunityCreated: (opportunity: Opportunity) => void;
  onOpenExistingOpportunity?: (opportunity: Opportunity) => void;
}

export const QuickOpportunityModal: React.FC<QuickOpportunityModalProps> = ({
  isOpen,
  onClose,
  customers,
  existingOpportunities,
  preSelectedCustomer,
  onOpportunityCreated,
  onOpenExistingOpportunity
}) => {
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>(preSelectedCustomer?.id || (customers[0]?.id || ''));
  const [name, setName] = useState('');
  const [stage, setStage] = useState<SalesStage>('interested');
  const [potentialValue, setPotentialValue] = useState<string>('350000000');
  const [priority, setPriority] = useState<OpportunityPriority>('normal');
  const [source, setSource] = useState<OpportunitySource>('visit');
  const [nextActionTitle, setNextActionTitle] = useState('');
  const [nextActionType, setNextActionType] = useState('ارسال قیمت');
  const [duplicateWarning, setDuplicateWarning] = useState<Opportunity | null>(null);

  useEffect(() => {
    if (preSelectedCustomer) {
      setSelectedCustomerId(preSelectedCustomer.id);
    } else if (customers.length > 0 && !selectedCustomerId) {
      setSelectedCustomerId(customers[0].id);
    }
  }, [preSelectedCustomer, customers]);

  // Update smart next action when stage changes
  useEffect(() => {
    const smart = getSmartNextAction(stage);
    setNextActionTitle(smart.title);
    setNextActionType(smart.type);
  }, [stage]);

  // Check duplicate opportunity
  useEffect(() => {
    if (selectedCustomerId && name.trim().length > 2) {
      const dup = checkDuplicateOpportunity(selectedCustomerId, name, existingOpportunities);
      setDuplicateWarning(dup);
    } else {
      setDuplicateWarning(null);
    }
  }, [selectedCustomerId, name, existingOpportunities]);

  if (!isOpen) return null;

  const currentCustomer = customers.find(c => c.id === selectedCustomerId) || customers[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const numValue = parseInt(potentialValue.replace(/\D/g, ''), 10) || 0;
    const formattedVal = numValue > 0 
      ? `${(numValue / 1000000).toLocaleString('fa-IR')} میلیون تومان` 
      : 'توافقی';

    const newOpp: Opportunity = {
      id: `opp-${Date.now()}`,
      name: name.trim(),
      customerId: currentCustomer.id,
      customerName: currentCustomer.name,
      customerType: currentCustomer.type,
      owner: currentCustomer.assignedSalesperson || 'علی رضایی',
      ownerHistory: [
        { date: 'امروز', previousOwner: 'سیستم مرکزی', newOwner: currentCustomer.assignedSalesperson || 'علی رضایی' }
      ],
      stage,
      status: 'active',
      potentialValue: numValue,
      potentialValueFormatted: formattedVal,
      expectedCloseDate: '۱۴۰۳/۰۷/۲۰',
      priority,
      source,
      sourceLabel: source === 'visit' ? 'مراجعه میدانی' : source === 'call' ? 'تماس تلفنی' : 'مشتری موجود',
      nextAction: {
        type: nextActionType,
        title: nextActionTitle || 'پیگیری بعدی',
        dueDate: 'فردا ۱۰:۰۰',
        assignedTo: currentCustomer.assignedSalesperson || 'علی رضایی',
        isOverdue: false
      },
      lastActivity: 'ثبت سریع فرصت فروش — هم‌اکنون',
      timeline: [
        {
          id: `opt-ev-${Date.now()}`,
          date: 'هم‌اکنون',
          time: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
          type: 'created',
          title: 'ایجاد فرصت فروش (ثبت سریع)',
          description: `فرصت فروش "${name}" با ارزش برآوردی ${formattedVal} در مرحله ${stage} ایجاد شد.`,
          actor: currentCustomer.assignedSalesperson || 'علی رضایی',
          badge: 'ثبت سریع'
        }
      ]
    };

    onOpportunityCreated(newOpp);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden text-right flex flex-col max-h-[92vh]"
        dir="rtl"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-teal-50/70 via-slate-50 to-white">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-md shadow-teal-600/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">ثبت سریع فرصت فروش</h3>
              <p className="text-[11px] text-slate-500">Capture Now → Complete Later (حداقل فیلدها)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Duplicate Opportunity Warning Banner */}
        {duplicateWarning && (
          <div className="m-4 mb-0 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex flex-col gap-2">
            <div className="flex items-center gap-2 font-bold text-amber-800">
              <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
              <span>فرصت فروش فعال مشابه برای این مشتری یافت شد:</span>
            </div>
            <div className="pr-6 text-[11px] text-amber-800/90 leading-relaxed">
              «{duplicateWarning.name}» در مرحله <span className="font-bold text-amber-900">{duplicateWarning.stage}</span> با ارزش {duplicateWarning.potentialValueFormatted}.
            </div>
            <div className="pr-6 flex items-center gap-2 pt-1">
              {onOpenExistingOpportunity && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenExistingOpportunity(duplicateWarning);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold shadow-xs transition cursor-pointer"
                >
                  مشاهده و به‌روزرسانی فرصت موجود
                </button>
              )}
              <span className="text-[10px] text-amber-700">یا نام متمایزی برای این پارت سفارش وارد نمایید.</span>
            </div>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4 flex-1">
          {/* Customer Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">مشتری مربوطه</label>
            <select
              value={selectedCustomerId}
              onChange={(e) => setSelectedCustomerId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-teal-500 focus:bg-white transition"
            >
              {customers.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.type}) — {c.assignedSalesperson || 'بدون مسئول'}
                </option>
              ))}
            </select>
          </div>

          {/* Opportunity Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              عنوان فرصت فروش <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="مثال: خرید لوله ۵‌لایه پروژه‌ای / سفارش اتصالات برنجی"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white transition"
            />
          </div>

          {/* Quick presets for pipe/fitting orders */}
          <div className="flex flex-wrap gap-1.5">
            {[
              'خرید پارت پاییزه لوله ۵‌لایه',
              'سفارش اتصالات پرسی و کوپلی',
              'تامین لوله پلی‌اتیلن پروژه‌ای',
              'تجهیز گرمایش از کف و کلکتور'
            ].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setName(preset)}
                className="text-[10px] px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-200 border border-slate-200 text-slate-600 transition"
              >
                + {preset}
              </button>
            ))}
          </div>

          {/* Stage & Priority */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">مرحله فروش اولیه</label>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value as SalesStage)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-teal-500 focus:bg-white transition"
              >
                {SALES_STAGES.filter(s => s.key !== 'won' && s.key !== 'lost').map(s => (
                  <option key={s.key} value={s.key}>
                    {s.step}. {s.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">اولویت</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as OpportunityPriority)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-teal-500 focus:bg-white transition"
              >
                <option value="high">بالا (پروژه فوری)</option>
                <option value="normal">عادی</option>
                <option value="low">پایین</option>
              </select>
            </div>
          </div>

          {/* Estimated Value */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              ارزش تخمینی اولیه (تومان)
            </label>
            <div className="relative">
              <input
                type="number"
                step="10000000"
                value={potentialValue}
                onChange={(e) => setPotentialValue(e.target.value)}
                placeholder="۳۵۰,۰۰۰,۰۰۰"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 pr-9 text-xs text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white transition font-mono"
              />
              <DollarSign className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
            </div>
          </div>

          {/* Contextual Smart Next Action */}
          <div className="p-3 rounded-2xl bg-teal-50/60 border border-teal-200/80">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold text-teal-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                اقدام بعدی پیشنهادی خودکار (Next Action)
              </span>
              <span className="text-[10px] text-teal-700 font-medium">فردا ۱۰:۰۰</span>
            </div>
            <input
              type="text"
              value={nextActionTitle}
              onChange={(e) => setNextActionTitle(e.target.value)}
              className="w-full bg-white border border-teal-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-teal-500 transition"
              placeholder="شرح اقدام بعدی..."
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-600 hover:bg-slate-50 transition"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-md shadow-teal-600/20 active:scale-98 transition flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>ثبت و شروع پیگیری</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
