import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function LeaveRecord() {
    const { id } = useParams();
    const [leaverecord, setLeaverecord] = useState([]);

    const actualSl = 12;
    const actualCl = 16;

    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/leaverecords/${id}`);
            const updatedData = res.data.map(record => ({
                ...record,
                isEditing: false,
                tempSL: '',
                tempCL: ''
            }));
            setLeaverecord(updatedData);
        } catch (error) {
            console.error('Error fetching leave records:', error);
        }
    };

    const handleInputChange = (index, field, value) => {
        const updated = [...leaverecord];
        updated[index][field] = value === '' ? '' : Number(value);
        setLeaverecord(updated);
    };

    const toggleEdit = index => {
        const updated = [...leaverecord];
        updated[index].isEditing = !updated[index].isEditing;
        if (updated[index].isEditing) {
            updated[index].tempSL = '';
            updated[index].tempCL = '';
        }
        setLeaverecord(updated);
    };

    const handleSave = async index => {
        const record = leaverecord[index];
        const updatedSL = record.tempSL !== '' ? Number(record.tempSL) : record.sl;
        const updatedCL = record.tempCL !== '' ? Number(record.tempCL) : record.cl;

        try {
            await axios.put(`http://localhost:8000/api/updateleave/${record.id}/`, {
                sl: updatedSL,
                cl: updatedCL
            });

            const updated = [...leaverecord];
            updated[index].sl = updatedSL;
            updated[index].cl = updatedCL;
            updated[index].isEditing = false;
            updated[index].tempSL = '';
            updated[index].tempCL = '';
            setLeaverecord(updated);
        } catch (error) {
            console.error("Failed to update record", error);
        }
    };

    const totalSL = leaverecord.reduce((acc, record) => acc + Number(record.sl || 0), 0);
    const totalCL = leaverecord.reduce((acc, record) => acc + Number(record.cl || 0), 0);

    return (
        <div style={{ padding: '20px' }}>
            <h2>Leave Records</h2>
            {leaverecord.length === 0 ? (
                <p>No leave records found.</p>
            ) : (
                <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
                    <thead>
                        <tr>
                            <th>Month</th>
                            <th>SL Taken</th>
                            <th>CL Taken</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaverecord.map((record, index) => (
                            <tr key={record.id}>
                                <td>{record.month}</td>
                                <td>
                                    {record.isEditing ? (
                                        <input
                                            type="number"
                                            placeholder={record.sl}
                                            value={record.tempSL}
                                            onChange={e => handleInputChange(index, 'tempSL', e.target.value)}
                                            style={{ width: '60px' }}
                                        />
                                    ) : (
                                        record.sl
                                    )}
                                </td>
                                <td>
                                    {record.isEditing ? (
                                        <input
                                            type="number"
                                            placeholder={record.cl}
                                            value={record.tempCL}
                                            onChange={e => handleInputChange(index, 'tempCL', e.target.value)}
                                            style={{ width: '60px' }}
                                        />
                                    ) : (
                                        record.cl
                                    )}
                                </td>
                                <td>
                                    {record.isEditing ? (
                                        <button onClick={() => handleSave(index)}>Save</button>
                                    ) : (
                                        <button onClick={() => toggleEdit(index)}>Edit</button>
                                    )}
                                </td>
                            </tr>
                        ))}

                        <tr style={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>
                            <td>Total Taken</td>
                            <td>{totalSL}</td>
                            <td>{totalCL}</td>
                            <td></td>
                        </tr>

                        <tr style={{ fontWeight: 'bold', backgroundColor: '#e8f4f8' }}>
                            <td>Actual Allowed</td>
                            <td>{actualSl}</td>
                            <td>{actualCl}</td>
                            <td></td>
                        </tr>

                        <tr style={{ fontWeight: 'bold', backgroundColor: '#dff0d8' }}>
                            <td>Balance</td>
                            <td>{actualSl - totalSL}</td>
                            <td>{actualCl - totalCL}</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
}
