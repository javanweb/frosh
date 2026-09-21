import React, { useState } from 'react';
import { Customer, VisitResultType, NextActionType, CustomerContact, TimelineEvent, TaskItem } from '../types';
import { 
  CheckCircle2, 
  MapPin, 
  Navigation, 
  User, 
  Building2, 
  Clock, 
  Calendar, 
  ArrowLeft, 
  ArrowRight, 
  ChevronRight,
  AlertCircle, 
  Sparkles, 
  Send, 
  ShoppingBag, 
  Phone, 
  FileText,
  Package,
  Layers,
  Camera,
  Check
} from 'lucide-react';

interface GuidedVisitFlowProps {
  customer: Customer;
  onFinishVisit: (
    updatedCustomer: Customer,
    newTimelineEvent: TimelineEvent,
    newTask: TaskItem
  ) => void;
  onCancel: () => void;
}

export const GuidedVisitFlow: React.FC<GuidedVisitFlowProps> = ({
  customer,
  onFinishVisit,
  onCancel,
}) => {
  // Step tracker: 1 = Smart Context & Check-in, 2 = Who Met & Brands, 3 = Result (Trigger), 4 = Next Action & Follow-up
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Step 1: Check-in
  const [locationConfirmed, setLocationConfirmed] = useState<boolean>(true);

  // Step 2: Meeting details
  const [selectedContactId, setSelectedContactId] = useState<string>(
    customer.decisionMaker?.id || customer.contacts[0]?.id || ''
  );
  const [customContactName, setCustomContactName] = useState<string>('');
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    customer.existingBrands || customer.brands || ['کویر بسپار']
  );
  const [discussionNotes, setDiscussionNotes] = useState<string>('');
  const [projectStageObserved, setProjectStageObserved] = useState<string>(
    customer.projectStage || 'تأسیسات مکانیکی'
  );

  // Step 3: Result (Trigger)
  const [visitResult, setVisitResult] = useState<VisitResultType>('درخواست قیمت و پیش‌فاکتور');

  // Step 4: Next Action
  const [nextAction, setNextAction] = useState<NextActionType>('ارسال پیش‌فاکتور و لیست قیمت');
  const [dueDate, setDueDate] = useState<string>('فردا ساعت ۱۰:۰۰');
  const [actionNotes, setActionNotes] = useState<string>('');

  // Handle automatic smart recommendation when result changes
  const handleSelectResult = (result: VisitResultType) => {
    setVisitResult(result);
    switch (result) {
      case 'خرید قطعی / ثبت سفارش':
        setNextAction('بررسی سفارش در سیستم');
        setDueDate('امروز ساعت ۱۶:۰۰');
        break;
      case 'درخواست قیمت و پیش‌فاکتور':
        setNextAction('ارسال پیش‌فاکتور و لیست قیمت');
        setDueDate('فردا ساعت ۱۰:۰۰');
        break;
      case 'درخواست سمپل و نمونه':
        setNextAction('ارسال نمونه و سمپل لوله');
        setDueDate('۲ روز آینده');
        break;
      case 'نیازمند پیگیری تلفنی / جلسه':
        setNextAction('تماس تلفنی با تصمیم‌گیرنده');
        setDueDate('۳ روز آینده ساعت ۱۱:۰۰');
        break;
      case 'عدم حضور تصمیم‌گیرنده':
        setNextAction('مراجعه و جلسه حضوری مجدد');
        setDueDate('هفته آینده');
        break;
      case 'عدم تمایل / رقیب غالب':
        setNextAction('ارسال کاتالوگ دیجیتال');
        setDueDate('هفته آینده');
        break;
    }
  };

  const toggleBrand = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const handleComplete = () => {
    const metPerson = customer.contacts.find((c) => c.id === selectedContactId)?.name || customContactName || 'مالک / کارفرما';

    const newTimelineEvent: TimelineEvent = {
      id: `evt-${Date.now()}`,
      date: 'امروز (لحظاتی قبل)',
      time: 'هم‌اکنون',
      type: 'visit',
      title: `ویزیت حضوری • نتیجه: ${visitResult}`,
      description: `ملاقات با ${metPerson}. بررسی برندها: ${selectedBrands.join('، ')}. ${discussionNotes || 'مذاکرات با موفقیت ثبت شد.'}`,
      actor: customer.assignedSalesperson || 'علی رضایی',
      badge: visitResult.split('/')[0].trim(),
      metadata: {
        resultType: visitResult,
        nextAction: nextAction,
        dueDate: dueDate,
        brands: selectedBrands,
        contactName: metPerson,
      },
    };

    const newTask: TaskItem = {
      id: `tsk-${Date.now()}`,
      customerId: customer.id,
      customerName: customer.name,
      title: `${nextAction} (${metPerson})`,
      type: nextAction.includes('قیمت') ? 'ارسال قیمت' : nextAction.includes('نمونه') ? 'ارسال نمونه' : nextAction.includes('تماس') ? 'تماس' : 'ویزیت مجدد',
      dueDate: dueDate,
      time: '۱۰:۰۰',
      priority: 'بالا',
      status: 'باز',
      assignedSalesperson: customer.assignedSalesperson || 'علی رضایی',
      notes: actionNotes || `پیگیری خودکار از ویزیت امروز. نتیجه: ${visitResult}`,
    };

    const updatedCustomer: Customer = {
      ...customer,
      lastActivity: `ویزیت حضوری (${visitResult}) - امروز`,
      openTasksCount: customer.openTasksCount + 1,
      pendingFollowupCount: customer.pendingFollowupCount + 1,
      nextFollowup: {
        type: nextAction,
        dueDate: dueDate,
        time: '۱۰:۰۰',
        notes: actionNotes || `پیگیری مرتبط با ${visitResult}`,
      },
      lastVisitSummary: {
        date: 'امروز',
        metWith: metPerson,
        result: visitResult,
        nextAction: nextAction,
        brandObserved: selectedBrands.join('، '),
      },
      timeline: [newTimelineEvent, ...customer.timeline],
    };

    onFinishVisit(updatedCustomer, newTimelineEvent, newTask);
  };

  const isStore = customer.type.includes('فروشگاه');

  return (
    <div className="p-4 space-y-4 max-w-2xl mx-auto">
      {/* Progress Header */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-xs space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={onCancel}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div>
              <h3 className="text-xs font-black text-slate-900">ثبت ویزیت حضوری هدایت‌شده</h3>
              <p className="text-[10px] text-teal-700 font-semibold">{customer.name}</p>
            </div>
          </div>
          <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-xl">
            مرحله {currentStep} از ۴
          </span>
        </div>

        {/* Step Indicator Bar */}
        <div className="grid grid-cols-4 gap-1.5 pt-1">
          {[
            { step: 1, label: 'کانتکست هوشمند' },
            { step: 2, label: 'جلسه و برندها' },
            { step: 3, label: 'نتیجه (Trigger)' },
            { step: 4, label: 'اقدام بعدی و تسک' },
          ].map((s) => (
            <div key={s.step} className="space-y-1">
              <div
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentStep >= s.step ? 'bg-teal-600' : 'bg-slate-200'
                }`}
              />
              <span
                className={`text-[9px] block text-center truncate ${
                  currentStep === s.step ? 'text-teal-700 font-bold' : 'text-slate-400'
                }`}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* =======================================================
          STEP 1: SMART CONTEXT & PRE-VISIT BRIEFING
         ======================================================= */}
      {currentStep === 1 && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {/* Smart Briefing Card */}
          <div className="bg-gradient-to-br from-teal-50/80 via-white to-emerald-50/50 border border-teal-200 rounded-3xl p-4 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-teal-900">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <h4 className="text-xs font-black">اطلاعات پیش از جلسه (Smart Context)</h4>
            </div>
            <p className="text-[11px] text-teal-950 leading-relaxed">
              قبل از ورود به فروشگاه یا پروژه، آخرین وضعیت مشتری و مذاکرات قبلی را مرور کنید:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs">
              {/* Decision Maker */}
              <div className="bg-white/90 p-3 rounded-2xl border border-teal-100 shadow-2xs space-y-1">
                <span className="text-[10px] text-slate-500 font-medium block">تصمیم‌گیرنده نهایی:</span>
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900">{customer.decisionMaker?.name || 'حاج احمد احمدی'}</span>
                  <span className="text-[10px] text-teal-800 bg-teal-50 px-2 py-0.5 rounded-lg border border-teal-200 font-bold">
                    {customer.decisionMaker?.role || 'مالک'}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 dir-ltr block text-right font-mono">
                  {customer.decisionMaker?.phone || customer.phone}
                </span>
              </div>

              {/* Last Visit & Result */}
              <div className="bg-white/90 p-3 rounded-2xl border border-teal-100 shadow-2xs space-y-1">
                <span className="text-[10px] text-slate-500 font-medium block">آخرین مراجعه و نتیجه:</span>
                <span className="font-extrabold text-slate-900 block text-[11px]">
                  {customer.lastVisitSummary?.result || 'درخواست قیمت و پیش‌فاکتور'}
                </span>
                <span className="text-[10px] text-slate-500 block">
                  {customer.lastVisitSummary?.date || '۲ روز پیش'} • طرف مذاکره: {customer.lastVisitSummary?.metWith || 'مالک'}
                </span>
              </div>

              {/* Open Follow-up / Task */}
              <div className="bg-white/90 p-3 rounded-2xl border border-teal-100 shadow-2xs space-y-1 sm:col-span-2">
                <span className="text-[10px] text-slate-500 font-medium block">پیگیری باز و فعال:</span>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-[11px]">
                    {customer.nextFollowup?.type || 'ارسال پیش‌فاکتور لوله‌های ۵‌لایه'}
                  </span>
                  <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200 font-bold">
                    سررسید: {customer.nextFollowup?.dueDate || 'فردا'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* GPS Check-in */}
          <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">موقعیت مکانی حضور در محل</span>
                <span className="text-[11px] text-slate-500">فاصله شما از آدرس: کمتر از ۱۵ متر</span>
              </div>
            </div>
            <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              <span>حضور تایید شد</span>
            </span>
          </div>

          <button
            onClick={() => setCurrentStep(2)}
            className="w-full py-3.5 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl text-xs font-extrabold shadow-md shadow-teal-600/20 active:scale-98 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>شروع جلسه و گفتگو (Start Meeting)</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* =======================================================
          STEP 2: WHO DID YOU MEET & BRAND / STAGE CAPTURE
         ======================================================= */}
      {currentStep === 2 && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {/* Who did you meet? */}
          <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-xs space-y-3">
            <label className="text-xs font-black text-slate-900 block">
              با چه کسی گفتگو کردید؟ (Who did you meet?)
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {customer.contacts.map((contact) => (
                <button
                  key={contact.id}
                  type="button"
                  onClick={() => setSelectedContactId(contact.id)}
                  className={`p-3 rounded-2xl border text-right transition cursor-pointer flex items-center justify-between ${
                    selectedContactId === contact.id
                      ? 'bg-teal-50 border-teal-500 text-teal-950 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div>
                    <span className="text-xs block">{contact.name}</span>
                    <span className="text-[10px] text-slate-500">{contact.role}</span>
                  </div>
                  {contact.isDecisionMaker && (
                    <span className="text-[9px] text-teal-700 bg-teal-100/70 px-2 py-0.5 rounded-full font-bold">
                      تصمیم‌گیرنده
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="pt-1">
              <input
                type="text"
                placeholder="یا ثبت نام فرد جدید (مثلاً: مهندس کارگاهی جدید)..."
                value={customContactName}
                onChange={(e) => {
                  setCustomContactName(e.target.value);
                  setSelectedContactId('');
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white outline-none"
              />
            </div>
          </div>

          {/* Visual Brand Capture (For Store) OR Project Stage (For Project) */}
          {isStore ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-slate-900 block">
                  برندهای موجود در فروشگاه (Brand Capture):
                </label>
                <span className="text-[10px] text-slate-500">انتخاب چندگانه لمسی</span>
              </div>

              {/* Fast Visual Brand Pills */}
              <div className="flex flex-wrap gap-2">
                {[
                  'کویر بسپار',
                  'نیوپایپ',
                  'آذین لوله',
                  'سوپرپایپ',
                  'یزد پلیمر',
                  'پلیران اتصال',
                  'وحید',
                  'سایر برندها',
                ].map((brand) => {
                  const isSelected = selectedBrands.includes(brand);
                  const isKavir = brand === 'کویر بسپار';
                  return (
                    <button
                      key={brand}
                      type="button"
                      onClick={() => toggleBrand(brand)}
                      className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 border ${
                        isSelected
                          ? isKavir
                            ? 'bg-teal-600 text-white border-teal-600 shadow-sm shadow-teal-600/20'
                            : 'bg-slate-800 text-white border-slate-800'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span>{brand}</span>
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-xs space-y-3">
              <label className="text-xs font-black text-slate-900 block">مرحله پیشرفت پروژه ساختمانی:</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {['فونداسیون و اسکلت', 'سفت‌کاری', 'تأسیسات مکانیکی', 'نازک‌کاری'].map((stage) => (
                  <button
                    key={stage}
                    type="button"
                    onClick={() => setProjectStageObserved(stage)}
                    className={`p-2.5 rounded-2xl border text-right font-medium transition cursor-pointer ${
                      projectStageObserved === stage
                        ? 'bg-teal-50 border-teal-500 text-teal-950 font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {stage}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Discussion Notes */}
          <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-xs space-y-2">
            <label className="text-xs font-black text-slate-900 block">یادداشت مذاکرات و درخواست مشتری:</label>
            <textarea
              rows={3}
              placeholder="نکات مطرح شده، دغدغه‌های قیمت، تخفیف، سایزهای لوله مورد نیاز..."
              value={discussionNotes}
              onChange={(e) => setDiscussionNotes(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs text-slate-900 focus:bg-white outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-4 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl text-xs font-bold transition cursor-pointer"
            >
              مرحله قبل
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              className="flex-1 py-3.5 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl text-xs font-extrabold shadow-md shadow-teal-600/20 active:scale-98 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>تعیین نتیجه مذاکره (Visit Result)</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* =======================================================
          STEP 3: VISIT RESULT (TRIGGER)
         ======================================================= */}
      {currentStep === 3 && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-xs space-y-3">
            <div>
              <h4 className="text-xs font-black text-slate-900">نتیجه این مراجعه چه شد؟ (Visit Result)</h4>
              <p className="text-[11px] text-slate-500">
                نتیجه مراجعه یک ماشه (Trigger) برای فعال‌سازی اقدامات بعدی سیستم است:
              </p>
            </div>

            <div className="space-y-2">
              {(
                [
                  {
                    type: 'خرید قطعی / ثبت سفارش',
                    desc: 'توافق بر سر خرید نهایی و درخواست صدور پیش‌فاکتور رسمی برای پرداخت',
                    color: 'emerald',
                  },
                  {
                    type: 'درخواست قیمت و پیش‌فاکتور',
                    desc: 'مشتری لیست اقلام داد و منتظر استعلام قیمت با تخفیف فصلی است',
                    color: 'teal',
                  },
                  {
                    type: 'درخواست سمپل و نمونه',
                    desc: 'نیازمند بررسی کیفیت لوله ۵‌لایه، اتصالات پرسی یا آزمایش هیدرولیکی',
                    color: 'cyan',
                  },
                  {
                    type: 'نیازمند پیگیری تلفنی / جلسه',
                    desc: 'در حال بررسی توسط شرکا یا هیئت مدیره؛ نیازمند پیگیری در چند روز آتی',
                    color: 'indigo',
                  },
                  {
                    type: 'عدم حضور تصمیم‌گیرنده',
                    desc: 'تصمیم‌گیرنده نهایی حضور نداشت؛ نیازمند تنظیم مجدد زمان مراجعه',
                    color: 'amber',
                  },
                  {
                    type: 'عدم تمایل / رقیب غالب',
                    desc: 'تمایل به خرید ندارد؛ انبار از رقیب پر است یا قیمت رقیب پایین‌تر است',
                    color: 'rose',
                  },
                ] as { type: VisitResultType; desc: string; color: string }[]
              ).map((item) => (
                <button
                  key={item.type}
                  type="button"
                  onClick={() => handleSelectResult(item.type)}
                  className={`w-full p-3.5 rounded-2xl border text-right transition cursor-pointer space-y-1 ${
                    visitResult === item.type
                      ? 'bg-teal-50 border-teal-600 text-teal-950 shadow-xs'
                      : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold">{item.type}</span>
                    {visitResult === item.type && <CheckCircle2 className="w-4 h-4 text-teal-600" />}
                  </div>
                  <p className="text-[10px] text-slate-500 leading-relaxed">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-4 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl text-xs font-bold transition cursor-pointer"
            >
              مرحله قبل
            </button>
            <button
              onClick={() => setCurrentStep(4)}
              className="flex-1 py-3.5 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl text-xs font-extrabold shadow-md shadow-teal-600/20 active:scale-98 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>تعیین اقدام بعدی و تولید تسک (Next Action)</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* =======================================================
          STEP 4: NEXT ACTION & AUTO TASK GENERATION
         ======================================================= */}
      {currentStep === 4 && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-xs space-y-3">
            <div>
              <h4 className="text-xs font-black text-slate-900">حالا چه کاری باید انجام شود؟ (Next Action)</h4>
              <p className="text-[11px] text-slate-500">
                بر اساس نتیجه «{visitResult}»، سیستم اقدام بعدی را پیشنهاد داده است:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {(
                [
                  'ارسال پیش‌فاکتور و لیست قیمت',
                  'تماس تلفنی با تصمیم‌گیرنده',
                  'ارسال نمونه و سمپل لوله',
                  'مراجعه و جلسه حضوری مجدد',
                  'بررسی سفارش در سیستم',
                  'ارسال کاتالوگ دیجیتال',
                ] as NextActionType[]
              ).map((act) => (
                <button
                  key={act}
                  type="button"
                  onClick={() => setNextAction(act)}
                  className={`p-3 rounded-2xl border text-right font-medium transition cursor-pointer flex items-center justify-between ${
                    nextAction === act
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-950 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>{act}</span>
                  {nextAction === act && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
                </button>
              ))}
            </div>

            {/* Due Date Input */}
            <div className="pt-2">
              <label className="text-xs font-bold text-slate-800 block mb-1">مهلت سررسید پیگیری (Due Date):</label>
              <div className="relative">
                <input
                  type="text"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  placeholder="مثال: فردا ساعت ۱۰:۰۰"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 pr-8 text-xs text-slate-900 focus:bg-white outline-none"
                />
                <Calendar className="w-4 h-4 text-slate-400 absolute right-2.5 top-3" />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">یادداشت برای تسک بعدی:</label>
              <input
                type="text"
                value={actionNotes}
                onChange={(e) => setActionNotes(e.target.value)}
                placeholder="مثال: حتما درصد تخفیف ۳٪ نقدی قید شود..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:bg-white outline-none"
              />
            </div>
          </div>

          {/* Connected System Pipeline Card */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-4 shadow-xs space-y-2 text-xs">
            <div className="flex items-center gap-2 text-emerald-900 font-extrabold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>زنجیره ارتباطی سیستم که اکنون ثبت می‌شود:</span>
            </div>
            <div className="bg-white/80 p-3 rounded-2xl border border-emerald-200 text-[11px] text-emerald-950 space-y-1">
              <p>۱. ثبت ویزیت حضوری در پرونده ۳۶۰ مشتری</p>
              <p>۲. ثبت نتیجه «{visitResult}» در تایم‌لاین زنده</p>
              <p>۳. تولید خودکار تسک «{nextAction}» برای تاریخ {dueDate}</p>
              <p>۴. به‌روزرسانی شاخص‌های داشبورد مدیر و بازاریاب</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentStep(3)}
              className="px-4 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl text-xs font-bold transition cursor-pointer"
            >
              مرحله قبل
            </button>
            <button
              onClick={handleComplete}
              className="flex-1 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-black shadow-lg shadow-emerald-600/20 active:scale-98 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>ثبت نهایی ویزیت و فعال‌سازی زنجیره</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
