export type Language = 'hi' | 'en';

// Fixed Sanskrit performance day names - NEVER translate these
export type SanskritPerformanceDay =
  | 'Pratham'
  | 'Dutiya'
  | 'Tritiya'
  | 'Chaturthi'
  | 'Panchami'
  | 'Shashthi'
  | 'Saptami'
  | 'Ashtami'
  | 'Navami'
  | 'Dashami';

export type DayOrdinal =
  | '1st'
  | '2nd'
  | '3rd'
  | '4th'
  | '5th'
  | '6th'
  | '7th'
  | '8th'
  | '9th'
  | '10th';

export type SanskritWeekday =
  | 'Somvar'
  | 'Mangalvar'
  | 'Budhvar'
  | 'Guruvar'
  | 'Shukravar'
  | 'Shanivar'
  | 'Ravivar';

export type CollectionCategory = 'ACTOR' | 'COMMITTEE';

export type CommitteeSubCategory = 'धनराशि (Offline)' | 'धनराशि (Online)' | 'आरती' | string;

export type PaymentMode = 'Cash' | 'UPI / Online' | 'Aarti Plate' | 'Cheque' | string;

export interface CharacterMaster {
  id: string;
  orderIndex: number;
  characterNameHi: string; // e.g., "श्री राम"
  actorNameHi: string;     // e.g., "शौर्य जोशी"
  notes?: string;
  isActive: boolean;
}

export interface Contributor {
  id: string;
  fullName: string;        // Mandatory
  location: string;        // Mandatory (village/shop locality)
  designation?: string;
  shopOrBusinessName?: string;
  mobileNumber?: string;
  notes?: string;
}

export interface PerformanceSession {
  id: string;
  performanceDay: SanskritPerformanceDay; // Pratham..Dashami
  dayIndex: number;                       // 1..10
  dayOrdinal: DayOrdinal;                 // 1st..10th
  weekday: SanskritWeekday;               // Somvar..Ravivar
  performanceDate: string;                // YYYY-MM-DD
  updatedAt: string;
}

export interface TransactionLineItem {
  id: string;
  transactionId: string;
  characterId: string;
  characterNameHi: string;
  actorNameHi: string;
  amountPaise: number; // Stored strictly as integer paise (₹1 = 100 paise)
}

export interface Transaction {
  id: string;
  receiptNumber: string;
  category: CollectionCategory; // 'ACTOR' | 'COMMITTEE'
  performanceDay: SanskritPerformanceDay;
  dayIndex: number;             // 1..10
  dayOrdinal: DayOrdinal;
  weekday: SanskritWeekday;
  performanceDate: string;      // YYYY-MM-DD
  contributor: Contributor;
  // For Actor-Side
  amountEntryMode?: 'INDIVIDUAL' | 'COMMON';
  commonPerCharacterPaise?: number;
  lineItems: TransactionLineItem[];
  // For Committee-Side
  organizationName?: string;    // "Shri Ramleela Committee, Banbasa"
  committeeSubCategory?: CommitteeSubCategory;
  paymentMode: PaymentMode;
  totalAmountPaise: number;     // Strictly integer paise
  notes?: string;
  isDemo?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'RESTORE_DEMO' | 'IMPORT_BACKUP';
  transactionId: string;
  summary: string;
  previousSnapshot?: Transaction;
}

export interface AppSettings {
  language: Language;
  hasCompletedInitialLanguageSetup: boolean;
  committeeNameHi: string;
  committeeNameEn: string;
  appTitleHi: string;
  appTitleEn: string;
  glassOpacity: number;         // 10 to 90 (%)
  blurIntensity: number;        // 4 to 32 (px)
  accentColor: 'orange' | 'burgundy' | 'sky';
  reducedMotion: boolean;
  enableMobileField: boolean;
  enablePaymentModeField: boolean;
  defaultPaymentMode: PaymentMode;
  paymentModes: string[];
  committeeCategories: string[];
  dateFormat: 'DD/MM/YYYY' | 'YYYY-MM-DD';
  adminPin: string;             // Optional PIN protection
  isDemoMode: boolean;
}

export interface DaySummary {
  dayIndex: number;
  dayOrdinal: DayOrdinal;
  performanceDay: SanskritPerformanceDay;
  weekday?: SanskritWeekday;
  performanceDate?: string;
  actorTotalPaise: number;
  committeeOfflinePaise: number;
  committeeOnlinePaise: number;
  committeeAartiPaise: number;
  committeeOtherPaise: number;
  committeeTotalPaise: number;
  combinedTotalPaise: number;
  transactionCount: number;
}