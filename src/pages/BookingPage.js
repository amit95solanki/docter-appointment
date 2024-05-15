import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { DatePicker, message, TimePicker } from 'antd';
import moment from 'moment';
import {
  CardActionArea,
  Typography,
  CardContent,
  Card,
  Box,
  Divider,
  Grid,
  Paper,
  styled,
  Button,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState('');
  const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState(false);
  const dispatch = useDispatch();
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  // login user data
  const getUserData = async () => {
    try {
      const res = await axios.post(
        'https://docter-appointment-amit-backend.vercel.app/api/v1/doctor/getDoctorById',
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handle availibility
  const handleAvailability = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        'https://docter-appointment-amit-backend.vercel.app/api/v1/user/booking-availbility',
        { doctorId: params.doctorId, date, time },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        setIsAvailable(true);
        console.log(isAvailable);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  // booking function
  const handleBooking = async () => {
    try {
      setIsAvailable(true);
      if (!date && !time) {
        alert('Date & Time Required');
        return; // Ensure to return after showing the alert
      }
      dispatch(showLoading());
      const res = await axios.post(
        'https://docter-appointment-amit-backend.vercel.app/api/v1/user/book-appointment',
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctors,
          userInfo: user,
          date,
          time,
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
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line
  }, []);

  return (
    <Box sx={{ border: '2px solid gray', borderRadius: '15px', padding: '20px 5px' }}>
      <Typography variant="h6" gutterBottom textAlign={'center'} marginBottom={'20px'}>
        Booking Page
      </Typography>
      <div className="container m-2">
        {doctors && (
          <div>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={12} md={12} lg={4}>
                <Item>
                  <Box display={'flex'} gap={'10px'} justifyContent={'space-around'}>
                    <Typography variant="subtitle2" gutterBottom>
                      Docter Name :
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Dr.{doctors.firstName} {doctors.lastName}
                    </Typography>
                  </Box>
                </Item>
              </Grid>
              <Grid item xs={12} md={12} lg={4}>
                <Item>
                  <Box display={'flex'} gap={'10px'} justifyContent={'space-around'}>
                    <Typography variant="subtitle2" gutterBottom>
                      Fees :
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {doctors.feesPerCunsaltation}
                    </Typography>
                  </Box>
                </Item>
              </Grid>
              <Grid item xs={12} md={12} lg={4}>
                <Item>
                  <Box display={'flex'} gap={'10px'} justifyContent={'space-around'}>
                    <Typography variant="subtitle2" gutterBottom>
                      Timings
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {doctors.timings && doctors.timings[0]} - {doctors.timings && doctors.timings[1]}
                    </Typography>
                  </Box>
                </Item>
              </Grid>
              <Grid item xs={12} md={12} lg={6}>
                <Item sx={{ display: 'flex', justifyContent: 'space-around' }}>
                  <DatePicker
                    aria-required="true"
                    className="m-2"
                    format="DD-MM-YYYY"
                    onChange={(value) => {
                      setDate(moment(value).format('DD-MM-YYYY'));
                    }}
                  />
                  <TimePicker
                    aria-required="true"
                    format="HH:mm"
                    className="mt-3"
                    onChange={(value) => {
                      setTime(moment(value).format('HH:mm'));
                    }}
                  />
                </Item>
              </Grid>

              <Grid item xs={12} md={12} lg={6}>
                <Item>
                  <Box display={'flex'} gap={'10px'} justifyContent={'space-around'}>
                    <Button variant="contained" color="info" onClick={handleAvailability}>
                      Check Availability
                    </Button>
                    <Button variant="contained" color="success" onClick={handleBooking}>
                      Book Now
                    </Button>
                  </Box>
                </Item>
              </Grid>
            </Grid>
          </div>
        )}
      </div>
    </Box>
  );
};

export default BookingPage;
