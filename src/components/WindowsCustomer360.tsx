import React, { useState } from 'react';
import { Customer, CustomerContact, TimelineEvent, TaskItem } from '../types';
import { CustomerTimelineView } from './CustomerTimelineView';
import { 
  Building2, 
  MapPin, 
  Phone, 
  User, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ArrowLeft, 
  ChevronRight, 
  Plus, 
  Share2, 
  Check, 
  AlertCircle, 
  Tag, 
  Layers, 
  ShoppingBag,
  ExternalLink,
  ShieldCheck,
  UserCheck,
  FileText
} from 'lucide-react';

interface WindowsCustomer360Props {
  customer: Customer;
  onBack?: () => void;
  onClose?: () => void;
  onStartVisit?: (customer: Customer) => void;
  onAddTask?: (customer: Customer) => void;
  onAssignTask?: (task: any) => void;
  onCompleteTask?: (taskId: string) => void;
  tasks: TaskItem[];
}

export const WindowsCustomer360: React.FC<WindowsCustomer360Props> = ({
  customer,
  onBack,
  onClose,
  onStartVisit,
  onAddTask,
  onAssignTask,
  onCompleteTask,
  tasks,
}) => {
  const handleClose = onClose || onBack || (() => {});
  const [activeTab, setActiveTab] = useState<'timeline' | 'details' | 'ownership'>('timeline');

  const customerTasks = tasks.filter((t) => t.customerId === customer.id || t.customerName === customer.name);
  const isStore = customer.type.includes('فروشگاه');

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={handleClose}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer flex items-center gap-1 text-xs font-bold"
          >
            <ChevronRight className="w-4 h-4" />
            <span>بازگشت به دایرکتوری مشتریان</span>
          </button>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-slate-900">{customer.name}</span>
            <span className="text-[10px] text-teal-800 bg-teal-50 px-2 py-0.5 rounded-lg border border-teal-200 font-bold">
              {customer.type}
            </span>
            <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200 font-bold">
              وضعیت: {customer.status}
            </span>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2">
          {onStartVisit && (
            <button
              onClick={() => onStartVisit(customer)}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-extrabold shadow-sm shadow-teal-600/20 active:scale-98 transition flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>ثبت ویزیت حضوری</span>
            </button>
          )}

          {onAddTask && (
            <button
              onClick={() => onAddTask(customer)}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-teal-600" />
              <span>تخصیص ماموریت</span>
            </button>
          )}
        </div>
      </div>

      {/* 3-ZONE DESKTOP ARCHITECTURE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* =======================================================
            ZONE 1 (LEFT / COL 1-4): IDENTITY, PEOPLE, BUSINESS INFO
           ======================================================= */}
        <div className="lg:col-span-4 space-y-4">
          {/* Identity Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs space-y-3">
            {/* Visual Photo / Banner */}
            <div className="h-32 rounded-xl overflow-hidden relative border border-slate-100">
              <img
                src={customer.image || customer.storePhoto || customer.projectSitePhoto || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80'}
                alt={customer.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
              <div className="absolute bottom-2.5 right-3 text-white">
                <h2 className="text-xs font-black">{customer.name}</h2>
                <p className="text-[10px] text-slate-200">{customer.province || 'تهران'} • کد: {customer.id}</p>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-slate-700">
              <div className="flex items-start gap-1.5 bg-slate-50 p-2.5 rounded-xl border border-slate-100 leading-relaxed">
                <MapPin className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span className="text-[11px]">{customer.address}</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100 text-[11px]">
                <span className="text-slate-500">شماره تماس ثابت/همراه:</span>
                <span className="font-mono font-bold text-slate-900 dir-ltr">{customer.phone}</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100 text-[11px]">
                <span className="text-slate-500">کارشناس مسئول:</span>
                <span className="font-bold text-teal-800">{customer.assignedSalesperson || 'علی رضایی'}</span>
              </div>
            </div>
          </div>

          {/* People & Decision Maker Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-teal-600" />
                <span>افراد و تصمیم‌گیرندگان ({customer.contacts?.length || 1})</span>
              </span>
              <span className="text-[10px] text-slate-500">رابطه سازمانی</span>
            </div>

            {/* Decision Maker Spotlight */}
            {customer.decisionMaker && (
              <div className="p-3 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl border border-teal-200 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal-600" />
                    <span className="text-xs font-black text-teal-950">{customer.decisionMaker.name}</span>
                  </div>
                  <span className="text-[9px] font-extrabold text-teal-800 bg-teal-100/80 px-2 py-0.5 rounded-md">
                    تصمیم‌گیرنده نهایی
                  </span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-600 pt-0.5">
                  <span>سمت: {customer.decisionMaker.role}</span>
                  <span className="font-mono text-slate-800 dir-ltr font-bold">{customer.decisionMaker.phone}</span>
                </div>
              </div>
            )}

            {/* Other Contacts List */}
            <div className="space-y-1.5">
              {customer.contacts?.map((contact) => (
                <div
                  key={contact.id}
                  className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 flex items-center justify-between text-xs transition"
                >
                  <div>
                    <span className="font-bold text-slate-900 block text-[11px]">{contact.name}</span>
                    <span className="text-[10px] text-slate-500">{contact.role}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-[10px] text-slate-600 block dir-ltr">{contact.phone}</span>
                    <span className="text-[9px] text-emerald-700 font-bold">رابطه: {contact.relationship}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Business Specifics (Store or Project) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs space-y-3">
            <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-teal-600" />
              <span>{isStore ? 'اطلاعات تجاری و قفسه فروشگاه' : 'اطلاعات کارگاهی پروژه'}</span>
            </span>

            {isStore ? (
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 block mb-1">برندهای موجود در قفسه‌ها:</span>
                  <div className="flex flex-wrap gap-1">
                    {(customer.existingBrands || customer.brands || ['کویر بسپار', 'نیوپایپ']).map((b, i) => (
                      <span
                        key={i}
                        className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${
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

                <div className="pt-1">
                  <span className="text-[10px] text-slate-500 block">پتانسیل خرید سالانه:</span>
                  <span className="font-bold text-slate-900 text-xs">
                    {customer.approximatePurchaseVolume || customer.annualPurchaseRange || '۱ تا ۳ میلیارد تومان'}
                  </span>
                </div>

                <div className="pt-1">
                  <span className="text-[10px] text-slate-500 block">اقلام و محصولات پرمصرف:</span>
                  <span className="text-[11px] text-slate-700">لوله پنج‌لایه، اتصالات پرسی و پوش‌فیت</span>
                </div>
              </div>
            ) : (
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 block">مرحله پروژه:</span>
                  <span className="font-bold text-slate-900 text-xs bg-teal-50 text-teal-900 px-2 py-0.5 rounded-md border border-teal-200 inline-block">
                    {customer.projectStage || 'تأسیسات مکانیکی'}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-500 block">مقیاس پروژه:</span>
                  <span className="font-bold text-slate-800 text-xs">
                    {customer.projectScale || '۴۰ واحد در ۸ طبقه - زیربنا ۶۸۰۰ متر'}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-500 block">نیاز متریال:</span>
                  <span className="text-[11px] text-slate-700">
                    {customer.projectNeed || '۳۲۰۰ متر لوله پنج‌لایه و اتصالات پرسی'}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* =======================================================
            ZONE 2 (CENTER / COL 5-8): TIMELINE (HEART OF THE CRM)
           ======================================================= */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-xs font-black text-slate-900">تایم‌لاین زنده مشتری (Customer Timeline)</h3>
                <p className="text-[11px] text-slate-500">
                  تاریخچه یکپارچه: ویزیت‌ها، نتایج، تولید تسک و تماس‌ها
                </p>
              </div>

              <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-xl border border-teal-200">
                {customer.timeline?.length || 0} رویداد ثبت شده
              </span>
            </div>

            {/* Actual Connected Timeline Stream */}
            <CustomerTimelineView timeline={customer.timeline || []} />
          </div>
        </div>

        {/* =======================================================
            ZONE 3 (RIGHT / COL 9-12): STATUS, NEXT ACTION, OPEN TASKS
           ======================================================= */}
        <div className="lg:col-span-3 space-y-4">
          {/* Next Follow-up Alert Card */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50/60 border border-amber-200 rounded-2xl p-4 shadow-2xs space-y-2">
            <div className="flex items-center gap-2 text-amber-900">
              <Clock className="w-4 h-4 text-amber-600" />
              <span className="text-xs font-black">پیگیری بعدی تعیین‌شده</span>
            </div>

            {customer.nextFollowup ? (
              <div className="space-y-1.5 pt-1">
                <span className="text-xs font-bold text-slate-900 block">{customer.nextFollowup.type}</span>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">مهلت سررسید:</span>
                  <span className="font-bold text-amber-800 bg-white/90 px-2 py-0.5 rounded-lg border border-amber-200">
                    {customer.nextFollowup.dueDate}
                  </span>
                </div>
                {customer.nextFollowup.notes && (
                  <p className="text-[10px] text-slate-600 bg-white/70 p-2 rounded-xl border border-amber-100">
                    {customer.nextFollowup.notes}
                  </p>
                )}
              </div>
            ) : (
              <p className="text-[11px] text-slate-500">پیگیری فعالی برای این مشتری وجود ندارد.</p>
            )}
          </div>

          {/* Open Tasks for this Customer */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>تسک‌های باز ({customerTasks.length})</span>
              </span>
              {onAddTask && (
                <button
                  onClick={() => onAddTask(customer)}
                  className="text-[10px] font-bold text-teal-700 hover:underline cursor-pointer"
                >
                  + تسک جدید
                </button>
              )}
            </div>

            {customerTasks.length === 0 ? (
              <p className="text-[11px] text-slate-400 py-3 text-center">تمام تسک‌های این مشتری تکمیل شده‌اند.</p>
            ) : (
              <div className="space-y-2">
                {customerTasks.map((t) => (
                  <div
                    key={t.id}
                    className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 space-y-1.5 transition"
                  >
                    <div className="flex items-start justify-between gap-1">
                      <span className="text-xs font-bold text-slate-900 leading-tight">{t.title}</span>
                      {onCompleteTask && (
                        <button
                          onClick={() => onCompleteTask(t.id)}
                          title="علامت‌گذاری به عنوان انجام شده"
                          className="w-5 h-5 rounded-lg bg-white border border-slate-300 hover:border-emerald-500 hover:bg-emerald-50 text-slate-400 hover:text-emerald-700 flex items-center justify-center transition cursor-pointer shrink-0"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-500">
                      <span>مهلت: {t.dueDate}</span>
                      <span
                        className={`px-1.5 py-0.2 rounded font-bold ${
                          t.status === 'معوق'
                            ? 'bg-rose-50 text-rose-700'
                            : 'bg-teal-50 text-teal-800'
                        }`}
                      >
                        {t.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Ownership & Reassignment History */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs space-y-2 text-xs">
            <span className="font-bold text-slate-900 block text-xs">مالکیت و کارشناس پرونده</span>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-[11px]">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">کارشناس فعلی:</span>
                <span className="font-bold text-slate-900">{customer.assignedSalesperson || 'علی رضایی'}</span>
              </div>
              <p className="text-[10px] text-slate-400">
                قانون CRM: با تغییر کارشناس، تاریخچه تعاملات و تایم‌لاین دست‌نخورده باقی می‌ماند.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
