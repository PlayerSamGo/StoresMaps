const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Utilities = require('../services/utilities');

let ImageSchema = new Schema({
    fileName: String,
    userId: String,
    storeId: String
});

ImageSchema.pre('save',function(next){
    //if image is for user, update user image
    if(this.userId!="undefined"){
        this.model('User').findOneAndUpdate({_id:this.userId},{image:this._id}).exec();
    }
    //if image is for store, add image to store
    if(this.storeId!="undefined"){
        this.model('Store').findOneAndUpdate({_id:this.storeId},{image:this._id}).exec();
    }
    next();
});

ImageSchema.pre('remove',function(next){
    if(this.userId!="undefined"){
        //delete file image from server
        Utilities.eraseFileFromFileName('users',this.fileName);
        //remove image of store
        this.model('User').update({image:this._id},{image:undefined}).exec();
    }
    // console.log('before delete image '+this._id);
    if(this.storeId!="undefined"){
        //delete file image from server
        Utilities.eraseFileFromFileName('stores',this.fileName);
        //remove image of store
        this.model('Store').update({images:this._id},{image:undefined}).exec();
    }
    next();
});

module.exports = mongoose.model('Image', ImageSchema);
