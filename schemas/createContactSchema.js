const Joi = require("joi");

const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "org", "co", "uk"] },
    })
    .required(),
  phone: Joi.string().required(),
});

module.exports = createContactSchema;
