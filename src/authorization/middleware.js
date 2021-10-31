
const jwt = require("jsonwebtoken");
require("dotenv").config()

const verify = (token)=>{
    return new Promise ((resolve,reject)=>{
        jwt.verify(token, process.env.JSW_TOKEN_KEY, function(err, user) {
            if(err){
                return reject(err);
            }
            return resolve(user)
        });
    })
}

module.exports = async (req,res,next) =>{

    try{
            //find if token is present
        const bearerToken = req?.headers?.authorization
    
        if(!bearerToken){
            return res.send("Token not found")
        }

        //see if the token starts with bearer
        if(!bearerToken.startsWith("Bearer ")){
            return res.send("Invalid bearer token")
        }

        //split token
        const token = bearerToken.split(" ")[1];

        //verify token
        const user = await verify(token);
    
        console.log(user.user);

        return next()
    }
    catch(err){
        res.send(err)
    }
}