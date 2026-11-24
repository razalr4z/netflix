const express=require('express')
const mongoose=require('mongoose')
const movieSchema=mongoose.Schema({
    movieName:String,
    director:String,
    releaseDate:Date,
    genre:String,
    duration:Number,
    movieImage:String
})
const movieModel=mongoose.model('movie',movieSchema)
module.exports=movieModel