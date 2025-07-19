import { AlertTriangle } from "lucide-react";
import { useAnnouncementStore } from "../store/Announcement";
import { useState } from "react";

import { X } from "lucide-react";

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  const { darkInStore } = useAnnouncementStore();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen) return null;

  const modalBg = darkInStore ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200";
  const textColor = darkInStore ? "text-white" : "text-gray-900";
  const textMuted = darkInStore ? "text-gray-400" : "text-gray-600";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className={`w-full max-w-sm ${modalBg} border rounded-xl shadow-xl`}>
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <AlertTriangle className="text-red-500" size={20} />
            <h2 className={`text-lg font-semibold ${textColor}`}>Confirm Delete</h2>
          </div>
          <button
            onClick={onClose}
            className={`p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${textColor}`}
            disabled={isDeleting}
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-6">
          <p className={`${textMuted} mb-6`}>
            Are you sure you want to delete this announcement? This action cannot be undone.
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                darkInStore
                  ? "bg-gray-600 hover:bg-gray-700 text-white"
                  : "bg-gray-300 hover:bg-gray-400 text-gray-700"
              }`}
              disabled={isDeleting}
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className={`px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                darkInStore
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-red-500 hover:bg-red-600 text-white"
              }`}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;