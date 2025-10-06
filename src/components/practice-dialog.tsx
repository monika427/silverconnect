
'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Image from 'next/image';
import { Button } from './ui/button';
import { Hand, CheckCircle, Phone, Delete, PhoneOutgoing, User, Calendar, ShoppingCart, Pill, Trash2, Dot, ArrowLeft, ArrowRight, CreditCard, QrCode, Store, ShieldAlert, ShieldCheck, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Lesson } from '@/lib/types';
import { useAppState } from './providers/app-state-provider';
import { Slider } from './ui/slider';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Progress } from './ui/progress';

interface PracticeDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  lesson: Lesson;
}

type CartItem = {
    name: string;
    price: number;
};

type ScamExample = {
  type: 'sms' | 'email';
  sender: string;
  subject?: string;
  content: string;
  isScam: boolean;
};

type PasswordStrength = {
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
  symbol: boolean;
};

export function PracticeDialog({ isOpen, onOpenChange, lesson }: PracticeDialogProps) {
  const { t, completeLesson } = useAppState();
  const [feedback, setFeedback] = useState('');
  
  // Generic state
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Tap & Swipe state
  const [tapped, setTapped] = useState(false);
  const [swiped, setSwiped] = useState(false);

  // Phone call state
  const [dialedNumber, setDialedNumber] = useState('');
  const [isCalling, setIsCalling] = useState(false);
  
  // Appointment booking state
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Medicine order state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [checkoutStep, setCheckoutStep] = useState(0);
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvc: '', name: '' });
  
  // Digital payments state
  const [paymentStep, setPaymentStep] = useState(0);
  
  // Photo gallery state
  const [currentImage, setCurrentImage] = useState(0);
  const galleryImages = [
      { src: 'https://picsum.photos/seed/p1/400/600', alt: 'A beautiful landscape' },
      { src: 'https://picsum.photos/seed/p2/400/600', alt: 'A city skyline' },
      { src: 'https://picsum.photos/seed/p3/400/600', alt: 'A cute animal' },
  ];
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Scam identification state
  const [scamStep, setScamStep] = useState(0);
  const [scamScore, setScamScore] = useState(0);
  const [scamAnswered, setScamAnswered] = useState(false);
  const scamExamples: ScamExample[] = [
    { type: 'sms', sender: '555-123', content: t('scam_sms_1'), isScam: true },
    { type: 'sms', sender: t('bankName'), content: t('scam_sms_2'), isScam: false },
    { type: 'email', sender: 'rewards@luckydraw.com', subject: t('scam_email_subject_1'), content: t('scam_email_1'), isScam: true },
  ];
  const currentScam = scamExamples[scamStep];

  // Strong password state
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      symbol: false
  });
  
  const allPasswordChecksPassed = Object.values(passwordStrength).every(Boolean);

  useEffect(() => {
    if (isOpen) {
      // Reset all state on open
      setFeedback('');
      setShowSuccessMessage(false);
      setTapped(false);
      setSwiped(false);
      setDialedNumber('');
      setIsCalling(false);
      setSelectedDoctor(null);
      setSelectedTime(null);
      setCart([]);
      setCheckoutStep(0);
      setCardDetails({ number: '', expiry: '', cvc: '', name: '' });
      setPaymentStep(0);
      setCurrentImage(0);
      setScamStep(0);
      setScamScore(0);
      setScamAnswered(false);
      setPassword('');
      setPasswordStrength({ length: false, uppercase: false, lowercase: false, number: false, symbol: false });
    }
  }, [isOpen, t]);

  const handleInteraction = () => {
    setFeedback(t('tapGreatJob'));
    setTapped(true);
    setTimeout(() => {
      setFeedback('');
      setTapped(false);
      completeLesson('tap-basics');
    }, 2000);
  };

  const handleSwipe = (value: number[]) => {
    if (value[0] > 90) {
        setFeedback(t('swipeGreatJob'));
        setSwiped(true);
        completeLesson('swipe-basics');
        setTimeout(() => {
            setFeedback('');
        }, 2000);
    }
  };

  const handleDial = (char: string) => {
    if (isCalling || dialedNumber.length >= 15) return;
    setDialedNumber(dialedNumber + char);
  };

  const handleBackspace = () => {
    if (isCalling) return;
    setDialedNumber(dialedNumber.slice(0, -1));
  };
  
  const handleCall = () => {
      if (isCalling || !dialedNumber) return;
      setIsCalling(true);
      setFeedback(`${t('calling')} ${dialedNumber}...`);
      setShowSuccessMessage(true);
      
      setTimeout(() => {
        setIsCalling(false);
        setFeedback(t('callEnded'));
        setDialedNumber('');
        completeLesson('making-a-call');
        setTimeout(() => {
            setFeedback('');
            setShowSuccessMessage(false);
        }, 2000);
      }, 3000);
  }

  const handleSelectDoctor = (doctor: string) => {
    setSelectedDoctor(doctor);
  };

  const handleSelectTime = (time: string) => {
    setSelectedTime(time);
    setFeedback(`${t('appointmentBookedSuccess', { doctor: selectedDoctor!, time: time })}`);
    completeLesson('booking-appointment');
    setShowSuccessMessage(true);
    setTimeout(() => {
      setFeedback('');
      setShowSuccessMessage(false);
    }, 4000);
  }

  const handleAddToCart = (item: CartItem) => {
    setCart([...cart, item]);
  }

  const handleRemoveFromCart = (itemName: string) => {
    setCart(cart.filter(item => item.name !== itemName));
  }

  const handleCheckout = () => {
    setCheckoutStep(1);
  }

  const handlePayment = () => {
    setCheckoutStep(2);
    setFeedback(t('orderPlaced'));
    completeLesson('ordering-medicine');
  }

  const handleCardDetailChange = (field: keyof typeof cardDetails, value: string) => {
      setCardDetails(prev => ({ ...prev, [field]: value }));
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      // Swiped left
      setCurrentImage(prev => (prev < galleryImages.length - 1 ? prev + 1 : prev));
      onSwipeSuccess();
    }

    if (touchStartX.current - touchEndX.current < -50) {
      // Swiped right
      setCurrentImage(prev => (prev > 0 ? prev - 1 : prev));
      onSwipeSuccess();
    }
  };

  const onSwipeSuccess = () => {
      setFeedback(t('swipeGreatJob'));
      completeLesson('photo-gallery');
      setTimeout(() => setFeedback(''), 2000);
  }

  const handleManualSwipe = (direction: 'next' | 'prev') => {
      if (direction === 'next') {
          setCurrentImage(prev => (prev < galleryImages.length - 1 ? prev + 1 : prev));
      } else {
          setCurrentImage(prev => (prev > 0 ? prev - 1 : prev));
      }
      onSwipeSuccess();
  }

  const handleQrPayment = () => {
    setPaymentStep(2);
    setFeedback(t('paymentSuccess'));
    completeLesson('digital-payments-intro');
  }

  const handleScamCheck = (answer: boolean) => {
    if (scamAnswered) return;

    if (answer === currentScam.isScam) {
      setFeedback(t('scam_correct'));
      setScamScore(score => score + 1);
    } else {
      setFeedback(t('scam_incorrect'));
    }
    setScamAnswered(true);

    setTimeout(() => {
      if (scamStep < scamExamples.length - 1) {
        setScamStep(step => step + 1);
        setScamAnswered(false);
        setFeedback('');
      } else {
        // End of quiz
        const finalScore = scamScore + (answer === currentScam.isScam ? 1 : 0);
        setFeedback(t('scam_quiz_end', { score: finalScore, total: scamExamples.length }));
        completeLesson('identifying-scams');
        if (finalScore === scamExamples.length) {
            setShowSuccessMessage(true);
        }
      }
    }, 3000);
  };

  const resetScamQuiz = () => {
    setScamStep(0);
    setScamScore(0);
    setScamAnswered(false);
    setFeedback('');
    setShowSuccessMessage(false);
  };

  const checkPasswordStrength = (pass: string) => {
      const strength: PasswordStrength = {
        length: pass.length >= 12,
        uppercase: /[A-Z]/.test(pass),
        lowercase: /[a-z]/.test(pass),
        number: /[0-9]/.test(pass),
        symbol: /[^A-Za-z0-9]/.test(pass),
      };
      setPasswordStrength(strength);
      return Object.values(strength).every(Boolean);
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const isStrong = checkPasswordStrength(newPassword);
    if (isStrong) {
        setFeedback(t('password_strong'));
        completeLesson('strong-passwords');
        setShowSuccessMessage(true);
    } else {
        setFeedback('');
        setShowSuccessMessage(false);
    }
  };
  
  const StrengthIndicator = ({ passed, text }: { passed: boolean, text: string }) => (
    <div className={cn("flex items-center text-sm gap-2 transition-colors", passed ? 'text-green-600' : 'text-muted-foreground')}>
        {passed ? <Check size={16} /> : <X size={16} />}
        <span>{text}</span>
    </div>
  );


  const renderPracticeArea = () => {
    switch(lesson.slug) {
      case 'tap-basics':
        return (
          <div className="flex flex-col items-center justify-center gap-4 p-4 md:p-8 h-full">
            <p className="text-base md:text-lg text-center flex-1">{t(`lesson_${lesson.slug}_step_1_content`)}</p>
            <Button
              size="lg"
              className={cn("text-lg md:text-xl p-6 md:p-8 transition-all", tapped && 'bg-green-500 text-white')}
              onClick={handleInteraction}
            >
              <Hand className="mr-2 h-6 w-6" /> {t('tapMe')}
            </Button>
          </div>
        )
      case 'swipe-basics':
        return (
            <div className="flex flex-col items-center justify-center gap-6 p-4 md:p-8 w-full h-full">
                <p className="text-base md:text-lg text-center">{t(`lesson_${lesson.slug}_step_1_content`)}</p>
                <div className="w-full px-4">
                    <Slider
                        defaultValue={[0]}
                        max={100}
                        step={1}
                        onValueChange={handleSwipe}
                        disabled={swiped}
                    />
                </div>
            </div>
        )
      case 'making-a-call':
        const dialpad = [
          { main: '1', sub: '' }, { main: '2', sub: 'ABC' }, { main: '3', sub: 'DEF' },
          { main: '4', sub: 'GHI' }, { main: '5', sub: 'JKL' }, { main: '6', sub: 'MNO' },
          { main: '7', sub: 'PQRS' }, { main: '8', sub: 'TUV' }, { main: '9', sub: 'WXYZ' },
          { main: '*', sub: '' }, { main: '0', sub: '+' }, { main: '#', sub: '' },
        ];
        return (
          <div className="flex flex-col justify-between gap-2 w-full h-full text-white">
            <div />
            <div className="flex-grow flex flex-col items-center justify-center">
                <div className="h-24 flex flex-col items-center justify-end p-4 w-full">
                    <p 
                        className="text-5xl font-thin tracking-wider w-full truncate text-center h-14 flex items-center justify-center"
                        style={{direction: 'ltr'}}
                    >
                        {dialedNumber}
                    </p>
                    {isCalling && (
                        <span className="text-sm text-center text-green-400 flex items-center gap-2">
                           <PhoneOutgoing size={16} /> {feedback}
                        </span>
                    )}
                </div>
                <div className="grid grid-cols-3 gap-4 w-full max-w-[250px] mx-auto">
                {dialpad.map(key => (
                    <button 
                        key={key.main}
                        className="h-20 w-20 flex flex-col items-center justify-center text-4xl font-thin rounded-full bg-white/20 hover:bg-white/30 transition-colors disabled:opacity-50"
                        onClick={() => handleDial(key.main)} 
                        disabled={isCalling}
                    >
                    {key.main}
                    {key.sub && <span className="text-xs font-normal tracking-widest -mt-1">{key.sub}</span>}
                    </button>
                ))}
                </div>
                <div className="flex items-center justify-around mt-4 w-full max-w-[280px] mx-auto h-20">
                    <div className="w-20" />
                    <button className="h-20 w-20 text-3xl bg-green-500 hover:bg-green-600 rounded-full shadow-lg flex items-center justify-center disabled:bg-green-800 disabled:opacity-70" onClick={handleCall} disabled={isCalling || !dialedNumber}>
                        <Phone size={36}/>
                    </button>
                    <button onClick={handleBackspace} className="p-2 w-20 h-20 flex items-center justify-center disabled:opacity-0" disabled={!dialedNumber || isCalling}>
                        <Delete className="h-8 w-8 text-white/80" />
                    </button>
                </div>
            </div>
          </div>
        )
      case 'booking-appointment':
          const doctors = [t('drSmith'), t('drJones')];
          const times = ['09:00 AM', '11:00 AM', '02:00 PM'];
          return (
            <div className="flex flex-col items-center justify-start gap-4 p-4 md:p-6 w-full h-full">
              {!selectedDoctor ? (
                <>
                  <h3 className="text-lg font-semibold">{t('selectDoctor')}</h3>
                  <div className="w-full space-y-3">
                    {doctors.map(doc => (
                      <button key={doc} onClick={() => handleSelectDoctor(doc)} className="w-full p-4 border rounded-lg flex items-center gap-4 hover:bg-accent transition-colors">
                        <User className="h-6 w-6 text-primary" />
                        <span className="font-medium text-lg">{doc}</span>
                      </button>
                    ))}
                  </div>
                </>
              ) : !selectedTime ? (
                <>
                  <h3 className="text-lg font-semibold">{t('selectTime')} {selectedDoctor}</h3>
                  <div className="w-full space-y-3">
                    {times.map(time => (
                      <button key={time} onClick={() => handleSelectTime(time)} className="w-full p-4 border rounded-lg flex items-center gap-4 hover:bg-accent transition-colors">
                        <Calendar className="h-6 w-6 text-primary" />
                        <span className="font-medium text-lg">{time}</span>
                      </button>
                    ))}
                  </div>
                   <Button variant="outline" size="sm" onClick={() => setSelectedDoctor(null)} className="mt-4">{t('backToDoctors')}</Button>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                    <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                    <h3 className="text-xl font-bold text-green-600">{t('appointmentBooked')}</h3>
                    <p className="text-muted-foreground mt-2">{t('appointmentBookedSuccess', { doctor: selectedDoctor, time: selectedTime })}</p>
                    <Button onClick={() => { setSelectedDoctor(null); setSelectedTime(null); }} className="mt-6">{t('bookAnother')}</Button>
                </div>
              )}
            </div>
          );
        case 'ordering-medicine': {
            const medicines: CartItem[] = [
                { name: t('medA'), price: 15 },
                { name: t('medB'), price: 25 },
            ];
            const total = cart.reduce((sum, item) => sum + item.price, 0);

            if (checkoutStep === 2) {
                return (
                    <div className="flex flex-col items-center justify-center h-full text-center p-4">
                        <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                        <h3 className="text-xl font-bold text-green-600">{t('orderPlaced')}</h3>
                        <p className="text-muted-foreground mt-2">{t('orderSuccess')}</p>
                        <Button onClick={() => { setCheckoutStep(0); setCart([]); setCardDetails({ number: '', expiry: '', cvc: '', name: '' }); }} className="mt-6">{t('orderAnother')}</Button>
                    </div>
                )
            }
            
            if (checkoutStep === 1) {
                 return (
                    <div className="flex flex-col justify-between h-full p-4">
                        <div>
                            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2"><CreditCard /> {t('paymentDetails')}</h3>
                            <div className="space-y-3">
                                <div className="space-y-1">
                                    <Label htmlFor="cardNumber" className="text-xs">{t('cardNumber')}</Label>
                                    <Input id="cardNumber" value={cardDetails.number} onChange={(e) => handleCardDetailChange('number', e.target.value)} placeholder="0000 0000 0000 0000" />
                                </div>
                                <div className="flex gap-3">
                                    <div className="space-y-1 w-1/2">
                                        <Label htmlFor="expiryDate" className="text-xs">{t('expiryDate')}</Label>
                                        <Input id="expiryDate" value={cardDetails.expiry} onChange={(e) => handleCardDetailChange('expiry', e.target.value)} placeholder="MM/YY" />
                                    </div>
                                    <div className="space-y-1 w-1/2">
                                        <Label htmlFor="cvc" className="text-xs">{t('cvc')}</Label>
                                        <Input id="cvc" value={cardDetails.cvc} onChange={(e) => handleCardDetailChange('cvc', e.target.value)} placeholder="123" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="cardName" className="text-xs">{t('cardName')}</Label>
                                    <Input id="cardName" value={cardDetails.name} onChange={(e) => handleCardDetailChange('name', e.target.value)} placeholder={t('cardNamePlaceholder')} />
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                             <Button className="w-full" size="lg" onClick={handlePayment} disabled={!cardDetails.name || !cardDetails.number || !cardDetails.expiry || !cardDetails.cvc}>
                                {t('payNow')} ${total.toFixed(2)}
                            </Button>
                            <Button variant="link" className="w-full mt-1" onClick={() => setCheckoutStep(0)}>{t('backToCart')}</Button>
                        </div>

                    </div>
                )
            }

            return (
                <div className="flex flex-col justify-between h-full p-4">
                    <div>
                        <h3 className="text-lg font-semibold mb-3">{t('availableMeds')}</h3>
                        <div className="space-y-2">
                            {medicines.map(med => (
                                <div key={med.name} className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <Pill className="h-5 w-5 text-primary" />
                                        <div>
                                            <p className="font-medium">{med.name}</p>
                                            <p className="text-sm text-muted-foreground">${med.price.toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <Button size="sm" onClick={() => handleAddToCart(med)}>{t('addToCart')}</Button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-4 border-t pt-4">
                        <div className="flex justify-between items-center mb-2">
                             <h3 className="text-lg font-semibold flex items-center gap-2"><ShoppingCart className="h-5 w-5"/> {t('yourCart')} ({cart.length})</h3>
                             <p className="font-bold text-lg">Total: ${total.toFixed(2)}</p>
                        </div>
                        {cart.length > 0 ? (
                            <div className="space-y-2 max-h-24 overflow-y-auto pr-2">
                                {cart.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between text-sm bg-accent/30 p-2 rounded-md">
                                        <span>{item.name}</span>
                                        <div className="flex items-center gap-2">
                                            <span>${item.price.toFixed(2)}</span>
                                            <button onClick={() => handleRemoveFromCart(item.name)}>
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground text-center py-4">{t('cartEmpty')}</p>
                        )}
                        <Button className="w-full mt-4" size="lg" disabled={cart.length === 0} onClick={handleCheckout}>
                            {t('checkout')}
                        </Button>
                    </div>
                </div>
            )
        }
        case 'photo-gallery':
            return (
                <div className="flex flex-col items-center justify-center gap-4 p-4 md:p-8 h-full">
                    <p className="text-base md:text-lg text-center h-12">{t(`lesson_${lesson.slug}_step_0_content`)}</p>
                    <div className="relative w-full h-80 rounded-lg overflow-hidden border bg-black/10"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        {galleryImages.map((img, index) => (
                            <Image
                                key={index}
                                src={img.src}
                                alt={img.alt}
                                fill
                                className={cn("object-cover transition-opacity duration-500", currentImage === index ? "opacity-100" : "opacity-0")}
                                sizes="(max-width: 768px) 100vw, 33vw"
                             />
                        ))}
                        <button onClick={() => handleManualSwipe('prev')} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-1 rounded-full"><ArrowLeft size={20}/></button>
                        <button onClick={() => handleManualSwipe('next')} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-1 rounded-full"><ArrowRight size={20}/></button>

                    </div>
                    <div className="flex items-center justify-center">
                        {galleryImages.map((_, index) => (
                            <Dot key={index} className={cn("transition-colors", currentImage === index ? "text-primary" : "text-muted-foreground/30")} />
                        ))}
                    </div>
                </div>
            )
        case 'digital-payments-intro': {
            if (paymentStep === 0) {
                return (
                    <div className="flex flex-col items-center justify-center h-full text-center p-6 gap-6">
                        <div className="flex items-center gap-3 text-2xl font-bold">
                            <Store className="h-8 w-8 text-primary" />
                            <span>{t('localStore')}</span>
                        </div>
                        <div className="p-4 bg-white rounded-lg">
                           <QrCode className="w-48 h-48" />
                        </div>
                        <p className="text-muted-foreground">{t('scanToPay')}</p>
                        <Button size="lg" className="w-full" onClick={() => setPaymentStep(1)}>
                            <QrCode className="mr-2" />
                            {t('scanAndPay')}
                        </Button>
                    </div>
                )
            }
            if (paymentStep === 1) {
                 return (
                    <div className="flex flex-col justify-between h-full p-6">
                        <div>
                            <h3 className="text-xl font-bold text-center mb-2">{t('confirmPayment')}</h3>
                            <div className="rounded-lg border bg-background p-4 space-y-4">
                                <div className="flex justify-between items-center text-lg">
                                    <span className="text-muted-foreground">{t('payingTo')}</span>
                                    <span className="font-semibold">{t('localStore')}</span>
                                </div>
                                <div className="flex justify-between items-center text-2xl font-bold">
                                    <span className="text-muted-foreground">{t('amount')}</span>
                                    <span>$12.00</span>
                                </div>
                            </div>
                        </div>
                        <Button size="lg" className="w-full bg-green-600 hover:bg-green-700" onClick={handleQrPayment}>
                            {t('confirmAndPay')}
                        </Button>
                    </div>
                )
            }
             if (paymentStep === 2) {
                return (
                    <div className="flex flex-col items-center justify-center h-full text-center p-4">
                        <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                        <h3 className="text-xl font-bold text-green-600">{t('paymentSuccess')}</h3>
                        <p className="text-muted-foreground mt-2">{t('paymentCompleteDesc')}</p>
                        <Button onClick={() => { setPaymentStep(0) }} className="mt-6">{t('makeAnotherPayment')}</Button>
                    </div>
                )
            }
            break;
        }
        case 'identifying-scams':
            if (scamStep >= scamExamples.length) {
                return (
                    <div className="flex flex-col items-center justify-center h-full text-center p-4">
                        <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                        <h3 className="text-xl font-bold">{t('scam_quiz_complete')}</h3>
                        <p className="text-muted-foreground mt-2">{t('scam_quiz_end', { score: scamScore, total: scamExamples.length })}</p>
                        <Button onClick={resetScamQuiz} className="mt-6">{t('practiceAgain')}</Button>
                    </div>
                );
            }

            return (
                <div className="flex flex-col justify-between h-full p-4">
                    <div>
                        <p className="text-center text-sm font-bold mb-2">{t('scam_question', { current: scamStep + 1, total: scamExamples.length })}</p>
                        <div className="rounded-lg border bg-background p-3 space-y-2 text-sm">
                            {currentScam.type === 'email' && (
                                <>
                                    <div className="flex justify-between items-baseline">
                                        <span className="text-muted-foreground text-xs">{t('scam_sender_label')}</span>
                                        <span className="font-mono text-xs">{currentScam.sender}</span>
                                    </div>
                                    <div className="flex justify-between items-baseline">
                                        <span className="text-muted-foreground text-xs">{t('scam_subject_label')}</span>
                                        <span className="font-medium">{currentScam.subject}</span>
                                    </div>
                                </>
                            )}
                            {currentScam.type === 'sms' && (
                                <div className="flex justify-between items-baseline">
                                    <span className="font-bold text-lg">{currentScam.sender}</span>
                                </div>
                            )}
                            <div className={cn("p-3 rounded-md", currentScam.type === 'sms' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700')}>
                                <p>{currentScam.content}</p>
                            </div>
                        </div>

                        {scamAnswered && (
                            <Alert className={cn("mt-3", feedback === t('scam_correct') ? 'border-green-500 bg-green-50 text-green-800' : 'border-red-500 bg-red-50 text-red-800' )}>
                                {feedback === t('scam_correct') ? <CheckCircle className="h-5 w-5 text-green-500" /> : <ShieldAlert className="h-5 w-5 text-red-500" />}
                                <AlertTitle className="font-bold">{feedback}</AlertTitle>
                            </Alert>
                        )}
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-4">
                        <Button size="lg" variant="destructive" onClick={() => handleScamCheck(true)} disabled={scamAnswered}>
                            <ShieldAlert className="mr-2" />
                            {t('scam_button')}
                        </Button>
                        <Button size="lg" className="bg-green-600 hover:bg-green-700" onClick={() => handleScamCheck(false)} disabled={scamAnswered}>
                            <ShieldCheck className="mr-2" />
                            {t('not_scam_button')}
                        </Button>
                    </div>
                </div>
            );
        case 'strong-passwords': {
            const strengthValue = Object.values(passwordStrength).filter(Boolean).length;
            const progress = (strengthValue / 5) * 100;
             return (
                <div className="flex flex-col justify-between h-full p-4 w-full">
                    <div>
                        <h3 className="text-lg font-semibold mb-3 text-center">{t('password_practice_title')}</h3>
                        <div className="space-y-3">
                            <Input
                                type="text"
                                placeholder={t('password_placeholder')}
                                value={password}
                                onChange={handlePasswordChange}
                                className="text-center text-lg h-12"
                            />
                            <Progress value={progress} className={cn("h-2 transition-all", progress === 100 ? 'bg-green-500' : 'bg-primary')}/>
                        </div>
                    </div>
                    <div className="mt-4 space-y-2">
                        <StrengthIndicator passed={passwordStrength.length} text={t('password_check_length')} />
                        <StrengthIndicator passed={passwordStrength.uppercase} text={t('password_check_uppercase')} />
                        <StrengthIndicator passed={passwordStrength.lowercase} text={t('password_check_lowercase')} />
                        <StrengthIndicator passed={passwordStrength.number} text={t('password_check_number')} />
                        <StrengthIndicator passed={passwordStrength.symbol} text={t('password_check_symbol')} />
                    </div>
                     {allPasswordChecksPassed && (
                        <Alert className="mt-4 border-green-500 bg-green-50 text-green-800">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <AlertTitle className="font-bold">{t('password_strong')}</AlertTitle>
                        </Alert>
                    )}
                </div>
             )
        }
      default:
        return <p className="text-center p-8">{t('practiceComingSoon')}</p>
    }
  }

  const phoneBgClass = 'bg-slate-100 dark:bg-slate-800';
  const isPhoneShellNeeded = true;

  if (!isOpen) {
    return null;
  }

  const PracticeArea = () => (
    <>
      <DialogHeader className="p-4 text-center z-10 bg-background/90 backdrop-blur-sm">
        <DialogTitle>{t('practiceMode')}</DialogTitle>
        <DialogDescription>{t(`lesson_${lesson.slug}_title`)}</DialogDescription>
      </DialogHeader>
      <div className="flex-grow flex items-center justify-center pt-4">
        {renderPracticeArea()}
      </div>
      <div className="h-20 flex items-center justify-center bg-background text-primary font-semibold text-center p-2">
        {feedback}
      </div>
    </>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
       <DialogContent className="max-w-xs sm:max-w-sm rounded-2xl p-0 bg-transparent border-0 shadow-none">
        <DialogTitle className="sr-only">{t('practiceMode')}</DialogTitle>
        <div className={cn("aspect-[9/16] rounded-[48px] border-[12px] border-gray-800 overflow-hidden flex flex-col relative", lesson.slug === 'making-a-call' ? 'bg-black' : phoneBgClass)}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150px] h-[28px] bg-black rounded-b-2xl z-20 flex items-center justify-center">
            <div className="w-12 h-1.5 bg-gray-600 rounded-full" />
          </div>
          <div className="absolute top-2.5 left-4 text-white font-bold text-sm z-20" style={{visibility: lesson.slug === 'making-a-call' ? 'visible' : 'hidden'}}>9:41</div>
          
          <div className={cn("flex-grow flex flex-col items-center justify-center", lesson.slug === 'making-a-call' ? "" : 'pt-8')}>
            {renderPracticeArea()}
          </div>
           
           <div className="h-10 flex items-center justify-center bg-background/80 text-primary font-semibold text-center p-2 text-sm z-10">
                {feedback}
            </div>
        </div>

        {showSuccessMessage && !['identifying-scams', 'strong-passwords'].includes(lesson.slug) && (
          <div className="flex items-center justify-center text-green-600 font-semibold p-4 pt-2 text-center bg-background rounded-b-lg">
            <CheckCircle className="mr-2 h-6 w-6" />
            <span>{t('tapGreatJob')}</span>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
