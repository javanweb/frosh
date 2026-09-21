import { Customer, Salesperson, FollowUpItem, NotificationItem, ScreenConnectionMeta, TaskItem } from '../types';

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust-1',
    name: 'فروشگاه تأسیسات احمدی',
    type: 'فروشگاه تأسیسات',
    status: 'فعال',
    phone: '۰۹۱۲۳۴۵۶۷۸۹',
    address: 'تهران، خیابان شیرازی، پلاک ۴۲',
    province: 'تهران',
    city: 'تهران',
    distanceKm: 1.2,
    lastActivity: 'مراجعه حضوری - ۲ روز پیش',
    assignedSalesperson: 'علی رضایی',
    ownershipHistory: [
      { date: '۱۴۰۲/۰۶/۱۵', salesperson: 'علی رضایی', reason: 'تخصیص اولیه منطقه ۳' }
    ],
    contacts: [
      {
        id: 'c-101',
        name: 'حاج احمد احمدی',
        role: 'مالک',
        phone: '۰۹۱۲۳۴۵۶۷۸۹',
        isDecisionMaker: true,
        priority: 'اصلی',
        relationship: 'عالی'
      },
      {
        id: 'c-102',
        name: 'آقا مصطفی کمالی',
        role: 'مدیر',
        phone: '۰۹۱۲۹۹۹۸۸۷۷',
        isDecisionMaker: false,
        priority: 'ثانویه',
        relationship: 'مساعد'
      }
    ],
    decisionMaker: {
      id: 'c-101',
      name: 'حاج احمد احمدی',
      role: 'مالک',
      phone: '۰۹۱۲۳۴۵۶۷۸۹',
      isDecisionMaker: true,
      priority: 'اصلی',
      relationship: 'عالی'
    },
    existingBrands: ['کویر بسپار', 'نیوپایپ', 'آذین'],
    competitorBrands: ['سوپرپایپ', 'یزد پلیمر'],
    approximatePurchaseVolume: '۱.۵ تا ۲.۵ میلیارد تومان سالانه',
    usedProducts: ['لوله پنج‌لایه PEX-AL-PEX', 'اتصالات پرسی برنجی', 'لوله پلی‌اتیلن'],
    preferredProducts: ['اتصالات کوپلی فشار قوی', 'کلکتورهای مدولار'],
    storePhoto: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    brands: ['کویر بسپار', 'نیوپایپ', 'آذین'],
    annualPurchaseRange: '۱.۵ تا ۲.۵ میلیارد تومان',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    coordinates: { lat: 35.6892, lng: 51.3890 },
    openTasksCount: 1,
    pendingFollowupCount: 1,
    nextFollowup: {
      type: 'ارسال پیش‌فاکتور و لیست قیمت',
      dueDate: 'فردا ۱۰:۰۰',
      time: '۱۰:۰۰',
      notes: 'ارسال لیست قیمت لوله‌های پنج‌لایه به همراه درصد تخفیف ویژه نقدی'
    },
    lastVisitSummary: {
      date: '۲ روز پیش (۲۱ شهریور)',
      metWith: 'حاج احمد احمدی (مالک)',
      result: 'درخواست قیمت و پیش‌فاکتور',
      nextAction: 'ارسال پیش‌فاکتور و لیست قیمت',
      brandObserved: 'نیوپایپ و کویر بسپار'
    },
    timeline: [
      {
        id: 't-101',
        date: '۲۵ شهریور',
        time: '۱۴:۳۰',
        type: 'phone_call',
        title: 'تماس تلفنی با مالک',
        description: 'پیگیری تصمیم‌گیری در خصوص پیش‌فاکتور ارسالی؛ حاج آقا در حال بررسی شرایط پرداخت هستند.',
        actor: 'علی رضایی',
        badge: 'مذاکره قیمت'
      },
      {
        id: 't-102',
        date: '۲۲ شهریور',
        time: '۱۱:۰۰',
        type: 'task_completed',
        title: 'ارسال پیش‌فاکتور رسمی (تسک تکمیل شد)',
        description: 'پیش‌فاکتور شماره KB-402 به مبلغ ۳۴۰ میلیون تومان با تلگرام ارسال شد.',
        actor: 'علی رضایی',
        badge: 'تسک انجام شد'
      },
      {
        id: 't-103',
        date: '۲۱ شهریور',
        time: '۱۰:۴۵',
        type: 'followup_created',
        title: 'ایجاد خودکار پیگیری و تسک',
        description: 'پیگیری ارسال پیش‌فاکتور و لیست قیمت تا قبل از ۲۲ شهریور در سیستم ثبت گردید.',
        actor: 'سیستم CRM',
        badge: 'تولید تسک'
      },
      {
        id: 't-104',
        date: '۲۱ شهریور',
        time: '۱۰:۳۰',
        type: 'visit',
        title: 'مراجعه حضوری و بررسی قفسه‌ها',
        description: 'جلسه رو در رو با حاج احمدی؛ سهم بازار کویر بسپار در فروشگاه حدود ۳۵٪ برآورد شد. برند نیوپایپ رقیب اصلی است.',
        actor: 'علی رضایی',
        badge: 'ویزیت حضوری'
      }
    ]
  },
  {
    id: 'cust-2',
    name: 'پروژه مسکونی نیکان (۴۰ واحدی)',
    type: 'پروژه ساختمانی',
    status: 'در حال مذاکره',
    phone: '۰۹۱۲۹۸۷۶۵۴۳',
    address: 'تهران، نیاوران، خیابان مژده، بن‌بست کاج',
    province: 'تهران',
    city: 'تهران',
    distanceKm: 2.4,
    lastActivity: 'ارسال نمونه لوله ۵ لایه - دیروز',
    assignedSalesperson: 'علی رضایی',
    ownershipHistory: [
      { date: '۱۴۰۳/۰۱/۱۰', salesperson: 'علی رضایی', reason: 'معرفی از طریق نظام مهندسی' }
    ],
    contacts: [
      {
        id: 'c-201',
        name: 'مهندس نوید ملکی',
        role: 'کارفرما',
        phone: '۰۹۱۲۹۸۷۶۵۴۳',
        isDecisionMaker: true,
        priority: 'اصلی',
        relationship: 'مساعد'
      },
      {
        id: 'c-202',
        name: 'مهندس رضایی',
        role: 'مهندس ناظر',
        phone: '۰۹۱۲۵۵۵۴۴۳۳',
        isDecisionMaker: false,
        priority: 'اصلی',
        relationship: 'عالی'
      },
      {
        id: 'c-203',
        name: 'استاد کاظم قربانی',
        role: 'مجری تأسیسات',
        phone: '۰۹۱۹۳۳۳۲۲۱۱',
        isDecisionMaker: false,
        priority: 'ثانویه',
        relationship: 'خنثی'
      }
    ],
    decisionMaker: {
      id: 'c-201',
      name: 'مهندس نوید ملکی',
      role: 'کارفرما',
      phone: '۰۹۱۲۹۸۷۶۵۴۳',
      isDecisionMaker: true,
      priority: 'اصلی',
      relationship: 'مساعد'
    },
    projectStage: 'تأسیسات مکانیکی',
    projectScale: '۴۰ واحدی در ۸ طبقه - زیربنا ۶۸۰۰ مترمربع',
    projectNeed: 'نیاز به ۳۲۰۰ متر لوله ۵‌لایه، اتصالات پرسی و ۲۵۰۰ متر لوله فاضلابی سایلنت',
    projectSitePhoto: 'https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?auto=format&fit=crop&w=800&q=80',
    brands: ['کویر بسپار', 'سوپرپایپ'],
    annualPurchaseRange: '۳ تا ۵ میلیارد تومان',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?auto=format&fit=crop&w=800&q=80',
    coordinates: { lat: 35.8123, lng: 51.4678 },
    openTasksCount: 2,
    pendingFollowupCount: 2,
    nextFollowup: {
      type: 'جلسه هماهنگی و آزمون هیدرولیکی',
      dueDate: 'امروز ۱۲:۰۰',
      time: '۱۲:۰۰',
      notes: 'تحویل برگه تاییدیه استاندارد و نتایج آزمون فشار لوله‌ها به مهندس ناظر'
    },
    lastVisitSummary: {
      date: 'دیروز (۲۶ شهریور)',
      metWith: 'مهندس ملکی (کارفرما)',
      result: 'درخواست سمپل و نمونه',
      nextAction: 'ارسال نمونه و سمپل لوله',
      brandObserved: 'نمونه سوپرپایپ در کارگاه موجود است'
    },
    timeline: [
      {
        id: 't-201',
        date: '۲۶ شهریور',
        time: '۱۶:۰۰',
        type: 'visit',
        title: 'مراجعه حضوری به کارگاه پروژه',
        description: 'بازدید از رایزرهای طبقه ۳ و ۴ همراه با مهندس ناظر؛ سمپل کویر بسپار بررسی شد و مورد تایید اولیه قرار گرفت.',
        actor: 'علی رضایی',
        badge: 'ویزیت پروژه'
      },
      {
        id: 't-202',
        date: '۲۶ شهریور',
        time: '۱۶:۳۰',
        type: 'followup_created',
        title: 'ایجاد تسک تحویل تاییدیه فنی',
        description: 'تنظیم جلسه آزمون هیدرولیک و تحویل سرتیفیکیت استاندارد ملی.',
        actor: 'سیستم CRM',
        badge: 'پیگیری ثبت شد'
      }
    ]
  },
  {
    id: 'cust-3',
    name: 'فروشگاه لوله و اتصالات قائم',
    type: 'فروشگاه تأسیسات',
    status: 'فعال',
    phone: '۰۲۱۷۷۶۶۵۵۴۴',
    address: 'تهران، خیابان هنگام، جنب بانک ملی، پلاک ۱۱۸',
    province: 'تهران',
    city: 'تهران',
    distanceKm: 3.5,
    lastActivity: 'ثبت سفارش کاتالوگ جدید - ۳ روز پیش',
    assignedSalesperson: 'علی رضایی',
    contacts: [
      {
        id: 'c-301',
        name: 'سید رضا حسینی',
        role: 'مالک',
        phone: '۰۹۱۲۱۱۱۸۸۲۲',
        isDecisionMaker: true,
        priority: 'اصلی',
        relationship: 'عالی'
      }
    ],
    decisionMaker: {
      id: 'c-301',
      name: 'سید رضا حسینی',
      role: 'مالک',
      phone: '۰۹۱۲۱۱۱۸۸۲۲',
      isDecisionMaker: true,
      priority: 'اصلی',
      relationship: 'عالی'
    },
    existingBrands: ['کویر بسپار', 'پلیران', 'یزد پلیمر'],
    approximatePurchaseVolume: '۸۰۰ میلیون تا ۱.۵ میلیارد تومان',
    usedProducts: ['لوله و اتصالات پوش‌فیت', 'لوله پلی‌اتیلن'],
    storePhoto: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    brands: ['کویر بسپار', 'پلیران', 'یزد پلیمر'],
    annualPurchaseRange: '۸۰۰ میلیون تا ۱.۵ میلیارد',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    coordinates: { lat: 35.7532, lng: 51.4981 },
    openTasksCount: 0,
    pendingFollowupCount: 0,
    timeline: [
      {
        id: 't-301',
        date: '۲۴ شهریور',
        time: '۰۹:۱۵',
        type: 'order',
        title: 'ثبت سفارش خرید قطعی',
        description: 'سفارش نقدی اتصالات پوش‌فیت به ارزش ۱۲۵ میلیون تومان نهایی شد.',
        actor: 'علی رضایی',
        badge: 'سفارش قطعی'
      }
    ]
  },
  {
    id: 'cust-4',
    name: 'شرکت ساختمانی سازه پایدار پارس',
    type: 'پیمانکار',
    status: 'بالقوه',
    phone: '۰۲۱۸۸۹۹۰۰۱۱',
    address: 'تهران، سعادت‌آباد، علامه طباطبایی شمالی، برج سرو',
    province: 'تهران',
    city: 'تهران',
    distanceKm: 5.1,
    lastActivity: 'جلسه معرفی محصولات بسپار - هفته گذشته',
    assignedSalesperson: 'سعید محمدی',
    contacts: [
      {
        id: 'c-401',
        name: 'مهندس کاظمی',
        role: 'مدیر تدارکات',
        phone: '۰۹۱۲۲۲۲۹۹۴۴',
        isDecisionMaker: true,
        priority: 'اصلی',
        relationship: 'مساعد'
      },
      {
        id: 'c-402',
        name: 'دکتر صابری',
        role: 'کارفرما',
        phone: '۰۲۱۸۸۹۹۰۰۱۲',
        isDecisionMaker: true,
        priority: 'اصلی',
        relationship: 'خنثی'
      }
    ],
    decisionMaker: {
      id: 'c-401',
      name: 'مهندس کاظمی',
      role: 'مدیر تدارکات',
      phone: '۰۹۱۲۲۲۲۹۹۴۴',
      isDecisionMaker: true,
      priority: 'اصلی',
      relationship: 'مساعد'
    },
    projectStage: 'سفت‌کاری',
    projectScale: 'پیمانکار عمومی ۳ پروژه بیمارستانی و تجاری',
    projectNeed: 'تامین عمده لوله‌های پلی‌پروپیلن و پلی‌اتیلن فشار قوی',
    brands: ['سایر برندهای بازاری'],
    annualPurchaseRange: 'بیش از ۵ میلیارد تومان',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    coordinates: { lat: 35.7821, lng: 51.3712 },
    openTasksCount: 1,
    pendingFollowupCount: 1,
    nextFollowup: {
      type: 'صدور پیش‌فاکتور',
      dueDate: 'معوق (۳ روز تاخیر)',
      time: '۱۱:۰۰',
      notes: 'پیش‌فاکتور ۳۰۰۰ متر لوله پلی‌اتیلن سایز ۱۱۰ با گرید A'
    },
    timeline: [
      {
        id: 't-401',
        date: '۱۹ شهریور',
        time: '۱۴:۰۰',
        type: 'visit',
        title: 'جلسه در دفتر مرکزی پیمانکار',
        description: 'مذاکره با مدیر تدارکات و ارائه کاتالوگ‌های صنعتی کویر بسپار.',
        actor: 'سعید محمدی',
        badge: 'مذاکره سازمانی'
      }
    ]
  },
  {
    id: 'cust-5',
    name: 'دفتر مهندسی و نظارت مهندس معتمدی',
    type: 'مهندس',
    status: 'فعال',
    phone: '۰۹۱۲۰۱۱۲۲۳۳',
    address: 'تهران، میرداماد، میدان مادر، برج بیژن، طبقه ۴',
    province: 'تهران',
    city: 'تهران',
    distanceKm: 6.8,
    lastActivity: 'تاییدیه مشخصات فنی لوله‌های پلی‌اتیلن',
    assignedSalesperson: 'مهدی کریمی',
    contacts: [
      {
        id: 'c-501',
        name: 'دکتر ارسلان معتمدی',
        role: 'مهندس ناظر',
        phone: '۰۹۱۲۰۱۱۲۲۳۳',
        isDecisionMaker: true,
        priority: 'اصلی',
        relationship: 'عالی'
      }
    ],
    decisionMaker: {
      id: 'c-501',
      name: 'دکتر ارسلان معتمدی',
      role: 'مهندس ناظر',
      phone: '۰۹۱۲۰۱۱۲۲۳۳',
      isDecisionMaker: true,
      priority: 'اصلی',
      relationship: 'عالی'
    },
    brands: ['کویر بسپار'],
    annualPurchaseRange: 'طراح و تاییدکننده تاسیسات منطقه ۱ و ۳',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    coordinates: { lat: 35.7598, lng: 51.4390 },
    openTasksCount: 0,
    pendingFollowupCount: 0,
    timeline: [
      {
        id: 't-501',
        date: '۲۰ شهریور',
        time: '۱۱:۳۰',
        type: 'visit',
        title: 'ارائه مدارک آزمایشگاهی و تاییدیه وندورلیست',
        description: 'بررسی نتایج آزمون تست هیدرواستاتیک لوله‌های کویر بسپار توسط مهندس ناظر.',
        actor: 'مهدی کریمی',
        badge: 'وندورلیست'
      }
    ]
  }
];

