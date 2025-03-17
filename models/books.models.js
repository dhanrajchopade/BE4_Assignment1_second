const mongoose = require("mongoose")
const { type } = require("os")

const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
    },
    author:{
        type:String,
        required:true,
    },
    publishedYear:{
        type:Number,
        required:true,
    },
    genre:[{
        type:String,
        required:true,
        enum:["Fiction",'Autobiography', 'Non-fiction','Mystery', 'Thriller','Science Fiction', 'Fantasy', 'Romance', 'Historical','Biography', 'Self-Help','Business', 'Other'],
    }],
    language:{
        type:String,
        required:true,
    },
    country:{
        type: String,
        default:"United States",
    },
    rating:{
        type:Number,
        min:0,
        max:10,
    },
    summary:{
        type:String,
    },
    coverImgUrl:{
        type:String,
    },


},{timestamps:true})

const Books = mongoose.model("Books", bookSchema)

module.exports = Books