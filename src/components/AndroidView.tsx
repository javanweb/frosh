import React, { useState } from 'react';
import { 
  Home, 
  Users, 
  PlusCircle, 
  CalendarCheck, 
  User, 
  Search, 
  Filter, 
  Bell, 
  ChevronRight, 
  MapPin, 
  Phone, 
  Camera, 
  Navigation, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  ArrowLeft, 
  FileText, 
  Briefcase, 
  Shield, 
  Sparkles,
  Layers,
  ChevronLeft,
  Share2,
  ExternalLink,
  ChevronDown,
  CheckCircle2,
  Compass,
  Mic,
  RotateCw,
  Send,
  Zap,
  TrendingUp,
  Map as MapIcon,
  Play,
  CheckSquare,
  Plus,
  UserCheck,
  Building2,
  Check,
  Target
} from 'lucide-react';
import { AndroidScreen, Customer, FollowUpItem, TaskItem, TimelineEvent, Opportunity, Salesperson } from '../types';
import { INITIAL_CUSTOMERS, INITIAL_FOLLOWUPS, INITIAL_NOTIFICATIONS, INITIAL_TASKS, SALESPEOPLE_LIST } from '../data/mockData';
import { INITIAL_OPPORTUNITIES } from '../data/mockOpportunities';
import { SALES_STAGE_CONFIG } from '../data/salesStages';
import { QuickAddCustomerModal } from './QuickAddCustomerModal';
import { GuidedVisitFlow } from './GuidedVisitFlow';
import { CustomerTimelineView } from './CustomerTimelineView';
import { QuickOpportunityModal } from './QuickOpportunityModal';
import { Opportunity360Modal } from './Opportunity360Modal';
import { Phase2ShowcaseModal } from './Phase2ShowcaseModal';
import { Phase3ShowcaseModal } from './Phase3ShowcaseModal';

interface AndroidViewProps {
  onSwitchToWindows: () => void;
  onLogout: () => void;
}

