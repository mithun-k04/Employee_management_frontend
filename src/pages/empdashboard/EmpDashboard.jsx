import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function EmpDashboard() {
    const { email } = useParams();
    const [leaverecord, setLeaverecord] = useState([]);

    const actualSl = 12;
    const actualCl = 16;

    useEffect(() => {
        fetchData();
    }, [email]);

    const fetchData = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/leaverecord/${email}`);
            setLeaverecord(res.data);
        } catch (error) {
            console.error('Error fetching leave records:', error);
        }
    };

    const totalSL = leaverecord.reduce((acc, record) => acc + Number(record.sl || 0), 0);
    const totalCL = leaverecord.reduce((acc, record) => acc + Number(record.cl || 0), 0);

    return (
        <div style={{ padding: '20px' }}>
            <h2>Leave Records for: {email}</h2>
            {leaverecord.length === 0 ? (
                <p>No leave records found.</p>
            ) : (
                <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
                    <thead>
                        <tr>
                            <th>Month</th>
                            <th>SL Taken</th>
                            <th>CL Taken</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaverecord.map((record, index) => (
                            <tr key={record.id}>
                                <td>{record.month}</td>
                                <td>{record.sl}</td>
                                <td>{record.cl}</td>
                            </tr>
                        ))}

                        <tr style={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>
                            <td>Total Taken</td>
                            <td>{totalSL}</td>
                            <td>{totalCL}</td>
                        </tr>

                        <tr style={{ fontWeight: 'bold', backgroundColor: '#e8f4f8' }}>
                            <td>Actual Allowed</td>
                            <td>{actualSl}</td>
                            <td>{actualCl}</td>
                        </tr>

                        <tr style={{ fontWeight: 'bold', backgroundColor: '#dff0d8' }}>
                            <td>Balance</td>
                            <td>{actualSl - totalSL}</td>
                            <td>{actualCl - totalCL}</td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
}
