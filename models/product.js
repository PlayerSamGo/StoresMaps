const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let ProductSchema = new Schema({
    name:{
        type:String,
        validate: {
            validator: function(v) {
              return !(/^\s+$/.test(v));
            },
            message: 'Nombre del producto no debe ser blanco'
        },
        minlength: [3, 'El nombre del producto debe tener al menos 3 caracteres'],
        maxlength: [30, 'El nombre del producto no debe exceder los 30 caracteres']
    },
    description:{
        type:String,
        required: [true, 'La descripción es requerida'],
        validate: {
            validator: function(v) {
              return !(/^\s+$/.test(v));
            },
            message: 'La descripción no debe ser blanca'
        },
        minlength: [3, 'La descripción debe tener al menos 3 caracteres'],
        maxlength: [90, 'La descripción no debe exceder los 90 caracteres']
    },
    categories: {
        type : String,
        enum : ['Electrónica'],
        default : 'Electrónica'
    },
    subcategories: {
        type : String,
        enum : ['Computo'],
        default : 'Computo'
    },
    price:{
        type:Number,
        required: [true, 'El precio es requerido']
    },
    image:{
        type: Schema.ObjectId,
        ref: 'Image'
    },
    offers:{
        type: Schema.ObjectId,
        ref: 'Offer'
    }
});

module.exports = mongoose.model('Store',StoreSchema);