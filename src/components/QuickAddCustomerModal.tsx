import React, { useState, useMemo } from 'react';
import { Customer, CustomerType, CustomerStatus, CustomerContact } from '../types';
import { X, Zap, MapPin, AlertTriangle, ArrowRight, CheckCircle2, User, Phone, Building2 } from 'lucide-react';

interface QuickAddCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  existingCustomers: Customer[];
  onSaveCustomer: (customer: Customer) => void;
  onSelectExisting: (customer: Customer) => void;
}

export const QuickAddCustomerModal: React.FC<QuickAddCustomerModalProps> = ({
  isOpen,
  onClose,
  existingCustomers,
  onSaveCustomer,
  onSelectExisting,
}) => {
  const [name, setName] = useState('');
  const [type, setType] = useState<CustomerType>('فروشگاه تأسیسات');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('تهران، منطقه ۳، ثبت خودکار موقعیت مکانی');
  const [ignoreDuplicate, setIgnoreDuplicate] = useState(false);

  // Real-time Duplicate Detection
  const duplicateMatch = useMemo(() => {
    if (!name.trim() && !phone.trim()) return null;
    const cleanName = name.trim().toLowerCase();
    const cleanPhone = phone.trim();

    return existingCustomers.find((c) => {
      const matchName = cleanName.length >= 3 && c.name.toLowerCase().includes(cleanName);
      const matchPhone = cleanPhone.length >= 8 && c.phone.includes(cleanPhone);
      return matchName || matchPhone;
    });
  }, [name, phone, existingCustomers]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newContact: CustomerContact = {
      id: `c-${Date.now()}`,
      name: contactName.trim() || 'مدیریت / تصمیم‌گیرنده',
      role: type.includes('فروشگاه') ? 'مالک' : 'کارفرما',
      phone: phone.trim() || '۰۹۱۲۰۰۰۰۰۰۰',
      isDecisionMaker: true,
      priority: 'اصلی',
      relationship: 'مساعد',
    };

    const newCustomer: Customer = {
      id: `cust-${Date.now()}`,
      name: name.trim(),
      type: type,
      status: 'جدید',
      phone: phone.trim() || '۰۹۱۲۰۰۰۰۰۰۰',
      address: address,
      city: 'تهران',
      distanceKm: 0.1,
      lastActivity: 'ثبت سریع جدید (نیازمند تکمیل اطلاعات)',
      assignedSalesperson: 'علی رضایی',
      contacts: [newContact],
      decisionMaker: newContact,
      brands: ['کویر بسپار'],
      annualPurchaseRange: 'در حال ارزیابی اولیه',
      image: type.includes('فروشگاه')
        ? 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80'
        : 'https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?auto=format&fit=crop&w=600&q=80',
      coordinates: { lat: 35.75, lng: 51.4 },
      timeline: [
        {
          id: `t-${Date.now()}`,
          date: 'امروز',
          time: 'هم‌اکنون',
          type: 'note',
          title: 'ثبت سریع مشتری میدانی (Quick Add)',
          description: `مشتری توسط بازاریاب در محل با حداقل اطلاعات ثبت شد. نیازمند تکمیل جزئیات تجاری در مراجعات آتی.`,
          actor: 'علی رضایی',
          badge: 'ثبت سریع',
        },
      ],
      openTasksCount: 1,
      pendingFollowupCount: 1,
      nextFollowup: {
        type: 'مراجعه و تکمیل پرونده تجاری',
        dueDate: 'فردا ۱۰:۰۰',
        time: '۱۰:۰۰',
        notes: 'مراجعه حضوری جهت ثبت برندهای موجود و تصمیم‌گیرنده',
      },
      isQuickCreated: true,
    };

    onSaveCustomer(newCustomer);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-teal-50 to-emerald-50 border-b border-teal-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-xs">
              <Zap className="w-4 h-4 fill-white" />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900">ثبت سریع مشتری (Quick Add)</h3>
              <p className="text-[11px] text-teal-800 font-medium">ثبت آنی در محل فروشگاه یا پروژه (زیر ۲۰ ثانیه)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-white/80 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto">
          {/* Duplicate Detection Alert */}
          {duplicateMatch && !ignoreDuplicate && (
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 space-y-2.5 animate-in fade-in duration-200">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="text-xs font-black text-amber-900 block">مشتری مشابه در سیستم پیدا شد!</span>
                  <p className="text-[11px] text-amber-800 leading-relaxed">
                    نام «<strong className="font-bold">{duplicateMatch.name}</strong>» با شماره یا آدرس ثبت شده در سیستم مطابقت دارد.
                  </p>
                </div>
              </div>

              <div className="bg-white/80 rounded-xl p-2.5 border border-amber-200/60 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900 block">{duplicateMatch.name}</span>
                  <span className="text-[10px] text-slate-500">
                    فاصله: {duplicateMatch.distanceKm || 1.2} ک.م • آخرین ویزیت: {duplicateMatch.lastActivity}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onSelectExisting(duplicateMatch);
                    onClose();
                  }}
                  className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  مشاهده پرونده
                </button>
              </div>

              <div className="flex items-center justify-between pt-1 text-[11px]">
                <button
                  type="button"
                  onClick={() => setIgnoreDuplicate(true)}
                  className="text-amber-800 hover:text-amber-950 font-bold underline cursor-pointer"
                >
                  این مشتری متفاوت است؛ ادامه ثبت مشتری جدید
                </button>
              </div>
            </div>
          )}

          {/* Customer Name */}
          <div>
            <label className="text-xs font-bold text-slate-800 block mb-1">
              نام فروشگاه یا عنوان پروژه <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="مثال: فروشگاه تاسیسات سینا یا پروژه برج باغ البرز"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-teal-500 outline-none transition"
            />
          </div>

          {/* Customer Type Selector */}
          <div>
            <label className="text-xs font-bold text-slate-800 block mb-1.5">نوع مشتری</label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {(
                [
                  'فروشگاه تأسیسات',
                  'پروژه ساختمانی',
                  'پیمانکار',
                  'شرکت ساختمانی',
                  'انبوه‌ساز',
                  'مهندس',
                  'مجری تأسیسات',
                  'مشتری دیگر',
                ] as CustomerType[]
              ).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={`px-3 py-2 rounded-xl text-right font-medium border transition cursor-pointer flex items-center justify-between ${
                    type === t
                      ? 'bg-teal-50 border-teal-500 text-teal-900 font-bold'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{t}</span>
                  {type === t && <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Person & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">
                نام فرد مخاطب / مالک / تصمیم‌گیرنده
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="مثال: مهندس رضوانی"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 pr-8 text-xs text-slate-900 focus:bg-white focus:border-teal-500 outline-none transition"
                />
                <User className="w-4 h-4 text-slate-400 absolute right-2.5 top-3" />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">شماره همراه تماس</label>
              <div className="relative">
                <input
                  type="tel"
                  placeholder="۰۹۱۲..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 pr-8 text-xs text-slate-900 focus:bg-white focus:border-teal-500 outline-none transition"
                  dir="ltr"
                />
                <Phone className="w-4 h-4 text-slate-400 absolute right-2.5 top-3" />
              </div>
            </div>
          </div>

          {/* Auto Location Banner */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-600">
              <MapPin className="w-4 h-4 text-teal-600 shrink-0" />
              <span className="text-[11px]">موقعیت GPS فعلی دستگاه پیوست شد (تهران، منطقه ۳)</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
              GPS Verified
            </span>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center gap-2.5">
            <button
              type="submit"
              className="flex-1 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-extrabold shadow-md shadow-teal-600/20 active:scale-98 transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>ثبت آنی و تکمیل در آینده</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer"
            >
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
