

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Client } = require('pg');
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());




const client = new Client({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database:process.env.DB_NAME,
    password:process.env.DB_PASSWORD,
    port: 5432,
  });

client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error', err.stack));

  
//saving employee details to database

app.post('/',async(req,res)=>{

    const sql_query = "INSERT INTO employee_table( employee_id ,employee_name, department,dob,gender, designation,salary)  VALUES ($1, $2, $3, $4, $5, $6, $7);"

    const values = [
      req.body.empid,
      req.body.name,
      req.body.dept,
      req.body.dob,
      req.body.gender,
      req.body.role,
      req.body.salary,
    ];
    try{
        
        if(req.body.dept=='' || req.body.gender=='')
        {
          res.status(500).send("Please fill the form");
        }
        else if(req.body.name.length>30)
        {
          res.status(500).send("Name must be below 30 characters");
        }
        else if(req.body.salary.length>8)
        {
          res.status(500).send("Salary must be 8 digits");
        }
        else{

        await client.query(sql_query,values,(err,result)=>{
            if(err){
                res.status(500).send("Error in submitting");
                throw err
            }
            else{
                res.send("Form submitted Sucessfully").status(200);
                console.log("submitted");
            }
            // client.end();
        }) 
      }
        
      }
      catch(error){
        console.error(error);
        res.status(500).json({error:'Internal server error'})
      }

})

app.post('/form',(req,res)=>{
  try {

    const sql_query = `UPDATE employee_table
    SET
      degree = $1,
      college_name = $2,
      blood_group = $3
    WHERE
      employee_id = $4
  ;`
    let id = req.body.empid;
    console.log(req.body);
    const values = [
      req.body.degree,
      req.body.college,
      req.body.blood,
    ];

    client.query(sql_query,[...values,id],(err,result)=>{
      if(err){
          res.status(500).send("Error in submitting");
          throw err
      }
      else{
          res.send("Form submitted Sucessfully").status(200);
          console.log("submitted");
      }
      // client.end();
  }) 
  }catch(err)
  {
    console.error(err);
    res.status(500).json({error:'Internal server error'})
  }
})


app.get('/employees',(req,res)=>{
  const queryResult = 'SELECT * FROM employee_table';
  try{
    client.query(queryResult,(err,result)=>{
        if(err){
            throw err
        }
        else{
            res.status(200).send(result.rows);
            console.log(result.rows);
            console.log("sended");
        }
        // client.end();
    }) 
    
  }
  catch(error){
    console.error(error);
    res.status(500).json({error:'Internal server error'})
  }
})




const port = process.env.PORT || 8001;
app.listen(port,()=>{
    console.log("server started running successfully");
});