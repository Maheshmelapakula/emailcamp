const Campaign = require('../models/Campaign');
const sendEmail = require('../utils/email');

// Create a new campaign and send emails
exports.createCampaign = async (req, res) => {
  const { name, subject, body, recipients } = req.body;

  try {
    // Save campaign to the database
    const campaign = new Campaign({ name, subject, body, recipients });
    await campaign.save();

    // Send emails to all recipients
    const emailPromises = recipients.map((recipient) =>
      sendEmail(recipient, subject, body)
    );
    await Promise.all(emailPromises);

    res.status(201).json({ message: 'Campaign created and emails sent successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all campaigns
exports.getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch campaigns' });
  }
};

// Get a single campaign by ID
exports.getCampaignById = async (req, res) => {
  const { id } = req.params;

  try {
    const campaign = await Campaign.findById(id);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    res.status(200).json(campaign);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch campaign' });
  }
};

// Update a campaign
exports.updateCampaign = async (req, res) => {
  const { id } = req.params;
  const { name, subject, body, recipients } = req.body;

  try {
    const campaign = await Campaign.findByIdAndUpdate(
      id,
      { name, subject, body, recipients },
      { new: true, runValidators: true }
    );
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    res.status(200).json({ message: 'Campaign updated successfully', campaign });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a campaign
exports.deleteCampaign = async (req, res) => {
  const { id } = req.params;

  try {
    const campaign = await Campaign.findByIdAndDelete(id);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    res.status(200).json({ message: 'Campaign deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete campaign' });
  }
};
