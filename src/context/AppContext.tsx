import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  AppSettings,
  AuditLogEntry,
  CharacterMaster,
  PerformanceSession,
  Transaction,
} from '../types';
import {
  addAuditLogToDB,
  DEFAULT_SETTINGS,
  deleteTransactionFromDB,
  loadAuditLogsFromDB,
  loadCharactersFromDB,
  loadSessionsFromDB,
  loadSettingsFromDB,
  loadTransactionsFromDB,
  replaceAllTransactionsInDB,
  saveCharactersToDB,
  saveSessionToDB,
  saveSettingsToDB,
  saveTransactionToDB,
} from '../db/indexedDb';
import { generateReferenceDemoTransactions } from '../utils/calculations';
import { TRANSLATIONS } from '../data/i18n';

interface AppContextValue {
  settings: AppSettings;
  updateSettings: (partial: Partial<AppSettings>) => Promise<void>;
  t: (key: string) => string;
  characters: CharacterMaster[];
  updateCharacters: (chars: CharacterMaster[]) => Promise<void>;
  sessions: PerformanceSession[];
  activeSession: PerformanceSession | null;
  setActiveSessionAndSave: (session: PerformanceSession) => Promise<void>;
  transactions: Transaction[];
  auditLogs: AuditLogEntry[];
  saveTransaction: (tx: Transaction, isEdit?: boolean) => Promise<void>;
  deleteTransaction: (id: string) => Promise<Transaction | undefined>;
  toggleDemoMode: (enable: boolean) => Promise<void>;
  importFullBackup: (payload: {
    settings?: AppSettings;
    characters: CharacterMaster[];
    transactions: Transaction[];
  }) => Promise<void>;
  clearAllFinancialData: () => Promise<void>;
  isLoading: boolean;
  showSessionModal: boolean;
  setShowSessionModal: (v: boolean) => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [characters, setCharacters] = useState<CharacterMaster[]>([]);
  const [sessions, setSessions] = useState<PerformanceSession[]>([]);
  const [activeSession, setActiveSession] = useState<PerformanceSession | null>(null);
  const [realTransactions, setRealTransactions] = useState<Transaction[]>([]);
  const [demoTransactions, setDemoTransactions] = useState<Transaction[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showSessionModal, setShowSessionModal] = useState(false);

  useEffect(() => {
    async function init() {
      try {
        const [loadedSettings, loadedChars, loadedSessions, loadedTxs, loadedLogs] =
          await Promise.all([
            loadSettingsFromDB(),
            loadCharactersFromDB(),
            loadSessionsFromDB(),
            loadTransactionsFromDB(),
            loadAuditLogsFromDB(),
          ]);

        setSettings(loadedSettings);
        setCharacters(loadedChars);
        setSessions(loadedSessions);
        setRealTransactions(loadedTxs);
        setAuditLogs(loadedLogs);

        if (loadedSettings.isDemoMode) {
          setDemoTransactions(generateReferenceDemoTransactions());
        }

        if (loadedSessions.length > 0) {
          const latest = [...loadedSessions].sort((a, b) =>
            b.updatedAt.localeCompare(a.updatedAt)
          )[0];
          setActiveSession(latest);
        } else if (loadedSettings.hasCompletedInitialLanguageSetup) {
          setShowSessionModal(true);
        }
      } catch (err) {
        console.error('Failed to initialize IndexedDB data:', err);
      } finally {
        setIsLoading(false);
      }
    }
    init();
  }, []);

