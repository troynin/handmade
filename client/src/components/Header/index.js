import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router';
import { 
  AppBar, 
  Toolbar, 
  Button, 
  Typography, 
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';

export function Header() {
  const { authToken, user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Магазин игрушек
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button color="inherit" component={RouterLink} to="/">
            Каталог
          </Button>
          
          {authToken ? (
            <>
              <IconButton
                size="large"
                onClick={handleMenu}
                color="inherit"
                sx={{ p: 0 }}
              >
                <Avatar alt={user?.name} src="/static/images/avatar/2.jpg" />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => navigate('/admin')}>Админка</MenuItem>
                <MenuItem onClick={logout}>Выйти</MenuItem>
              </Menu>
            </>
          ) : (
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/login"
              variant="outlined"
            >
              Войти
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}