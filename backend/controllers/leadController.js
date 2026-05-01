const pool = require('../db');

// Add a new lead
exports.addLead = async (req, res) => {
    try {
        const { name, phone, source } = req.body;
        
        const trimmedName = typeof name === 'string' ? name.trim() : '';
        if (!trimmedName) {
            return res.status(400).json({ error: 'Name must not be empty or contain only spaces.' });
        }
        
        const nameRegex = /^[a-zA-Z\s]+$/;
        if (!nameRegex.test(trimmedName)) {
            return res.status(400).json({ error: 'Name must contain only letters and spaces.' });
        }
        
        if (!phone) {
            return res.status(400).json({ error: 'Phone must not be empty.' });
        }
        
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({ error: 'Phone must contain exactly 10 digits.' });
        }

        const validSources = ['Call', 'WhatsApp', 'Field'];
        if (source && !validSources.includes(source)) {
            return res.status(400).json({ error: 'Invalid source' });
        }

        const newLead = await pool.query(
            'INSERT INTO leads (name, phone, source) VALUES ($1, $2, $3) RETURNING *',
            [trimmedName, phone, source]
        );

        res.status(201).json(newLead.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get all leads (with optional search filter)
exports.getLeads = async (req, res) => {
    try {
        const { search } = req.query;
        let query = 'SELECT * FROM leads ORDER BY created_at DESC';
        let values = [];

        if (search) {
            query = 'SELECT * FROM leads WHERE name ILIKE $1 OR phone ILIKE $1 ORDER BY created_at DESC';
            values = [`%${search}%`];
        }

        const leads = await pool.query(query, values);
        res.json(leads.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Update lead status
exports.updateLeadStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatuses = ['Interested', 'Not Interested', 'Converted'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const updateLead = await pool.query(
            'UPDATE leads SET status = $1 WHERE id = $2 RETURNING *',
            [status, id]
        );

        if (updateLead.rows.length === 0) {
            return res.status(404).json({ error: 'Lead not found' });
        }

        res.json(updateLead.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Delete a lead
exports.deleteLead = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteLead = await pool.query(
            'DELETE FROM leads WHERE id = $1 RETURNING *',
            [id]
        );

        if (deleteLead.rows.length === 0) {
            return res.status(404).json({ error: 'Lead not found' });
        }

        res.json({ message: 'Lead deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
