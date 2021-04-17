const bcrypt = require('bcrypt-nodejs');
const handlebars = require('handlebars');

const User = require('../models/user');
const AuthenticationToken = require('../models/authenticationToken');
const Utilities = require('../services/Utilities');
const Config = require('../scripts/setConfig.json');

let smtpTransporter = Utilities.createSMTPTransporter();

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

function forgotPassword(req,res){
    let params = req.body;
    const email = params.email;
    //Validators
    if(!email){
        return res.status(400).send({message:'email.required'});
    }
    User.findOne({email:email.toLowerCase()},(errors, userStored)=>{
        if(errors){
            return res.status(400).send({message:'bad.request', errors});
        }
        if(!userStored){
            return res.status(404).send({message:'user.not.found'});
        }
        
        AuthenticationToken.findOne({email:userStored.email.toLowerCase()},(errors,authenticationTokenStored)=>{
            if(errors){
                return res.status(400).send({message:'bad.request'});
            }
            let authenticationToken = new AuthenticationToken();
            authenticationToken.email = userStored.email;
            authenticationToken.userId = userStored._id;
            authenticationToken.password = null;

            if(authenticationTokenStored){
                authenticationToken = authenticationTokenStored;
            }

            let code = Math.floor(1000+Math.random()*9000);
            authenticationToken.token = code;

            Utilities.readHTMLFile('./views/forgotPassword.html',(errors,htmlFile)=>{
                let template = handlebars.compile(htmlFile);
                let replaceFields = {
                    email: userStored.email,
                    code: code
                }
                htmlFile = template(replaceFields);

                let mailOptions = {
                    from: Config.smtp_auth.user,
                    to: userStored.email,
                    subject: "Restaurar contraseña",
                    html: htmlFile
                };

                smtpTransporter.sendMail(mailOptions,(errors,result)=>{
                    if (errors) {
                        console.log("Error al enviar correo");
                        return res.status(400).send({message:'mail.send.errors',errors});
                    }
                    res.status(200).send({message:'mail.send.successful'});
                });
            });
        }); 
    });
}

module.exports = {
    register,
    login,
    forgotPassword
};
