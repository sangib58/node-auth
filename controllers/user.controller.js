const User=require('../models/user.model');
const config=require('../config/config');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const {NotFoundError}=require('../helpers/utility');


//Register a user
exports.register=async(req,res)=>{
    //Hash password
    const salt=await bcrypt.genSalt(10);
    const hashPassword=await bcrypt.hash(req.body.password,salt);

    //Create a user object
    const user=new User({
        user_type_id:req.body.user_type_id,
        mobile:req.body.mobile,
        email:req.body.email,
        name:req.body.name,
        password:hashPassword,
        status:req.body.status||1    
    });
    //Save user to database
    try{
        const id=await User.create(user);
        user.id=id;
        delete user.password;
        res.send(user);
    }catch(err){
        res.status(500).send(err);
    }
};

//Login
exports.login=async(req,res)=>{
    try {
       const user=await User.login(req.body.mobile_or_email);
       if(user){
            const validPassword=bcrypt.compareSync(req.body.password,user.password);
            if(!validPassword){
                res.status(400).send('Mobile/Email or Password is wrong');
            }else{
                const token=jwt.sign({id:user.id,user_type_id:user.user_type_id},config.token_secret);
                res.header('auth-token',token).send({'token':token});
            }
       } 
    } catch (err) {
        if( err instanceof NotFoundError ) {
            res.status(401).send(`Mobile/Email or Password is in-correct`);
        }
        else {
            let error_data = {
                entity: 'User',
                model_obj: {param: req.params, body: req.body},
                error_obj: err,
                error_msg: err.message
            };
            res.status(500).send("Error retrieving User");
        }
    }
};

//Find user type
exports.getType=async(req,res)=>{
    try {
        const userType=await User.getType(req.body.id);
        if(userType){
            res.send(userType);
        }
    } catch (err) {
        res.status(400).send('Type not found');
    }
    
};

// Access auth users only
exports.authuseronly = (req, res) => {
    res.send("Hey,You are authenticated user. So you are authorized to access here.");
};

// Admin users only
exports.adminonly = (req, res) => {
    res.send("Success. Hellow Admin, this route is only for you");
};
