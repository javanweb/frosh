import { Opportunity, SalesStage } from '../types';

const STORAGE_KEY = 'kavir_crm_opportunities_v1';

export const INITIAL_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'opp-1',
    name: 'تامین لوله ۵‌لایه PEX-AL-PEX پارت پاییزه',
    customerId: 'cust-1',
    customerName: 'فروشگاه تأسیسات احمدی',
    customerType: 'فروشگاه تأسیسات',
    owner: 'علی رضایی',
    ownerHistory: [
      { date: '۱۴۰۳/۰۶/۱۵', previousOwner: 'سیستم مرکزی', newOwner: 'علی رضایی', reason: 'تخصیص اولیه منطقه ۳' }
    ],
    stage: 'price_discussion',
    status: 'active',
    potentialValue: 480000000,
    potentialValueFormatted: '۴۸۰ میلیون تومان',
    expectedCloseDate: '۱۴۰۳/۰۷/۱۵',
    priority: 'high',
    source: 'visit',
    sourceLabel: 'مراجعه حضوری بازاریاب',
    sourceVisitId: 'v-101',
    nextAction: {
      type: 'تماس',
      title: 'پیگیری تایید لیست قیمت با تخفیف نقدی ۸٪',
      dueDate: '۱۴۰۳/۰۷/۰۷ (امروز)',
      assignedTo: 'علی رضایی',
      isOverdue: true,
      notes: 'حاج احمدی منتظر پاسخ مدیریت در مورد درصد تخفیف ویژه بود.'
    },
    lastActivity: 'ارسال پیش‌فاکتور رسمی — ۲ روز پیش',
    lastResultSummary: 'پیش‌فاکتور با مهلت اعتبار ۵ روزه برای مالک ارسال شد.',
    timeline: [
      {
        id: 'opt-101',
        date: '۲۱ شهریور',
        time: '۱۰:۳۰',
        type: 'visit',
        title: 'ویزیت حضوری و مذاکره با مالک فروشگاه',
        description: 'حاج احمد احمدی اعلام نیاز به ۲۰۰ کلاف لوله ۱۶ و ۲۰ پنج‌لایه کویر بسپار کرد.',
        actor: 'علی رضایی',
        badge: 'مراجعه میدانی'
      },
      {
        id: 'opt-102',
        date: '۲۱ شهریور',
        time: '۱۱:۱۵',
        type: 'created',
        title: 'ایجاد فرصت فروش جدید از نتیجه ویزیت',
        description: 'فرصت فروش با ارزش برآوردی ۴۸۰ میلیون تومان ثبت شد.',
        actor: 'علی رضایی',
        badge: 'ثبت فرصت'
      },
      {
        id: 'opt-103',
        date: '۲۲ شهریور',
        time: '۰۹:۴۰',
        type: 'stage_changed',
        title: 'انتقال مرحله: احراز صلاحیت ← علاقه‌مند به خرید',
        description: 'تایید حجم خرید و ظرفیت انبار فروشگاه.',
        actor: 'علی رضایی',
        previousStage: 'qualified',
        newStage: 'interested',
        badge: 'تغییر مرحله'
      },
      {
        id: 'opt-104',
        date: '۲۲ شهریور',
        time: '۱۴:۰۰',
        type: 'price_sent',
        title: 'صدور و ارسال پیش‌فاکتور رسمی شماره KB-9812',
        description: 'پیش‌فاکتور با احتساب کرایه حمل رایگان ارسال گردید.',
        actor: 'علی رضایی',
        badge: 'پیش‌فاکتور'
      },
      {
        id: 'opt-105',
        date: '۲۳ شهریور',
        time: '۱۰:۰۰',
        type: 'stage_changed',
        title: 'انتقال مرحله: علاقه‌مند ← بررسی قیمت و تخفیف',
        description: 'مشتری تقاضای ۲ درصد تخفیف مازاد برای تسویه ۳۰ روزه نمود.',
        actor: 'علی رضایی',
        previousStage: 'interested',
        newStage: 'price_discussion',
        badge: 'مذاکره قیمت'
      }
    ]
  },
  {
    id: 'opp-2',
    name: 'خرید اتصالات پرسی و کوپلی برنجی سایز ۱۶ تا ۳۲',
    customerId: 'cust-1',
    customerName: 'فروشگاه تأسیسات احمدی',
    customerType: 'فروشگاه تأسیسات',
    owner: 'علی رضایی',
    ownerHistory: [
      { date: '۱۴۰۳/۰۶/۲۰', previousOwner: 'سیستم مرکزی', newOwner: 'علی رضایی' }
    ],
    stage: 'qualified',
    status: 'active',
    potentialValue: 195000000,
    potentialValueFormatted: '۱۹۵ میلیون تومان',
    expectedCloseDate: '۱۴۰۳/۰۷/۲۵',
    priority: 'normal',
    source: 'existing_relationship',
    sourceLabel: 'مشتری وفادار',
    nextAction: {
      type: 'ارسال نمونه',
      title: 'تحویل سمپل اتصالات برنجی پرسی سنگین به آقای کمالی',
      dueDate: '۱۴۰۳/۰۷/۱۰',
      assignedTo: 'علی رضایی',
      isOverdue: false
    },
    lastActivity: 'معرفی کاتالوگ جدید اتصالات — دیروز',
    lastResultSummary: 'نمونه اورینگ‌های آب‌بندی با استقبال روبرو شد.',
    timeline: [
      {
        id: 'opt-201',
        date: '۲۳ شهریور',
        time: '۱۶:۰۰',
        type: 'created',
        title: 'ایجاد فرصت فروش فرعی برای اتصالات',
        description: 'در پی تمایل مشتری به تکمیل سبد اجناس خود در کنار لوله‌ها.',
        actor: 'علی رضایی',
        badge: 'سبد دوم'
      },
      {
        id: 'opt-202',
        date: '۲۴ شهریور',
        time: '۱۱:۲۰',
        type: 'note',
        title: 'ارزیابی موجودی انبار اتصالات رقبا',
        description: 'موجودی اتصالات سوپرپایپ در فروشگاه رو به اتمام است؛ فرصت مناسب جایگزینی.',
        actor: 'علی رضایی',
        badge: 'مشاهده میدانی'
      }
    ]
  },
  {
    id: 'opp-3',
    name: 'تجهیز کامل لوله‌کشی آب و گرمایش کف برج نیکان (۴۰ واحدی)',
    customerId: 'cust-2',
    customerName: 'پروژه مسکونی نیکان (۴۰ واحدی)',
    customerType: 'پروژه ساختمانی',
    owner: 'علی رضایی',
    ownerHistory: [
      { date: '۱۴۰۳/۰۶/۱۰', previousOwner: 'سیستم مرکزی', newOwner: 'علی رضایی' }
    ],
    stage: 'negotiation',
    status: 'active',
    potentialValue: 1250000000,
    potentialValueFormatted: '۱ میلیارد و ۲۵۰ میلیون تومان',
    expectedCloseDate: '۱۴۰۳/۰۷/۱۸',
    priority: 'high',
    source: 'visit',
    sourceLabel: 'ویزیت میدانی پروژه',
    sourceVisitId: 'v-201',
    nextAction: {
      type: 'جلسه',
      title: 'جلسه نهایی با کارفرما و مهندس ناظر جهت عقد قرارداد رسمی',
      dueDate: '۱۴۰۳/۰۷/۰۸ (فردا)',
      assignedTo: 'علی رضایی',
      isOverdue: false,
      notes: 'تاییدیه‌های فنی آزمون هیدرولیکی دانشگاه شریف به همراه آورده شود.'
    },
    lastActivity: 'تایید مدارک فنی توسط نظام مهندسی — ۳ روز پیش',
    lastResultSummary: 'مهندس ناظر تاییدیه کیفی لوله‌های کویر بسپار را ثبت کرد.',
    timeline: [
      {
        id: 'opt-301',
        date: '۱۵ شهریور',
        time: '۱۴:۰۰',
        type: 'created',
        title: 'شناسایی فرصت بزرگ پروژه برج ۴۰ واحدی',
        description: 'مذاکره اولیه با مهندس کاظمی سر کارگاه ساختمانی ونک.',
        actor: 'علی رضایی',
        badge: 'پروژه‌ای'
      },
      {
        id: 'opt-302',
        date: '۱۸ شهریور',
        time: '۱۰:۰۰',
        type: 'stage_changed',
        title: 'انتقال مرحله: احراز صلاحیت ← بررسی قیمت',
        description: 'متره و برآورد فنی متراژ لوله و تعداد کلکتورها انجام گرفت.',
        actor: 'علی رضایی',
        previousStage: 'qualified',
        newStage: 'price_discussion',
        badge: 'متره و برآورد'
      },
      {
        id: 'opt-303',
        date: '۲۲ شهریور',
        time: '۱۵:۳۰',
        type: 'stage_changed',
        title: 'انتقال مرحله: بررسی قیمت ← تصمیم‌گیری',
        description: 'قیمت رقابتی تایید شد؛ در انتظار تاییدیه هیئت مدیره سرمایه‌گذار.',
        actor: 'علی رضایی',
        previousStage: 'price_discussion',
        newStage: 'decision',
        badge: 'تایید هیئت مدیره'
      },
      {
        id: 'opt-304',
        date: '۲۴ شهریور',
        time: '۱۱:۴۵',
        type: 'stage_changed',
        title: 'انتقال مرحله: تصمیم‌گیری ← مذاکره نهایی (Negotiation)',
        description: 'توافق کلی حاصل شد، پیش‌نویس قرارداد ۳ مرحله‌ای تسویه ارسال گردید.',
        actor: 'علی رضایی',
        previousStage: 'decision',
        newStage: 'negotiation',
        badge: 'پیش‌نویس قرارداد'
      }
    ]
  },
  {
    id: 'opp-4',
    name: 'تامین دوره‌ای لوله‌های پوش‌فیت سایلنت و اتصالات فاضلابی',
    customerId: 'cust-3',
    customerName: 'فروشگاه لوله و اتصالات قائم',
    customerType: 'فروشگاه تأسیسات',
    owner: 'مهدی کریمی',
    ownerHistory: [
      { date: '۱۴۰۳/۰۶/۰۵', previousOwner: 'سیستم مرکزی', newOwner: 'مهدی کریمی' }
    ],
    stage: 'decision',
    status: 'active',
    potentialValue: 320000000,
    potentialValueFormatted: '۳۲۰ میلیون تومان',
    expectedCloseDate: '۱۴۰۳/۰۷/۲۰',
    priority: 'normal',
    source: 'call',
    sourceLabel: 'تماس بازاریاب',
    nextAction: {
      type: 'تماس',
      title: 'پیگیری تصمیم حاج رضا در مورد شرایط چک صیادی ۴۵ روزه',
      dueDate: '۱۴۰۳/۰۷/۰۹',
      assignedTo: 'مهدی کریمی',
      isOverdue: false
    },
    lastActivity: 'ویزیت حضوری شادآباد — ۲ روز پیش',
    lastResultSummary: 'مشتری در حال بررسی اعتبار چک‌های کارگاه‌های ساختمانی زیرمجموعه است.',
    timeline: [
      {
        id: 'opt-401',
        date: '۱۰ شهریور',
        time: '۰۹:۱۵',
        type: 'created',
        title: 'ثبت فرصت فروش پوش‌فیت سایلنت',
        description: 'نیاز فروشگاه به لوله‌های فاضلابی بی‌صدا جهت پروژه‌های لوکس منطقه ۲۲.',
        actor: 'مهدی کریمی',
        badge: 'پوش‌فیت'
      },
      {
        id: 'opt-402',
        date: '۱۶ شهریور',
        time: '۱۱:۳۰',
        type: 'stage_changed',
        title: 'انتقال مرحله به بررسی قیمت و تخفیف',
        description: 'ارسال لیست قیمت به همراه فرمت تخفیفات حجمی بالای ۵۰ شاخه.',
        actor: 'مهدی کریمی',
        previousStage: 'interested',
        newStage: 'price_discussion',
        badge: 'تخفیف حجمی'
      },
      {
        id: 'opt-403',
        date: '۲۲ شهریور',
        time: '۱۳:۰۰',
        type: 'stage_changed',
        title: 'انتقال مرحله به تصمیم‌گیری',
        description: 'توافق بر سر ارسال آزمایشی یک پارت ۱۰ شاخه‌ای همراه با اتصالات سه راهی و زانو.',
        actor: 'مهدی کریمی',
        previousStage: 'price_discussion',
        newStage: 'decision',
        badge: 'تصمیم‌گیری'
      }
    ]
  },
  {
    id: 'opp-5',
    name: 'تامین ۳۰۰۰ متر لوله پلی‌اتیلن سایز ۱۱۰ فشار ۱۰ بار پروژه‌ای',
    customerId: 'cust-4',
    customerName: 'شرکت ساختمانی سازه پایدار پارس',
    customerType: 'شرکت ساختمانی',
    owner: 'سعید محمدی',
    ownerHistory: [
      { date: '۱۴۰۳/۰۶/۰۱', previousOwner: 'سیستم مرکزی', newOwner: 'سعید محمدی' }
    ],
    stage: 'price_discussion',
    status: 'active',
    potentialValue: 650000000,
    potentialValueFormatted: '۶۵۰ میلیون تومان',
    expectedCloseDate: '۱۴۰۳/۰۷/۱۰',
    priority: 'high',
    source: 'referral',
    sourceLabel: 'معرفی شده توسط مهندس ناظر',
    nextAction: {
      type: 'ارسال قیمت',
      title: 'ارسال اصلاحیه پیش‌فاکتور با شرایط تحویل در محل کارگاه',
      dueDate: '۱۴۰۳/۰۷/۰۵ (معوق)',
      assignedTo: 'سعید محمدی',
      isOverdue: true,
      notes: 'تدارکات شرکت سازه پایدار در صورت عدم ارسال تا فردا از تولیدکننده دیگر خرید خواهد کرد.'
    },
    lastActivity: 'تماس مدیر تدارکات — ۳ روز پیش',
    lastResultSummary: 'درخواست بهینه‌سازی هزینه حمل و صدور گواهی استاندارد معتبر.',
    timeline: [
      {
        id: 'opt-501',
        date: '۲۵ مرداد',
        time: '۱۰:۰۰',
        type: 'created',
        title: 'ثبت استعلام شرکت ساختمانی سازه پایدار',
        description: 'خط انتقال آب صنعتی کارگاه و شهرک با لوله پلی‌اتیلن سنگین.',
        actor: 'سعید محمدی',
        badge: 'پلی‌اتیلن'
      },
      {
        id: 'opt-502',
        date: '۵ شهریور',
        time: '۱۵:۰۰',
        type: 'stage_changed',
        title: 'ارسال قیمت اولیه و شروع مذاکرات فنی',
        description: 'جلسه با مهندس کاظمی در دفتر مرکزی شرکت.',
        actor: 'سعید محمدی',
        previousStage: 'interested',
        newStage: 'price_discussion',
        badge: 'مذاکره فنی'
      }
    ]
  },
  {
    id: 'opp-6',
    name: 'تجهیز موتورخانه و تاسیسات پروژه بیمارستان تخصصی البرز',
    customerId: 'cust-2',
    customerName: 'پروژه بیمارستان تخصصی البرز',
    customerType: 'پروژه ساختمانی',
    owner: 'علی رضایی',
    ownerHistory: [
      { date: '۱۴۰۳/۰۴/۱۰', previousOwner: 'سیستم مرکزی', newOwner: 'علی رضایی' }
    ],
    stage: 'won',
    status: 'won',
    potentialValue: 2100000000,
    potentialValueFormatted: '۲ میلیارد و ۱۰۰ میلیون تومان',
    expectedCloseDate: '۱۴۰۳/۰۶/۱۵',
    priority: 'high',
    source: 'visit',
    sourceLabel: 'مراجعه میدانی',
    winDetails: {
      wonDate: '۱۴۰۳/۰۶/۱۸',
      finalValue: '۲ میلیارد و ۱۰۰ میلیون تومان',
      notes: 'قرارداد رسمی تحویل ۳ مرحله‌ای منعقد گردید و پیش‌پرداخت ۳۰ درصدی واریز شد.'
    },
    nextAction: {
      type: 'تماس',
      title: 'هماهنگی تحویل پارت دوم لوله‌ها سر پروژه',
      dueDate: '۱۴۰۳/۰۷/۱۵',
      assignedTo: 'علی رضایی',
      isOverdue: false
    },
    lastActivity: 'تحویل پارت اول لوله‌ها — هفته گذشته',
    timeline: [
      {
        id: 'opt-601',
        date: '۱۵ تیر',
        time: '۱۱:۰۰',
        type: 'created',
        title: 'شروع ارزیابی پروژه بیمارستان البرز',
        description: 'شناسایی پیمانکار تاسیسات مکانیکی پروژه.',
        actor: 'علی رضایی',
        badge: 'استعلام بزرگ'
      },
      {
        id: 'opt-602',
        date: '۱۸ شهریور',
        time: '۱۴:۰۰',
        type: 'won',
        title: 'معامله با موفقیت نهایی شد (WON)',
        description: 'تایید قرارداد با مبلغ ۲.۱ میلیارد تومان به نفع کویر بسپار.',
        actor: 'علی رضایی',
        badge: 'موفق'
      }
    ]
  },
  {
    id: 'opp-7',
    name: 'تامین تاسیسات برج تجاری سیمرغ',
    customerId: 'cust-4',
    customerName: 'برج تجاری سیمرغ سعادت‌آباد',
    customerType: 'پروژه ساختمانی',
    owner: 'سعید محمدی',
    ownerHistory: [
      { date: '۱۴۰۳/۰۴/۱۵', previousOwner: 'سیستم مرکزی', newOwner: 'سعید محمدی' }
    ],
    stage: 'lost',
    status: 'lost',
    potentialValue: 890000000,
    potentialValueFormatted: '۸۹۰ میلیون تومان',
    expectedCloseDate: '۱۴۰۳/۰۶/۰۱',
    priority: 'high',
    source: 'referral',
    sourceLabel: 'معرفی همکاران',
    lostDetails: {
      lostDate: '۱۴۰۳/۰۶/۰۵',
      reason: 'competitor',
      reasonLabel: 'انتخاب برند رقیب (سوپرپایپ)',
      competitorName: 'سوپرپایپ اینترنشنال',
      notes: 'رقیب تخفیف نقدی ۱۲ درصدی ارائه کرد و شرایط پرداخت ۶ ماهه را پذیرفت.'
    },
    nextAction: {
      type: 'تماس',
      title: 'پیگیری فاز دوم محوطه‌سازی برج در آبان ماه',
      dueDate: '۱۴۰۳/۰۸/۱۰',
      assignedTo: 'سعید محمدی',
      isOverdue: false
    },
    lastActivity: 'ثبت نتیجه مذاکره و دلیل انصراف — ۲۰ روز پیش',
    timeline: [
      {
        id: 'opt-701',
        date: '۱۵ تیر',
        time: '۱۰:۰۰',
        type: 'created',
        title: 'ثبت استعلام برج تجاری سیمرغ',
        description: 'برآورد متراژ لوله‌های پنج لایه و تاسیسات بهداشتی.',
        actor: 'سعید محمدی',
        badge: 'استعلام'
      },
      {
        id: 'opt-702',
        date: '۵ شهریور',
        time: '۱۶:۳۰',
        type: 'lost',
        title: 'فرصت فروش از دست رفت (LOST)',
        description: 'انتخاب برند سوپرپایپ به علت تخفیف بالاتر و چک مدت‌دار.',
        actor: 'سعید محمدی',
        badge: 'از دست رفته',
        metadata: {
          lostReason: 'انتخاب برند رقیب',
          competitorName: 'سوپرپایپ'
        }
      }
    ]
  }
];

