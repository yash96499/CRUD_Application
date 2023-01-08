const express = require("express");
const path = require("path");
const app = express();
const mongoose= require('mongoose');
const bodyparser=require("body-parser");
const { stringify } = require("querystring");
const { ifError } = require("assert");
var cors = require('cors');
require('mongoose-long')(mongoose);
const dotenv =require("dotenv");
const connectDatabase=require("./config/database");

// mongoose.connect('mongodb://0.0.0.0:27017/CustomerDetails', {useNewUrlParser: true, useUnifiedTopology:true});
// const port = 8080;

// config
dotenv.config({path:"./config/config.env"});

//connecting database
connectDatabase();



const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
});


const contactSchema = new mongoose.Schema({
    id:String,
    warn:{
        type:String,
        default:"-",
    },
    name:{
        type:String,
        // required:[true,"please enter name"],
        default:'-',
    },
    phone:{
        type:String,
        // required:[true,"please enter phone number"],
    },
    building_no:{
        type:String,
        // required:[true,"please enter House no."],
        default:"-",
    },
    street:{
        type:String,
        // required:[true,"please enter street"],
        default:"-",
    },
    city:{
        type:String,
        // required:[true,"please enter city"],
        default:"-",
    },
    state:{
        type:String,
        // required:[true,"please enter state"],
    },
    zip_code:{
        type:Number,
        // required:[true,"please enter pincode"],
        default:0,
    },
    plumber:{
        type:String,
        default:"-",
    },
    Amount:{
        type:Number,
        default:0,
    },
    Instruction:{
        type:String,
        // required:[true,"Please Enter Instruction"],
        default:"-",
    },
    issue: {
        type:String,
        default:"-",
    },
    status:{
        type:String,
        default:"PENDING",
    },
    count:Number,
    Created: String,
    Done_date:{
        type:String,
        default:"-",
    },
    history:[
            {
                plumber_name:{
                    type:String,
                    default:"-",
                },client_issue:{
                    type:String,
                    default:"-",
                },instructions:{
                    type:String,
                    default:"-",
                },Amount_paid:{
                    type:Number,
                    default:0,
                },Created: String, Done_date:{type:String,default:"-",}}]
 });
const Customer = mongoose.model('Customer', contactSchema);


const counterSchema={
    id:String,
    seq:Number
}
const Counter = mongoose.model('Counter', counterSchema);

app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded())


