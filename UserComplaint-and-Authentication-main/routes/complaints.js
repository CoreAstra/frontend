const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudinary"); // make sure this is your Cloudinary config
const upload = multer({ storage });

const complaintController = require("../controllers/complaintController");
const Complaint = require("../models/Complaint");

// placeholder auth middleware (replace later with Passport)
const auth = (req, res, next) => {
  req.user = { _id: "66e8e30f6f59f2abc1234567" }; // dummy user id
  next();
};

// Show complaint form
router.get("/new", auth, complaintController.renderNewForm);

// Submit complaint with image upload
router.post(
  "/",
  auth,
  upload.single("complaint[image]"),
  async (req, res) => {
    try {
      const complaint = new Complaint({
        ...req.body.complaint,   // fields from form
        image: req.file ? req.file.path : undefined,
        user: req.user._id       // attach logged-in user
      });

      await complaint.save();
      res.status(201).json({ message: "Complaint created", complaint });
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err.message });
    }
  }
);

// GET /complaints/:id
router.get("/:id", async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate("user", "fullName email phone"); // include user details

    if (!complaint) {
      req.flash("error", "Complaint not found");
      return res.redirect("/complaints");
    }
    res.render("complaints/show", { complaint });
  } catch (err) {
    console.error(err);
    res.redirect("/complaints");
  }
});

module.exports = router;
