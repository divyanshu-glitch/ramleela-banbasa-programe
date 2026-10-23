import { CharacterMaster, SanskritPerformanceDay, DayOrdinal, SanskritWeekday } from '../types';

export const SANSKRIT_PERFORMANCE_DAYS: {
  day: SanskritPerformanceDay;
  index: number;
  ordinal: DayOrdinal;
}[] = [
  { day: 'Pratham', index: 1, ordinal: '1st' },
  { day: 'Dutiya', index: 2, ordinal: '2nd' },
  { day: 'Tritiya', index: 3, ordinal: '3rd' },
  { day: 'Chaturthi', index: 4, ordinal: '4th' },
  { day: 'Panchami', index: 5, ordinal: '5th' },
  { day: 'Shashthi', index: 6, ordinal: '6th' },
  { day: 'Saptami', index: 7, ordinal: '7th' },
  { day: 'Ashtami', index: 8, ordinal: '8th' },
  { day: 'Navami', index: 9, ordinal: '9th' },
  { day: 'Dashami', index: 10, ordinal: '10th' },
];

export const SANSKRIT_WEEKDAYS: SanskritWeekday[] = [
  'Somvar',
  'Mangalvar',
  'Budhvar',
  'Guruvar',
  'Shukravar',
  'Shanivar',
  'Ravivar',
];

export interface SeedCharacterWithReference extends CharacterMaster {
  referenceDaysRupees: [number, number, number, number, number, number, number, number, number, number];
}