app.post('/post',(req, res)=>{
    let date_time = new Date();
    let date = ("0" + date_time.getDate()).slice(-2);
    let month = ("0" + (date_time.getMonth() + 1)).slice(-2);
    let year = date_time.getFullYear();
    // let hours = date_time.getHours();
    // let minutes = date_time.getMinutes();
    // let seconds = date_time.getSeconds();

    Customer.find( { $or: [ { phone:req.body.phone },
                        { $and: [{building_no:req.body.building_no.toUpperCase().trim()},
                                {street:req.body.street.toUpperCase().trim()},
                                {city:req.body.city.toUpperCase().trim()},
                                {state:req.body.state.toUpperCase().trim()},
                                {zip_code:req.body.zip_code}
                        ] }
                        ] 
                    }
                )
    .then(resp=>{
        if(resp.length!=0){
            const dbData = resp[0];
            console.log("Already exists", dbData);
            Customer.findOneAndUpdate(
                {_id:dbData._id}, 
                {
                    $set:{
                        status:req.body.status.toUpperCase(),
                        Instruction:req.body.instructions,
                        Created:date+"-"+month + "-" + year,
                        Done_date:"-",
                        warn:"Warning!!"},
                    $inc:{count:1},
                    $push:{history: [{plumber_name:req.body.plumber&&req.body.plumber.trim(),
                                    client_issue:req.body.issue&&req.body.issue.trim(),
                                    instructions:req.body.instructions,
                                    Amount_paid:req.body.Amount_paid,
                                    Created:date + "-" + month + "-" + year,Done_date:"-"}]
                            }
                },   
                {new:true},(err,data)=>{
                    if(err){
                        res.send("ERROR")
                    }else{
                        if(data==null){
                            res.send("nothing found")
                        }else{
                            res.send(data)
                        }
                    }
                }
            )

            // var myData = new Customer({
            //     count:req.body.count+1,
            //     updated: year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
            // })
            // myData.save().then(()=>{
            //     res.send("this item saved successfully")
            // })
            // .catch(()=>{
            //     res.status(400).send("Not Saved Successfully")
            // })
        }else{
            Counter.findOneAndUpdate(
                {id:"autoval"},
                {"$inc":{"seq":1}},
                {new:true},(err,cd)=>{
        
                   let seqId;
                    if(cd==null)
                    {
                        const newval= new Counter({id:"autoval",seq:1})
                        newval.save()
                        seqId=1
                    }else{
                        seqId=cd.seq
                    }
        
                    var myData = new Customer({
                        id:seqId,
                        name: req.body.name,
                        warn:"-",
                        phone: req.body.phone&&req.body.phone.trim(),
                        building_no: req.body.building_no&&req.body.building_no.toUpperCase().trim(),
                        street: req.body.street&&req.body.street.toUpperCase().trim(),
                        city: req.body.city&&req.body.city.toUpperCase().trim(),
                        state: req.body.state&&req.body.state.toUpperCase().trim(),
                        zip_code: req.body.zip_code,
                        plumber: "-",
                        Instruction:req.body.instructions,
                        Amount:0,
                        status: req.body.status,
                        issue: "-",
                        count:1,
                        Created: date+ "-" + month + "-" + year,
                        Done_date:"-",
                        // updated: year + "-" + month + "-" + date,
                        history: [{ plumber_name:"-",
                                    client_issue:"-",
                                    instructions:req.body.instructions,
                                    Amount_paid:0,
                                    Created:date + "-" + month + "-" + year,
                                    Done_date:"-"}]
                    });
                    console.log(myData,req.body);
                    myData.save().then(()=>{
                        res.send("this item saved successfully")

                        // wbm.start().then(async () => {
                        //     const phones = [req.body.phone];
                        //     const message = 'Good Morning.';
                        //     await wbm.send(phones, message);
                        //     await wbm.end();
                        // }).catch(err => console.log(err));

                    }).catch(()=>{
                        res.status(400).send("Not Saved Successfully")
                    })
                    // res.status(200).render('contact.pug')
                }
            )
        }
    }).catch(()=>{
        res.status(400).send("Not Saved Successfully")
    })

    // Counter.findOneAndUpdate(
    //     {id:"autoval"},
    //     {"$inc":{"seq":1}},
    //     {new:true},(err,cd)=>{

    //        let seqId;
    //         if(cd==null)
    //         {
    //             const newval= new Counter({id:"autoval",seq:1})
    //             newval.save()
    //             seqId=1
    //         }else{
    //             seqId=cd.seq
    //         }

    //         var myData = new Customer({
    //             id:seqId,
    //             name: req.body.name,
    //             phone: req.body.phone,
    //             building_no:req.body.building_no,
    //             street:req.body.street,
    //             city:req.body.city,
    //             state:req.body.state,
    //             zip_code:req.body.zip_code,
    //             plumber: req.body.plumber,
    //             status: req.body.status,
    //             issue: req.body.issue,
    //             count:req.body.count,
    //             Created: year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds,
    //             updated: year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds,
    //             history:[{plumber_name:req.body.plumber,client_issue:req.body.issue,client_Date:year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds}]
    //         });
    //         // console.log(myData,req.body);
    //         myData.save().then(()=>{
    //             res.send("this item saved successfully")
    //         }).catch(()=>{
    //             res.status(400).send("Not Saved Successfully")
    //         })
    //         // res.status(200).render('contact.pug')
    //     }
    // )
    
})

