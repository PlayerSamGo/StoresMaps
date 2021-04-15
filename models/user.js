const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let UserSchema = new Schema({
    username:{
        type:String,
        required: [true, 'Nombre de usuario requerido'],
        validate: {
            validator: function(v) {
              return !(/^\s+$/.test(v));
            },
            message: 'Nombre de usuario no debe ser blanco'
        },
        minlength: [3, 'El nombre de usuario debe tener al menos 3 caracteres'],
        maxlength: [30, 'El nombre de usuario no debe exceder los 30 caracteres']
    },
    email:{
        type:String,
        unique: true, //if recive code 11000, 'email.unique'
        required: [true, 'Email requerido'],
        validate: {
            validator: function(v) {
                return !(/^\s+$/.test(v));
            },
            message: 'Email no debe ser blanco'
        },
        minlength: [8, 'El email de usuario debe tener al menos 8 caracteres'],
        maxlength: [30, 'El email de usuario no debe exceder los 30 caracteres']
    },
    password:{
        type:String,
        required: [true, 'Contraseña requerida'],
        validate: {
            validator: function(v) {
                return !(/^\s+$/.test(v));
            },
            message: 'Contraseña no debe ser blanca'
        },
        minlength: [8, 'El contraseña de usuario debe tener al menos 8 caracteres'],
        maxlength: [30, 'El contraseña de usuario no debe exceder los 30 caracteres']
    },
    name:{
        type:String,
        validate: {
            validator: function(v) {
              return !(/^\s+$/.test(v));
            },
            message: 'Nombre de usuario no debe ser blanco'
        },
        minlength: [3, 'El nombre de usuario debe tener al menos 3 caracteres'],
        maxlength: [30, 'El nombre de usuario no debe exceder los 30 caracteres']
    },
    phoneNumber:{
        type:Number,
        unique: true
    },
    role:String,
    facebookId:String,
    facebookImage:String,
    resetPassword:false,
    image:{
        type: Schema.ObjectId,
        ref: 'Image'
    },
    stores:{
        type: Schema.ObjectId,
        ref: 'Store'
    },    
    devicesId:{
        type: Schema.ObjectId,
        ref: 'DevicdId'
    }
});

module.exports = mongoose.model('User',UserSchema);