// All 83 Characters & Actors faithfully transcribed from the 3 Actor Excel screenshots
export const SEED_CHARACTERS_WITH_REF: SeedCharacterWithReference[] = [
  { id: 'char-01', orderIndex: 1, characterNameHi: 'शिवजी', actorNameHi: 'अभिषेक चन्द', isActive: true, referenceDaysRupees: [0, 0, 10, 0, 0, 0, 0, 0, 0, 0] },
  { id: 'char-02', orderIndex: 2, characterNameHi: 'पार्वती', actorNameHi: 'अनुष्का', isActive: true, referenceDaysRupees: [121, 0, 35, 0, 50, 0, 0, 0, 2, 0] },
  { id: 'char-03', orderIndex: 3, characterNameHi: 'श्री राम', actorNameHi: 'शौर्य जोशी', isActive: true, referenceDaysRupees: [0, 125, 500, 231, 712, 903, 765, 537, 700, 421] },
  { id: 'char-04', orderIndex: 4, characterNameHi: 'सीता', actorNameHi: 'रिया चन्द', isActive: true, referenceDaysRupees: [0, 25, 473, 56, 460, 858, 414, 293, 540, 421] },
  { id: 'char-05', orderIndex: 5, characterNameHi: 'लक्ष्मण', actorNameHi: 'वंश बिष्ट', isActive: true, referenceDaysRupees: [0, 125, 624, 81, 611, 903, 714, 294, 1202, 411] },
  { id: 'char-06', orderIndex: 6, characterNameHi: 'भरत', actorNameHi: 'श्रेयांश जोशी', isActive: true, referenceDaysRupees: [0, 0, 272, 21, 521, 803, 286, 143, 939, 288] },
  { id: 'char-07', orderIndex: 7, characterNameHi: 'शत्रुघ्न', actorNameHi: 'सूर्यांश सजवान', isActive: true, referenceDaysRupees: [0, 0, 272, 21, 421, 753, 265, 692, 438, 186] },
  { id: 'char-08', orderIndex: 8, characterNameHi: 'दशरथ', actorNameHi: 'केवल किशोर पाण्डेय', isActive: true, referenceDaysRupees: [0, 50, 461, 272, 1683, 2314, 45, 0, 51, 152] },
  { id: 'char-09', orderIndex: 9, characterNameHi: 'कौशल्या', actorNameHi: 'लीला सजवान', isActive: true, referenceDaysRupees: [0, 0, 35, 0, 30, 32, 10, 0, 51, 102] },
  { id: 'char-10', orderIndex: 10, characterNameHi: 'कैकई', actorNameHi: 'सरिता आर्या', isActive: true, referenceDaysRupees: [0, 0, 35, 251, 0, 32, 10, 0, 100, 50] },
  { id: 'char-11', orderIndex: 11, characterNameHi: 'मंथरा', actorNameHi: 'रवि भट्ट', isActive: true, referenceDaysRupees: [0, 0, 0, 0, 0, 0, 0, 0, 0, 21] },
  { id: 'char-12', orderIndex: 12, characterNameHi: 'सुमित्रा', actorNameHi: 'अनीता कराकोटी', isActive: true, referenceDaysRupees: [0, 0, 25, 0, 30, 32, 60, 0, 0, 50] },
  { id: 'char-13', orderIndex: 13, characterNameHi: 'नटी', actorNameHi: 'हर्षित विष्ट', isActive: true, referenceDaysRupees: [51, 0, 75, 0, 151, 0, 50, 0, 170, 0] },
  { id: 'char-14', orderIndex: 14, characterNameHi: 'सूत्रधार', actorNameHi: 'अमन कश्यप', isActive: true, referenceDaysRupees: [0, 0, 10, 0, 50, 0, 50, 0, 120, 0] },
  { id: 'char-15', orderIndex: 15, characterNameHi: 'तारा', actorNameHi: 'श्रीमती अंजलि भट्ट', isActive: true, referenceDaysRupees: [0, 0, 0, 0, 0, 0, 25, 75, 0, 0] },
  { id: 'char-16', orderIndex: 16, characterNameHi: 'उर्मिला', actorNameHi: 'अनुष्का', isActive: true, referenceDaysRupees: [0, 0, 10, 21, 30, 25, 50, 0, 501, 0] },
  { id: 'char-17', orderIndex: 17, characterNameHi: 'सीता सखी', actorNameHi: 'कियारा सिंह / गरिमा', isActive: true, referenceDaysRupees: [0, 0, 10, 0, 50, 0, 0, 0, 0, 0] },
  { id: 'char-18', orderIndex: 18, characterNameHi: 'अहिल्या', actorNameHi: 'गरिमा सिंह', isActive: true, referenceDaysRupees: [0, 0, 25, 0, 0, 0, 25, 0, 0, 0] },
  { id: 'char-19', orderIndex: 19, characterNameHi: 'सुमंत', actorNameHi: 'प्रकाश गोस्वामी', isActive: true, referenceDaysRupees: [0, 0, 25, 0, 905, 1033, 419, 100, 527, 181] },
  { id: 'char-20', orderIndex: 20, characterNameHi: 'विश्वामित्र', actorNameHi: 'अभिषेक चन्द', isActive: true, referenceDaysRupees: [0, 151, 10, 101, 0, 0, 10, 0, 0, 0] },
  { id: 'char-21', orderIndex: 21, characterNameHi: 'वाल्मीकि ऋषि', actorNameHi: 'ललित कॉलोनी', isActive: true, referenceDaysRupees: [0, 0, 0, 0, 30, 0, 0, 0, 0, 10] },
  { id: 'char-22', orderIndex: 22, characterNameHi: 'नारद', actorNameHi: 'पंकज गुरुंग', isActive: true, referenceDaysRupees: [0, 0, 10, 0, 0, 51, 0, 0, 0, 0] },
  { id: 'char-23', orderIndex: 23, characterNameHi: 'वशिष्ट', actorNameHi: 'चंद्रशेखर शर्मा', isActive: true, referenceDaysRupees: [0, 0, 0, 101, 25, 0, 11, 0, 0, 0] },
  { id: 'char-24', orderIndex: 24, characterNameHi: 'श्रृंगी ऋषि', actorNameHi: 'गजेंद्र गुप्ता', isActive: true, referenceDaysRupees: [0, 0, 35, 0, 0, 0, 0, 0, 0, 0] },
  { id: 'char-25', orderIndex: 25, characterNameHi: 'परशुराम', actorNameHi: 'दीपक भंडारी', isActive: true, referenceDaysRupees: [0, 0, 487, 226, 50, 87, 1886, 0, 232, 50] },
  { id: 'char-26', orderIndex: 26, characterNameHi: 'अत्रिमुनी', actorNameHi: 'गजेंद्र गुप्ता', isActive: true, referenceDaysRupees: [0, 0, 0, 0, 25, 0, 0, 0, 0, 0] },
  { id: 'char-27', orderIndex: 27, characterNameHi: 'अगस्त्य ऋषि', actorNameHi: 'चंद्रशेखर शर्मा', isActive: true, referenceDaysRupees: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { id: 'char-28', orderIndex: 28, characterNameHi: 'सुनैना', actorNameHi: 'अनीता कराकोटी', isActive: true, referenceDaysRupees: [0, 0, 50, 0, 50, 0, 0, 0, 100, 50] },
  { id: 'char-29', orderIndex: 29, characterNameHi: 'सुलोचना', actorNameHi: 'सिया', isActive: true, referenceDaysRupees: [0, 0, 25, 0, 0, 0, 10, 0, 0, 0] },
  { id: 'char-30', orderIndex: 30, characterNameHi: 'गौरी', actorNameHi: 'अनुष्क', isActive: true, referenceDaysRupees: [0, 0, 10, 0, 50, 0, 25, 0, 0, 0] },
  { id: 'char-31', orderIndex: 31, characterNameHi: 'शबरी', actorNameHi: 'श्रीमती लीला सजवाण', isActive: true, referenceDaysRupees: [0, 0, 10, 0, 151, 21, 150, 300, 251, 50] },
  { id: 'char-32', orderIndex: 32, characterNameHi: 'हनुमान', actorNameHi: 'श्री अभिषेक चन्द जी', isActive: true, referenceDaysRupees: [0, 25, 201, 31, 1415, 562, 476, 625, 882, 561] },
  { id: 'char-33', orderIndex: 33, characterNameHi: 'बाली', actorNameHi: 'श्री महेश चन्द जी', isActive: true, referenceDaysRupees: [0, 0, 35, 0, 148, 121, 131, 46, 220, 160] },
  { id: 'char-34', orderIndex: 34, characterNameHi: 'सग्रीव', actorNameHi: 'श्री रवि भट्ट जी', isActive: true, referenceDaysRupees: [0, 0, 35, 0, 57, 132, 135, 42, 90, 60] },
  { id: 'char-35', orderIndex: 35, characterNameHi: 'अंगद', actorNameHi: '', isActive: true, referenceDaysRupees: [0, 0, 10, 0, 50, 11, 35, 91, 266, 85] },
  { id: 'char-36', orderIndex: 36, characterNameHi: 'जामवंत', actorNameHi: 'हिमांशु सक्सेना', isActive: true, referenceDaysRupees: [0, 0, 0, 0, 0, 0, 11, 0, 0, 0] },
  { id: 'char-37', orderIndex: 37, characterNameHi: 'जटायु', actorNameHi: 'दीपक सक्सेना', isActive: true, referenceDaysRupees: [0, 0, 0, 0, 0, 251, 10, 0, 101, 25] },
  { id: 'char-38', orderIndex: 38, characterNameHi: 'सम्पाती', actorNameHi: 'नीरज भट्ट', isActive: true, referenceDaysRupees: [0, 0, 0, 0, 0, 101, 0, 0, 100, 0] },
  { id: 'char-39', orderIndex: 39, characterNameHi: 'जनक', actorNameHi: 'श्री भुवन भट्ट जी', isActive: true, referenceDaysRupees: [0, 0, 403, 622, 252, 333, 150, 0, 300, 21] },
  { id: 'char-40', orderIndex: 40, characterNameHi: 'दशरथ मंत्री', actorNameHi: '', isActive: true, referenceDaysRupees: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { id: 'char-41', orderIndex: 41, characterNameHi: 'जनक मंत्री', actorNameHi: '', isActive: true, referenceDaysRupees: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { id: 'char-42', orderIndex: 42, characterNameHi: 'जनक दूत', actorNameHi: '', isActive: true, referenceDaysRupees: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { id: 'char-43', orderIndex: 43, characterNameHi: 'सुबाहु', actorNameHi: 'शंकर', isActive: true, referenceDaysRupees: [0, 0, 0, 0, 50, 0, 0, 0, 72, 0] },
  { id: 'char-44', orderIndex: 44, characterNameHi: 'समुद्र', actorNameHi: '', isActive: true, referenceDaysRupees: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { id: 'char-45', orderIndex: 45, characterNameHi: 'नल', actorNameHi: 'शौर्य', isActive: true, referenceDaysRupees: [0, 0, 10, 0, 0, 0, 25, 0, 71, 60] },
  { id: 'char-46', orderIndex: 46, characterNameHi: 'नील', actorNameHi: 'नमन खत्री', isActive: true, referenceDaysRupees: [0, 0, 10, 0, 0, 0, 25, 0, 71, 60] },
  { id: 'char-47', orderIndex: 47, characterNameHi: 'मकरध्वज', actorNameHi: 'कमलेश भट्ट', isActive: true, referenceDaysRupees: [0, 0, 0, 0, 187, 251, 0, 0, 50, 2294] },
  { id: 'char-48', orderIndex: 48, characterNameHi: 'केवट', actorNameHi: 'श्री पंकज गुरुंग जी', isActive: true, referenceDaysRupees: [0, 0, 0, 0, 50, 172, 46, 0, 20, 50] },
  { id: 'char-49', orderIndex: 49, characterNameHi: 'राम सेना', actorNameHi: '', isActive: true, referenceDaysRupees: [0, 0, 0, 0, 0, 0, 10, 0, 0, 0] },
  { id: 'char-50', orderIndex: 50, characterNameHi: 'रावण सेना', actorNameHi: '', isActive: true, referenceDaysRupees: [0, 0, 0, 0, 0, 0, 10, 0, 0, 0] },
  { id: 'char-51', orderIndex: 51, characterNameHi: 'किरात', actorNameHi: 'अरुण ठाकुर', isActive: true, referenceDaysRupees: [0, 0, 0, 0, 50, 0, 0, 0, 0, 0] },
  { id: 'char-52', orderIndex: 52, characterNameHi: 'कपट मृग', actorNameHi: 'साहिल तिवारी', isActive: true, referenceDaysRupees: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { id: 'char-53', orderIndex: 53, characterNameHi: 'वनस्त्री', actorNameHi: '', isActive: true, referenceDaysRupees: [0, 0, 0, 0, 0, 75, 25, 0, 151, 46] },
  { id: 'char-54', orderIndex: 54, characterNameHi: 'अनुसुइया', actorNameHi: 'अनुष्का', isActive: true, referenceDaysRupees: [0, 0, 0, 0, 30, 0, 0, 0, 0, 0] },
  { id: 'char-55', orderIndex: 55, characterNameHi: 'रावण', actorNameHi: 'जसवंत बसेड़ा', isActive: true, referenceDaysRupees: [0, 25, 151, 121, 366, 515, 161, 1929, 1523, 838] },
  { id: 'char-56', orderIndex: 56, characterNameHi: 'मंदोदरी', actorNameHi: 'श्रीमती अनीता जी', isActive: true, referenceDaysRupees: [0, 0, 0, 0, 0, 0, 60, 0, 122, 0] },
  { id: 'char-57', orderIndex: 57, characterNameHi: 'कुम्भकरण', actorNameHi: 'श्री उमेद सिंह नेगी जी', isActive: true, referenceDaysRupees: [0, 0, 111, 0, 75, 72, 121, 25, 470, 349] },
  { id: 'char-58', orderIndex: 58, characterNameHi: 'विभीषण', actorNameHi: 'आयुष कापडी', isActive: true, referenceDaysRupees: [0, 0, 10, 21, 0, 0, 217, 201, 420, 61] },
  { id: 'char-59', orderIndex: 59, characterNameHi: 'अहिरावन', actorNameHi: 'दीपक सक्सेना', isActive: true, referenceDaysRupees: [0, 0, 0, 0, 100, 0, 10, 0, 0, 10] },
  { id: 'char-60', orderIndex: 60, characterNameHi: 'मेघनाथ', actorNameHi: 'दीपक सक्सेना', isActive: true, referenceDaysRupees: [0, 0, 35, 21, 244, 2173, 81, 25, 1372, 4439] },
  { id: 'char-61', orderIndex: 61, characterNameHi: 'मारीच', actorNameHi: 'प्रकाश गोस्वामी', isActive: true, referenceDaysRupees: [0, 0, 0, 0, 0, 383, 70, 0, 0, 0] },
  { id: 'char-62', orderIndex: 62, characterNameHi: 'वाणासुर', actorNameHi: 'धर्मेन्द्र पाल', isActive: true, referenceDaysRupees: [0, 0, 510, 25, 605, 21, 250, 0, 100, 10] },
  { id: 'char-63', orderIndex: 63, characterNameHi: 'खर', actorNameHi: 'दीपक सक्सेना', isActive: true, referenceDaysRupees: [0, 0, 0, 0, 0, 171, 71, 0, 0, 0] },
  { id: 'char-64', orderIndex: 64, characterNameHi: 'दूषण', actorNameHi: 'अमन कश्यप', isActive: true, referenceDaysRupees: [0, 0, 0, 0, 0, 172, 71, 0, 0, 0] },
  { id: 'char-65', orderIndex: 65, characterNameHi: 'त्रिसरा', actorNameHi: 'कमलेश भट्ट', isActive: true, referenceDaysRupees: [0, 0, 35, 0, 75, 2083, 150, 0, 150, 10] },
  { id: 'char-66', orderIndex: 66, characterNameHi: 'रावण मंत्री', actorNameHi: 'नीरज भट्ट', isActive: true, referenceDaysRupees: [0, 0, 0, 0, 100, 152, 0, 0, 76, 0] },
  { id: 'char-67', orderIndex: 67, characterNameHi: 'सूर्पनखा', actorNameHi: '', isActive: true, referenceDaysRupees: [0, 0, 0, 0, 0, 152, 71, 0, 51, 0] },
  { id: 'char-68', orderIndex: 68, characterNameHi: 'वन्दीजन', actorNameHi: '', isActive: true, referenceDaysRupees: [0, 0, 0, 0, 50, 0, 0, 0, 0, 0] },
  { id: 'char-69', orderIndex: 69, characterNameHi: 'सुषेन वैध', actorNameHi: '', isActive: true, referenceDaysRupees: [0, 0, 0, 0, 0, 0, 10, 0, 71, 0] },
  { id: 'char-70', orderIndex: 70, characterNameHi: 'माल्यावच', actorNameHi: '', isActive: true, referenceDaysRupees: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { id: 'char-71', orderIndex: 71, characterNameHi: 'अक्षय कुमार', actorNameHi: 'हिमांशु सक्सेना', isActive: true, referenceDaysRupees: [0, 0, 10, 0, 0, 0, 0, 0, 0, 0] },
  { id: 'char-72', orderIndex: 72, characterNameHi: 'राक्षसी प्रमाति', actorNameHi: '', isActive: true, referenceDaysRupees: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { id: 'char-73', orderIndex: 73, characterNameHi: 'बाल अंगद', actorNameHi: 'भावेश रावत', isActive: true, referenceDaysRupees: [0, 0, 10, 0, 50, 0, 0, 20, 20, 0] },
  { id: 'char-74', orderIndex: 74, characterNameHi: 'त्रिजटा', actorNameHi: 'श्री भुवन भट्ट जी', isActive: true, referenceDaysRupees: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { id: 'char-75', orderIndex: 75, characterNameHi: 'ताडीका', actorNameHi: 'रवि भट्ट', isActive: true, referenceDaysRupees: [0, 0, 35, 0, 0, 0, 10, 0, 0, 0] },
  { id: 'char-76', orderIndex: 76, characterNameHi: 'तबला', actorNameHi: 'संदीप/ गौरव कापडी', isActive: true, referenceDaysRupees: [0, 0, 10, 0, 82, 51, 35, 176, 226, 251] },
  { id: 'char-77', orderIndex: 77, characterNameHi: 'नीरज राजा', actorNameHi: 'नीरज भट्ट', isActive: true, referenceDaysRupees: [0, 0, 0, 25, 0, 0, 0, 0, 0, 0] },
  { id: 'char-78', orderIndex: 78, characterNameHi: 'हारमोनियम', actorNameHi: 'रवि राज', isActive: true, referenceDaysRupees: [0, 0, 111, 0, 82, 51, 35, 176, 226, 251] },
  { id: 'char-79', orderIndex: 79, characterNameHi: 'व्यास', actorNameHi: '', isActive: true, referenceDaysRupees: [0, 0, 186, 101, 50, 51, 0, 76, 276, 100] },
  { id: 'char-80', orderIndex: 80, characterNameHi: 'गीता श्लोक', actorNameHi: 'अभिनव गोस्वामी', isActive: true, referenceDaysRupees: [0, 0, 0, 0, 0, 0, 0, 0, 0, 100] },
  { id: 'char-81', orderIndex: 81, characterNameHi: 'मंच संचालक', actorNameHi: 'प्रकाश गोस्वामी', isActive: true, referenceDaysRupees: [0, 100, 0, 0, 0, 0, 0, 0, 251, 0] },
  { id: 'char-82', orderIndex: 82, characterNameHi: 'द्वारपाल', actorNameHi: 'अन्सुमन', isActive: true, referenceDaysRupees: [0, 0, 0, 0, 100, 0, 0, 0, 0, 0] },
  { id: 'char-83', orderIndex: 83, characterNameHi: 'निर्देशक', actorNameHi: 'प्रेम प्रकाश भट्ट', isActive: true, referenceDaysRupees: [0, 0, 0, 0, 0, 51, 0, 100, 0, 0] }
];

export const REFERENCE_COMMITTEE_DATA: {
  subCategory: 'धनराशि (Offline)' | 'धनराशि (Online)' | 'आरती';
  daysRupees: [number, number, number, number, number, number, number, number, number, number];
}[] = [
  {
    subCategory: 'धनराशि (Offline)',
    daysRupees: [3702, 131, 9129, 5209, 16478, 18277, 10695, 28494, 25361, 8490],
  },
  {
    subCategory: 'धनराशि (Online)',
    daysRupees: [0, 1601, 0, 0, 3200, 0, 0, 501, 4200, 0],
  },
  {
    subCategory: 'आरती',
    daysRupees: [469, 571, 1297, 645, 1099, 1606, 1633, 1116, 866, 2252],
  },
];

export const INITIAL_CHARACTERS: CharacterMaster[] = SEED_CHARACTERS_WITH_REF.map(
  ({ referenceDaysRupees, ...rest }) => rest
);