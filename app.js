
// Ramleela Banbasa Collection Management System — Standalone Core Engine

const SANSKRIT_PERFORMANCE_DAYS = [
  { day: 'Pratham', index: 1, ordinal: '1st' },
  { day: 'Dutiya', index: 2, ordinal: '2nd' },
  { day: 'Tritiya', index: 3, ordinal: '3rd' },
  { day: 'Chaturthi', index: 4, ordinal: '4th' },
  { day: 'Panchami', index: 5, ordinal: '5th' },
  { day: 'Shashthi', index: 6, ordinal: '6th' },
  { day: 'Saptami', index: 7, ordinal: '7th' },
  { day: 'Ashtami', index: 8, ordinal: '8th' },
  { day: 'Navami', index: 9, ordinal: '9th' },
  { day: 'Dashami', index: 10, ordinal: '10th' }
];

const SANSKRIT_WEEKDAYS = [
  'Somvar', 'Mangalvar', 'Budhvar', 'Guruvar', 'Shukravar', 'Shanivar', 'Ravivar'
];

const SEED_CHARACTERS = [
  { id: 'char-01', orderIndex: 1, characterNameHi: 'शिवजी', actorNameHi: 'अभिषेक चन्द', isActive: true, ref: [0, 0, 10, 0, 0, 0, 0, 0, 0, 0] },
  { id: 'char-02', orderIndex: 2, characterNameHi: 'पार्वती', actorNameHi: 'अनुष्का', isActive: true, ref: [121, 0, 35, 0, 50, 0, 0, 0, 2, 0] },
  { id: 'char-03', orderIndex: 3, characterNameHi: 'श्री राम', actorNameHi: 'शौर्य जोशी', isActive: true, ref: [0, 125, 500, 231, 712, 903, 765, 537, 700, 421] },
  { id: 'char-04', orderIndex: 4, characterNameHi: 'सीता', actorNameHi: 'रिया चन्द', isActive: true, ref: [0, 25, 473, 56, 460, 858, 414, 293, 540, 421] },
  { id: 'char-05', orderIndex: 5, characterNameHi: 'लक्ष्मण', actorNameHi: 'वंश बिष्ट', isActive: true, ref: [0, 125, 624, 81, 611, 903, 714, 294, 1202, 411] },
  { id: 'char-06', orderIndex: 6, characterNameHi: 'भरत', actorNameHi: 'श्रेयांश जोशी', isActive: true, ref: [0, 0, 272, 21, 521, 803, 286, 143, 939, 288] },
  { id: 'char-07', orderIndex: 7, characterNameHi: 'शत्रुघ्न', actorNameHi: 'सूर्यांश सजवान', isActive: true, ref: [0, 0, 272, 21, 421, 753, 265, 692, 438, 186] },
  { id: 'char-08', orderIndex: 8, characterNameHi: 'दशरथ', actorNameHi: 'केवल किशोर पाण्डेय', isActive: true, ref: [0, 50, 461, 272, 1683, 2314, 45, 0, 51, 152] },
  { id: 'char-09', orderIndex: 9, characterNameHi: 'कौशल्या', actorNameHi: 'लीला सजवान', isActive: true, ref: [0, 0, 35, 0, 30, 32, 10, 0, 51, 102] },
  { id: 'char-10', orderIndex: 10, characterNameHi: 'कैकई', actorNameHi: 'सरिता आर्या', isActive: true, ref: [0, 0, 35, 251, 0, 32, 10, 0, 100, 50] },
  { id: 'char-11', orderIndex: 11, characterNameHi: 'मंथरा', actorNameHi: 'रवि भट्ट', isActive: true, ref: [0, 0, 0, 0, 0, 0, 0, 0, 0, 21] },
  { id: 'char-12', orderIndex: 12, characterNameHi: 'सुमित्रा', actorNameHi: 'अनीता कराकोटी', isActive: true, ref: [0, 0, 25, 0, 30, 32, 60, 0, 0, 50] },
  { id: 'char-13', orderIndex: 13, characterNameHi: 'नटी', actorNameHi: 'हर्षित विष्ट', isActive: true, ref: [51, 0, 75, 0, 151, 0, 50, 0, 170, 0] },
  { id: 'char-14', orderIndex: 14, characterNameHi: 'सूत्रधार', actorNameHi: 'अमन कश्यप', isActive: true, ref: [0, 0, 10, 0, 50, 0, 50, 0, 120, 0] },
  { id: 'char-15', orderIndex: 15, characterNameHi: 'तारा', actorNameHi: 'श्रीमती अंजलि भट्ट', isActive: true, ref: [0, 0, 0, 0, 0, 0, 25, 75, 0, 0] },
  { id: 'char-16', orderIndex: 16, characterNameHi: 'उर्मिला', actorNameHi: 'अनुष्का', isActive: true, ref: [0, 0, 10, 21, 30, 25, 50, 0, 501, 0] },
  { id: 'char-17', orderIndex: 17, characterNameHi: 'सीता सखी', actorNameHi: 'कियारा सिंह / गरिमा', isActive: true, ref: [0, 0, 10, 0, 50, 0, 0, 0, 0, 0] },
  { id: 'char-18', orderIndex: 18, characterNameHi: 'अहिल्या', actorNameHi: 'गरिमा सिंह', isActive: true, ref: [0, 0, 25, 0, 0, 0, 25, 0, 0, 0] },
  { id: 'char-19', orderIndex: 19, characterNameHi: 'सुमंत', actorNameHi: 'प्रकाश गोस्वामी', isActive: true, ref: [0, 0, 25, 0, 905, 1033, 419, 100, 527, 181] },
  { id: 'char-20', orderIndex: 20, characterNameHi: 'विश्वामित्र', actorNameHi: 'अभिषेक चन्द', isActive: true, ref: [0, 151, 10, 101, 0, 0, 10, 0, 0, 0] },
  { id: 'char-21', orderIndex: 21, characterNameHi: 'वाल्मीकि ऋषि', actorNameHi: 'ललित कॉलोनी', isActive: true, ref: [0, 0, 0, 0, 30, 0, 0, 0, 0, 10] },
  { id: 'char-22', orderIndex: 22, characterNameHi: 'नारद', actorNameHi: 'पंकज गुरुंग', isActive: true, ref: [0, 0, 10, 0, 0, 51, 0, 0, 0, 0] },
  { id: 'char-23', orderIndex: 23, characterNameHi: 'वशिष्ट', actorNameHi: 'चंद्रशेखर शर्मा', isActive: true, ref: [0, 0, 0, 101, 25, 0, 11, 0, 0, 0] },
  { id: 'char-24', orderIndex: 24, characterNameHi: 'श्रृंगी ऋषि', actorNameHi: 'गजेंद्र गुप्ता', isActive: true, ref: [0, 0, 35, 0, 0, 0, 0, 0, 0, 0] },
  { id: 'char-25', orderIndex: 25, characterNameHi: 'परशुराम', actorNameHi: 'दीपक भंडारी', isActive: true, ref: [0, 0, 487, 226, 50, 87, 1886, 0, 232, 50] },
  { id: 'char-26', orderIndex: 26, characterNameHi: 'अत्रिमुनी', actorNameHi: 'गजेंद्र गुप्ता', isActive: true, ref: [0, 0, 0, 0, 25, 0, 0, 0, 0, 0] },
  { id: 'char-27', orderIndex: 27, characterNameHi: 'अगस्त्य ऋषि', actorNameHi: 'चंद्रशेखर शर्मा', isActive: true, ref: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { id: 'char-28', orderIndex: 28, characterNameHi: 'सुनैना', actorNameHi: 'अनीता कराकोटी', isActive: true, ref: [0, 0, 50, 0, 50, 0, 0, 0, 100, 50] },
  { id: 'char-29', orderIndex: 29, characterNameHi: 'सुलोचना', actorNameHi: 'सिया', isActive: true, ref: [0, 0, 25, 0, 0, 0, 10, 0, 0, 0] },
  { id: 'char-30', orderIndex: 30, characterNameHi: 'गौरी', actorNameHi: 'अनुष्क', isActive: true, ref: [0, 0, 10, 0, 50, 0, 25, 0, 0, 0] },
  { id: 'char-31', orderIndex: 31, characterNameHi: 'शबरी', actorNameHi: 'श्रीमती लीला सजवाण', isActive: true, ref: [0, 0, 10, 0, 151, 21, 150, 300, 251, 50] },
  { id: 'char-32', orderIndex: 32, characterNameHi: 'हनुमान', actorNameHi: 'श्री अभिषेक चन्द जी', isActive: true, ref: [0, 25, 201, 31, 1415, 562, 476, 625, 882, 561] },
  { id: 'char-33', orderIndex: 33, characterNameHi: 'बाली', actorNameHi: 'श्री महेश चन्द जी', isActive: true, ref: [0, 0, 35, 0, 148, 121, 131, 46, 220, 160] },
  { id: 'char-34', orderIndex: 34, characterNameHi: 'सग्रीव', actorNameHi: 'श्री रवि भट्ट जी', isActive: true, ref: [0, 0, 35, 0, 57, 132, 135, 42, 90, 60] },
  { id: 'char-35', orderIndex: 35, characterNameHi: 'अंगद', actorNameHi: '', isActive: true, ref: [0, 0, 10, 0, 50, 11, 35, 91, 266, 85] },
  { id: 'char-36', orderIndex: 36, characterNameHi: 'जामवंत', actorNameHi: 'हिमांशु सक्सेना', isActive: true, ref: [0, 0, 0, 0, 0, 0, 11, 0, 0, 0] },
  { id: 'char-37', orderIndex: 37, characterNameHi: 'जटायु', actorNameHi: 'दीपक सक्सेना', isActive: true, ref: [0, 0, 0, 0, 0, 251, 10, 0, 101, 25] },
  { id: 'char-38', orderIndex: 38, characterNameHi: 'सम्पाती', actorNameHi: 'नीरज भट्ट', isActive: true, ref: [0, 0, 0, 0, 0, 101, 0, 0, 100, 0] },
  { id: 'char-39', orderIndex: 39, characterNameHi: 'जनक', actorNameHi: 'श्री भुवन भट्ट जी', isActive: true, ref: [0, 0, 403, 622, 252, 333, 150, 0, 300, 21] },
  { id: 'char-40', orderIndex: 40, characterNameHi: 'दशरथ मंत्री', actorNameHi: '', isActive: true, ref: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { id: 'char-41', orderIndex: 41, characterNameHi: 'जनक मंत्री', actorNameHi: '', isActive: true, ref: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { id: 'char-42', orderIndex: 42, characterNameHi: 'जनक दूत', actorNameHi: '', isActive: true, ref: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { id: 'char-43', orderIndex: 43, characterNameHi: 'सुबाहु', actorNameHi: 'शंकर', isActive: true, ref: [0, 0, 0, 0, 50, 0, 0, 0, 72, 0] },
  { id: 'char-44', orderIndex: 44, characterNameHi: 'समुद्र', actorNameHi: '', isActive: true, ref: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { id: 'char-45', orderIndex: 45, characterNameHi: 'नल', actorNameHi: 'शौर्य', isActive: true, ref: [0, 0, 10, 0, 0, 0, 25, 0, 71, 60] },
  { id: 'char-46', orderIndex: 46, characterNameHi: 'नील', actorNameHi: 'नमन खत्री', isActive: true, ref: [0, 0, 10, 0, 0, 0, 25, 0, 71, 60] },
  { id: 'char-47', orderIndex: 47, characterNameHi: 'मकरध्वज', actorNameHi: 'कमलेश भट्ट', isActive: true, ref: [0, 0, 0, 0, 187, 251, 0, 0, 50, 2294] },
  { id: 'char-48', orderIndex: 48, characterNameHi: 'केवट', actorNameHi: 'श्री पंकज गुरुंग जी', isActive: true, ref: [0, 0, 0, 0, 50, 172, 46, 0, 20, 50] },
  { id: 'char-49', orderIndex: 49, characterNameHi: 'राम सेना', actorNameHi: '', isActive: true, ref: [0, 0, 0, 0, 0, 0, 10, 0, 0, 0] },
  { id: 'char-50', orderIndex: 50, characterNameHi: 'रावण सेना', actorNameHi: '', isActive: true, ref: [0, 0, 0, 0, 0, 0, 10, 0, 0, 0] },
  { id: 'char-51', orderIndex: 51, characterNameHi: 'किरात', actorNameHi: 'अरुण ठाकुर', isActive: true, ref: [0, 0, 0, 0, 50, 0, 0, 0, 0, 0] },
  { id: 'char-52', orderIndex: 52, characterNameHi: 'कपट मृग', actorNameHi: 'साहिल तिवारी', isActive: true, ref: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { id: 'char-53', orderIndex: 53, characterNameHi: 'वनस्त्री', actorNameHi: '', isActive: true, ref: [0, 0, 0, 0, 0, 75, 25, 0, 151, 46] },
  { id: 'char-54', orderIndex: 54, characterNameHi: 'अनुसुइया', actorNameHi: 'अनुष्का', isActive: true, ref: [0, 0, 0, 0, 30, 0, 0, 0, 0, 0] },
  { id: 'char-55', orderIndex: 55, characterNameHi: 'रावण', actorNameHi: 'जसवंत बसेड़ा', isActive: true, ref: [0, 25, 151, 121, 366, 515, 161, 1929, 1523, 838] },
  { id: 'char-56', orderIndex: 56, characterNameHi: 'मंदोदरी', actorNameHi: 'श्रीमती अनीता जी', isActive: true, ref: [0, 0, 0, 0, 0, 0, 60, 0, 122, 0] },
  { id: 'char-57', orderIndex: 57, characterNameHi: 'कुम्भकरण', actorNameHi: 'श्री उमेद सिंह नेगी जी', isActive: true, ref: [0, 0, 111, 0, 75, 72, 121, 25, 470, 349] },
  { id: 'char-58', orderIndex: 58, characterNameHi: 'विभीषण', actorNameHi: 'आयुष कापडी', isActive: true, ref: [0, 0, 10, 21, 0, 0, 217, 201, 420, 61] },
  { id: 'char-59', orderIndex: 59, characterNameHi: 'अहिरावन', actorNameHi: 'दीपक सक्सेना', isActive: true, ref: [0, 0, 0, 0, 100, 0, 10, 0, 0, 10] },
  { id: 'char-60', orderIndex: 60, characterNameHi: 'मेघनाथ', actorNameHi: 'दीपक सक्सेना', isActive: true, ref: [0, 0, 35, 21, 244, 2173, 81, 25, 1372, 4439] },
  { id: 'char-61', orderIndex: 61, characterNameHi: 'मारीच', actorNameHi: 'प्रकाश गोस्वामी', isActive: true, ref: [0, 0, 0, 0, 0, 383, 70, 0, 0, 0] },
  { id: 'char-62', orderIndex: 62, characterNameHi: 'वाणासुर', actorNameHi: 'धर्मेन्द्र पाल', isActive: true, ref: [0, 0, 510, 25, 605, 21, 250, 0, 100, 10] },
  { id: 'char-63', orderIndex: 63, characterNameHi: 'खर', actorNameHi: 'दीपक सक्सेना', isActive: true, ref: [0, 0, 0, 0, 0, 171, 71, 0, 0, 0] },
  { id: 'char-64', orderIndex: 64, characterNameHi: 'दूषण', actorNameHi: 'अमन कश्यप', isActive: true, ref: [0, 0, 0, 0, 0, 172, 71, 0, 0, 0] },
  { id: 'char-65', orderIndex: 65, characterNameHi: 'त्रिसरा', actorNameHi: 'कमलेश भट्ट', isActive: true, ref: [0, 0, 35, 0, 75, 2083, 150, 0, 150, 10] },
  { id: 'char-66', orderIndex: 66, characterNameHi: 'रावण मंत्री', actorNameHi: 'नीरज भट्ट', isActive: true, ref: [0, 0, 0, 0, 100, 152, 0, 0, 76, 0] },
  { id: 'char-67', orderIndex: 67, characterNameHi: 'सूर्पनखा', actorNameHi: '', isActive: true, ref: [0, 0, 0, 0, 0, 152, 71, 0, 51, 0] },
  { id: 'char-68', orderIndex: 68, characterNameHi: 'वन्दीजन', actorNameHi: '', isActive: true, ref: [0, 0, 0, 0, 50, 0, 0, 0, 0, 0] },
  { id: 'char-69', orderIndex: 69, characterNameHi: 'सुषेन वैध', actorNameHi: '', isActive: true, ref: [0, 0, 0, 0, 0, 0, 10, 0, 71, 0] },
  { id: 'char-70', orderIndex: 70, characterNameHi: 'माल्यावच', actorNameHi: '', isActive: true, ref: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { id: 'char-71', orderIndex: 71, characterNameHi: 'अक्षय कुमार', actorNameHi: 'हिमांशु सक्सेना', isActive: true, ref: [0, 0, 10, 0, 0, 0, 0, 0, 0, 0] },
  { id: 'char-72', orderIndex: 72, characterNameHi: 'राक्षसी प्रमाति', actorNameHi: '', isActive: true, ref: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { id: 'char-73', orderIndex: 73, characterNameHi: 'बाल अंगद', actorNameHi: 'भावेश रावत', isActive: true, ref: [0, 0, 10, 0, 50, 0, 0, 20, 20, 0] },
  { id: 'char-74', orderIndex: 74, characterNameHi: 'त्रिजटा', actorNameHi: 'श्री भुवन भट्ट जी', isActive: true, ref: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { id: 'char-75', orderIndex: 75, characterNameHi: 'ताडीका', actorNameHi: 'रवि भट्ट', isActive: true, ref: [0, 0, 35, 0, 0, 0, 10, 0, 0, 0] },
  { id: 'char-76', orderIndex: 76, characterNameHi: 'तबला', actorNameHi: 'संदीप/ गौरव कापडी', isActive: true, ref: [0, 0, 10, 0, 82, 51, 35, 176, 226, 251] },
  { id: 'char-77', orderIndex: 77, characterNameHi: 'नीरज राजा', actorNameHi: 'नीरज भट्ट', isActive: true, ref: [0, 0, 0, 25, 0, 0, 0, 0, 0, 0] },
  { id: 'char-78', orderIndex: 78, characterNameHi: 'हारमोनियम', actorNameHi: 'रवि राज', isActive: true, ref: [0, 0, 111, 0, 82, 51, 35, 176, 226, 251] },
  { id: 'char-79', orderIndex: 79, characterNameHi: 'व्यास', actorNameHi: '', isActive: true, ref: [0, 0, 186, 101, 50, 51, 0, 76, 276, 100] },
  { id: 'char-80', orderIndex: 80, characterNameHi: 'गीता श्लोक', actorNameHi: 'अभिनव गोस्वामी', isActive: true, ref: [0, 0, 0, 0, 0, 0, 0, 0, 0, 100] },
  { id: 'char-81', orderIndex: 81, characterNameHi: 'मंच संचालक', actorNameHi: 'प्रकाश गोस्वामी', isActive: true, ref: [0, 100, 0, 0, 0, 0, 0, 0, 251, 0] },
  { id: 'char-82', orderIndex: 82, characterNameHi: 'द्वारपाल', actorNameHi: 'अन्सुमन', isActive: true, ref: [0, 0, 0, 0, 100, 0, 0, 0, 0, 0] },
  { id: 'char-83', orderIndex: 83, characterNameHi: 'निर्देशक', actorNameHi: 'प्रेम प्रकाश भट्ट', isActive: true, ref: [0, 0, 0, 0, 0, 51, 0, 100, 0, 0] }
];

const REFERENCE_COMMITTEE_DATA = [
  { subCategory: 'धनराशि (Offline)', daysRupees: [3702, 131, 9129, 5209, 16478, 18277, 10695, 28494, 25361, 8490] },
  { subCategory: 'धनराशि (Online)', daysRupees: [0, 1601, 0, 0, 3200, 0, 0, 501, 4200, 0] },
  { subCategory: 'आरती', daysRupees: [469, 571, 1297, 645, 1099, 1606, 1633, 1116, 866, 2252] }
];

const TRANSLATIONS = {
  hi: {
    appTitle: 'श्री रामलीला कमेटी, बनबसा',
    appSubtitle: 'वित्तीय संग्रह एवं रिपोर्ट प्रबंधन प्रणाली',
    navDashboard: 'डैशबोर्ड',
    navNewEntry: 'नया सहयोग प्रविष्टि',
    navTransactions: 'लेन-देन रिकॉर्ड',
    navReports: 'रिपोर्ट्स व Excel निर्यात',
    navSettings: 'सेटिंग्स',
    quickNewEntry: '+ नई प्रविष्टि करें',
    activeSession: 'सक्रिय सत्र',
    changeSession: 'सत्र बदलें',
    totalCombined: 'कुल संयुक्त संग्रह',
    totalActorSide: 'कुल पात्र (Actor) संग्रह',
    totalCommitteeSide: 'कुल कमेटी संग्रह',
    totalTransactions: 'कुल लेन-देन',
    chartTitle: 'दिवस-वार संग्रह रुझान (30% स्थायी दृश्य)',
    chartDaily: 'दैनिक (Daily)',
    chartCumulative: 'संचयी (Cumulative)',
    chartActor: 'पात्र (Actor)',
    chartCommittee: 'कमेटी (Committee)',
    chartCombined: 'संयुक्त (Combined)',
    dayListTitle: 'दिवस-वार संग्रह विवरण (70% स्क्रॉल सूची)',
    dayColumn: 'दिवस क्रमांक',
    dateColumn: 'दिनांक',
    actorCollectionCol: 'पात्र संग्रह',
    committeeCollectionCol: 'कमेटी संग्रह',
    combinedCollectionCol: 'संयुक्त योग',
    txCountCol: 'प्रविष्टियाँ',
    wizardStep1: '1. सहयोगकर्ता विवरण',
    wizardStep2: '2. संग्रह श्रेणी',
    wizardStep3: '3. राशि एवं पात्र चयन',
    wizardStep4: '4. समीक्षा एवं पुष्टि',
    contributorName: 'सहयोगकर्ता का पूरा नाम *',
    contributorLocation: 'निवास स्थान / गाँव / बाज़ार (Location) *',
    contributorDesignation: 'पदनाम (Designation - वैकल्पिक)',
    contributorShop: 'दुकान या प्रतिष्ठान का नाम (वैकल्पिक)',
    contributorMobile: 'मोबाइल नंबर (वैकल्पिक)',
    contributorNotes: 'टिप्पणी / विवरण (वैकल्पिक)',
    categoryActorTitle: 'पात्र-पक्ष संग्रह (Actor-Side Collection)',
    categoryActorDesc: 'एक या अधिक रामलीला पात्रों / कलाकारों को समर्पित पुरस्कार या भेंट राशि।',
    categoryCommitteeTitle: 'कमेटी संग्रह (Committee Collection)',
    categoryCommitteeDesc: 'श्री रामलीला कमेटी, बनबसा को सीधा सहयोग (ऑफ़लाइन, ऑनलाइन या आरती)।',
    modeIndividual: 'प्रत्येक पात्र के लिए अलग-अलग राशि',
    modeCommon: 'सभी चयनित पात्रों के लिए एक समान राशि',
    commonAmountExplanation: 'यह राशि प्रत्येक चयनित पात्र को अलग-अलग दी जाएगी (राशि का विभाजन नहीं किया जाएगा)।',
    searchCharactersPlaceholder: 'पात्र या अभिनयकर्ता का नाम खोजें...',
    committeeCategoryLabel: 'कमेटी संग्रह उप-श्रेणी',
    paymentModeLabel: 'भुगतान माध्यम',
    reviewHeading: 'प्रविष्टि की अंतिम समीक्षा एवं पुष्टि',
    backToEdit: 'वापस संशोधित करें',
    confirmAndSave: 'पुष्टि करें और सहेजें',
    savedSuccessTitle: 'लेन-देन सफलतापूर्वक सुरक्षित किया गया!',
    addAnotherEntry: 'एक और प्रविष्टि जोड़ें',
    goToDashboard: 'डैशबोर्ड पर जाएँ',
    exportActorBtn: 'Export Actor Collection (.xlsx)',
    exportCommitteeBtn: 'Export Committee Collection (.xlsx)',
    exportCombinedBtn: 'Export Combined Collection (.xlsx)',
    exportDetailedBtn: 'Export Detailed Transactions (.xlsx)',
    demoModeBanner: 'डेमो मोड सक्रिय है (स्क्रीनशॉट संदर्भ डेटा ₹2,21,642 लोड है)',
    loadDemoDataBtn: 'स्क्रीनशॉट संदर्भ डेटा (Demo Mode) लोड करें',
    exitDemoDataBtn: 'डेमो मोड बंद करें (वास्तविक डेटा पर लौटें)'
  },
  en: {
    appTitle: 'Shri Ramleela Committee, Banbasa',
    appSubtitle: 'Financial Collection & Reporting Management System',
    navDashboard: 'Dashboard',
    navNewEntry: 'New Entry',
    navTransactions: 'Transactions',
    navReports: 'Reports & Excel Export',
    navSettings: 'Settings',
    quickNewEntry: '+ New Collection Entry',
    activeSession: 'Active Session',
    changeSession: 'Change Session',
    totalCombined: 'Total Combined Collection',
    totalActorSide: 'Total Actor-Side Collection',
    totalCommitteeSide: 'Total Committee Collection',
    totalTransactions: 'Total Transactions',
    chartTitle: 'Day-Wise Collection Trend (30% Persistent View)',
    chartDaily: 'Daily',
    chartCumulative: 'Cumulative',
    chartActor: 'Actor',
    chartCommittee: 'Committee',
    chartCombined: 'Combined',
    dayListTitle: 'Day-Wise Collection Summary (70% Scrollable View)',
    dayColumn: 'Session Order',
    dateColumn: 'Date',
    actorCollectionCol: 'Actor Collection',
    committeeCollectionCol: 'Committee Collection',
    combinedCollectionCol: 'Combined Total',
    txCountCol: 'Entries',
    wizardStep1: '1. Contributor Info',
    wizardStep2: '2. Category',
    wizardStep3: '3. Allocation & Amount',
    wizardStep4: '4. Review & Confirm',
    contributorName: "Contributor's Full Name *",
    contributorLocation: "Contributor's Location / Village / Locality *",
    contributorDesignation: 'Designation (Optional)',
    contributorShop: 'Shop or Business Name (Optional)',
    contributorMobile: 'Mobile Number (Optional)',
    contributorNotes: 'Notes or Remarks (Optional)',
    categoryActorTitle: 'Actor-Side Collection',
    categoryActorDesc: 'Contributor is donating money to one or more Ramleela actors/characters.',
    categoryCommitteeTitle: 'Committee Collection',
    categoryCommitteeDesc: 'Contributor is donating directly to Shri Ramleela Committee, Banbasa.',
    modeIndividual: 'Individual Amounts per Character',
    modeCommon: 'Same Amount for All Selected Characters',
    commonAmountExplanation: 'This amount is applied to EVERY selected character (never divided among characters).',
    searchCharactersPlaceholder: 'Search character or actor name...',
    committeeCategoryLabel: 'Committee Collection Sub-Category',
    paymentModeLabel: 'Payment Mode',
    reviewHeading: 'Final Review & Confirmation',
    backToEdit: 'Back to Edit',
    confirmAndSave: 'Confirm and Save',
    savedSuccessTitle: 'Transaction Saved Successfully!',
    addAnotherEntry: 'Add Another Entry',
    goToDashboard: 'Go to Dashboard',
    exportActorBtn: 'Export Actor Collection (.xlsx)',
    exportCommitteeBtn: 'Export Committee Collection (.xlsx)',
    exportCombinedBtn: 'Export Combined Collection (.xlsx)',
    exportDetailedBtn: 'Export Detailed Transactions (.xlsx)',
    demoModeBanner: 'DEMO MODE ACTIVE (Screenshot Reference Dataset ₹2,21,642 Loaded)',
    loadDemoDataBtn: 'Load Screenshot Reference Data (Demo Mode)',
    exitDemoDataBtn: 'Exit Demo Mode (Return to Real Records)'
  }
};

const DEFAULT_SETTINGS = {
  language: 'hi',
  hasCompletedInitialLanguageSetup: false,
  committeeNameHi: 'श्री रामलीला कमेटी, बनबसा',
  committeeNameEn: 'Shri Ramleela Committee, Banbasa',
  appTitleHi: 'रामलीला बनबसा संग्रह प्रबंधन प्रणाली',
  appTitleEn: 'Ram Leela Banbasa Collection Management System',
  glassOpacity: 74,
  blurIntensity: 18,
  accentColor: 'orange',
  enableMobileField: true,
  enablePaymentModeField: true,
  defaultPaymentMode: 'Cash',
  paymentModes: ['Cash', 'UPI / Online', 'Aarti Plate', 'Cheque'],
  committeeCategories: ['धनराशि (Offline)', 'धनराशि (Online)', 'आरती'],
  isDemoMode: false
};

// --- Math & Currency Helpers ---
function rupeesToPaise(rupees) {
  const p = typeof rupees === 'string' ? parseFloat(rupees) : rupees;
  return (isNaN(p) || p < 0) ? 0 : Math.round(p * 100);
}
function paiseToRupees(paise) {
  return Math.round(paise || 0) / 100;
}
function formatIndianCurrency(paise) {
  const rupees = paiseToRupees(paise);
  const hasFraction = rupees % 1 !== 0;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: hasFraction ? 2 : 0,
    maximumFractionDigits: 2
  }).format(rupees);
}

// --- IndexedDB Local Persistence Engine ---
class CMSDatabase {
  constructor() {
    this.dbName = 'RamleelaBanbasaDB';
    this.version = 1;
    this.db = null;
  }

  async open() {
    if (this.db) return this.db;
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);
      request.onupgradeneeded = (e) => {
        const db = request.result;
        if (!db.objectStoreNames.contains('settings')) db.createObjectStore('settings', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('characters')) db.createObjectStore('characters', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('sessions')) db.createObjectStore('sessions', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('transactions')) db.createObjectStore('transactions', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('auditLogs')) db.createObjectStore('auditLogs', { keyPath: 'id' });
      };
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };
      request.onerror = () => reject(request.error);
    });
  }

  async getSettings() {
    const db = await this.open();
    return new Promise((resolve) => {
      const tx = db.transaction('settings', 'readonly');
      const req = tx.objectStore('settings').get('app-settings');
      req.onsuccess = () => resolve(req.result ? { ...DEFAULT_SETTINGS, ...req.result } : { ...DEFAULT_SETTINGS });
      req.onerror = () => resolve({ ...DEFAULT_SETTINGS });
    });
  }

  async saveSettings(settings) {
    const db = await this.open();
    return new Promise((resolve) => {
      const tx = db.transaction('settings', 'readwrite');
      tx.objectStore('settings').put({ id: 'app-settings', ...settings });
      tx.oncomplete = () => resolve();
    });
  }

  async getCharacters() {
    const db = await this.open();
    return new Promise((resolve) => {
      const tx = db.transaction('characters', 'readonly');
      const req = tx.objectStore('characters').getAll();
      req.onsuccess = () => {
        if (req.result && req.result.length > 0) {
          resolve(req.result.sort((a, b) => a.orderIndex - b.orderIndex));
        } else {
          const init = SEED_CHARACTERS.map(({ ref, ...rest }) => rest);
          this.saveCharacters(init);
          resolve(init);
        }
      };
      req.onerror = () => resolve(SEED_CHARACTERS.map(({ ref, ...rest }) => rest));
    });
  }

  async saveCharacters(chars) {
    const db = await this.open();
    return new Promise((resolve) => {
      const tx = db.transaction('characters', 'readwrite');
      const store = tx.objectStore('characters');
      store.clear();
      for (const c of chars) store.put(c);
      tx.oncomplete = () => resolve();
    });
  }

  async getSessions() {
    const db = await this.open();
    return new Promise((resolve) => {
      const tx = db.transaction('sessions', 'readonly');
      const req = tx.objectStore('sessions').getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => resolve([]);
    });
  }

  async saveSession(session) {
    const db = await this.open();
    return new Promise((resolve) => {
      const tx = db.transaction('sessions', 'readwrite');
      tx.objectStore('sessions').put(session);
      tx.oncomplete = () => resolve();
    });
  }

  async getTransactions() {
    const db = await this.open();
    return new Promise((resolve) => {
      const tx = db.transaction('transactions', 'readonly');
      const req = tx.objectStore('transactions').getAll();
      req.onsuccess = () => resolve((req.result || []).sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || '')));
      req.onerror = () => resolve([]);
    });
  }

  async saveTransaction(txData) {
    const db = await this.open();
    return new Promise((resolve) => {
      const tx = db.transaction('transactions', 'readwrite');
      tx.objectStore('transactions').put(txData);
      tx.oncomplete = () => resolve();
    });
  }

  async deleteTransaction(id) {
    const db = await this.open();
    return new Promise((resolve) => {
      const tx = db.transaction('transactions', 'readwrite');
      tx.objectStore('transactions').delete(id);
      tx.oncomplete = () => resolve();
    });
  }

  async clearAllTransactions() {
    const db = await this.open();
    return new Promise((resolve) => {
      const tx = db.transaction('transactions', 'readwrite');
      tx.objectStore('transactions').clear();
      tx.oncomplete = () => resolve();
    });
  }

  async getAuditLogs() {
    const db = await this.open();
    return new Promise((resolve) => {
      const tx = db.transaction('auditLogs', 'readonly');
      const req = tx.objectStore('auditLogs').getAll();
      req.onsuccess = () => resolve((req.result || []).sort((a, b) => (b.timestamp || '').localeCompare(a.timestamp || '')));
      req.onerror = () => resolve([]);
    });
  }

  async addAuditLog(entry) {
    const db = await this.open();
    return new Promise((resolve) => {
      const tx = db.transaction('auditLogs', 'readwrite');
      tx.objectStore('auditLogs').put(entry);
      tx.oncomplete = () => resolve();
    });
  }
}

const db = new CMSDatabase();

// --- Demo Transaction Generator ---
function generateReferenceDemoTransactions() {
  const demoTxs = [];
  const baseDates = [
    '2026-10-14', '2026-10-15', '2026-10-16', '2026-10-17', '2026-10-18',
    '2026-10-19', '2026-10-20', '2026-10-21', '2026-10-22', '2026-10-23'
  ];
  const weekdays = [
    'Budhvar', 'Guruvar', 'Shukravar', 'Shanivar', 'Ravivar',
    'Somvar', 'Mangalvar', 'Budhvar', 'Guruvar', 'Shukravar'
  ];

  for (let d = 0; d < 10; d++) {
    const dayMeta = SANSKRIT_PERFORMANCE_DAYS[d];
    const txId = `demo-actor-day-${d + 1}`;
    const lineItems = [];

    for (const charSeed of SEED_CHARACTERS) {
      const rupees = charSeed.ref[d];
      if (rupees > 0) {
        lineItems.push({
          id: `${txId}-${charSeed.id}`,
          transactionId: txId,
          characterId: charSeed.id,
          characterNameHi: charSeed.characterNameHi,
          actorNameHi: charSeed.actorNameHi,
          amountPaise: rupees * 100
        });
      }
    }

    if (lineItems.length > 0) {
      const totalPaise = lineItems.reduce((s, li) => s + li.amountPaise, 0);
      demoTxs.push({
        id: txId,
        receiptNumber: `DEMO-ACT-0${d + 1}`,
        category: 'ACTOR',
        performanceDay: dayMeta.day,
        dayIndex: dayMeta.index,
        dayOrdinal: dayMeta.ordinal,
        weekday: weekdays[d],
        performanceDate: baseDates[d],
        contributor: {
          id: `contrib-actor-${d + 1}`,
          fullName: `समस्त श्रद्धालु सहयोगकर्ता (${dayMeta.ordinal} दिवस)`,
          location: 'बनबसा बाज़ार एवं ग्राम क्षेत्र',
          designation: 'संदर्भ रिकॉर्ड (Excel Screenshot)'
        },
        amountEntryMode: 'INDIVIDUAL',
        lineItems,
        paymentMode: 'Cash',
        totalAmountPaise: totalPaise,
        notes: 'अभिनेता संग्रह संदर्भ तालिका से स्वतः निर्मित डेमो प्रविष्टि',
        isDemo: true,
        createdAt: `${baseDates[d]}T21:30:00.000Z`,
        updatedAt: `${baseDates[d]}T21:30:00.000Z`
      });
    }
  }

  for (const commRow of REFERENCE_COMMITTEE_DATA) {
    for (let d = 0; d < 10; d++) {
      const rupees = commRow.daysRupees[d];
      if (rupees <= 0) continue;
      const dayMeta = SANSKRIT_PERFORMANCE_DAYS[d];
      const txId = `demo-comm-${commRow.subCategory}-${d + 1}`;
      demoTxs.push({
        id: txId,
        receiptNumber: `DEMO-COM-${d + 1}-${commRow.subCategory.slice(0, 3)}`,
        category: 'COMMITTEE',
        performanceDay: dayMeta.day,
        dayIndex: dayMeta.index,
        dayOrdinal: dayMeta.ordinal,
        weekday: weekdays[d],
        performanceDate: baseDates[d],
        contributor: {
          id: `contrib-comm-${d + 1}`,
          fullName: `कमेटी सहयोग (${commRow.subCategory})`,
          location: 'बनबसा, चम्पावत'
        },
        lineItems: [],
        organizationName: 'Shri Ramleela Committee, Banbasa',
        committeeSubCategory: commRow.subCategory,
        paymentMode: commRow.subCategory === 'धनराशि (Online)' ? 'UPI / Online' : commRow.subCategory === 'आरती' ? 'Aarti Plate' : 'Cash',
        totalAmountPaise: rupees * 100,
        notes: 'कमेटी संग्रह संदर्भ तालिका से निर्मित डेमो प्रविष्टि',
        isDemo: true,
        createdAt: `${baseDates[d]}T22:00:00.000Z`,
        updatedAt: `${baseDates[d]}T22:00:00.000Z`
      });
    }
  }
  return demoTxs;
}

// --- Day-Wise Summaries Calculator ---
function computeDayWiseSummaries(transactions, sessions) {
  const sessionMap = new Map();
  sessions.forEach(s => sessionMap.set(s.dayIndex, s));

  return SANSKRIT_PERFORMANCE_DAYS.map((dayMeta) => {
    const dayTxs = transactions.filter(t => t.dayIndex === dayMeta.index);
    let actorTotalPaise = 0;
    let committeeOfflinePaise = 0;
    let committeeOnlinePaise = 0;
    let committeeAartiPaise = 0;
    let committeeOtherPaise = 0;

    for (const tx of dayTxs) {
      if (tx.category === 'ACTOR') {
        const lineSum = (tx.lineItems || []).reduce((s, li) => s + li.amountPaise, 0);
        actorTotalPaise += lineSum;
      } else if (tx.category === 'COMMITTEE') {
        if (tx.committeeSubCategory === 'धनराशि (Offline)') committeeOfflinePaise += tx.totalAmountPaise;
        else if (tx.committeeSubCategory === 'धनराशि (Online)') committeeOnlinePaise += tx.totalAmountPaise;
        else if (tx.committeeSubCategory === 'आरती') committeeAartiPaise += tx.totalAmountPaise;
        else committeeOtherPaise += tx.totalAmountPaise;
      }
    }

    const committeeTotalPaise = committeeOfflinePaise + committeeOnlinePaise + committeeAartiPaise + committeeOtherPaise;
    const combinedTotalPaise = actorTotalPaise + committeeTotalPaise;
    const matchedSession = sessionMap.get(dayMeta.index);
    const latestTxWithDate = dayTxs.find(t => Boolean(t.performanceDate));

    return {
      dayIndex: dayMeta.index,
      dayOrdinal: dayMeta.ordinal,
      performanceDay: dayMeta.day,
      weekday: matchedSession?.weekday || latestTxWithDate?.weekday,
      performanceDate: matchedSession?.performanceDate || latestTxWithDate?.performanceDate,
      actorTotalPaise,
      committeeOfflinePaise,
      committeeOnlinePaise,
      committeeAartiPaise,
      committeeOtherPaise,
      committeeTotalPaise,
      combinedTotalPaise,
      transactionCount: dayTxs.length
    };
  });
}

// --- Character Matrix Calculator (83 Characters x 10 Days) ---
function computeCharacterMatrix(characters, transactions) {
  const mapByCharAndDay = new Map();
  characters.forEach(c => mapByCharAndDay.set(c.id, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));

  for (const tx of transactions) {
    if (tx.category !== 'ACTOR') continue;
    const dayIdx = tx.dayIndex - 1;
    if (dayIdx < 0 || dayIdx > 9) continue;
    for (const li of (tx.lineItems || [])) {
      const arr = mapByCharAndDay.get(li.characterId);
      if (arr) arr[dayIdx] += li.amountPaise;
    }
  }

  const columnTotalsPaise = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let grandTotalPaise = 0;
  const sorted = [...characters].sort((a, b) => a.orderIndex - b.orderIndex);

  const rows = sorted.map(char => {
    const dayAmountsPaise = mapByCharAndDay.get(char.id) || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const rowTotalPaise = dayAmountsPaise.reduce((a, b) => a + b, 0);
    for (let i = 0; i < 10; i++) columnTotalsPaise[i] += dayAmountsPaise[i];
    grandTotalPaise += rowTotalPaise;
    return { character: char, dayAmountsPaise, rowTotalPaise };
  });

  return { rows, columnTotalsPaise, grandTotalPaise };
}

// --- ExcelJS Export Engine ---
const THIN_BORDER = {
  top: { style: 'thin', color: { argb: 'FF1E293B' } },
  left: { style: 'thin', color: { argb: 'FF1E293B' } },
  bottom: { style: 'thin', color: { argb: 'FF1E293B' } },
  right: { style: 'thin', color: { argb: 'FF1E293B' } }
};

function triggerDownload(buffer, filename) {
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

async function exportActorWorkbook(characters, transactions) {
  if (typeof ExcelJS === 'undefined') { alert('ExcelJS library is loading, please try again.'); return; }
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Shri Ramleela Committee, Banbasa';
  const sheet = wb.addWorksheet('पात्र संग्रह (Actor Summary)');
  
  sheet.addRow(['पात्र का नाम', 'अभिनयकर्ता का नाम', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', 'Total']);
  sheet.getRow(1).font = { bold: true };
  
  const { rows, columnTotalsPaise, grandTotalPaise } = computeCharacterMatrix(characters, transactions);
  rows.forEach(r => {
    sheet.addRow([
      r.character.characterNameHi,
      r.character.actorNameHi || '',
      ...r.dayAmountsPaise.map(p => paiseToRupees(p)),
      paiseToRupees(r.rowTotalPaise)
    ]);
  });
  
  const totalRow = sheet.addRow(['Total', '', ...columnTotalsPaise.map(p => paiseToRupees(p)), paiseToRupees(grandTotalPaise)]);
  totalRow.font = { bold: true };
  totalRow.eachCell((c, col) => {
    if (col >= 3 && col <= 12) {
      c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF70AD47' } };
      c.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    }
  });

  const buffer = await wb.xlsx.writeBuffer();
  triggerDownload(buffer, `Ramleela_Banbasa_Actor_Collection_${new Date().toISOString().slice(0, 10)}.xlsx`);
}

async function exportCommitteeWorkbook(transactions, sessions, categories) {
  if (typeof ExcelJS === 'undefined') { alert('ExcelJS library is loading, please try again.'); return; }
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Shri Ramleela Committee, Banbasa';
  const sheet = wb.addWorksheet('कमेटी संग्रह (Committee)');
  
  sheet.addRow(['कमेटी', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', 'Total']);
  sheet.getRow(1).font = { bold: true };

  const cats = ['धनराशि (Offline)', 'धनराशि (Online)', 'आरती'];
  cats.forEach(cat => {
    const daysRupees = [];
    for (let d = 1; d <= 10; d++) {
      const sum = transactions.filter(t => t.category === 'COMMITTEE' && t.dayIndex === d && t.committeeSubCategory === cat).reduce((s, t) => s + t.totalAmountPaise, 0);
      daysRupees.push(paiseToRupees(sum));
    }
    const rowSum = daysRupees.reduce((a, b) => a + b, 0);
    sheet.addRow([cat, ...daysRupees, rowSum]);
  });

  const daySummaries = computeDayWiseSummaries(transactions, sessions);
  const grandCommTotal = daySummaries.reduce((s, d) => s + d.committeeTotalPaise, 0);
  const totalRow = sheet.addRow(['Total', ...daySummaries.map(d => paiseToRupees(d.committeeTotalPaise)), paiseToRupees(grandCommTotal)]);
  totalRow.font = { bold: true };

  const buffer = await wb.xlsx.writeBuffer();
  triggerDownload(buffer, `Ramleela_Banbasa_Committee_Collection_${new Date().toISOString().slice(0, 10)}.xlsx`);
}

async function exportCombinedWorkbook(characters, transactions, sessions, categories) {
  if (typeof ExcelJS === 'undefined') { alert('ExcelJS library is loading, please try again.'); return; }
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Shri Ramleela Committee, Banbasa';
  const sheet = wb.addWorksheet('संयुक्त सारांश (Combined)');
  
  sheet.addRow(['दिवस क्र.', 'रामलीला दिवस', 'दिनांक', 'पात्र संग्रह (₹)', 'कमेटी संग्रह (₹)', 'संयुक्त योग (₹)']);
  sheet.getRow(1).font = { bold: true };

  const daySummaries = computeDayWiseSummaries(transactions, sessions);
  daySummaries.forEach(d => {
    sheet.addRow([
      d.dayOrdinal,
      d.performanceDay,
      d.performanceDate || '-',
      paiseToRupees(d.actorTotalPaise),
      paiseToRupees(d.committeeTotalPaise),
      paiseToRupees(d.combinedTotalPaise)
    ]);
  });

  const totalActor = daySummaries.reduce((s, d) => s + d.actorTotalPaise, 0);
  const totalComm = daySummaries.reduce((s, d) => s + d.committeeTotalPaise, 0);
  const totalCombined = totalActor + totalComm;
  const grand = sheet.addRow(['Grand Total', '', '', paiseToRupees(totalActor), paiseToRupees(totalComm), paiseToRupees(totalCombined)]);
  grand.font = { bold: true };

  const buffer = await wb.xlsx.writeBuffer();
  triggerDownload(buffer, `Ramleela_Banbasa_Combined_Report_${new Date().toISOString().slice(0, 10)}.xlsx`);
}

async function exportDetailedWorkbook(transactions) {
  if (typeof ExcelJS === 'undefined') { alert('ExcelJS library is loading, please try again.'); return; }
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Shri Ramleela Committee, Banbasa';
  const sheet = wb.addWorksheet('विस्तृत लेन-देन (Detailed Records)');

  sheet.addRow([
    'रसीद क्र.', 'मंचन दिनांक', 'दिवस', 'वार', 'दिवस क्र.', 'श्रेणी',
    'सहयोगकर्ता का नाम', 'स्थान / गाँव', 'पद / प्रतिष्ठान', 'पात्र / कमेटी मद',
    'अभिनयकर्ता', 'भुगतान माध्यम', 'राशि (₹)', 'टिप्पणी'
  ]);
  sheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
  sheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEA580C' } };

  transactions.forEach(tx => {
    const desigShop = [tx.contributor.designation, tx.contributor.shopOrBusinessName].filter(Boolean).join(' | ');
    if (tx.category === 'COMMITTEE') {
      sheet.addRow([
        tx.receiptNumber, tx.performanceDate, tx.performanceDay, tx.weekday, tx.dayOrdinal, 'कमेटी',
        tx.contributor.fullName, tx.contributor.location, desigShop, tx.committeeSubCategory || 'धनराशि (Offline)',
        'श्री रामलीला कमेटी', tx.paymentMode, paiseToRupees(tx.totalAmountPaise), tx.notes || ''
      ]);
    } else {
      (tx.lineItems || []).forEach(li => {
        sheet.addRow([
          tx.receiptNumber, tx.performanceDate, tx.performanceDay, tx.weekday, tx.dayOrdinal, 'पात्र',
          tx.contributor.fullName, tx.contributor.location, desigShop, li.characterNameHi,
          li.actorNameHi || '-', tx.paymentMode, paiseToRupees(li.amountPaise), tx.notes || ''
        ]);
      });
    }
  });

  const buffer = await wb.xlsx.writeBuffer();
  triggerDownload(buffer, `Ramleela_Banbasa_Detailed_Transactions_${new Date().toISOString().slice(0, 10)}.xlsx`);
}

// --- Application Master State Machine & UI Manager ---
class AppState {
  constructor() {
    this.settings = { ...DEFAULT_SETTINGS };
    this.characters = [];
    this.sessions = [];
    this.activeSession = null;
    this.realTransactions = [];
    this.demoTransactions = [];
    this.auditLogs = [];
    this.activeTab = 'DASHBOARD'; // DASHBOARD | NEW_ENTRY | TRANSACTIONS | REPORTS | SETTINGS
    this.editingTx = null;
    this.isCompactHeader = false;
    this.chartMode = 'COMBINED'; // DAILY | CUMULATIVE | ACTOR | COMMITTEE | COMBINED
    this.reportsPreviewTab = 'ACTOR';
    this.txFilterDay = 'ALL';
    this.txFilterCat = 'ALL';
    this.txFilterChar = 'ALL';
    this.txSearch = '';
    this.txSort = 'DATE_DESC';
    this.deletedUndoTx = null;
    this.showAuditModal = false;
    this.showSessionModal = false;

    // Wizard Form State
    this.wizardStep = 1;
    this.wzDay = 'Pratham';
    this.wzWeekday = 'Shukravar';
    this.wzDate = new Date().toISOString().slice(0, 10);
    this.wzName = '';
    this.wzLoc = '';
    this.wzDesig = '';
    this.wzShop = '';
    this.wzMobile = '';
    this.wzNotes = '';
    this.wzCat = 'ACTOR';
    this.wzSearchChar = '';
    this.wzSelectedChars = [];
    this.wzAmountMode = 'INDIVIDUAL';
    this.wzIndividualRupees = {};
    this.wzCommonRupees = '';
    this.wzCommCat = 'धनराशि (Offline)';
    this.wzCommRupees = '';
    this.wzPaymentMode = 'Cash';
    this.wzSavedReceipt = '';
    this.wzError = '';
  }

  get transactions() {
    return this.settings.isDemoMode ? this.demoTransactions : this.realTransactions;
  }

  t(key) {
    const lang = this.settings.language || 'hi';
    return TRANSLATIONS[lang]?.[key] || key;
  }

  async init() {
    this.settings = await db.getSettings();
    this.characters = await db.getCharacters();
    this.sessions = await db.getSessions();
    this.realTransactions = await db.getTransactions();
    this.auditLogs = await db.getAuditLogs();

    if (this.settings.isDemoMode) {
      this.demoTransactions = generateReferenceDemoTransactions();
    }

    if (this.sessions.length > 0) {
      this.activeSession = [...this.sessions].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0];
    } else {
      this.activeSession = {
        id: 'session-1',
        performanceDay: 'Pratham',
        dayIndex: 1,
        dayOrdinal: '1st',
        weekday: 'Shukravar',
        performanceDate: new Date().toISOString().slice(0, 10),
        updatedAt: new Date().toISOString()
      };
      await db.saveSession(this.activeSession);
    }

    if (!this.settings.hasCompletedInitialLanguageSetup) {
      this.showLanguageModal = true;
    }

    this.applyGlassStyles();
    this.render();
  }

  applyGlassStyles() {
    document.documentElement.style.setProperty('--glass-opacity', (this.settings.glassOpacity / 100).toFixed(2));
    document.documentElement.style.setProperty('--glass-blur', `${this.settings.blurIntensity}px`);
  }

  async updateSettings(partial) {
    this.settings = { ...this.settings, ...partial };
    await db.saveSettings(this.settings);
    this.applyGlassStyles();
    this.render();
  }

  async toggleDemoMode(enabled) {
    if (enabled && this.demoTransactions.length === 0) {
      this.demoTransactions = generateReferenceDemoTransactions();
    }
    await this.updateSettings({ isDemoMode: enabled });
  }

  async saveSession(session) {
    await db.saveSession(session);
    this.sessions = await db.getSessions();
    this.activeSession = session;
    this.showSessionModal = false;
    this.render();
  }

  // --- Render Functions ---
  render() {
    const container = document.getElementById('app');
    if (!container) return;

    if (this.showLanguageModal) {
      container.innerHTML = this.renderLanguageModal();
      return;
    }

    container.innerHTML = `
      <div class="min-h-screen flex flex-col">
        ${this.showSessionModal ? this.renderSessionModal() : ''}
        ${this.renderHeader()}
        ${this.renderNav()}
        <main class="flex-1 px-4 mt-4 max-w-7xl mx-auto w-full">
          ${this.activeTab === 'DASHBOARD' ? this.renderDashboard() : ''}
          ${this.activeTab === 'NEW_ENTRY' ? this.renderWizard() : ''}
          ${this.activeTab === 'TRANSACTIONS' ? this.renderTransactions() : ''}
          ${this.activeTab === 'REPORTS' ? this.renderReports() : ''}
          ${this.activeTab === 'SETTINGS' ? this.renderSettings() : ''}
        </main>
      </div>
    `;
    this.attachEventListeners();
  }

  renderLanguageModal() {
    return `
      <div class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4">
        <div class="liquid-glass max-w-md w-full rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/80">
          <div class="w-12 h-12 rounded-2xl bg-orange-100 border border-orange-200 flex items-center justify-center mb-4 text-orange-600 font-bold text-xl">🌐</div>
          <h2 class="text-xl font-bold text-slate-900 mb-1">भाषा चुनें / Select Language</h2>
          <p class="text-xs text-slate-600 mb-6">श्री रामलीला कमेटी बनबसा संग्रह प्रणाली के लिए भाषा चुनें (Select preferred language):</p>
          <div class="grid grid-cols-2 gap-3 mb-6">
            <button onclick="app.setLanguage('hi')" class="p-4 rounded-2xl border-2 text-left transition ${this.settings.language === 'hi' ? 'border-orange-600 bg-orange-50/90 font-bold' : 'border-slate-200 bg-white/70'}">
              <span class="text-lg font-bold text-slate-900 block">1. हिंदी</span>
              <span class="text-xs text-orange-700 font-semibold mt-1">डिफ़ॉल्ट (Default)</span>
            </button>
            <button onclick="app.setLanguage('en')" class="p-4 rounded-2xl border-2 text-left transition ${this.settings.language === 'en' ? 'border-orange-600 bg-orange-50/90 font-bold' : 'border-slate-200 bg-white/70'}">
              <span class="text-lg font-bold text-slate-900 block">2. English</span>
              <span class="text-xs text-slate-500 font-semibold mt-1">Interface</span>
            </button>
          </div>
          <button onclick="app.confirmLanguage()" class="w-full py-3 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold shadow-md transition flex items-center justify-center gap-2">
            <span>आगे बढ़ें / Continue</span>
          </button>
        </div>
      </div>
    `;
  }

  renderSessionModal() {
    const s = this.activeSession || {};
    return `
      <div class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4">
        <div class="liquid-glass max-w-xl w-full rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/80">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-11 h-11 rounded-2xl bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-600 font-bold text-xl">📅</div>
            <div>
              <h2 class="text-lg sm:text-xl font-bold text-slate-900">${this.t('changeSession')}</h2>
              <p class="text-xs text-slate-600">प्रत्येक लेन-देन के साथ वास्तविक तिथि और दिवस सुरक्षित किया जाता है।</p>
            </div>
          </div>
          <div class="mb-4">
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">रामलीला मंचन दिवस (Sanskrit Performance Day)</label>
            <div class="grid grid-cols-2 sm:grid-cols-5 gap-2">
              ${SANSKRIT_PERFORMANCE_DAYS.map(d => `
                <button type="button" onclick="app.selectSessionDay('${d.day}')" class="px-3 py-2 rounded-xl text-xs font-bold border transition text-center ${s.performanceDay === d.day ? 'bg-orange-600 text-white border-orange-700 shadow-sm' : 'bg-white/80 text-slate-800 border-slate-200 hover:bg-orange-50'}">
                  <div>${d.day}</div>
                  <div class="text-[10px] opacity-80">${d.ordinal}</div>
                </button>
              `).join('')}
            </div>
          </div>
          <div class="mb-4">
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">वार (Weekday)</label>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
              ${SANSKRIT_WEEKDAYS.map(w => `
                <button type="button" onclick="app.selectSessionWeekday('${w}')" class="px-3 py-2 rounded-xl text-xs font-semibold border transition ${s.weekday === w ? 'bg-sky-700 text-white border-sky-800 shadow-sm' : 'bg-white/80 text-slate-800 border-slate-200 hover:bg-sky-50'}">
                  ${w}
                </button>
              `).join('')}
            </div>
          </div>
          <div class="mb-5">
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">मंचन की वास्तविक तिथि</label>
            <input type="date" id="session-date-input" value="${s.performanceDate || new Date().toISOString().slice(0, 10)}" class="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500">
          </div>
          <div class="flex items-center justify-end gap-3">
            <button type="button" onclick="app.showSessionModal = false; app.render();" class="px-4 py-2.5 rounded-xl border border-slate-300 bg-white/80 text-xs font-semibold text-slate-700">रद्द करें / Cancel</button>
            <button type="button" onclick="app.saveSessionDialog()" class="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold shadow-md">सत्र प्रारंभ करें / Save Session</button>
          </div>
        </div>
      </div>
    `;
  }

  renderHeader() {
    const s = this.activeSession;
    return `
      <header class="sticky top-0 z-40 px-4 pt-3">
        <div class="liquid-glass rounded-2xl px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <div class="flex items-center gap-2">
              <span class="w-3.5 h-3.5 rounded-full bg-rose-500 inline-block"></span>
              <button onclick="app.isCompactHeader = !app.isCompactHeader; app.render();" class="w-3.5 h-3.5 rounded-full bg-amber-400 hover:bg-amber-500"></button>
              <button onclick="document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen()" class="w-3.5 h-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600"></button>
            </div>
            <div class="h-5 w-px bg-slate-300/70 hidden sm:block"></div>
            <div>
              <h1 class="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                ${this.settings.language === 'hi' ? this.settings.committeeNameHi : this.settings.committeeNameEn}
              </h1>
              ${!this.isCompactHeader ? `<p class="text-xs text-slate-600">${this.settings.language === 'hi' ? this.settings.appTitleHi : this.settings.appTitleEn}</p>` : ''}
            </div>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <button onclick="app.showSessionModal = true; app.render();" class="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-orange-50/90 hover:bg-orange-100 border border-orange-200 text-xs font-semibold text-orange-950 transition">
              <span>📅</span>
              <span>${s ? `${s.performanceDay} (${s.dayOrdinal}) • ${s.weekday} • ${s.performanceDate}` : this.t('changeSession')}</span>
            </button>
            <button onclick="app.toggleDemoMode(!app.settings.isDemoMode)" class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${this.settings.isDemoMode ? 'bg-rose-900 text-white border-rose-950 shadow-sm' : 'bg-sky-50/90 text-sky-900 border-sky-200 hover:bg-sky-100'}">
              <span>✨</span>
              <span>${this.settings.isDemoMode ? this.t('exitDemoDataBtn') : this.t('loadDemoDataBtn')}</span>
            </button>
            <button onclick="app.updateSettings({ language: app.settings.language === 'hi' ? 'en' : 'hi' })" class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 hover:bg-white border border-slate-200 text-xs font-semibold text-slate-800 transition">
              <span>🌐</span>
              <span>${this.settings.language === 'hi' ? 'English' : 'हिंदी'}</span>
            </button>
          </div>
        </div>
        ${this.settings.isDemoMode ? `
          <div class="mt-2 rounded-xl bg-amber-500/95 text-slate-950 px-4 py-1.5 text-xs font-bold flex items-center justify-between shadow-sm">
            <span>🛡️ ${this.t('demoModeBanner')}</span>
            <button onclick="app.toggleDemoMode(false)" class="underline hover:text-white">${this.t('exitDemoDataBtn')}</button>
          </div>
        ` : ''}
      </header>
    `;
  }

  renderNav() {
    const items = [
      { id: 'DASHBOARD', label: this.t('navDashboard'), icon: '📊' },
      { id: 'NEW_ENTRY', label: this.t('navNewEntry'), icon: '➕' },
      { id: 'TRANSACTIONS', label: this.t('navTransactions'), icon: '🧾' },
      { id: 'REPORTS', label: this.t('navReports'), icon: '📑' },
      { id: 'SETTINGS', label: this.t('navSettings'), icon: '⚙️' }
    ];

    return `
      <nav class="px-4 mt-3 max-w-7xl mx-auto w-full">
        <div class="liquid-glass rounded-2xl p-1.5 flex flex-wrap items-center justify-between gap-2">
          <div class="flex flex-wrap items-center gap-1.5">
            ${items.map(item => `
              <button onclick="app.setActiveTab('${item.id}')" class="px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${this.activeTab === item.id ? 'bg-orange-600 text-white shadow-sm' : 'text-slate-700 hover:bg-white/70'}">
                <span>${item.icon}</span>
                <span>${item.label}</span>
              </button>
            `).join('')}
          </div>
        </div>
      </nav>
    `;
  }

  setActiveTab(tabId) {
    if (tabId !== 'NEW_ENTRY') this.editingTx = null;
    this.activeTab = tabId;
    this.render();
  }

  // --- Dashboard Tab ---
  renderDashboard() {
    const daySummaries = computeDayWiseSummaries(this.transactions, this.sessions);
    const actorTotal = daySummaries.reduce((s, d) => s + d.actorTotalPaise, 0);
    const commTotal = daySummaries.reduce((s, d) => s + d.committeeTotalPaise, 0);
    const combinedTotal = actorTotal + commTotal;
    const txCount = this.transactions.length;

    // SVG Chart Generation
    const chartSvg = this.generateChartSvg(daySummaries);

    return `
      <div class="space-y-4">
        <!-- KPI Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div class="liquid-glass rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p class="text-xs font-semibold text-slate-600">${this.t('totalCombined')}</p>
              <p class="text-xl sm:text-2xl font-bold text-slate-900 mt-1">${formatIndianCurrency(combinedTotal)}</p>
            </div>
            <div class="w-11 h-11 rounded-2xl bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-700 font-bold text-lg">💰</div>
          </div>
          <div class="liquid-glass rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p class="text-xs font-semibold text-slate-600">${this.t('totalActorSide')}</p>
              <p class="text-xl sm:text-2xl font-bold text-rose-900 mt-1">${formatIndianCurrency(actorTotal)}</p>
            </div>
            <div class="w-11 h-11 rounded-2xl bg-rose-100 border border-rose-200 flex items-center justify-center text-rose-800 font-bold text-lg">🎭</div>
          </div>
          <div class="liquid-glass rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p class="text-xs font-semibold text-slate-600">${this.t('totalCommitteeSide')}</p>
              <p class="text-xl sm:text-2xl font-bold text-sky-900 mt-1">${formatIndianCurrency(commTotal)}</p>
            </div>
            <div class="w-11 h-11 rounded-2xl bg-sky-100 border border-sky-200 flex items-center justify-center text-sky-800 font-bold text-lg">🏛️</div>
          </div>
          <div class="liquid-glass rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p class="text-xs font-semibold text-slate-600">${this.t('totalTransactions')}</p>
              <p class="text-xl sm:text-2xl font-bold text-slate-900 mt-1">${txCount}</p>
            </div>
            <button onclick="app.startNewEntry()" class="px-3.5 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition">
              <span>➕</span>
              <span>${this.t('quickNewEntry')}</span>
            </button>
          </div>
        </div>

        <!-- Split View: 30% Persistent Trend Line Graph + 70% Scrollable Day-Wise Table -->
        <div class="flex flex-col lg:flex-row gap-4 items-start">
          <!-- 30% Persistent Graph -->
          <section class="w-full lg:w-[32%] lg:sticky lg:top-24 liquid-glass rounded-3xl p-4 sm:p-5 flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-2 mb-3">
                <span class="text-orange-600 font-bold">📈</span>
                <h2 class="text-sm font-bold text-slate-900">${this.t('chartTitle')}</h2>
              </div>
              <!-- Chart Mode Switcher -->
              <div class="flex flex-wrap gap-1.5 mb-3">
                ${['DAILY', 'CUMULATIVE', 'ACTOR', 'COMMITTEE', 'COMBINED'].map(m => `
                  <button onclick="app.chartMode = '${m}'; app.render();" class="px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${this.chartMode === m ? 'bg-orange-600 text-white shadow-sm' : 'bg-white/80 text-slate-700 hover:bg-orange-50 border border-slate-200'}">
                    ${this.t('chart' + m.charAt(0) + m.slice(1).toLowerCase())}
                  </button>
                `).join('')}
              </div>
            </div>
            <div class="w-full h-64 flex items-center justify-center">
              ${chartSvg}
            </div>
            <div class="mt-3 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-600">
              <span>${this.t('totalCombined')}:</span>
              <span class="font-bold text-slate-900">${formatIndianCurrency(combinedTotal)}</span>
            </div>
          </section>

          <!-- 70% Scrollable Table -->
          <section class="w-full lg:w-[68%] liquid-glass rounded-3xl p-4 sm:p-5 flex flex-col">
            <div class="flex items-center justify-between mb-3">
              <h2 class="text-sm sm:text-base font-bold text-slate-900">${this.t('dayListTitle')}</h2>
              <span class="text-xs font-semibold text-slate-500">1st – 10th Sessions</span>
            </div>
            <div class="max-h-[480px] overflow-y-auto pr-1">
              <table class="w-full text-left border-collapse">
                <thead class="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-slate-200 text-xs font-bold text-slate-700">
                  <tr>
                    <th class="py-2.5 px-3">${this.t('dayColumn')}</th>
                    <th class="py-2.5 px-3">${this.t('dateColumn')}</th>
                    <th class="py-2.5 px-3 text-right">${this.t('actorCollectionCol')}</th>
                    <th class="py-2.5 px-3 text-right">${this.t('committeeCollectionCol')}</th>
                    <th class="py-2.5 px-3 text-right">${this.t('combinedCollectionCol')}</th>
                    <th class="py-2.5 px-3 text-center">${this.t('txCountCol')}</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200/70 text-xs sm:text-sm">
                  ${daySummaries.map(d => `
                    <tr class="hover:bg-orange-50/50 transition-colors">
                      <td class="py-3 px-3 font-bold text-slate-900">
                        <span class="inline-flex items-center justify-center px-2.5 py-1 rounded-lg bg-orange-100/90 text-orange-950 font-bold text-xs">${d.dayOrdinal}</span>
                      </td>
                      <td class="py-3 px-3 text-slate-600 font-medium">${d.performanceDate || '—'}</td>
                      <td class="py-3 px-3 text-right font-semibold text-rose-900">${formatIndianCurrency(d.actorTotalPaise)}</td>
                      <td class="py-3 px-3 text-right font-semibold text-sky-900">
                        <div>${formatIndianCurrency(d.committeeTotalPaise)}</div>
                        ${d.committeeTotalPaise > 0 ? `
                          <div class="text-[10px] text-slate-500 font-normal">
                            Off: ${formatIndianCurrency(d.committeeOfflinePaise)} | On: ${formatIndianCurrency(d.committeeOnlinePaise)} | आरती: ${formatIndianCurrency(d.committeeAartiPaise)}
                          </div>
                        ` : ''}
                      </td>
                      <td class="py-3 px-3 text-right font-bold text-slate-900">${formatIndianCurrency(d.combinedTotalPaise)}</td>
                      <td class="py-3 px-3 text-center">
                        <span class="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold text-xs">${d.transactionCount}</span>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
                <tfoot class="sticky bottom-0 bg-orange-50/95 backdrop-blur-sm border-t-2 border-orange-300 font-bold text-xs sm:text-sm text-slate-900">
                  <tr>
                    <td class="py-3 px-3" colSpan="2">कुल योग (Grand Total)</td>
                    <td class="py-3 px-3 text-right text-rose-900">${formatIndianCurrency(actorTotal)}</td>
                    <td class="py-3 px-3 text-right text-sky-900">${formatIndianCurrency(commTotal)}</td>
                    <td class="py-3 px-3 text-right text-orange-950">${formatIndianCurrency(combinedTotal)}</td>
                    <td class="py-3 px-3 text-center">${txCount}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </section>
        </div>
      </div>
    `;
  }

  generateChartSvg(daySummaries) {
    const width = 340;
    const height = 240;
    const padding = { top: 20, right: 20, bottom: 40, left: 45 };

    const dataPoints = [];
    let cumActor = 0, cumComm = 0, cumComb = 0;

    daySummaries.forEach((d, idx) => {
      const act = paiseToRupees(d.actorTotalPaise);
      const com = paiseToRupees(d.committeeTotalPaise);
      const comb = paiseToRupees(d.combinedTotalPaise);
      cumActor += act;
      cumComm += com;
      cumComb += comb;
      dataPoints.push({
        label: d.performanceDay.slice(0, 4),
        act, com, comb,
        cumActor, cumComm, cumComb
      });
    });

    let maxVal = 1000;
    if (this.chartMode === 'DAILY') maxVal = Math.max(...dataPoints.map(p => Math.max(p.act, p.com)), 1000);
    else if (this.chartMode === 'CUMULATIVE') maxVal = Math.max(...dataPoints.map(p => p.cumComb), 1000);
    else if (this.chartMode === 'ACTOR') maxVal = Math.max(...dataPoints.map(p => p.act), 1000);
    else if (this.chartMode === 'COMMITTEE') maxVal = Math.max(...dataPoints.map(p => p.com), 1000);
    else if (this.chartMode === 'COMBINED') maxVal = Math.max(...dataPoints.map(p => p.comb), 1000);

    const plotW = width - padding.left - padding.right;
    const plotH = height - padding.top - padding.bottom;
    const getX = (idx) => padding.left + (idx / 9) * plotW;
    const getY = (val) => padding.top + plotH - (val / maxVal) * plotH;

    const buildPath = (key) => {
      return dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${getX(i).toFixed(1)} ${getY(p[key]).toFixed(1)}`).join(' ');
    };

    let linesSvg = '';
    if (this.chartMode === 'DAILY') {
      linesSvg += `<path d="${buildPath('act')}" fill="none" stroke="#9f1239" stroke-width="2.5" />`;
      linesSvg += `<path d="${buildPath('com')}" fill="none" stroke="#0284c7" stroke-width="2.5" />`;
      dataPoints.forEach((p, i) => {
        linesSvg += `<circle cx="${getX(i)}" cy="${getY(p.act)}" r="3" fill="#9f1239" />`;
        linesSvg += `<circle cx="${getX(i)}" cy="${getY(p.com)}" r="3" fill="#0284c7" />`;
      });
    } else if (this.chartMode === 'CUMULATIVE') {
      linesSvg += `<path d="${buildPath('cumComb')}" fill="none" stroke="#ea580c" stroke-width="3" />`;
      dataPoints.forEach((p, i) => { linesSvg += `<circle cx="${getX(i)}" cy="${getY(p.cumComb)}" r="3.5" fill="#ea580c" />`; });
    } else if (this.chartMode === 'ACTOR') {
      linesSvg += `<path d="${buildPath('act')}" fill="none" stroke="#9f1239" stroke-width="3" />`;
      dataPoints.forEach((p, i) => { linesSvg += `<circle cx="${getX(i)}" cy="${getY(p.act)}" r="3.5" fill="#9f1239" />`; });
    } else if (this.chartMode === 'COMMITTEE') {
      linesSvg += `<path d="${buildPath('com')}" fill="none" stroke="#0284c7" stroke-width="3" />`;
      dataPoints.forEach((p, i) => { linesSvg += `<circle cx="${getX(i)}" cy="${getY(p.com)}" r="3.5" fill="#0284c7" />`; });
    } else {
      linesSvg += `<path d="${buildPath('comb')}" fill="none" stroke="#ea580c" stroke-width="3" />`;
      dataPoints.forEach((p, i) => { linesSvg += `<circle cx="${getX(i)}" cy="${getY(p.comb)}" r="3.5" fill="#ea580c" />`; });
    }

    const xLabels = dataPoints.map((p, i) => `<text x="${getX(i)}" y="${height - 12}" font-size="9" fill="#475569" text-anchor="middle" font-weight="600">${p.label}</text>`).join('');
    const yLabels = [0, 0.5, 1].map(ratio => {
      const val = Math.round(maxVal * ratio);
      const str = val >= 1000 ? `₹${(val / 1000).toFixed(0)}k` : `₹${val}`;
      return `<text x="${padding.left - 6}" y="${getY(val) + 3}" font-size="9" fill="#64748b" text-anchor="end">${str}</text>`;
    }).join('');

    return `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" class="w-full h-full overflow-visible">
        <line x1="${padding.left}" y1="${padding.top}" x2="${padding.left}" y2="${height - padding.bottom}" stroke="#cbd5e1" stroke-width="1" />
        <line x1="${padding.left}" y1="${height - padding.bottom}" x2="${width - padding.right}" y2="${height - padding.bottom}" stroke="#cbd5e1" stroke-width="1" />
        ${linesSvg}
        ${xLabels}
        ${yLabels}
      </svg>
    `;
  }

  // --- New Entry Wizard Tab ---
  startNewEntry() {
    this.editingTx = null;
    this.wizardStep = 1;
    this.wzDay = this.activeSession?.performanceDay || 'Pratham';
    this.wzWeekday = this.activeSession?.weekday || 'Shukravar';
    this.wzDate = this.activeSession?.performanceDate || new Date().toISOString().slice(0, 10);
    this.wzName = '';
    this.wzLoc = '';
    this.wzDesig = '';
    this.wzShop = '';
    this.wzMobile = '';
    this.wzNotes = '';
    this.wzCat = 'ACTOR';
    this.wzSelectedChars = [];
    this.wzIndividualRupees = {};
    this.wzCommonRupees = '';
    this.wzCommCat = 'धनराशि (Offline)';
    this.wzCommRupees = '';
    this.wzPaymentMode = 'Cash';
    this.wzError = '';
    this.setActiveTab('NEW_ENTRY');
  }

  editTransaction(tx) {
    this.editingTx = tx;
    this.wizardStep = 1;
    this.wzDay = tx.performanceDay;
    this.wzWeekday = tx.weekday;
    this.wzDate = tx.performanceDate;
    this.wzName = tx.contributor.fullName;
    this.wzLoc = tx.contributor.location;
    this.wzDesig = tx.contributor.designation || '';
    this.wzShop = tx.contributor.shopOrBusinessName || '';
    this.wzMobile = tx.contributor.mobileNumber || '';
    this.wzNotes = tx.notes || '';
    this.wzCat = tx.category;
    this.wzSelectedChars = (tx.lineItems || []).map(li => li.characterId);
    this.wzAmountMode = tx.amountEntryMode || 'INDIVIDUAL';
    this.wzIndividualRupees = {};
    (tx.lineItems || []).forEach(li => { this.wzIndividualRupees[li.characterId] = String(paiseToRupees(li.amountPaise)); });
    this.wzCommonRupees = tx.commonPerCharacterPaise ? String(paiseToRupees(tx.commonPerCharacterPaise)) : '';
    this.wzCommCat = tx.committeeSubCategory || 'धनराशि (Offline)';
    this.wzCommRupees = tx.category === 'COMMITTEE' ? String(paiseToRupees(tx.totalAmountPaise)) : '';
    this.wzPaymentMode = tx.paymentMode || 'Cash';
    this.wzError = '';
    this.setActiveTab('NEW_ENTRY');
  }

  renderWizard() {
    return `
      <div class="liquid-glass rounded-3xl p-5 sm:p-7 max-w-4xl mx-auto">
        <!-- Progress Steps -->
        ${this.wizardStep < 5 ? `
          <div class="grid grid-cols-4 gap-2 mb-6">
            ${[
              { num: 1, label: this.t('wizardStep1') },
              { num: 2, label: this.t('wizardStep2') },
              { num: 3, label: this.t('wizardStep3') },
              { num: 4, label: this.t('wizardStep4') }
            ].map(s => `
              <div class="px-3 py-2 rounded-xl text-xs font-bold border transition ${this.wizardStep === s.num ? 'bg-orange-600 text-white border-orange-700 shadow-sm' : this.wizardStep > s.num ? 'bg-emerald-50 text-emerald-900 border-emerald-200' : 'bg-white/60 text-slate-500 border-slate-200'}">
                ${s.label}
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${this.wizardStep === 1 ? this.renderWizardStep1() : ''}
        ${this.wizardStep === 2 ? this.renderWizardStep2() : ''}
        ${this.wizardStep === 3 ? (this.wzCat === 'ACTOR' ? this.renderWizardStep3Actor() : this.renderWizardStep3Comm()) : ''}
        ${this.wizardStep === 4 ? this.renderWizardStep4Review() : ''}
        ${this.wizardStep === 5 ? this.renderWizardStep5Success() : ''}
      </div>
    `;
  }

  renderWizardStep1() {
    return `
      <div class="space-y-4">
        <div class="p-3.5 rounded-2xl bg-orange-50/80 border border-orange-200 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label class="block text-[11px] font-bold text-slate-700 mb-1">रामलीला दिवस (Day)</label>
            <select id="wz-day" onchange="app.wzDay = this.value" class="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold">
              ${SANSKRIT_PERFORMANCE_DAYS.map(d => `<option value="${d.day}" ${this.wzDay === d.day ? 'selected' : ''}>${d.day} (${d.ordinal})</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-slate-700 mb-1">वार (Weekday)</label>
            <select id="wz-weekday" onchange="app.wzWeekday = this.value" class="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold">
              ${SANSKRIT_WEEKDAYS.map(w => `<option value="${w}" ${this.wzWeekday === w ? 'selected' : ''}>${w}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-slate-700 mb-1">मंचन दिनांक (Date)</label>
            <input type="date" id="wz-date" value="${this.wzDate}" onchange="app.wzDate = this.value" class="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold">
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-slate-800 mb-1">${this.t('contributorName')}</label>
            <input type="text" id="wz-name" value="${this.wzName}" oninput="app.wzName = this.value" placeholder="उदा. श्री रमेश चन्द्र पाण्डेय" class="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-orange-500">
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-800 mb-1">${this.t('contributorLocation')}</label>
            <input type="text" id="wz-loc" value="${this.wzLoc}" oninput="app.wzLoc = this.value" placeholder="उदा. मुख्य बाज़ार बनबसा / पचपकरिया" class="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-orange-500">
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">${this.t('contributorDesignation')}</label>
            <input type="text" id="wz-desig" value="${this.wzDesig}" oninput="app.wzDesig = this.value" placeholder="उदा. अध्यक्ष / व्यापार मंडल" class="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-sm">
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">${this.t('contributorShop')}</label>
            <input type="text" id="wz-shop" value="${this.wzShop}" oninput="app.wzShop = this.value" placeholder="उदा. पाण्डेय जनरल स्टोर" class="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-sm">
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">${this.t('contributorMobile')}</label>
            <input type="tel" id="wz-mobile" value="${this.wzMobile}" oninput="app.wzMobile = this.value" placeholder="98XXXXXXXX" class="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-sm">
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">${this.t('contributorNotes')}</label>
            <input type="text" id="wz-notes" value="${this.wzNotes}" oninput="app.wzNotes = this.value" placeholder="विशेष विवरण..." class="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-sm">
          </div>
        </div>

        ${this.wzError ? `<div class="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700">${this.wzError}</div>` : ''}

        <div class="flex justify-end pt-3">
          <button type="button" onclick="app.validateWizardStep1()" class="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold flex items-center gap-2 shadow-md">
            <span>${this.t('continueBtn')}</span>
            <span>➡️</span>
          </button>
        </div>
      </div>
    `;
  }

  validateWizardStep1() {
    if (!this.wzName.trim()) { this.wzError = 'कृपया सहयोगकर्ता का पूरा नाम दर्ज करें।'; this.render(); return; }
    if (!this.wzLoc.trim()) { this.wzError = 'कृपया सहयोगकर्ता का निवास स्थान / गाँव दर्ज करें।'; this.render(); return; }
    this.wzError = '';
    this.wizardStep = 2;
    this.render();
  }

  renderWizardStep2() {
    return `
      <div class="space-y-5">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button type="button" onclick="app.wzCat = 'ACTOR'; app.render();" class="p-6 rounded-3xl border-2 text-left transition flex flex-col justify-between ${this.wzCat === 'ACTOR' ? 'border-rose-700 bg-rose-50/90 shadow-md' : 'border-slate-200 bg-white/80 hover:bg-white'}">
            <div>
              <div class="w-12 h-12 rounded-2xl bg-rose-100 text-rose-800 flex items-center justify-center mb-4 text-xl font-bold">🎭</div>
              <h3 class="text-lg font-bold text-slate-900">Option A: ${this.t('categoryActorTitle')}</h3>
              <p class="text-xs text-slate-600 mt-1">${this.t('categoryActorDesc')}</p>
            </div>
            <div class="mt-4 text-xs font-bold text-rose-800">✓ 83 रामलीला पात्र एवं कलाकार सूची</div>
          </button>
          <button type="button" onclick="app.wzCat = 'COMMITTEE'; app.render();" class="p-6 rounded-3xl border-2 text-left transition ${this.wzCat === 'COMMITTEE' ? 'border-sky-700 bg-sky-50/90 shadow-md' : 'border-slate-200 bg-white/80 hover:bg-white'}">
            <div>
              <div class="w-12 h-12 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center mb-4 text-xl font-bold">🏛️</div>
              <h3 class="text-lg font-bold text-slate-900">Option B: ${this.t('categoryCommitteeTitle')}</h3>
              <p class="text-xs text-slate-600 mt-1">${this.t('categoryCommitteeDesc')}</p>
            </div>
            <div class="mt-4 text-xs font-bold text-sky-800">✓ धनराशि (Offline), धनराशि (Online), आरती</div>
          </button>
        </div>
        <div class="flex justify-between pt-3">
          <button type="button" onclick="app.wizardStep = 1; app.render();" class="px-5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-700">Back</button>
          <button type="button" onclick="app.wizardStep = 3; app.render();" class="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold">Continue ➡️</button>
        </div>
      </div>
    `;
  }

  renderWizardStep3Actor() {
    const q = this.wzSearchChar.trim().toLowerCase();
    const filtered = q ? this.characters.filter(c => c.characterNameHi.toLowerCase().includes(q) || (c.actorNameHi || '').toLowerCase().includes(q)) : this.characters;
    const selectedList = this.characters.filter(c => this.wzSelectedChars.includes(c.id));

    let totalPaise = 0;
    if (this.wzAmountMode === 'COMMON') {
      const perChar = rupeesToPaise(this.wzCommonRupees);
      totalPaise = perChar * selectedList.length;
    } else {
      selectedList.forEach(c => {
        totalPaise += rupeesToPaise(this.wzIndividualRupees[c.id] || '0');
      });
    }

    return `
      <div class="space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div class="relative flex-1 min-w-[240px]">
            <input type="text" value="${this.wzSearchChar}" oninput="app.wzSearchChar = this.value; app.render();" placeholder="${this.t('searchCharactersPlaceholder')}" class="w-full pl-4 pr-4 py-2 rounded-xl bg-white border border-slate-300 text-sm">
          </div>
          <div class="flex items-center gap-2">
            <button type="button" onclick="app.wzAmountMode = 'INDIVIDUAL'; app.render();" class="px-3 py-2 rounded-xl text-xs font-bold border transition ${this.wzAmountMode === 'INDIVIDUAL' ? 'bg-rose-800 text-white border-rose-900' : 'bg-white text-slate-700 border-slate-300'}">Mode 1: ${this.t('modeIndividual')}</button>
            <button type="button" onclick="app.wzAmountMode = 'COMMON'; app.render();" class="px-3 py-2 rounded-xl text-xs font-bold border transition ${this.wzAmountMode === 'COMMON' ? 'bg-rose-800 text-white border-rose-900' : 'bg-white text-slate-700 border-slate-300'}">Mode 2: ${this.t('modeCommon')}</button>
          </div>
        </div>

        <div class="max-h-56 overflow-y-auto p-2 rounded-2xl bg-white/70 border border-slate-200 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          ${filtered.map(char => {
            const isSel = this.wzSelectedChars.includes(char.id);
            return `
              <button type="button" onclick="app.toggleCharSelection('${char.id}')" class="p-2.5 rounded-xl border text-left transition flex flex-col justify-between ${isSel ? 'bg-rose-50 border-rose-600 ring-1 ring-rose-600' : 'bg-white border-slate-200 hover:bg-slate-50'}">
                <div class="text-xs font-bold text-slate-900">${char.characterNameHi}</div>
                <div class="text-[11px] text-slate-600 truncate">${char.actorNameHi || '—'}</div>
              </button>
            `;
          }).join('')}
        </div>

        ${selectedList.length > 0 ? `
          <div class="p-4 rounded-2xl bg-orange-50/70 border border-orange-200 space-y-3">
            ${this.wzAmountMode === 'COMMON' ? `
              <div>
                <label class="block text-xs font-bold text-slate-900 mb-1">प्रत्येक पात्र के लिए समान राशि (₹ per character)</label>
                <p class="text-[11px] text-orange-900 mb-2 font-medium">${this.t('commonAmountExplanation')} (${selectedList.length} पात्र × ₹${this.wzCommonRupees || 0} = <strong>${formatIndianCurrency(totalPaise)}</strong>)</p>
                <input type="number" min="0" step="1" value="${this.wzCommonRupees}" oninput="app.wzCommonRupees = this.value; app.render();" placeholder="उदा. 100" class="w-full sm:w-64 px-4 py-2 rounded-xl bg-white border border-slate-300 text-sm font-bold">
              </div>
            ` : `
              <div class="space-y-2 max-h-52 overflow-y-auto pr-1">
                ${selectedList.map(char => `
                  <div class="flex items-center justify-between gap-3 bg-white p-2.5 rounded-xl border border-slate-200">
                    <div>
                      <span class="text-xs font-bold text-slate-900">${char.characterNameHi}</span>
                      ${char.actorNameHi ? `<span class="text-xs text-slate-500 ml-2">(${char.actorNameHi})</span>` : ''}
                    </div>
                    <div class="flex items-center gap-1.5">
                      <span class="text-xs font-bold text-slate-600">₹</span>
                      <input type="number" min="0" step="1" value="${this.wzIndividualRupees[char.id] || ''}" oninput="app.wzIndividualRupees['${char.id}'] = this.value; app.render();" placeholder="0" class="w-28 px-3 py-1.5 rounded-lg border border-slate-300 text-right text-xs font-bold">
                    </div>
                  </div>
                `).join('')}
              </div>
            `}
            <div class="pt-2 border-t border-orange-200 flex items-center justify-between">
              <span class="text-xs font-bold text-slate-700">कुल पात्र सहयोग योग (Actor Total):</span>
              <span class="text-lg font-extrabold text-rose-900">${formatIndianCurrency(totalPaise)}</span>
            </div>
          </div>
        ` : ''}

        ${this.wzError ? `<div class="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700">${this.wzError}</div>` : ''}

        <div class="flex justify-between pt-2">
          <button type="button" onclick="app.wizardStep = 2; app.render();" class="px-5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-700">Back</button>
          <button type="button" onclick="app.validateWizardStep3Actor()" class="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold">Continue ➡️</button>
        </div>
      </div>
    `;
  }

  toggleCharSelection(id) {
    if (this.wzSelectedChars.includes(id)) {
      this.wzSelectedChars = this.wzSelectedChars.filter(x => x !== id);
    } else {
      this.wzSelectedChars.push(id);
    }
    this.render();
  }

  validateWizardStep3Actor() {
    if (this.wzSelectedChars.length === 0) {
      this.wzError = 'कृपया कम से कम एक पात्र चुनें।';
      this.render();
      return;
    }
    this.wzError = '';
    this.wizardStep = 4;
    this.render();
  }

  renderWizardStep3Comm() {
    return `
      <div class="space-y-4">
        <div class="p-4 rounded-2xl bg-sky-50/90 border border-sky-200">
          <div class="text-xs font-bold text-sky-900 uppercase">संस्था का नाम</div>
          <div class="text-base font-extrabold text-slate-900 mt-0.5">Shri Ramleela Committee, Banbasa (श्री रामलीला कमेटी, बनबसा)</div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label class="block text-xs font-bold text-slate-800 mb-1">कमेटी संग्रह उप-श्रेणी</label>
            <select id="wz-comm-cat" onchange="app.wzCommCat = this.value" class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-sm font-bold">
              ${this.settings.committeeCategories.map(c => `<option value="${c}" ${this.wzCommCat === c ? 'selected' : ''}>${c}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-800 mb-1">सहयोग धनराशि (₹ Amount) *</label>
            <input type="number" min="1" step="1" value="${this.wzCommRupees}" oninput="app.wzCommRupees = this.value" placeholder="उदा. 501" class="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-sm font-bold">
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-800 mb-1">भुगतान माध्यम</label>
            <select id="wz-pay-mode" onchange="app.wzPaymentMode = this.value" class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-sm font-semibold">
              ${this.settings.paymentModes.map(pm => `<option value="${pm}" ${this.wzPaymentMode === pm ? 'selected' : ''}>${pm}</option>`).join('')}
            </select>
          </div>
        </div>

        ${this.wzError ? `<div class="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700">${this.wzError}</div>` : ''}

        <div class="flex justify-between pt-3">
          <button type="button" onclick="app.wizardStep = 2; app.render();" class="px-5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-700">Back</button>
          <button type="button" onclick="app.validateWizardStep3Comm()" class="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold">Continue ➡️</button>
        </div>
      </div>
    `;
  }

  validateWizardStep3Comm() {
    const p = rupeesToPaise(this.wzCommRupees);
    if (p <= 0) {
      this.wzError = 'कृपया 0 से अधिक मान्य धनराशि दर्ज करें।';
      this.render();
      return;
    }
    this.wzError = '';
    this.wizardStep = 4;
    this.render();
  }

  renderWizardStep4Review() {
    let totalPaise = 0;
    const selectedList = this.characters.filter(c => this.wzSelectedChars.includes(c.id));
    const lineItems = [];

    if (this.wzCat === 'ACTOR') {
      if (this.wzAmountMode === 'COMMON') {
        const per = rupeesToPaise(this.wzCommonRupees);
        selectedList.forEach(c => {
          lineItems.push({ name: c.characterNameHi, actor: c.actorNameHi, amount: per });
          totalPaise += per;
        });
      } else {
        selectedList.forEach(c => {
          const amt = rupeesToPaise(this.wzIndividualRupees[c.id] || '0');
          if (amt > 0) {
            lineItems.push({ name: c.characterNameHi, actor: c.actorNameHi, amount: amt });
            totalPaise += amt;
          }
        });
      }
    } else {
      totalPaise = rupeesToPaise(this.wzCommRupees);
    }

    return `
      <div class="space-y-5">
        <div class="p-5 rounded-3xl bg-white/90 border border-slate-200 shadow-sm space-y-4">
          <div class="flex flex-wrap items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h3 class="text-base font-bold text-slate-900">${this.t('reviewHeading')}</h3>
              <p class="text-xs text-slate-500">${this.wzDay} • ${this.wzWeekday} • ${this.wzDate}</p>
            </div>
            <div class="text-right">
              <div class="text-xs font-semibold text-slate-500">कुल देय सहयोग राशि</div>
              <div class="text-2xl font-extrabold text-orange-600">${formatIndianCurrency(totalPaise)}</div>
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div><span class="text-slate-500">सहयोगकर्ता का नाम:</span> <strong class="text-slate-900">${this.wzName}</strong></div>
            <div><span class="text-slate-500">स्थान / गाँव:</span> <strong class="text-slate-900">${this.wzLoc}</strong></div>
            ${this.wzDesig ? `<div><span class="text-slate-500">पदनाम:</span> <strong class="text-slate-900">${this.wzDesig}</strong></div>` : ''}
            ${this.wzShop ? `<div><span class="text-slate-500">प्रतिष्ठान / दुकान:</span> <strong class="text-slate-900">${this.wzShop}</strong></div>` : ''}
            <div><span class="text-slate-500">भुगतान माध्यम:</span> <strong class="text-slate-900">${this.wzPaymentMode}</strong></div>
            ${this.wzNotes ? `<div><span class="text-slate-500">टिप्पणी:</span> <strong class="text-slate-900">${this.wzNotes}</strong></div>` : ''}
          </div>

          ${this.wzCat === 'ACTOR' ? `
            <div class="border-t border-slate-200 pt-3">
              <div class="text-xs font-bold text-rose-900 mb-2">चयनित पात्र एवं राशि विवरण:</div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                ${lineItems.map(li => `
                  <div class="flex items-center justify-between px-3 py-1.5 rounded-xl bg-rose-50/70 border border-rose-200 text-xs">
                    <span><strong>${li.name}</strong> ${li.actor ? `(${li.actor})` : ''}</span>
                    <span class="font-bold text-rose-950">${formatIndianCurrency(li.amount)}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : `
            <div class="border-t border-slate-200 pt-3">
              <div class="p-3 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-between text-xs">
                <div>
                  <div class="font-bold text-sky-950">Shri Ramleela Committee, Banbasa</div>
                  <div class="text-sky-800">मद: ${this.wzCommCat}</div>
                </div>
                <div class="text-base font-extrabold text-sky-950">${formatIndianCurrency(totalPaise)}</div>
              </div>
            </div>
          `}
        </div>

        <div class="flex items-center justify-between">
          <button type="button" onclick="app.wizardStep = 3; app.render();" class="px-5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-700">Back</button>
          <button type="button" onclick="app.submitFinalTransaction()" class="px-7 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-lg transition">✓ ${this.t('confirmAndSave')}</button>
        </div>
      </div>
    `;
  }

  async submitFinalTransaction() {
    const dayMeta = SANSKRIT_PERFORMANCE_DAYS.find(d => d.day === this.wzDay) || SANSKRIT_PERFORMANCE_DAYS[0];
    const txId = this.editingTx?.id || `tx-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const receiptNumber = this.editingTx?.receiptNumber || `RLB-${dayMeta.ordinal.toUpperCase()}-${String(Date.now()).slice(-5)}`;

    const selectedList = this.characters.filter(c => this.wzSelectedChars.includes(c.id));
    const lineItems = [];
    let totalAmountPaise = 0;

    if (this.wzCat === 'ACTOR') {
      if (this.wzAmountMode === 'COMMON') {
        const per = rupeesToPaise(this.wzCommonRupees);
        selectedList.forEach(c => {
          lineItems.push({
            id: `${txId}-li-${c.id}`,
            transactionId: txId,
            characterId: c.id,
            characterNameHi: c.characterNameHi,
            actorNameHi: c.actorNameHi || '',
            amountPaise: per
          });
          totalAmountPaise += per;
        });
      } else {
        selectedList.forEach(c => {
          const amt = rupeesToPaise(this.wzIndividualRupees[c.id] || '0');
          if (amt > 0) {
            lineItems.push({
              id: `${txId}-li-${c.id}`,
              transactionId: txId,
              characterId: c.id,
              characterNameHi: c.characterNameHi,
              actorNameHi: c.actorNameHi || '',
              amountPaise: amt
            });
            totalAmountPaise += amt;
          }
        });
      }
    } else {
      totalAmountPaise = rupeesToPaise(this.wzCommRupees);
    }

    const txData = {
      id: txId,
      receiptNumber,
      category: this.wzCat,
      performanceDay: dayMeta.day,
      dayIndex: dayMeta.index,
      dayOrdinal: dayMeta.ordinal,
      weekday: this.wzWeekday,
      performanceDate: this.wzDate,
      contributor: {
        id: this.editingTx?.contributor.id || `contrib-${Date.now()}`,
        fullName: this.wzName.trim(),
        location: this.wzLoc.trim(),
        designation: this.wzDesig.trim() || undefined,
        shopOrBusinessName: this.wzShop.trim() || undefined,
        mobileNumber: this.wzMobile.trim() || undefined,
        notes: this.wzNotes.trim() || undefined
      },
      amountEntryMode: this.wzCat === 'ACTOR' ? this.wzAmountMode : undefined,
      commonPerCharacterPaise: this.wzCat === 'ACTOR' && this.wzAmountMode === 'COMMON' ? rupeesToPaise(this.wzCommonRupees) : undefined,
      lineItems,
      organizationName: this.wzCat === 'COMMITTEE' ? 'Shri Ramleela Committee, Banbasa' : undefined,
      committeeSubCategory: this.wzCat === 'COMMITTEE' ? this.wzCommCat : undefined,
      paymentMode: this.wzPaymentMode,
      totalAmountPaise,
      notes: this.wzNotes.trim() || undefined,
      createdAt: this.editingTx?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (this.settings.isDemoMode) {
      this.demoTransactions = [txData, ...this.demoTransactions.filter(t => t.id !== txId)];
    } else {
      await db.saveTransaction(txData);
      this.realTransactions = await db.getTransactions();
      const log = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        action: this.editingTx ? 'UPDATE' : 'CREATE',
        transactionId: txId,
        summary: `${this.editingTx ? 'Updated' : 'Created'} ${txData.category} receipt ${txData.receiptNumber} (${txData.contributor.fullName})`
      };
      await db.addAuditLog(log);
      this.auditLogs = await db.getAuditLogs();
    }

    this.wzSavedReceipt = receiptNumber;
    this.wzSavedAmountPaise = totalAmountPaise;
    this.wizardStep = 5;
    this.render();
  }

  renderWizardStep5Success() {
    return `
      <div class="text-center py-8 space-y-4">
        <div class="w-16 h-16 rounded-3xl bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center mx-auto text-2xl font-bold">✨</div>
        <h3 class="text-xl font-extrabold text-slate-900">${this.t('savedSuccessTitle')}</h3>
        <p class="text-xs font-semibold text-slate-600">रसीद क्रमांक (Transaction ID): <span class="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-900 font-bold">${this.wzSavedReceipt}</span></p>
        <div class="text-2xl font-extrabold text-emerald-700">${formatIndianCurrency(this.wzSavedAmountPaise)}</div>
        <div class="flex flex-wrap items-center justify-center gap-3 pt-4">
          <button type="button" onclick="app.startNewEntry()" class="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-md">${this.t('addAnotherEntry')}</button>
          <button type="button" onclick="app.setActiveTab('DASHBOARD')" class="px-5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-800">${this.t('goToDashboard')}</button>
        </div>
      </div>
    `;
  }

  // --- Transactions Tab ---
  renderTransactions() {
    const list = this.transactions.filter(tx => {
      if (this.txSearch.trim()) {
        const q = this.txSearch.trim().toLowerCase();
        if (!tx.contributor.fullName.toLowerCase().includes(q) && !tx.contributor.location.toLowerCase().includes(q)) return false;
      }
      if (this.txFilterDay !== 'ALL' && tx.performanceDay !== this.txFilterDay) return false;
      if (this.txFilterCat !== 'ALL' && tx.category !== this.txFilterCat) return false;
      if (this.txFilterChar !== 'ALL') {
        if (tx.category !== 'ACTOR') return false;
        if (!(tx.lineItems || []).some(li => li.characterId === this.txFilterChar)) return false;
      }
      return true;
    }).sort((a, b) => {
      if (this.txSort === 'AMOUNT_DESC') return b.totalAmountPaise - a.totalAmountPaise;
      if (this.txSort === 'AMOUNT_ASC') return a.totalAmountPaise - b.totalAmountPaise;
      return (b.createdAt || '').localeCompare(a.createdAt || '');
    });

    return `
      <div class="space-y-4">
        ${this.deletedUndoTx ? `
          <div class="liquid-glass rounded-2xl p-3.5 border border-amber-300 bg-amber-50/95 flex items-center justify-between text-xs font-bold text-amber-950">
            <span>प्रविष्टि “${this.deletedUndoTx.contributor.fullName}” (${formatIndianCurrency(this.deletedUndoTx.totalAmountPaise)}) हटाई गई।</span>
            <button onclick="app.undoDelete()" class="px-3 py-1.5 rounded-xl bg-amber-700 text-white flex items-center gap-1">पुनः स्थापित करें (Undo)</button>
          </div>
        ` : ''}

        <!-- Filter Bar -->
        <div class="liquid-glass rounded-3xl p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          <div class="relative lg:col-span-2">
            <input type="text" value="${this.txSearch}" oninput="app.txSearch = this.value; app.render();" placeholder="सहयोगकर्ता या स्थान खोजें..." class="w-full pl-3 pr-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-semibold">
          </div>
          <select onchange="app.txFilterDay = this.value; app.render();" class="px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-semibold">
            <option value="ALL">सभी दिवस (All Days)</option>
            ${SANSKRIT_PERFORMANCE_DAYS.map(d => `<option value="${d.day}" ${this.txFilterDay === d.day ? 'selected' : ''}>${d.day} (${d.ordinal})</option>`).join('')}
          </select>
          <select onchange="app.txFilterCat = this.value; app.render();" class="px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-semibold">
            <option value="ALL">सभी श्रेणियाँ (All Categories)</option>
            <option value="ACTOR" ${this.txFilterCat === 'ACTOR' ? 'selected' : ''}>पात्र संग्रह (Actor-Side)</option>
            <option value="COMMITTEE" ${this.txFilterCat === 'COMMITTEE' ? 'selected' : ''}>कमेटी संग्रह (Committee)</option>
          </select>
          <select onchange="app.txFilterChar = this.value; app.render();" class="px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-semibold">
            <option value="ALL">सभी पात्र (All Characters)</option>
            ${this.characters.map(c => `<option value="${c.id}" ${this.txFilterChar === c.id ? 'selected' : ''}>${c.characterNameHi} (${c.actorNameHi || '-'})</option>`).join('')}
          </select>
          <div class="flex items-center gap-2">
            <select onchange="app.txSort = this.value; app.render();" class="flex-1 px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-semibold">
              <option value="DATE_DESC" ${this.txSort === 'DATE_DESC' ? 'selected' : ''}>नवीनतम (Newest)</option>
              <option value="AMOUNT_DESC" ${this.txSort === 'AMOUNT_DESC' ? 'selected' : ''}>सर्वाधिक राशि</option>
              <option value="AMOUNT_ASC" ${this.txSort === 'AMOUNT_ASC' ? 'selected' : ''}>न्यूनतम राशि</option>
            </select>
            <button onclick="app.showAuditModal = !app.showAuditModal; app.render();" class="p-2 rounded-xl bg-white border border-slate-300 text-slate-700">📜</button>
          </div>
        </div>

        ${this.showAuditModal ? `
          <div class="liquid-glass rounded-2xl p-4 max-h-48 overflow-y-auto text-xs space-y-1.5">
            <div class="font-bold text-slate-900 mb-1">ऑडिट लॉग (Audit Trail — ${this.auditLogs.length})</div>
            ${this.auditLogs.length === 0 ? '<p class="text-slate-500">कोई संशोधन इतिहास उपलब्ध नहीं है।</p>' : this.auditLogs.map(l => `
              <div class="flex items-center justify-between py-1 border-b border-slate-200/70">
                <span><strong class="text-orange-800">[${l.action}]</strong> ${l.summary}</span>
                <span class="text-slate-500">${new Date(l.timestamp).toLocaleString('hi-IN')}</span>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <!-- Table -->
        <div class="liquid-glass rounded-3xl p-4 overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-slate-200 text-xs font-bold text-slate-700">
                <th class="py-2.5 px-3">रसीद व दिनांक</th>
                <th class="py-2.5 px-3">सहयोगकर्ता एवं स्थान</th>
                <th class="py-2.5 px-3">श्रेणी</th>
                <th class="py-2.5 px-3">पात्र / मद विवरण</th>
                <th class="py-2.5 px-3 text-right">कुल राशि</th>
                <th class="py-2.5 px-3 text-center">कार्यवाही</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200/70 text-xs">
              ${list.length === 0 ? `
                <tr><td colspan="6" class="py-8 text-center text-slate-500 font-medium">कोई लेन-देन रिकॉर्ड नहीं मिला।</td></tr>
              ` : list.map(tx => `
                <tr class="hover:bg-white/60">
                  <td class="py-3 px-3">
                    <div class="font-bold text-slate-900">${tx.receiptNumber}</div>
                    <div class="text-[11px] text-slate-500">${tx.performanceDate} • ${tx.performanceDay} (${tx.dayOrdinal})</div>
                  </td>
                  <td class="py-3 px-3">
                    <div class="font-bold text-slate-900">${tx.contributor.fullName}</div>
                    <div class="text-[11px] text-slate-600">${tx.contributor.location}</div>
                  </td>
                  <td class="py-3 px-3">
                    <span class="px-2.5 py-1 rounded-full text-[11px] font-bold ${tx.category === 'ACTOR' ? 'bg-rose-100 text-rose-900' : 'bg-sky-100 text-sky-900'}">
                      ${tx.category === 'ACTOR' ? 'पात्र संग्रह' : 'कमेटी संग्रह'}
                    </span>
                  </td>
                  <td class="py-3 px-3 max-w-xs">
                    ${tx.category === 'COMMITTEE' ? `
                      <span class="font-semibold text-sky-950">${tx.committeeSubCategory} (${tx.paymentMode})</span>
                    ` : `
                      <div class="flex flex-wrap gap-1">
                        ${(tx.lineItems || []).map(li => `<span class="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[11px]">${li.characterNameHi}: ${formatIndianCurrency(li.amountPaise)}</span>`).join('')}
                      </div>
                    `}
                  </td>
                  <td class="py-3 px-3 text-right font-extrabold text-slate-900 text-sm">${formatIndianCurrency(tx.totalAmountPaise)}</td>
                  <td class="py-3 px-3 text-center">
                    <div class="flex items-center justify-center gap-1.5">
                      <button onclick="app.printReceipt('${tx.id}')" title="Print Receipt" class="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700">🖨️</button>
                      <button onclick="app.editTransaction(app.transactions.find(t => t.id === '${tx.id}'))" title="Edit" class="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-orange-50 text-orange-700">✏️</button>
                      <button onclick="app.deleteTransaction('${tx.id}')" title="Delete" class="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-rose-50 text-rose-700">🗑️</button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  printReceipt(id) {
    const tx = this.transactions.find(t => t.id === id);
    if (!tx) return;
    const win = window.open('', '_blank', 'width=640,height=520');
    if (!win) return;
    const alloc = tx.category === 'COMMITTEE'
      ? `<p><strong>मद:</strong> श्री रामलीला कमेटी बनबसा (${tx.committeeSubCategory})</p>`
      : `<ul>${(tx.lineItems || []).map(li => `<li>${li.characterNameHi} (${li.actorNameHi || '-'}): ${formatIndianCurrency(li.amountPaise)}</li>`).join('')}</ul>`;

    win.document.write(`
      <html lang="hi">
        <head>
          <title>Receipt ${tx.receiptNumber}</title>
          <style>body { font-family: sans-serif; padding: 24px; color: #0f172a; } .box { border: 2px solid #ea580c; border-radius: 12px; padding: 20px; } h2 { margin: 0 0 4px 0; color: #9a3412; }</style>
        </head>
        <body>
          <div class="box">
            <h2>श्री रामलीला कमेटी, बनबसा</h2>
            <p><strong>रसीद क्र.:</strong> ${tx.receiptNumber} | <strong>दिनांक:</strong> ${tx.performanceDate} (${tx.performanceDay})</p>
            <hr/>
            <p><strong>सहयोगकर्ता:</strong> ${tx.contributor.fullName} (${tx.contributor.location})</p>
            ${alloc}
            <h3>कुल राशि: ${formatIndianCurrency(tx.totalAmountPaise)}</h3>
          </div>
          <script>window.print();<\/script>
        </body>
      </html>
    `);
    win.document.close();
  }

  async deleteTransaction(id) {
    const target = this.transactions.find(t => t.id === id);
    if (!target) return;
    if (this.settings.isDemoMode) {
      this.demoTransactions = this.demoTransactions.filter(t => t.id !== id);
    } else {
      await db.deleteTransaction(id);
      this.realTransactions = await db.getTransactions();
      const log = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        action: 'DELETE',
        transactionId: id,
        summary: `Deleted ${target.category} receipt ${target.receiptNumber} (${target.contributor.fullName})`
      };
      await db.addAuditLog(log);
      this.auditLogs = await db.getAuditLogs();
    }
    this.deletedUndoTx = target;
    this.render();
  }

  async undoDelete() {
    if (!this.deletedUndoTx) return;
    const target = this.deletedUndoTx;
    if (this.settings.isDemoMode) {
      this.demoTransactions = [target, ...this.demoTransactions];
    } else {
      await db.saveTransaction(target);
      this.realTransactions = await db.getTransactions();
    }
    this.deletedUndoTx = null;
    this.render();
  }

  // --- Reports Tab ---
  renderReports() {
    const actorMatrix = computeCharacterMatrix(this.characters, this.transactions);
    const daySummaries = computeDayWiseSummaries(this.transactions, this.sessions);

    return `
      <div class="space-y-5">
        <!-- 4 Excel Export Controls -->
        <div class="liquid-glass rounded-3xl p-5">
          <div class="flex items-center gap-2.5 mb-4">
            <span class="text-emerald-700 text-lg">📑</span>
            <h2 class="text-base font-bold text-slate-900">Excel वर्कबुक निर्यात (.xlsx — संदर्भ स्क्रीनशॉट के समरूप)</h2>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <button type="button" onclick="exportActorWorkbook(app.characters, app.transactions)" class="p-4 rounded-2xl bg-rose-900 hover:bg-rose-950 text-white text-left transition shadow-md flex flex-col justify-between">
              <div class="text-xs font-bold uppercase tracking-wider opacity-85">Workbook A</div>
              <div class="text-sm font-bold mt-1">${this.t('exportActorBtn')}</div>
              <div class="text-[11px] opacity-80 mt-1">पात्र | अभिनयकर्ता | 1st–10th | Total (${formatIndianCurrency(actorMatrix.grandTotalPaise)})</div>
            </button>
            <button type="button" onclick="exportCommitteeWorkbook(app.transactions, app.sessions, app.settings.committeeCategories)" class="p-4 rounded-2xl bg-sky-800 hover:bg-sky-900 text-white text-left transition shadow-md flex flex-col justify-between">
              <div class="text-xs font-bold uppercase tracking-wider opacity-85">Workbook B</div>
              <div class="text-sm font-bold mt-1">${this.t('exportCommitteeBtn')}</div>
              <div class="text-[11px] opacity-80 mt-1">धनराशि (Offline), Online, आरती | 1st–10th</div>
            </button>
            <button type="button" onclick="exportCombinedWorkbook(app.characters, app.transactions, app.sessions, app.settings.committeeCategories)" class="p-4 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white text-left transition shadow-md flex flex-col justify-between">
              <div class="text-xs font-bold uppercase tracking-wider opacity-85">Workbook C</div>
              <div class="text-sm font-bold mt-1">${this.t('exportCombinedBtn')}</div>
              <div class="text-[11px] opacity-80 mt-1">पात्र + कमेटी + दिवस-वार संयुक्त योग</div>
            </button>
            <button type="button" onclick="exportDetailedWorkbook(app.transactions)" class="p-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white text-left transition shadow-md flex flex-col justify-between">
              <div class="text-xs font-bold uppercase tracking-wider opacity-85">Workbook D</div>
              <div class="text-sm font-bold mt-1">${this.t('exportDetailedBtn')}</div>
              <div class="text-[11px] opacity-80 mt-1">दिनांक-वार व रसीद-वार पूर्ण ऑडिट विवरण</div>
            </button>
          </div>
        </div>

        <!-- Live Interactive Preview -->
        <div class="liquid-glass rounded-3xl p-5">
          <div class="flex items-center gap-2 mb-4">
            <button onclick="app.reportsPreviewTab = 'ACTOR'; app.render();" class="px-4 py-2 rounded-xl text-xs font-bold transition ${this.reportsPreviewTab === 'ACTOR' ? 'bg-rose-800 text-white shadow-sm' : 'bg-white text-slate-700 border border-slate-200'}">पात्र संग्रह तालिका (Actor Sheet Preview)</button>
            <button onclick="app.reportsPreviewTab = 'COMMITTEE'; app.render();" class="px-4 py-2 rounded-xl text-xs font-bold transition ${this.reportsPreviewTab === 'COMMITTEE' ? 'bg-sky-800 text-white shadow-sm' : 'bg-white text-slate-700 border border-slate-200'}">कमेटी संग्रह तालिका (Committee Sheet Preview)</button>
          </div>

          ${this.reportsPreviewTab === 'ACTOR' ? `
            <div class="max-h-[500px] overflow-auto border border-slate-300 rounded-xl bg-white">
              <table class="w-full text-xs border-collapse">
                <thead class="sticky top-0 bg-slate-100 border-b border-slate-400 font-bold text-slate-900">
                  <tr>
                    <th class="border border-slate-300 px-2.5 py-2 text-left">पात्र का नाम</th>
                    <th class="border border-slate-300 px-2.5 py-2 text-left">अभिनयकर्ता का नाम</th>
                    ${['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th'].map(d => `<th class="border border-slate-300 px-2 py-2 text-center">${d}</th>`).join('')}
                    <th class="border border-slate-300 px-2.5 py-2 text-center">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${actorMatrix.rows.map(r => `
                    <tr class="hover:bg-orange-50/40 font-semibold">
                      <td class="border border-slate-300 px-2.5 py-1.5 font-bold">${r.character.characterNameHi}</td>
                      <td class="border border-slate-300 px-2.5 py-1.5">${r.character.actorNameHi || ''}</td>
                      ${r.dayAmountsPaise.map(p => `<td class="border border-slate-300 px-2 py-1.5 text-center">${paiseToRupees(p)}</td>`).join('')}
                      <td class="border border-slate-300 px-2.5 py-1.5 text-center font-bold bg-slate-50">${paiseToRupees(r.rowTotalPaise)}</td>
                    </tr>
                  `).join('')}
                </tbody>
                <tfoot class="sticky bottom-0 font-bold">
                  <tr>
                    <td colSpan="2" class="border border-slate-400 px-2.5 py-2 bg-white text-right">Total</td>
                    ${actorMatrix.columnTotalsPaise.map(colP => `<td class="border border-slate-400 px-2 py-2 text-center bg-[#70AD47] text-white">${paiseToRupees(colP)}</td>`).join('')}
                    <td class="border border-slate-400 px-2.5 py-2 text-center bg-white text-slate-950 font-extrabold">${paiseToRupees(actorMatrix.grandTotalPaise)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          ` : `
            <div class="overflow-x-auto border border-slate-300 rounded-xl bg-white">
              <table class="w-full text-xs border-collapse">
                <thead class="bg-slate-100 font-bold text-slate-900">
                  <tr>
                    <th class="border border-slate-400 px-3 py-2 text-center">कमेटी</th>
                    ${['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th'].map(d => `<th class="border border-slate-400 px-2.5 py-2 text-center">${d}</th>`).join('')}
                    <th class="border border-slate-400 px-3 py-2 text-center">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${[
                    { label: 'धनराशि (Offline)', key: 'committeeOfflinePaise' },
                    { label: 'धनराशि (Online)', key: 'committeeOnlinePaise' },
                    { label: 'आरती', key: 'committeeAartiPaise' }
                  ].map(row => {
                    const rowSum = daySummaries.reduce((s, d) => s + d[row.key], 0);
                    return `
                      <tr class="text-center font-medium">
                        <td class="border border-slate-400 px-3 py-2 font-semibold">${row.label}</td>
                        ${daySummaries.map(d => `<td class="border border-slate-400 px-2 py-2">${paiseToRupees(d[row.key])}</td>`).join('')}
                        <td class="border border-slate-400 px-3 py-2 font-bold">${paiseToRupees(rowSum)}</td>
                      </tr>
                    `;
                  }).join('')}
                  <tr class="text-center font-bold bg-slate-50">
                    <td class="border border-slate-400 px-3 py-2">Total</td>
                    ${daySummaries.map(d => `<td class="border border-slate-400 px-2 py-2">${paiseToRupees(d.committeeTotalPaise)}</td>`).join('')}
                    <td class="border border-slate-400 px-3 py-2 font-extrabold">${paiseToRupees(daySummaries.reduce((s, d) => s + d.committeeTotalPaise, 0))}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          `}
        </div>
      </div>
    `;
  }

  // --- Settings Tab ---
  renderSettings() {
    return `
      <div class="space-y-6">
        <div class="liquid-glass rounded-3xl p-5 space-y-4">
          <div class="flex items-center gap-2">
            <span class="text-orange-600 font-bold">🎛️</span>
            <h2 class="text-base font-bold text-slate-900">iOS लिक्विड ग्लास एवं इंटरफ़ेस सेटिंग्स</h2>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">ग्लास अपारदर्शिता (Glass Opacity: ${this.settings.glassOpacity}%)</label>
              <input type="range" min="10" max="90" value="${this.settings.glassOpacity}" oninput="app.updateSettings({ glassOpacity: Number(this.value) })" class="w-full accent-orange-600">
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">ब्लर तीव्रता (Blur Intensity: ${this.settings.blurIntensity}px)</label>
              <input type="range" min="4" max="32" value="${this.settings.blurIntensity}" oninput="app.updateSettings({ blurIntensity: Number(this.value) })" class="w-full accent-orange-600">
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">भाषा (Interface Language)</label>
              <select onchange="app.updateSettings({ language: this.value })" class="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold">
                <option value="hi" ${this.settings.language === 'hi' ? 'selected' : ''}>हिंदी (Default)</option>
                <option value="en" ${this.settings.language === 'en' ? 'selected' : ''}>English</option>
              </select>
            </div>
          </div>
        </div>

        <div class="liquid-glass rounded-3xl p-5 space-y-4">
          <div class="flex items-center gap-2">
            <span class="text-rose-700 font-bold">👥</span>
            <h2 class="text-base font-bold text-slate-900">पात्र एवं अभिनयकर्ता मास्टर सूची (${this.characters.length} पात्र)</h2>
          </div>
          <div class="max-h-64 overflow-y-auto border border-slate-200 rounded-2xl bg-white/80 p-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            ${this.characters.map(c => `
              <div class="p-2 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-2 text-xs">
                <span class="font-bold text-slate-900 shrink-0">${c.orderIndex}. ${c.characterNameHi}</span>
                <input type="text" value="${c.actorNameHi || ''}" onchange="app.updateCharActor('${c.id}', this.value)" placeholder="अभिनयकर्ता..." class="w-36 px-2 py-1 rounded border border-slate-200 text-xs">
              </div>
            `).join('')}
          </div>
        </div>

        <div class="liquid-glass rounded-3xl p-5 space-y-4">
          <h2 class="text-base font-bold text-slate-900">डेटा बैकअप, रिस्टोर एवं सुरक्षा (IndexedDB Local Persistence)</h2>
          <p class="text-xs text-slate-600">सभी रिकॉर्ड आपके कंप्यूटर पर IndexedDB स्थानीय डेटाबेस में सुरक्षित रहते हैं। नियमित रूप से JSON बैकअप डाउनलोड करें।</p>
          <div class="flex flex-wrap items-center gap-3">
            <button type="button" onclick="app.downloadJSONBackup()" class="px-4 py-2.5 rounded-xl bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold">📥 बैकअप डाउनलोड करें (.json)</button>
            <label class="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold cursor-pointer">
              <span>📤 बैकअप इम्पोर्ट करें (.json)</span>
              <input type="file" accept=".json" onchange="app.importJSONBackup(event)" class="hidden">
            </label>
            <button type="button" onclick="app.resetSettings()" class="px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-700">🔄 डिफ़ॉल्ट सेटिंग्स रीसेट करें</button>
            <button type="button" onclick="app.clearAllData()" class="px-4 py-2.5 rounded-xl border border-rose-300 bg-rose-50 text-rose-800 text-xs font-bold">🗑️ सभी वित्तीय डेटा मिटाएँ</button>
          </div>
        </div>
      </div>
    `;
  }

  async updateCharActor(id, newActor) {
    this.characters = this.characters.map(c => c.id === id ? { ...c, actorNameHi: newActor } : c);
    await db.saveCharacters(this.characters);
  }

  downloadJSONBackup() {
    const payload = {
      version: 1,
      exportedAt: new Date().toISOString(),
      committee: 'Shri Ramleela Committee, Banbasa',
      settings: this.settings,
      characters: this.characters,
      transactions: this.realTransactions
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Ramleela_Banbasa_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async importJSONBackup(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed.characters)) {
        this.characters = parsed.characters;
        await db.saveCharacters(parsed.characters);
      }
      if (Array.isArray(parsed.transactions)) {
        await db.clearAllTransactions();
        for (const t of parsed.transactions) await db.saveTransaction(t);
        this.realTransactions = await db.getTransactions();
      }
      alert('बैकअप सफलतापूर्वक रीस्टोर किया गया!');
      this.render();
    } catch {
      alert('अमान्य बैकअप फ़ाइल प्रारूप।');
    }
  }

  async resetSettings() {
    await this.updateSettings({ ...DEFAULT_SETTINGS, hasCompletedInitialLanguageSetup: true });
    alert('सेटिंग्स डिफ़ॉल्ट पर रीसेट कर दी गई हैं।');
  }

  async clearAllData() {
    if (confirm('क्या आप सचमुच सभी वित्तीय लेन-देन रिकॉर्ड्स मिटाना चाहते हैं?')) {
      await db.clearAllTransactions();
      this.realTransactions = [];
      alert('सभी रिकॉर्ड मिटा दिए गए हैं।');
      this.render();
    }
  }

  setLanguage(lang) {
    this.settings.language = lang;
    this.render();
  }

  async confirmLanguage() {
    this.showLanguageModal = false;
    await this.updateSettings({ language: this.settings.language, hasCompletedInitialLanguageSetup: true });
  }

  selectSessionDay(day) {
    if (this.activeSession) this.activeSession.performanceDay = day;
    const meta = SANSKRIT_PERFORMANCE_DAYS.find(d => d.day === day);
    if (meta && this.activeSession) {
      this.activeSession.dayIndex = meta.index;
      this.activeSession.dayOrdinal = meta.ordinal;
    }
    this.render();
  }

  selectSessionWeekday(w) {
    if (this.activeSession) this.activeSession.weekday = w;
    this.render();
  }

  async saveSessionDialog() {
    const dateInput = document.getElementById('session-date-input');
    const date = dateInput ? dateInput.value : new Date().toISOString().slice(0, 10);
    if (this.activeSession) {
      this.activeSession.performanceDate = date;
      this.activeSession.updatedAt = new Date().toISOString();
      await this.saveSession(this.activeSession);
    }
  }

  attachEventListeners() {
    // Optional helper bindings
  }
}

const app = new AppState();
window.app = app;
window.exportActorWorkbook = exportActorWorkbook;
window.exportCommitteeWorkbook = exportCommitteeWorkbook;
window.exportCombinedWorkbook = exportCombinedWorkbook;
window.exportDetailedWorkbook = exportDetailedWorkbook;

window.addEventListener('DOMContentLoaded', () => {
  app.init();
});
