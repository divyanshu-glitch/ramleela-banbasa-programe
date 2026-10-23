import React, { useMemo, useState } from 'react';
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Landmark,
  Search,
  Users,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  CollectionCategory,
  Transaction,
} from '../types';
import {
  buildActorLineItems,
  formatIndianCurrency,
  paiseToRupees,
  rupeesToPaise,
} from '../utils/calculations';
import { SANSKRIT_PERFORMANCE_DAYS, SANSKRIT_WEEKDAYS } from '../data/seedCharacters';

export const EntryWizard: React.FC<{
  editingTransaction?: Transaction | null;
  onFinishToDashboard: () => void;
}> = ({ editingTransaction, onFinishToDashboard }) => {
  const {
    settings,
    characters,
    activeSession,
    saveTransaction,
    t,
  } = useApp();

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Session fields for this transaction
  const [performanceDay, setPerformanceDay] = useState(
    editingTransaction?.performanceDay || activeSession?.performanceDay || 'Pratham'
  );
  const [weekday, setWeekday] = useState(
    editingTransaction?.weekday || activeSession?.weekday || 'Shukravar'
  );
  const [performanceDate, setPerformanceDate] = useState(
    editingTransaction?.performanceDate ||
      activeSession?.performanceDate ||
      new Date().toISOString().slice(0, 10)
  );

  // Step 1: Contributor fields
  const [fullName, setFullName] = useState(
    editingTransaction?.contributor.fullName || ''
  );
  const [location, setLocation] = useState(
    editingTransaction?.contributor.location || ''
  );
  const [designation, setDesignation] = useState(
    editingTransaction?.contributor.designation || ''
  );
  const [shopOrBusinessName, setShopOrBusinessName] = useState(
    editingTransaction?.contributor.shopOrBusinessName || ''
  );
  const [mobileNumber, setMobileNumber] = useState(
    editingTransaction?.contributor.mobileNumber || ''
  );
  const [notes, setNotes] = useState(editingTransaction?.notes || '');
  const [step1Error, setStep1Error] = useState('');

  // Step 2: Mutually Exclusive Category
  const [category, setCategory] = useState<CollectionCategory>(
    editingTransaction?.category || 'ACTOR'
  );

  // Step 3A: Actor-Side State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCharIds, setSelectedCharIds] = useState<string[]>(
    editingTransaction?.lineItems.map((li) => li.characterId) || []
  );
  const [amountMode, setAmountMode] = useState<'INDIVIDUAL' | 'COMMON'>(
    editingTransaction?.amountEntryMode || 'INDIVIDUAL'
  );
  const [individualRupees, setIndividualRupees] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    if (editingTransaction?.lineItems) {
      for (const li of editingTransaction.lineItems) {
        init[li.characterId] = String(paiseToRupees(li.amountPaise));
      }
    }
    return init;
  });
  const [commonRupees, setCommonRupees] = useState<string>(
    editingTransaction?.commonPerCharacterPaise
      ? String(paiseToRupees(editingTransaction.commonPerCharacterPaise))
      : ''
  );

  // Step 3B: Committee-Side State
  const [committeeSubCategory, setCommitteeSubCategory] = useState<string>(
    editingTransaction?.committeeSubCategory || 'धनराशि (Offline)'
  );
  const [committeeRupees, setCommitteeRupees] = useState<string>(
    editingTransaction?.category === 'COMMITTEE'
      ? String(paiseToRupees(editingTransaction.totalAmountPaise))
      : ''
  );
  const [paymentMode, setPaymentMode] = useState<string>(
    editingTransaction?.paymentMode || settings.defaultPaymentMode
  );
  const [step3Error, setStep3Error] = useState('');
  const [savedReceiptId, setSavedReceiptId] = useState('');

  const activeCharacters = useMemo(
    () => characters.filter((c) => c.isActive),
    [characters]
  );

  const filteredCharacters = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return activeCharacters;
    return activeCharacters.filter(
      (c) =>
        c.characterNameHi.toLowerCase().includes(q) ||
        c.actorNameHi.toLowerCase().includes(q)
    );
  }, [activeCharacters, searchQuery]);

  const selectedCharactersList = useMemo(
    () => activeCharacters.filter((c) => selectedCharIds.includes(c.id)),
    [activeCharacters, selectedCharIds]
  );

  const individualPaiseMap = useMemo(() => {
    const map: Record<string, number> = {};
    for (const id of selectedCharIds) {
      map[id] = rupeesToPaise(individualRupees[id] || '0');
    }
    return map;
  }, [selectedCharIds, individualRupees]);

  const commonPaise = useMemo(() => rupeesToPaise(commonRupees), [commonRupees]);

  const previewActorData = useMemo(
    () =>
      buildActorLineItems(
        editingTransaction?.id || 'preview',
        selectedCharactersList,
        amountMode,
        individualPaiseMap,
        commonPaise
      ),
    [
      editingTransaction?.id,
      selectedCharactersList,
      amountMode,
      individualPaiseMap,
      commonPaise,
    ]
  );

  const committeePaise = useMemo(
    () => rupeesToPaise(committeeRupees),
    [committeeRupees]
  );

  const totalEntryPaise =
    category === 'ACTOR' ? previewActorData.totalAmountPaise : committeePaise;

  const toggleCharacterSelection = (charId: string) => {
    setSelectedCharIds((prev) =>
      prev.includes(charId) ? prev.filter((id) => id !== charId) : [...prev, charId]
    );
  };

  const handleStep1Next = () => {
    if (!fullName.trim()) {
      setStep1Error(t('errNameRequired'));
      return;
    }
    if (!location.trim()) {
      setStep1Error(t('errLocationRequired'));
      return;
    }
    if (!performanceDate) {
      setStep1Error('कृपया मान्य दिनांक चुनें।');
      return;
    }
    setStep1Error('');
    setStep(2);
  };

  const handleStep3Next = () => {
    if (category === 'ACTOR') {
      if (selectedCharIds.length === 0) {
        setStep3Error(t('errSelectCharacter'));
        return;
      }
      if (previewActorData.totalAmountPaise <= 0) {
        setStep3Error(t('errPositiveAmount'));
        return;
      }
    } else {
      if (committeePaise <= 0) {
        setStep3Error(t('errPositiveAmount'));
        return;
      }
    }
    setStep3Error('');
    setStep(4);
  };

  const handleConfirmAndSave = async () => {
    if (isSubmitting) return; // Prevent double-click duplicates
    setIsSubmitting(true);

    try {
      const dayMeta =
        SANSKRIT_PERFORMANCE_DAYS.find((d) => d.day === performanceDay) ||
        SANSKRIT_PERFORMANCE_DAYS[0];
      const txId = editingTransaction?.id || `tx-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      const receiptNumber =
        editingTransaction?.receiptNumber ||
        `RLB-${dayMeta.ordinal.toUpperCase()}-${String(Date.now()).slice(-5)}`;

      const finalActorBuild =
        category === 'ACTOR'
          ? buildActorLineItems(
              txId,
              selectedCharactersList,
              amountMode,
              individualPaiseMap,
              commonPaise
            )
          : { lineItems: [], totalAmountPaise: 0 };

      const newTx: Transaction = {
        id: txId,
        receiptNumber,
        category,
        performanceDay: dayMeta.day,
        dayIndex: dayMeta.index,
        dayOrdinal: dayMeta.ordinal,
        weekday,
        performanceDate,
        contributor: {
          id: editingTransaction?.contributor.id || `contrib-${Date.now()}`,
          fullName: fullName.trim(),
          location: location.trim(),
          designation: designation.trim() || undefined,
          shopOrBusinessName: shopOrBusinessName.trim() || undefined,
          mobileNumber: mobileNumber.trim() || undefined,
          notes: notes.trim() || undefined,
        },
        amountEntryMode: category === 'ACTOR' ? amountMode : undefined,
        commonPerCharacterPaise:
          category === 'ACTOR' && amountMode === 'COMMON' ? commonPaise : undefined,
        lineItems: category === 'ACTOR' ? finalActorBuild.lineItems : [],
        organizationName:
          category === 'COMMITTEE' ? 'Shri Ramleela Committee, Banbasa' : undefined,
        committeeSubCategory:
          category === 'COMMITTEE' ? committeeSubCategory : undefined,
        paymentMode,
        totalAmountPaise:
          category === 'ACTOR' ? finalActorBuild.totalAmountPaise : committeePaise,
        notes: notes.trim() || undefined,
        createdAt: editingTransaction?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await saveTransaction(newTx, Boolean(editingTransaction));
      setSavedReceiptId(receiptNumber);
      setStep(5);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetWizardForAnother = () => {
    setFullName('');
    setLocation('');
    setDesignation('');
    setShopOrBusinessName('');
    setMobileNumber('');
    setNotes('');
    setSelectedCharIds([]);
    setIndividualRupees({});
    setCommonRupees('');
    setCommitteeRupees('');
    setStep(1);
  };

  return (
    <div className="liquid-glass rounded-3xl p-5 sm:p-7 max-w-4xl mx-auto">
      {/* Progress Bar */}
      {step < 5 && (
        <div className="grid grid-cols-4 gap-2 mb-6">
          {[
            { num: 1, label: t('wizardStep1') },
            { num: 2, label: t('wizardStep2') },
            { num: 3, label: t('wizardStep3') },
            { num: 4, label: t('wizardStep4') },
          ].map((s) => (
            <div
              key={s.num}
              className={`px-3 py-2 rounded-xl text-xs font-bold border transition ${
                step === s.num
                  ? 'bg-orange-600 text-white border-orange-700 shadow-sm'
                  : step > s.num
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                  : 'bg-white/60 text-slate-500 border-slate-200'
              }`}
            >
              {s.label}
            </div>
          ))}
        </div>
      )}

      {/* STEP 1: Contributor Information */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-2xl bg-orange-50/80 border border-orange-200 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                {t('performanceDayLabel')}
              </label>
              <select
                value={performanceDay}
                onChange={(e) => setPerformanceDay(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold"
              >
                {SANSKRIT_PERFORMANCE_DAYS.map((d) => (
                  <option key={d.day} value={d.day}>
                    {d.day} ({d.ordinal})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                {t('weekdayLabel')}
              </label>
              <select
                value={weekday}
                onChange={(e) => setWeekday(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold"
              >
                {SANSKRIT_WEEKDAYS.map((w) => (
                  <option key={w} value={w}>
                    {w}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                {t('performanceDateLabel')}
              </label>
              <input
                type="date"
                value={performanceDate}
                onChange={(e) => setPerformanceDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                {t('contributorName')}
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="उदा. श्री रमेश चन्द्र पाण्डेय"
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                {t('contributorLocation')}
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="उदा. मुख्य बाज़ार बनबसा / मीना बाज़ार / पचपकरिया"
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {t('contributorDesignation')}
              </label>
              <input
                type="text"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                placeholder="उदा. अध्यक्ष / व्यापार मंडल / शिक्षक"
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {t('contributorShop')}
              </label>
              <input
                type="text"
                value={shopOrBusinessName}
                onChange={(e) => setShopOrBusinessName(e.target.value)}
                placeholder="उदा. पाण्डेय जनरल स्टोर"
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-sm"
              />
            </div>

            {settings.enableMobileField && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t('contributorMobile')}
                </label>
                <input
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="98XXXXXXXX"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-sm"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {t('contributorNotes')}
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="विशेष विवरण..."
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-sm"
              />
            </div>
          </div>

          {step1Error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700">
              {step1Error}
            </div>
          )}

          <div className="flex justify-end pt-3">
            <button
              type="button"
              onClick={handleStep1Next}
              className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold flex items-center gap-2 shadow-md transition"
            >
              <span>{t('continueBtn')}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Select Mutually Exclusive Collection Category */}
      {step === 2 && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setCategory('ACTOR')}
              className={`p-6 rounded-3xl border-2 text-left transition flex flex-col justify-between ${
                category === 'ACTOR'
                  ? 'border-rose-700 bg-rose-50/90 shadow-md'
                  : 'border-slate-200 bg-white/80 hover:bg-white'
              }`}
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-800 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Option A: {t('categoryActorTitle')}
                </h3>
                <p className="text-xs text-slate-600 mt-1">{t('categoryActorDesc')}</p>
              </div>
              <div className="mt-4 text-xs font-bold text-rose-800">
                ✓ 83 रामलीला पात्र एवं कलाकार सूची
              </div>
            </button>

            <button
              type="button"
              onClick={() => setCategory('COMMITTEE')}
              className={`p-6 rounded-3xl border-2 text-left transition flex flex-col justify-between ${
                category === 'COMMITTEE'
                  ? 'border-sky-700 bg-sky-50/90 shadow-md'
                  : 'border-slate-200 bg-white/80 hover:bg-white'
              }`}
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center mb-4">
                  <Landmark className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Option B: {t('categoryCommitteeTitle')}
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  {t('categoryCommitteeDesc')}
                </p>
              </div>
              <div className="mt-4 text-xs font-bold text-sky-800">
                ✓ धनराशि (Offline), धनराशि (Online), आरती
              </div>
            </button>
          </div>

          <div className="flex justify-between pt-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-700 flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold flex items-center gap-2 shadow-md"
            >
              <span>{t('continueBtn')}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3A: Actor-Side Collection */}
      {step === 3 && category === 'ACTOR' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchCharactersPlaceholder')}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-slate-300 text-sm"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setAmountMode('INDIVIDUAL')}
                className={`px-3 py-2 rounded-xl text-xs font-bold border transition ${
                  amountMode === 'INDIVIDUAL'
                    ? 'bg-rose-800 text-white border-rose-900'
                    : 'bg-white text-slate-700 border-slate-300'
                }`}
              >
                Mode 1: {t('modeIndividual')}
              </button>
              <button
                type="button"
                onClick={() => setAmountMode('COMMON')}
                className={`px-3 py-2 rounded-xl text-xs font-bold border transition ${
                  amountMode === 'COMMON'
                    ? 'bg-rose-800 text-white border-rose-900'
                    : 'bg-white text-slate-700 border-slate-300'
                }`}
              >
                Mode 2: {t('modeCommon')}
              </button>
            </div>
          </div>

          {/* Searchable Multi-Select Character Grid */}
          <div className="max-h-56 overflow-y-auto p-2 rounded-2xl bg-white/70 border border-slate-200 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {filteredCharacters.map((char) => {
              const isSelected = selectedCharIds.includes(char.id);
              return (
                <button
                  key={char.id}
                  type="button"
                  onClick={() => toggleCharacterSelection(char.id)}
                  className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between ${
                    isSelected
                      ? 'bg-rose-50 border-rose-600 ring-1 ring-rose-600'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-xs font-bold text-slate-900">
                    {char.characterNameHi}
                  </div>
                  <div className="text-[11px] text-slate-600 truncate">
                    {char.actorNameHi || '—'}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Amount Entry Area */}
          {selectedCharactersList.length > 0 && (
            <div className="p-4 rounded-2xl bg-orange-50/70 border border-orange-200 space-y-3">
              {amountMode === 'COMMON' ? (
                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">
                    प्रत्येक पात्र के लिए समान राशि (₹ per character)
                  </label>
                  <p className="text-[11px] text-orange-900 mb-2 font-medium">
                    {t('commonAmountExplanation')} ({selectedCharactersList.length} पात्र × ₹
                    {commonRupees || 0} ={' '}
                    <strong>
                      {formatIndianCurrency(previewActorData.totalAmountPaise)}
                    </strong>
                    )
                  </p>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={commonRupees}
                    onChange={(e) => setCommonRupees(e.target.value)}
                    placeholder="उदा. 100"
                    className="w-full sm:w-64 px-4 py-2 rounded-xl bg-white border border-slate-300 text-sm font-bold"
                  />
                </div>
              ) : (
                <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                  {selectedCharactersList.map((char) => (
                    <div
                      key={char.id}
                      className="flex items-center justify-between gap-3 bg-white p-2.5 rounded-xl border border-slate-200"
                    >
                      <div>
                        <span className="text-xs font-bold text-slate-900">
                          {char.characterNameHi}
                        </span>
                        {char.actorNameHi && (
                          <span className="text-xs text-slate-500 ml-2">
                            ({char.actorNameHi})
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-600">₹</span>
                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={individualRupees[char.id] || ''}
                          onChange={(e) =>
                            setIndividualRupees((prev) => ({
                              ...prev,
                              [char.id]: e.target.value,
                            }))
                          }
                          placeholder="0"
                          className="w-28 px-3 py-1.5 rounded-lg border border-slate-300 text-right text-xs font-bold"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-2 border-t border-orange-200 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">
                  कुल पात्र सहयोग योग (Actor Total):
                </span>
                <span className="text-lg font-extrabold text-rose-900">
                  {formatIndianCurrency(previewActorData.totalAmountPaise)}
                </span>
              </div>
            </div>
          )}

          {step3Error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700">
              {step3Error}
            </div>
          )}

          <div className="flex justify-between pt-2">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-700 flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={handleStep3Next}
              className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold flex items-center gap-2 shadow-md"
            >
              <span>{t('continueBtn')}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3B: Committee Collection (Skips Actor Selection Completely) */}
      {step === 3 && category === 'COMMITTEE' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-sky-50/90 border border-sky-200">
            <div className="text-xs font-bold text-sky-900 uppercase">संस्था का नाम</div>
            <div className="text-base font-extrabold text-slate-900 mt-0.5">
              Shri Ramleela Committee, Banbasa (श्री रामलीला कमेटी, बनबसा)
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                {t('committeeCategoryLabel')}
              </label>
              <select
                value={committeeSubCategory}
                onChange={(e) => setCommitteeSubCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-sm font-bold"
              >
                {settings.committeeCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                सहयोग धनराशि (₹ Amount) *
              </label>
              <input
                type="number"
                min="1"
                step="1"
                value={committeeRupees}
                onChange={(e) => setCommitteeRupees(e.target.value)}
                placeholder="उदा. 501"
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-sm font-bold"
              />
            </div>

            {settings.enablePaymentModeField && (
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  {t('paymentModeLabel')}
                </label>
                <select
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-sm font-semibold"
                >
                  {settings.paymentModes.map((pm) => (
                    <option key={pm} value={pm}>
                      {pm}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {step3Error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700">
              {step3Error}
            </div>
          )}

          <div className="flex justify-between pt-3">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-700 flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={handleStep3Next}
              className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold flex items-center gap-2 shadow-md"
            >
              <span>{t('continueBtn')}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Final Review & Confirmation Sheet */}
      {step === 4 && (
        <div className="space-y-5">
          <div className="p-5 rounded-3xl bg-white/90 border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {t('reviewHeading')}
                </h3>
                <p className="text-xs text-slate-500">
                  {performanceDay} • {weekday} • {performanceDate}
                </p>
              </div>
              <div className="text-right">
                <div className="text-xs font-semibold text-slate-500">कुल देय सहयोग राशि</div>
                <div className="text-2xl font-extrabold text-orange-600">
                  {formatIndianCurrency(totalEntryPaise)}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-500">सहयोगकर्ता का नाम:</span>{' '}
                <strong className="text-slate-900">{fullName}</strong>
              </div>
              <div>
                <span className="text-slate-500">स्थान / गाँव:</span>{' '}
                <strong className="text-slate-900">{location}</strong>
              </div>
              {designation && (
                <div>
                  <span className="text-slate-500">पदनाम:</span>{' '}
                  <strong className="text-slate-900">{designation}</strong>
                </div>
              )}
              {shopOrBusinessName && (
                <div>
                  <span className="text-slate-500">प्रतिष्ठान / दुकान:</span>{' '}
                  <strong className="text-slate-900">{shopOrBusinessName}</strong>
                </div>
              )}
              <div>
                <span className="text-slate-500">भुगतान माध्यम:</span>{' '}
                <strong className="text-slate-900">{paymentMode}</strong>
              </div>
              {notes && (
                <div>
                  <span className="text-slate-500">टिप्पणी:</span>{' '}
                  <strong className="text-slate-900">{notes}</strong>
                </div>
              )}
            </div>

            {category === 'ACTOR' ? (
              <div className="border-t border-slate-200 pt-3">
                <div className="text-xs font-bold text-rose-900 mb-2">
                  चयनित पात्र एवं राशि विवरण (
                  {amountMode === 'COMMON'
                    ? `समान राशि: ${formatIndianCurrency(commonPaise)} प्रति पात्र`
                    : 'अलग-अलग राशि'}
                  ):
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {previewActorData.lineItems.map((li) => (
                    <div
                      key={li.id}
                      className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-rose-50/70 border border-rose-200 text-xs"
                    >
                      <span>
                        <strong>{li.characterNameHi}</strong>{' '}
                        {li.actorNameHi ? `(${li.actorNameHi})` : ''}
                      </span>
                      <span className="font-bold text-rose-950">
                        {formatIndianCurrency(li.amountPaise)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="border-t border-slate-200 pt-3">
                <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-sky-950">
                      Shri Ramleela Committee, Banbasa
                    </div>
                    <div className="text-sky-800">मद: {committeeSubCategory}</div>
                  </div>
                  <div className="text-base font-extrabold text-sky-950">
                    {formatIndianCurrency(committeePaise)}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep(3)}
              className="px-5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-700 flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{t('backToEdit')}</span>
            </button>

            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleConfirmAndSave}
              className="px-7 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-sm font-bold flex items-center gap-2 shadow-lg transition"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>{isSubmitting ? t('savingInProgress') : t('confirmAndSave')}</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: Success Confirmation Screen */}
      {step === 5 && (
        <div className="text-center py-8 space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center mx-auto">
            <Sparkles className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-900">
            {t('savedSuccessTitle')}
          </h3>
          <p className="text-xs font-semibold text-slate-600">
            रसीद क्रमांक (Transaction ID):{' '}
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-900 font-bold">
              {savedReceiptId}
            </span>
          </p>
          <div className="text-2xl font-extrabold text-emerald-700">
            {formatIndianCurrency(totalEntryPaise)}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              type="button"
              onClick={resetWizardForAnother}
              className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-md"
            >
              {t('addAnotherEntry')}
            </button>
            <button
              type="button"
              onClick={onFinishToDashboard}
              className="px-5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-800"
            >
              {t('goToDashboard')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};