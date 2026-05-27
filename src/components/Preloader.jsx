import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const messages = [
  { text: "ब्रेकिंग न्यूज़", delay: 0 },
  { text: "सुल्तानपुर", delay: 800 },
  { text: "अमेठी", delay: 800 },
  { text: "तेज़ खबर", delay: 800 }
];

export default function Preloader({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [showLogo, setShowLogo] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    let index = 0;
    
    const showNextMessage = () => {
      if (index < messages.length) {
        setCurrentIndex(index);
        index++;
        setTimeout(showNextMessage, messages[index - 1]?.delay || 800);
      } else {
        setTimeout(() => {
          setCurrentIndex(-1);
          setShowLogo(true);
          setStep(2);
        }, 500);
      }
    };
    
    showNextMessage();
  }, []);

  useEffect(() => {
    if (step === 2) {
      const timer = setTimeout(() => {
        setStep(3);
        setTimeout(onComplete, 1000);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [step, onComplete]);

  return (
    <AnimatePresence>
      {step !== 3 && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {step === 1 && currentIndex >= 0 && (
            <div className="relative z-10 text-center px-4 w-full max-w-3xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="text-center"
                >
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-black tracking-tight font-hindi">
                    {messages[currentIndex].text}
                  </h2>
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {step === 2 && showLogo && (
            <motion.div
              className="relative z-10 flex flex-col items-center justify-center px-4"
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 15, stiffness: 120, duration: 0.6 }}
            >
              <img 
                src="./logo.png" 
                alt="NOW44 Logo" 
                className="w-80 sm:w-96 md:w-[28rem] lg:w-[32rem] h-auto object-contain"
              />
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="-mt-2 text-center"
              >
                <span className="text-black text-base sm:text-lg md:text-xl lg:text-2xl tracking-[0.3em] uppercase font-bold font-hindi">
                  NEWS CHANNEL
                </span>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      )}

      {step === 3 && (
        <motion.div
          className="fixed inset-0 z-50 bg-white"
          initial={{ clipPath: "inset(0 0 0 0)" }}
          animate={{ 
            clipPath: "inset(0 0 100% 0 round 0 0 100% 100% / 0 0 60% 60%)"
          }}
          transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
        />
      )}
    </AnimatePresence>
  );
}
