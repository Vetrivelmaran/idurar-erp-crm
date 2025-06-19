const mongoose = require('mongoose');
const Model = mongoose.model('Query');

const addNote = async (req, res) => {
  const id = req.params.id;
  const { text } = req.body;

  if (!text)
    return res.status(400).json({
      success: false,
      result: null,
      message: 'Note text is required',
    });

  const query = await Model.findById(id);
  if (!query)
    return res.status(404).json({
      success: false,
      result: null,
      message: 'Query not found',
    });

  query.notes.push({ text });
  await query.save();

  return res.status(200).json({
    success: true,
    result: query,
    message: 'Note added successfully',
  });
};

module.exports = addNote;
