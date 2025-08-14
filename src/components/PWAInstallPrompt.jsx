import React, { useEffect, useState } from "react";

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
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }
      setDeferredPrompt(null);
      setShowModal(false);
    });
  };

  const handleClose = () => {
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[400px] text-center">
        <h2 className="text-lg font-bold mb-4">نصب اپلیکیشن PWA</h2>
        <p className="mb-6">آیا می‌خواهید اپلیکیشن را روی دستگاه خود نصب کنید؟</p>
        <div className="flex justify-center gap-4">
           <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
          >
            خیر
          </button>
          <button
            onClick={handleInstallClick}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            بله، نصب کن
          </button> 
         
        </div>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;
