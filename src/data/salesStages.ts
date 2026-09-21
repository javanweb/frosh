import { SalesStage, SalesStageConfig } from '../types';

export const SALES_STAGES: SalesStageConfig[] = [
  {
    key: 'new',
    label: 'فرصت جدید',
    description: 'سرنخ یا پتانسیل تازه شناسایی‌شده بدون ارزیابی عمیق',
    color: 'bg-slate-100 text-slate-700 border-slate-300',
    step: 1,
    suggestedNextAction: 'تماس تلفنی جهت ارزیابی اولیه و تعیین جلسه حضوری'
  },
  {
    key: 'qualified',
    label: 'احراز صلاحیت',
    description: 'پتانسیل خرید تایید شده و شخص تصمیم‌گیرنده مشخص است',
    color: 'bg-sky-50 text-sky-700 border-sky-200',
    step: 2,
    suggestedNextAction: 'ارسال کاتالوگ فنی و هماهنگی جلسه حضوری'
  },
  {
    key: 'interested',
    label: 'علاقه‌مندی به خرید',
    description: 'مشتری نیاز قطعی به لوله و اتصالات اعلام کرده است',
    color: 'bg-teal-50 text-teal-700 border-teal-200',
    step: 3,
    suggestedNextAction: 'ارسال لیست قیمت رسمی و شرایط تخفیف نقدی'
  },
  {
    key: 'price_discussion',
    label: 'بررسی قیمت و تخفیف',
    description: 'پیش‌فاکتور ارسال شده و در حال مقایسه با رقبا است',
    color: 'bg-amber-50 text-amber-700 border-amber-200',
    step: 4,
    suggestedNextAction: 'پیگیری تلفنی وضعیت تایید پیش‌فاکتور و رفع ابهامات'
  },
  {
    key: 'decision',
    label: 'مرحله تصمیم‌گیری',
    description: 'تصمیم‌گیرنده نهایی در حال انتخاب برند برای تایید خرید است',
    color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    step: 5,
    suggestedNextAction: 'مذاکره حضوری یا جلسه نهایی با تصمیم‌گیرنده اصلی'
  },
  {
    key: 'negotiation',
    label: 'مذاکره نهایی',
    description: 'توافق اولیه حاصل شده؛ نهایی‌سازی شرایط پرداخت و زمان تحویل',
    color: 'bg-purple-50 text-purple-700 border-purple-200',
    step: 6,
    suggestedNextAction: 'نهایی‌سازی شرایط تسویه حساب و صدور فاکتور قطعی'
  },
  {
    key: 'won',
    label: 'موفق (خرید قطعی)',
    description: 'معامله با موفقیت نهایی شد و قرارداد یا سفارش ثبت گردید',
    color: 'bg-emerald-50 text-emerald-700 border-emerald-300',
    step: 7,
    suggestedNextAction: 'هماهنگی تحویل بار و پیگیری رضایت مشتری'
  },
  {
    key: 'lost',
    label: 'ناموفق (از دست رفته)',
    description: 'مشتری از خرید منصرف شد یا از برند رقیب خرید کرد',
    color: 'bg-rose-50 text-rose-700 border-rose-300',
    step: 8,
    suggestedNextAction: 'ثبت دقیق دلیل عدم خرید جهت تحلیل و بررسی فعال‌سازی مجدد در آینده'
  }
];

export const STAGE_LABEL_MAP: Record<SalesStage, string> = {
  new: 'فرصت جدید',
  qualified: 'احراز صلاحیت',
  interested: 'علاقه‌مند به خرید',
  price_discussion: 'بررسی قیمت و تخفیف',
  decision: 'در حال تصمیم‌گیری',
  negotiation: 'مذاکره نهایی',
  won: 'موفق (Won)',
  lost: 'از دست رفته (Lost)'
};

