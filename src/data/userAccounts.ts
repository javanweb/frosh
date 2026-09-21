import { UserAccount, UserRole } from '../types';

const STORAGE_KEY = 'kavir_crm_user_accounts_v1';

export const DEFAULT_USER_ACCOUNTS: UserAccount[] = [
  {
    id: 'user-admin',
    username: 'admin',
    password: 'admin',
    role: 'manager',
    fullName: 'مهندس یوسفی',
    zone: 'مدیریت کل فروش کشور',
    phone: '۰۹۱۲۰۰۰۰۰۰۰',
    createdAt: '۱۴۰۳/۰۱/۰۱'
  },
  {
    id: 'user-sp-1',
    username: 'rezaei',
    password: '1234',
    role: 'salesperson',
    fullName: 'علی رضایی',
    zone: 'منطقه ۱ و ۳ و ۴ تهران',
    phone: '۰۹۱۲۱۱۱۱۱۱۱',
    salespersonId: 'sp-1',
    targetAmount: '۱.۸ میلیارد تومان',
    createdAt: '۱۴۰۳/۰۲/۱۵'
  },
  {
    id: 'user-sp-2',
    username: 'mohammadi',
    password: '1234',
    role: 'salesperson',
    fullName: 'سعید محمدی',
    zone: 'منطقه ۲ و ۵ تهران',
    phone: '۰۹۱۲۲۲۲۲۲۲۲',
    salespersonId: 'sp-2',
    targetAmount: '۱.۵ میلیارد تومان',
    createdAt: '۱۴۰۳/۰۳/۰۱'
  },
  {
    id: 'user-sp-3',
    username: 'karimi',
    password: '1234',
    role: 'salesperson',
    fullName: 'مهدی کریمی',
    zone: 'بازار آهن شادآباد و جنوب تهران',
    phone: '۰۹۱۲۳۳۳۳۳۳۳',
    salespersonId: 'sp-3',
    targetAmount: '۲.۰ میلیارد تومان',
    createdAt: '۱۴۰۳/۰۳/۱۰'
  }
];

export function getStoredUserAccounts(): UserAccount[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_USER_ACCOUNTS));
      return DEFAULT_USER_ACCOUNTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_USER_ACCOUNTS;
  } catch {
    return DEFAULT_USER_ACCOUNTS;
  }
}

export function saveUserAccount(newAccount: UserAccount): UserAccount[] {
  const current = getStoredUserAccounts();
  // Check if username already exists
  const existsIndex = current.findIndex(a => a.username.toLowerCase() === newAccount.username.toLowerCase());
  let updated: UserAccount[];
  if (existsIndex >= 0) {
    updated = [...current];
    updated[existsIndex] = newAccount;
  } else {
    updated = [newAccount, ...current];
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to persist user accounts', e);
  }
  return updated;
}

export function authenticateUser(usernameInput: string, passwordInput: string): { user: UserAccount; role: UserRole } | null {
  const u = usernameInput.trim().toLowerCase();
  const p = passwordInput.trim();

  const accounts = getStoredUserAccounts();
  const match = accounts.find(a => a.username.toLowerCase() === u && a.password === p);

  if (match) {
    return { user: match, role: match.role };
  }

  // Exact fallback for admin / admin
  if (u === 'admin' && p === 'admin') {
    return { user: DEFAULT_USER_ACCOUNTS[0], role: 'manager' };
  }

  return null;
}
