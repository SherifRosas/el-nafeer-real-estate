"use client";

import React, { useState, useEffect, useRef } from 'react';
import styles from '../../app/(public)/la-playa/la-playa.module.css';

type Step = 'greeting' | 'property_selected' | 'collect_name' | 'collect_phone' | 'collect_dates' | 'confirming' | 'success' | 'error';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>('greeting');
  const [bookingData, setBookingData] = useState({ name: '', phone: '', dates: '', propertyId: '' });
  const [messages, setMessages] = useState<{ sender: 'bot' | 'user', text: string }[]>([
    { sender: 'bot', text: 'Hi! Looking to book a chalet for your next kitesurfing trip?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isTyping]);

  const simulateTyping = (callback: () => void) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, 800);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    const userInput = inputValue.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userInput }]);
    setInputValue('');

    // Handle flow based on current step
    if (step === 'collect_name') {
      setBookingData(prev => ({ ...prev, name: userInput }));
      setStep('collect_phone');
      simulateTyping(() => {
        setMessages(prev => [...prev, { sender: 'bot', text: `Nice to meet you, ${userInput}! What's the best WhatsApp/Phone number to reach you at?` }]);
      });
    } 
    else if (step === 'collect_phone') {
      setBookingData(prev => ({ ...prev, phone: userInput }));
      setStep('collect_dates');
      simulateTyping(() => {
        setMessages(prev => [...prev, { sender: 'bot', text: 'Got it. Finally, what dates are you planning to visit?' }]);
      });
    }
    else if (step === 'collect_dates') {
      setBookingData(prev => ({ ...prev, dates: userInput }));
      setStep('confirming');
      simulateTyping(() => {
        setMessages(prev => [...prev, { sender: 'bot', text: 'Perfect. We offer "Pay on Arrival" with a secure card hold to guarantee your spot. Are you ready to confirm your request?' }]);
      });
    }
    else {
      // General inquiry
      simulateTyping(() => {
        setMessages(prev => [...prev, { sender: 'bot', text: 'I am a booking assistant! Please select an option above or type your booking details when prompted.' }]);
      });
    }
  };

  const handleOptionClick = (optionType: string, optionText: string) => {
    setMessages(prev => [...prev, { sender: 'user', text: optionText }]);
    
    if (optionType === 'view_shimaa') {
      // In a real app, you would fetch this ID from the DB
      setBookingData(prev => ({ ...prev, propertyId: 'la-playa-shimaa-id' }));
      setStep('collect_name');
      simulateTyping(() => {
        setMessages(prev => [...prev, { sender: 'bot', text: "Excellent choice! Dr. Shimaa's chalet is beautiful. To start the booking request, what is your full name?" }]);
      });
    }
    else if (optionType === 'confirm_booking') {
      submitBooking();
    }
    else if (optionType === 'pay_on_arrival') {
      simulateTyping(() => {
        setMessages(prev => [...prev, { sender: 'bot', text: 'Pay on Arrival means we safely authorize your credit card via Stripe (no money leaves your account yet). You pay in cash when you arrive! Would you like to view the chalet?' }]);
      });
    }
  };

  // 5. Frontend Wiring
  const submitBooking = async () => {
    simulateTyping(() => {
      setMessages(prev => [...prev, { sender: 'bot', text: 'Sending your booking request...' }]);
    });

    try {
      const res = await fetch('/api/la-playa/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.errors ? data.errors[0].message : 'Validation failed');
      }

      setStep('success');
      simulateTyping(() => {
        setMessages(prev => [...prev, { sender: 'bot', text: '✅ Success! Your booking request has been received. Our team will contact you on WhatsApp shortly to arrange the Stripe authorization link.' }]);
      });

    } catch (error: any) {
      setStep('error');
      simulateTyping(() => {
        setMessages(prev => [...prev, { sender: 'bot', text: `❌ Oops, there was an issue: ${error.message}. Please try again.` }]);
      });
    }
  };

  return (
    <div className={styles.chatbotWidgetContainer}>
      {isOpen && (
        <div className={`${styles.chatbotWindow} ${styles.glassPanel}`}>
          <div className={styles.chatbotHeader}>
            <span>Booking Assistant</span>
            <button onClick={toggleChat} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', fontSize: '20px' }}>&times;</button>
          </div>
          
          <div className={styles.chatbotMessages}>
            {messages.map((msg, i) => (
              <div key={i} className={`${styles.messageBubble} ${msg.sender === 'bot' ? styles.messageBot : styles.messageUser}`}>
                {msg.text}
              </div>
            ))}
            
            {isTyping && (
              <div className={`${styles.messageBubble} ${styles.messageBot}`}>
                <span className={styles.typingDot}>.</span><span className={styles.typingDot}>.</span><span className={styles.typingDot}>.</span>
              </div>
            )}
            
            {/* Contextual Options based on Step */}
            {!isTyping && step === 'greeting' && (
              <div className={styles.chatbotOptions}>
                <button className={styles.chatOptionBtn} onClick={() => handleOptionClick('view_shimaa', "View Dr. Shimaa's Chalet")}>View Dr. Shimaa's Chalet</button>
                <button className={styles.chatOptionBtn} onClick={() => handleOptionClick('pay_on_arrival', 'How does Pay on Arrival work?')}>How does Pay on Arrival work?</button>
              </div>
            )}

            {!isTyping && step === 'confirming' && (
              <div className={styles.chatbotOptions}>
                <button className={styles.chatOptionBtn} onClick={() => handleOptionClick('confirm_booking', "Confirm Booking")}>✅ Confirm Booking</button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {step !== 'success' && (
            <div className={styles.chatbotInput}>
              <input 
                type="text" 
                placeholder="Type here..." 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <button onClick={handleSend}>Send</button>
            </div>
          )}
        </div>
      )}

      {!isOpen && (
        <button className={styles.chatbotButton} onClick={toggleChat}>
          💬
        </button>
      )}
    </div>
  );
}
