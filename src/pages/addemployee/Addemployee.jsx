import "./Addemployee.css"
import {useState } from 'react';
import axios from 'axios';

export default function Addemployee() {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    department: '',
    designation: '',
    join_date: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8000/api/addemployee/`, employee);
      alert("Employee added successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to add employee.");
    }
  };

  return (
    <>
      <h1>AddeEmployee</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={employee.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <br />

        <input
          name="email"
          value={employee.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <br />

        <input
          name="department"
          value={employee.department}
          onChange={handleChange}
          placeholder="Department"
        />
        <br />

        <input
          name="designation"
          value={employee.designation}
          onChange={handleChange}
          placeholder="Designation"
        />
        <br />

        <input
          type="date"
          name="join_date"
          value={employee.join_date}
          onChange={handleChange}
          placeholder="Join Date"
        />
        <br />

        <button type="submit">Add Employee</button>
      </form>
    </>
  );
}
