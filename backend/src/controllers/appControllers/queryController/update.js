const mongoose = require('mongoose');
const Model = mongoose.model('Query');

const update = async (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  updates.updated = Date.now();

  const result = await Model.findOneAndUpdate({ _id: id }, updates, {
    new: true,
  });

  if (!result)
    return res.status(404).json({
      success: false,
      result: null,
      message: 'Query not found',
    });

  return res.status(200).json({
    success: true,
    result,
    message: 'Query updated successfully',
  });
};

module.exports = update;
