import {
  AppSettings,
  AuditLogEntry,
  CharacterMaster,
  PerformanceSession,
  Transaction,
} from '../types';
import { INITIAL_CHARACTERS, SANSKRIT_PERFORMANCE_DAYS } from '../data/seedCharacters';

const DB_NAME = 'RamleelaBanbasaDB';
const DB_VERSION = 1;

export const DEFAULT_SETTINGS: AppSettings = {
  language: 'hi', // Hindi is default when no preference exists
  hasCompletedInitialLanguageSetup: false,
  committeeNameHi: 'श्री रामलीला कमेटी, बनबसा',
  committeeNameEn: 'Shri Ramleela Committee, Banbasa',
  appTitleHi: 'रामलीला बनबसा संग्रह प्रबंधन प्रणाली',
  appTitleEn: 'Ram Leela Banbasa Collection Management System',
  glassOpacity: 74,
  blurIntensity: 18,
  accentColor: 'orange',
  reducedMotion: false,
  enableMobileField: true,
  enablePaymentModeField: true,
  defaultPaymentMode: 'Cash',
  paymentModes: ['Cash', 'UPI / Online', 'Aarti Plate', 'Cheque'],
  committeeCategories: ['धनराशि (Offline)', 'धनराशि (Online)', 'आरती'],
  dateFormat: 'DD/MM/YYYY',
  adminPin: '',
  isDemoMode: false,
};

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains('settings')) {
        db.createObjectStore('settings', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('characters')) {
        db.createObjectStore('characters', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('sessions')) {
        db.createObjectStore('sessions', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('transactions')) {
        db.createObjectStore('transactions', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('auditLogs')) {
        db.createObjectStore('auditLogs', { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function loadSettingsFromDB(): Promise<AppSettings> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('settings', 'readonly');
    const store = tx.objectStore('settings');
    const req = store.get('app-settings');
    req.onsuccess = () => {
      if (req.result) {
        const { id, ...rest } = req.result;
        resolve({ ...DEFAULT_SETTINGS, ...rest });
      } else {
        resolve(DEFAULT_SETTINGS);
      }
    };
    req.onerror = () => reject(req.error);
  });
}

export async function saveSettingsToDB(settings: AppSettings): Promise<void> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('settings', 'readwrite');
    tx.objectStore('settings').put({ id: 'app-settings', ...settings });
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function loadCharactersFromDB(): Promise<CharacterMaster[]> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('characters', 'readonly');
    const req = tx.objectStore('characters').getAll();
    req.onsuccess = async () => {
      if (req.result && req.result.length > 0) {
        const sorted = (req.result as CharacterMaster[]).sort(
          (a, b) => a.orderIndex - b.orderIndex
        );
        resolve(sorted);
      } else {
        await saveCharactersToDB(INITIAL_CHARACTERS);
        resolve(INITIAL_CHARACTERS);
      }
    };
    req.onerror = () => reject(req.error);
  });
}

export async function saveCharactersToDB(characters: CharacterMaster[]): Promise<void> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('characters', 'readwrite');
    const store = tx.objectStore('characters');
    store.clear();
    for (const c of characters) {
      store.put(c);
    }
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function loadSessionsFromDB(): Promise<PerformanceSession[]> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('sessions', 'readonly');
    const req = tx.objectStore('sessions').getAll();
    req.onsuccess = () => {
      const list = (req.result as PerformanceSession[]) || [];
      resolve(list.sort((a, b) => a.dayIndex - b.dayIndex));
    };
    req.onerror = () => reject(req.error);
  });
}

export async function saveSessionToDB(session: PerformanceSession): Promise<void> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('sessions', 'readwrite');
    tx.objectStore('sessions').put(session);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function loadTransactionsFromDB(): Promise<Transaction[]> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('transactions', 'readonly');
    const req = tx.objectStore('transactions').getAll();
    req.onsuccess = () => {
      const list = (req.result as Transaction[]) || [];
      resolve(list.sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
    };
    req.onerror = () => reject(req.error);
  });
}

export async function saveTransactionToDB(transaction: Transaction): Promise<void> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('transactions', 'readwrite');
    tx.objectStore('transactions').put(transaction);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function deleteTransactionFromDB(id: string): Promise<void> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('transactions', 'readwrite');
    tx.objectStore('transactions').delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function replaceAllTransactionsInDB(transactions: Transaction[]): Promise<void> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('transactions', 'readwrite');
    const store = tx.objectStore('transactions');
    store.clear();
    for (const item of transactions) {
      store.put(item);
    }
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function loadAuditLogsFromDB(): Promise<AuditLogEntry[]> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('auditLogs', 'readonly');
    const req = tx.objectStore('auditLogs').getAll();
    req.onsuccess = () => {
      const logs = (req.result as AuditLogEntry[]) || [];
      resolve(logs.sort((a, b) => b.timestamp.localeCompare(a.timestamp)));
    };
    req.onerror = () => reject(req.error);
  });
}

export async function addAuditLogToDB(entry: AuditLogEntry): Promise<void> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('auditLogs', 'readwrite');
    tx.objectStore('auditLogs').put(entry);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}