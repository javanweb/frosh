import React from 'react';
import { X, Sparkles, CheckCircle2, TrendingUp, Layers, ArrowRight, ShieldCheck, DollarSign, Target, Award, GitMerge } from 'lucide-react';

interface Phase3ShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Phase3ShowcaseModal: React.FC<Phase3ShowcaseModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-4xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden text-right flex flex-col max-h-[92vh]"
        dir="rtl"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 bg-gradient-to-r from-teal-50/70 via-slate-50 to-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-md shadow-teal-600/20 font-black">
              P3
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black text-slate-900">
                  معماری فاز ۳: پایپ‌لاین و جریان معاملات فروش (Sales Opportunity & Deal Flow)
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-teal-100 text-teal-800">
                  Production Ready
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                اتصال زنجیره Customer → Visit → Result به Sales Opportunity → Stages → Won/Lost
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1">
          {/* Design Board Image Banner */}
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-900 relative">
            <img
              src="/phase3_deal_board_1789941035181.jpg"
              alt="Phase 3 Deal Board"
              className="w-full max-h-[320px] object-cover object-top"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
              <div className="text-white">
                <span className="text-[10px] uppercase font-bold tracking-widest text-teal-400 block">KAVIR BASPAR SALES CRM — PHASE 3</span>
                <h3 className="text-sm sm:text-base font-black">طراحی پایپ‌لاین مدیریت معاملات و پرونده ۳۶۰ درجه فرصت‌های فروش</h3>
              </div>
            </div>
          </div>

          {/* Architectural Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200/80 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold">
                <GitMerge className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-black text-slate-900">One Customer → Many Opportunities</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                یک مشتری (مثلاً پروژه ۲۴ واحدی فرمانیه) می‌تواند همزمان چندین فرصت فروش مستقل (پارت ۱ لوله‌های ۵‌لایه، اتصالات برنجی، گرمایش از کف) با استیج‌ها و ارزش‌های مجزا داشته باشد.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-200/80 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-black text-slate-900">Capture Now → Complete Later</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                بازاریاب در حین ویزیت ظرف کمتر از ۵ ثانیه فرصت را با حداقل فیلدها ثبت می‌کند و سیستم به‌صورت خودکار با بررسی سوابق مشتری از ثبت تکراری جلوگیری می‌نماید.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold">
                <Target className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-black text-slate-900">Separation of Ownership</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                تفکیک کامل مسئول مشتری (Customer Owner) از مسئول فرصت فروش (Opportunity Owner)؛ انتقال فرصت‌ها بدون پاک‌شدن تاریخچه با حفظ تایم‌لاین رویدادها.
              </p>
            </div>
          </div>

          {/* Full Pipeline Flow Chart */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h4 className="text-xs font-black text-slate-900 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-teal-600" />
              <span>چرخه استاندارد ۶ مرحله‌ای پایپ‌لاین فروش کویر بسپار:</span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-xs">
              {[
                { step: '۱', name: 'Qualified', desc: 'احراز نیاز و پتانسیل' },
                { step: '۲', name: 'Interested', desc: 'علاقه‌مندی به خرید' },
                { step: '۳', name: 'Price Discuss', desc: 'ارسال پیش‌فاکتور' },
                { step: '۴', name: 'Decision', desc: 'تصمیم کارفرما' },
                { step: '۵', name: 'Negotiation', desc: 'مذاکره تخفیف و چک' },
                { step: '۶', name: 'Won / Lost', desc: 'نهایی‌سازی / تحلیل علت' }
              ].map(st => (
                <div key={st.step} className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  <span className="text-[10px] font-bold text-teal-700 block mb-0.5">گام {st.step}</span>
                  <span className="font-bold text-slate-800 text-[11px] block">{st.name}</span>
                  <span className="text-[9px] text-slate-400 mt-1 block">{st.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* User Management Note */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs space-y-1.5">
            <div className="font-black flex items-center gap-1.5 text-emerald-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>پشتیبانی احراز هویت با نام کاربری و رمز عبور مدیر (admin / admin)</span>
            </div>
            <p className="text-emerald-900/80 leading-relaxed text-[11px]">
              مدیر با نام کاربری <strong>admin</strong> و رمز عبور <strong>admin</strong> وارد شده و از طریق بخش «مدیریت بازاریاب‌ها» می‌تواند بازاریاب‌های جدید با نام کاربری و رمز عبور اختصاصی تعریف کند.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition cursor-pointer shadow-xs"
          >
            متوجه شدم و ورود به محیط نرم‌افزار
          </button>
        </div>
      </div>
    </div>
  );
};
