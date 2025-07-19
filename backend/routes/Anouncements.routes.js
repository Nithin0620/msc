const express = require("express");
const router = express.Router();

const verifyClerkToken = require('../middlewares/verifyClerkToken');


const {
   deleteAnnouncement,
   updateAnnouncement,
   createAnnouncement,
   getAnnouncements
} = require("../controllers/Anouncements");

router.get("/getannouncement", getAnnouncements);
router.post("/postannouncement", verifyClerkToken, createAnnouncement); 
router.put("/updateannouncement/:id", verifyClerkToken, updateAnnouncement);
router.delete("/deleteannouncement/:id", verifyClerkToken, deleteAnnouncement);

module.exports = router;
