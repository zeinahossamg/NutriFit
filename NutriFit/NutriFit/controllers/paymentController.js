const Mydata = require('../models/Mydata');





exports.getPaymentBilling = (req, res) => {
    res.render('payment&Billing');
  };



exports.createData = (req, res) => {
  const mydata = new Mydata(req.body);
  mydata.save()
    .then(() => {
      res.redirect('/homepage');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Internal Server Error');
    });
};


