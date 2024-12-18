import React, {useState} from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Box, Typography, Button } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import UpdateOrder from '../Dashboard/ManageOrder/UpdateOrder';
const OrderTable = ({ orders, handleOpen }) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const openUpdateModal = (orderId) => {
    setSelectedOrderId(orderId);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setSelectedOrderId(null);
    setIsUpdateModalOpen(false);
  };
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Room</TableCell>
            <TableCell>Contact Info</TableCell>
            <TableCell>Total Price</TableCell>
            <TableCell>Order Status</TableCell>
            <TableCell>Payment Status</TableCell>
            <TableCell>View Details</TableCell>
            <TableCell>Active</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell>
                <Box display="flex" flexDirection="column">
                  <Typography>{order?.items[0]?.productId?.name}</Typography>
                  {order.items.length > 1 && (
                    <Button size="small" onClick={() => handleOpen(order)}>View More Products</Button>
                  )}
                </Box>
              </TableCell>
              <TableCell>
                {order?.contactInfo
                  ? `${order.contactInfo.name}, ${order.contactInfo.email}, ${order.contactInfo.phone}, ${order.contactInfo.address}`
                  : 'N/A'}
              </TableCell>
              <TableCell>{order.totalPrice}đ</TableCell>
              <TableCell>{order.orderStatus}</TableCell>
              <TableCell>{order.paymentStatus}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleOpen(order)}>
                  <Visibility />
                </IconButton>
              </TableCell>
              <IconButton onClick={() => openUpdateModal(order._id)}>
                  Edit Booking
                </IconButton>
              <UpdateOrder orderId={selectedOrderId} open={isUpdateModalOpen} onClose={closeUpdateModal} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
    </TableContainer>
  );
};

export default OrderTable;
