import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Grid, MenuItem, InputAdornment, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
// import { useParams } from 'react-router-dom';
import OrderService from '../../../services/api/OrderService';
import PendingIcon from '@mui/icons-material/HourglassEmpty';
import ProcessingIcon from '@mui/icons-material/Build';
import ShippedIcon from '@mui/icons-material/LocalShipping';
import DeliveredIcon from '@mui/icons-material/CheckCircle';
import CancelledIcon from '@mui/icons-material/Cancel';
import CompletedIcon from '@mui/icons-material/CheckCircleOutline';
import FailedIcon from '@mui/icons-material/ErrorOutline';
import RefundedIcon from '@mui/icons-material/Replay';
import { ToastContainer, toast } from 'react-toastify';

const UpdateOrder = ({ orderId, open, onClose }) => {
  const [order, setOrder] = useState(null);
  const [orderStatus, setOrderStatus] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    if (open) {
      const fetchOrder = async () => {
        const orderData = await OrderService.getOrderById(orderId);
        setOrder(orderData);
        setOrderStatus(orderData.orderStatus);
        setPaymentStatus(orderData.paymentStatus);
        setContactInfo(orderData.contactInfo);
      };
      fetchOrder();
    }
  }, [orderId, open]);

  const handleUpdateOrder = async () => {
    if (!contactInfo.name) {
      toast.error('Name is required.');
      return;
    }
    if (!contactInfo.email) {
      toast.error('Email is required.');
      return;
    }
    if (!contactInfo.phone) {
      toast.error('Phone is required.');
      return;
    }
    if (!contactInfo.address) {
      toast.error('Address is required.');
      return;
    }
    const updatedOrderData = {
      orderStatus,
      paymentStatus,
      contactInfo,
    };

    try {
      const response = await OrderService.updateOrder(orderId, updatedOrderData);
      toast.success('Order updated successfully');
      onClose();
    } catch (error) {
      toast.error('Error updating order');
    }
  };

  const handleContactInfoChange = (e) => {
    const { name, value } = e.target;
    setContactInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleOrderStatusChange = (e) => {
    const newStatus = e.target.value;
    if (newStatus === 'Cancelled') {
      if (!window.confirm('Are you sure you want to cancel this order?')) {
        return;
      }
    }
    setOrderStatus(newStatus);
  };

  const getOrderStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return <PendingIcon />;
      case 'Processing':
        return <ProcessingIcon />;
      case 'Shipped':
        return <ShippedIcon />;
      case 'Delivered':
        return <DeliveredIcon />;
      case 'Cancelled':
        return <CancelledIcon />;
      default:
        return null;
    }
  };

  const getPaymentStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return <PendingIcon />;
      case 'Completed':
        return <CompletedIcon />;
      case 'Failed':
        return <FailedIcon />;
      case 'Refunded':
        return <RefundedIcon />;
      default:
        return null;
    }
  };

  if (!order) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Update Order</DialogTitle>
      <DialogContent>
        <ToastContainer />
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Order Status"
                variant="outlined"
                fullWidth
                select
                value={orderStatus}
                onChange={handleOrderStatusChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {getOrderStatusIcon(orderStatus)}
                    </InputAdornment>
                  ),
                }}
              >
                <MenuItem value="Pending">Pending</MenuItem>
                {/* <MenuItem value="Processing">Processing</MenuItem>
                <MenuItem value="Shipped">Shipped</MenuItem>
                <MenuItem value="Delivered">Delivered</MenuItem> */}
                <MenuItem value="Cancelled">Cancelled</MenuItem>
              </TextField>
            </Grid>
            {orderStatus !== 'Pending' && (
              <Grid item xs={12}>
                <TextField
                  label="Payment Status"
                  variant="outlined"
                  fullWidth
                  select
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {getPaymentStatusIcon(paymentStatus)}
                      </InputAdornment>
                    ),
                  }}
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                  <MenuItem value="Failed">Failed</MenuItem>
                  <MenuItem value="Refunded">Refunded</MenuItem>
                </TextField>
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                name="name"
                value={contactInfo?.name}
                onChange={handleContactInfoChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                name="email"
                value={contactInfo?.email}
                onChange={handleContactInfoChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Phone"
                variant="outlined"
                fullWidth
                name="phone"
                value={contactInfo?.phone}
                onChange={handleContactInfoChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                variant="outlined"
                fullWidth
                name="address"
                value={contactInfo?.address}
                onChange={handleContactInfoChange}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleUpdateOrder} color="primary">Update Order</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateOrder;