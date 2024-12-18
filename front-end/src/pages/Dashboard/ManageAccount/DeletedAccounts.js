import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Title';
import Tooltip from '@mui/material/Tooltip';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import UserService from '../../../services/api/UserService';
export default function DeletedAccounts({ userData, handleSetUserData }) {

  const handleRecoverUser = async (userId) => {
    const newUserData = userData.filter(item => item._id !== userId);
    handleSetUserData(newUserData);
    await UserService.recoverSoftDeletedUser(userId)
  }

  return (
    <React.Fragment>
      <Title>USERS</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>PhoneNumber</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>OTP</TableCell>
            <TableCell>OTP Expires Date</TableCell>
            <TableCell align="right">Verified</TableCell>
            <TableCell>Tool</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userData && userData.length > 0 && userData?.map((user) => (
            <TableRow style={{ cursor: 'pointer' }} key={user._id}>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.fullName}</TableCell>
              <TableCell>{user.address}</TableCell>
              <TableCell>{user.phoneNumber}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.otp}</TableCell>
              <TableCell>{user.otpExpires}</TableCell>
              <TableCell align="right">{user.isVerified?.toString()}</TableCell>
              <TableCell>
                <Tooltip title="Recover">
                  <ChangeCircleIcon color='primary' size="small" onClick={() => handleRecoverUser(user._id)}></ChangeCircleIcon>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
