const Joi = require('joi');

module.exports = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow('', null),
  status: Joi.string().valid('open', 'in_progress', 'resolved', 'closed'),
  resolution: Joi.string().allow('', null),
});
