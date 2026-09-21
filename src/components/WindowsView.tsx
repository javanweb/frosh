import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  MapPin, 
  CheckSquare, 
  CalendarCheck, 
  BarChart3, 
  Settings, 
  Search, 
  Bell, 
  Filter, 
  Plus, 
  ArrowUpRight, 
  ChevronDown, 
  Calendar, 
  Eye, 
  ShieldCheck, 
  Clock, 
  Phone, 
  FileSpreadsheet, 
  Compass, 
  AlertTriangle,
  TrendingUp,
  UserCheck,
  Zap,
  Navigation,
  CheckCircle2,
  SlidersHorizontal,
  X,
  Send,
  Building2,
  Layers,
  Sparkles,
  Map as MapIcon
} from 'lucide-react';
import { WindowsScreen, Customer, Salesperson, TaskItem, Opportunity, UserAccount } from '../types';
import { INITIAL_CUSTOMERS, SALESPEOPLE_LIST, INITIAL_FOLLOWUPS, INITIAL_TASKS } from '../data/mockData';
import { INITIAL_OPPORTUNITIES } from '../data/mockOpportunities';
import { WindowsCustomer360 } from './WindowsCustomer360';
import { WindowsOpportunityPipeline } from './WindowsOpportunityPipeline';
import { WindowsOpportunity360 } from './WindowsOpportunity360';
import { QuickOpportunityModal } from './QuickOpportunityModal';
import { UserManagementModal } from './UserManagementModal';
import { Phase2ShowcaseModal } from './Phase2ShowcaseModal';
import { Phase3ShowcaseModal } from './Phase3ShowcaseModal';

interface WindowsViewProps {
  onSwitchToAndroid: () => void;
  onLogout: () => void;
}

