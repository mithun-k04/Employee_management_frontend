import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Employeelogin() {
    const navigate = useNavigate()
    const [employee, setEmployee] = useState({
        email: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const handleSubmit = async () => {
        await axios.post(`http://localhost:8000/api/employeelogin/`, employee)
            .then((res) => {
                console.log(res.data.message);
                alert("Login Successful");
                navigate(`/empdashboard/${employee.email}`);
            })
            .catch((error) => {
                console.error(error);
                alert("Invalid Credentials");
            });
    };


    return (
        <>
            <h1>Employee Login Page</h1>
            <input
                name='email'
                value={employee.email}
                onChange={handleChange}
                placeholder="Enter Email"
            />
            <button type="submit" onClick={handleSubmit}>Login</button><br />

            <a href="/">I am a HR!</a>
        </>
    );
}
