const express=require('express')
const path=require('path')
const Router=express.Router()
var multer  = require('multer')
const url="http://localhost:5000/"
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,'./uploads')
    },
    filename: function (req, file, cb) {
      let ext=path.extname(file.originalname)
      cb(null, file.originalname.split('.')[0] + '-' + Date.now()+ext)
    }
  })
const fileFilter=(req,file,cb)=>{
    if(file.mimetype==='image/jpeg' || file.mimetype==='image/png' || file.mimetype==='image/jpg')
    {
        cb(null,true)
    }else{
        cb(new Error('invalid mimetype'),false)
    }
}
var upload = multer({ storage: storage,fileFilter:fileFilter})
const uploadsingle=upload.single('file')
Router.post('/',function(req,res,next){
    uploadsingle(req,res,function(err)
    {
        if(err)
        {
            res.json({
                status:401,
                message:err.message
            })
        }else{
            next()
        }
    })
},(req,res)=>{
    res.status(200).json({
        message:"Successfully uploaded",
        location:url+req.file.path.replace('\\','/')
    })
})



module.exports=Router