//---------requirements-------------------
const express = require('express')
const mongoose = require('mongoose');
const path = require('path')
const app = express();
const Job = require('./model/jobModal');
const { addListener } = require('process');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate')
//---------requirements-end---------------

// ---------------------------------------

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'/views'))
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.engine('ejs',ejsMate)
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
    }
// --------routes-------------------------
// middle ware
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


//======admin routes========

//show home route------

app.get('/admin',(req,res)=>{
    res.render('admin/adminhome.ejs')
})
app.get('/admin/add',(req,res)=>{
    res.render('admin/newpost.ejs')
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




app.post('/admin',async (req,res)=>{
    
    let newpost = new Job(req.body.Job)
    await newpost.save()
    // console.log(newpost)
    res.redirect('/admin')

})

app.put('/admin/:id', async (req, res) => {
  const { id } = req.params;
  await Job.findByIdAndUpdate(id, req.body.Job, { runValidators: true });
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
  res.redirect('/admin/show')
})


// ------setting-up-port------------------
const port = 5406;
app.listen(port,()=>{
    console.log(`server is running at http://localhost:${port}`)
})