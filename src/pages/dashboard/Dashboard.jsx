import { useEffect, useState } from "react";
import "./Dashboard.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


export default function Dashboard() {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();


    const fetchData = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/employees/");
            setEmployees(res.data);
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleClick=(eid)=>{
         navigate('/editemployee/' + eid);
    }

    return (
        <>
            <h1>Dashboard</h1>
            <a href="/addemployee">Add New Employee</a>
            <table border="1">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Designation</th>
                        <th>Join Date</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((emp) => (
                        <tr key={emp.id}>
                            <td>{emp.name}</td>
                            <td>{emp.email}</td>
                            <td>{emp.department}</td>
                            <td>{emp.designation}</td>
                            <td>{emp.join_date}</td>
                            <td><button onClick={()=>handleClick(emp.id)}>Edit</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
