const db = require("../firebaseDb");

exports.getAnnouncements = async (req, res) => {
   try {
      const snapshot = await db.collection("announcements").orderBy("timeStamp", "desc").get();

      const announcements = snapshot.docs.map((doc) => ({
         id: doc.id,
         ...doc.data(),
      }));

      return res.status(200).json({
         success: true,
         message: "All announcements retrieved successfully",
         data: announcements,
      });
   } catch (e) {
      console.error("Error in getAnnouncements:", e);
      return res.status(500).json({
         success: false,
         message: "Error occurred in getAnnouncements controller",
      });
   }
};

exports.createAnnouncement = async (req, res) => {
  console.log("createAnnouncement called");
   try {
      const authorId = req.auth.userId;
      const { title, text, createdBy } = req.body;
      console.log({title,text,createdBy,authorId})

      if (!title || !text) {
         return res.status(400).json({
            success: false,
            message: "Title and text are required",
         });
      }

      const newDoc = await db.collection("announcements").add({
         title: title.trim(),
         text: text.trim(),
         createdBy: createdBy || "Anonymous",
         userId: authorId,
         timeStamp: new Date(),
      });

      return res.status(201).json({
         success: true,
         message: "Announcement created successfully",
         data: newDoc,
      });
   } catch (e) {
      console.error("Error in createAnnouncement:", e);
      return res.status(500).json({
         success: false,
         message: "Error occurred in createAnnouncement controller",
      });
   }
};

exports.updateAnnouncement = async (req, res) => {
   try {
      const authorId = req.auth.userId;
      const announcementId = req.params.id; 
      const { title, text, createdBy } = req.body;

      if (!title || !text) {
         return res.status(400).json({
            success: false,
            message: "Title and text are required",
         });
      }

      const docRef = db.collection("announcements").doc(announcementId);
      const doc = await docRef.get();

      if (!doc.exists) {
         return res.status(404).json({
            success: false,
            message: "Announcement not found",
         });
      }

      if (doc.data().userId !== authorId) {
         return res.status(403).json({
            success: false,
            message: "You are not authorized to update this announcement",
         });
      }

      await docRef.update({
         title: title.trim(),
         text: text.trim(),
         createdBy: createdBy || doc.data().createdBy,
         timeStamp: new Date(),
      });

      return res.status(200).json({
         success: true,
         message: "Announcement updated successfully",
      });
   } catch (e) {
      console.error("Error in updateAnnouncement:", e);
      return res.status(500).json({
         success: false,
         message: "Error occurred in updateAnnouncement controller",
      });
   }
};

exports.deleteAnnouncement = async (req, res) => {
   try {
      const announcementId = req.params.id; 
      const authorId = req.auth.userId;

      const docRef = db.collection("announcements").doc(announcementId);
      const doc = await docRef.get();

      if (!doc.exists) {
         return res.status(404).json({
            success: false,
            message: "Announcement not found",
         });
      }

      if (doc.data().userId !== authorId) {
         return res.status(403).json({
            success: false,
            message: "You are not authorized to delete this announcement",
         });
      }

      await docRef.delete();

      return res.status(200).json({
         success: true,
         message: "Announcement deleted successfully",
      });
   } catch (e) {
      console.error("Error in deleteAnnouncement:", e);
      return res.status(500).json({
         success: false,
         message: "Error occurred in deleteAnnouncement controller",
      });
   }
};


