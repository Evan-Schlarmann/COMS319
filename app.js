//Imports
const config = require('./config')
const { json } = require('express');
const express = require('express');
const mongoose = require('mongoose')
const Donation = require('./models/donation');

// express app
const app = express();



// register view engine
app.set('view engine', 'ejs');
// app.set('views', 'myviews');

//Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//EDIT CONNECTION STRING
const dbURI = config.dbLink;

mongoose.connect(dbURI).then((result) => {
  console.log("connected to db..")
  // listen for requests
  app.listen(3000);
}).catch((err) => console.log(err))

//Routing
app.get('/', (req, res) => {
  res.redirect('/donations')
});

app.get('/donations/', (req, res) => {
  Donation.find().sort({createdAt: -1}).then((result) => {
    res.render('./donations/list', { title: 'Donations', donations: result})
  }).catch((err) => {
    console.log(err)
  })
});

app.get('/about', (req, res) => {
  res.render('./about', { title: 'About' });
});

app.get('/donations/create', (req, res) => {
  res.render('./donations/create', { title: 'Donations' });
});

app.post('/donations', (req,res) => {
    const donation = new Donation({
      name:req.body.name,
      email:req.body.email,
      charity:req.body.charity,
      amount:req.body.amount,
    }).save().then((result) => {

      console.log(result)
      res.redirect('/donations')

    }).catch((err) => {
      console.log(err)
    })
})

app.post('/add_donation', (req,res) => {

  if(req.body){
    const donation = new Donation({
      name:req.body.name,
      email:req.body.email,
      charity:req.body.charity,
      amount:req.body.amount,
    }).save().then((result) => {
      res.json(result)
    }).catch((err) => {
      console.log(err)
    })
  }
  else{
    console.log("Form data not attached to req.body!")
    res.json({"err": "Form data not attached to req.body!"})
  }
  
})

app.delete('/donations/:id', (req, res) => {
  const did = req.params.id
  Donation.findByIdAndDelete(did).then((result) => {
    //Cannot redirect when AJAX requests are made.
    //Instead return a response object to the requesting script
    res.json({redirect: "/donations"})
  }).catch((err) => {
    console.log(err)
  })

});

app.get('/donations/:did', (req, res) => {
  const did = req.params.did
  Donation.findById(did).then((result) => {
    res.render('./donations/details', {title: 'Donation', donation:result })
  }).catch((err) => {
    console.log(err)
    res.status(404).render('404', {title:'404'})
  })
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});