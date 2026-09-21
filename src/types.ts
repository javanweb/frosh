export type UserRole = 'salesperson' | 'manager';

export type ViewExperience = 'android' | 'windows' | 'master_flow' | 'overview_board';

export type AndroidScreen = 
  | 'splash'
  | 'login'
  | 'home'
  | 'customers'
  | 'customer_overview'
  | 'opportunities'
  | 'opportunity_detail'
  | 'new_visit'
  | 'tasks'
  | 'notifications'
  | 'profile';

export type WindowsScreen =
  | 'dashboard'
  | 'pipeline'
  | 'customers'
  | 'salespeople'
  | 'visits'
  | 'followups'
  | 'tasks'
  | 'map'
  | 'reports'
  | 'settings';

export type CustomerType = 
  | 'فروشگاه تأسیسات' 
  | 'پروژه ساختمانی' 
  | 'پیمانکار' 
  | 'شرکت ساختمانی' 
  | 'انبوه‌ساز' 
  | 'مهندس' 
  | 'مجری تأسیسات' 
  | 'مشتری دیگر'
  | 'فروشگاه'
  | 'مهندس ناظر'
  | 'عمده‌فروش';

export type CustomerStatus = 'فعال' | 'بالقوه' | 'جدید' | 'در حال مذاکره' | 'راکد' | 'از دست رفته';

export interface CustomerContact {
  id: string;
  name: string;
  role: 'مالک' | 'مدیر' | 'کارفرما' | 'مهندس ناظر' | 'پیمانکار' | 'مجری تأسیسات' | 'تصمیم‌گیرنده نهایی' | 'سرپرست کارگاه' | 'مدیر تدارکات' | 'دیگر';
  phone: string;
  isDecisionMaker: boolean;
  priority: 'اصلی' | 'ثانویه';
  relationship: 'عالی' | 'مساعد' | 'خنثی' | 'سرد';
}

export type VisitResultType = 
  | 'خرید قطعی / ثبت سفارش'
  | 'درخواست قیمت و پیش‌فاکتور'
  | 'درخواست سمپل و نمونه'
  | 'نیازمند پیگیری تلفنی / جلسه'
  | 'عدم حضور تصمیم‌گیرنده'
  | 'عدم تمایل / رقیب غالب';

export type NextActionType = 
  | 'ارسال پیش‌فاکتور و لیست قیمت'
  | 'تماس تلفنی با تصمیم‌گیرنده'
  | 'ارسال نمونه و سمپل لوله'
  | 'مراجعه و جلسه حضوری مجدد'
  | 'بررسی سفارش در سیستم'
  | 'ارسال کاتالوگ دیجیتال';

export interface TimelineEvent {
  id: string;
  date: string;
  time: string;
  type: 'visit' | 'result' | 'followup_created' | 'task_created' | 'task_completed' | 'phone_call' | 'order' | 'note';
  title: string;
  description: string;
  badge?: string;
  actor: string;
  metadata?: {
    resultType?: string;
    nextAction?: string;
    brands?: string[];
    dueDate?: string;
    isCompleted?: boolean;
    contactName?: string;
  };
}

export interface Customer {
  id: string;
  name: string;
  type: CustomerType;
  status: CustomerStatus;
  phone: string;
  address: string;
  province?: string;
  city: string;
  distanceKm?: number;
  lastActivity: string;
  assignedSalesperson: string;
  ownershipHistory?: { date: string; salesperson: string; reason: string }[];
  contacts: CustomerContact[];
  decisionMaker: CustomerContact;
  
  // Store Specific (فروشگاه)
  existingBrands?: string[];
  competitorBrands?: string[];
  approximatePurchaseVolume?: string;
  usedProducts?: string[];
  preferredProducts?: string[];
  storePhoto?: string;
  
  // Project Specific (پروژه ساختمانی)
  projectStage?: 'فونداسیون و اسکلت' | 'سفت‌کاری' | 'تأسیسات مکانیکی' | 'نازک‌کاری' | 'بهره‌برداری';
  projectScale?: string;
  projectNeed?: string;
  projectSitePhoto?: string;

  // Shared
  brands: string[];
  annualPurchaseRange: string;
  image: string;
  coordinates: { lat: number; lng: number };
  timeline: TimelineEvent[];
  openTasksCount: number;
  pendingFollowupCount: number;
  nextFollowup?: {
    type: string;
    dueDate: string;
    time: string;
    notes: string;
  };
  lastVisitSummary?: {
    date: string;
    metWith: string;
    result: string;
    nextAction: string;
    brandObserved: string;
  };
  isQuickCreated?: boolean;
}

