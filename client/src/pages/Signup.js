
import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { ClassNames } from '@emotion/react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { toastStyle } from '../components/toastStyle';
import { URL } from '../api';


export default function Signup() {
    const {loading} = useSelector((state)=>state.user);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
        if(!fullName || !email || !password){
          return toast.warn('Please fill all the fields', toastStyle)
        }
        try {
            const res = await axios.post(`${URL}/user/signup`, { fullName, email, password }, {withCredentials: true });
            if(res.status === 201){
              toast.success('Successfully Registered', toastStyle)
              navigate('/')
            }
            else {
              return toast.error(res.data, toastStyle);
            }
            navigate('/signin')
          } catch (error) {
            return toast.error('Email Exists', toastStyle);
        }
      };

    const defaultTheme = createTheme();

  return (
    <div>
        <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" sx={{marginTop:'100px'}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                    autoComplete="given-fullName"
                    name="fullName"
                    required
                    fullWidth
                    id="fullName"
                    label="Full Name"
                    autoFocus
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    margin="normal"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled = {loading}
              sx={{ mt: 3, mb: 2 }}
            >
            {loading ? <CircularProgress size={24} className={ClassNames.buttonProgress} /> : 'Sign Up'}
              
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
              <Typography variant="body2">
                <Link to="/signin">
                Already have an account? Sign in
                </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      {/* {
        error && (<Alert variant="filled" severity="error" >
        {error}
      </Alert>)
      } */}
      
    </ThemeProvider>
    </div>
  )
}
