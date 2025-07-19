import { create } from "zustand";
import axios from "axios";


const BASE_URL = "http://localhost:4000/api/announcements";

export const useAnnouncementStore = create((set, get) => ({
  isAuthenticated: false,

  darkInStore: window?.matchMedia?.("(prefers-color-scheme: dark)")?.matches || false,

  Announcements: [],
  loading: false,
  error: null,

  isPostModalOpen: false,
  isUpdate: false,
  currentAnnouncement: null,
  isDeleteModalOpen: false,

  setIsAuthenticated: (data) => set({ isAuthenticated: data }),

  setDarkInStore: (isDark) => set({ darkInStore: isDark }),
  toggleTheme: () => set((state) => ({ darkInStore: !state.darkInStore })),

  openCreateModal: () =>
    set({ isPostModalOpen: true, isUpdate: false, currentAnnouncement: null }),
  
  openUpdateModal: (announcement) =>
    set({ isPostModalOpen: true, isUpdate: true, currentAnnouncement: announcement }),
  
  closePostModal: () =>
    set({ isPostModalOpen: false, currentAnnouncement: null }),

  openDeleteModal: (announcement) =>
    set({ isDeleteModalOpen: true, currentAnnouncement: announcement }),
  
  closeDeleteModal: () =>
    set({ isDeleteModalOpen: false, currentAnnouncement: null }),

  getAnnouncements: async (token) => {
    if (!token) return;
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${BASE_URL}/getannouncement`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("response",response)
      set({ 
        Announcements: response.data?.data || [], 
        loading: false 
      });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || "Failed to fetch announcements",
        loading: false 
      });
    }
  },

  createAnnouncement: async ({ title, text, createdBy ,token}) => {
    if (!token) return;

    try {
      const response = await axios.post(`${BASE_URL}/postannouncement`, {
        title,
        text,
        createdBy,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("response:",response)

      get().getAnnouncements();
      return response.data;
    } catch (error) {
      console.error("Error creating announcement:", error);
      throw error;
    }
  },

  updateAnnouncement: async ({ id, title, text, createdBy ,token}) => {
    if (!token) return;

    try {
      const response = await axios.put(`${BASE_URL}/updateannouncement/${id}`, {
        title,
        text,
        createdBy,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      get().getAnnouncements();
      return response.data;
    } catch (error) {
      console.error("Error updating announcement:", error);
      throw error;
    }
  },

  deleteAnnouncement: async (id,token) => {
    if (!token) return;

    try {
      const response = await axios.delete(`${BASE_URL}/deleteannouncement/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      get().getAnnouncements();
      return response.data;
    } catch (error) {
      console.error("Error deleting announcement:", error);
      throw error;
    }
  },
}));