const Joi = require("joi");

const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "org", "co", "uk"] },
  }),
  phone: Joi.string(),
}).unknown(true);

module.exports = updateContactSchema;
