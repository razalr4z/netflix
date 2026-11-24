const express=require('express')
const mongoose=require('mongoose')
const router=express.Router()
const multer=require('multer')
const movie=require('../model/model')
const auth=require('../middleware/auth')

const storage=multer.diskStorage({
    destination:(req,file,cb)=>
    {
        cb(null,'uploads/')
    },
    filename:(req,file,cb)=>
    {
        cb(null,Date.now()+"_"+file.originalname)
    }
})
const uploads=multer({storage})
router.get('/dashboard',async(req,res)=>
{
    const data=await movie.find()
    res.render('dashboard',{movies:data})
})
router.get('/addmovie',auth,(req,res)=>
{
    res.render('addmovie')
})

// UPDATE GET
router.get('/update/:id', auth,async (req, res) =>
{
    try
    {
        const data = await movie.findById(req.params.id)

        res.render('update', { data })
    }
    catch(error)
    {
        console.log(error)
        res.redirect('/movie/dashboard')
    }
})


// UPDATE POST
router.post('/edit/:id',auth, uploads.single("image"), async (req, res) =>
{
    try
    {
        const { movieName, director, releaseDate, genre, duration } = req.body

        const data = {
            movieName,
            director,
            releaseDate,
            genre,
            duration
        }

        if(req.file)
        {
            data.movieImage = `/uploads/${req.file.filename}`
        }

        await movie.findByIdAndUpdate(
            req.params.id,
            data,
            { new: true }
        )

        res.redirect('/movie/dashboard')
    }
    catch(error)
    {
        console.log(error)
        res.redirect('/movie/dashboard')
    }
})


// DELETE
router.post('/delete/:id',auth, async (req, res) =>
{
    try
    {
        await movie.findByIdAndDelete(req.params.id)

        res.redirect('/movie/dashboard')
    }
    catch(error)
    {
        console.log(error)
        res.send("Unable to delete movie")
    }
})

router.get("/:_id",async(req,res)=>
{
    const result=await movie.findById(req.params._id)
    res.render('display',{movies:result})
})
router.post('/display',uploads.single("image"),async(req,res)=>
{
    let {movieName,director,releaseDate,genre,duration}=req.body
    const image=`/uploads/${req.file.filename}`
    const movies=await movie.create({
        movieName:movieName,
        director:director,
        releaseDate:releaseDate,
        genre:genre,
        duration:duration,
        movieImage:image,
        user:req.session.userid
    })
    res.redirect('/movie/dashboard')
})
module.exports=router