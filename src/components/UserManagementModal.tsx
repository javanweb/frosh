import React, { useState } from 'react';
import { 
  X, UserPlus, Shield, User, Lock, Phone, MapPin, 
  CheckCircle2, Key, Trash2, Eye, EyeOff, Sparkles, UserCheck, AlertCircle 
} from 'lucide-react';
import { UserAccount, Salesperson } from '../types';
import { getStoredUserAccounts, saveUserAccount } from '../data/userAccounts';

interface UserManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSalespersonCreated: (newAccount: UserAccount, newSalesperson: Salesperson) => void;
}

export const UserManagementModal: React.FC<UserManagementModalProps> = ({
  isOpen,
  onClose,
  onSalespersonCreated
}) => {
  const [accounts, setAccounts] = useState<UserAccount[]>(getStoredUserAccounts());
  const [showAddForm, setShowAddForm] = useState(false);
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});

  // New salesperson form state
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [zone, setZone] = useState('منطقه غرب تهران');
  const [targetAmount, setTargetAmount] = useState('۱.۲ میلیارد تومان');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const togglePasswordVisibility = (id: string) => {
    setShowPasswords(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const cleanUsername = username.trim().toLowerCase();
    if (!fullName.trim() || !cleanUsername || !password.trim()) {
      setErrorMsg('لطفاً تمامی فیلدهای الزامی را تکمیل کنید.');
      return;
    }

    // Check duplicate username
    if (accounts.some(a => a.username.toLowerCase() === cleanUsername)) {
      setErrorMsg('این نام کاربری قبلاً در سامانه ثبت شده است. نام کاربری دیگری انتخاب فرمایید.');
      return;
    }

    const spId = `sp-${Date.now()}`;
    const newAccount: UserAccount = {
      id: `user-${Date.now()}`,
      username: cleanUsername,
      password: password.trim(),
      role: 'salesperson',
      fullName: fullName.trim(),
      zone: zone.trim() || 'منطقه جدید',
      phone: phone.trim() || '۰۹۱۲۰۰۰۰۰۰۰',
      salespersonId: spId,
      targetAmount: targetAmount.trim() || '۱.۰ میلیارد تومان',
      createdAt: 'امروز'
    };

    const newSalesperson: Salesperson = {
      id: spId,
      name: fullName.trim(),
      username: cleanUsername,
      roleTitle: 'کارشناس بازاریابی میدانی',
      zone: zone.trim() || 'منطقه جدید',
      phone: phone.trim() || '۰۹۱۲۰۰۰۰۰۰۰',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      status: 'آنلاین',
      todayVisits: 0,
      todayFollowups: 0,
      assignedCustomersCount: 0,
      pendingTasksCount: 0,
      monthlyAchievementPercent: 0,
      targetAmount: targetAmount.trim() || '۱.۰ میلیارد تومان'
    };

    const updated = saveUserAccount(newAccount);
    setAccounts(updated);
    onSalespersonCreated(newAccount, newSalesperson);

    setSuccessMsg(`حساب کاربری بازاریاب "${fullName.trim()}" با نام کاربری "${cleanUsername}" ایجاد شد.`);
    setFullName('');
    setUsername('');
    setPassword('');
    setPhone('');
    setShowAddForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-3xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden text-right flex flex-col max-h-[90vh]"
        dir="rtl"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20 font-black">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900">
                مدیریت کاربران و حساب‌های بازاریابان
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                تعریف بازاریاب جدید، تخصیص نام کاربری، رمز عبور و محدوده فعالیت
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!showAddForm && (
              <button
                type="button"
                onClick={() => setShowAddForm(true)}
                className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs transition flex items-center gap-1.5 cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>تعریف بازاریاب جدید</span>
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

        {/* Notifications */}
        {successMsg && (
          <div className="m-5 mb-0 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}
        {errorMsg && (
          <div className="m-5 mb-0 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="p-5 overflow-y-auto space-y-5 flex-1">
          {/* Add Salesperson Form Box */}
          {showAddForm && (
            <form onSubmit={handleCreateUser} className="p-5 rounded-3xl bg-teal-50/60 border border-teal-200/80 space-y-4 animate-in slide-in-from-top duration-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black text-teal-900 flex items-center gap-1.5">
                  <UserPlus className="w-4 h-4 text-teal-600" />
                  <span>فرم تعریف بازاریاب جدید با نام کاربری و رمز عبور اختصاصی</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="text-xs text-slate-500 hover:text-slate-800"
                >
                  بستن فرم
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    نام و نام خانوادگی بازاریاب <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="مثال: حامد کاظمی"
                    className="w-full bg-white border border-teal-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    نام کاربری (جهت ورود به سیستم) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="مثال: kazemi"
                    dir="ltr"
                    className="w-full bg-white border border-teal-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-teal-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    رمز عبور <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="مثال: 1234 یا kavir1403"
                    dir="ltr"
                    className="w-full bg-white border border-teal-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-teal-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">شماره تماس همراه</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="۰۹۱۲..."
                    dir="ltr"
                    className="w-full bg-white border border-teal-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-teal-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">منطقه تحت پوشش</label>
                  <input
                    type="text"
                    value={zone}
                    onChange={(e) => setZone(e.target.value)}
                    placeholder="مثال: منطقه ۶ و ۷ تهران"
                    className="w-full bg-white border border-teal-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">تارگت فروش ماهانه</label>
                  <input
                    type="text"
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(e.target.value)}
                    placeholder="۱.۵ میلیارد تومان"
                    className="w-full bg-white border border-teal-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-teal-200/60">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-xs text-slate-600 hover:bg-white"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs transition cursor-pointer"
                >
                  ثبت بازاریاب و ایجاد حساب کاربری
                </button>
              </div>
            </form>
          )}

          {/* User Accounts List */}
          <div className="space-y-3">
            <h3 className="text-xs font-black text-slate-900 flex items-center justify-between">
              <span>لیست حساب‌های کاربری فعال سامانه ({accounts.length} کاربر)</span>
              <span className="text-[10px] text-slate-400 font-normal">
                پشتیبانی از تفکیک نقش‌ها بر اساس معماری RBAC
              </span>
            </h3>

            <div className="grid grid-cols-1 gap-2.5">
              {accounts.map(acc => {
                const isPasswordVisible = !!showPasswords[acc.id];

                return (
                  <div 
                    key={acc.id}
                    className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-right"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                        acc.role === 'manager'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-teal-100 text-teal-800'
                      }`}>
                        {acc.role === 'manager' ? <Shield className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-black text-slate-900">{acc.fullName}</h4>
                          <span className={`text-[10px] px-2 py-0.2 rounded-full font-bold border ${
                            acc.role === 'manager'
                              ? 'bg-amber-50 text-amber-800 border-amber-200'
                              : 'bg-teal-50 text-teal-800 border-teal-200'
                          }`}>
                            {acc.role === 'manager' ? 'مدیر ارشد' : 'بازاریاب میدانی'}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-0.5">
                          <span>منطقه: {acc.zone}</span>
                          <span>•</span>
                          <span>تماس: {acc.phone}</span>
                        </div>
                      </div>
                    </div>

                    {/* Credentials Preview */}
                    <div className="flex items-center gap-2 bg-slate-50 p-2 px-3 rounded-xl border border-slate-100 self-start sm:self-auto">
                      <div className="text-[11px] font-mono text-slate-600 flex items-center gap-1.5">
                        <span className="text-slate-400 font-sans text-[10px]">نام کاربری:</span>
                        <strong className="text-slate-800">{acc.username}</strong>
                      </div>

                      <span className="text-slate-300">|</span>

                      <div className="text-[11px] font-mono text-slate-600 flex items-center gap-1.5">
                        <span className="text-slate-400 font-sans text-[10px]">رمز:</span>
                        <strong className="text-slate-800">
                          {isPasswordVisible ? acc.password : '••••••••'}
                        </strong>
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility(acc.id)}
                          className="text-slate-400 hover:text-slate-600 transition ml-1"
                        >
                          {isPasswordVisible ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
