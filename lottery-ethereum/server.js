const express=require('express')
const host="localhost"
const Port=5000
const app=express()
const Lottery=require('./build/Lottery.json')
const {Lotterydeploy}=require('./deploy');
const AllLottery=require('./build/AllLottery.json')
var cors = require('cors')
const bodyparser=require('body-parser')
const file=require('./api/fileupload')
const path=require('path')

app.use(cors())
app.use(bodyparser.urlencoded({extended: true}))
app.use(express.static(path.resolve(__dirname)))
app.use('/fileupload',file)

app.get("/",(req,res)=>{
    res.send("Hi I am from node.js server")
})
// console.log(__dirname);
app.get('/deploy/Lottery',async(req,res)=>{
    let image=req.body.image
    let name=req.body.name
    let address=await Lotterydeploy(image,name)
    if(address.length>0)
    {
        res.status(200).send({
            address:address,
            abi:Lottery.interface
        })
    }else{
        res.status(401).send({
            message:"Error occured deploying the contract"
        })
    }
   
})

app.get('/abi/Lottery',(req,res)=>{
    if(Lottery.interface)
    {
        res.status(200).send({
            abi:Lottery.interface
        })
    }else{
        res.status(401).send({
            abi:null,
            message:"Abi not found"
        })
    }
})
app.get('/abi/AllLottery',(req,res)=>{
    if(Lottery.interface)
    {
        res.status(200).send({
            abi:AllLottery.interface
        })
    }else{
        res.status(401).send({
            abi:null,
            message:"Abi not found"
        })
    }
})
app.listen(Port,host,()=>{
    console.log("Server is listening at "+host+":"+Port);
})