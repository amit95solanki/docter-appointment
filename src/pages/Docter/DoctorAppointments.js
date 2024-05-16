import React, { useState, useEffect } from 'react';

import axios from 'axios';

import moment from 'moment';
import { message, Table } from 'antd';
import { Button } from '@mui/material';

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const res = await axios.get(
        'https://docter-appointment-amit-backend.vercel.app/api/v1/doctor/doctor-appointments',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const handleStatus = async (record, status) => {
    try {
      const res = await axios.post(
        'https://docter-appointment-amit-backend.vercel.app/api/v1/doctor/update-status',
        { appointmentsId: record._id, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        getAppointments();
      }
    } catch (error) {
      console.log(error);
      message.error('Something Went Wrong');
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
    },
    {
      title: 'Date & Time',
      dataIndex: 'date',
      render: (text, record) => (
        <span>
          <span>{moment(record.date).format('DD-MM-YYYY')}</span> &nbsp;
          {moment(record.time).utcOffset('-05:30').format('HH:mm')}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <div className="d-flex">
          {record.status === 'pending' && (
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button variant="contained" onClick={() => handleStatus(record, 'approved')}>
                Approved
              </Button>
              <Button variant="contained" color="error" onClick={() => handleStatus(record, 'reject')}>
                Reject
              </Button>
            </div>
          )}
        </div>
      ),
    },
  ];
  return (
    <>
      <h1>Appoinmtnets Lists</h1>
      <Table columns={columns} dataSource={appointments} />
    </>
  );
};

export default DoctorAppointments;
