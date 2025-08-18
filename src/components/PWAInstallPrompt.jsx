import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiFillAndroid } from "react-icons/ai";

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowModal(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("✅ User accepted the install prompt");
      } else {
        console.log("❌ User dismissed the install prompt");
      }
      setDeferredPrompt(null);
      setShowModal(false);
    });
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 40 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="relative bg-white/80 dark:bg-gray-900/90 backdrop-blur-md border border-white/20 dark:border-gray-700 rounded-2xl shadow-2xl w-11/12 max-w-md p-6 text-center"
          >
            {/* آیکون بالای مودال */}
            <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-green-600 text-white shadow-lg mb-4">
              <AiFillAndroid size={32} />
            </div>

            {/* عنوان */}
            <h2 className="text-xl font-bold mb-3 dark:text-white text-gray-800">
              نصب اپلیکیشن PWA
            </h2>

            {/* متن */}
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              آیا می‌خواهید اپلیکیشن را روی دستگاه خود نصب کنید؟
            </p>

            {/* دکمه‌ها */}
            <div className="flex justify-center gap-4">
              <button
                onClick={handleClose}
                className="px-5 py-2 rounded-lg font-medium bg-gradient-to-r from-red-400 to-red-600 text-white shadow-md hover:scale-105 transition"
              >
                خیر
              </button>
              <button
                onClick={handleInstallClick}
                className="px-5 py-2 rounded-lg font-medium bg-gradient-to-r from-green-400 to-green-600 text-white shadow-md hover:scale-105 transition"
              >
                بله، نصب کن
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PWAInstallPrompt;
