import React from 'react';
import { X, Sparkles, Smartphone, Monitor, Layers, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface Phase2ShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Phase2ShowcaseModal: React.FC<Phase2ShowcaseModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-black">برد طراحی فاز ۲ — Customer Experience & Visit Flow</h3>
              <p className="text-[11px] text-slate-300">
                Premium Product Design Case Study Board • KAVIR BASPAR SALES CRM
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 overflow-y-auto">
          {/* Main Case Study Image Display */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-950">
            <img
              src="/src/assets/images/phase2_customer_visit_board_1789940100346.jpg"
              alt="Phase 2 Product Design Case Study Board"
              className="w-full h-auto object-cover max-h-[58vh]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-white text-[10px] font-bold">
              معماری یکپارچه Android & Windows • زنجیره Customer → Visit → Follow-up
            </div>
          </div>

          {/* Architectural Key Takeaways */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-100 space-y-1">
              <div className="flex items-center gap-2 text-teal-900 font-extrabold">
                <Smartphone className="w-4 h-4 text-teal-600" />
                <span>اندروید میدانی بازاریاب</span>
              </div>
              <p className="text-[11px] text-teal-950 leading-relaxed">
                مبتنی بر مدل «Capture Now → Complete Later»، ثبت سریع زیر ۲۰ ثانیه، پیش‌نمایش کانتکست پیش از جلسه و هدایت گام‌به‌گام ویزیت.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-100 space-y-1">
              <div className="flex items-center gap-2 text-indigo-900 font-extrabold">
                <Monitor className="w-4 h-4 text-indigo-600" />
                <span>ویندوز مدیریتی دسکتاپ</span>
              </div>
              <p className="text-[11px] text-indigo-950 leading-relaxed">
                معماری ۳ منطقه‌ای (3-Zone Layout): نمای ۳۶۰ درجه مشتری، استریم تایم‌لاین زنده و پنل کنترل تسک‌ها و سلامت حساب.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-1">
              <div className="flex items-center gap-2 text-emerald-900 font-extrabold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>زنجیره پیوسته عملیاتی</span>
              </div>
              <p className="text-[11px] text-emerald-950 leading-relaxed">
                Customer → Visit → Result (Trigger) → Next Action → Follow-up → Task → Completion → Customer Timeline.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-extrabold transition cursor-pointer"
          >
            بستن و بازگشت به نرم‌افزار
          </button>
        </div>
      </div>
    </div>
  );
};
