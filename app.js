const express=require('express');
const db = require('./db');
const app=express();
app.post('/savestudent',async(req,res)=>{
    const result=await db.query('insert into student (firstname,lastname) values ($1,$2) RETURNING *',[req.body.firstname,req.body.lastname]);
})
app.get('/getstudent',async(req,res)=>{
    const result = await db.query('select * from student');
    console.log(result.rows.map(s=>s.firstname))
})
app.get('/deletestudent/:id',async(req,res)=>{
   const result=await db.query('delete * from student where Id=$1',[req.params.id]);
})
app.put('/updatestudent/:id',async(req,res)=>{
    const result=await db.query('update student set firstname=$1 , lastname=$2 where Id=$3',[req.body.firstname,req.body.lastname,req.params.id])
})
app.listen(3000,()=>console.log('server started'))