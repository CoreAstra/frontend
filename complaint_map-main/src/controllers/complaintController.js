// src/controllers/complaintController.js
const { sampleComplaints } = require('../utils/complaintData.js');

exports.getAllComplaints = async (req, res) => {
  try {
    const { category, status, state, city } = req.query;

    let complaints = [...sampleComplaints];

    // --- Apply Filters ---
    if (category && category !== 'all') {
      complaints = complaints.filter(c => c.category === category);
    }
    if (status && status !== 'all') {
      complaints = complaints.filter(c => c.status === status);
    }
    if (city && city !== 'all') {
      complaints = complaints.filter(c =>
        c.location?.address?.toLowerCase().includes(city.toLowerCase())
      );
    } else if (state && state !== 'all') {
      complaints = complaints.filter(c =>
        c.location?.address?.toLowerCase().includes(state.toLowerCase())
      );
    }

    // Sort by date (latest first)
    complaints.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Sanitize before sending
    const sanitizedComplaints = complaints.map(c => ({
      _id: c._id || new Date().getTime(),
      title: c.title,
      description: c.description,
      category: c.category,
      status: c.status,
      image: c.image,
      createdAt: c.createdAt,
      user: c.user || { fullName: 'Sample User' },
      location: c.location?.coordinates ? c.location : null,
    }));

    res.status(200).json({
      status: 'success',
      results: sanitizedComplaints.length,
      data: { complaints: sanitizedComplaints },
    });
  } catch (err) {
    console.error('❌ Error processing sample complaints:', err.message);
    res.status(500).json({
      status: 'fail',
      message: 'Unable to fetch complaints. Please try again later.',
    });
  }
};
