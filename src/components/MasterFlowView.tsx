import React, { useState } from 'react';
import { 
  GitFork, 
  ArrowLeft, 
  CheckCircle2, 
  Layers, 
  Smartphone, 
  Monitor, 
  Database, 
  Compass, 
  Share2, 
  Workflow, 
  ChevronRight,
  ShieldCheck,
  Zap,
  Sparkles
} from 'lucide-react';
import { MASTER_PAGE_CONNECTIONS } from '../data/mockData';

export const MasterFlowView: React.FC = () => {
  const [selectedConnection, setSelectedConnection] = useState(MASTER_PAGE_CONNECTIONS[0]);
  const [flowPerspective, setFlowPerspective] = useState<'salesperson' | 'manager' | 'unified'>('unified');

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-8">
      {/* Top Section: Concept & Architectural Philosophy */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-xs relative overflow-hidden">
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2 text-teal-700 text-xs font-extrabold">
            <Workflow className="w-4 h-4 text-teal-600" />
            <span>معماری یکپارچه فاز ۱ — CORE UI/UX STRUCTURE</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900">
            جریان جامع کاربری و شبکه اتصال صفحات (Master User Flow)
          </h2>
          <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
            در این سیستم هیچ صفحه‌ای یک جزیره مجزا نیست. تمام اکشن‌های بازاریاب در کف میدان (ویزیت، عکس، موقعیت مکانی و نتیجه مذاکره) مستقیماً داشبورد و شاخص‌های مدیر فروش را در لحظه تحت تأثیر قرار می‌دهند.
          </p>
        </div>

        {/* Perspective Switcher */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-500 pl-2 font-bold">مشاهده مسیر کاربری:</span>
          {[
            { id: 'unified', label: 'جریان کلان مشترک (Unified Architecture)' },
            { id: 'salesperson', label: 'جریان کاری بازاریاب (Android Flow)' },
            { id: 'manager', label: 'جریان نظارتی مدیر (Windows Flow)' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setFlowPerspective(item.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                flowPerspective === item.id
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20'
                  : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Visual Flow Diagram */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-teal-600" />
            <span>دیاگرام جریان داده و رفتار متقابل سیستم</span>
          </h3>
          <span className="text-xs text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200 font-bold">
            قانون طلایی: No Page is an Island
          </span>
        </div>

        {/* Salesperson Flow Cards Chain */}
        <div className="space-y-4">
          <span className="text-xs font-extrabold text-teal-800 block">
            ۱. زنجیره چرخه بازاریابی حضوری (Salesperson Loop):
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
            {[
              { step: '۱', title: 'ورود مشترک', desc: 'تشخیص نقش بازاریاب' },
              { step: '۲', title: 'Home روزانه', desc: 'مشاهده مسیر و مشتریان نزدیک' },
              { step: '۳', title: 'پروفایل مشتری', desc: 'شناخت برندها و پتانسیل خرید' },
              { step: '۴', title: 'ثبت ویزیت', desc: 'تایید عکس، GPS و نتیجه' },
              { step: '۵', title: 'تسک خودکار', desc: 'ایجاد زنجیره پیگیری معوق' },
              { step: '۶', title: 'داشبورد مدیر', desc: 'انعکاس لحظه‌ای در KPIها' },
            ].map((node, i) => (
              <div
                key={i}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-1 relative hover:border-teal-300 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="w-5 h-5 rounded-full bg-teal-600 text-white font-black text-[11px] flex items-center justify-center">
                    {node.step}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold">Node 0{i + 1}</span>
                </div>
                <h4 className="text-xs font-extrabold text-slate-900 pt-1">{node.title}</h4>
                <p className="text-[10px] text-slate-500 leading-normal">{node.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Manager Flow Cards Chain */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <span className="text-xs font-extrabold text-cyan-800 block">
            ۲. زنجیره نظارت و فرماندهی مدیر فروش (Manager Loop):
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
            {[
              { step: '۱', title: 'داشبورد کنترل', desc: 'پایش ۴ شاخص کلیدی و پیگیری‌ها' },
              { step: '۲', title: 'نقشه جغرافیایی', desc: 'دید ۳۶۰ درجه نقاط پوشش ویزیت' },
              { step: '۳', title: 'ارزیابی بازاریاب', desc: 'مقایسه عملکرد تیم در تحقق هدف' },
              { step: '۴', title: 'مشتریان ۳۶۰', desc: 'بررسی پروژه‌ها و نیازهای بازار' },
              { step: '۵', title: 'تخصیص ماموریت', desc: 'تعیین تسک جدید برای بازاریاب' },
              { step: '۶', title: 'نوتیفیکیشن موبایل', desc: 'دریافت آنی تسک روی گوشی بازاریاب' },
            ].map((node, i) => (
              <div
                key={i}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-1 hover:border-cyan-300 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="w-5 h-5 rounded-full bg-cyan-600 text-white font-black text-[11px] flex items-center justify-center">
                    {node.step}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold">Command 0{i + 1}</span>
                </div>
                <h4 className="text-xs font-extrabold text-slate-900 pt-1">{node.title}</h4>
                <p className="text-[10px] text-slate-500 leading-normal">{node.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5-Question Connection Matrix Inspector (Rule #23) */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-xs">
        <div>
          <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>ماتریس بازرسی ۵ گانه صفحات (Screen Interconnection Inspector)</span>
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            یک صفحه را انتخاب کنید تا پاسخ دقیق ۵ پرسش اساسی معماری را برای آن مشاهده نمایید:
          </p>
        </div>

        {/* Screen Selection Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {MASTER_PAGE_CONNECTIONS.map((c) => (
            <button
              key={c.screenId}
              onClick={() => setSelectedConnection(c)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedConnection.screenId === c.screenId
                  ? 'bg-teal-600 text-white font-bold shadow-xs'
                  : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200'
              }`}
            >
              {c.screenTitle}
            </button>
          ))}
        </div>

        {/* Detailed 5-Point Box */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 text-xs">
          {/* 1. Origin */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2 shadow-2xs">
            <span className="text-teal-700 font-extrabold block">۱. از کجا وارد شده؟ (Entry Points)</span>
            <ul className="space-y-1 text-slate-700">
              {selectedConnection.entryPoints.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5 text-[11px]">
                  <span className="text-teal-600 mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 2. Accessible Data */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2 shadow-2xs">
            <span className="text-cyan-700 font-extrabold block">۲. به چه داده‌هایی دسترسی دارد؟</span>
            <ul className="space-y-1 text-slate-700">
              {selectedConnection.accessibleData.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5 text-[11px]">
                  <span className="text-cyan-600 mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Actions */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2 shadow-2xs">
            <span className="text-amber-700 font-extrabold block">۳. چه اکشن‌هایی انجام می‌شود؟</span>
            <ul className="space-y-1 text-slate-700">
              {selectedConnection.mainActions.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5 text-[11px]">
                  <span className="text-amber-600 mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Destination After Action */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2 shadow-2xs">
            <span className="text-emerald-700 font-extrabold block">۴. بعد از اکشن کاربر به کجا می‌رود؟</span>
            <ul className="space-y-1 text-slate-700">
              {selectedConnection.destinationAfterAction.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5 text-[11px]">
                  <span className="text-emerald-600 mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 5. System Impact */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2 shadow-2xs">
            <span className="text-purple-700 font-extrabold block">۵. چه بخشی تحت تأثیر قرار می‌گیرد؟</span>
            <ul className="space-y-1 text-slate-700">
              {selectedConnection.systemImpact.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5 text-[11px]">
                  <span className="text-purple-600 mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Expansion Points for Phase 2 */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-teal-600" />
          <h3 className="text-sm font-black text-slate-900">نقاط توسعه عمیق در فاز ۲ (Expansion Points Roadmap)</h3>
        </div>
        <p className="text-xs text-slate-500">
          طبق توافق فاز ۱، این ساختار اولیه به صورت مدولار پیاده شده تا در فاز ۲ ماژول‌های زیر با عمق کامل فرم‌ها و عملیات پیاده‌سازی گردند:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
            <span className="text-teal-800 font-extrabold block">ماژول Customer 360:</span>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              توسعه فرم‌های چندمرحله‌ای احراز اصناف، تعریف پروژه‌های ساختمانی، ثبت ناظران و کارفرمایان، تایم‌لاین خریدهای گذشته و لیست قیمت شخصی‌سازی شده.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
            <span className="text-cyan-800 font-extrabold block">ماژول Visit & Geofencing:</span>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              محاسبه اتوماتیک حضور در محدوده فروشگاه (Geofence)، ضبط صوت مذاکره، بارکد اسکنر محصولات لوله و اتصالات و صدور پیش‌فاکتور آنی در محل ویزیت.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
            <span className="text-amber-800 font-extrabold block">ماژول Follow-up Automation:</span>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              قوانین خودکار یادآوری پیگیری‌ها به بازاریاب از طریق نوتیفیکیشن فشاری، همگام‌سازی پیامکی با مشتری، و گزارش تحلیلی لیدهای سوخته به مدیر فروش.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
