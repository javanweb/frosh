import React, { useState } from 'react';
import { 
  Sparkles, 
  Palette, 
  Layers, 
  Smartphone, 
  Monitor, 
  CheckCircle2, 
  ExternalLink, 
  Maximize2,
  ZoomIn
} from 'lucide-react';
import overviewImage from '../assets/images/kavir_crm_overview_1789938549136.jpg';

interface OverviewBoardViewProps {
  onOpenAndroidScreen: () => void;
  onOpenWindowsDashboard: () => void;
}

export const OverviewBoardView: React.FC<OverviewBoardViewProps> = ({
  onOpenAndroidScreen,
  onOpenWindowsDashboard,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-8">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-xs relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-teal-700 text-xs font-extrabold">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span>بورد جامع و زبان بصری مدرن روشن (Modern Light Design Language Showcase)</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900">
            KAVIR BASPAR SALES CRM — بورد جامع معماری UI/UX
          </h2>
          <p className="text-xs md:text-sm text-slate-600 max-w-2xl leading-relaxed">
            نمایش یکپارچه اسکلت محصول در دو محیط اپلیکیشن موبایل بازاریاب حضوری (Android) و داشبورد کنترل مدیریت فروش (Windows/Web) با تم مدرن و روشن.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenAndroidScreen}
            className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-teal-600/20 cursor-pointer transition"
          >
            <Smartphone className="w-4 h-4" />
            <span>تست زنده موبایل</span>
          </button>
          <button
            onClick={onOpenWindowsDashboard}
            className="px-4 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 hover:bg-slate-200 cursor-pointer transition"
          >
            <Monitor className="w-4 h-4 text-teal-600" />
            <span>تست زنده ویندوز</span>
          </button>
        </div>
      </div>

      {/* Hero Overview Board Image Display */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 md:p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between text-xs px-2">
          <span className="font-extrabold text-slate-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-teal-600" />
            <span>نمای بورد جامع گرافیکی (Showcase Board Presentation)</span>
          </span>
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="flex items-center gap-1 text-slate-500 hover:text-slate-900 transition font-bold cursor-pointer"
          >
            <ZoomIn className="w-3.5 h-3.5" />
            <span>{isZoomed ? 'کوچک‌نمایی' : 'بزرگ‌نمایی تصویر'}</span>
          </button>
        </div>

        <div 
          className={`rounded-2xl overflow-hidden border border-slate-200 relative bg-slate-100 transition-all ${
            isZoomed ? 'max-h-[1200px]' : 'max-h-[620px]'
          }`}
        >
          <img
            src={overviewImage}
            alt="Kavir Baspar Sales CRM Showcase Overview Board"
            className="w-full h-auto object-cover md:object-contain rounded-2xl"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs pt-2">
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-center">
            <span className="text-[11px] text-slate-500 block">اپلیکیشن اندروید بازاریاب</span>
            <span className="font-black text-teal-700 text-sm mt-0.5 block">۹ صفحه تعاملی</span>
            <span className="text-[10px] text-slate-400">طراحی تک‌دستی One-Handed</span>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-center">
            <span className="text-[11px] text-slate-500 block">داشبورد ویندوز مدیریت</span>
            <span className="font-black text-cyan-700 text-sm mt-0.5 block">۹ بخش عملیاتی</span>
            <span className="text-[10px] text-slate-400">Sales Command Center</span>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-center">
            <span className="text-[11px] text-slate-500 block">ورود یکپارچه (Unified)</span>
            <span className="font-black text-emerald-700 text-sm mt-0.5 block">RBAC هوشمند</span>
            <span className="text-[10px] text-slate-400">بدون تفکیک ظاهری در ورود</span>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-center">
            <span className="text-[11px] text-slate-500 block">زبان طراحی (Visual Style)</span>
            <span className="font-black text-amber-700 text-sm mt-0.5 block">Modern Clean Light</span>
            <span className="text-[10px] text-slate-400">سفید صدفی و سبز پلیمری</span>
          </div>
        </div>
      </div>

      {/* Visual Design Language & Design Tokens */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 space-y-5 shadow-xs">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-teal-600" />
          <h3 className="text-base font-black text-slate-900">اصول پالت رنگی و تایپوگرافی مدرن روشن (Design Tokens)</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Colors */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
            <span className="font-extrabold text-slate-900 block">پالت رنگی برند (Brand Palette):</span>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-lg bg-slate-50 border border-slate-300" />
                  <span className="text-[11px] text-slate-800 font-bold">پس‌زمینه روشن صدفی (Clean Canvas)</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">#F8FAFC</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-lg bg-[#0d9488]" />
                  <span className="text-[11px] text-slate-800 font-bold">سبز پلیمری زمردی (Polymer Teal)</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">#0D9488</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-lg bg-[#06b6d4]" />
                  <span className="text-[11px] text-slate-800 font-bold">آبی هیدرولیک (Hydraulic Cyan)</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">#06B6D4</span>
              </div>
            </div>
          </div>

          {/* Typography */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2.5">
            <span className="font-extrabold text-slate-900 block">تایپوگرافی فارسی (Typography):</span>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              استفاده از قلم مدرن <strong>Vazirmatn</strong> با وزن‌های دقیق (Regular, SemiBold, Black) جهت خوانایی حداکثری و کنتراست شفاف روی صفحات روشن زیر نور آفتاب.
            </p>
            <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-[11px] space-y-1">
              <span className="text-teal-700 font-bold block">اعداد فارسی و فونت‌مونوی متناسب:</span>
              <span className="text-slate-600 font-mono">۱۲,۴۵۰,۰۰۰ تومان • ۳۵.۶۸۹۲° N, ۵۱.۳۸۹۰° E</span>
            </div>
          </div>

          {/* UX Rules */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2.5">
            <span className="font-extrabold text-slate-900 block">قوانین ارگونومی و UX:</span>
            <ul className="space-y-1.5 text-[11px] text-slate-700">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span>طراحی تک‌دستی (Zone انگشت شست در پایین)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span>دکمه اکشن مرکزی شناور (FAB Visit)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span>کارت‌های مینیمال با سلسله‌مراتب بصری شدید</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
