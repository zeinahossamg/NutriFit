const users = require("../models/users");

const signUp = async (req, res) => {
    try{
      const user = new users(req.body);
      await user.save();
      res.status(201).json({
        status: "success",
        message: "User added"
      })
    
    }catch(err){
        console.log(err.message);
      res.status(400).json({
        status: "fail",
        message: err.message
      })
    
    }
    
}

module.exports ={signUp}

