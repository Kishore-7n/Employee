

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Client } = require('pg');
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const port = 8000;


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

app.post('/',(req,res)=>{

    const sql_query = "INSERT INTO employee_table( id,first_name,last_name,Emp_age,Date_of_Birth,Emp_salary,Emp_Designation,Emp_joiningdate )  VALUES ($1, $2, $3, $4, $5, $6, $7, $8);"

    const values = [
        req.body.id,
        req.body.fname,
        req.body.lname,
        req.body.age_of_emp,
        req.body.DateOfBirth,
        req.body.salary_of_emp,
        req.body.Designation,
        req.body.joindate
    ];

    const queryResult = 'SELECT * FROM employee_table';
    

    try{
        client.query(sql_query,values);
        client.query(queryResult,(err,result)=>{
            if(err){
                throw err
            }
            else{
                res.json(result);
            }
            client.end();
        }) 
        console.log("submitted");
      }
      catch(error){
        console.error(error);
        res.status(500).json({error:'Internal server error'})
      }

})



app.listen(port,()=>{
    console.log("server started running successfully");
});