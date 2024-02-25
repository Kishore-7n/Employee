
import React, { useEffect, useState } from 'react'
import '../styles/Employee.css'

export default function EmpTable() {

    const [employees,setemployees] = useState([]);
    const url = "http://localhost:8000/employees";
    const fetchemployees = async() => {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setemployees(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
 const fetchpersonalinfo = async(personalid) => {
    let id = personalid;
    let url = `http://localhost:8000/employees/${id}`;
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        //const data = await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
 }

    useEffect(()=>{
        fetchemployees();
    },[])
    
  return (
    <div className='emp-xyz'>
    <h2>EMPLOYEE TABLE</h2>
    <table className="employee-table">
        <thead>
            <tr>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Department</th>
                <th>DoB</th>
                <th>Gender</th>
                <th>Designation</th>
                <th>Salary</th>
                <th>Degree</th>
                <th>College</th>
                <th>BloodGroup</th>
            </tr>
        </thead>
        <tbody>
            {employees.map(employee => (
                <tr key={employee.employee_id}>
                    <td>{employee.employee_id}</td>
                    <td>{employee.employee_name}</td>
                    <td>{employee.department}</td>
                    <td>{new Date(employee.dob).toLocaleDateString()}</td>
                    <td>{employee.gender}</td>
                    <td>{employee.designation}</td>
                    <td>{employee.salary}</td>
                    <td>{employee.degree}</td>
                    <td>{employee.college_name}</td>
                    <td>{employee.blood_group}</td>
                </tr>
            ))}
        </tbody>
    </table>
</div>
  )
}
