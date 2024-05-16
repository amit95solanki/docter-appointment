import { useState } from 'react';
// @mui
import {
  Box,
  List,
  Badge,
  Button,
  Tooltip,
  Divider,
  Popover,
  Typography,
  IconButton,
  ListSubheader,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import axios from 'axios';
import { showLoading, hideLoading } from '../../../redux/features/alertSlice';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';

// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

  console.log('user', user);

  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        'https://docter-appointment-amit-backend.vercel.app/api/v1/user/get-all-notification',
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setTimeout(() => {
        window.location.reload();
      }, 300);

      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error('somthing went wrong');
    }
  };

  // delete notifications
  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        'https://docter-appointment-amit-backend.vercel.app/api/v1/user/delete-all-notification',
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setTimeout(() => {
        window.location.reload();
      }, 300);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error('Somthing Went Wrong In Ntifications');
    }
  };

  const totalUnRead = user?.notifcation?.length;
  const totalRead = user?.seennotification?.length;

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton color={open ? 'primary' : 'default'} onClick={handleOpen} sx={{ width: 40, height: 40 }}>
        <Badge badgeContent={totalUnRead} color="error">
          <Iconify icon="eva:bell-fill" />
        </Badge>
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 360,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {totalUnRead} unread messages
            </Typography>
          </Box>

          {/* {totalUnRead > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Iconify icon="eva:done-all-fill" />
              </IconButton>
            </Tooltip>
          )} */}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ height: { sm: 'auto' } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                New
              </ListSubheader>
            }
          >
            {user?.notifcation?.map((notification) => (
              <Box
                sx={{
                  margin: '10px 10px',
                  padding: '5px',
                  border: '1px solid gray',
                  borderRadius: '15px',
                  color: 'gray',
                }}
                onClick={() => navigate(notification.data.onClickPath)}
              >
                <Typography variant="button" display="block" gutterBottom>
                  {notification?.type}
                </Typography>
                <Typography sx={{ marginTop: '-10px' }} variant="caption" display="block" gutterBottom>
                  {notification?.message}
                </Typography>
              </Box>
            ))}
          </List>
        </Scrollbar>

        {/* <Divider sx={{ borderStyle: 'dashed' }} /> */}

        {user?.notifcation?.length > 0 && (
          <Box sx={{ p: 1 }}>
            <Button fullWidth disableRipple onClick={handleMarkAllRead}>
              Read ss All
            </Button>
          </Box>
        )}

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
              old
            </ListSubheader>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {totalRead} read messages
            </Typography>
          </Box>
        </Box>

        <Scrollbar sx={{ height: { sm: 'auto' } }}>
          <List disablePadding>
            {user?.seennotification?.map((notification) => (
              <Box
                sx={{
                  margin: '10px 10px',
                  padding: '5px',
                  border: '1px solid gray',
                  borderRadius: '15px',
                  color: 'gray',
                }}
                onClick={() => navigate(notification.data.onClickPath)}
              >
                <Typography variant="button" display="block" gutterBottom>
                  {notification?.type}
                </Typography>
                <Typography sx={{ marginTop: '-10px' }} variant="caption" display="block" gutterBottom>
                  {notification?.message}
                </Typography>
              </Box>
            ))}
          </List>
        </Scrollbar>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {user?.seennotification?.length > 0 && (
          <Box sx={{ p: 1 }}>
            <Button fullWidth disableRipple onClick={handleDeleteAllRead}>
              Delete All Read
            </Button>
          </Box>
        )}
      </Popover>
    </>
  );
}
