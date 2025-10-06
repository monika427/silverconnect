
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import type { Settings, Progress } from '@/lib/types';
import { modules, lessons as staticLessons } from '@/lib/modules';

const SETTINGS_KEY = 'silver-connect-settings';
const PROGRESS_KEY = 'silver-connect-progress';

const defaultSettings: Settings = {
  language: 'en',
  textSize: 'normal',
  contrast: 'normal',
  onboardingComplete: false,
};

const defaultProgress: Progress = {
  completedLessons: [],
};

type AppStateContextType = {
  settings: Settings;
  progress: Progress;
  isReady: boolean;
  updateSettings: (newSettings: Partial<Settings>) => Promise<void>;
  completeLesson: (lessonSlug: string) => void;
  isLessonCompleted: (lessonSlug: string) => boolean;
  resetProgress: () => void;
  t: (key: string, replacements?: Record<string, string | number>) => string;
};

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

const translations: Record<string, Record<string, string>> = {
  en: {
    appName: 'SilverConnect',
    // Onboarding
    welcome: 'Welcome to SilverConnect!',
    setupComfort: "Let's set things up for your comfort.",
    language: 'Language',
    english: 'English',
    nepali: 'Nepali',
    textSize: 'Text Size',
    normal: 'Normal',
    large: 'Large',
    xlarge: 'X-Large',
    contrast: 'Contrast',
    highContrast: 'High Contrast',
    startLearning: 'Start Learning',

    // Header
    settings: 'Settings',
    resetProgress: 'Reset Progress',

    // Home
    yourLearningPath: 'Your Learning Path',
    chooseModule: 'Choose a module below to start learning.',
    progress: 'Progress',

    // Lessons
    lessonNotFound: 'Lesson not found',
    lessonNotExist: 'This lesson does not seem to to exist.',
    backToHome: 'Back to Home',
    lessonComplete: 'Lesson Complete!',
    lessonCompleteDesc: "Great job! You've learned something new today.",
    lessonCompleteDescPractice: "Great job! You've completed this lesson by practicing.",
    reachedEnd: "You've reached the end of the lesson!",
    practice: 'Practice',
    practiceAgain: 'Practice Again',
    markAsComplete: 'Mark as Complete',
    completed: 'Completed!',
    alreadyCompleted: 'You have already completed this lesson.',
    previous: 'Previous',
    next: 'Next',
    
    // Practice Dialog
    practiceMode: 'Practice Mode',
    tapMe: 'Tap Me',
    tapGreatJob: 'Great job! You tapped the button.',
    swipeGreatJob: 'Awesome! You swiped.',
    calling: 'Calling',
    callEnded: 'Call Ended.',
    practiceComingSoon: 'Practice area for this lesson coming soon!',
    selectDoctor: 'Select a Doctor',
    selectTime: 'Select an available time for',
    drSmith: 'Dr. Smith',
    drJones: 'Dr. Jones',
    appointmentBooked: 'Appointment Booked!',
    appointmentBookedSuccess: 'Success! Your appointment with {{doctor}} at {{time}} is confirmed.',
    backToDoctors: 'Back to Doctor Selection',
    bookAnother: 'Book Another Appointment',
    availableMeds: 'Available Medicines',
    medA: 'Pain Reliever',
    medB: 'Allergy Medicine',
    addToCart: 'Add to Cart',
    yourCart: 'Your Cart',
    cartEmpty: 'Your cart is empty.',
    checkout: 'Checkout',
    orderPlaced: 'Order Placed!',
    orderSuccess: 'Your medicine will be delivered soon.',
    orderAnother: 'Place Another Order',
    paymentDetails: 'Payment Details',
    cardNumber: 'Card Number',
    expiryDate: 'Expiry Date',
    cvc: 'CVC',
    cardName: 'Name on Card',
    cardNamePlaceholder: 'e.g. Jane Doe',
    payNow: 'Pay Now',
    backToCart: 'Back to Cart',
    localStore: 'Local Store',
    scanToPay: 'Point your camera at the QR code to pay.',
    scanAndPay: 'Scan & Pay',
    confirmPayment: 'Confirm Payment',
    payingTo: 'Paying to',
    amount: 'Amount',
    confirmAndPay: 'Confirm & Pay',
    paymentSuccess: 'Payment Successful!',
    paymentCompleteDesc: 'You have successfully paid the bill.',
    makeAnotherPayment: 'Make Another Payment',

    // Scam practice
    scam_question: 'Question {{current}} of {{total}}',
    scam_instruction: 'Is this a scam?',
    scam_button: 'Scam',
    not_scam_button: 'Not a Scam',
    scam_correct: 'Correct!',
    scam_incorrect: 'Incorrect!',
    scam_feedback_1: 'This is a scam because it creates false urgency and asks you to click a suspicious link.',
    scam_feedback_2: 'This is not a scam. It is a legitimate-looking notification from a bank.',
    scam_feedback_3: 'This is a classic prize scam. Legitimate companies don\'t ask for fees to claim a prize.',
    scam_quiz_complete: 'Quiz Complete!',
    scam_quiz_end: 'You identified {{score}} out of {{total}} scams correctly. Great job!',
    scam_sender_label: 'From:',
    scam_subject_label: 'Subject:',
    bankName: 'My Bank',
    scam_sms_1: 'Your package has a shipping issue. Please update your details here to avoid return: bit.ly/shipping-update123',
    scam_sms_2: 'A transaction of $50 was made on your card ending in 1234. If this was not you, please contact us immediately.',
    scam_email_subject_1: 'You have won!',
    scam_email_1: 'Congratulations! You have been selected as the winner of our grand prize. To claim it, please pay a small processing fee of $50 by clicking here: bit.ly/claim-prize-now',

    // Password practice
    password_practice_title: 'Create a Strong Password',
    password_placeholder: 'Type a password',
    password_check_length: 'At least 12 characters',
    password_check_uppercase: 'Contains an uppercase letter',
    password_check_lowercase: 'Contains a lowercase letter',
    password_check_number: 'Contains a number',
    password_check_symbol: 'Contains a symbol (e.g. !@#)',
    password_strong: 'Great! That\'s a strong password.',

    // Reset Dialog
    resetDialogTitle: 'Are you sure?',
    resetDialogDescription: 'This will erase all your learning progress. This action cannot be undone.',
    resetDialogCancel: 'Cancel',
    resetDialogConfirm: 'Reset',
    resetSuccessToast: 'Your progress has been reset.',

    // Loading
    loadingJourney: 'Loading your learning journey...',

    // Modules & Lessons from modules.ts
    ...Object.fromEntries(modules.flatMap(m => [[`module_${m.slug}_title`, m.title], [`module_${m.slug}_description`, m.description]])),
    ...Object.fromEntries(staticLessons.flatMap(l => [
        [`lesson_${l.slug}_title`, l.title], 
        [`lesson_${l.slug}_description`, l.description],
        ...l.steps.flatMap((s, i) => [[`lesson_${l.slug}_step_${i}_title`, s.title], [`lesson_${l.slug}_step_${i}_content`, s.content]])
    ]))
  },
  np: {
    appName: 'सिल्भर कनेक्ट',
    // Onboarding
    welcome: 'सिल्भर कनेक्टमा स्वागत छ!',
    setupComfort: 'आफ्नो आरामको लागि चीजहरू सेट अप गरौं।',
    language: 'भाषा',
    english: 'English',
    nepali: 'नेपाली',
    textSize: 'पाठको आकार',
    normal: 'सामान्य',
    large: 'ठूलो',
    xlarge: 'अतिरिक्त ठूलो',
    contrast: 'कन्ट्रास्ट',
    highContrast: 'उच्च कन्ट्रास्ट',
    startLearning: 'सिक्न सुरु गर्नुहोस्',

    // Header
    settings: 'सेटिङहरू',
    resetProgress: 'प्रगति रिसेट गर्नुहोस्',

    // Home
    yourLearningPath: 'तपाईंको सिक्ने बाटो',
    chooseModule: 'सिक्न सुरु गर्न तलको मोड्युल छान्नुहोस्।',
    progress: 'प्रगति',

    // Lessons
    lessonNotFound: 'पाठ फेला परेन',
    lessonNotExist: 'यो पाठ अवस्थित छैन जस्तो देखिन्छ।',
    backToHome: 'गृह पृष्ठमा फर्कनुहोस्',
    lessonComplete: 'पाठ पूरा भयो!',
    lessonCompleteDesc: 'धेरै राम्रो! तपाईंले आज केहि नयाँ सिक्नुभयो।',
    lessonCompleteDescPractice: 'धेरै राम्रो! तपाईंले अभ्यास गरेर यो पाठ पूरा गर्नुभयो।',
    reachedEnd: 'तपाईं पाठको अन्त्यमा पुग्नुभएको छ!',
    practice: 'अभ्यास',
    practiceAgain: 'फेरि अभ्यास गर्नुहोस्',
    markAsComplete: 'पूरा भयो भनी चिन्ह लगाउनुहोस्',
    completed: 'पूरा भयो!',
    alreadyCompleted: 'तपाईंले यो पाठ पहिले नै पूरा गरिसक्नुभएको छ।',
    previous: 'अघिल्लो',
    next: 'अर्को',

    // Practice Dialog
    practiceMode: 'अभ्यास मोड',
    tapMe: 'मलाई ट्याप गर्नुहोस्',
    tapGreatJob: 'धेरै राम्रो! तपाईंले बटन ट्याप गर्नुभयो।',
    swipeGreatJob: 'उत्कृष्ट! तपाईंले स्वाइप गर्नुभयो।',
    calling: 'कल गर्दै',
    callEnded: 'कल समाप्त भयो।',
    practiceComingSoon: 'यस पाठको लागि अभ्यास क्षेत्र चाँडै आउँदैछ!',
    selectDoctor: 'डाक्टर छान्नुहोस्',
    selectTime: 'को लागि उपलब्ध समय छान्नुहोस्',
    drSmith: 'डा. स्मिथ',
    drJones: 'डा. जोन्स',
    appointmentBooked: 'अपोइन्टमेन्ट बुक भयो!',
    appointmentBookedSuccess: 'सफलता! {{doctor}} सँग {{time}} बजेको तपाईंको अपोइन्टमेन्ट पुष्टि भयो।',
    backToDoctors: 'डाक्टर चयनमा फर्कनुहोस्',
    bookAnother: 'अर्को अपोइन्टमेन्ट बुक गर्नुहोस्',
    availableMeds: 'उपलब्ध औषधिहरू',
    medA: 'दुखाइ कम गर्ने औषधि',
    medB: 'एलर्जीको औषधि',
    addToCart: 'कार्टमा थप्नुहोस्',
    yourCart: 'तपाईंको कार्ट',
    cartEmpty: 'तपाईंको कार्ट खाली छ।',
    checkout: 'चेकआउट',
    orderPlaced: 'अर्डर गरियो!',
    orderSuccess: 'तपाईंको औषधि चाँडै डेलिभर हुनेछ।',
    orderAnother: 'अर्को अर्डर गर्नुहोस्',
    paymentDetails: 'भुक्तानी विवरणहरू',
    cardNumber: 'कार्ड नम्बर',
    expiryDate: 'म्याद सकिने मिति',
    cvc: 'CVC',
    cardName: 'कार्डमा भएको नाम',
    cardNamePlaceholder: 'उदाहरण: जेन डो',
    payNow: 'अब भुक्तानी गर्नुहोस्',
    backToCart: 'कार्टमा फर्कनुहोस्',
    localStore: 'स्थानीय पसल',
    scanToPay: 'भुक्तानी गर्न आफ्नो क्यामेरा QR कोडमा देखाउनुहोस्।',
    scanAndPay: 'स्क्यान र भुक्तानी गर्नुहोस्',
    confirmPayment: 'भुक्तानी पुष्टि गर्नुहोस्',
    payingTo: 'लाई भुक्तानी गर्दै',
    amount: 'रकम',
    confirmAndPay: 'पुष्टि गर्नुहोस् र भुक्तानी गर्नुहोस्',
    paymentSuccess: 'भुक्तानी सफल भयो!',
    paymentCompleteDesc: 'तपाईंले सफलतापूर्वक बिल भुक्तानी गर्नुभयो।',
    makeAnotherPayment: 'अर्को भुक्तानी गर्नुहोस्',

    // Scam practice - Nepali
    scam_question: 'प्रश्न {{current}} of {{total}}',
    scam_instruction: 'के यो एक घोटाला हो?',
    scam_button: 'घोटाला',
    not_scam_button: 'घोटाला होइन',
    scam_correct: 'सही!',
    scam_incorrect: 'गलत!',
    scam_feedback_1: 'यो एक घोटाला हो किनभने यसले झूटा जरुरी सिर्जना गर्दछ र तपाईंलाई एक शंकास्पद लिङ्कमा क्लिक गर्न सोध्छ।',
    scam_feedback_2: 'यो घोटाला होइन। यो एक बैंकबाट वैध देखिने सूचना हो।',
    scam_feedback_3: 'यो एक क्लासिक पुरस्कार घोटाला हो। वैध कम्पनीहरूले पुरस्कार दावी गर्न शुल्क माग्दैनन्।',
    scam_quiz_complete: 'प्रश्नोत्तरी पूरा भयो!',
    scam_quiz_end: 'तपाईंले {{total}} मध्ये {{score}} घोटालाहरू सही रूपमा पहिचान गर्नुभयो। धेरै राम्रो!',
    scam_sender_label: 'प्रेषक:',
    scam_subject_label: 'विषय:',
    bankName: 'मेरो बैंक',
    scam_sms_1: 'तपाईंको प्याकेजमा ढुवानी समस्या छ। फिर्ताबाट बच्न कृपया यहाँ आफ्नो विवरण अपडेट गर्नुहोस्: bit.ly/shipping-update123',
    scam_sms_2: 'तपाईंको कार्ड अन्त्यमा 1234 भएको कार्डमा $50 को कारोबार भएको छ। यदि यो तपाईंले गर्नुभएको होइन भने, कृपया हामीलाई तुरुन्त सम्पर्क गर्नुहोस्।',
    scam_email_subject_1: 'तपाईंले जित्नुभयो!',
    scam_email_1: 'बधाई छ! तपाईं हाम्रो भव्य पुरस्कारको विजेताको रूपमा चयन हुनुभएको छ। यसलाई दावी गर्न, कृपया यहाँ क्लिक गरेर $50 को सानो प्रशोधन शुल्क तिर्नुहोस्: bit.ly/claim-prize-now',

    // Password practice
    password_practice_title: 'बलियो पासवर्ड बनाउनुहोस्',
    password_placeholder: 'पासवर्ड टाइप गर्नुहोस्',
    password_check_length: 'कम्तिमा १२ अक्षरहरू',
    password_check_uppercase: 'एउटा ठूलो अक्षर समावेश गर्दछ',
    password_check_lowercase: 'एउटा सानो अक्षर समावेश गर्दछ',
    password_check_number: 'एउटा नम्बर समावेश गर्दछ',
    password_check_symbol: 'एउटा प्रतीक समावेश गर्दछ (जस्तै !@#)',
    password_strong: 'उत्कृष्ट! यो एक बलियो पासवर्ड हो।',

    // Reset Dialog
    resetDialogTitle: 'के तपाईं निश्चित हुनुहुन्छ?',
    resetDialogDescription: 'यसले तपाईंको सबै सिकाइ प्रगति मेटाउनेछ। यो कार्यलाई पूर्ववत गर्न सकिँदैन।',
    resetDialogCancel: 'रद्द गर्नुहोस्',
    resetDialogConfirm: 'रिसेट गर्नुहोस्',
    resetSuccessToast: 'तपाईंको प्रगति रिसेट गरिएको छ।',

    // Loading
    loadingJourney: 'तपाईंको सिक्ने यात्रा लोड हुँदैछ...',
    
    // Modules & Lessons from modules.ts
    'module_phone-basics_title': 'फोनको आधारभूत कुराहरू',
    'module_phone-basics_description': 'आफ्नो फोन प्रयोग गर्न आधारभूत इशाराहरू सिक्नुहोस्।',
    'module_calls-messages_title': 'कल र सन्देशहरू',
    'module_calls-messages_description': 'परिवार र साथीहरूसँग जडान गर्नुहोस्।',
    'module_health-services_title': 'स्वास्थ्य सेवाहरू',
    'module_health-services_description': 'अनलाइन स्वास्थ्य सेवाहरू पहुँच गर्नुहोस्।',
    'module_digital-payments_title': 'डिजिटल भुक्तानी',
    'module_digital-payments_description': 'आफ्नो फोनबाट सुरक्षित भुक्तानी गर्नुहोस्।',
    'module_help-safety_title': 'मद्दत र सुरक्षा',
    'module_help-safety_description': 'अनलाइन घोटालाहरूबाट सुरक्षित रहन सिक्नुहोस्।',

    'lesson_tap-basics_title': 'ट्यापको आधारभूत कुराहरू',
    'lesson_tap-basics_description': 'स्क्रिनमा कसरी ट्याप गर्ने सिक्नुहोस्।',
    'lesson_tap-basics_step_0_title': 'ट्याप के हो?',
    'lesson_tap-basics_step_0_content': 'ट्याप गर्नु सबैभन्दा आधारभूत कार्य हो। तपाईंले कुनै वस्तु चयन गर्न वा बटन थिच्न आफ्नो औंलाको टुप्पोले स्क्रिनलाई बिस्तारै छुनुहोस्, जसरी माउस क्लिक गर्नुहुन्छ।',
    'lesson_tap-basics_step_1_title': 'ट्याप गर्ने अभ्यास गरौं',
    'lesson_tap-basics_step_1_content': 'अभ्यास स्क्रिनमा एउटा बटन देखा पर्नेछ। तपाईंको लक्ष्य त्यसलाई ट्याप गर्नु हो। जब तपाईंले ट्याप गर्नुहुन्छ, यसको रङ परिवर्तन हुनेछ। यसले तपाईंको ट्याप सफल भएको देखाउँछ!',

    'lesson_swipe-basics_title': 'स्वाइपको आधारभूत कुराहरू',
    'lesson_swipe-basics_description': 'स्क्रिनमा कसरी स्वाइप गर्ने सिक्नुहोस्।',
    'lesson_swipe-basics_step_0_title': 'स्वाइप के हो?',
    'lesson_swipe-basics_step_0_content': 'स्वाइप गर्नु भनेको जब तपाइँ स्क्रिनमा छोएर आफ्नो औंला नउठाईकन स्लाइड गर्नुहुन्छ। यो माथि र तल स्क्रोल गर्न वा पृष्ठहरू बीच सार्न प्रयोग गरिन्छ।',
    'lesson_swipe-basics_step_1_title': 'स्वाइप गर्ने अभ्यास गरौं',
    'lesson_swipe-basics_step_1_content': 'अभ्यास स्क्रिनमा तपाईंले एउटा स्लाइडर देख्नुहुनेछ। यसलाई बायाँबाट दायाँ स्वाइप गर्ने प्रयास गर्नुहोस्।',

    'lesson_making-a-call_title': 'कल गर्दै',
    'lesson_making-a-call_description': 'कसरी फोन कल गर्ने सिक्नुहोस्।',
    'lesson_making-a-call_step_0_title': 'फोन एप खोल्नुहोस्',
    'lesson_making-a-call_step_0_content': 'पहिले, आफ्नो स्क्रिनमा फोन एप फेला पार्नुहोस्। यो सामान्यतया हरियो टेलिफोन जस्तो देखिन्छ। खोल्नको लागि त्यसमा ट्याप गर्नुहोस्।',
    'lesson_making-a-call_step_1_title': 'नम्बर डायल गर्नुहोस्',
    'lesson_making-a-call_step_1_content': 'एप खुलेपछि, तपाईंले किप्याड देख्नुहुनेछ। डायल गर्न नम्बरहरू ट्याप गर्नुहोस्, त्यसपछि हरियो कल बटन थिच्नुहोस्।',

    'lesson_booking-appointment_title': 'अपोइन्टमेन्ट बुक गर्दै',
    'lesson_booking-appointment_description': 'अनलाइन डाक्टरको अपोइन्टमेन्ट कसरी बुक गर्ने सिक्नुहोस्।',
    'lesson_booking-appointment_step_0_title': 'अस्पतालको वेबसाइट वा एप फेला पार्नुहोस्',
    'lesson_booking-appointment_step_0_content': 'आफ्नो वेब ब्राउजरमा आफ्नो अस्पताल वा क्लिनिकको वेबसाइट खोज्नुहोस्, वा एप स्टोरबाट तिनीहरूको एप डाउनलोड गर्नुहोस्। "अपोइन्टमेन्ट बुक गर्नुहोस्" वा "भेट्ने समय मिलाउनुहोस्" बटन खोज्नुहोस्।',
    'lesson_booking-appointment_step_1_title': 'डाक्टर र समय चयन गर्नुहोस्',
    'lesson_booking-appointment_step_1_content': 'तपाईंलाई चाहिने डाक्टरको प्रकार छान्नुहोस् र उपलब्ध समय स्लटहरू ब्राउज गर्नुहोस्। तपाईंको लागि काम गर्ने समय चयन गर्नुहोस् र पुष्टि गर्न ट्याप गर्नुहोस्।',

    'lesson_ordering-medicine_title': 'अनलाइन औषधि अर्डर गर्दै',
    'lesson_ordering-medicine_description': 'अनलाइन फार्मेसीहरूबाट प्रिस्क्रिप्शन कसरी अर्डर गर्ने सिक्नुहोस्।',
    'lesson_ordering-medicine_step_0_title': 'अनलाइन फार्मेसी फेला पार्नुहोस्',
    'lesson_ordering-medicine_step_0_content': 'एक विश्वसनीय अनलाइन फार्मेसी खोज्नुहोस्। तपाईं आफ्नो डाक्टरलाई सिफारिसहरूको लागि सोध्न सक्नुहुन्छ वा अनलाइन सेवाहरू प्रदान गर्ने प्रसिद्ध स्थानीय फार्मेसीहरू खोज्न सक्नुहुन्छ।',
    'lesson_ordering-medicine_step_1_title': 'आफ्नो प्रिस्क्रिप्शन अपलोड गर्नुहोस्',
    'lesson_ordering-medicine_step_1_content': 'धेरै जसो अनलाइन फार्मेसीहरूले तपाइँलाई तपाइँको प्रिस्क्रिप्शनको फोटो अपलोड गर्न आवश्यक छ। स्पष्ट तस्बिर लिन आफ्नो फोनको क्यामेरा प्रयोग गर्नुहोस् र तिनीहरूको एप वा वेबसाइट मार्फत अपलोड गर्नुहोस्।',
    'lesson_ordering-medicine_step_2_title': 'पुष्टि गर्नुहोस् र भुक्तानी गर्नुहोस्',
    'lesson_ordering-medicine_step_2_content': 'आफ्नो कार्टमा औषधिहरू थप्नुहोस्, आफ्नो डेलिभरी ठेगाना प्रविष्ट गर्नुहोस्, र एक सुरक्षित विधि प्रयोग गरेर भुक्तानी गर्नुहोस्। अर्डर राखेपछि तपाईंले पुष्टिकरण प्राप्त गर्नुहुनेछ।',

    'lesson_photo-gallery_title': 'फोटो ग्यालरी',
    'lesson_photo-gallery_description': 'फोटोहरू मार्फत कसरी स्वाइप गर्ने सिक्नुहोस्।',
    'lesson_photo-gallery_step_0_title': 'फोटोहरू हेर्दै',
    'lesson_photo-gallery_step_0_content': 'फोटोहरू हेर्नको लागि, तपाईंले बायाँ वा दायाँ स्वाइप गर्न सक्नुहुन्छ। अर्को फोटो हेर्न बायाँ स्वाइप गर्नुहोस्, र अघिल्लो फोटोमा फर्कन दायाँ स्वाइप गर्नुहोस्।',
    'lesson_photo-gallery_step_1_title': 'अभ्यास गरौं',
    'lesson_photo-gallery_step_1_content': 'अब फोटोहरूको श्रृंखला मार्फत स्वाइप गर्ने प्रयास गर्नुहोस्।',
    
    'lesson_identifying-scams_title': 'अनलाइन घोटालाहरू पहिचान गर्दै',
    'lesson_identifying-scams_description': 'साधारण अनलाइन घोटालाहरू चिन्न सिक्नुहोस्।',
    'lesson_identifying-scams_step_0_title': 'घोटाला के हो?',
    'lesson_identifying-scams_step_0_content': 'अनलाइन घोटाला भनेको तपाईंको पैसा वा व्यक्तिगत जानकारी प्राप्त गर्ने एक चाल हो। घोटाला गर्नेहरूले तपाईंलाई ईमेल, टेक्स्ट सन्देश, वा सामाजिक सञ्जाल मार्फत तत्काल अनुरोधहरू वा धेरै राम्रो लाग्ने प्रस्तावहरूसँग सम्पर्क गर्न सक्छन्।',
    'lesson_identifying-scams_step_1_title': 'साधारण खतरा संकेतहरू',
    'lesson_identifying-scams_step_1_content': 'तपाईंको पासवर्ड वा बैंक खाता नम्बर जस्ता व्यक्तिगत विवरणहरू सोध्ने सन्देशहरूबाट सावधान रहनुहोस्। अप्रत्याशित पुरस्कार सूचनाहरू वा तत्काल धम्कीहरू पनि साधारण घोटाला रणनीतिहरू हुन्। क्लिक गर्नु अघि सधैं सोच्नुहोस्!',

    'lesson_strong-passwords_title': 'बलियो पासवर्डहरू सिर्जना गर्दै',
    'lesson_strong-passwords_description': 'आफ्नो खाताहरू बलियो पासवर्डहरूसँग सुरक्षित गर्नुहोस्।',
    'lesson_strong-passwords_step_0_title': 'बलियो पासवर्डहरू किन महत्त्वपूर्ण छन्',
    'lesson_strong-passwords_step_0_content': 'एक बलियो पासवर्डले तपाईंको अनलाइन खाताहरूको लागि ताला जस्तै काम गर्दछ। कमजोर पासवर्ड अरूलाई अनुमान गर्न सजिलो हुन्छ, जसले तपाईंको व्यक्तिगत जानकारीलाई जोखिममा पार्छ।',
    'lesson_strong-passwords_step_1_title': 'कसरी बलियो पासवर्ड बनाउने',
    'lesson_strong-passwords_step_1_content': 'एक राम्रो पासवर्ड लामो हुनुपर्छ (कम्तिमा १२ वर्ण), र ठूला अक्षरहरू, साना अक्षरहरू, संख्याहरू, र प्रतीकहरूको मिश्रण समावेश गर्नुपर्छ। आफ्नो नाम वा जन्मदिन जस्ता व्यक्तिगत जानकारी प्रयोग नगर्नुहोस्।',
    
    'lesson_digital-payments-intro_title': 'डिजिटल भुक्तानीको परिचय',
    'lesson_digital-payments-intro_description': 'डिजिटल भुक्तानीको आधारभूत कुराहरू बुझ्नुहोस्।',
    'lesson_digital-payments-intro_step_0_title': 'डिजिटल वालेट के हो?',
    'lesson_digital-payments-intro_step_0_content': 'डिजिटल वालेट तपाईको फोनमा एउटा एप हो जसले तपाईको भुक्तानी जानकारी, जस्तै क्रेडिट वा डेबिट कार्ड विवरणहरू सुरक्षित रूपमा भण्डारण गर्दछ। यसले तपाईलाई आफ्नो भौतिक कार्ड बिना भुक्तानी गर्न दिन्छ।',
    'lesson_digital-payments-intro_step_1_title': 'आफ्नो भुक्तानी एप खोल्नुहोस्',
    'lesson_digital-payments-intro_step_1_content': 'सुरु गर्न, आफ्नो डिजिटल वालेट वा बैंकिङ एप खोल्नुहोस्। "Scan QR," "Scan to Pay," जस्ता विकल्पहरू वा QR कोड जस्तो देखिने आइकन खोज्नुहोस्।',
    'lesson_digital-payments-intro_step_2_title': 'QR कोड स्क्यान गर्नुहोस्',
    'lesson_digital-payments-intro_step_2_content': 'आफ्नो फोनको क्यामेरा व्यापारीले उपलब्ध गराएको QR कोडमा देखाउनुहोस्। एपले स्वचालित रूपमा कोड पहिचान गर्नेछ र तपाईंलाई व्यापारीको विवरण देखाउनेछ।',
    'lesson_digital-payments-intro_step_3_title': 'रकम प्रविष्ट गर्नुहोस्',
    'lesson_digital-payments-intro_step_3_content': 'स्क्यान गरेपछि, तपाईंलाई भुक्तानी रकम प्रविष्ट गर्न प्रेरित गरिनेछ। सही रकम टाइप गर्नुहोस् र शुद्धताको लागि यसलाई डबल-जाँच गर्नुहोस्।',
    'lesson_digital-payments-intro_step_4_title': 'भुक्तानी पुष्टि गर्नुहोस्',
    'lesson_digital-payments-intro_step_4_content': 'अन्तमा, भुक्तानी विवरणहरू एक पटक फेरि समीक्षा गर्नुहोस्। लेनदेन अधिकृत गर्न र पूरा गर्न तपाईंले आफ्नो PIN, फिंगरप्रिन्ट, वा फेस ID प्रविष्ट गर्न आवश्यक हुन सक्छ।',
  }
};