  // Apply dynamic CSS variables for iOS Liquid Glass opacity & blur
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--glass-opacity',
      (settings.glassOpacity / 100).toFixed(2)
    );
    document.documentElement.style.setProperty(
      '--glass-blur',
      `${settings.blurIntensity}px`
    );
  }, [settings.glassOpacity, settings.blurIntensity]);

  const updateSettings = async (partial: Partial<AppSettings>) => {
    const next = { ...settings, ...partial };
    setSettings(next);
    await saveSettingsToDB(next);
  };

  const t = (key: string): string => {
    return TRANSLATIONS[settings.language]?.[key] ?? key;
  };

  const updateCharacters = async (chars: CharacterMaster[]) => {
    setCharacters(chars);
    await saveCharactersToDB(chars);
  };

  const setActiveSessionAndSave = async (session: PerformanceSession) => {
    await saveSessionToDB(session);
    const updatedSessions = await loadSessionsFromDB();
    setSessions(updatedSessions);
    setActiveSession(session);
    setShowSessionModal(false);
  };

  const activeTransactions = useMemo(() => {
    return settings.isDemoMode ? demoTransactions : realTransactions;
  }, [settings.isDemoMode, demoTransactions, realTransactions]);

  const saveTransaction = async (tx: Transaction, isEdit = false) => {
    if (settings.isDemoMode) {
      setDemoTransactions((prev) => {
        const filtered = prev.filter((item) => item.id !== tx.id);
        return [tx, ...filtered];
      });
      return;
    }

    const previous = realTransactions.find((item) => item.id === tx.id);
    await saveTransactionToDB(tx);
    const refreshed = await loadTransactionsFromDB();
    setRealTransactions(refreshed);

    const logEntry: AuditLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      action: isEdit ? 'UPDATE' : 'CREATE',
      transactionId: tx.id,
      summary: `${isEdit ? 'Updated' : 'Created'} ${tx.category} receipt ${tx.receiptNumber} (${tx.contributor.fullName})`,
      previousSnapshot: previous,
    };
    await addAuditLogToDB(logEntry);
    setAuditLogs((prev) => [logEntry, ...prev]);
  };

  const deleteTransaction = async (id: string): Promise<Transaction | undefined> => {
    if (settings.isDemoMode) {
      const target = demoTransactions.find((t) => t.id === id);
      setDemoTransactions((prev) => prev.filter((t) => t.id !== id));
      return target;
    }

    const target = realTransactions.find((t) => t.id === id);
    if (!target) return undefined;

    await deleteTransactionFromDB(id);
    const refreshed = await loadTransactionsFromDB();
    setRealTransactions(refreshed);

    const logEntry: AuditLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      action: 'DELETE',
      transactionId: id,
      summary: `Deleted ${target.category} receipt ${target.receiptNumber} (${target.contributor.fullName})`,
      previousSnapshot: target,
    };
    await addAuditLogToDB(logEntry);
    setAuditLogs((prev) => [logEntry, ...prev]);
    return target;
  };

  const toggleDemoMode = async (enable: boolean) => {
    if (enable) {
      setDemoTransactions(generateReferenceDemoTransactions());
    }
    await updateSettings({ isDemoMode: enable });
  };

  const importFullBackup = async (payload: {
    settings?: AppSettings;
    characters: CharacterMaster[];
    transactions: Transaction[];
  }) => {
    if (payload.settings) {
      await updateSettings({ ...payload.settings, isDemoMode: false });
    }
    if (Array.isArray(payload.characters) && payload.characters.length > 0) {
      await updateCharacters(payload.characters);
    }
    if (Array.isArray(payload.transactions)) {
      await replaceAllTransactionsInDB(payload.transactions);
      const refreshed = await loadTransactionsFromDB();
      setRealTransactions(refreshed);
    }
  };

  const clearAllFinancialData = async () => {
    await replaceAllTransactionsInDB([]);
    setRealTransactions([]);
  };

  return (
    <AppContext.Provider
      value={{
        settings,
        updateSettings,
        t,
        characters,
        updateCharacters,
        sessions,
        activeSession,
        setActiveSessionAndSave,
        transactions: activeTransactions,
        auditLogs,
        saveTransaction,
        deleteTransaction,
        toggleDemoMode,
        importFullBackup,
        clearAllFinancialData,
        isLoading,
        showSessionModal,
        setShowSessionModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}