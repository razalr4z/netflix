const auth=(req,res,next)=>
{
    if(req.session.userid){
        next()
    }
    else
    {
        res.redirect("/user/get_login")
    }
}
module.exports=auth