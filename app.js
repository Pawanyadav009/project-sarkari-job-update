//---------requirements-------------------
const express = require('express')
const mongoose = require('mongoose');
const path = require('path')
const app = express();
const Job = require('./model/jobModal');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate')
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const Admin = require('./model/adminModel');
const {
  jobValidationSchema,
  adminLoginValidationSchema
} = require('./utils/validationSchema');
//---------requirements-end---------------

// ---------------------------------------

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'/views'))
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.engine('ejs',ejsMate)

const sessionConfig = {
  secret: process.env.SESSION_SECRET || 'sarkari-job-admin-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24
  }
};

app.use(session(sessionConfig));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(Admin.authenticate()));
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());
// ---------------------------------------
// ------mongodb setup--------------------
    const mongo_url = "mongodb://127.0.0.1:27017/dhelu"
    main().then(()=>{
        console.log('sucessfully connected')
    })
    .catch((err)=>{
        console.log(err)
    })
    async function main(){
        await mongoose.connect(mongo_url)
        await seedDefaultAdmin();
    }
// --------routes-------------------------
// middle ware
async function seedDefaultAdmin() {
  const existingAdmin = await Admin.findOne({});

  if (existingAdmin) return;

  const defaultAdmin = new Admin({ username: process.env.ADMIN_USERNAME || 'admin' });
  const defaultPassword = process.env.ADMIN_PASSWORD || 'admin123';

  await Admin.register(defaultAdmin, defaultPassword);
  console.log(`Default admin created. Username: ${defaultAdmin.username} Password: ${defaultPassword}`);
}

function removeEmpty(value) {
  if (Array.isArray(value)) {
    return value
      .map(removeEmpty)
      .filter(v => v !== undefined && v !== null && v !== "");
  }
  if (value && typeof value === "object") {
    Object.keys(value).forEach(key => {
      value[key] = removeEmpty(value[key]);

      // empty object / empty value delete
      if (
        value[key] === "" ||
        value[key] === null ||
        value[key] === undefined ||
        (typeof value[key] === "object" && Object.keys(value[key]).length === 0)
      ) {
        delete value[key];
      }
    });
    return value;
  }
  return value === "" ? undefined : value;
}

// Apply middleware ---------------------

app.use((req, res, next) => {
  if (req.body) {
    req.body = removeEmpty(req.body);
  }
  next();
});

