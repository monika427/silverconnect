
import type { Module, Lesson } from '@/lib/types';
import { Smartphone, MessageCircle, HeartPulse, QrCode, Shield, KeyRound, Siren } from 'lucide-react';

export const modules: Module[] = [
  {
    slug: 'phone-basics',
    title: 'Phone Basics',
    description: 'Learn the fundamental gestures to use your phone.',
    icon: Smartphone,
  },
  {
    slug: 'calls-messages',
    title: 'Calls & Messages',
    description: 'Connect with family and friends.',
    icon: MessageCircle,
  },
  {
    slug: 'health-services',
    title: 'Health Services',
    description: 'Access health services online.',
    icon: HeartPulse,
  },
  {
    slug: 'digital-payments',
    title: 'Digital Payments',
    description: 'Make secure payments with your phone.',
    icon: QrCode,
  },
  {
    slug: 'help-safety',
    title: 'Help & Safety',
    description: 'Learn to stay safe from online scams.',
    icon: Shield,
  },
];

export const lessons: Lesson[] = [
  {
    slug: 'tap-basics',
    moduleSlug: 'phone-basics',
    title: 'Tap Basics',
    description: 'Learn how to tap on the screen.',
    steps: [
      {
        title: 'What is a Tap?',
        content: 'Tapping is the most basic action. You gently touch the screen with your fingertip to select an item or press a button, just like clicking a mouse.',
        image: 'https://raw.githubusercontent.com/monika427/hostSilverConnectImages/refs/heads/main/tapbasics.png',
      },
      {
        title: 'Let\'s Practice Tapping',
        content: 'A button will appear on the practice screen. Your goal is to tap it. When you tap it, it will change color. This shows your tap was successful!',
        image: 'https://raw.githubusercontent.com/monika427/hostSilverConnectImages/refs/heads/main/tapbasics.png',
      },
    ],
  },
  {
    slug: 'swipe-basics',
    moduleSlug: 'phone-basics',
    title: 'Swipe Basics',
    description: 'Learn how to swipe on the screen.',
    steps: [
      {
        title: 'What is a Swipe?',
        content: 'Swiping is when you touch the screen and slide your finger across it without lifting. It\'s used for scrolling up and down or moving between pages.',
        image: 'https://github.com/monika427/hostSilverConnectImages/blob/main/swipeBasics.png?raw=true',
      },
      {
        title: 'Let\'s Practice Swiping',
        content: 'You will see a slider on the practice screen. Try swiping it from left to right.',
        image: 'https://github.com/monika427/hostSilverConnectImages/blob/main/swipeBasics.png?raw=true',
      },
    ],
  },
    {
    slug: 'photo-gallery',
    moduleSlug: 'phone-basics',
    title: 'Photo Gallery',
    description: 'Learn how to swipe through photos.',
    steps: [
      {
        title: 'Viewing Photos',
        content: 'To view photos, you can swipe left or right. Swipe left to see the next photo, and swipe right to go back to the previous one.',
        image: 'https://github.com/monika427/hostSilverConnectImages/blob/main/swipePhoto.png?raw=true',
      },
      {
        title: 'Let\'s Practice',
        content: 'Now try swiping through a series of photos.',
        image: 'https://github.com/monika427/hostSilverConnectImages/blob/main/swipePhoto.png?raw=true',
      },
    ],
  },
  {
    slug: 'making-a-call',
    moduleSlug: 'calls-messages',
    title: 'Making a Call',
    description: 'Learn how to make a phone call.',
    steps: [
        {
            title: 'Open the Phone App',
            content: 'First, find the Phone app on your screen. It usually looks like a green telephone. Tap on it to open.',
            image: 'https://github.com/monika427/hostSilverConnectImages/blob/main/makingCall.png?raw=true',
        },
        {
            title: 'Dial a Number',
            content: 'Once the app is open, you will see a keypad. Tap the numbers to dial, then press the green call button.',
            image: 'https://github.com/monika427/hostSilverConnectImages/blob/main/dialnumber.png?raw=true',
        }
    ]
  },
  {
    slug: 'booking-appointment',
    moduleSlug: 'health-services',
    title: 'Booking an Appointment',
    description: 'Learn to book a doctor\'s appointment online.',
    steps: [
      {
        title: 'Find the Hospital Website or App',
        content: 'Search for your hospital or clinic\'s website on your web browser, or download their app from the app store. Look for a "Book Appointment" or "Schedule a Visit" button.',
        image: 'https://github.com/monika427/hostSilverConnectImages/blob/main/bookingAppointment.png?raw=true',
      },
      {
        title: 'Select a Doctor and Time',
        content: 'Choose the type of doctor you need and browse available time slots. Select a time that works for you and tap to confirm.',
        image: 'https://github.com/monika427/hostSilverConnectImages/blob/main/bookingAppointment.png?raw=true',
      },
    ],
  },
  {
    slug: 'ordering-medicine',
    moduleSlug: 'health-services',
    title: 'Ordering Medicine Online',
    description: 'Learn how to order prescriptions from online pharmacies.',
    steps: [
      {
        title: 'Find an Online Pharmacy',
        content: 'Search for a trusted online pharmacy. You can ask your doctor for recommendations or look for well-known local pharmacies that offer online services.',
        image: 'https://github.com/monika427/hostSilverConnectImages/blob/main/onlinePharmacy.png?raw=true',
      },
      {
        title: 'Upload Your Prescription',
        content: 'Most online pharmacies require you to upload a photo of your prescription. Use your phone\'s camera to take a clear picture and upload it through their app or website.',
        image: 'https://github.com/monika427/hostSilverConnectImages/blob/main/uploadPrescription.png?raw=true',
      },
      {
        title: 'Confirm and Pay',
        content: 'Add the medicines to your cart, enter your delivery address, and make the payment using a secure method. You will receive a confirmation once the order is placed.',
        image: 'https://github.com/monika427/hostSilverConnectImages/blob/main/ordermedicinepay.png?raw=true',
      },
    ],
  },
  {
    slug: 'digital-payments-intro',
    moduleSlug: 'digital-payments',
    title: 'Intro to Digital Payments',
    description: 'Understand the basics of digital payments.',
    steps: [
      {
        title: 'What are Digital Wallets?',
        content: 'A digital wallet is an app on your phone that securely stores your payment information, like credit or debit card details. It lets you make payments without needing your physical card.',
        image: 'https://github.com/monika427/hostSilverConnectImages/blob/main/digitalwallet.png?raw=true',
      },
      {
        title: 'Open Your Payment App',
        content: 'To start, open your digital wallet or banking app. Look for an option like "Scan QR," "Scan to Pay," or an icon that looks like a QR code.',
        image: 'https://github.com/monika427/hostSilverConnectImages/blob/main/openPaymentapp.png?raw=true',
      },
      {
        title: 'Scan the QR Code',
        content: 'Point your phone\'s camera at the QR code provided by the merchant. The app will automatically recognize the code and show you the merchant\'s details.',
        image: 'https://github.com/monika427/hostSilverConnectImages/blob/main/scanQr.png?raw=true',
      },
      {
        title: 'Enter the Amount',
        content: 'After scanning, you will be prompted to enter the payment amount. Type in the correct amount and double-check it for accuracy.',
        image: 'https://github.com/monika427/hostSilverConnectImages/blob/main/enteramount.png?raw=true',
      },
      {
        title: 'Confirm the Payment',
        content: 'Finally, review the payment details one last time. You may need to enter your PIN, use your fingerprint, or face ID to authorize and complete the transaction.',
        image: 'https://github.com/monika427/hostSilverConnectImages/blob/main/image.png?raw=true',
      },
    ]
  },
  {
    slug: 'identifying-scams',
    moduleSlug: 'help-safety',
    title: 'Identifying Online Scams',
    description: 'Learn to recognize common online scams.',
    steps: [
      {
        title: 'What is a Scam?',
        content: 'An online scam is a trick to get your money or personal information. Scammers may contact you by email, text message, or social media with urgent requests or offers that seem too good to be true.',
        image: 'https://github.com/monika427/hostSilverConnectImages/blob/main/onlineScam.png?raw=true',
      },
      {
        title: 'Common Red Flags',
        content: 'Be cautious of messages that ask for personal details like your password or bank account number. Unexpected prize notifications or urgent threats are also common scam tactics. Always think before you click!',
        image: 'https://github.com/monika427/hostSilverConnectImages/blob/main/onlineScam.png?raw=true',
      },
    ],
  },
  {
    slug: 'strong-passwords',
    moduleSlug: 'help-safety',
    title: 'Creating Strong Passwords',
    description: 'Protect your accounts with strong passwords.',
    steps: [
      {
        title: 'Why Strong Passwords Matter',
        content: 'A strong password acts like a lock for your online accounts. A weak password is easy for others to guess, putting your personal information at risk.',
        image: 'https://github.com/monika427/hostSilverConnectImages/blob/main/strongPassword.png?raw=true',
      },
      {
        title: 'How to Create a Strong Password',
        content: 'A good password should be long (at least 12 characters), and include a mix of uppercase letters, lowercase letters, numbers, and symbols. Avoid using personal information like your name or birthday.',
        image: 'https://github.com/monika427/hostSilverConnectImages/blob/main/strongPassword.png?raw=true',
      },
    ],
  },
];

export const getLessonsForModule = (moduleSlug: string) => {
  return lessons.filter(lesson => lesson.moduleSlug === moduleSlug);
}

export const getLesson = (slug: string) => {
    return lessons.find(lesson => lesson.slug === slug);
}
