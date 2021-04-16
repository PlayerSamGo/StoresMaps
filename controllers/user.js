const bcrypt = require('bcrypt-nodejs');

const User = require('../models/user');

function register(req,res){

    let user = new User();

    let params = req.body;

    user.username = params.username;
    user.email = params.email;
    user.password = params.password;
    user.name = null;
    user.phoneNumber = null;
    user.role = 'ROLE_USER';
    user.facebookId = null;
    user.facebookImage = null;
    user.image = null;
    user.stores = null;
    user.devicesId = null;

    user.validate((errors)=>{
        if(errors){
            return res.status(400).send({message:'user.errors',errors});
        }
        //Encrypt password        
        bcrypt.hash(params.password,null,null,(errors,hash)=>{
            if(errors){
                return res.status(400).send({message:'error.encrypt',errors});
            }
            user.password = hash;
        })
        user.save((errors,userStored)=>{
            if(errors){
                return res.status(400).send({message:'user.errors',errors});
            }
            res.status(200).send({message:'register.successful'});
        })
    });  

}

function login(req,res){
    let params = req.body;

    const email = params.email;
    const password = params.password;

    //Validate params
    let user = new User();
    user.email = email;
    user.password = password;

    //Temp filled needed for Validation in the Schema
    user.username = "Lorem ipsum";

    user.validate((errors)=>{
        if (errors) {
            return res.status(400).send({message:'user.errors',errors});
        }
        User.findOne({email:email.toLowerCase()},(errors,userStored)=>{
            if(errors){
                return res.status(400).send({message:'bad.request'});
            }
            if(!userStored){
                return res.status(401).send({message:'bad.credentials'});
            }
            bcrypt.compare(password,userStored.password,(errors,check)=>{
                if(check){
                    return res.status(200).send({message:'login.successful'});
                }
                res.status(401).send({message:'bad.credentials'});
            }); 
        });
    });
}

module.exports = {
    register,
    login
};
