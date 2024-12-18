import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
export default function NotificationBell({ userId }) {
    const [notifications, setNotifications] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        const socket = io("http://localhost:3333");

        // Tham gia phòng dựa trên userId
        socket.emit('joinRoom', userId);

        socket.on('orderUpdated', (order) => {
            setNotifications((prevNotifications) => [...prevNotifications, order]);
        });

        return () => {
            socket.disconnect();
        };
    }, [userId]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    console.log(notifications)
    return (
        <div>
            <IconButton color="inherit" onClick={handleClick}>
                <Badge badgeContent={notifications.length} color="secondary">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {notifications.length === 0 ? (
                    <MenuItem onClick={handleClose}>No new notifications</MenuItem>
                ) : (
                    notifications.map((notification, index) => (
                        <Link to={`/order-history`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Typography variant="body2">
                                {`Order ID: ${notification._id}, Status: ${notification.orderStatus}`}
                            </Typography>
                        </Link>
                    ))
                )}
            </Menu>
        </div>
    );
}