export function getStoredOpportunities(): Opportunity[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_OPPORTUNITIES));
      return INITIAL_OPPORTUNITIES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_OPPORTUNITIES;
  } catch {
    return INITIAL_OPPORTUNITIES;
  }
}

export function saveOpportunities(opportunities: Opportunity[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(opportunities));
  } catch (e) {
    console.error('Failed to save opportunities', e);
  }
}

export function checkDuplicateOpportunity(customerId: string, newName: string, existingOpportunities: Opportunity[]): Opportunity | null {
  const activeForCustomer = existingOpportunities.filter(
    o => o.customerId === customerId && o.status === 'active'
  );
  if (activeForCustomer.length === 0) return null;

  // Check if any active opp has a matching keyword or title
  const cleanNew = newName.trim().toLowerCase();
  const found = activeForCustomer.find(o => {
    const cleanExisting = o.name.toLowerCase();
    if (cleanExisting.includes(cleanNew) || cleanNew.includes(cleanExisting)) return true;
    // Check keywords like لوله, اتصالات, پوش‌فیت, پلی‌اتیلن
    const keywords = ['لوله', 'اتصالات', 'پوش‌فیت', 'پلی‌اتیلن', 'گرمایش', '۵‌لایه', 'پنج‌لایه'];
    return keywords.some(k => cleanNew.includes(k) && cleanExisting.includes(k));
  });

  return found || null;
}
