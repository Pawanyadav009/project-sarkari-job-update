// const mongoose = require("mongoose");

// /* ================= SUB SCHEMAS ================= */

// const postSchema = new mongoose.Schema({
//   postName: String,                        
//   qualification: String,                   
//   totalVacancy: Number,                     
// }, { _id: false });


// /* ================= MAIN JOB SCHEMA ================= */

// const jobSchema = new mongoose.Schema({

//   /* BASIC INFO */
//   title: { type: String, required: true },
//   slug: { type: String },       //url mein naam
//   // organization: String,
//   // advtNo: String,

//   category: String,             // Latest Job / Admit Card / Result
//   jobType: String,              // Central / State
//   jobBasis: String,             // Permanent / Contract
//   applyMode: String,            // Online / Offline

//   jobLocation: [],        // State / Zone / All India
//   salary: String,               //salery in rupees

//   /* IMPORTANT DATES */
//   importantDates: {
//     startDate: Date,          
//     lastDate: Date,
//     correctionDate: Date,
//     examCityDate: Date,
//     admitCardDate: Date,
//     examDate : Date,
//     resultDate: Date
//   },

//   /* FEES + REFUND */
//   applicationFee: {
//     general: Number,
//     obc:    Number,
//     ews:    Number  , 
//     sc:     Number ,
//     female: Number,

//     refund: {
//       general: Number,
//       obc: Number,
//       ews: Number,
//       sc: Number,
//       st: Number
//     }
//   },

//   /* AGE LIMIT */
//   ageLimit: {
//     min: Number,
//     max: Number,
//     asOnDate: Date,
//     relaxation: String
//   },

//   /* POSTS & VACANCY */
//   posts: {
//   postName: String,                        
//   qualification: String,                   
//   totalVacancy: Number,                     
// },                 

//   /* ZONE WISE VACANCY (OPTIONAL) */
//   zoneVacancies:[{
//   zone: String,                                    
//     general: Number,
//     obc: Number,
//     ews: Number,
//     sc: Number,
//     st: Number
// }],            

//   selectionProcess: [],     // prosess multiple input filled add button



//   /* EXAM STAGES (CBT-1 to N) */
//   examStages: [{
//   name: String,                 // CBT-1, CBT-2, PET, DV etc
//   examDate: Date,               
//   admitCardDate: Date,              
//   answerKeyLink: String,        
//   resultLink: String,           
//   noticePDF: String,                  
//   negativeMarking: Boolean,    // true or false radio button or select
//   negativeMarkingvalue: String             // in numbers 
// }],   

//   paperPattern: [{
//   subject: String,                      
//   questions: Number,  
//   marks: Number,
//   duration: String
// }],                           // fully responsive exam stage add new stage for every stage

//   /* DYNAMIC UPDATES / NOTICES */
//   updates:[{
//   title: String,
//   type: String,                 // Notice / Admit Card / Answer Key / Result
//   date: Date,
//   link: String
// }],                            // fully responsive update filled for every stage of post new update with new add button

//   /* IMPORTANT LINKS */
//   importantLinks: {
//     applyOnline: String,
//     officialWebsite: String,
//     notificationPDF: String,
//     examCityLink: String,
//     downloadAdmitCard: String,
//     answerKeyLink: String,
//     resultLink: String,
//     howToApply: String
//   },

//   /* META */
//   status: {
//     type: String,
//     default: "active"            // active / expired / draft     //help in update and delete
//   },

//   createdAt: {
//     type: Date,
//     default: Date.now          //creation date for every post
//   }

// });
//  const Job = mongoose.model("Job", jobSchema);
//  module.exports = Job;

// ==========================================================


const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: String,
  jobType: String,
  applyMode: String,
  jobLocation: [String], 
  salary: String,

  importantDates: {
    startDate: Date,
    lastDate: Date,
    correctionDate: Date,
    examCityDate: Date,
    admitCardDate: Date,
    examDate: Date,
    resultDate: Date
  },

  applicationFee: {
    general: Number,
    obc: Number,
    sc: Number,
    ews: Number,
    female: Number,
    refund: {
      general: Number,
      obc: Number,
      ews: Number,
      sc: Number,
      st: Number
    }
  },

  ageLimit: {
    min: Number,
    max: Number,
    asOnDate: Date,
    relaxation: String
  },
  posts: {
    qualification: String,
    postName: String,
    totalVacancy: Number
  },

  zoneVacancies: [{
    zone: String,
    general: Number,
    ews: Number,
    obc: Number,
    sc: Number,
    st: Number
  }],

  selectionProcess: [String],

  examStages: [{
    negativeMarking: String, 
    negativeMarkingvalue: String,
    name: String,
    examDate: Date,
    admitCardDate: Date,
    answerKeyLink: String,
    resultLink: String,
    noticePDF: String
  }],

  paperPattern: [{
    subject: String,
    questions: Number,
    marks: Number,
    duration: String
  }],
  importantLinks: {
    applyOnline: String,
    officialWebsite: String,
    notificationPDF: String,
    answerKeyLink: String
  },

  createdAt: { type: Date, default: Date.now }
});

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