export const INITIAL_TASKS: TaskItem[] = [
  {
    id: 'tsk-1',
    customerId: 'cust-1',
    customerName: 'فروشگاه تأسیسات احمدی',
    title: 'ارسال پیش‌فاکتور لوله‌های ۵‌لایه با تخفیف فصلی',
    type: 'ارسال قیمت',
    dueDate: '۱۴۰۳/۰۷/۰۸',
    time: '۱۰:۰۰',
    priority: 'بالا',
    status: 'باز',
    assignedSalesperson: 'علی رضایی',
    sourceVisitId: 'v-101',
    notes: 'حاج احمدی منتظر قیمت سایزهای ۱۶ تا ۳۲ است.'
  },
  {
    id: 'tsk-2',
    customerId: 'cust-2',
    customerName: 'پروژه مسکونی نیکان (۴۰ واحدی)',
    title: 'تحویل تاییدیه آزمون هیدرولیکی به مهندس ناظر',
    type: 'جلسه',
    dueDate: '۱۴۰۳/۰۷/۰۸',
    time: '۱۲:۰۰',
    priority: 'بالا',
    status: 'باز',
    assignedSalesperson: 'علی رضایی',
    sourceVisitId: 'v-201',
    notes: 'هماهنگی با مهندس رضایی سر پروژه'
  },
  {
    id: 'tsk-3',
    customerId: 'cust-4',
    customerName: 'شرکت ساختمانی سازه پایدار پارس',
    title: 'صدور پیش‌فاکتور ۳۰۰۰ متر لوله پلی‌اتیلن ۱۱۰',
    type: 'ارسال قیمت',
    dueDate: '۱۴۰۳/۰۷/۰۵',
    time: '۱۱:۰۰',
    priority: 'بالا',
    status: 'معوق',
    assignedSalesperson: 'سعید محمدی',
    sourceVisitId: 'v-401',
    notes: 'پیگیری تدارکات با مهندس کاظمی'
  }
];

