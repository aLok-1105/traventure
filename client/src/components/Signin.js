
import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice';
import { Alert, CircularProgress } from '@mui/material';
import { ClassNames } from '@emotion/react';

export default function Signin() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const {loading, error} = useSelector((state)=>state.user);

    const handleSubmit = async (e) => {
      if(!email || !password){
        return dispatch(signInFailure('Please fill all the fields'));
      }
      e.preventDefault();
      try {
          dispatch(signInStart());
          const res = await axios.post('http://localhost:8000/user/signin', {email, password }, {withCredentials: true });
          // console.log(res.data);
          dispatch(signInSuccess(res.data));
          navigate('/')
        } catch (error) {
          console.log("error", error.message);
          dispatch(signInFailure(error.message));
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
            Sign In
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value = {email}
                  onChange = {(e) => setEmail(e.target.value)}
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
                  value = {password}
                  onChange={(e)=>setPassword(e.target.value)}
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
            {loading ? <CircularProgress size={24} className={ClassNames.buttonProgress} /> : 'Sign In'}
              
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signup" variant="body2">
                  Don't have an account? Sign up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
      {
        error && (<Alert variant="filled" severity="error" >
        {error}
      </Alert>)
      }
    </ThemeProvider>
    </div>
  )
}
