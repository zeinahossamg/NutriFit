// controllers/adminController.js
const Order = require("../models/mydataschema");
const User = require("../models/users")
const Plan = require("../models/plans")

exports.renderUser = async (req, res) => {

  const UsersArray = await User.find({});

    res.render("admin/user", { arr: UsersArray , success : req.session.success , message : req.session.message  });
  };
  
  exports.renderPlan = async (req, res) => {

    const PlansArray = await Plan.find({});
  
      res.render("admin/plan", { arr: PlansArray , success : req.session.success , message : req.session.message  });
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
    const PlansArray = await Plan.find({});
    
    res.render('admin/Plan-Crud/AddPlans', { arr: PlansArray , success : req.session.success , message : req.session.message  });
  };

  exports.renderEditPlans = async (req, res) => {
    const PlansArray = await Plan.find({});
    
    res.render('admin/Plan-Crud/EditPlans', { arr: PlansArray , success : req.session.success , message : req.session.message  });
  };
  exports.renderDeletePlans = async (req, res) => {
    const PlansArray = await Plan.find({});
    
    res.render('admin/Plan-Crud/DeletePlans', { arr: PlansArray , success : req.session.success , message : req.session.message  });
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
          res.status(302).redirect('user.ejs');

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
          res.status(302).redirect("user.ejs");
        }

        
       

    } catch (err) {
        console.error('Error editing user:', err);
        req.session.message = 'Internal Server Error';
        req.session.success = false;
        res.status(500).send('Internal Server Error');
    }
};



exports.createPlan = async (req, res) => {
  const { plan, duration, price } = req.body;
  console.log(plan,duration,price);

  try {
      // Validate input fields
      if (!plan || !duration || !price) {
          console.error('Invalid input data for adding plan');
          req.session.message = 'Invalid input data for adding plan';
          req.session.success = false;
          return res.status(400).redirect("AddPlans");  // Adjust the redirect URL as needed
      }

      // Check if the plan already exists
      const existingPlan = await Plan.findOne({ plan, duration });
      if (existingPlan) {
          console.error('Plan with the same name and duration already exists');
          req.session.message = 'Plan with the same name and duration already exists';
          req.session.success = false;
          return res.status(400).redirect("AddPlans");  // Adjust the redirect URL as needed
      }

      // Create a new plan instance
      const newPlan = new Plan({ plan, duration, price });
      await newPlan.save();
      console.log('Plan created successfully');

      // Set success message
      req.session.message = "Plan created successfully";
      req.session.success = true;

      // Redirect after successful creation
      res.status(302).redirect("plan.ejs");  // Adjust the redirect URL as needed

  } catch (err) {
      console.error('Error creating plan:', err);
      req.session.message = 'Internal Server Error';
      req.session.success = false;

      // Redirect to index.html with error status
      res.status(500).send('Internal Server Error');
  }
};

exports.editPlan = async (req, res) => {

  const id = parseInt(req.body.id, 10) - 1;

  const {  plan, duration, price } = req.body;

  const PlansArray = await Plan.find({});

  console.log(req.body);
console.log("in Edit backend",id, plan, duration, price);
  try {
      // Validate input fields
      if (!id || !plan || !duration || !price) {
          console.error('Invalid input data for editing plan');
          req.session.message = 'Invalid input data for editing plan';
          req.session.success = false;
          return res.status(400).redirect("EditPlans"); // Adjust this redirection based on your setup
      }

      // Validate duration format
      const validDurations = ['1-month', '3-months', '6-months'];
      if (!validDurations.includes(duration)) {
          console.error('Invalid duration format');
          req.session.message = 'Invalid duration format';
          req.session.success = false;
          return res.status(400).redirect("EditPlans"); // Adjust this redirection based on your setup
      }

      // Validate price
      if (isNaN(price) || price <= 0) {
          console.error('Invalid price');
          req.session.message = 'Invalid price';
          req.session.success = false;
          return res.status(400).redirect("EditPlans"); // Adjust this redirection based on your setup
      }

      // Update the plan
      
      //const updatedPlan = await Plan.findByIdAndUpdate(id, { plan, duration, price }, { new: true });
      const PlanId = PlansArray[id]._id;
      await Plan.updateOne({ _id: PlanId }, { plan, duration, price });

      

      // Set success message
      req.session.message = 'Plan updated successfully';
      req.session.success = true;
      res.status(200).redirect("plan.ejs"); // Redirect to the appropriate page

  } catch (err) {
      console.error('Error updating plan:', err);
      req.session.message = 'Internal Server Error';
      req.session.success = false;
      res.status(500).redirect("plan.ejs"); // Adjust this redirection based on your setup
  }
};


exports.deletePlan = async (req, res) => {
  const ID = parseInt(req.body.id, 10) - 1;
  console.log(req.body);
  console.log("in Delete backend", ID);

  try {
    const PlansArray = await Plan.find({});
    console.log("length", PlansArray.length);
    console.log("the id is back ",ID);
      // Validate input fields
      if (ID === "" || isNaN(ID) || ID < 0 || ID >= PlansArray.length) {
          console.error('Invalid input data for deleting plan');
          req.session.message = 'Invalid input data for deleting plan';
          req.session.success = false;
          return res.status(400).redirect("DeletePlans"); // Adjust this redirection based on your setup
      } else{

// Delete the plan

const PlanID = PlansArray[ID]._id;

await Plan.deleteOne({ _id: PlanID });


// Set success message
req.session.message = 'Plan deleted successfully';
req.session.success = true;
res.status(200).redirect("plan.ejs"); // Redirect to the appropriate page


      }

      
  } catch (err) {
      console.error('Error deleting plan:', err);
      req.session.message = 'Internal Server Error';
      req.session.success = false;
      return res.status(500).send('Internal Server Error');// Adjust this redirection based on your setup
  }
};