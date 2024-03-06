import React from 'react';
import { AppBar, Badge, IconButton, MenuItem, Toolbar, Typography, Avatar, Menu, Popover, List, ListItem, ListItemText } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notifications, setNotifications] = React.useState([]); // State to store notifications
  const open = Boolean(anchorEl);

  // Function to handle click on notification icon
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    // Fetch notifications from the server or any other source
    // For demo, I'm just setting some sample notifications
    setNotifications([
      { id: 1, message: "Notification 1" },
      { id: 2, message: "Notification 2" },
      { id: 3, message: "Notification 3" },
    ]);
  };

  // Function to close the popover
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>Your Header</Typography>
        <MenuItem onClick={handleClick}>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={notifications.length} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </MenuItem>
        <MenuItem>
          <Avatar alt="User Avatar" src="/path/to/avatar.jpg" />
        </MenuItem>
      </Toolbar>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <List>
          {notifications.map((notification) => (
            <ListItem key={notification.id}>
              <ListItemText primary={notification.message} />
            </ListItem>
          ))}
        </List>
      </Popover>
    </AppBar>
  );
}

export default Header;
