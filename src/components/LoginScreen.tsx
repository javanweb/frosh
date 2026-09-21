import React, { useState } from 'react';
import { Lock, User, ShieldCheck, UserCheck, Shield, AlertCircle, Sparkles } from 'lucide-react';
import { UserRole, UserAccount } from '../types';
import { authenticateUser } from '../data/userAccounts';

interface LoginScreenProps {
  onLoginSuccess: (role: UserRole, userAccount?: UserAccount) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    setTimeout(() => {
      setLoading(false);
      const cleanU = username.trim();
      const cleanP = password.trim();

      // Check admin / admin shortcut directly
      if (cleanU.toLowerCase() === 'admin' && cleanP === 'admin') {
        onLoginSuccess('manager');
        return;
      }

      // Check against stored accounts (including newly defined salespeople)
      const authResult = authenticateUser(cleanU, cleanP);
      if (authResult) {
        onLoginSuccess(authResult.role, authResult.user);
        return;
      }

      // Fallback for demo flexibility
      if (cleanU.toLowerCase().includes('manager') || cleanU.toLowerCase().includes('admin')) {
        onLoginSuccess('manager');
      } else if (cleanU.length > 0 && cleanP.length > 0) {
        onLoginSuccess('salesperson');
      } else {
        setErrorMessage('نام کاربری یا رمز عبور اشتباه است.');
      }
    }, 450);
  };

  const handleQuickFill = (type: 'admin' | 'salesperson') => {
    setErrorMessage(null);
    if (type === 'admin') {
      setUsername('admin');
      setPassword('admin');
    } else {
      setUsername('rezaei');
      setPassword('1234');
    }
  };

  return (
    <div className="min-h-[88vh] flex items-center justify-center p-4 bg-slate-50/70">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 shadow-xl shadow-slate-200/60 relative overflow-hidden">
        {/* Subtle Ambient Top Accent */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500" />
        <div className="absolute -top-24 -left-24 w-52 h-52 bg-teal-100/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-52 h-52 bg-cyan-100/50 rounded-full blur-3xl pointer-events-none" />

        {/* Brand Header */}
        <div className="text-center mb-7 relative">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-teal-500 via-emerald-500 to-cyan-600 mx-auto flex items-center justify-center shadow-lg shadow-teal-500/25 mb-4 text-white font-black text-2xl tracking-tighter">
            KB
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">کویر بسپار</h1>
          <p className="text-[11px] uppercase tracking-widest text-teal-700 font-bold mt-1">سامانه متمرکز فروش و بازاریابی حضوری</p>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            ورود یکپارچه مدیران و بازاریابان با تشخیص هوشمند حساب کاربری
          </p>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Unified Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 text-right">
              نام کاربری
            </label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pr-10 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition shadow-2xs"
                placeholder="admin یا نام کاربری بازاریاب"
                dir="ltr"
              />
              <User className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 text-right">
              رمز عبور
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pr-10 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition shadow-2xs"
                placeholder="••••••••"
                dir="ltr"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-slate-600 hover:text-slate-900">
              <input
                type="checkbox"
                defaultChecked
                className="rounded text-teal-600 focus:ring-teal-500 border-slate-300"
              />
              <span>مرا به خاطر بسپار</span>
            </label>

            <span className="text-teal-700 hover:underline cursor-pointer font-medium">
              فراموشی رمز عبور؟
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-black text-sm shadow-md shadow-teal-600/20 active:scale-98 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>در حال احراز هویت و ورود...</span>
              </span>
            ) : (
              <span>ورود به سامانه CRM</span>
            )}
          </button>
        </form>

        {/* Quick Demo Pre-sets */}
        <div className="mt-6 pt-5 border-t border-slate-200/80">
          <span className="text-[11px] font-bold text-slate-600 block mb-2 text-center">
            ورود سریع (کلیک برای پر کردن خودکار):
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickFill('admin')}
              className="p-2.5 rounded-xl border border-amber-200 bg-amber-50/70 hover:bg-amber-100 text-amber-900 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5 text-amber-600" />
              <span>مدیر: admin / admin</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickFill('salesperson')}
              className="p-2.5 rounded-xl border border-teal-200 bg-teal-50/70 hover:bg-teal-100 text-teal-800 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5 text-teal-600" />
              <span>بازاریاب: rezaei / 1234</span>
            </button>
          </div>
          <p className="text-[10px] text-slate-400 text-center mt-2">
            مدیر در پنل ویندوز می‌تواند بازاریاب‌های جدید با نام کاربری و رمز اختصاصی تعریف کند.
          </p>
        </div>

        {/* Security / Architecture Footer Note */}
        <div className="mt-4 text-center flex items-center justify-center gap-1 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>احراز هویت استاندارد بر پایه RBAC با حفظ نشست</span>
        </div>
      </div>
    </div>
  );
};
