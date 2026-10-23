import React, { useState } from 'react';
import {
  Download,
  Upload,
  Plus,
  RotateCcw,
  Trash2,
  Sliders,
  Users,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DEFAULT_SETTINGS } from '../db/indexedDb';

export const SettingsPage: React.FC = () => {
  const {
    settings,
    updateSettings,
    characters,
    updateCharacters,
    transactions,
    importFullBackup,
    clearAllFinancialData,
  } = useApp();

  const [newCharName, setNewCharName] = useState('');
  const [newActorName, setNewActorName] = useState('');
  const [backupMessage, setBackupMessage] = useState('');
  const [confirmClearData, setConfirmClearData] = useState(false);

  const handleAddCharacter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCharName.trim()) return;
    const nextChar = {
      id: `char-custom-${Date.now()}`,
      orderIndex: characters.length + 1,
      characterNameHi: newCharName.trim(),
      actorNameHi: newActorName.trim(),
      isActive: true,
    };
    await updateCharacters([...characters, nextChar]);
    setNewCharName('');
    setNewActorName('');
  };

  const handleActorNameChange = async (id: string, actorNameHi: string) => {
    const updated = characters.map((c) =>
      c.id === id ? { ...c, actorNameHi } : c
    );
    await updateCharacters(updated);
  };

  const handleExportJSONBackup = () => {
    const payload = {
      version: 1,
      exportedAt: new Date().toISOString(),
      committee: 'Shri Ramleela Committee, Banbasa',
      settings,
      characters,
      transactions,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Ramleela_Banbasa_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSONBackup = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      if (!Array.isArray(parsed.characters) || !Array.isArray(parsed.transactions)) {
        setBackupMessage('अमान्य बैकअप फ़ाइल प्रारूप (Invalid backup schema)!');
        return;
      }
      await importFullBackup({
        settings: parsed.settings,
        characters: parsed.characters,
        transactions: parsed.transactions,
      });
      setBackupMessage(
        `बैकअप सफलतापूर्वक रिस्टोर किया गया (${parsed.transactions.length} प्रविष्टियाँ)!`
      );
    } catch {
      setBackupMessage('बैकअप फ़ाइल पढ़ने में त्रुटि हुई।');
    }
  };

  return (
    <div className="space-y-6">
      {/* Liquid Glass & Appearance Settings */}
      <div className="liquid-glass rounded-3xl p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-orange-600" />
          <h2 className="text-base font-bold text-slate-900">
            iOS लिक्विड ग्लास एवं इंटरफ़ेस सेटिंग्स (Live Preview)
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              ग्लास अपारदर्शिता (Glass Opacity: {settings.glassOpacity}%)
            </label>
            <input
              type="range"
              min="10"
              max="90"
              value={settings.glassOpacity}
              onChange={(e) =>
                updateSettings({ glassOpacity: Number(e.target.value) })
              }
              className="w-full accent-orange-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              ब्लर तीव्रता (Blur Intensity: {settings.blurIntensity}px)
            </label>
            <input
              type="range"
              min="4"
              max="32"
              value={settings.blurIntensity}
              onChange={(e) =>
                updateSettings({ blurIntensity: Number(e.target.value) })
              }
              className="w-full accent-orange-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              भाषा (Interface Language)
            </label>
            <select
              value={settings.language}
              onChange={(e) =>
                updateSettings({ language: e.target.value as 'hi' | 'en' })
              }
              className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold"
            >
              <option value="hi">हिंदी (Default)</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </div>

      {/* Actor & Character Master List Editor */}
      <div className="liquid-glass rounded-3xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-rose-700" />
            <h2 className="text-base font-bold text-slate-900">
              पात्र एवं अभिनयकर्ता मास्टर सूची ({characters.length} पात्र)
            </h2>
          </div>
        </div>

        <form onSubmit={handleAddCharacter} className="flex flex-wrap gap-2">
          <input
            type="text"
            value={newCharName}
            onChange={(e) => setNewCharName(e.target.value)}
            placeholder="नया पात्र नाम (हिंदी)..."
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-xs font-semibold"
          />
          <input
            type="text"
            value={newActorName}
            onChange={(e) => setNewActorName(e.target.value)}
            placeholder="अभिनयकर्ता का नाम..."
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-xs font-semibold"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            <span>पात्र जोड़ें</span>
          </button>
        </form>

        <div className="max-h-64 overflow-y-auto border border-slate-200 rounded-2xl bg-white/80 p-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {characters.map((c) => (
            <div
              key={c.id}
              className="p-2 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-2 text-xs"
            >
              <span className="font-bold text-slate-900 shrink-0">
                {c.orderIndex}. {c.characterNameHi}
              </span>
              <input
                type="text"
                value={c.actorNameHi}
                onChange={(e) => handleActorNameChange(c.id, e.target.value)}
                placeholder="अभिनयकर्ता..."
                className="w-36 px-2 py-1 rounded border border-slate-200 text-xs"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Backup, Restore & Reset Section */}
      <div className="liquid-glass rounded-3xl p-5 space-y-4">
        <h2 className="text-base font-bold text-slate-900">
          डेटा बैकअप, रिस्टोर एवं सुरक्षा (IndexedDB Local Persistence)
        </h2>
        <p className="text-xs text-slate-600">
          नोट: सभी रिकॉर्ड आपके ब्राउज़र के स्थानीय IndexedDB डेटाबेस में सुरक्षित रहते हैं। ब्राउज़र का
          साइट डेटा साफ़ करने से पहले नियमित रूप से JSON या Excel बैकअप डाउनलोड करें।
        </p>

        {backupMessage && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-900">
            {backupMessage}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleExportJSONBackup}
            className="px-4 py-2.5 rounded-xl bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>बैकअप डाउनलोड करें (.json)</span>
          </button>

          <label className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-2 cursor-pointer">
            <Upload className="w-4 h-4" />
            <span>बैकअप इम्पोर्ट करें (.json)</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportJSONBackup}
              className="hidden"
            />
          </label>

          <button
            type="button"
            onClick={() =>
              updateSettings({
                ...DEFAULT_SETTINGS,
                hasCompletedInitialLanguageSetup: true,
              })
            }
            className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-700 flex items-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            <span>डिफ़ॉल्ट सेटिंग्स रीसेट करें</span>
          </button>

          {confirmClearData ? (
            <button
              type="button"
              onClick={async () => {
                await clearAllFinancialData();
                setConfirmClearData(false);
              }}
              className="px-4 py-2.5 rounded-xl bg-rose-700 text-white text-xs font-bold"
            >
              पक्का सभी वित्तीय रिकॉर्ड मिटाएँ? (Confirm Delete All)
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmClearData(true)}
              className="px-4 py-2.5 rounded-xl border border-rose-300 bg-rose-50 text-rose-800 text-xs font-bold flex items-center gap-1.5"
            >
              <Trash2 className="w-4 h-4" />
              <span>सभी वित्तीय डेटा मिटाएँ</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};