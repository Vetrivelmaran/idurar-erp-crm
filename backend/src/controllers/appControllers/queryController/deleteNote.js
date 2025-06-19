const mongoose = require('mongoose');
const Model = mongoose.model('Query');

const deleteNote = async (req, res) => {
  const { id, noteId } = req.params;

  const query = await Model.findById(id);
  if (!query)
    return res.status(404).json({
      success: false,
      result: null,
      message: 'Query not found',
    });

  query.notes = query.notes.filter((note) => note._id.toString() !== noteId);
  await query.save();

  return res.status(200).json({
    success: true,
    result: query,
    message: 'Note deleted successfully',
  });
};

module.exports = deleteNote;