export const SALES_STAGE_CONFIG: Record<SalesStage, { persianTitle: string; badgeBg: string; badgeText: string; border: string }> = {
  new: { persianTitle: 'فرصت جدید', badgeBg: 'bg-slate-100', badgeText: 'text-slate-700', border: 'border-slate-300' },
  qualified: { persianTitle: 'احراز صلاحیت', badgeBg: 'bg-sky-50', badgeText: 'text-sky-700', border: 'border-sky-200' },
  interested: { persianTitle: 'علاقه‌مند به خرید', badgeBg: 'bg-teal-50', badgeText: 'text-teal-700', border: 'border-teal-200' },
  price_discussion: { persianTitle: 'بررسی قیمت و تخفیف', badgeBg: 'bg-amber-50', badgeText: 'text-amber-700', border: 'border-amber-200' },
  decision: { persianTitle: 'در حال تصمیم‌گیری', badgeBg: 'bg-indigo-50', badgeText: 'text-indigo-700', border: 'border-indigo-200' },
  negotiation: { persianTitle: 'مذاکره نهایی', badgeBg: 'bg-purple-50', badgeText: 'text-purple-700', border: 'border-purple-200' },
  won: { persianTitle: 'موفق (Won)', badgeBg: 'bg-emerald-50', badgeText: 'text-emerald-700', border: 'border-emerald-300' },
  lost: { persianTitle: 'از دست رفته (Lost)', badgeBg: 'bg-rose-50', badgeText: 'text-rose-700', border: 'border-rose-300' }
};

export const LOST_REASONS = [
  { key: 'competitor', label: 'انتخاب برند رقیب (تخفیف یا شرایط پرداخت)' },
  { key: 'price', label: 'بالا بودن قیمت یا عدم توافق روی درصد تخفیف' },
  { key: 'no_demand', label: 'عدم نیاز فعلی یا تغییر نقشه تاسیسات' },
  { key: 'delayed_project', label: 'توقف یا تعویق پروژه ساختمانی' },
  { key: 'decision_maker', label: 'مخالفت تصمیم‌گیرنده نهایی یا مهندس ناظر' },
  { key: 'customer_inactive', label: 'عدم پاسخگویی یا قطع همکاری مشتری' },
  { key: 'other', label: 'سایر دلایل' }
] as const;

export function getStageConfig(stage: SalesStage): SalesStageConfig {
  const found = SALES_STAGES.find(s => s.key === stage);
  return found || SALES_STAGES[0];
}

export function getSmartNextAction(stage: SalesStage): { type: string; title: string; defaultDays: number } {
  switch (stage) {
    case 'new':
      return { type: 'تماس', title: 'تماس اولیه و ارزیابی پتانسیل پروژه', defaultDays: 1 };
    case 'qualified':
      return { type: 'جلسه', title: 'جلسه حضوری و ارائه کاتالوگ و نمونه اتصالات', defaultDays: 2 };
    case 'interested':
      return { type: 'ارسال قیمت', title: 'صدور و ارسال پیش‌فاکتور رسمی لوله و اتصالات', defaultDays: 1 };
    case 'price_discussion':
      return { type: 'تماس', title: 'پیگیری تلفنی وضعیت پیش‌فاکتور با تدارکات', defaultDays: 1 };
    case 'decision':
      return { type: 'جلسه', title: 'جلسه نهایی با کارفرما / مهندس ناظر پروژه', defaultDays: 2 };
    case 'negotiation':
      return { type: 'بررسی سفارش', title: 'تایید نهایی چک‌لیست اقلام و نحوه تسویه', defaultDays: 1 };
    case 'won':
      return { type: 'تماس', title: 'پیگیری بارگیری و تحویل سالم محصولات در پروژه', defaultDays: 3 };
    case 'lost':
      return { type: 'تماس', title: 'بررسی مجدد شرایط بازار در ماه آینده', defaultDays: 30 };
    default:
      return { type: 'تماس', title: 'پیگیری عادی مشتری', defaultDays: 2 };
  }
}
