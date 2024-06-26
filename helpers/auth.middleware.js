const config=require('../config/config');
const jwt=require('jsonwebtoken');

exports.loggedIn=function(req,res,next){
    let token=req.header('Authorization');
    if(!token){
        res.status(401).send('Access denied');
    }
    try {
        if(token.startsWith('Bearer ')){
            token=token.slice(7,token.length).trimLeft();
        }
        const verified=jwt.verify(token,config.token_secret);
        if(verified.user_type_id===2){// Check authorization, 2 = Customer, 1 = Admin
            let req_url=req.baseUrl+req.route.path;
            //console.log(req_url);
            if(req_url.includes("users/:id") && parseInt(req.params.id) !== verified.id){
                return res.status(401).send("Unauthorized 1!");
            }
        }
        req.user=verified;
        next();
    } catch (error) {
        res.status(400).send('Invalid token');
    }
}

exports.adminOnly = async function (req, res, next) {
    if( req.user.user_type_id === 2 ){
        return res.status(401).send("Unauthorized 2!");
    }  
    next();
}