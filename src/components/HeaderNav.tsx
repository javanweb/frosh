import React from 'react';
import { Smartphone, Monitor, GitFork, LayoutGrid, LogOut, Shield, UserCheck, Sparkles } from 'lucide-react';
import { ViewExperience, UserRole } from '../types';

interface HeaderNavProps {
  currentView: ViewExperience;
  onViewChange: (view: ViewExperience) => void;
  currentUserRole: UserRole;
  onRoleSwitch: (role: UserRole) => void;
  onLogout: () => void;
  isLoggedIn: boolean;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentView,
  onViewChange,
  currentUserRole,
  onRoleSwitch,
  onLogout,
  isLoggedIn
}) => {
  return (
    <header className="bg-white/95 border-b border-slate-200 sticky top-0 z-50 backdrop-blur-md px-4 py-2.5 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand & Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-md shadow-teal-500/20 text-white font-black text-lg tracking-tighter">
            KB
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm md:text-base tracking-tight text-slate-900">
                کویر بسپار
              </span>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200 font-bold">
                سیستم جامع فروش • فاز ۱
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">معماری و ساختار تعاملی UI/UX بازاریابی حضوری (Light Mode)</p>
          </div>
        </div>

        {/* View Mode Switcher (Modern Light Segmented Control) */}
        <div className="flex items-center bg-slate-100/90 p-1 rounded-2xl border border-slate-200/80 text-xs font-semibold shadow-inner">
          <button
            onClick={() => onViewChange('android')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              currentView === 'android'
                ? 'bg-white text-teal-700 font-bold shadow-sm border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Smartphone className={`w-4 h-4 ${currentView === 'android' ? 'text-teal-600' : 'text-slate-500'}`} />
            <span>اپلیکیشن اندروید (بازاریاب)</span>
          </button>

          <button
            onClick={() => onViewChange('windows')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              currentView === 'windows'
                ? 'bg-white text-teal-700 font-bold shadow-sm border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Monitor className={`w-4 h-4 ${currentView === 'windows' ? 'text-teal-600' : 'text-slate-500'}`} />
            <span>داشبورد ویندوز / وب (مدیریت)</span>
          </button>

          <button
            onClick={() => onViewChange('master_flow')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              currentView === 'master_flow'
                ? 'bg-white text-teal-700 font-bold shadow-sm border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <GitFork className={`w-4 h-4 ${currentView === 'master_flow' ? 'text-teal-600' : 'text-slate-500'}`} />
            <span>معماری و ارتباط صفحات</span>
          </button>

          <button
            onClick={() => onViewChange('overview_board')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              currentView === 'overview_board'
                ? 'bg-white text-teal-700 font-bold shadow-sm border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <LayoutGrid className={`w-4 h-4 ${currentView === 'overview_board' ? 'text-teal-600' : 'text-slate-500'}`} />
            <span>بورد جامع طراحی</span>
          </button>
        </div>

        {/* User Role Quick Switch & Actions */}
        {isLoggedIn && (
          <div className="flex items-center gap-2">
            <div className="hidden lg:flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1 rounded-xl text-xs">
              <span className="text-slate-500 font-medium">نقش شبیه‌سازی:</span>
              <button
                onClick={() => onRoleSwitch(currentUserRole === 'salesperson' ? 'manager' : 'salesperson')}
                className="flex items-center gap-1 text-slate-800 hover:text-teal-700 font-bold transition cursor-pointer"
                title="کلیک کنید برای تغییر سریع نقش و مشاهده سناریوی مربوطه"
              >
                {currentUserRole === 'salesperson' ? (
                  <span className="flex items-center gap-1.5 bg-teal-100 text-teal-800 px-2 py-0.5 rounded-lg border border-teal-200">
                    <UserCheck className="w-3.5 h-3.5 text-teal-600" />
                    <span>علی رضایی (بازاریاب)</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 bg-amber-100 text-amber-900 px-2 py-0.5 rounded-lg border border-amber-200">
                    <Shield className="w-3.5 h-3.5 text-amber-700" />
                    <span>مهندس یوسفی (مدیر فروش)</span>
                  </span>
                )}
              </button>
            </div>

            <button
              onClick={onLogout}
              className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-rose-200"
              title="خروج از حساب کاربری و مشاهده فرم لاگین متمرکز"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
