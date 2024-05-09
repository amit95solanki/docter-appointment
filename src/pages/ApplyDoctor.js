import React from 'react';

import { Col, Form, Input, Row, TimePicker, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import Button from '@mui/material/Button';
import { showLoading, hideLoading } from '../redux/features/alertSlice';

const ApplyDoctor = () => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        `https://docter-appointment-amit-backend.vercel.app/api/v1/user/apply-doctor`,
        {
          ...values,
          userId: user._id,
          timings: [moment(values.timings[0]).format('HH:mm'), moment(values.timings[1]).format('HH:mm')],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate('/');
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error('Somthing Went Wrrong ');
    }
  };
  return (
    <>
      <div style={{ margin: '10px' }}>
        <h1 className="text-center">Apply Doctor</h1>
        <Form layout="vertical" onFinish={handleFinish}>
          <h4 className="">Personal Details : </h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="First Name" name="firstName" required rules={[{ required: true }]}>
                <Input type="text" placeholder="your first name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Last Name" name="lastName" required rules={[{ required: true }]}>
                <Input type="text" placeholder="your last name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Phone No" name="phone" required rules={[{ required: true }]}>
                <Input type="text" placeholder="your contact no" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Email" name="email" required rules={[{ required: true }]}>
                <Input type="email" placeholder="your email address" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Website" name="website">
                <Input type="text" placeholder="your website" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Address" name="address" required rules={[{ required: true }]}>
                <Input type="text" placeholder="your clinic address" />
              </Form.Item>
            </Col>
          </Row>
          <h4>Professional Details :</h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Specialization" name="specialization" required rules={[{ required: true }]}>
                <Input type="text" placeholder="your specialization" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Experience" name="experience" required rules={[{ required: true }]}>
                <Input type="text" placeholder="your experience" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Fees Per Cunsaltation" name="feesPerCunsaltation" required rules={[{ required: true }]}>
                <Input type="text" placeholder="your contact no" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Timings" name="timings" required>
                <TimePicker.RangePicker format="HH:mm" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <p style={{ display: 'none' }}>space</p>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained" size="medium" type="submit" sx={{ marginTop: '38px' }}>
                  Submit
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default ApplyDoctor;
