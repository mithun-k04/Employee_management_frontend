import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    department: '',
    designation: '',
    join_date: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:8000/api/employees/${id}/`)
      .then(res => setEmployee(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/employees/${id}/`, employee);
      alert("Employee updated successfully!");
      navigate('/dashboard'); 
    } catch (err) {
      console.error(err);
      alert("Failed to update employee.");
    }
  };

  return (
    <>
      <h1>Edit Employee ID: {id}</h1>
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

        <button type="submit">Update Employee</button>
      </form>
    </>
  );
}
