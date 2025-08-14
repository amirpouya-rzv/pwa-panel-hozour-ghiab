import React from "react";
import { BiTrash } from "react-icons/bi";
import { AnimatePresence, motion } from "framer-motion";

export default function ConfirmModal({
  isOpen,
  title = "تأیید عملیات",
  message = "آیا مطمئن هستید؟",
  confirmText = "بله",
  cancelText = "خیر",
  onConfirm,
  onCancel,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-darkgray dark:text-white rounded-xl w-11/12 max-w-lg h-52 shadow-lg text-right font-medium"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex justify-center items-center pt-5 gap-2 text-white dark:bg-dark_kightgray dark:text-darkgray bg-toblue mb-4 border-b pb-2 text-center text-lg">
              <h2>{title}</h2>
              <BiTrash size={24} />
            </div>
            <p className="text-center">{message}</p>
            <div className="flex justify-center gap-5 pt-10 items-center">
              <button
                onClick={onCancel}
                className="px-6 py-1 rounded-md dark:border-lightgray text-darkgray dark:text-lightgray border-2 border-red-600 transition"
              >
                {cancelText}
              </button>
              <button
                onClick={onConfirm}
                className="px-6 py-1 rounded-md dark:bg-lightgray dark:border-lightgray text-darkgray border-2 border-green-600 transition"
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
