const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let StoreSchema = new Schema({
    name:{
        type:String,
        validate: {
            validator: function(v) {
              return !(/^\s+$/.test(v));
            },
            message: 'Nombre de la tienda no debe ser blanco'
        },
        minlength: [3, 'El nombre de la tienda debe tener al menos 3 caracteres'],
        maxlength: [30, 'El nombre de la tienda no debe exceder los 30 caracteres']
    },
    street:{
        type:String,
        required: [true, 'La calle es requerida'],
        validate: {
            validator: function(v) {
              return !(/^\s+$/.test(v));
            },
            message: 'La calle no debe ser blanca'
        },
        minlength: [3, 'La calle debe tener al menos 3 caracteres'],
        maxlength: [90, 'La calle no debe exceder los 90 caracteres']
    },
    city:{
        type:String,
        required: [true, 'La ciudad es requerida'],
        validate: {
            validator: function(v) {
              return !(/^\s+$/.test(v));
            },
            message: 'La ciudad no debe ser blanca'
        },
        minlength: [3, 'La ciudad debe tener al menos 3 caracteres'],
        maxlength: [90, 'La ciudad no debe exceder los 90 caracteres']
    },
    state:{
        type:String,
        required: [true, 'El estado es requerido'],
        validate: {
            validator: function(v) {
              return !(/^\s+$/.test(v));
            },
            message: 'El estado no debe ser blanco'
        },
        minlength: [3, 'El estado debe tener al menos 3 caracteres'],
        maxlength: [90, 'El estado no debe exceder los 90 caracteres']
    },
    postalCode:{
        type:Number,
        required: [true, 'El código postal es requerido'],
        min: [3, 'El código postal debe tener al menos 3 caracteres'],
        max: [5, 'El código postal no debe exceder los 5 caracteres']
    },
    country:{
        type:String,
        required: [true, 'El país  es requerido'],
        validate: {
            validator: function(v) {
              return !(/^\s+$/.test(v));
            },
            message: 'El país  no debe ser blanco'
        },
        minlength: [3, 'El país   debe tener al menos 3 caracteres'],
        maxlength: [90, 'El país  no debe exceder los 90 caracteres']
    },
    latitude: String,
    longitude: String,
    image:{
        type: Schema.ObjectId,
        ref: 'Image'
    },
    products:{
        type: Schema.ObjectId,
        ref: 'Product'
    }
});

module.exports = mongoose.model('Store',StoreSchema);