export const SALESPEOPLE_LIST: Salesperson[] = [
  {
    id: 'sp-1',
    name: 'علی رضایی',
    roleTitle: 'سرپرست بازاریابی منطقه تهران',
    zone: 'منطقه ۱ و ۳ و ۴ تهران',
    phone: '۰۹۱۲۱۱۱۱۱۱۱',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    status: 'در حال ویزیت',
    todayVisits: 5,
    todayFollowups: 3,
    assignedCustomersCount: 86,
    pendingTasksCount: 4,
    monthlyAchievementPercent: 92
  },
  {
    id: 'sp-2',
    name: 'سعید محمدی',
    roleTitle: 'کارشناس فروش پروژه‌ای',
    zone: 'منطقه ۲ و ۵ تهران',
    phone: '۰۹۱۲۲۲۲۲۲۲۲',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    status: 'در مسیر',
    todayVisits: 4,
    todayFollowups: 5,
    assignedCustomersCount: 72,
    pendingTasksCount: 2,
    monthlyAchievementPercent: 88
  },
  {
    id: 'sp-3',
    name: 'مهدی کریمی',
    roleTitle: 'کارشناس توسعه بازار فروشگاهی',
    zone: 'بازار آهن شادآباد و جنوب تهران',
    phone: '۰۹۱۲۳۳۳۳۳۳۳',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    status: 'آنلاین',
    todayVisits: 6,
    todayFollowups: 2,
    assignedCustomersCount: 64,
    pendingTasksCount: 1,
    monthlyAchievementPercent: 95
  },
  {
    id: 'sp-4',
    name: 'رضا حدادی',
    roleTitle: 'بازاریاب میدانی لوله و اتصالات',
    zone: 'شرق تهران و دماوند',
    phone: '۰۹۱۲۴۴۴۴۴۴۴',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80',
    status: 'آنلاین',
    todayVisits: 3,
    todayFollowups: 4,
    assignedCustomersCount: 51,
    pendingTasksCount: 3,
    monthlyAchievementPercent: 79
  }
];

