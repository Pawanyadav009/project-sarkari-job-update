const Joi = require("joi");

const optionalText = Joi.string().trim().allow("");
const optionalDate = Joi.date().allow(null, "");
const optionalNonNegativeNumber = Joi.number().min(0).allow(null, "");

const jobValidationSchema = Joi.object({
  Job: Joi.object({
    title: Joi.string().trim().min(3).required(),
    category: Joi.string().trim().required(),
    jobType: optionalText,
    applyMode: optionalText,
    jobLocation: Joi.alternatives().try(
      optionalText,
      Joi.array().items(optionalText)
    ),
    salary: optionalText,
    importantDates: Joi.object({
      startDate: optionalDate,
      lastDate: optionalDate,
      correctionDate: optionalDate,
      examCityDate: optionalDate,
      admitCardDate: optionalDate,
      examDate: optionalDate,
      resultDate: optionalDate
    }).unknown(false),
    applicationFee: Joi.object({
      general: optionalNonNegativeNumber,
      obc: optionalNonNegativeNumber,
      sc: optionalNonNegativeNumber,
      st: optionalNonNegativeNumber,
      ews: optionalNonNegativeNumber,
      female: optionalNonNegativeNumber,
      refund: Joi.object({
        general: optionalNonNegativeNumber,
        obc: optionalNonNegativeNumber,
        ews: optionalNonNegativeNumber,
        sc: optionalNonNegativeNumber,
        st: optionalNonNegativeNumber
      }).unknown(false)
    }).unknown(false),
    ageLimit: Joi.object({
      min: optionalNonNegativeNumber,
      max: optionalNonNegativeNumber,
      asOnDate: optionalDate,
      relaxation: optionalText
    }).unknown(false),
    posts: Joi.object({
      qualification: optionalText,
      postName: optionalText,
      totalVacancy: optionalNonNegativeNumber
    }).unknown(false),
    zoneVacancies: Joi.array().items(
      Joi.object({
        zone: optionalText,
        general: optionalNonNegativeNumber,
        ews: optionalNonNegativeNumber,
        obc: optionalNonNegativeNumber,
        sc: optionalNonNegativeNumber,
        st: optionalNonNegativeNumber
      }).unknown(false)
    ),
    selectionProcess: Joi.array().items(optionalText),
    examStages: Joi.array().items(
      Joi.object({
        negativeMarking: optionalText,
        negativeMarkingvalue: optionalText,
        name: optionalText,
        examDate: optionalDate,
        admitCardDate: optionalDate,
        answerKeyLink: optionalText,
        resultLink: optionalText,
        noticePDF: optionalText
      }).unknown(false)
    ),
    paperPattern: Joi.array().items(
      Joi.object({
        subject: optionalText,
        questions: optionalNonNegativeNumber,
        marks: optionalNonNegativeNumber,
        duration: optionalText
      }).unknown(false)
    ),
    importantLinks: Joi.object({
      applyOnline: optionalText,
      officialWebsite: optionalText,
      notificationPDF: optionalText,
      answerKeyLink: optionalText
    }).unknown(false)
  }).required()
});

const adminLoginValidationSchema = Joi.object({
  username: Joi.string().trim().min(3).required(),
  password: Joi.string().min(4).required()
});

module.exports = {
  jobValidationSchema,
  adminLoginValidationSchema
};