app.put("/update", (req,res)=>{

    let date_time = new Date();
    let date = ("0" + date_time.getDate()).slice(-2);
    let month = ("0" + (date_time.getMonth() + 1)).slice(-2);
    let year = date_time.getFullYear();
    // let hours = date_time.getHours();
    // let minutes = date_time.getMinutes();
    // let seconds = date_time.getSeconds();


    const upid=req.query.id;

    const arrId = req.query.arrId;
    Customer.find(({id:upid}),function(err,val){
        if(err){
            res.send("ERRORR ",err)
        }else{
            if(val.length==0){
                res.send("data does not exist");
            }else{
                console.log("val ", val);
                
                const oldData= val[0];
                let upname=req.body.name&&req.body.name.toUpperCase().trim();
                let upphone=req.body.phone&&req.body.phone.trim();
                let upbuilding_no=req.body.building_no&&req.body.building_no.toUpperCase().trim();
                let upstreet=req.body.street&&req.body.street.toUpperCase().trim();
                let upcity=req.body.city&&req.body.city.toUpperCase().trim();
                let upstate=req.body.state&&req.body.state.toUpperCase().trim();
                let upzip_code=req.body.zip_code;
                let upplumber=req.body.plumber&&req.body.plumber.trim();
                let upissue=req.body.issue&&req.body.issue.trim();
                let upInstruction=req.body.instructions;
                let upAmount=req.body.Amount_paid;
                let upstatus=req.body.status&&req.body.status.toUpperCase().trim();
                let upcount=req.body.count;
                let upDone_date;
                if(upstatus=="done"||upstatus=="DONE"||upstatus=="Done"){
                    upDone_date=date + "-" + month + "-" + year;
                }
            
                // oldData.history.map(x=>{
                //     console.log('x ',x,arrId);
                //     if(x.arrId==arrId){
                //     console.log('plum ', req.body.plumber);
                //     x.plumber_name = req.body.plumber || x.plumber_name;
                //     x.client_issue = req.body.issue || x.client_issue;
                //     x.client_Date=year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
                // }});

                oldData.history[arrId].plumber_name=req.body.plumber || oldData.history[arrId].plumber_name;
                oldData.history[arrId].client_issue=req.body.issue || oldData.history[arrId].client_issue;
                oldData.history[arrId].instructions=req.body.instructions || oldData.history[arrId].instructions;
                oldData.history[arrId].Amount_paid=req.body.Amount_paid|| oldData.history[arrId].Amount_paid;
                oldData.history[arrId].Done_date=upDone_date || oldData.history[arrId].Done_date;
                console.log("oldData history ", oldData.history);

                Customer.findOneAndUpdate({id:upid},
                    {
                        $set:{
                            name:upname,
                            phone:upphone,
                            building_no:upbuilding_no,
                            street:upstreet,
                            city:upcity,
                            state:upstate,
                            zip_code:upzip_code,
                            plumber:upplumber,
                            issue:upissue,
                            Instruction:upInstruction,
                            Amount:upAmount,
                            status:upstatus,
                            issue:upissue,
                            count:upcount,
                            Done_date:upDone_date,
                            history:oldData.history
                        }
                    },
                    (err,data)=>{
                        if(err){
                            // console.log("label: ",err);
                            res.send("ERROR")
                        }else{
                            if(data==null){
                                res.send("nothing found")
                            }else{
                                res.send(data)
                            }
                        }
                })
            }
        }
    })
})

app.get('/fetch/:id',function(req,res){
    const fetchid=req.params.id;
    Customer.find(({id:fetchid}),function(err,val){
        if(err){
            res.send("ERRORR ",err)
        }else{
            if(val.length==0){
                res.send("data does not exist");
            }else{
                res.send(val);
            }
        }
    })
})

app.get('/fetch/:Created',function(req,res){
    const fetchCreated=req.query.Created;
    Customer.find(({Created:fetchCreated}),function(err,val){
        if(err){
            res.send("ERRORR ",err)
        }else{
            if(val.length==0){
                res.send("data does not exist");
            }else{
                res.send(val);
            }
        }
    })
})

app.get('/fetchall',function(req,res){
    Customer.find(function(err,val){
        if(err){
            res.send("ERRORR ",err)
        }else{
            if(val.length==0){
                res.send("data does not exist");
            }else{
                res.send(val);
            }
        }
    })
})

app.delete('/del/:id',function(req,res){
    let delid=req.params.id;

    Customer.findOneAndDelete(({id:delid}),function(err,docs){
        if(err){
            res.send("ERRORRR")
        }else{
            if(docs==null){
                res.send("ID doesn't exist");
            }else{
                res.send(docs);
            }
        }
    })

})

// app.listen(port,()=>{
//     console.log(`The application started sucessfully on port ${port}`);
// })