export const INITIAL_FOLLOWUPS: FollowUpItem[] = [
  {
    id: 'f-1',
    customerName: 'فروشگاه تاسیسات احمدی',
    type: 'تماس تلفنی',
    dueDate: '۱۴۰۳/۰۷/۰۸',
    time: '۱۰:۳۰',
    status: 'امروز',
    salespersonName: 'علی رضایی',
    priority: 'بالا',
    notes: 'بررسی دریافت لیست تخفیف فصلی لوله‌های کویر بسپار'
  },
  {
    id: 'f-2',
    customerName: 'پروژه مسکونی نیکان (۴۰ واحدی)',
    type: 'مراجعه حضوری',
    dueDate: '۱۴۰۳/۰۷/۰۸',
    time: '۱۲:۰۰',
    status: 'امروز',
    salespersonName: 'علی رضایی',
    priority: 'بالا',
    notes: 'تحویل تاییدیه آزمون‌های هیدرولیکی به مهندس ناظر'
  },
  {
    id: 'f-3',
    customerName: 'فروشگاه لوله و اتصالات قائم',
    type: 'ارسال کاتالوگ',
    dueDate: '۱۴۰۳/۰۷/۰۸',
    time: '۱۵:۰۰',
    status: 'امروز',
    salespersonName: 'علی رضایی',
    priority: 'متوسط',
    notes: 'ارسال کاتالوگ دیجیتال و نمونه جوش الکتروفیوژن'
  },
  {
    id: 'f-4',
    customerName: 'شرکت ساختمانی سازه پایدار پارس',
    type: 'صدور پیش‌فاکتور',
    dueDate: '۱۴۰۳/۰۷/۰۵',
    time: '۱۱:۰۰',
    status: 'عقب‌افتاده',
    salespersonName: 'سعید محمدی',
    priority: 'بالا',
    notes: 'پیش‌فاکتور ۳۰۰۰ متر لوله پلی‌اتیلن سایز ۱۱۰'
  },
  {
    id: 'f-5',
    customerName: 'دفتر مهندسی معتمدی',
    type: 'جلسه هماهنگی',
    dueDate: '۱۴۰۳/۰۷/۱۵',
    time: '۰۹:۳۰',
    status: 'آینده',
    salespersonName: 'مهدی کریمی',
    priority: 'متوسط',
    notes: 'پرزنت محصولات پلیمری جدید در جلسه نظام مهندسی'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n-1',
    title: 'هشدار پیگیری معوق',
    message: 'پیگیری پیش‌فاکتور شرکت سازه پایدار پارس ۳ روز تاخیر دارد.',
    timeAgo: '۲۰ دقیقه پیش',
    type: 'urgent_followup',
    isRead: false
  },
  {
    id: 'n-2',
    title: 'تخصیص مشتری جدید',
    message: 'پروژه ۶۰ واحدی ونک به سبد بازاریابی شما در منطقه ۱ اضافه شد.',
    timeAgo: '۲ ساعت پیش',
    type: 'new_task',
    isRead: false
  },
  {
    id: 'n-3',
    title: 'پیام مدیریت فروش',
    message: 'جلسه آنلاین بررسی هدف‌گذاری مهرماه فردا ساعت ۸:۳۰ صبح برگزار خواهد شد.',
    timeAgo: 'امروز صبح',
    type: 'manager_broadcast',
    isRead: true
  },
  {
    id: 'n-4',
    title: 'تایید ثبت مراجعه حضوری',
    message: 'ویزیت فروشگاه احمدی همراه با موقعیت مکانی GPS با موفقیت تایید و ثبت شد.',
    timeAgo: 'دیروز',
    type: 'visit_approved',
    isRead: true
  }
];