export const AndroidView: React.FC<AndroidViewProps> = ({ onSwitchToWindows, onLogout }) => {
  const [currentScreen, setCurrentScreen] = useState<AndroidScreen>('home');
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [opportunities, setOpportunities] = useState<Opportunity[]>(INITIAL_OPPORTUNITIES);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>(INITIAL_CUSTOMERS[0]);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [customerFilter, setCustomerFilter] = useState<string>('همه');
  const [searchQuery, setSearchQuery] = useState('');
  const [oppFilter, setOppFilter] = useState<string>('همه');
  const [oppSearchQuery, setOppSearchQuery] = useState('');
  const [taskFilter, setTaskFilter] = useState<'همه' | 'امروز' | 'آینده'>('همه');
  const [customer360Tab, setCustomer360Tab] = useState<'timeline' | 'opportunities' | 'contacts' | 'business' | 'tasks'>('timeline');
  
  // Modals
  const [showQuickAddModal, setShowQuickAddModal] = useState<boolean>(false);
  const [showQuickOppModal, setShowQuickOppModal] = useState<boolean>(false);
  const [showCaseStudyModal, setShowCaseStudyModal] = useState<boolean>(false);
  const [showPhase3Modal, setShowPhase3Modal] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Interactive Mobile State
  const [shiftActive, setShiftActive] = useState<boolean>(true);
  const [offlineSyncProgress, setOfflineSyncProgress] = useState<number>(100);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleUpdateOpportunity = (updated: Opportunity) => {
    setOpportunities(prev => prev.map(o => o.id === updated.id ? updated : o));
    setSelectedOpportunity(updated);
    triggerToast(`فرصت «${updated.name}» به‌روزرسانی شد.`);
  };

  const handleOpportunityCreated = (newOpp: Opportunity) => {
    setOpportunities(prev => [newOpp, ...prev]);
    setSelectedOpportunity(newOpp);
    triggerToast(`فرصت جدید «${newOpp.name}» ثبت شد.`);
  };

  // Filtered customers
  const filteredCustomers = customers.filter((c) => {
    const matchesFilter = customerFilter === 'همه' || c.type.includes(customerFilter);
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (c.decisionMaker?.name && c.decisionMaker.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  // Filtered tasks
  const filteredTasks = tasks.filter((t) => {
    if (taskFilter === 'امروز') return t.dueDate.includes('امروز') || t.status === 'معوق';
    if (taskFilter === 'آینده') return !t.dueDate.includes('امروز');
    return true;
  });

  // Filtered opportunities
  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesSearch =
      opp.name.toLowerCase().includes(oppSearchQuery.toLowerCase()) ||
      opp.customerName.toLowerCase().includes(oppSearchQuery.toLowerCase()) ||
      (opp.owner && opp.owner.toLowerCase().includes(oppSearchQuery.toLowerCase()));
    if (!matchesSearch) return false;
    if (oppFilter === 'همه') return true;
    if (oppFilter === 'active') return opp.status === 'active';
    return opp.stage === oppFilter || opp.status === oppFilter;
  });

  const handleOpenCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setCustomer360Tab('timeline');
    setCurrentScreen('customer_overview');
  };

  const handleStartNewVisit = (customer?: Customer) => {
    if (customer) {
      setSelectedCustomer(customer);
    }
    setCurrentScreen('new_visit');
  };

  const handleSaveQuickCustomer = (newCustomer: Customer) => {
    setCustomers([newCustomer, ...customers]);
    setSelectedCustomer(newCustomer);
    triggerToast(`مشتری جدید «${newCustomer.name}» با موفقیت ثبت شد.`);
    setCurrentScreen('customer_overview');
  };

  const handleFinishGuidedVisit = (
    updatedCustomer: Customer,
    newTimelineEvent: TimelineEvent,
    newTask: TaskItem
  ) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === updatedCustomer.id ? updatedCustomer : c))
    );
    setTasks((prev) => [newTask, ...prev]);
    setSelectedCustomer(updatedCustomer);
    triggerToast('ویزیت و نتیجه ثبت شد و تسک پیگیری در سیستم ایجاد گردید.');
    setCustomer360Tab('timeline');
    setCurrentScreen('customer_overview');
  };

  const toggleTaskStatus = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: t.status === 'انجام‌شده' ? 'باز' : 'انجام‌شده' } : t))
    );
    triggerToast('وضعیت تسک به‌روزرسانی شد.');
  };

  const handleSyncData = () => {
    setIsSyncing(true);
    setOfflineSyncProgress(40);
    setTimeout(() => {
      setOfflineSyncProgress(85);
      setTimeout(() => {
        setOfflineSyncProgress(100);
        setIsSyncing(false);
      }, 500);
    }, 600);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col items-center">
      {/* =======================================================
          RESPONSIVE MOBILE & TABLET FULL-SCREEN CONTAINER
         ======================================================= */}
      <div className="w-full max-w-2xl min-h-screen bg-white text-slate-900 shadow-sm flex flex-col relative">
        {/* Top App Header (Clean, minimal, premium mobile) */}
        {currentScreen !== 'splash' && currentScreen !== 'login' && (
          <header className="sticky top-0 bg-white/95 border-b border-slate-100 px-4 py-2.5 flex items-center justify-between z-30 backdrop-blur-md">
            <div className="flex items-center gap-2.5">
              {currentScreen !== 'home' ? (
                <button
                  onClick={() => setCurrentScreen('home')}
                  className="p-1.5 -mr-1 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
                  title="بازگشت به خانه"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <div className="w-8 h-8 rounded-xl bg-teal-600 flex items-center justify-center font-bold text-white text-xs shadow-xs">
                  KB
                </div>
              )}
              <div>
                <h2 className="text-xs font-black text-slate-900 tracking-tight">
                  {currentScreen === 'home' && 'کماند سنتر فروش'}
                  {currentScreen === 'customers' && 'مشتریان و پروژه‌ها'}
                  {currentScreen === 'customer_overview' && 'پرونده مشتری'}
                  {currentScreen === 'opportunities' && 'معاملات و پایپ‌لاین'}
                  {currentScreen === 'new_visit' && 'ثبت ویزیت حضوری'}
                  {currentScreen === 'tasks' && 'پیگیری‌ها و تسک‌ها'}
                  {currentScreen === 'notifications' && 'اعلان‌ها و پیام‌ها'}
                  {currentScreen === 'profile' && 'پروفایل و تنظیمات'}
                </h2>
                <span className="text-[10px] text-slate-400 font-medium block">کویر بسپار • منطقه ۱ و ۳</span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentScreen('notifications')}
                className={`relative p-2 rounded-xl transition cursor-pointer ${
                  currentScreen === 'notifications'
                    ? 'text-teal-700 bg-teal-50'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
                title="پیام‌ها و اعلان‌ها"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-rose-500" />
              </button>

              <button
                onClick={() => setCurrentScreen('profile')}
                className={`p-2 rounded-xl transition cursor-pointer ${
                  currentScreen === 'profile'
                    ? 'text-teal-700 bg-teal-50 ring-1 ring-teal-200'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
                title="پروفایل کاربری"
              >
                <User className="w-4 h-4" />
              </button>
            </div>
          </header>
        )}

        {/* Dynamic Screen Content */}
        <div className="flex-1 overflow-y-auto pb-24 bg-slate-50/50">
          {/* =======================================================
              SCREEN 01: SPLASH (Modern Light Brand Intro)
             ======================================================= */}
          {currentScreen === 'splash' && (
            <div className="min-h-full flex flex-col items-center justify-between p-8 text-center bg-gradient-to-b from-white via-teal-50/40 to-slate-50">
              <div className="w-full flex justify-end">
                <span className="text-[11px] text-slate-400 font-semibold">نسخه ۱.۰.۲</span>
              </div>

              <div className="space-y-4">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-teal-500 via-emerald-500 to-cyan-600 mx-auto flex items-center justify-center shadow-xl shadow-teal-500/25">
                  <span className="text-white font-black text-4xl tracking-tighter">KB</span>
                </div>
                <div>
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight">کویر بسپار</h1>
                  <p className="text-xs uppercase tracking-widest text-teal-700 font-bold mt-1">Sales CRM Mobile</p>
                </div>
                <div className="h-1 w-16 bg-teal-500/30 mx-auto rounded-full mt-2" />
                <p className="text-xs text-slate-600 max-w-[240px] mx-auto leading-relaxed pt-2">
                  سامانه همراه بازاریابی میدانی لوله و اتصالات پلیمر کویر بسپار یزد
                </p>
              </div>

              <div className="w-full space-y-2.5">
                <button
                  onClick={() => setCurrentScreen('home')}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-black text-sm shadow-md shadow-teal-600/20 active:scale-98 transition cursor-pointer"
                >
                  ورود مستقیم به کماند سنتر
                </button>
                <button
                  onClick={() => setCurrentScreen('login')}
                  className="w-full py-3 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold cursor-pointer"
                >
                  فرم لاگین
                </button>
              </div>
            </div>
          )}

          {/* =======================================================
              SCREEN 02: LOGIN (Mobile Version)
             ======================================================= */}
          {currentScreen === 'login' && (
            <div className="min-h-full p-6 flex flex-col justify-between bg-white">
              <div className="pt-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-600 flex items-center justify-center font-black text-white text-xl shadow-md mb-5">
                  KB
                </div>
                <h2 className="text-xl font-black text-slate-900">ورود به حساب بازاریاب</h2>
                <p className="text-xs text-slate-500 mt-1">سامانه متمرکز بازاریابی و فروش حضوری</p>

                <div className="mt-6 space-y-4">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">نام کاربری / کد پرسنلی</label>
                    <input
                      type="text"
                      defaultValue="rezaei.sales"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900"
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">رمز عبور</label>
                    <input
                      type="password"
                      defaultValue="••••••••"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900"
                      dir="ltr"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-6">
                <button
                  onClick={() => setCurrentScreen('home')}
                  className="w-full py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md shadow-teal-600/20 active:scale-98 transition cursor-pointer"
                >
                  ورود به کارتابل روزانه
                </button>
                <p className="text-[10px] text-center text-slate-400">
                  شناسایی خودکار شیفت کاری و تخصیص مسیر جغرافیایی
                </p>
              </div>
            </div>
          )}

          {/* =======================================================
              SCREEN 03: DAILY HOME (Daily Sales Command Center)
             ======================================================= */}
          {currentScreen === 'home' && (
            <div className="p-4 space-y-4">
              {/* Daily Shift & Greeting Card */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 font-black text-xs flex items-center justify-center">
                      ع‌ر
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-sm text-slate-900">علی رضایی</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      </div>
                      <span className="text-[11px] text-slate-500">بازاریاب منطقه ۱ و ۳ • تهران</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setShiftActive(!shiftActive)}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition cursor-pointer ${
                      shiftActive
                        ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {shiftActive ? 'شیفت فعال' : 'شروع شیفت'}
                  </button>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>موقعیت مکانی فعال</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>ساعت کاری: ۸:۳۰ تا ۱۷:۰۰</span>
                  </span>
                </div>
              </div>

              {/* Core Daily KPI Counter */}
              <div className="grid grid-cols-3 gap-2.5">
                <div 
                  onClick={() => setCurrentScreen('customers')}
                  className="bg-white border border-slate-200/80 rounded-2xl p-3 text-center shadow-xs cursor-pointer hover:border-slate-300 transition"
                >
                  <span className="text-[11px] text-slate-500 font-medium block">ویزیت امروز</span>
                  <span className="text-xl font-black text-slate-900 mt-1 block">۴ <span className="text-xs font-normal text-slate-400">/ ۶</span></span>
                  <span className="text-[10px] text-teal-700 font-semibold mt-0.5 block">۶۷٪ تکمیل</span>
                </div>

                <div 
                  onClick={() => setCurrentScreen('tasks')}
                  className="bg-white border border-slate-200/80 rounded-2xl p-3 text-center shadow-xs cursor-pointer hover:border-slate-300 transition"
                >
                  <span className="text-[11px] text-slate-500 font-medium block">پیگیری‌ها</span>
                  <span className="text-xl font-black text-slate-900 mt-1 block">۸</span>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">تسک جاری</span>
                </div>

                <div 
                  onClick={() => setCurrentScreen('tasks')}
                  className="bg-white border border-slate-200/80 rounded-2xl p-3 text-center shadow-xs cursor-pointer hover:border-slate-300 transition"
                >
                  <span className="text-[11px] text-slate-500 font-medium block">معوق‌ها</span>
                  <span className="text-xl font-black text-rose-600 mt-1 block">۲</span>
                  <span className="text-[10px] text-rose-600 font-semibold mt-0.5 block">نیاز به اقدام</span>
                </div>
              </div>

              {/* Minimal Quick Actions Row */}
              <div className="grid grid-cols-4 gap-2">
                <button
                  onClick={() => handleStartNewVisit()}
                  className="p-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold transition cursor-pointer flex flex-col items-center gap-1.5 shadow-xs"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span className="text-[11px]">ثبت ویزیت</span>
                </button>

                <button
                  onClick={() => setShowQuickOppModal(true)}
                  className="p-3 rounded-2xl bg-white border border-slate-200/80 hover:bg-slate-50 text-slate-800 font-bold transition cursor-pointer flex flex-col items-center gap-1.5 shadow-xs"
                >
                  <TrendingUp className="w-4 h-4 text-slate-600" />
                  <span className="text-[11px]">معامله جدید</span>
                </button>

                <button
                  onClick={() => setShowQuickAddModal(true)}
                  className="p-3 rounded-2xl bg-white border border-slate-200/80 hover:bg-slate-50 text-slate-800 font-bold transition cursor-pointer flex flex-col items-center gap-1.5 shadow-xs"
                >
                  <Users className="w-4 h-4 text-slate-600" />
                  <span className="text-[11px]">مشتری جدید</span>
                </button>

                <button
                  onClick={() => setCurrentScreen('opportunities')}
                  className="p-3 rounded-2xl bg-white border border-slate-200/80 hover:bg-slate-50 text-slate-800 font-bold transition cursor-pointer flex flex-col items-center gap-1.5 shadow-xs"
                >
                  <Target className="w-4 h-4 text-slate-600" />
                  <span className="text-[11px]">پایپ‌لاین</span>
                </button>
              </div>

              {/* Next Visit Route Card */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-teal-600" />
                    <span>مقصد بعدی شما</span>
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">۴.۲ کیلومتر فاصله</span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="space-y-0.5 overflow-hidden">
                    <h4 className="font-bold text-slate-900 text-xs truncate">فروشگاه تاسیسات دماوند (حاج علیخانی)</h4>
                    <p className="text-[11px] text-slate-500 truncate">خیابان شریعتی، بالاتر از ملک، پلاک ۲۸۴</p>
                  </div>
                  <button 
                    onClick={() => handleStartNewVisit(INITIAL_CUSTOMERS[0])}
                    className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-[11px] flex items-center gap-1.5 shrink-0 transition cursor-pointer"
                  >
                    <Navigation className="w-3.5 h-3.5 text-teal-400" />
                    <span>مسیریابی</span>
                  </button>
                </div>
              </div>

              {/* Hot Deals Preview (Clean & Scannable) */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-teal-600" />
                    <span className="text-xs font-bold text-slate-900">معاملات در جریان</span>
                  </div>
                  <button
                    onClick={() => setCurrentScreen('opportunities')}
                    className="text-[11px] text-teal-700 hover:underline font-semibold"
                  >
                    همه ({opportunities.filter(o => o.status === 'active').length})
                  </button>
                </div>

                <div className="space-y-2">
                  {opportunities.filter(o => o.status === 'active').slice(0, 2).map((opp) => {
                    const stageCfg = SALES_STAGE_CONFIG[opp.stage];
                    return (
                      <div
                        key={opp.id}
                        onClick={() => setSelectedOpportunity(opp)}
                        className="p-3 rounded-xl bg-slate-50/60 hover:bg-slate-100/80 border border-slate-100 flex items-center justify-between text-xs cursor-pointer transition"
                      >
                        <div className="space-y-0.5 overflow-hidden">
                          <h5 className="font-bold text-slate-900 text-xs truncate">{opp.name}</h5>
                          <p className="text-[11px] text-slate-500 truncate">{opp.customerName}</p>
                        </div>

                        <div className="text-left shrink-0 mr-3">
                          <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold block ${stageCfg.badgeBg} ${stageCfg.badgeText}`}>
                            {stageCfg.persianTitle}
                          </span>
                          <span className="text-[11px] font-bold text-slate-800 block mt-0.5">
                            {(opp.potentialValue / 1_000_000).toLocaleString('fa-IR')} م.ت
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Nearby Customers List */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">مشتریان نزدیک شما</span>
                  <button 
                    onClick={() => setCurrentScreen('customers')}
                    className="text-[11px] text-teal-700 hover:underline font-semibold"
                  >
                    مشاهده همه ({INITIAL_CUSTOMERS.length})
                  </button>
                </div>

                <div className="space-y-2">
                  {INITIAL_CUSTOMERS.slice(0, 3).map((customer) => (
                    <div
                      key={customer.id}
                      onClick={() => handleOpenCustomer(customer)}
                      className="p-2.5 rounded-xl bg-slate-50/60 hover:bg-slate-100/80 border border-slate-100 flex items-center justify-between gap-3 transition cursor-pointer"
                    >
                      <div className="overflow-hidden space-y-0.5">
                        <h4 className="text-xs font-bold text-slate-900 truncate">{customer.name}</h4>
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                          <span>{customer.type}</span>
                          <span>•</span>
                          <span>{customer.distanceKm} کیلومتر</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                          customer.status === 'فعال'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}>
                          {customer.status}
                        </span>
                        <ChevronLeft className="w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* =======================================================
              SCREEN 04: CUSTOMERS DIRECTORY (Phase 2 Enhanced)
             ======================================================= */}
          {currentScreen === 'customers' && (
            <div className="p-4 space-y-3 pb-24">
              {/* Quick Add Bar */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowQuickAddModal(true)}
                  className="w-full py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>ثبت سریع مشتری جدید</span>
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="جستجو در مشتریان، پروژه‌ها و آدرس..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-slate-200/80 rounded-xl px-3.5 py-2.5 pr-9 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 shadow-2xs"
                />
                <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
              </div>

              {/* Category Filters */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
                {['همه', 'فروشگاه تأسیسات', 'پروژه ساختمانی', 'پیمانکار', 'مهندس'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCustomerFilter(cat)}
                    className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-medium transition cursor-pointer ${
                      customerFilter === cat
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Customers List */}
              <div className="space-y-2.5 pt-1">
                {filteredCustomers.map((customer) => (
                  <div
                    key={customer.id}
                    onClick={() => handleOpenCustomer(customer)}
                    className="bg-white border border-slate-200/80 rounded-2xl p-3.5 shadow-xs space-y-2.5 hover:border-slate-300 transition cursor-pointer relative"
                  >
                    {/* Header Info */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-xs font-bold text-slate-900">{customer.name}</h4>
                          <span className="text-[10px] px-2 py-0.5 rounded-md font-medium bg-slate-100 text-slate-600">
                            {customer.type}
                          </span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                            customer.status === 'فعال'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}>
                            {customer.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-tight pt-0.5">{customer.address}</p>
                      </div>

                      <span className="text-[10px] text-slate-500 font-medium bg-slate-50 px-2 py-1 rounded-lg shrink-0">
                        {customer.distanceKm} ک.م
                      </span>
                    </div>

                    {/* Decision Maker & Next Action Indicators */}
                    {(customer.decisionMaker || customer.nextFollowup) && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px]">
                        {customer.decisionMaker && (
                          <div className="bg-slate-50/70 p-2 rounded-xl border border-slate-100 flex items-center justify-between text-slate-600">
                            <span className="text-slate-400">تصمیم‌گیرنده:</span>
                            <span className="font-semibold text-slate-800">
                              {customer.decisionMaker.name} ({customer.decisionMaker.role})
                            </span>
                          </div>
                        )}

                        {customer.nextFollowup && (
                          <div className="bg-slate-50/70 p-2 rounded-xl border border-slate-100 flex items-center justify-between text-slate-600">
                            <span className="text-slate-400">پیگیری:</span>
                            <span className="font-semibold text-slate-800 truncate max-w-[150px]">
                              {customer.nextFollowup.type}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Action Bar */}
                    <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[11px]">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <span>آخرین فعالیت:</span>
                        <span className="text-slate-600 font-medium">{customer.lastActivity}</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <a
                          href={`tel:${customer.phone}`}
                          onClick={(e) => e.stopPropagation()}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium flex items-center gap-1"
                        >
                          <Phone className="w-3 h-3 text-slate-600" />
                          <span>تماس</span>
                        </a>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStartNewVisit(customer);
                          }}
                          className="px-3 py-1 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 cursor-pointer shadow-2xs transition"
                        >
                          ثبت ویزیت
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =======================================================
              SCREEN 05: CUSTOMER 360 OVERVIEW (Phase 2 Enhanced)
             ======================================================= */}
          {currentScreen === 'customer_overview' && (
            <div className="p-4 space-y-4 pb-24 animate-in fade-in duration-150">
              {/* Top Banner & Photo */}
              <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs relative">
                {/* Photo Header */}
                <div className="h-36 w-full relative">
                  <img
                    src={selectedCustomer.image || selectedCustomer.storePhoto || selectedCustomer.projectSitePhoto || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80'}
                    alt={selectedCustomer.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent" />

                  {/* Back & Share Buttons */}
                  <div className="absolute top-3 right-3 left-3 flex items-center justify-between">
                    <button
                      onClick={() => setCurrentScreen('customers')}
                      className="p-2 rounded-2xl bg-white/90 backdrop-blur-md text-slate-800 shadow-sm hover:bg-white transition cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <span className="text-[10px] font-black text-white bg-slate-900/60 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/20">
                      پروفایل ۳۶۰ درجه
                    </span>
                  </div>

                  {/* Bottom Text Overlay */}
                  <div className="absolute bottom-3 right-3 left-3 text-white">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-black">{selectedCustomer.name}</h3>
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/90 text-white font-bold">
                        {selectedCustomer.status}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-200 mt-0.5">{selectedCustomer.type} • کد: {selectedCustomer.id}</p>
                  </div>
                </div>

                {/* Identity & Address Info */}
                <div className="p-4 space-y-3">
                  <p className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-2xl border border-slate-200 leading-relaxed">
                    <MapPin className="w-3.5 h-3.5 text-teal-600 inline ml-1" />
                    {selectedCustomer.address}
                  </p>

                  {/* One-Handed Quick Action Dock */}
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    <a
                      href={`tel:${selectedCustomer.phone}`}
                      className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition"
                    >
                      <Phone className="w-3.5 h-3.5 text-teal-600" />
                      <span>تماس مستقیم</span>
                    </a>

                    <button
                      onClick={() => handleStartNewVisit(selectedCustomer)}
                      className="p-2.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-teal-600/20 transition cursor-pointer active:scale-95"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>ثبت ویزیت</span>
                    </button>

                    <button
                      onClick={() => {
                        triggerToast('مسیر در اپلیکیشن نقشه بارگذاری شد.');
                      }}
                      className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <Navigation className="w-3.5 h-3.5 text-cyan-600" />
                      <span>مسیریابی</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Smart Context Banner (What happened last & what is next) */}
              <div className="bg-gradient-to-br from-teal-50/90 via-white to-emerald-50/70 border border-teal-200 rounded-3xl p-4 shadow-xs space-y-2.5">
                <div className="flex items-center gap-2 text-teal-900">
                  <Sparkles className="w-4 h-4 text-teal-600" />
                  <h4 className="text-xs font-black">کانتکست هوشمند پرونده (Smart Context)</h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {/* Last Visit Summary */}
                  <div className="bg-white/90 p-2.5 rounded-2xl border border-teal-100 space-y-0.5">
                    <span className="text-[10px] text-slate-500 font-bold block">آخرین مراجعه و نتیجه:</span>
                    <span className="font-extrabold text-slate-900 text-xs block">
                      {selectedCustomer.lastVisitSummary?.result || 'درخواست قیمت و پیش‌فاکتور'}
                    </span>
                    <span className="text-[10px] text-slate-500 block">
                      {selectedCustomer.lastVisitSummary?.date || '۲ روز پیش'} • با: {selectedCustomer.lastVisitSummary?.metWith || 'مالک'}
                    </span>
                  </div>

                  {/* Next Action & Follow-up */}
                  <div className="bg-white/90 p-2.5 rounded-2xl border border-teal-100 space-y-0.5">
                    <span className="text-[10px] text-slate-500 font-bold block">اقدام بعدی معین‌شده:</span>
                    <span className="font-extrabold text-indigo-900 text-xs block">
                      {selectedCustomer.nextFollowup?.type || 'ارسال پیش‌فاکتور و لیست قیمت'}
                    </span>
                    <span className="text-[10px] text-amber-700 font-bold block">
                      موعد: {selectedCustomer.nextFollowup?.dueDate || 'فردا ۱۰:۰۰'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Segmented Navigation Tabs */}
              <div className="bg-white border border-slate-200 rounded-2xl p-1 shadow-2xs flex items-center text-xs font-bold overflow-x-auto">
                {[
                  { id: 'timeline', label: 'تایم‌لاین' },
                  { id: 'opportunities', label: `فرصت‌ها (${opportunities.filter(o => o.customerId === selectedCustomer.id).length})` },
                  { id: 'contacts', label: 'مخاطبان' },
                  { id: 'business', label: 'اطلاعات تجاری' },
                  { id: 'tasks', label: 'تسک‌ها' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setCustomer360Tab(tab.id as any)}
                    className={`flex-1 min-w-[65px] py-2 rounded-xl transition cursor-pointer text-center whitespace-nowrap ${
                      customer360Tab === tab.id
                        ? 'bg-teal-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* TAB: OPPORTUNITIES (One Customer -> Many Opportunities) */}
              {customer360Tab === 'opportunities' && (
                <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div>
                      <h4 className="text-xs font-black text-slate-900">معاملات و فرصت‌های فروش</h4>
                      <p className="text-[10px] text-slate-500">پیش‌فاکتورها، قراردادها و پتانسیل معامله با این مشتری</p>
                    </div>
                    <button
                      onClick={() => setShowQuickOppModal(true)}
                      className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-[11px] font-bold flex items-center gap-1 shadow-xs cursor-pointer transition active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>ثبت معامله</span>
                    </button>
                  </div>

                  {opportunities.filter(o => o.customerId === selectedCustomer.id).length === 0 ? (
                    <div className="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-2">
                      <p className="text-xs text-slate-500">هنوز معامله یا فرصت فعالی برای این مشتری ثبت نشده است.</p>
                      <button
                        onClick={() => setShowQuickOppModal(true)}
                        className="text-xs font-bold text-teal-700 hover:underline cursor-pointer"
                      >
                        + ثبت اولین استعلام قیمت یا پیش‌فاکتور
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {opportunities
                        .filter(o => o.customerId === selectedCustomer.id)
                        .map(opp => {
                          const stageCfg = SALES_STAGE_CONFIG[opp.stage];
                          return (
                            <div
                              key={opp.id}
                              onClick={() => setSelectedOpportunity(opp)}
                              className="p-3.5 rounded-2xl border border-slate-200 hover:border-teal-400 bg-slate-50/50 hover:bg-white shadow-2xs space-y-2.5 cursor-pointer transition active:scale-[0.99]"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <h5 className="text-xs font-black text-slate-900">{opp.name}</h5>
                                  <span className="text-[10px] text-slate-500">کد معامله: {opp.id}</span>
                                </div>
                                <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold border ${stageCfg.badgeBg} ${stageCfg.badgeText} ${stageCfg.border}`}>
                                  {stageCfg.persianTitle}
                                </span>
                              </div>

                              <div className="grid grid-cols-2 gap-2 text-[11px] bg-white p-2.5 rounded-xl border border-slate-100">
                                <div>
                                  <span className="text-[10px] text-slate-400 block">ارزش برآوردی:</span>
                                  <span className="font-black text-slate-900 font-mono text-xs">
                                    {(opp.potentialValue / 1_000_000).toLocaleString('fa-IR')} م.ت
                                  </span>
                                </div>
                                <div>
                                  <span className="text-[10px] text-slate-400 block">اولویت پیگیری:</span>
                                  <span className="font-bold text-teal-700 text-xs">
                                    {opp.priority === 'high' ? 'بالا (فوری)' : opp.priority === 'normal' ? 'متوسط' : 'عادی'}
                                  </span>
                                </div>
                              </div>

                              {opp.nextAction && (
                                <div className="text-[10px] text-indigo-900 bg-indigo-50/70 p-2 rounded-xl border border-indigo-100 flex items-center justify-between">
                                  <span>اقدام بعدی: <strong>{opp.nextAction.title}</strong></span>
                                  <span className="text-[9px] text-indigo-700 font-mono">{opp.nextAction.dueDate}</span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 1: CUSTOMER TIMELINE (The Connected Chain) */}
              {customer360Tab === 'timeline' && (
                <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div>
                      <h4 className="text-xs font-black text-slate-900">تاریخچه زنجیره‌ای تعاملات</h4>
                      <p className="text-[10px] text-slate-500">Customer → Visit → Result → Next Action → Task</p>
                    </div>
                    <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-lg border border-teal-200">
                      {selectedCustomer.timeline?.length || 0} رویداد
                    </span>
                  </div>

                  <CustomerTimelineView timeline={selectedCustomer.timeline || []} />
                </div>
              )}

              {/* TAB 2: CONTACTS & DECISION MAKER */}
              {customer360Tab === 'contacts' && (
                <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <h4 className="text-xs font-black text-slate-900">مخاطبان و چارت تصمیم‌گیری</h4>
                    <span className="text-[10px] text-slate-500">{selectedCustomer.contacts?.length || 1} فرد ثبت شده</span>
                  </div>

                  {/* Decision Maker Spotlight */}
                  {selectedCustomer.decisionMaker && (
                    <div className="p-3.5 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl border border-teal-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <UserCheck className="w-4 h-4 text-teal-700" />
                          <span className="text-xs font-black text-teal-950">{selectedCustomer.decisionMaker.name}</span>
                        </div>
                        <span className="text-[9px] font-extrabold text-teal-800 bg-teal-100 px-2 py-0.5 rounded-full">
                          تصمیم‌گیرنده اصلی
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs pt-1">
                        <span className="text-slate-600 text-[11px]">سمت: {selectedCustomer.decisionMaker.role}</span>
                        <a
                          href={`tel:${selectedCustomer.decisionMaker.phone}`}
                          className="px-2.5 py-1 bg-teal-600 text-white rounded-xl text-[11px] font-bold flex items-center gap-1"
                        >
                          <Phone className="w-3 h-3" />
                          <span>تماس</span>
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Other Contacts */}
                  <div className="space-y-2 pt-1">
                    {selectedCustomer.contacts?.map((contact) => (
                      <div
                        key={contact.id}
                        className="p-3 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between text-xs"
                      >
                        <div>
                          <span className="font-bold text-slate-900 block">{contact.name}</span>
                          <span className="text-[10px] text-slate-500">
                            سمت: {contact.role} • رابطه: {contact.relationship}
                          </span>
                        </div>
                        <a
                          href={`tel:${contact.phone}`}
                          className="px-2.5 py-1 bg-white border border-slate-200 text-slate-700 rounded-xl text-[11px] font-bold flex items-center gap-1"
                        >
                          <Phone className="w-3 h-3 text-teal-600" />
                          <span>{contact.phone}</span>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: BUSINESS / PROJECT SPECIFICS */}
              {customer360Tab === 'business' && (
                <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-xs space-y-3">
                  <h4 className="text-xs font-black text-slate-900 pb-2 border-b border-slate-100">
                    {selectedCustomer.type.includes('فروشگاه') ? 'مشخصات تجاری و قفسه فروشگاه' : 'مشخصات کارگاه ساختمانی'}
                  </h4>

                  {selectedCustomer.type.includes('فروشگاه') ? (
                    <div className="space-y-3 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-500 block mb-1.5 font-bold">برندهای موجود در فروشگاه:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {(selectedCustomer.existingBrands || selectedCustomer.brands || ['کویر بسپار', 'نیوپایپ']).map((b, i) => (
                            <span
                              key={i}
                              className={`px-2.5 py-1 rounded-xl text-[11px] font-bold ${
                                b.includes('کویر بسپار')
                                  ? 'bg-teal-100 text-teal-900 border border-teal-300'
                                  : 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              {b}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2">
                        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                          <span className="text-[10px] text-slate-500 block">پتانسیل خرید سالانه:</span>
                          <span className="font-extrabold text-slate-900 text-xs mt-0.5 block">
                            {selectedCustomer.approximatePurchaseVolume || selectedCustomer.annualPurchaseRange || '۱ تا ۳ میلیارد تومان'}
                          </span>
                        </div>

                        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                          <span className="text-[10px] text-slate-500 block">کارشناس مسئول:</span>
                          <span className="font-extrabold text-teal-800 text-xs mt-0.5 block">
                            {selectedCustomer.assignedSalesperson || 'علی رضایی'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3 text-xs">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                          <span className="text-[10px] text-slate-500 block">مرحله پیشرفت پروژه:</span>
                          <span className="font-extrabold text-teal-900 text-xs mt-0.5 block">
                            {selectedCustomer.projectStage || 'تأسیسات مکانیکی'}
                          </span>
                        </div>
                        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                          <span className="text-[10px] text-slate-500 block">مقیاس پروژه:</span>
                          <span className="font-extrabold text-slate-900 text-xs mt-0.5 block">
                            {selectedCustomer.projectScale || '۴۰ واحد در ۸ طبقه'}
                          </span>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                        <span className="text-[10px] text-slate-500 block">نیاز متریال اعلام‌شده:</span>
                        <span className="font-bold text-slate-800 text-xs mt-0.5 block">
                          {selectedCustomer.projectNeed || '۳۲۰۰ متر لوله پنج‌لایه، اتصالات پرسی و پوش‌فیت فاضلابی'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: TASKS */}
              {customer360Tab === 'tasks' && (
                <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <h4 className="text-xs font-black text-slate-900">وظایف و پیگیری‌های این پرونده</h4>
                    <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-lg">
                      {tasks.filter(t => t.customerId === selectedCustomer.id || t.customerName === selectedCustomer.name).length} تسک
                    </span>
                  </div>

                  <div className="space-y-2">
                    {tasks
                      .filter(t => t.customerId === selectedCustomer.id || t.customerName === selectedCustomer.name)
                      .map((task) => (
                        <div
                          key={task.id}
                          className="p-3 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-1.5"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-xs font-bold text-slate-900 leading-tight">{task.title}</span>
                            <button
                              onClick={() => toggleTaskStatus(task.id)}
                              className={`w-6 h-6 rounded-lg border flex items-center justify-center transition cursor-pointer shrink-0 ${
                                task.status === 'انجام‌شده'
                                  ? 'bg-emerald-500 border-emerald-600 text-white'
                                  : 'bg-white border-slate-300 text-transparent hover:text-slate-400'
                              }`}
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between text-[10px] text-slate-500">
                            <span>سررسید: {task.dueDate}</span>
                            <span className="font-bold text-teal-800">{task.type}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* =======================================================
              SCREEN: OPPORTUNITIES & DEALS PIPELINE (Phase 3)
             ======================================================= */}
          {currentScreen === 'opportunities' && (
            <div className="p-4 space-y-3 pb-24">
              {/* Header & Quick Action */}
              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={() => setShowQuickOppModal(true)}
                  className="w-full py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>ثبت معامله جدید</span>
                </button>
              </div>

              {/* Minimal Metrics Summary */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-white border border-slate-200/80 rounded-2xl p-2.5 shadow-xs">
                  <span className="text-[10px] text-slate-400 block font-medium">ارزش کل پایپ‌لاین</span>
                  <span className="text-xs font-black text-slate-900 font-mono mt-1 block">
                    {(opportunities.filter(o => o.status === 'active').reduce((sum, o) => sum + o.potentialValue, 0) / 1_000_000_000).toFixed(2)} م.م.ت
                  </span>
                </div>
                <div className="bg-white border border-slate-200/80 rounded-2xl p-2.5 shadow-xs">
                  <span className="text-[10px] text-slate-400 block font-medium">معاملات فعال</span>
                  <span className="text-xs font-black text-teal-700 font-mono mt-1 block">
                    {opportunities.filter(o => o.status === 'active').length} مورد
                  </span>
                </div>
                <div className="bg-white border border-slate-200/80 rounded-2xl p-2.5 shadow-xs">
                  <span className="text-[10px] text-slate-400 block font-medium">موفق (Won)</span>
                  <span className="text-xs font-black text-emerald-700 font-mono mt-1 block">
                    {opportunities.filter(o => o.status === 'won').length} مورد
                  </span>
                </div>
              </div>

              {/* Search and Stage Filter Bar */}
              <div className="space-y-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={oppSearchQuery}
                    onChange={(e) => setOppSearchQuery(e.target.value)}
                    placeholder="جستجوی معامله، مشتری، شخص..."
                    className="w-full bg-white border border-slate-200/80 rounded-xl pr-9 pl-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-teal-500 shadow-2xs"
                  />
                  {oppSearchQuery && (
                    <button
                      onClick={() => setOppSearchQuery('')}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* Stage Filters Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-none">
                  {[
                    { id: 'همه', label: 'همه' },
                    { id: 'active', label: 'جاری' },
                    { id: 'qualified', label: 'احراز نیاز' },
                    { id: 'proposal_sent', label: 'پیش‌فاکتور' },
                    { id: 'negotiation', label: 'مذاکره' },
                    { id: 'decision', label: 'تصمیم‌گیری' },
                    { id: 'won', label: 'موفق' },
                    { id: 'lost', label: 'ناموفق' },
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setOppFilter(filter.id)}
                      className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition cursor-pointer font-medium ${
                        oppFilter === filter.id
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Opportunities List */}
              <div className="space-y-2.5 pt-1">
                {filteredOpportunities.length === 0 ? (
                  <div className="bg-white border border-slate-200/80 rounded-2xl p-8 text-center space-y-2">
                    <p className="text-xs text-slate-500">معامله‌ای متناسب با فیلتر شما یافت نشد.</p>
                    <button
                      onClick={() => { setOppFilter('همه'); setOppSearchQuery(''); }}
                      className="text-xs font-bold text-teal-700 hover:underline cursor-pointer"
                    >
                      پاک کردن فیلترها
                    </button>
                  </div>
                ) : (
                  filteredOpportunities.map((opp) => {
                    const stageCfg = SALES_STAGE_CONFIG[opp.stage];
                    const cust = customers.find(c => c.id === opp.customerId);
                    return (
                      <div
                        key={opp.id}
                        onClick={() => setSelectedOpportunity(opp)}
                        className="bg-white border border-slate-200/80 hover:border-slate-300 rounded-2xl p-3.5 shadow-xs space-y-3 cursor-pointer transition"
                      >
                        {/* Title & Stage */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="space-y-0.5 overflow-hidden">
                            <h4 className="text-xs font-bold text-slate-900 truncate leading-snug">{opp.name}</h4>
                            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                              <Building2 className="w-3 h-3 text-slate-400" />
                              <span className="font-medium text-slate-700 truncate">{opp.customerName}</span>
                              {cust && (
                                <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[9px]">
                                  {cust.type}
                                </span>
                              )}
                            </div>
                          </div>

                          <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold shrink-0 ${stageCfg.badgeBg} ${stageCfg.badgeText}`}>
                            {stageCfg.persianTitle}
                          </span>
                        </div>

                        {/* Key Specs */}
                        <div className="grid grid-cols-3 gap-2 text-center bg-slate-50/70 p-2.5 rounded-xl border border-slate-100">
                          <div>
                            <span className="text-[10px] text-slate-400 block">ارزش</span>
                            <span className="text-xs font-bold text-slate-900 font-mono mt-0.5 block">
                              {(opp.potentialValue / 1_000_000).toLocaleString('fa-IR')} م.ت
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 block">اولویت</span>
                            <span className="text-xs font-semibold text-slate-700 mt-0.5 block">
                              {opp.priority === 'high' ? 'فوری' : opp.priority === 'normal' ? 'متوسط' : 'عادی'}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 block">موعد</span>
                            <span className="text-[11px] font-medium text-slate-600 font-mono mt-0.5 block">
                              {opp.expectedCloseDate}
                            </span>
                          </div>
                        </div>

                        {/* Next Action Banner */}
                        {opp.nextAction && (
                          <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-[11px] flex items-center justify-between text-slate-700">
                            <span className="truncate max-w-[200px]">
                              اقدام: <strong>{opp.nextAction.title}</strong>
                            </span>
                            <span className="text-[10px] text-slate-500 font-medium">
                              {opp.nextAction.dueDate}
                            </span>
                          </div>
                        )}

                        {/* Bottom Actions Row */}
                        <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[11px]">
                          <div className="text-[10px] text-slate-400">
                            <span>مسئول: <strong className="text-slate-600">{opp.owner}</strong></span>
                          </div>

                          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                            {(cust?.decisionMaker?.phone || cust?.phone) && (
                              <a
                                href={`tel:${cust?.decisionMaker?.phone || cust?.phone}`}
                                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
                                title="تماس با مشتری"
                              >
                                <Phone className="w-3.5 h-3.5" />
                              </a>
                            )}
                            <button
                              onClick={() => setSelectedOpportunity(opp)}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-[10px] flex items-center gap-1 transition cursor-pointer"
                            >
                              <span>جزئیات</span>
                              <ChevronRight className="w-3 h-3 rotate-180 text-slate-500" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* =======================================================
              SCREEN 06: GUIDED VISIT MULTI-STEP FLOW (Phase 2)
             ======================================================= */}
          {currentScreen === 'new_visit' && (
            <div className="pb-20">
              <GuidedVisitFlow
                customer={selectedCustomer}
                onFinishVisit={handleFinishGuidedVisit}
                onCancel={() => setCurrentScreen('customer_overview')}
              />
            </div>
          )}

          {/* =======================================================
              SCREEN 07: TASKS & FOLLOW-UPS
             ======================================================= */}
          {currentScreen === 'tasks' && (
            <div className="p-4 space-y-3 pb-24">
              {/* Overdue Warning Alert */}
              <div className="bg-rose-50 border border-rose-200/80 rounded-xl p-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span className="font-semibold text-rose-900 text-[11px]">۲ پیگیری نیازمند توجه فوری</span>
                </div>
                <span className="text-[10px] bg-rose-600 text-white px-2 py-0.5 rounded-md font-semibold">
                  فوری
                </span>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-[11px] font-medium">
                {(['همه', 'امروز', 'آینده'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setTaskFilter(tab)}
                    className={`flex-1 py-1.5 rounded-lg text-center transition cursor-pointer ${
                      taskFilter === tab
                        ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tasks List */}
              <div className="space-y-2 pt-1">
                {filteredTasks.map((task) => {
                  const isDone = task.status === 'انجام‌شده';
                  return (
                    <div
                      key={task.id}
                      className={`bg-white border rounded-2xl p-3.5 shadow-xs space-y-2.5 transition ${
                        isDone ? 'opacity-60 bg-slate-50 border-slate-200' : 'border-slate-200/80'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2.5">
                          <button
                            onClick={() => toggleTaskStatus(task.id)}
                            className="mt-0.5 text-slate-400 hover:text-teal-600 cursor-pointer transition"
                          >
                            <CheckSquare className={`w-4 h-4 ${isDone ? 'text-teal-600' : ''}`} />
                          </button>
                          <div>
                            <h4 className={`text-xs font-bold text-slate-900 ${isDone ? 'line-through text-slate-400' : ''}`}>
                              {task.customerName || task.title}
                            </h4>
                            <p className="text-[11px] text-slate-500 mt-0.5">{task.type} • {task.dueDate}</p>
                          </div>
                        </div>

                        <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                          task.status === 'معوق'
                            ? 'bg-rose-50 text-rose-700'
                            : task.status === 'انجام‌شده'
                            ? 'bg-slate-100 text-slate-600'
                            : 'bg-teal-50 text-teal-700'
                        }`}>
                          {task.status}
                        </span>
                      </div>

                      {task.notes && (
                        <p className="text-[11px] text-slate-600 bg-slate-50/80 p-2.5 rounded-xl border border-slate-100 leading-relaxed">
                          {task.notes}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* =======================================================
              SCREEN 08: NOTIFICATIONS
             ======================================================= */}
          {currentScreen === 'notifications' && (
            <div className="p-4 space-y-3 pb-24">
              <div className="flex items-center justify-between text-xs px-0.5">
                <span className="font-bold text-slate-900">پیام‌ها و اعلان‌های سیستم</span>
                <button className="text-[11px] text-teal-700 hover:underline font-semibold cursor-pointer">علامت به عنوان خوانده‌شده</button>
              </div>

              <div className="space-y-2">
                {INITIAL_NOTIFICATIONS.map((notif) => (
                  <div
                    key={notif.id}
                    className="bg-white border border-slate-200/80 rounded-2xl p-3.5 shadow-xs space-y-1 hover:border-slate-300 transition"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{notif.title}</span>
                      <span className="text-[10px] text-slate-400">{notif.timeAgo}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed pt-0.5">{notif.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =======================================================
              SCREEN 09: PROFILE & SHIFT
             ======================================================= */}
          {currentScreen === 'profile' && (
            <div className="p-4 space-y-3 pb-24">
              <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs text-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-800 font-black text-lg mx-auto flex items-center justify-center border border-teal-100">
                  ع‌ر
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">علی رضایی</h3>
                  <span className="text-xs text-teal-700 font-medium block mt-0.5">کارشناس ارشد بازاریابی میدانی</span>
                  <span className="text-[11px] text-slate-400 mt-0.5 block">کد پرسنلی: KB-8412 • منطقه ۱ و ۳ تهران</span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                  <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-medium">تحقق هدف ماه:</span>
                    <span className="font-bold text-teal-700 text-sm mt-0.5 block">۸۴٪</span>
                  </div>
                  <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-medium">مراجعات کل ماه:</span>
                    <span className="font-bold text-slate-900 text-sm mt-0.5 block">۷۸ ویزیت</span>
                  </div>
                </div>
              </div>

              {/* Offline Sync Controls */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-3.5 shadow-xs space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">همگام‌سازی آفلاین داده‌ها</span>
                  <span className="text-[10px] text-emerald-700 font-semibold">۱۰۰٪ آماده</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 transition-all duration-300"
                    style={{ width: `${offlineSyncProgress}%` }}
                  />
                </div>
                <button
                  onClick={handleSyncData}
                  disabled={isSyncing}
                  className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 transition"
                >
                  <RotateCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>{isSyncing ? 'در حال همگام‌سازی...' : 'به‌روزرسانی داده‌ها'}</span>
                </button>
              </div>

              <div className="pt-2 space-y-2">
                <button
                  onClick={onSwitchToWindows}
                  className="w-full py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-semibold transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <ExternalLink className="w-4 h-4 text-teal-400" />
                  <span>ورود به پنل داشبورد مدیریت (ویندوز)</span>
                </button>

                <button
                  onClick={onLogout}
                  className="w-full py-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 text-xs font-semibold transition cursor-pointer"
                >
                  خروج از حساب کاربری
                </button>
              </div>
            </div>
          )}
        </div>

        {/* =======================================================
            BOTTOM NAVIGATION DOCK (Ergonomic Thumb Zone)
           ======================================================= */}
        {currentScreen !== 'splash' && currentScreen !== 'login' && (
          <nav className="fixed md:sticky bottom-0 inset-x-0 w-full max-w-2xl mx-auto bg-white/95 border-t border-slate-200/80 px-4 py-2 flex items-center justify-around z-40 backdrop-blur-md shadow-lg">
            {/* Home */}
            <button
              onClick={() => setCurrentScreen('home')}
              className={`flex flex-col items-center gap-1 cursor-pointer transition py-1 px-2 ${
                currentScreen === 'home' ? 'text-teal-700 font-semibold' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="text-[10px]">خانه</span>
            </button>

            {/* Customers */}
            <button
              onClick={() => setCurrentScreen('customers')}
              className={`flex flex-col items-center gap-1 cursor-pointer transition py-1 px-2 ${
                currentScreen === 'customers' || currentScreen === 'customer_overview' ? 'text-teal-700 font-semibold' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Users className="w-5 h-5" />
              <span className="text-[10px]">مشتریان</span>
            </button>

            {/* Center Visit Action */}
            <button
              onClick={() => handleStartNewVisit()}
              className="w-11 h-11 -mt-4 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-md hover:bg-teal-700 active:scale-95 transition cursor-pointer"
              title="ثبت ویزیت جدید"
            >
              <PlusCircle className="w-5 h-5" />
            </button>

            {/* Opportunities (Phase 3 Deals) */}
            <button
              onClick={() => setCurrentScreen('opportunities')}
              className={`flex flex-col items-center gap-1 cursor-pointer transition relative py-1 px-2 ${
                currentScreen === 'opportunities' ? 'text-teal-700 font-semibold' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <TrendingUp className="w-5 h-5" />
              <span className="text-[10px]">معاملات</span>
              <span className="absolute 0 top-0.5 right-1 text-[8px] font-mono font-bold bg-slate-900 text-white w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {opportunities.filter(o => o.status === 'active').length}
              </span>
            </button>

            {/* Tasks / Followups */}
            <button
              onClick={() => setCurrentScreen('tasks')}
              className={`flex flex-col items-center gap-1 cursor-pointer transition py-1 px-2 ${
                currentScreen === 'tasks' ? 'text-teal-700 font-semibold' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <CalendarCheck className="w-5 h-5" />
              <span className="text-[10px]">پیگیری‌ها</span>
            </button>
          </nav>
        )}

        {/* Phase 2 Quick Add Customer Modal */}
        <QuickAddCustomerModal
          isOpen={showQuickAddModal}
          onClose={() => setShowQuickAddModal(false)}
          onSaveCustomer={handleSaveQuickCustomer}
          onSelectExisting={(cust) => {
            handleOpenCustomer(cust);
            setShowQuickAddModal(false);
          }}
          existingCustomers={customers}
        />

        {/* Phase 3 Quick Opportunity Creation Modal */}
        <QuickOpportunityModal
          isOpen={showQuickOppModal}
          onClose={() => setShowQuickOppModal(false)}
          customers={customers}
          existingOpportunities={opportunities}
          preSelectedCustomer={currentScreen === 'customer_overview' ? selectedCustomer : undefined}
          onOpportunityCreated={handleOpportunityCreated}
        />

        {/* Phase 3 Opportunity 360 Drawer / Modal */}
        {selectedOpportunity && (
          <Opportunity360Modal
            isOpen={selectedOpportunity !== null}
            opportunity={selectedOpportunity}
            customer={customers.find(c => c.id === selectedOpportunity.customerId)}
            onClose={() => setSelectedOpportunity(null)}
            onUpdateOpportunity={handleUpdateOpportunity}
          />
        )}

        {/* Phase 2 Case Study Design Board Modal */}
        <Phase2ShowcaseModal
          isOpen={showCaseStudyModal}
          onClose={() => setShowCaseStudyModal(false)}
        />

        {/* Phase 3 Case Study Design Board Modal */}
        <Phase3ShowcaseModal
          isOpen={showPhase3Modal}
          onClose={() => setShowPhase3Modal(false)}
        />

        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 text-white px-4 py-2.5 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-2 text-xs font-bold animate-in fade-in slide-in-from-top-4 duration-200">
            <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
};
