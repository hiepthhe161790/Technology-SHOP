import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Grid, MenuItem, Paper, InputAdornment, Dialog } from '@mui/material';
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
import { toast } from 'react-toastify';

const UpdateOrder = ({ orderId, open, onClose }) => {
  // const { orderId } = useParams();
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
    if (!contactInfo.name || !contactInfo.email || !contactInfo.phone || !contactInfo.address) {
      toast.error('All contact information fields are required.');
      return;
    }

    const updatedOrder = {
      orderStatus,
      paymentStatus,
      contactInfo
    };

    try {
      await OrderService.updateOrder(orderId, updatedOrder);
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

  // if (!order) return <Typography>Loading...</Typography>;

  return (
    <div>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        {/* <DialogTitle>Update Order</DialogTitle>
      <DialogContent></DialogContent> */}
        {/* <ToastContainer /> */}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Paper elevation={3} sx={{ p: 4, maxWidth: 600, width: '100%' }}>
            <Typography sx={{ mb: 4 }} variant="h4" gutterBottom>
              Update Order
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Order Status"
                  variant="outlined"
                  fullWidth
                  select
                  value={orderStatus}
                  onChange={(e) => setOrderStatus(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {getOrderStatusIcon(orderStatus)}
                      </InputAdornment>
                    ),
                  }}
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Processing">Processing</MenuItem>
                  <MenuItem value="Shipped">Shipped</MenuItem>
                  <MenuItem value="Delivered">Delivered</MenuItem>
                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                </TextField>
              </Grid>
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
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpdateOrder}
                >
                  Update Order
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Dialog>
    </div>
  );
};

export default UpdateOrder;
