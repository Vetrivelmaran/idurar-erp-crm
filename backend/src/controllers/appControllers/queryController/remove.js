const mongoose = require('mongoose');
const Model = mongoose.model('Query');

const remove = async (req, res) => {
  const id = req.params.id;

  const result = await Model.findOneAndUpdate(
    { _id: id },
    { removed: true },
    { new: true }
  );

  if (!result)
    return res.status(404).json({
      success: false,
      result: null,
      message: 'Query not found or already removed',
    });

  return res.status(200).json({
    success: true,
    result,
    message: 'Query removed successfully',
  });
};

module.exports = remove;
