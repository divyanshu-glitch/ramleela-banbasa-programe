import React, { useState } from 'react';
import {
  LayoutDashboard,
  PlusCircle,
  ReceiptText,
  FileSpreadsheet,
  Settings,
} from 'lucide-react';
import { AppProvider, useApp } from './context/AppContext';
import { TopWindowBar } from './components/TopWindowBar';
import { StartupDialogs } from './components/StartupDialogs';
import { Dashboard } from './components/Dashboard';
import { EntryWizard } from './components/EntryWizard';
import { TransactionsPage } from './components/TransactionsPage';
import { ReportsPage } from './components/ReportsPage';
import { SettingsPage } from './components/SettingsPage';
import { Transaction } from './types';

type ActiveTab = 'DASHBOARD' | 'NEW_ENTRY' | 'TRANSACTIONS' | 'REPORTS' | 'SETTINGS';

const MainShell: React.FC = () => {
  const { t, isLoading } = useApp();
  const [activeTab, setActiveTab] = useState<ActiveTab>('DASHBOARD');
  const [editingTx, setEditingTx] = useState<Transaction | null>(null);
  const [isCompactHeader, setIsCompactHeader] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm font-bold text-slate-700">
        श्री रामलीला कमेटी, बनबसा डेटा लोड हो रहा है...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col pb-12">
      <StartupDialogs />
      <TopWindowBar
        isCompact={isCompactHeader}
        onCompactToggle={() => setIsCompactHeader((v) => !v)}
      />

      {/* Primary Navigation Bar */}
      <nav className="px-4 mt-3">
        <div className="liquid-glass rounded-2xl p-1.5 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            {(
              [
                { id: 'DASHBOARD', label: t('navDashboard'), icon: LayoutDashboard },
                { id: 'NEW_ENTRY', label: t('navNewEntry'), icon: PlusCircle },
                { id: 'TRANSACTIONS', label: t('navTransactions'), icon: ReceiptText },
                { id: 'REPORTS', label: t('navReports'), icon: FileSpreadsheet },
                { id: 'SETTINGS', label: t('navSettings'), icon: Settings },
              ] as const
            ).map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    if (item.id !== 'NEW_ENTRY') setEditingTx(null);
                    setActiveTab(item.id);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
                    isActive
                      ? 'bg-orange-600 text-white shadow-sm'
                      : 'text-slate-700 hover:bg-white/70'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 px-4 mt-4">
        {activeTab === 'DASHBOARD' && (
          <Dashboard
            onStartNewEntry={() => {
              setEditingTx(null);
              setActiveTab('NEW_ENTRY');
            }}
          />
        )}

        {activeTab === 'NEW_ENTRY' && (
          <EntryWizard
            editingTransaction={editingTx}
            onFinishToDashboard={() => {
              setEditingTx(null);
              setActiveTab('DASHBOARD');
            }}
          />
        )}

        {activeTab === 'TRANSACTIONS' && (
          <TransactionsPage
            onEditTransaction={(tx) => {
              setEditingTx(tx);
              setActiveTab('NEW_ENTRY');
            }}
          />
        )}

        {activeTab === 'REPORTS' && <ReportsPage />}
        {activeTab === 'SETTINGS' && <SettingsPage />}
      </main>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainShell />
    </AppProvider>
  );
}