const express = require('express');
const campaignController = require('../controllers/campaignController');
const router = express.Router();

router.post('/create', campaignController.createCampaign); // Create
router.get('/', campaignController.getAllCampaigns); // Read All
router.get('/:id', campaignController.getCampaignById); // Read One
router.put('/edit/:id', campaignController.updateCampaign); // Update
router.delete('/delete/:id', campaignController.deleteCampaign); // Delete


module.exports = router;