export interface TaskItem {
  id: string;
  customerId: string;
  customerName: string;
  title: string;
  type: 'تماس' | 'ارسال قیمت' | 'ارسال نمونه' | 'ویزیت مجدد' | 'بررسی سفارش' | 'جلسه';
  dueDate: string;
  time: string;
  priority: 'بالا' | 'متوسط' | 'عادی';
  status: 'باز' | 'انجام‌شده' | 'معوق';
  assignedSalesperson: string;
  sourceVisitId?: string;
  opportunityId?: string;
  opportunityName?: string;
  notes?: string;
}

export interface Salesperson {
  id: string;
  name: string;
  username?: string;
  password?: string;
  roleTitle: string;
  zone: string;
  phone: string;
  avatar: string;
  status: 'آنلاین' | 'در حال ویزیت' | 'در مسیر' | 'آفلاین';
  todayVisits: number;
  todayFollowups: number;
  assignedCustomersCount: number;
  pendingTasksCount: number;
  monthlyAchievementPercent: number;
  targetAmount?: string;
}

export interface UserAccount {
  id: string;
  username: string;
  password: string;
  role: UserRole;
  fullName: string;
  zone?: string;
  phone?: string;
  salespersonId?: string;
  targetAmount?: string;
  createdAt?: string;
}

export type SalesStage = 
  | 'new'
  | 'qualified'
  | 'interested'
  | 'price_discussion'
  | 'decision'
  | 'negotiation'
  | 'won'
  | 'lost';

export type OpportunityStatus = 'active' | 'won' | 'lost';

export type OpportunityPriority = 'high' | 'normal' | 'low';

export type OpportunitySource = 
  | 'visit' 
  | 'call' 
  | 'customer' 
  | 'followup' 
  | 'referral' 
  | 'existing_relationship' 
  | 'other';

export interface OpportunityTimelineEvent {
  id: string;
  date: string;
  time: string;
  type: 
    | 'created' 
    | 'stage_changed' 
    | 'visit' 
    | 'price_sent' 
    | 'call' 
    | 'note' 
    | 'task_completed' 
    | 'owner_changed' 
    | 'won' 
    | 'lost' 
    | 'reopened';
  title: string;
  description: string;
  actor: string;
  badge?: string;
  previousStage?: SalesStage;
  newStage?: SalesStage;
  metadata?: {
    potentialValue?: number;
    closeDate?: string;
    lostReason?: string;
    competitorName?: string;
    resultSummary?: string;
  };
}

export interface Opportunity {
  id: string;
  name: string;
  customerId: string;
  customerName: string;
  customerType: string;
  owner: string;
  ownerHistory: { date: string; previousOwner: string; newOwner: string; reason?: string }[];
  stage: SalesStage;
  status: OpportunityStatus;
  potentialValue: number;
  potentialValueFormatted: string;
  expectedCloseDate: string;
  priority: OpportunityPriority;
  source: OpportunitySource;
  sourceLabel: string;
  sourceVisitId?: string;
  winDetails?: { wonDate: string; finalValue?: string; notes?: string };
  lostDetails?: { 
    lostDate: string; 
    reason: 'competitor' | 'price' | 'no_demand' | 'delayed_project' | 'decision_maker' | 'customer_inactive' | 'other'; 
    reasonLabel: string; 
    competitorName?: string; 
    notes?: string;
  };
  reopenedAt?: string;
  nextAction: {
    type: string;
    title: string;
    dueDate: string;
    assignedTo: string;
    isOverdue?: boolean;
    notes?: string;
  };
  lastActivity: string;
  lastResultSummary?: string;
  timeline: OpportunityTimelineEvent[];
}

export interface SalesStageConfig {
  key: SalesStage;
  label: string;
  description: string;
  color: string;
  step: number;
  suggestedNextAction: string;
}

export interface VisitStep {
  step: number;
  title: string;
  key: 'smart_context' | 'who_met' | 'brands_stage' | 'result_trigger' | 'next_action';
}

export interface FollowUpItem {
  id: string;
  customerId?: string;
  customerName: string;
  type: 'تماس تلفنی' | 'مراجعه حضوری' | 'ارسال کاتالوگ' | 'صدور پیش‌فاکتور' | 'جلسه هماهنگی';
  dueDate: string;
  time: string;
  status: 'امروز' | 'آینده' | 'عقب‌افتاده' | 'انجام‌شده';
  salespersonName: string;
  priority: 'بالا' | 'متوسط' | 'عادی';
  notes?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timeAgo: string;
  type: 'urgent_followup' | 'new_task' | 'manager_broadcast' | 'visit_approved';
  isRead: boolean;
}

export interface ScreenConnectionMeta {
  screenId: string;
  screenTitle: string;
  role: 'بازاریاب' | 'مدیر' | 'مشترک';
  entryPoints: string[];
  accessibleData: string[];
  mainActions: string[];
  destinationAfterAction: string[];
  systemImpact: string[];
}
