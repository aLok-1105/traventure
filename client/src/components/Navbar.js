import * as React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
// import ToggleColorMode from './ToggleColorMode';
import { Avatar, IconButton, Menu, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { signoutSuccess } from '../redux/user/userSlice';
import { toast } from 'react-toastify';
import { toastStyle } from './toastStyle';
import { URL } from '../api';

const logoStyle = {
  width: '57px',
  height: 'auto',
  cursor: 'pointer',
};

function Navbar({ mode, toggleColorMode }) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user)

    const handleSignout = async () => {
    try {
      await axios.post(`${URL}/user/signout`, {}, { withCredentials: true });
      toast.success('Succesfully Signout', toastStyle)
      dispatch(signoutSuccess())
      navigate('/')

    } catch (error) {
      toast.warn(error.message, toastStyle)
      console.log(error.message);
    }
  };

  const [anchorElUser, setAnchorElUser] = React.useState(null);


  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };


  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              borderRadius: '999px',
              bgcolor:
                theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 0.4)'
                  : 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(24px)',
              maxHeight: 40,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow:
                theme.palette.mode === 'light'
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                ml: '-18px',
                px: 0,
              }}
            >
              <img
                onClick={()=>navigate('/')}
                src='/logo.png'
                style={logoStyle}
                alt="logo of sitemark"
                
              />
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <NavLink to='/post' style={{ textDecoration: 'NONE'}}>
                <MenuItem
                  sx={{ py: '6px', px: '12px',}}
                >
                  <Typography variant="body2" color="text.primary" sx={{textDecoration: 'none' }}>
                    Posts
                  </Typography>
                </MenuItem>
                </NavLink>
                <NavLink to='/about' style={{ textDecoration: 'NONE'}}>
                <MenuItem
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    About
                  </Typography>
                </MenuItem>
                  </NavLink>
                <NavLink to='/contact' style={{ textDecoration: 'NONE'}}>
                <MenuItem
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    Contact
                  </Typography>
                </MenuItem>
                </NavLink>
                
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 0.5,
                alignItems: 'center',
              }}
            >
              {/* <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} /> */}
              
              {
                currentUser ? (
                  <>
                 <Box sx={{ flexGrow: 0 }}>
                   <Tooltip title="Open settings">
                     <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                       <Avatar alt="Remy Sharp" src={currentUser.profileImageURL} />
                     </IconButton>
                   </Tooltip>
                   <Menu
                    sx={{ mt: '45px' }}
                    anchorEl={anchorElUser}
                    id="menu-appbar"
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <Link to='/dashboard' style={{ textDecoration: "none", color: "black" }}>
                      <MenuItem>
                        <Typography textAlign="center">Profile</Typography>
                      </MenuItem>
                    </Link>
                    <MenuItem onClick={handleSignout}>
                      <Typography textAlign="center">Signout</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              </>
                ) : (
                  <>
                  <Button
                color="primary"
                variant="text"
                size="small"
                component="a"
                href="/signin"
              >
                Sign in
              </Button>
              <Button
                color="primary"
                variant="contained"
                size="small"
                component="a"
                href="/signup"
                
              >
                Sign up
              </Button>
              </>
                )
              }
              
            </Box>
            <Box sx={{ display: { sm: '', md: 'none' } }}>
            {
                  currentUser && 
                  (<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                       <Avatar alt="Remy Sharp" src={currentUser.profileImageURL} />
                     </IconButton>)
                }
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: '30px', p: '4px' }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: '60dvw',
                    p: 2,
                    backgroundColor: 'background.paper',
                    flexGrow: 1,
                  }}
                >
                
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'end',
                      flexGrow: 1,
                    }}
                  >
                    {/* <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} /> */}
                  </Box>
                  <MenuItem component='a'
                  href='/post'>
                    Posts
                  </MenuItem>
                  <MenuItem component='a'
                  href='/about'>
                    About
                  </MenuItem>
                  <MenuItem component='a'
                  href='/contact'>
                    Contact
                  </MenuItem>
                  <Divider />
                  
                  {
                    currentUser ? (
                      <>
                      <MenuItem>
                    <Button
                      color="primary"
                      variant="contained"
                      component="a"
                      href="/dashboard"
                       
                      sx={{ width: '100%' }}
                    >
                      Profile
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="outlined"
                      onClick={handleSignout}
                       
                      sx={{ width: '100%' }}
                    >
                      Signout
                    </Button>
                  </MenuItem>
                      </>
                    )
                    : (
                      <>
                      <MenuItem>
                    <Button
                      color="primary"
                      variant="contained"
                      component="a"
                      href="/signup"
                       
                      sx={{ width: '100%' }}
                    >
                      Sign up
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="outlined"
                      component="a"
                      href="/signin"
                       
                      sx={{ width: '100%' }}
                    >
                      Sign in
                    </Button>
                  </MenuItem>
                  </>
                    )
                  }
                  
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

Navbar.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default Navbar;