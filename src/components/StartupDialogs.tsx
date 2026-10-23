import React, { useState } from 'react';
import { Calendar, CheckCircle2, Globe, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SANSKRIT_PERFORMANCE_DAYS, SANSKRIT_WEEKDAYS } from '../data/seedCharacters';
import { Language, SanskritPerformanceDay, SanskritWeekday } from '../types';

export const StartupDialogs: React.FC = () => {
  const {
    settings,
    updateSettings,
    activeSession,
    sessions,
    setActiveSessionAndSave,
    showSessionModal,
    setShowSessionModal,
    t,
  } = useApp();

  const [selectedLang, setSelectedLang] = useState<Language>(settings.language || 'hi');
  const [selectedDay, setSelectedDay] = useState<SanskritPerformanceDay>(
    activeSession?.performanceDay || 'Pratham'
  );
  const [selectedWeekday, setSelectedWeekday] = useState<SanskritWeekday>(
    activeSession?.weekday || 'Shukravar'
  );
  const [selectedDate, setSelectedDate] = useState<string>(
    activeSession?.performanceDate || new Date().toISOString().slice(0, 10)
  );
  const [dateError, setDateError] = useState<string>('');
  const [confirmOverwrite, setConfirmOverwrite] = useState<boolean>(false);

  // 1. First-Time Startup Language Selection Modal
  if (!settings.hasCompletedInitialLanguageSetup) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4">
        <div className="liquid-glass max-w-md w-full rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/80 animate-in fade-in zoom-in-95 duration-200">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 border border-orange-200 flex items-center justify-center mb-4">
            <Globe className="w-6 h-6 text-orange-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-1">
            भाषा चुनें / Select Language
          </h2>
          <p className="text-sm text-slate-600 mb-6">
            श्री रामलीला कमेटी, बनबसा संग्रह प्रणाली के लिए अपनी भाषा चुनें।
          </p>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => setSelectedLang('hi')}
              className={`p-4 rounded-2xl border-2 text-left transition flex flex-col justify-between ${
                selectedLang === 'hi'
                  ? 'border-orange-600 bg-orange-50/90 shadow-sm'
                  : 'border-slate-200 bg-white/70 hover:bg-white'
              }`}
            >
              <span className="text-lg font-bold text-slate-900">1. हिंदी</span>
              <span className="text-xs text-orange-700 font-medium mt-1">
                डिफ़ॉल्ट (Default)
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedLang('en')}
              className={`p-4 rounded-2xl border-2 text-left transition flex flex-col justify-between ${
                selectedLang === 'en'
                  ? 'border-orange-600 bg-orange-50/90 shadow-sm'
                  : 'border-slate-200 bg-white/70 hover:bg-white'
              }`}
            >
              <span className="text-lg font-bold text-slate-900">2. English</span>
              <span className="text-xs text-slate-500 font-medium mt-1">
                Interface Language
              </span>
            </button>
          </div>

          <button
            type="button"
            onClick={async () => {
              await updateSettings({
                language: selectedLang,
                hasCompletedInitialLanguageSetup: true,
              });
              setShowSessionModal(true);
            }}
            className="w-full py-3 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-semibold shadow-md transition flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>आगे बढ़ें / Continue</span>
          </button>
        </div>
      </div>
    );
  }

  // 2. Performance Day, Weekday, and Date Selection Modal
  if (!showSessionModal && activeSession) {
    return null;
  }

  const dayMeta =
    SANSKRIT_PERFORMANCE_DAYS.find((d) => d.day === selectedDay) ||
    SANSKRIT_PERFORMANCE_DAYS[0];
  const existingSessionForDay = sessions.find((s) => s.performanceDay === selectedDay);

  const handleSaveSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !/^\d{4}-\d{2}-\d{2}$/.test(selectedDate)) {
      setDateError(
        settings.language === 'hi'
          ? 'कृपया मान्य मंचन तिथि चुनें।'
          : 'Please select a valid performance date.'
      );
      return;
    }

    if (
      existingSessionForDay &&
      existingSessionForDay.performanceDate !== selectedDate &&
      !confirmOverwrite
    ) {
      setConfirmOverwrite(true);
      return;
    }

    await setActiveSessionAndSave({
      id: `session-${dayMeta.index}`,
      performanceDay: selectedDay,
      dayIndex: dayMeta.index,
      dayOrdinal: dayMeta.ordinal,
      weekday: selectedWeekday,
      performanceDate: selectedDate,
      updatedAt: new Date().toISOString(),
    });
    setConfirmOverwrite(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4">
      <form
        onSubmit={handleSaveSession}
        className="liquid-glass max-w-xl w-full rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/80"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-2xl bg-orange-100 border border-orange-200 flex items-center justify-center">
            <Calendar className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              {t('sessionDialogTitle')}
            </h2>
            <p className="text-xs text-slate-600">{t('sessionDialogDesc')}</p>
          </div>
        </div>

        {/* Sanskrit Performance Day Selection (Never Translated) */}
        <div className="mb-4">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            {t('performanceDayLabel')}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {SANSKRIT_PERFORMANCE_DAYS.map((item) => (
              <button
                key={item.day}
                type="button"
                onClick={() => {
                  setSelectedDay(item.day);
                  setConfirmOverwrite(false);
                }}
                className={`px-3 py-2 rounded-xl text-xs font-bold border transition text-center ${
                  selectedDay === item.day
                    ? 'bg-orange-600 text-white border-orange-700 shadow-sm'
                    : 'bg-white/80 text-slate-800 border-slate-200 hover:bg-orange-50'
                }`}
              >
                <div>{item.day}</div>
                <div className="text-[10px] opacity-80">{item.ordinal}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Sanskrit Weekday Selection */}
        <div className="mb-4">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            {t('weekdayLabel')}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {SANSKRIT_WEEKDAYS.map((w) => (
              <button
                key={w}
                type="button"
                onClick={() => setSelectedWeekday(w)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold border transition ${
                  selectedWeekday === w
                    ? 'bg-sky-700 text-white border-sky-800 shadow-sm'
                    : 'bg-white/80 text-slate-800 border-slate-200 hover:bg-sky-50'
                }`}
              >
                {w}
              </button>
            ))}
          </div>
        </div>

        {/* Actual Performance Date Picker */}
        <div className="mb-5">
          <label
            htmlFor="session-date-picker"
            className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
          >
            {t('performanceDateLabel')}
          </label>
          <input
            id="session-date-picker"
            type="date"
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              setDateError('');
              setConfirmOverwrite(false);
            }}
            required
            className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {dateError && <p className="text-xs text-rose-600 mt-1 font-medium">{dateError}</p>}
        </div>

        {confirmOverwrite && existingSessionForDay && (
          <div className="mb-4 p-3 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-950 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>{selectedDay}</strong> पहले से तिथि{' '}
              <strong>{existingSessionForDay.performanceDate}</strong> के साथ दर्ज है। क्या आप
              नया सत्र दिनांक <strong>{selectedDate}</strong> के साथ अपडेट करना चाहते हैं?
              (पूर्व लेन-देन सुरक्षित रहेंगे)
            </div>
          </div>
        )}

        <div className="flex items-center justify-end gap-3">
          {activeSession && (
            <button
              type="button"
              onClick={() => setShowSessionModal(false)}
              className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white/80 text-xs font-semibold text-slate-700 hover:bg-white"
            >
              रद्द करें / Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold shadow-md transition"
          >
            {confirmOverwrite ? 'हाँ, सत्र अपडेट करें / Confirm Session' : t('saveSessionBtn')}
          </button>
        </div>
      </form>
    </div>
  );
};