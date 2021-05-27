const db = require('../../models');

const Notes = db.notes;

exports.getNotes = async (req, res) => {
    try {
        const notes = await Notes.findAll();

        res.status(200).json(notes);
    } catch (err) {
        res.status(500).end('Internal Server Error');
    }
};