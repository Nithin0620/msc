import React, { useEffect } from "react";
import { useUser,useAuth } from "@clerk/clerk-react";
import PostModal from "../components/PostModal";
import DeleteModal from "../components/DeleteModal";
import { useAnnouncementStore } from "../store/Announcement";
import WelcomeCard from "../components/WelcomeCard";
import { PlusIcon, EditIcon, TrashIcon } from "lucide-react";

const Home = () => {
  const { user } = useUser();
  const {
    isPostModalOpen,
    isUpdate,
    currentAnnouncement,
    isDeleteModalOpen,
    openCreateModal,
    openUpdateModal,
    openDeleteModal,
    closePostModal,
    closeDeleteModal,
    Announcements,
    createAnnouncement,
    getAnnouncements,
    updateAnnouncement,
    deleteAnnouncement,
    darkInStore,
    loading,
    error,
    isAuthenticated
  } = useAnnouncementStore();


  const { getToken } = useAuth();

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const token = await getToken();
      getAnnouncements(token);
    };
    fetchAnnouncements();
  }, [getToken,getAnnouncements]);

  // console.log("token:",token)

  const handleSubmit = async (formData) => {
    try {
      const token = await getToken();
      if (isUpdate && currentAnnouncement) {
        await updateAnnouncement({
          id: currentAnnouncement.id,
          title: formData.title,
          text: formData.description,
          createdBy: user?.fullName || "Anonymous",
          token:token,
        });
      } else {
        await createAnnouncement({
          title: formData.title,
          text: formData.description,
          createdBy: user?.fullName || "Anonymous",
          token:token,
        });
      }
      getAnnouncements(token);
      closePostModal();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to save announcement. Please try again.");
    }
  };

  const handleDelete = async () => {
    if (!currentAnnouncement) return;
    
    try {
      const token = await getToken();
      await deleteAnnouncement(currentAnnouncement.id,token);
      getAnnouncements(token)
      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting announcement:", error);
      alert("Failed to delete announcement. Please try again.");
    }
  };

  const cardBg = darkInStore ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200";
  const textMuted = darkInStore ? "text-gray-400" : "text-gray-600";

  return (
    <div className={`min-h-screen px-4 py-8 pt-20 transition-colors duration-300 ${
      darkInStore ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <WelcomeCard />

      {isAuthenticated && (
        <div className="max-w-4xl mx-auto mb-6 mt-8">
          <button
            onClick={openCreateModal}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              darkInStore 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            <PlusIcon size={16} />
            Create New Announcement
          </button>
        </div>
      )}

      {loading && (
        <div className="max-w-4xl mx-auto text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className={`mt-2 ${textMuted}`}>Loading announcements...</p>
        </div>
      )}

      {error && (
        <div className="max-w-4xl mx-auto mb-4">
          <div className={`p-4 rounded-lg border-l-4 border-red-500 ${
            darkInStore ? 'bg-red-900/20 text-red-400' : 'bg-red-50 text-red-700'
          }`}>
            <p className="font-medium">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        {!loading && Announcements.length === 0 && !error && (
          <div className={`text-center py-12 ${cardBg} rounded-lg border`}>
            <p className={`text-lg font-medium ${textMuted}`}>
              No announcements yet
            </p>
            <p className={`text-sm ${textMuted} mt-1`}>
              {isAuthenticated ? "Create The first announcement!" : "Sign in to view announcements"}
            </p>
          </div>
        )}

        <div className="grid gap-4">
          {Announcements.map((announcement) => (
            <div
              key={announcement.id}
              className={`${cardBg} border p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-200`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2">
                    {announcement.title || "Untitled"}
                  </h3>
                  <p className={`${textMuted} mb-3 leading-relaxed`}>
                    {announcement.text || "No description available."}
                  </p>
                  <div className={`text-xs ${textMuted} flex items-center gap-4`}>
                    <span>By: {announcement.createdBy || "Anonymous"}</span>
                    {announcement.timeStamp && (
                      <span>
                        {new Date(announcement.timeStamp._seconds * 1000).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
                
                {isAuthenticated && (
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => openUpdateModal({
                        id: announcement.id,
                        title: announcement.title,
                        description: announcement.text
                      })}
                      className={`p-2 rounded-md transition-colors ${
                        darkInStore 
                          ? 'text-blue-400 hover:bg-blue-900/20' 
                          : 'text-blue-600 hover:bg-blue-50'
                      }`}
                      title="Edit"
                    >
                      <EditIcon size={16} />
                    </button>
                    <button
                      onClick={() => openDeleteModal({ id: announcement.id })}
                      className={`p-2 rounded-md transition-colors ${
                        darkInStore 
                          ? 'text-red-400 hover:bg-red-900/20' 
                          : 'text-red-600 hover:bg-red-50'
                      }`}
                      title="Delete"
                    >
                      <TrashIcon size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <PostModal
        isOpen={isPostModalOpen}
        onClose={closePostModal}
        onSubmit={handleSubmit}
        title={isUpdate ? "Update Announcement" : "Create Announcement"}
        isUpdate={isUpdate}
        initialData={currentAnnouncement || {}}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default Home;