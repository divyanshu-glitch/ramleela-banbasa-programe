import React, { useState } from 'react';
import { Calendar, Globe, Sparkles, ShieldAlert } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TopWindowBar: React.FC<{
  onCompactToggle: () => void;
  isCompact: boolean;
}> = ({ onCompactToggle, isCompact }) => {
  const { settings, updateSettings, activeSession, setShowSessionModal, t, toggleDemoMode } =
    useApp();
  const [infoToast, setInfoToast] = useState<string | null>(null);

  const showNotice = (msg: string) => {
    setInfoToast(msg);
    setTimeout(() => setInfoToast(null), 3000);
  };

  return (
    <header className="sticky top-0 z-40 px-4 pt-3">
      <div className="liquid-glass rounded-2xl px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Desktop-style Window Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2" aria-label="Interface Window Controls">
            <button
              type="button"
              onClick={() =>
                showNotice(
                  settings.language === 'hi'
                    ? 'यह वेब एप्लिकेशन नियंत्रण है — ब्राउज़र टैब सुरक्षित है।'
                    : 'Web interface status control — browser window remains intact.'
                )
              }
              title="Application Status Indicator (Decorative/Safe)"
              className="w-3.5 h-3.5 rounded-full bg-rose-500 hover:bg-rose-600 border border-rose-600/40 transition-transform active:scale-90"
            />
            <button
              type="button"
              onClick={onCompactToggle}
              title={isCompact ? 'Expand Header View' : 'Compact Header View'}
              className="w-3.5 h-3.5 rounded-full bg-amber-400 hover:bg-amber-500 border border-amber-500/40 transition-transform active:scale-90"
            />
            <button
              type="button"
              onClick={() => {
                if (!document.fullscreenElement) {
                  document.documentElement.requestFullscreen().catch(() => {});
                } else {
                  document.exitFullscreen().catch(() => {});
                }
              }}
              title="Toggle Fullscreen Presentation View"
              className="w-3.5 h-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 border border-emerald-600/40 transition-transform active:scale-90"
            />
          </div>

          <div className="h-5 w-px bg-slate-300/70 hidden sm:block" />

          <div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
              {settings.language === 'hi' ? settings.committeeNameHi : settings.committeeNameEn}
            </h1>
            {!isCompact && (
              <p className="text-xs text-slate-600">
                {settings.language === 'hi' ? settings.appTitleHi : settings.appTitleEn}
              </p>
            )}
          </div>
        </div>

        {/* Active Performance Session & Quick Switches */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setShowSessionModal(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-orange-50/90 hover:bg-orange-100/90 border border-orange-200 text-xs font-semibold text-orange-950 transition"
          >
            <Calendar className="w-3.5 h-3.5 text-orange-600" />
            <span>
              {activeSession
                ? `${activeSession.performanceDay} (${activeSession.dayOrdinal}) • ${activeSession.weekday} • ${activeSession.performanceDate}`
                : t('changeSession')}
            </span>
          </button>

          <button
            type="button"
            onClick={() => toggleDemoMode(!settings.isDemoMode)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
              settings.isDemoMode
                ? 'bg-rose-900 text-white border-rose-950 shadow-sm'
                : 'bg-sky-50/90 text-sky-900 border-sky-200 hover:bg-sky-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              {settings.isDemoMode ? t('exitDemoDataBtn') : t('loadDemoDataBtn')}
            </span>
          </button>

          <button
            type="button"
            onClick={() =>
              updateSettings({ language: settings.language === 'hi' ? 'en' : 'hi' })
            }
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 hover:bg-white border border-slate-200 text-xs font-semibold text-slate-800 transition"
          >
            <Globe className="w-3.5 h-3.5 text-slate-600" />
            <span>{settings.language === 'hi' ? 'English' : 'हिंदी'}</span>
          </button>
        </div>
      </div>

      {settings.isDemoMode && (
        <div className="mt-2 rounded-xl bg-amber-500/95 text-slate-950 px-4 py-1.5 text-xs font-bold flex items-center justify-between shadow-sm">
          <span className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" />
            {t('demoModeBanner')}
          </span>
          <button
            type="button"
            onClick={() => toggleDemoMode(false)}
            className="underline hover:text-white"
          >
            {t('exitDemoDataBtn')}
          </button>
        </div>
      )}

      {infoToast && (
        <div className="mt-2 rounded-xl bg-slate-900/90 text-white px-4 py-1.5 text-xs font-medium">
          {infoToast}
        </div>
      )}
    </header>
  );
};