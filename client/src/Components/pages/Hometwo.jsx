



import React from 'react'

import { useState } from 'react';

import {useNavigate} from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import '../styles/Hometwo.css';

function Hometwo() {

    const [name,setname] = useState('');
    const [empid , setempid] = useState('')
    const [degree,setdegree] = useState('')
    const [blood,setblood] = useState('')
    const [college,setcollege] = useState('')
    const [message,setmessage] = useState('');
    const [dob,setdob] = useState('')
    let navigate = useNavigate()
    

    const url = "http://localhost:8000/form";
    const notify = (message) => toast.success(message);
    const handlesubmit = async(e) => {
        e.preventDefault();
        const data = await fetch(url,{
            method:'post',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
              "name":name,
              "empid":empid,
              "dob":dob,
              "degree":degree,
              "college":college,
              "blood":blood,
            })
        })
        console.log(data);
        if(data.ok)
        {
          setname('')
          setempid('')
          setdegree('')
          setdob('')
          setblood('')
          setcollege('')
         
        }
        const resp = await data.text();
        setmessage(resp)
        notify(resp)
    
    }
    
  return (
    <div className='container2'>
    <form onSubmit={handlesubmit}>
      <div className="mb-2" >
        <label htmlFor="exampleFormControlInput1" className="form-label">EMPLOYEENAME</label>
        <input 
        type="text" 
        className="form-control" 
        id="exampleFormControlInput1" 
        placeholder="ex:abc"
        required
        name='name'
        value={name}
        onChange={(e)=>setname(e.target.value)}
        style={{width:"300px"}}
        />
      </div>
      <div className="mb-2">
        <label htmlFor="exampleFormControlInput1" className="form-label">EMPLOYEEID</label>
        <input 
        type="number" 
        className="form-control" 
        id="exampleFormControlInput1" 
        placeholder="ex:123"
        required
        name='empid'
        value={empid}
        onChange={(e)=>setempid(e.target.value)}
        style={{width:"300px"}}
        />
      </div>
      <div className="mb-2">
        <label htmlFor="exampleFormControlInput1" className="form-label">DOB</label>
        <input 
        type="date" 
        className="form-control" 
        id="exampleFormControlInput1" 
        placeholder="dd/mm/yyyy"
        required
        name='dob'
        value={dob}
        onChange={(e)=>setdob(e.target.value)}
        style={{width:"300px"}}
        />
      </div>
      <div className="mb-2">
        <label htmlFor="exampleFormControlInput1" className="form-label">DEGREE</label>
        <input 
        type="text" 
        className="form-control" 
        id="exampleFormControlInput1" 
        placeholder="ex:B.E"
        required
        name='degree'
        value={degree}
        onChange={(e)=>setdegree(e.target.value)}
        style={{width:"300px"}}
        />
      </div>
      <div className="mb-2">
        <label htmlFor="exampleFormControlInput1" className="form-label">COLLEGE</label>
        <input 
        type="text" 
        className="form-control" 
        id="exampleFormControlInput1" 
        placeholder="ex:Manager"
        required
        name='college'
        value={college}
        onChange={(e)=>setcollege(e.target.value)}
        style={{width:"300px"}}
        />
      </div>
      <div className="mb-2">
        <label htmlFor="exampleFormControlInput1" className="form-label">BLOODGROUP</label>
        <input 
        type="text" 
        className="form-control" 
        id="exampleFormControlInput1" 
        placeholder="ex:250000"
        required
        name='blood'
        value={blood}
        onChange={(e)=>setblood(e.target.value)}
        style={{width:"300px"}}
        />
      </div>
      <div className='mb-2'>
        <button type="submit" className="btn btn-primary" style={{width:"300px",marginTop:"10px"}}>Submit</button>
      </div>
      <h6>{message}</h6>
        <div>
        <ToastContainer />
      </div>
    </form>
</div>
  )
}

export default Hometwo


