// controllers/adminController.js

exports.renderUser = (req, res) => {
    res.render("admin/user");
  };
  
  exports.renderPlan = (req, res) => {
    res.render("admin/plan");
  };
  
  exports.renderSignout = (req, res) => {
    res.render("admin/signout");
  };
  
  exports.renderSigninSignup = (req, res) => {
    res.render("signin-signup");
  };
  