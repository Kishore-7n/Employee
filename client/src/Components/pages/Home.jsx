

import React from 'react'

import { useState } from 'react';

import {TextField,Button,Select, FormControl, InputLabel,Box,MenuItem} from '@mui/material';



import {
    DataGrid,
    GridToolbar,
    gridPageCountSelector,
    GridPagination,
    useGridApiContext,
    useGridSelector,
  } from '@mui/x-data-grid';
  
  import MuiPagination from '@mui/material/Pagination';

  import '../styles/Home.css';

function Home() {

    const [firstname,setfirstname] = useState(' ');
    const [lastname,setlastname] = useState(' ');
    const [age,setage] = useState(0);
    const [dob,setdob] = useState(' ');
    const [salary,setsalary] = useState(0);
    const [role,setrole] = useState(null);
    const [joiningdate,setjoiningdate] = useState(' ');
    const [employees,setemployees] = useState([]);

    const empid = () =>
    {
        return Math.floor(Math.random() * 100) + 1;
    }

    const handlesubmit = async(e) => {
        e.preventDefault();
        const url = "http://localhost:8000/";
        const data = await fetch(url,{
            method:'post',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                fname:firstname,
                lname:lastname,
                age_of_emp:age,
                DateOfBirth:dob,
                salary_of_emp:salary,
                Designation:role,
                joindate:joiningdate,
                id:empid()
            })

           
        })

        const data_response = await data.json();
        
        const employeeswithdates = data_response.rows.map((employee, index) => ({
            ...employee,
            Date_of_Birth: new Date(employee.Date_of_Birth).toDateString(),
            Emp_joiningdate :new Date(employee.Emp_joiningdate).toDateString()

          }));
        setemployees(employeeswithdates);
        setfirstname(' ');
        setlastname(' ');
        setage(0);
        setdob(' ');
        setrole(null);
        setsalary(0);
        setjoiningdate(' ');
    }

    const columns = 
    [ 
        {field:'id',headerName:'ID',width:80},
        {field:'first_name',headerName:'FisrtNmae',width:130},
        {field:'last_name',headerName:'LastName',width:130},
        {field:'emp_age',headerName:'Age',width:130},
        {field:'date_of_birth',headerName:'DateofBirth',width:130},
        {field:'emp_salary',headerName:'Salary',width:130},
        {field:'emp_designation',headerName:'Designation',width:130},
        {field:'emp_joiningdate',headerName:'JoiningDate',width:130}
  ]

  function Pagination({ page, onPageChange, className }) {
    const apiRef = useGridApiContext();
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  
    return (
      <MuiPagination
        color="primary"
        className={className}
        count={pageCount}
        page={page + 1}
        onChange={(event, newPage) => {
          onPageChange(event, newPage - 1);
        }}
      />
    );
  }
  
  function CustomPagination(props) {
    return <GridPagination ActionsComponent={Pagination} {...props} />;
  }


  return (
    <div className='container'>
    <form onSubmit={handlesubmit}>
    <h1 style={{textAlign:"center",marginBottom:"10px"}}>EMPLOYEE FORM</h1>
    <Box marginBottom={2}>
        <TextField
              type='text'
              required
              label='First Name'
              name='fname'
              autoSave='off'
              autoComplete='off'
              sx={{width:"300px"}}
              value={firstname}
              onChange={(e)=>setfirstname(e.target.value)}
        ></TextField>
    </Box>
    <Box marginBottom={2}>
         <TextField
              type='text'
              name='lname'
              required
              label='Last Name'
              autoSave='off'
              autoComplete='off'
              sx={{width:"300px"}}
              value={lastname}
              onChange={(e)=>setlastname(e.target.value)}
        ></TextField>
       </Box>
    <Box marginBottom={2}>
        <TextField
                type='number'
                name='age_of_emp'
                required
                label='Age'
                autoSave='off'
                autoComplete='off'
                sx={{width:"300px"}}
                value={age}
                onChange={(e)=>setage(e.target.value)}
            >
        </TextField>
    </Box>
     <Box marginBottom={2}>
        <TextField
                label = "Date of Birth"
                name='DateOfBirth'
                autoSave='off'
                autoComplete='off'
                type='date'
                sx={{width:"300px"}}
                value={dob} 
                onChange={(e)=>setdob(e.target.value)}
                InputLabelProps={{shrink:true}}
                required
                />
        </Box>
        <Box marginBottom={2}>
            <TextField
                type='number'
                name='salary_of_emp'
                required
                label='Salary'
                autoSave='off'
                autoComplete='off'
                sx={{width:"300px"}}
                value={salary}
                onChange={(e)=>setsalary(e.target.value)}
            ></TextField>
           </Box>
         <Box marginBottom={2}>
            <FormControl  >
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    label="Role"
                    name='Designation'
                    required
                    variant='outlined'
                    sx={{width:"300px"}}
                    value={role}
                    onChange={(e)=>setrole(e.target.value)}
                    >
                        <MenuItem value="Developer">Developer</MenuItem>
                        <MenuItem value="Manager">Manager</MenuItem>
                        <MenuItem value="Human Resources">Human Resources</MenuItem>
                        <MenuItem value="Team Lead">Team Lead</MenuItem>
                    </Select>
            </FormControl>
          </Box>
          <Box marginBottom={2}>
            <TextField
              label = "Joining date"
              name='joindate'
              autoSave='off'
              autoComplete='off'
              type='date'
              sx={{width:"300px"}}
              value={joiningdate} 
              onChange={(e)=>setjoiningdate(e.target.value)}
             InputLabelProps={{shrink:true}}
              
              required
              />
        </Box>
        <Box marginBottom={2}>
            <Button variant='contained' type='submit' sx={{width:"300px"}}>
                submit
            </Button>
        </Box>
    </form>
    <div className='datagrid-container'>
        <DataGrid
            rows={employees}
            columns={columns}
            Pagination
            initialState={{
            pagination: {
                paginationModel: {page:0,pageSize:1},
            },
            }}
            pageSizeOptions={[2,4]}
            slots={{toolbar:GridToolbar,
            pagination:CustomPagination,}}
            checkboxSelection
        ></DataGrid>
    </div>
</div>
  )
}

export default Home


