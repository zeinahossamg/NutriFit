const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
app.use(express.urlencoded({ extended: true }));
const Order = require("./models/mydataschema");

app.set('view engine', 'ejs')
app.use(express.static( 'public'));

var methodOverride = require('method-override')
app.use(methodOverride('_method'))

const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
const connectLivereload = require("connect-livereload");

app.use(connectLivereload());
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});


app.get('/', (req, res) => {
res.render("signin-signup")
})



app.get('/homepage.html', (req, res) => {
    res.render('homepage');
});



app.get('/index.html', (req, res) => {
  Order.find()
  .then((result) =>{
    console.log("----------------------------");
console.log(result);
    res.render('index', {arr : result});
  }).catch((err) =>{
console.log(err);

  })
   
});

app.post('/index.html', (req, res) => {
  console.log(req.body);
  const order = new Order(req.body);
  order.save()
  .then(()=>{
    res.redirect('/index.html')

  }).catch((err)=>{

console.log(err);
  })

  });

app.get('/admin/user.ejs', (req, res) => {
    res.render('admin/user');
});
app.get('/admin/plan.ejs', (req, res) => {
  res.render('admin/plan');
});
app.get('/admin/signout.ejs', (req, res) => {
  res.render('admin/signout');
});
app.get('/signin-signup.ejs', (req, res) => {
  res.render("signin-signup")
  })



  //Delete Request
  app.delete("/index.html", (req, res) => {
    
    console.log(req.body)
    
  }); 


mongoose.connect("mongodb+srv://ismailtaha:dkZwhZAWs7qc5e6A@cluster0.833yijf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
   })
   .catch((err) => {
     console.log(err);
   });