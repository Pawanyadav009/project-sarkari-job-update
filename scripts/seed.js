const mongoose = require("mongoose");
const Job = require("../model/jobModal");

const MONGO_URL = "mongodb://127.0.0.1:27017/dhelu";

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function maybe(value, probability = 0.7) {
  return Math.random() < probability ? value : undefined;
}

function datePlusDays(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(0, 0, 0, 0);
  return d;
}

function buildExamStages() {
  const count = Math.random() < 0.4 ? 1 : 2;
  return Array.from({ length: count }).map((_, idx) => ({
    name: maybe(idx === 0 ? "Stage-1" : "Stage-2", 0.9),
    examDate: maybe(datePlusDays(10 + idx * 7), 0.8),
    admitCardDate: maybe(datePlusDays(5 + idx * 7), 0.8),
    answerKeyLink: maybe("https://example.com/answer-key", 0.4),
    resultLink: maybe("https://example.com/result", 0.4),
    noticePDF: maybe("https://example.com/notice.pdf", 0.5),
    negativeMarking: maybe(pick(["true", "false"]), 0.7),
    negativeMarkingvalue: maybe(String(pick([0.25, 0.33, 1, 2, 3])), 0.6),
  }));
}

function buildPaperPattern() {
  const subjects = ["General Knowledge", "English", "Hindi", "Maths", "Reasoning"];
  const count = pick([3, 4, 5]);
  return subjects.slice(0, count).map((s) => ({
    subject: s,
    questions: pick([20, 25, 30, 50]),
    marks: pick([20, 25, 50, 100]),
    duration: String(pick([20, 30, 45, 60])),
  }));
}

function buildZoneVacancies() {
  if (Math.random() < 0.35) return [];
  const zones = ["Haryana", "Punjab", "Delhi", "Rajasthan", "Bihar", "Chandigarh"];
  const count = pick([2, 3, 4]);
  return Array.from({ length: count }).map(() => ({
    zone: pick(zones),
    general: pick([10, 20, 30, 40]),
    ews: pick([5, 10, 15]),
    obc: pick([10, 20, 30]),
    sc: pick([5, 10, 15]),
    st: pick([0, 5, 10]),
  }));
}

function buildImportantLinks() {
  return {
    applyOnline: maybe("https://example.com/apply", 0.6),
    officialWebsite: maybe("https://example.com", 0.8),
    notificationPDF: maybe("https://example.com/notification.pdf", 0.6),
    answerKeyLink: maybe("https://example.com/answer-key", 0.3),
  };
}

function buildJob(i) {
  const categories = ["latest_job", "admit_card", "result", "answer_key", "offline_form"];
  const jobTypes = ["central", "state"];
  const applyModes = ["online", "offline"];
  const locations = ["haryana", "punjab", "delhi", "rajasthan", "bihar", "uttar_pradesh", "gujarat"];

  const baseTitle = pick([
    "Indian Air Force",
    "SSC",
    "Railway",
    "Police",
    "Bank",
    "UPSC",
    "HSSC",
    "DSSSB",
  ]);

  const postName = pick(["Group C", "Group D", "Clerk", "Constable", "Technician", "Officer", "Assistant"]);

  const jobLocation = Array.from(
    new Set(Array.from({ length: pick([1, 2, 3]) }).map(() => pick(locations)))
  );

  return {
    title: `${baseTitle} ${postName} Recruitment ${2026} #${i + 1}`,
    category: maybe(pick(categories), 0.9),
    jobType: maybe(pick(jobTypes), 0.9),
    applyMode: maybe(pick(applyModes), 0.9),
    jobLocation: maybe(jobLocation, 0.85),
    salary: maybe(String(pick([18000, 21700, 25000, 32000, 45000])), 0.8),

    importantDates: maybe(
      {
        startDate: maybe(datePlusDays(-2), 0.9),
        lastDate: maybe(datePlusDays(12), 0.9),
        correctionDate: maybe(datePlusDays(15), 0.4),
        examCityDate: maybe(datePlusDays(18), 0.4),
        admitCardDate: maybe(datePlusDays(22), 0.6),
        examDate: maybe(datePlusDays(30), 0.7),
        resultDate: maybe(datePlusDays(60), 0.35),
      },
      0.85
    ),

    applicationFee: maybe(
      {
        general: maybe(pick([0, 100, 200, 500]), 0.9),
        obc: maybe(pick([0, 100, 200, 500]), 0.8),
        sc: maybe(pick([0, 50, 100, 200]), 0.8),
        ews: maybe(pick([0, 100, 200, 500]), 0.7),
        female: maybe(pick([0, 50, 100, 200]), 0.7),
        refund: maybe(
          {
            general: maybe(pick([0, 100, 200]), 0.6),
            obc: maybe(pick([0, 100, 200]), 0.5),
            ews: maybe(pick([0, 100, 200]), 0.5),
            sc: maybe(pick([0, 50, 100]), 0.5),
            st: maybe(pick([0, 50, 100]), 0.3),
          },
          0.4
        ),
      },
      0.8
    ),

    ageLimit: maybe(
      {
        min: maybe(pick([18, 20, 21, 22, 25]), 0.9),
        max: maybe(pick([27, 30, 35, 40]), 0.9),
        asOnDate: maybe(datePlusDays(12), 0.7),
        relaxation: maybe("As per rules", 0.6),
      },
      0.75
    ),

    posts: maybe(
      {
        qualification: maybe(pick(["10th", "12th", "Graduate", "Diploma", "ITI"]), 0.9),
        postName: maybe(postName, 0.95),
        totalVacancy: maybe(pick([50, 120, 234, 379, 999]), 0.9),
      },
      0.9
    ),

    zoneVacancies: maybe(buildZoneVacancies(), 0.65),
    selectionProcess: maybe(
      pick([
        ["Written Exam", "Document Verification"],
        ["Written Exam", "Physical", "Medical"],
        ["CBT", "Skill Test", "DV"],
      ]),
      0.8
    ),

    examStages: maybe(buildExamStages(), 0.75),
    paperPattern: maybe(buildPaperPattern(), 0.7),
    importantLinks: maybe(buildImportantLinks(), 0.9),
  };
}

async function main() {
  const countArg = Number(process.argv[2]);
  const count = Number.isFinite(countArg) && countArg > 0 ? countArg : 30;

  await mongoose.connect(MONGO_URL);
  await Job.insertMany(Array.from({ length: count }).map((_, i) => buildJob(i)));
  const total = await Job.countDocuments();

  console.log(`Inserted ${count} jobs. Total jobs in DB: ${total}`);
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

