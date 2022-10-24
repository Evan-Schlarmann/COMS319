const mongoose = require('mongoose')
const Schema = mongoose.Schema

const donationSchema = new Schema({
    name: {type:String,
        required:true},
    email: {type:String,
        required:true},
    charity: {type:String,
        required:true},
    amount: {type:Number,
        required:true}
}, {timestamps:true})

//Model
const Donation = mongoose.model('Donation', donationSchema) //Automatically searches for 'donations' collections in mongodb

module.exports = Donation