export const WindowsView: React.FC<WindowsViewProps> = ({ onSwitchToAndroid, onLogout }) => {
  const [activeTab, setActiveTab] = useState<WindowsScreen>('dashboard');
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [opportunities, setOpportunities] = useState<Opportunity[]>(INITIAL_OPPORTUNITIES);
  const [salespeople, setSalespeople] = useState<Salesperson[]>(SALESPEOPLE_LIST);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>(INITIAL_CUSTOMERS[0]);
  const [selectedCustomerFor360, setSelectedCustomerFor360] = useState<Customer | null>(null);
  const [selectedOpportunityFor360, setSelectedOpportunityFor360] = useState<Opportunity | null>(null);
  const [selectedSalesperson, setSelectedSalesperson] = useState<Salesperson>(SALESPEOPLE_LIST[0]);
  const [dateRange, setDateRange] = useState('۱۴۰۳/۰۷/۰۱ - ۱۴۰۳/۰۷/۳۰');
  const [customerDrawerOpen, setCustomerDrawerOpen] = useState(false);
  const [quickTaskModal, setQuickTaskModal] = useState(false);
  const [showCaseStudyModal, setShowCaseStudyModal] = useState(false);
  const [showPhase3Modal, setShowPhase3Modal] = useState(false);
  const [showQuickOppModal, setShowQuickOppModal] = useState(false);
  const [showUserManagementModal, setShowUserManagementModal] = useState(false);
  const [activeMapPin, setActiveMapPin] = useState<string | null>('rep-1');
  const [searchFilterText, setSearchFilterText] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleInspectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setSelectedCustomerFor360(customer);
  };

  const handleUpdateOpportunity = (updated: Opportunity) => {
    setOpportunities(prev => prev.map(o => o.id === updated.id ? updated : o));
    setSelectedOpportunityFor360(updated);
    triggerToast(`فرصت فروش «${updated.name}» به‌روزرسانی شد.`);
  };

  const handleOpportunityCreated = (newOpp: Opportunity) => {
    setOpportunities(prev => [newOpp, ...prev]);
    setSelectedOpportunityFor360(newOpp);
    triggerToast(`فرصت فروش جدید «${newOpp.name}» با موفقیت ایجاد شد.`);
  };

  const handleSalespersonCreated = (newAccount: UserAccount, newSp: Salesperson) => {
    setSalespeople(prev => [...prev, newSp]);
    triggerToast(`بازاریاب جدید «${newAccount.fullName}» با نام کاربری «${newAccount.username}» فعال شد.`);
  };

  const handleAssignTaskFrom360 = (newTask: any) => {
    setTasks(prev => [newTask, ...prev]);
    if (selectedCustomerFor360) {
      const updatedCust: Customer = {
        ...selectedCustomerFor360,
        timeline: [
          {
            id: `tl-task-${Date.now()}`,
            date: 'هم‌اکنون',
            time: '14:30',
            type: 'task_created',
            title: `تخصیص وظیفه مدیریتی: ${newTask.title}`,
            description: `سررسید: ${newTask.dueDate} • بازاریاب مسئول: ${newTask.assignedTo}`,
            badge: 'در انتظار انجام',
            actor: 'مهندس یوسفی (مدیر فروش)',
            metadata: {
              dueDate: newTask.dueDate,
              isCompleted: false,
            },
          },
          ...(selectedCustomerFor360.timeline || []),
        ],
      };
      setSelectedCustomerFor360(updatedCust);
      setCustomers(prev => prev.map(c => c.id === updatedCust.id ? updatedCust : c));
    }
    triggerToast('ماموریت و پیگیری جدید در سامانه ثبت و به بازاریاب ابلاغ شد.');
  };

  return (
    <div className="min-h-[88vh] bg-slate-50 text-slate-900 flex flex-col md:flex-row overflow-hidden border border-slate-200 rounded-3xl shadow-xl m-3">
      {/* =======================================================
          WINDOWS SIDEBAR (Crisp Modern White Canvas)
         ======================================================= */}
      <aside className="w-full md:w-64 bg-white border-l border-slate-200 flex flex-col justify-between shrink-0 shadow-2xs">
        <div>
          {/* Brand Header */}
          <div className="p-4 border-b border-slate-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center font-black text-white text-base shadow-md shadow-teal-500/20">
              KB
            </div>
            <div>
              <h2 className="font-extrabold text-sm text-slate-900 tracking-tight">کویر بسپار</h2>
              <span className="text-[10px] text-teal-700 tracking-wider font-bold uppercase block">Sales Command Center</span>
            </div>
          </div>

          {/* Navigation Menu Items */}
          <nav className="p-2.5 space-y-1 text-xs">
            {[
              { id: 'dashboard', label: 'داشبورد مدیریت', icon: LayoutDashboard },
              { id: 'pipeline', label: 'معاملات و پایپ‌لاین', icon: TrendingUp },
              { id: 'customers', label: 'مشتریان و پرونده‌ها', icon: Users },
              { id: 'salespeople', label: 'تیم بازاریاب‌ها', icon: Briefcase },
              { id: 'visits', label: 'مراجعات و ویزیت‌ها', icon: CheckSquare },
              { id: 'followups', label: 'پیگیری‌های فروش', icon: CalendarCheck },
              { id: 'tasks', label: 'مدیریت وظایف', icon: CheckSquare },
              { id: 'map', label: 'مرکز نقشه و مناطق', icon: Compass },
              { id: 'reports', label: 'گزارش‌های تحلیلی', icon: BarChart3 },
              { id: 'settings', label: 'تنظیمات سیستم', icon: Settings },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as WindowsScreen)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold transition cursor-pointer ${
                    isActive
                      ? 'bg-teal-50 text-teal-800 border-r-4 border-teal-600 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-teal-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.id === 'pipeline' && (
                    <span className="text-[10px] px-2 py-0.2 rounded-full bg-teal-100 text-teal-800 font-bold font-mono">
                      {opportunities.filter(o => o.status === 'active').length}
                    </span>
                  )}
                  {item.id === 'followups' && (
                    <span className="text-[10px] px-2 py-0.2 rounded-full bg-rose-100 text-rose-800 font-bold font-mono">
                      ۱۲
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Management & Salesperson Simulator Links */}
        <div className="p-3 border-t border-slate-100 space-y-2 text-xs">
          {/* Admin User Management Button */}
          <button
            onClick={() => setShowUserManagementModal(true)}
            className="w-full py-2.5 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 transition flex items-center justify-between font-bold cursor-pointer shadow-2xs"
          >
            <span className="text-[11px] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>مدیریت بازاریاب‌ها و رمزها</span>
            </span>
            <span className="text-[10px] bg-amber-200/70 text-amber-950 px-1.5 py-0.2 rounded-md font-mono">
              {salespeople.length}
            </span>
          </button>

          <button
            onClick={onSwitchToAndroid}
            className="w-full py-2 px-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 hover:bg-teal-100 transition flex items-center justify-between font-bold cursor-pointer"
          >
            <span className="text-[11px]">تست اپلیکیشن موبایل بازاریاب</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-teal-600" />
          </button>

          <div className="flex items-center gap-2.5 p-2 bg-slate-50 rounded-xl border border-slate-200">
            <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs border border-teal-200">
              مدیر
            </div>
            <div className="overflow-hidden">
              <span className="text-xs font-bold text-slate-900 block truncate">مهندس یوسفی (admin)</span>
              <span className="text-[10px] text-slate-500 block">مدیریت عالی فروش و دسترسی‌ها</span>
            </div>
          </div>
        </div>
      </aside>

      {/* =======================================================
          MAIN DESKTOP CONTENT AREA (Light Luminous Executive)
         ======================================================= */}
      <main className="flex-1 flex flex-col bg-slate-50/70 overflow-y-auto">
        {/* Top Header Bar */}
        <header className="px-6 py-3 bg-white/95 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-20 backdrop-blur shadow-2xs">
          <div className="flex items-center gap-3">
            <h1 className="text-sm md:text-base font-black text-slate-900">
              {activeTab === 'dashboard' && 'داشبورد کنترل جامع فروش (Executive Command Center)'}
              {activeTab === 'pipeline' && 'پایپ‌لاین مدیریت معاملات و فرصت‌های فروش (Deal Flow)'}
              {activeTab === 'customers' && 'مدیریت و پرونده‌های ۳۶۰ درجه مشتریان'}
              {activeTab === 'salespeople' && 'مانیتورینگ زنده تیم بازاریاب‌های حضوری'}
              {activeTab === 'visits' && 'گزارش و تایم‌لاین مراجعات میدانی'}
              {activeTab === 'followups' && 'مرکز مدیریت پیگیری‌ها و هشدارهای معوق'}
              {activeTab === 'tasks' && 'ماتریس وظایف و ماموریت‌های فروش'}
              {activeTab === 'map' && 'مرکز عملیات جغرافیایی و پهنه‌بندی بازار'}
              {activeTab === 'reports' && 'گزارش‌های تحلیلی و شاخص‌های کلیدی'}
              {activeTab === 'settings' && 'پیکربندی ساختار سازمان و دسترسی‌ها'}
            </h1>
          </div>

          <div className="flex items-center gap-2.5 text-xs">
            {/* Live Team Indicator */}
            <div className="hidden lg:flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl text-emerald-800 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{salespeople.length} بازاریاب در میدان • ۴۲ ویزیت</span>
            </div>

            {/* User Management Quick Button */}
            <button 
              onClick={() => setShowUserManagementModal(true)}
              className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition shadow-2xs"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>تعریف بازاریاب</span>
            </button>

            {/* Phase 3 Case Study Design Board Button */}
            <button 
              onClick={() => setShowPhase3Modal(true)}
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer transition active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>برد طراحی فاز ۳</span>
            </button>

            {/* Quick Deal Button */}
            <button 
              onClick={() => setShowQuickOppModal(true)}
              className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>ثبت فرصت فروش</span>
            </button>
          </div>
        </header>

        {/* View Dynamic Body */}
        <div className="p-6 space-y-6">
          {/* =======================================================
              TAB 1: DASHBOARD
             ======================================================= */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* 4 Executive KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* KPI 1: Overdue */}
                <div className="bg-white border border-rose-200 rounded-3xl p-5 shadow-xs relative overflow-hidden">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-bold">پیگیری‌های عقب‌افتاده</span>
                    <span className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="mt-2 flex items-baseline justify-between">
                    <span className="text-3xl font-black text-rose-600">۱۲</span>
                    <span className="text-[11px] text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-lg font-bold">
                      نیازمند پیگیری فوری
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 mt-2 block">بیشترین تاخیر در منطقه ۲ تهران</span>
                </div>

                {/* KPI 2: Today Visits */}
                <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-bold">پیگیری و ویزیت امروز</span>
                    <span className="w-8 h-8 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                      <Clock className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="mt-2 flex items-baseline justify-between">
                    <span className="text-3xl font-black text-cyan-700">۳۸</span>
                    <span className="text-[11px] text-cyan-700 bg-cyan-50 border border-cyan-200 px-2.5 py-0.5 rounded-lg font-bold">
                      برنامه جاری
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 mt-2 block">۱۸ مورد تکمیل شده (۴۷٪ پیشرفت)</span>
                </div>

                {/* KPI 3: New Customers */}
                <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-bold">مشتریان جدید ثبت‌شده</span>
                    <span className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                      <Users className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="mt-2 flex items-baseline justify-between">
                    <span className="text-3xl font-black text-teal-700">۹۶</span>
                    <span className="text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-lg font-bold">
                      +۱۴٪ رشد ماهانه
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 mt-2 block">۵۴ فروشگاه، ۴۲ پروژه ساختمانی</span>
                </div>

                {/* KPI 4: Field Visits */}
                <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-bold">مراجعات حضوری امروز</span>
                    <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <CheckSquare className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="mt-2 flex items-baseline justify-between">
                    <span className="text-3xl font-black text-emerald-700">۴۲</span>
                    <span className="text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-lg font-bold">
                      میدانی فعال
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 mt-2 block">ثبت‌شده توسط ۶ بازاریاب در شهر</span>
                </div>
              </div>

              {/* Middle Section: Sales/Visit Trends & Customer Status */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Sales & Visit Trends Chart Representation */}
                <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900">روند فروش و مراجعات حضوری ماهانه</h3>
                      <p className="text-[11px] text-slate-500 mt-0.5">همبستگی تعداد ویزیت‌های موفق با حجم پیش‌فاکتورهای صادر شده</p>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="flex items-center gap-1.5 text-teal-700 font-bold">
                        <span className="w-2.5 h-2.5 rounded-full bg-teal-500" /> مراجعات حضوری
                      </span>
                      <span className="flex items-center gap-1.5 text-cyan-700 font-bold">
                        <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" /> حجم فروش (میلیارد تومان)
                      </span>
                    </div>
                  </div>

                  {/* SVG Chart Visualization */}
                  <div className="h-56 w-full bg-slate-50 rounded-2xl border border-slate-200 p-4 relative flex items-end justify-between gap-2">
                    {/* Background gridlines */}
                    <div className="absolute inset-x-0 top-1/4 border-b border-slate-200/80 pointer-events-none" />
                    <div className="absolute inset-x-0 top-2/4 border-b border-slate-200/80 pointer-events-none" />
                    <div className="absolute inset-x-0 top-3/4 border-b border-slate-200/80 pointer-events-none" />

                    {[
                      { week: 'هفته اول', visits: 38, sales: 48, label: '۴۸ م' },
                      { week: 'هفته دوم', visits: 54, sales: 62, label: '۶۲ م' },
                      { week: 'هفته سوم', visits: 42, sales: 55, label: '۵۵ م' },
                      { week: 'هفته چهارم', visits: 68, sales: 85, label: '۸۵ م' },
                      { week: 'هفته جاری', visits: 72, sales: 94, label: '۹۴ م' },
                    ].map((bar, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end z-10 group">
                        <div className="w-full flex items-end justify-center gap-1.5 h-full">
                          {/* Visits bar */}
                          <div
                            style={{ height: `${bar.visits}%` }}
                            className="w-4 md:w-6 bg-teal-500/80 rounded-t-md group-hover:bg-teal-600 transition"
                            title={`مراجعات: ${bar.visits}`}
                          />
                          {/* Sales bar */}
                          <div
                            style={{ height: `${bar.sales}%` }}
                            className="w-4 md:w-6 bg-cyan-500/80 rounded-t-md group-hover:bg-cyan-600 transition"
                            title={`حجم فروش: ${bar.label}`}
                          />
                        </div>
                        <span className="text-[10px] text-slate-500 font-bold whitespace-nowrap">{bar.week}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Customer Status Breakdown */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-xs">
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900">ترکیب پایگاه مشتریان</h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">وضعیت تفکیک ۳۸۰ مشتری ثبت‌شده</p>
                  </div>

                  <div className="space-y-3 pt-2">
                    {[
                      { label: 'مشتریان فعال (خرید مستمر)', count: 184, percent: 48, color: 'bg-emerald-500', text: 'text-emerald-700' },
                      { label: 'مشتریان در حال مذاکره', count: 96, percent: 25, color: 'bg-teal-500', text: 'text-teal-700' },
                      { label: 'لیدهای بالقوه (ویزیت اول)', count: 68, percent: 18, color: 'bg-cyan-500', text: 'text-cyan-700' },
                      { label: 'مشتریان راکد و معوق', count: 32, percent: 9, color: 'bg-rose-400', text: 'text-rose-700' },
                    ].map((item, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-700 font-bold">{item.label}</span>
                          <span className={`font-black ${item.text}`}>{item.count} ({item.percent}٪)</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full ${item.color}`} style={{ width: `${item.percent}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-teal-50/70 border border-teal-200 rounded-2xl text-[11px] text-teal-900 space-y-1">
                    <span className="font-bold block">تحلیل هوشمند مدیر:</span>
                    <p className="leading-relaxed">
                      ۲۵٪ مشتریان در مرحله صدور پیش‌فاکتور هستند. با پیگیری موثر در ۴۸ ساعت آینده نرخ تبدیل تا ۳۵٪ افزایش می‌یابد.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Section: Sales Team Leaderboard & Map Quickview */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Salespeople Real-Time Table */}
                <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900">عملکرد زنده بازاریابان میدانی</h3>
                      <p className="text-[11px] text-slate-500 mt-0.5">پایش آنلاین فعالیت، ویزیت‌های ثبت‌شده و تحقق هدف</p>
                    </div>
                    <button 
                      onClick={() => setActiveTab('salespeople')}
                      className="text-xs text-teal-700 hover:underline font-bold"
                    >
                      مشاهده جزییات تیم
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-right text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-500 font-bold">
                          <th className="pb-3 pr-2">بازاریاب</th>
                          <th className="pb-3">منطقه</th>
                          <th className="pb-3">وضعیت زنده</th>
                          <th className="pb-3">ویزیت امروز</th>
                          <th className="pb-3">تحقق هدف ماه</th>
                          <th className="pb-3 pl-2">عملیات</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {SALESPEOPLE_LIST.map((sp) => (
                          <tr key={sp.id} className="hover:bg-slate-50/80 transition">
                            <td className="py-3 pr-2 flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 flex items-center justify-center font-bold text-xs">
                                {sp.avatar}
                              </div>
                              <span className="font-extrabold text-slate-900">{sp.name}</span>
                            </td>
                            <td className="py-3 text-slate-600 font-medium">{sp.zone}</td>
                            <td className="py-3">
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                                sp.status === 'آنلاین'
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                  : sp.status === 'در حال ویزیت'
                                  ? 'bg-teal-50 text-teal-700 border-teal-200'
                                  : 'bg-cyan-50 text-cyan-700 border-cyan-200'
                              }`}>
                                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                                {sp.status}
                              </span>
                            </td>
                            <td className="py-3 font-bold text-slate-900">{sp.todayVisits} ویزیت</td>
                            <td className="py-3">
                              <div className="flex items-center gap-2">
                                <div className="h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden">
                                  <div className="h-full bg-teal-600" style={{ width: `${sp.monthlyAchievementPercent}%` }} />
                                </div>
                                <span className="font-bold text-slate-700">{sp.monthlyAchievementPercent}٪</span>
                              </div>
                            </td>
                            <td className="py-3 pl-2">
                              <button 
                                onClick={() => {
                                  setSelectedSalesperson(sp);
                                  setQuickTaskModal(true);
                                }}
                                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] cursor-pointer"
                              >
                                ارسال تسک
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Live Field Map Widget */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-extrabold text-slate-900">مرکز مانیتورینگ جغرافیایی</h3>
                      <span className="text-[10px] text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded-lg border border-teal-200">
                        Live GPS
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">پراکندگی بازاریابان و مراجعات فعال در تهران</p>
                  </div>

                  {/* Interactive Map Visual */}
                  <div className="h-56 bg-slate-100 rounded-2xl border border-slate-200 relative overflow-hidden flex items-center justify-center p-4">
                    {/* Stylized Grid & Map Paths */}
                    <div className="absolute inset-0 opacity-40">
                      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#cbd5e1" strokeWidth="0.8" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                        <path d="M 40 180 Q 150 100 280 140 T 400 60" fill="none" stroke="#0d9488" strokeWidth="2.5" strokeDasharray="4 4" />
                      </svg>
                    </div>

                    {/* Sales Rep Marker 1 (Ali Rezaei) */}
                    <div 
                      onClick={() => setActiveMapPin('rep-1')}
                      className="absolute top-1/4 right-1/3 cursor-pointer group"
                    >
                      <div className="relative flex items-center justify-center">
                        <span className="w-7 h-7 rounded-full bg-teal-500/20 animate-ping absolute" />
                        <div className="w-7 h-7 rounded-full bg-teal-600 text-white font-bold text-[10px] flex items-center justify-center shadow-md">
                          ع‌ر
                        </div>
                      </div>
                      <span className="text-[9px] font-bold bg-white text-slate-900 px-2 py-0.5 rounded-md shadow-xs border border-slate-200 absolute -bottom-5 right-1/2 translate-x-1/2 whitespace-nowrap">
                        علی رضایی (در حال ویزیت)
                      </span>
                    </div>

                    {/* Sales Rep Marker 2 */}
                    <div 
                      onClick={() => setActiveMapPin('rep-2')}
                      className="absolute bottom-1/3 left-1/4 cursor-pointer group"
                    >
                      <div className="w-6 h-6 rounded-full bg-cyan-600 text-white font-bold text-[10px] flex items-center justify-center shadow-md">
                        م‌ک
                      </div>
                      <span className="text-[9px] font-bold bg-white text-slate-900 px-2 py-0.5 rounded-md shadow-xs border border-slate-200 absolute -bottom-5 right-1/2 translate-x-1/2 whitespace-nowrap">
                        محمد کریمی (در مسیر)
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab('map')}
                    className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Compass className="w-4 h-4 text-teal-600" />
                    <span>ورود به اتاق فرمان نقشه (Full View)</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* =======================================================
              TAB 2: CUSTOMERS DIRECTORY (Phase 2 Enhanced 360 View)
             ======================================================= */}
          {activeTab === 'customers' && (
            selectedCustomerFor360 ? (
              <WindowsCustomer360
                customer={selectedCustomerFor360}
                tasks={tasks}
                onClose={() => setSelectedCustomerFor360(null)}
                onAssignTask={handleAssignTaskFrom360}
              />
            ) : (
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-black text-slate-900">بانک اطلاعاتی مشتریان و پروژه‌ها (Customer Directory)</h3>
                    <p className="text-xs text-slate-500">لیست جامع فروشگاه‌ها، پروژه‌های ساختمانی، ناظران و کارفرمایان کویر بسپار</p>
                  </div>

                  <div className="flex items-center gap-2 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                      <input
                        type="text"
                        placeholder="جستجو در نام، آدرس، تصمیم‌گیرنده یا صنف..."
                        value={searchFilterText}
                        onChange={(e) => setSearchFilterText(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 pr-9 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                      />
                      <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
                    </div>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 font-bold">
                        <th className="pb-3 pr-2">نام مشتری / پروژه</th>
                        <th className="pb-3">دسته‌بندی صنف</th>
                        <th className="pb-3">وضعیت ارتباط</th>
                        <th className="pb-3">برآورد خرید سالانه</th>
                        <th className="pb-3">بازاریاب مسئول</th>
                        <th className="pb-3">آخرین فعالیت</th>
                        <th className="pb-3 pl-2 text-center">پرونده ۳۶۰ درجه</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {customers.filter(c => 
                        c.name.includes(searchFilterText) || c.address.includes(searchFilterText) || (c.decisionMaker?.name && c.decisionMaker.name.includes(searchFilterText))
                      ).map((cust) => (
                        <tr key={cust.id} className="hover:bg-slate-50 transition">
                          <td className="py-3 pr-2">
                            <span className="font-extrabold text-slate-900 block">{cust.name}</span>
                            <span className="text-[10px] text-slate-500">{cust.address}</span>
                          </td>
                          <td className="py-3">
                            <span className="text-slate-700 font-medium">{cust.type}</span>
                          </td>
                          <td className="py-3">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                              cust.status === 'فعال'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : 'bg-amber-50 text-amber-700 border-amber-200'
                            }`}>
                              {cust.status}
                            </span>
                          </td>
                          <td className="py-3 font-bold text-slate-800">{cust.approximatePurchaseVolume || cust.annualPurchaseRange}</td>
                          <td className="py-3 text-slate-700">{cust.assignedSalesperson}</td>
                          <td className="py-3 text-slate-500">{cust.lastActivity}</td>
                          <td className="py-3 pl-2 text-center">
                            <button
                              onClick={() => handleInspectCustomer(cust)}
                              className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition cursor-pointer shadow-xs active:scale-95"
                            >
                              مشاهده پرونده ۳۶۰
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )
          )}

          {/* =======================================================
              TAB 3: SALESPEOPLE MONITORING
             ======================================================= */}
          {activeTab === 'salespeople' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-slate-900">مانیتورینگ جامع تیم بازاریاب‌ها</h3>
                  <p className="text-xs text-slate-500">پایش حضور در شیفت، میزان پیمایش، وضعیت باتری و تارگت ماهانه</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {SALESPEOPLE_LIST.map((sp) => (
                  <div key={sp.id} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-teal-50 border border-teal-200 text-teal-800 flex items-center justify-center font-black text-sm">
                          {sp.avatar}
                        </div>
                        <div>
                          <h4 className="font-extrabold text-slate-900 text-sm">{sp.name}</h4>
                          <span className="text-[11px] text-slate-500">{sp.roleTitle} • {sp.zone}</span>
                        </div>
                      </div>

                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {sp.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-xs py-2 bg-slate-50 rounded-2xl border border-slate-200">
                      <div>
                        <span className="text-[10px] text-slate-500 block">ویزیت امروز</span>
                        <span className="font-black text-slate-900 text-sm mt-0.5 block">{sp.todayVisits}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block">پیگیری‌ها</span>
                        <span className="font-black text-cyan-700 text-sm mt-0.5 block">{sp.todayFollowups}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block">مشتریان تحت پوشش</span>
                        <span className="font-black text-teal-700 text-sm mt-0.5 block">{sp.assignedCustomersCount}</span>
                      </div>
                    </div>

                    <div className="space-y-1 pt-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-600 font-bold">تحقق هدف فروش ماهانه:</span>
                        <span className="font-black text-teal-700">{sp.monthlyAchievementPercent}٪</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-teal-500 to-emerald-500" style={{ width: `${sp.monthlyAchievementPercent}%` }} />
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        setSelectedSalesperson(sp);
                        setQuickTaskModal(true);
                      }}
                      className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition cursor-pointer"
                    >
                      تخصیص ماموریت و وظیفه جدید
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =======================================================
              TAB 4: FIELD VISITS TIMELINE
             ======================================================= */}
          {activeTab === 'visits' && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
              <div>
                <h3 className="text-base font-black text-slate-900">تایم‌لاین زنده مراجعات میدانی</h3>
                <p className="text-xs text-slate-500">گزارش لحظه‌ای ثبت حضور، عکس تابلو، نتایج مذاکره و GPS بازاریاب‌ها</p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    salesperson: 'علی رضایی',
                    customer: 'فروشگاه تاسیسات دماوند (حاج علیخانی)',
                    time: '۱۰:۳۸ قبل از ظهر',
                    result: 'اعلام لیست قیمت جدید و کاتالوگ ۵ لایه تحویل شد. استعلام برای ۳۰۰ متر لوله سایز ۲۵.',
                    gpsVerified: true,
                    nextAction: 'ارسال پیش‌فاکتور فردا ساعت ۱۱',
                  },
                  {
                    salesperson: 'محمد کریمی',
                    customer: 'پروژه برج مسکونی باغ فردوس',
                    time: '۰۹:۴۵ قبل از ظهر',
                    result: 'مذاکره با مهندس ناظر تاسیسات (مهندس سعادتی). تایید کیفیت نمونه پلیمر کویر بسپار.',
                    gpsVerified: true,
                    nextAction: 'جلسه هماهنگی با مجری تاسیسات روز چهارشنبه',
                  },
                  {
                    salesperson: 'سعید محمدی',
                    customer: 'فروشگاه اتصالات لوله صادقی',
                    time: '۰۹:۱۰ قبل از ظهر',
                    result: 'تسویه فاکتور دوره قبل و درخواست تخفیف خرید نقدی پارت جدید.',
                    gpsVerified: true,
                    nextAction: 'بررسی سقف اعتبار مالی با واحد حسابداری',
                  },
                ].map((visit, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-900 text-xs">{visit.customer}</span>
                        <span className="text-[10px] text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200 font-bold">
                          ثبت توسط: {visit.salesperson}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500 font-medium">{visit.time}</span>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed bg-white p-2.5 rounded-xl border border-slate-200">
                      {visit.result}
                    </p>

                    <div className="flex items-center justify-between text-[11px] pt-1 text-slate-600">
                      <span className="flex items-center gap-1 text-emerald-700 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>موقعیت مکانی GPS تایید شد (دقت ۴ متر)</span>
                      </span>
                      <span className="text-teal-800 font-bold">
                        اقدام بعدی: {visit.nextAction}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =======================================================
              TAB 5: FOLLOW-UPS BOARD
             ======================================================= */}
          {activeTab === 'followups' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-black text-slate-900">مرکز نظارت بر پیگیری‌های فروش</h3>
                <p className="text-xs text-slate-500">پایش تعهدات معوق، پیگیری‌های امروز و برنامه‌های آتی</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Column 1: Overdue */}
                <div className="bg-rose-50/50 border border-rose-200 rounded-3xl p-4 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-rose-200">
                    <span className="font-extrabold text-rose-900 text-xs">معوق‌های با اولویت بالا (۱۲)</span>
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  </div>
                  <div className="space-y-2">
                    {INITIAL_FOLLOWUPS.filter(f => f.status === 'عقب‌افتاده').map((item) => (
                      <div key={item.id} className="bg-white border border-rose-200 rounded-2xl p-3 shadow-2xs space-y-1">
                        <span className="font-bold text-slate-900 text-xs block">{item.customerName}</span>
                        <p className="text-[11px] text-slate-600">{item.type} • مسئول: {item.salespersonName}</p>
                        <span className="text-[10px] text-rose-600 font-bold block pt-1">موعد: دیروز • نیاز به پیگیری</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column 2: Today */}
                <div className="bg-teal-50/50 border border-teal-200 rounded-3xl p-4 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-teal-200">
                    <span className="font-extrabold text-teal-900 text-xs">برنامه پیگیری امروز (۲۶)</span>
                    <span className="w-2 h-2 rounded-full bg-teal-500" />
                  </div>
                  <div className="space-y-2">
                    {INITIAL_FOLLOWUPS.filter(f => f.status === 'امروز').map((item) => (
                      <div key={item.id} className="bg-white border border-teal-200 rounded-2xl p-3 shadow-2xs space-y-1">
                        <span className="font-bold text-slate-900 text-xs block">{item.customerName}</span>
                        <p className="text-[11px] text-slate-600">{item.type} • ساعت {item.time}</p>
                        <span className="text-[10px] text-teal-700 font-bold block pt-1">مسئول: {item.salespersonName}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column 3: Upcoming */}
                <div className="bg-slate-100/60 border border-slate-200 rounded-3xl p-4 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <span className="font-extrabold text-slate-800 text-xs">برنامه‌های آینده (۴۵)</span>
                  </div>
                  <div className="space-y-2">
                    {INITIAL_FOLLOWUPS.filter(f => f.status === 'آینده').map((item) => (
                      <div key={item.id} className="bg-white border border-slate-200 rounded-2xl p-3 shadow-2xs space-y-1">
                        <span className="font-bold text-slate-900 text-xs block">{item.customerName}</span>
                        <p className="text-[11px] text-slate-600">{item.type} • تاریخ: {item.dueDate}</p>
                        <span className="text-[10px] text-slate-500 font-medium block pt-1">مسئول: {item.salespersonName}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =======================================================
              TAB 7: MAP COMMAND CENTER (Full Map Operations)
             ======================================================= */}
          {activeTab === 'map' && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-slate-900">مرکز عملیات جغرافیایی و مناطق بازاریابی</h3>
                  <p className="text-xs text-slate-500">پایش کلان مسیرهای فروش، پوشش اصناف و رهگیری زنده بازاریابان</p>
                </div>
              </div>

              {/* Full Scale Map Canvas */}
              <div className="h-[480px] bg-slate-100 rounded-2xl border border-slate-200 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 opacity-40">
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="grid-large" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#cbd5e1" strokeWidth="1" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid-large)" />
                    {/* Zone Boundary Polygons */}
                    <polygon points="60,60 300,40 280,240 80,200" fill="#0d9488" fillOpacity="0.08" stroke="#0d9488" strokeWidth="2" strokeDasharray="6 4" />
                    <polygon points="320,80 580,60 540,320 300,260" fill="#06b6d4" fillOpacity="0.08" stroke="#06b6d4" strokeWidth="2" strokeDasharray="6 4" />
                  </svg>
                </div>

                {/* Zone Labels */}
                <span className="absolute top-16 right-24 text-xs font-black text-teal-800 bg-white/90 px-3 py-1 rounded-xl shadow-xs border border-teal-200">
                  منطقه ۱ و ۳ (شمال تهران) • مسئول: علی رضایی
                </span>
                <span className="absolute top-20 left-32 text-xs font-black text-cyan-800 bg-white/90 px-3 py-1 rounded-xl shadow-xs border border-cyan-200">
                  منطقه ۲ و ۵ (غرب تهران) • مسئول: محمد کریمی
                </span>

                {/* Live Customer Pins */}
                {INITIAL_CUSTOMERS.map((cust, idx) => (
                  <div
                    key={cust.id}
                    onClick={() => handleInspectCustomer(cust)}
                    style={{
                      top: `${25 + (idx * 14)}%`,
                      right: `${20 + (idx * 16)}%`,
                    }}
                    className="absolute cursor-pointer group"
                  >
                    <div className="w-8 h-8 rounded-full bg-white border-2 border-teal-600 text-teal-800 shadow-md flex items-center justify-center font-bold text-[10px] group-hover:scale-110 transition">
                      {idx + 1}
                    </div>
                    <span className="text-[9px] font-bold bg-slate-900 text-white px-2 py-0.5 rounded-md shadow-xs absolute -bottom-5 right-1/2 translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">
                      {cust.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =======================================================
              TAB: PIPELINE (DEAL FLOW & SALES STAGES)
             ======================================================= */}
          {activeTab === 'pipeline' && (
            <WindowsOpportunityPipeline
              opportunities={opportunities}
              customers={customers}
              salespeople={salespeople}
              onSelectOpportunity={(opp) => setSelectedOpportunityFor360(opp)}
              onOpenQuickOpportunity={() => setShowQuickOppModal(true)}
            />
          )}

          {/* =======================================================
              TAB 6, 8, 9: TASKS, REPORTS, SETTINGS
             ======================================================= */}
          {(activeTab === 'tasks' || activeTab === 'reports' || activeTab === 'settings') && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
              <h3 className="text-base font-black text-slate-900">
                {activeTab === 'tasks' && 'ماتریس وظایف و تخصیص ماموریت'}
                {activeTab === 'reports' && 'گزارش‌های تحلیلی سهم بازار و نرخ تبدیل'}
                {activeTab === 'settings' && 'تنظیمات سازمانی و دسترسی‌های RBAC'}
              </h3>
              <p className="text-xs text-slate-500">
                این بخش به صورت ماژولار پیاده‌سازی شده و با تعاریف دسترسی کاربران و مدیریت فرصت‌های فروش یکپارچه است.
              </p>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-3">
                <span className="font-bold text-teal-800 block">دسترسی‌های سریع مدیریتی:</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setShowUserManagementModal(true)}
                    className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs cursor-pointer transition"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>تعریف و مدیریت بازاریاب‌ها (نام کاربری و رمز عبور)</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('pipeline')}
                    className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs cursor-pointer transition"
                  >
                    <TrendingUp className="w-4 h-4" />
                    <span>مشاهده پایپ‌لاین معاملات و پیش‌فاکتورها</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Windows Customer 360 Inspector Drawer */}
      {selectedCustomerFor360 && (
        <WindowsCustomer360
          customer={selectedCustomerFor360}
          onClose={() => setSelectedCustomerFor360(null)}
          onAssignTask={handleAssignTaskFrom360}
          tasks={tasks}
        />
      )}

      {/* Windows Opportunity 360 Full Modal */}
      {selectedOpportunityFor360 && (
        <WindowsOpportunity360
          opportunity={selectedOpportunityFor360}
          customer={customers.find(c => c.id === selectedOpportunityFor360?.customerId)}
          salespeople={salespeople}
          isOpen={selectedOpportunityFor360 !== null}
          onClose={() => setSelectedOpportunityFor360(null)}
          onUpdateOpportunity={handleUpdateOpportunity}
        />
      )}

      {/* Quick Opportunity Creation Modal */}
      <QuickOpportunityModal
        isOpen={showQuickOppModal}
        onClose={() => setShowQuickOppModal(false)}
        customers={customers}
        existingOpportunities={opportunities}
        onOpportunityCreated={handleOpportunityCreated}
      />

      {/* Admin User Management Modal (Salesperson username/password definitions) */}
      <UserManagementModal
        isOpen={showUserManagementModal}
        onClose={() => setShowUserManagementModal(false)}
        onSalespersonCreated={handleSalespersonCreated}
      />

      {/* Phase 2 Design Board Case Study Showcase Modal */}
      <Phase2ShowcaseModal
        isOpen={showCaseStudyModal}
        onClose={() => setShowCaseStudyModal(false)}
      />

      {/* Phase 3 Deal Flow Architecture & Board Showcase Modal */}
      <Phase3ShowcaseModal
        isOpen={showPhase3Modal}
        onClose={() => setShowPhase3Modal(false)}
      />

      {/* Floating System Toast */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-2.5 text-xs font-bold animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* =======================================================
          QUICK TASK ASSIGNMENT MODAL
         ======================================================= */}
      {quickTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-sm font-black text-slate-900">تخصیص ماموریت و وظیفه جدید</h3>
              <button 
                onClick={() => setQuickTaskModal(false)}
                className="p-1 text-slate-400 hover:text-slate-900 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">بازاریاب هدف:</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900">
                  {SALESPEOPLE_LIST.map(sp => (
                    <option key={sp.id}>{sp.name} ({sp.zone})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">نوع ماموریت:</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900">
                  <option>ویزیت حضوری فوری و اخذ سفارش</option>
                  <option>تحویل نمونه اتصالات ۵ لایه سایز ۳۲</option>
                  <option>پیگیری وصول چک فاکتور دوره قبل</option>
                  <option>مذاکره با مهندس ناظر پروژه جدید</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">یادداشت و دستور مدیر فروش:</label>
                <textarea 
                  rows={3}
                  placeholder="دستورالعمل‌های لازم برای مذاکره میدانی را بنویسید..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                />
              </div>

              <button
                onClick={() => {
                  setQuickTaskModal(false);
                  alert('ماموریت با موفقیت به اپلیکیشن موبایل بازاریاب ارسال شد.');
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-black text-xs shadow-md shadow-teal-600/20 cursor-pointer"
              >
                ارسال آنی تسک به گوشی بازاریاب
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
