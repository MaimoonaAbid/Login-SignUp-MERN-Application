let corsoption = {
    origin: "http://localhost:3000", //origin from where you requesting
    credentials: true,
  };
  
const User = require('../Models/User');
// Controller function for user registration

exports.register = async(req, res) => {
    try{
        //extracting user data from the request body
const {name, email, password, role} = req.body;
// Loging the values to the console to check the data
console.log('Name:', name);
console.log('Email:', email);
console.log('Password:', password);
console.log('Role:', role);

  // checking if the email already exists
const existingUser= await User.findOne({email})
if(existingUser)
{
    return res.status(400).json({error:'A user with this email already exists'})
}
//creating a new user account
const user = new User({
    name,
    email,
    password,
    role,
})
 // saving user in our database
 await user.save();
 //user added succefully messgae response
 res.status(200).json({message:'New user added successfully in the database'})

    } catch (error) {
        res.status(500).json({error});
    }
}

//Controller function for user login
exports.login= async(req, res) =>{
    try{
const{email, password} = req.body;
//checking that whether email exists or not
const userExists = await User.findOne({email})
if(!userExists){
    res.status(401).json({error:"The user with this email doesn't exist"})
}
if(userExists.password!==password)
{
    res.status(401).json({error:"The password is incorrect"})
}

res.status(200).json({message:"Account logged in successfully", userExists})
  

    }catch(error){
        res.status(500).json({error:'Login Failed'})
    }
}