export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [progress, setProgress] = useState<Progress>(defaultProgress);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const storedSettings = localStorage.getItem(SETTINGS_KEY);
      const storedProgress = localStorage.getItem(PROGRESS_KEY);

      if (storedSettings) {
        setSettings(JSON.parse(storedSettings));
      }
      if (storedProgress) {
        setProgress(JSON.parse(storedProgress));
      }
    } catch (error) {
      console.error("Failed to load data from localStorage", error);
    } finally {
      setIsReady(true);
    }
  }, []);
  
  const saveSettings = useCallback((newSettings: Settings) => {
    return new Promise<void>((resolve) => {
      try {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
      } catch (error) {
        console.error("Failed to save settings to localStorage", error);
      }
      resolve();
    });
  }, []);

  useEffect(() => {
    if (isReady) {
      try {
        localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
      } catch (error) {
        console.error("Failed to save progress to localStorage", error);
      }
    }
  }, [progress, isReady]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const root = document.documentElement;
    root.classList.remove('text-size-normal', 'text-size-large', 'text-size-xlarge', 'high-contrast');
    root.classList.add(`text-size-${settings.textSize}`);
    if (settings.contrast === 'high') {
      root.classList.add('high-contrast');
    }
  }, [settings.textSize, settings.contrast]);

  const updateSettings = useCallback(async (newSettings: Partial<Settings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    await saveSettings(updatedSettings);
  }, [settings, saveSettings]);

  const completeLesson = useCallback((lessonSlug: string) => {
    setProgress(prev => {
      if (prev.completedLessons.includes(lessonSlug)) {
        return prev;
      }
      return { ...prev, completedLessons: [...prev.completedLessons, lessonSlug] };
    });
  }, []);

  const isLessonCompleted = useCallback((lessonSlug: string) => {
    return progress.completedLessons.includes(lessonSlug);
  }, [progress.completedLessons]);

  const resetProgress = useCallback(() => {
    setProgress({ completedLessons: [] });
  }, []);

  const t = useCallback((key: string, replacements: Record<string, string | number> = {}): string => {
    let translation = translations[settings.language]?.[key] || key;
    for (const placeholder in replacements) {
        translation = translation.replace(`{{${placeholder}}}`, String(replacements[placeholder]));
    }
    return translation;
  }, [settings.language]);

  const value = useMemo(() => ({
    settings,
    progress,
    isReady,
    updateSettings,
    completeLesson,
    isLessonCompleted,
    resetProgress,
    t
  }), [settings, progress, isReady, updateSettings, completeLesson, isLessonCompleted, resetProgress, t]);

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};