export const MASTER_PAGE_CONNECTIONS: ScreenConnectionMeta[] = [
  {
    screenId: 'login',
    screenTitle: 'صفحه ورود مشترک (Unified Login)',
    role: 'مشترک',
    entryPoints: ['لینک وب اپلیکیشن', 'آیکون اپ اندروید', 'نشست منقضی‌شده'],
    accessibleData: ['فرم نام کاربری', 'رمز عبور', 'شناسایی خودکار نقش (RBAC)'],
    mainActions: ['اعتبارسنجی ورود', 'بازیابی رمز عبور', 'هدایت بر اساس نقش'],
    destinationAfterAction: ['اگر بازاریاب باشد: Salesperson Daily Home', 'اگر مدیر باشد: Manager Command Dashboard'],
    systemImpact: ['ثبت لاگین در Audit Log سیستم', 'دریافت توکن امنیتی JWT', 'همگام‌سازی اعلان‌های معوق']
  },
  {
    screenId: 'android_home',
    screenTitle: 'مرکز فرماندهی روزانه بازاریاب (Daily Command Center)',
    role: 'بازاریاب',
    entryPoints: ['ورود موفق به سیستم', 'تب Home در Bottom Bar', 'بازگشت از صفحات فرزند'],
    accessibleData: ['سلام و هویت بازاریاب', 'آمار ۳ گانه امروز (مراجعات، پیگیری‌ها، عقب‌افتاده)', 'نقشه کوتاه مسیر روز', 'لیست مشتریان نزدیک'],
    mainActions: ['کلیک «شروع برنامه امروز»', 'انتخاب مشتری نزدیک جهت ویزیت', 'کلیک روی Quick Action مرکزی'],
    destinationAfterAction: ['صفحه New Visit (ثبت مراجعه)', 'صفحه جزئیات مشتری انتخابی', 'تب Tasks برای بازبینی'],
    systemImpact: ['فعال‌سازی مکان‌یابی برخط روزانه', 'ثبت زمان شروع شیفت میدانی بازاریاب']
  },
  {
    screenId: 'android_customers',
    screenTitle: 'دایرکتوری مشتریان (Customers Directory)',
    role: 'بازاریاب',
    entryPoints: ['تب مشتریان در Navigation Bar', 'لینک مشاهده همه مشتریان از Home'],
    accessibleData: ['موتور جستجوی سریع', 'فیلترهای طبقه‌بندی (فروشگاه، پروژه، پیمانکار)', 'کارت وضعیت و فاصله مکانی هر مشتری'],
    mainActions: ['جستجو بر اساس نام یا آدرس', 'فیلتر بر اساس صنف', 'کلیک روی مشتری جهت مشاهده پرونده', 'دکمه FAB برای ثبت مشتری جدید'],
    destinationAfterAction: ['ورود به Customer Overview', 'باز شدن فرم سریع ثبت مشتری جدید'],
    systemImpact: ['به‌روزرسانی کش محلی دستگاه جهت کارایی آفلاین']
  },
  {
    screenId: 'android_customer_overview',
    screenTitle: 'پروفایل جامع مشتری (Customer 360 Overview)',
    role: 'بازاریاب',
    entryPoints: ['کلیک روی کارت مشتری از لیست یا نقشه یا Home'],
    accessibleData: ['تصویر واحد تجاری/پروژه', 'نام و صنف', 'بج وضعیت (فعال/بالقوه)', 'اطلاعات تماس و نشانی', 'برندهای رقیب موجود', 'پتانسیل خرید سالانه'],
    mainActions: ['تماس تلفنی مستقیم', 'شروع ثبت ویزیت این مشتری', 'مسیریابی با نقشه', 'ثبت یادداشت یا پیگیری جدید'],
    destinationAfterAction: ['هدایت مستقیم به فرم New Visit با پر شدن خودکار مشتری', 'اپلیکیشن نقشه و مسیریاب', 'ثبت تسک پیگیری'],
    systemImpact: ['ثبت بازدید پروفایل در تایم‌لاین فعالیت مشتری']
  },
  {
    screenId: 'android_new_visit',
    screenTitle: 'فرآیند ثبت مراجعه حضوری (New Visit Multi-Step Flow)',
    role: 'بازاریاب',
    entryPoints: ['دکمه مرکزی FAB در Bottom Bar', 'دکمه «ثبت مراجعه» در صفحه Customer Overview'],
    accessibleData: ['استپر ۴ مرحله‌ای (اطلاعات > عکس و لوکیشن > نتیجه > پیگیری بعدی)', 'انتخاب مشتری', 'موقعیت GPS زنده دستگاه'],
    mainActions: ['تایید موقعیت مکانی GPS', 'عکس‌برداری از تابلوی فروشگاه/پروژه', 'ثبت نتیجه مذاکره و اقلام مورد نیاز', 'تعیین اقدام بعدی'],
    destinationAfterAction: ['اتمام و بازگشت به Home با ثبت پیام تایید', 'ایجاد خودکار پیگیری در تب Tasks'],
    systemImpact: ['افزایش شمارنده مراجعات امروز', 'ثبت پین ویزیت در داشبورد و نقشه مدیر فروش', 'تولید تسک زنجیره‌ای']
  },
  {
    screenId: 'windows_dashboard',
    screenTitle: 'داشبورد کنترل فروش مدیر (Executive Command Center)',
    role: 'مدیر',
    entryPoints: ['ورود مدیر سیستم', 'آیتم داشبورد در سایدبار'],
    accessibleData: ['۴ کارت KPI کلان (عقب‌افتاده‌ها، پیگیری امروز، مشتریان جدید، مراجعات امروز)', 'نمودار روند ماهانه فروش و ویزیت', 'نمودار دایره‌ای وضعیت مشتریان', 'ماتریس زنده عملکرد بازاریاب‌ها', 'نقشه جغرافیایی و فید آخرین فعالیت‌ها'],
    mainActions: ['تغییر بازه زمانی گزارش', 'کلیک روی هر بازاریاب برای دیدن عملکرد', 'کلیک روی هشدارهای عقب‌افتاده', 'خروجی اکسل و گزارش'],
    destinationAfterAction: ['هدایت به صفحات Salespeople یا Follow-ups یا Visits با فیلتر فعال'],
    systemImpact: ['محاسبه مجدد شاخص‌های کلیدی عملکرد تیم در لحظه']
  }
];
