const Complaint = require("../models/Complaint");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

// Render new complaint form
exports.renderNewForm = (req, res) => {
  res.render("complaints/new");
};

// Create a complaint
exports.createComplaint = async (req, res) => {
  try {
    const { title, description, category, location } = req.body.complaint;

    let coordinates = [0, 0];
    let address = location;

    // If location is textual, use Mapbox geocoding
    if (location && !location.includes(",")) {
      const geoData = await geocodingClient
        .forwardGeocode({ query: location, limit: 1 })
        .send();
      if (geoData.body.features.length > 0) {
        coordinates = geoData.body.features[0].center; // [lng, lat]
        address = geoData.body.features[0].place_name;
      }
    } else if (location && location.includes(",")) {
      // If lat,lng input
      const parts = location.split(",").map(str => parseFloat(str.trim()));
      if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        coordinates = [parts[1], parts[0]]; // [lng, lat]
      }
    }

    const complaint = new Complaint({
      title,
      description,
      category,
      location: {
        type: "Point",
        coordinates,
        address
      },
      user: req.user._id,
      image: req.file ? req.file.path : undefined
    });

    await complaint.save();
    res.redirect(`/complaints/${complaint._id}`);
  } catch (err) {
    console.error("Error creating complaint:", err);
    res.status(500).send("Error creating complaint: " + err.message);
  }
};

// Show complaint detail
exports.showComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.redirect("/complaints");
    res.render("complaints/show", { complaint });
  } catch (err) {
    console.error(err);
    res.redirect("/complaints");
  }
};

// List all complaints
exports.index = async (req, res) => {
  const complaints = await Complaint.find({});
  res.render("complaints/index", { complaints });
};