app.use((req, res, next) => {
  res.locals.currentAdmin = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

function isAdminLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();

  req.session.returnTo = req.originalUrl;
  req.flash('error', 'Please login first to access admin panel.');
  return res.redirect('/admin/login');
}

function validateAdminLogin(req, res, next) {
  const { error } = adminLoginValidationSchema.validate(req.body, { abortEarly: false });

  if (!error) return next();

  const errorMessage = error.details.map(detail => detail.message).join(', ');
  return res.status(422).render('admin/adminLogin.ejs', {
    formData: req.body,
    errorMessage
  });
}

function validateJob(req, res, next) {
  const { error } = jobValidationSchema.validate(req.body, { abortEarly: false });

  if (!error) return next();

  const errorMessage = error.details.map(detail => detail.message).join(', ');
  req.flash('error', errorMessage);

  if (req.method === 'POST') {
    return res.status(422).render('admin/newpost.ejs', {
      formData: req.body.Job || {}
    });
  }

  return res.status(422).render('admin/updatePost.ejs', {
    data: { ...(req.body.Job || {}), _id: req.params.id }
  });
}

// --------------------------------------
// home route

app.get('/',async(req,res)=>{
  allposts = await Job.find({})
    res.render('users/Home.ejs',{allposts})
})

app.get('/jobs/:id',async(req,res)=>{
  const {id} = req.params;
  const postData = await Job.findById(id)
  console.log(postData)
  res.render("users/showPost.ejs",{postData})
})

// ================== Full Details (Category Filter) ==================
app.get(['/full-details', '/full-details/:key'], async (req, res) => {
  const allposts = await Job.find({});
  const selectedKey = String(req.params.key || 'latest').toLowerCase();
  res.render('users/fullDetails.ejs', { allposts, selectedKey });
});

// Short aliases (optional but convenient)
app.get('/latest', (req, res) => res.redirect('/full-details/latest'));
app.get('/result', (req, res) => res.redirect('/full-details/result'));
app.get('/admit', (req, res) => res.redirect('/full-details/admit'));
app.get('/answer', (req, res) => res.redirect('/full-details/answer'));
app.get('/offline', (req, res) => res.redirect('/full-details/offline'));
app.get('/other', (req, res) => res.redirect('/full-details/other'));

app.get('/admin/login', (req, res) => {
  if (req.isAuthenticated()) return res.redirect('/admin');

  res.render('admin/adminLogin.ejs', {
    formData: {}
  });
});

app.post('/admin/login', validateAdminLogin, (req, res, next) => {
  passport.authenticate('local', (err, admin, info) => {
    if (err) return next(err);

    if (!admin) {
      return res.status(401).render('admin/adminLogin.ejs', {
        formData: req.body,
        errorMessage: info?.message || 'Invalid username or password.'
      });
    }

    req.logIn(admin, (loginErr) => {
      if (loginErr) return next(loginErr);

      const redirectUrl = req.session.returnTo || '/admin';
      delete req.session.returnTo;
      req.flash('success', 'Admin login successful.');
      return res.redirect(redirectUrl);
    });
  })(req, res, next);
});

app.post('/admin/logout', isAdminLoggedIn, (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    req.flash('success', 'Logged out successfully.');
    res.redirect('/admin/login');
  });
});

app.use('/admin', isAdminLoggedIn);

//======admin routes========

//show home route------

app.get('/admin', async (req, res) => {
    const allposts = await Job.find({});
    const today = new Date();
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    const totalJobs = allposts.length;
    const jobsThisWeek = allposts.filter(post => post.createdAt && new Date(post.createdAt) >= weekAgo).length;
    const totalVacancies = allposts.reduce((sum, post) => sum + (Number(post?.posts?.totalVacancy) || 0), 0);
    const activeListings = allposts.filter(post => {
      const lastDate = post?.importantDates?.lastDate;
      return !lastDate || new Date(lastDate) >= today;
    }).length;

    res.render('admin/adminhome.ejs', {
      dashboardStats: {
        totalJobs,
        jobsThisWeek,
        totalVacancies,
        activeListings
      }
    });
})
app.get('/admin/add',(req,res)=>{
    res.render('admin/newpost.ejs', { formData: {} })
})



// app.get('/admin/edit/:id',async(req,res)=>{
//   const {id} = req.params;
//   const data = await Job.findById(id);
//   res.render('admin/updatePost.ejs',{data})
// })

app.get('/admin/edit/:id',async(req,res)=>{
  const {id} = req.params;
  const data = await Job.findById(id);
  res.render('admin/updatePost.ejs',{data})
})




app.post('/admin', validateJob, async (req,res)=>{
    
    let newpost = new Job(req.body.Job)
    await newpost.save()
    req.flash('success', 'Job created successfully.');
    res.redirect('/admin')

})

app.put('/admin/:id', validateJob, async (req, res) => {
  const { id } = req.params;
  await Job.findByIdAndUpdate(id, req.body.Job, { runValidators: true });
  req.flash('success', 'Job updated successfully.');
  res.redirect('/admin/show');
});

app.get('/admin/show',async(req,res)=>{
    allposts = await Job.find({})
    // console.log(allposts)
    res.render('admin/show.ejs', {allposts})
})
app.delete('/admin/delete/:id',async(req,res)=>{
  const {id} = req.params;
  await Job.findByIdAndDelete(id);
  req.flash('success', 'Job deleted successfully.');
  res.redirect('/admin/show')
})


// ------setting-up-port------------------
const port = 5406;
app.listen(port,()=>{
    console.log(`server is running at http://localhost:${port}`)
})