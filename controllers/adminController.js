// controllers/adminController.js
const Order = require("../models/mydataschema");
const User = require("../models/users")
exports.renderUser = async (req, res) => {

  const UsersArray = await User.find({});

    res.render("admin/user", { arr: UsersArray , success : req.session.success , message : req.session.message  });
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
  



  exports.renderAddUsers = async (req, res) => {
    const UsersArray = await User.find({});
    
    res.render('admin/Users-Crud/AddUsers', { arr: UsersArray , success : req.session.success , message : req.session.message  });
  };


  exports.renderEditUsers = async (req, res) => {
    const UsersArray = await User.find({});
    
    res.render('admin/Users-Crud/EditUsers', { arr: UsersArray , success : req.session.success , message : req.session.message  });
  };


  exports.renderDeleteUsers = async (req, res) => {
    const UsersArray = await User.find({});
    
    res.render('admin/Users-Crud/DeleteUsers', { arr: UsersArray , success : req.session.success , message : req.session.message  });
  };



  exports.renderAddPlans = async (req, res) => {
    const UsersArray = await User.find({});
    
    res.render('admin/Plan-Crud/AddPlans', { arr: UsersArray , success : req.session.success , message : req.session.message  });
  };

  exports.renderEditPlans = async (req, res) => {
    const UsersArray = await User.find({});
    
    res.render('admin/Plan-Crud/EditPlans', { arr: UsersArray , success : req.session.success , message : req.session.message  });
  };
  exports.renderDeletePlans = async (req, res) => {
    const UsersArray = await User.find({});
    
    res.render('admin/Plan-Crud/DeletePlans', { arr: UsersArray , success : req.session.success , message : req.session.message  });
  };




  exports.getIndexUser = async (req, res) => {
    try {
      const UsersArray = await User.find({});
      console.log("rerenderedUsers");
      
      res.render("admin/user", { arr: UsersArray , success : req.session.success , message : req.session.message  });
    } catch (err) {
      console.error("Error fetching orders:", err);
      res.status(500).send("Internal Server Error");
    }
  };



  exports.createUser = async (req, res) => {
    const { username, password, email,role  } = req.body;
   console.log(username);
    try {
      // Validate input fields
      if (!username || !password || !email ) {
        console.error('Invalid input data for adding user');
        req.session.message = 'Invalid input data for adding user';
        req.session.success = false;
        return res.status(400).redirect("AddUsers");
      }
  
      // Check if the username or email already exists
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        console.error('Username or email already exists');
        req.session.message = 'Username or email already exists';
        req.session.success = false;
        return res.status(400).redirect("AddUsers");
      }
  
      // Hash the password before saving
      //const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user instance
      const user = new User({ username: username, password: password, email: email, role:role });
      await user.save();
      console.log('User created successfully');
  
      // Set success message
      req.session.message = "User created successfully";
      req.session.success = true;
  
      // Redirect after successful creation
      res.status(302).redirect("user.ejs");
  
    } catch (err) {
      console.error('Error creating user:', err);
      req.session.message = 'Internal Server Error';
      req.session.success = false;
  
      // Redirect to index.html with error status
      res.status(500).send('Internal Server Error');
    }
  };



  exports.deleteUser = async (req, res) => {
    const userId = parseInt(req.body.id, 10) - 1;

    console.log(userId, "backend");
    try {
        const UsersArray = await User.find({});

        if (isNaN(userId) || userId < 0 || userId >= UsersArray.length) {
            console.error('Invalid user ID for deleting user');
            req.session.message = 'Invalid user ID for deleting user';
            req.session.success = false;
            return res.status(400).redirect('DeleteUsers');
        } else{
          const exactuserId = UsersArray[userId]._id;
          await User.deleteOne({ _id: exactuserId });
          console.log(`User deleted successfully ${exactuserId}`);
  
          req.session.message = 'User deleted successfully';
          req.session.success = true;
          res.status(302).redirect('admin/user.ejs');

        }

       

    } catch (err) {
        console.error('Error deleting user:', err);
        req.session.message = 'Internal Server Error';
        req.session.success = false;
        res.status(500).send('Internal Server Error');
    }
};








  exports.editUser = async (req, res) => {
    const userId = parseInt(req.body.UserIdedit, 10) - 1;
    const {  password, email, role } = req.body;

console.log(req.body);
    console.log(userId,password,role,email,"backend");
    try {


      const UsersArray = await User.find({});
      

        if (!userId || !password || !email || !role) {
            console.error('Invalid input data for editing user');
            req.session.message = 'Invalid input data for editing user';
            req.session.success = false;
            return res.status(400).redirect(`EditUsers`);
        } else{

          const exactuserId = UsersArray[userId]._id;
        
          await User.updateOne({ _id: exactuserId }, { password: password ,email: email,role: role });
          console.log(`User edited successfully ${exactuserId}`);
  
          req.session.message = "User edited successfully";
          req.session.success = true;
          res.status(302).redirect("admin/user.ejs");
        }

        
       

    } catch (err) {
        console.error('Error editing user:', err);
        req.session.message = 'Internal Server Error';
        req.session.success = false;
        res.status(500).send('Internal Server Error');
    }
};