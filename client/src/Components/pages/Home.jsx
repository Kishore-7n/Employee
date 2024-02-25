

import React from 'react'

import { useState } from 'react';

import {useNavigate} from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import '../styles/Home.css';

function Home() {

    const [name,setname] = useState('');
    const [empid , setempid] = useState('')
    const [dept,setdept] = useState('');
    const [dob,setdob] = useState('');
    const [gender,setgender] = useState('');
    const [role,setrole] = useState('');
    const [salary,setsalary] = useState();
    const [message,setmessage] = useState('');
    let navigate = useNavigate()
    

    const url = "http://localhost:8000/";
    const notify = (message) => toast.success(message);
    const handlesubmit = async(e) => {
        e.preventDefault();
        const data = await fetch(url,{
            method:'post',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
              "name":name,
              "empid":empid,
              "dept":dept,
              "dob":dob,
              "gender":gender,
              "role":role,
              "salary":salary
            })
        })
        console.log(data);
        if(data.ok)
        {
          setname('')
          setempid('')
          setdept('')
          setdob('')
          setgender('')
          setrole('')
          setsalary('')
          navigate('/form2');
        }
        const resp = await data.text();
        setmessage(resp)
        notify(resp)
    
    }
    
  return (
    <div className='containers'>
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
          <label htmlFor="exampleFormControlInput1" className="form-label">DEPARTMENT</label>
          <select className="form-select" aria-label="Default select example" name='dept' value={dept}  onChange={(e)=>setdept(e.target.value)}  style={{width:"300px"}} required>
          <option selected>select</option>
          <option value="Testing">Testing</option>
          <option value="Cloud">Cloud</option>
          <option value="Developer">Developer</option>
          <option value="HR">HR</option>
          <option value="Marketing">Marketing</option>
          </select>
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
      <div className='mb-2'>
          <label htmlFor="exampleFormControlInput1" className="form-label">GENDER</label>
          <div className="form-check"  style={{width:"300px"}}>
          <input className="form-check-input" type="radio" name="gender" id="flexRadioDefault1" value="Male" onChange={(e)=>setgender(e.target.value)}/>
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            Male
          </label>
        </div>
        <div className="form-check"  style={{width:"300px"}}>
          <input className="form-check-input" type="radio" name="gender" id="flexRadioDefault2"  value="Female" onChange={(e)=>setgender(e.target.value)}/>
          <label className="form-check-label" htmlFor="flexRadioDefault2">
            Female
          </label>
        </div>
        <div className="form-check"  style={{width:"300px"}}>
          <input className="form-check-input" type="radio" name="gender" id="flexRadioDefault2"  value="others" onChange={(e)=>setgender(e.target.value)}/>
          <label className="form-check-label" htmlFor="flexRadioDefault2">
            others
          </label>
        </div>
      </div>
      <div className="mb-2">
        <label htmlFor="exampleFormControlInput1" className="form-label">DESIGNATION</label>
        <input 
        type="text" 
        className="form-control" 
        id="exampleFormControlInput1" 
        placeholder="ex:Manager"
        required
        name='role'
        value={role}
        onChange={(e)=>setrole(e.target.value)}
        style={{width:"300px"}}
        />
      </div>
      <div className="mb-2">
        <label htmlFor="exampleFormControlInput1" className="form-label">SALARY</label>
        <input 
        type="number" 
        className="form-control" 
        id="exampleFormControlInput1" 
        placeholder="ex:250000"
        required
        name='salary'
        value={salary}
        onChange={(e)=>setsalary(e.target.value)}
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

export default Home


