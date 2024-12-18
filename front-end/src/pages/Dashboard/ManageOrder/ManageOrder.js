import { useOutletContext } from 'react-router-dom';
import  React, {  useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Orders from './Orders';
import NotificationBell from './NotificationBell';


export default function ManageOrder() {
  const { handleSetDashboardTitle } = useOutletContext();
  const [refreshOrders, setRefreshOrders] = useState(false);

  const refreshOrdersHandler = () => {
    setRefreshOrders(prev => !prev); 
  };
  React.useEffect(() => {
    handleSetDashboardTitle("Manage Order");
  }, [handleSetDashboardTitle])

  return (
    <>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <NotificationBell refreshOrders={refreshOrdersHandler} />
        <Orders refresh={refreshOrders} />
        </Paper>
      </Grid>
      <Grid item xs={12} sx={{
        position: 'fixed',
        bottom: 16,
        right: 30,
        display: 'flex',
        flexDirection: 'row',
        gap: 1,
      }}>
        {/* <AddOrder ></AddOrder>
        <DeletedOrder></DeletedOrder> */}
      </Grid >

    </>
  );
}