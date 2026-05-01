const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');

router.post('/', leadController.addLead);
router.get('/', leadController.getLeads);
router.put('/:id', leadController.updateLeadStatus);
router.delete('/:id', leadController.deleteLead);

module.exports = router;
