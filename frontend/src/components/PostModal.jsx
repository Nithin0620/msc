// PostModal.jsx
import { useState, useEffect } from "react";
import { useAnnouncementStore } from "../store/Announcement";
import { X } from "lucide-react";


const PostModal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  initialData = {},
  isUpdate = false,
}) => {
  const { darkInStore } = useAnnouncementStore();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ...initialData
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return; 

    if (isUpdate && initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
      });
    }
  }, [isOpen, isUpdate, initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim()) {
      alert("Please fill in both title and description");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const modalBg = darkInStore ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200";
  const inputBg = darkInStore ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900";
  const textColor = darkInStore ? "text-white" : "text-gray-900";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className={`w-full max-w-md ${modalBg} border rounded-xl shadow-xl`}>
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className={`text-xl font-semibold ${textColor}`}>{title}</h2>
          <button
            onClick={onClose}
            className={`p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${textColor}`}
            disabled={isSubmitting}
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium ${textColor} mb-1`}>
                Title
              </label>
              <input
                type="text"
                placeholder="Enter announcement title..."
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className={`w-full p-3 rounded-lg border ${inputBg} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                disabled={isSubmitting}
                maxLength={200}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium ${textColor} mb-1`}>
                Description
              </label>
              <textarea
                placeholder="Enter announcement description..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className={`w-full p-3 h-32 rounded-lg border ${inputBg} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none`}
                disabled={isSubmitting}
                maxLength={1000}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                darkInStore
                  ? "bg-gray-600 hover:bg-gray-700 text-white"
                  : "bg-gray-300 hover:bg-gray-400 text-gray-700"
              }`}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                darkInStore
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : isUpdate ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};



export default PostModal;