import { useState } from "react";
import "./Hrlogin.css";
import axios from 'axios';

export default function Hrlogin() {
    const [hr, setHr] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHr({ ...hr, [name]: value });
    };

    const handleSubmit = async () => {
        await axios.post(`http://localhost:8000/api/hrlogin/`, hr)
            .then((res) => {
                console.log(res.data.message);
                alert("Login Successful");
                window.location.href = "/dashboard";
            })
            .catch((error) => {
                console.error(error);
                alert("Invalid Credentials");
            });
    };


    return (
        <>
            <h1>HR Login Page</h1>
            <input
                name='email'
                value={hr.email}
                onChange={handleChange}
                placeholder="Enter Email"
            />
            <input
                name='password'
                value={hr.password}
                onChange={handleChange}
                placeholder="Enter Password"
                type="password"
            />
            <button type="submit" onClick={handleSubmit}>Login</button>
        </>
    );
}
