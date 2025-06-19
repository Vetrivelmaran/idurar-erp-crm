const mongoose = require('mongoose');
const Model = mongoose.model('Query');

const read = async (req, res) => {
  const id = req.params.id;
  const result = await Model.findOne({ _id: id, removed: false }).exec();

  if (!result)
    return res.status(404).json({
      success: false,
      result: null,
      message: 'Query not found',
    });

  return res.status(200).json({
    success: true,
    result,
    message: 'Query fetched successfully',
  });
};

module.exports = read;
