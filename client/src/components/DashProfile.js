import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { updateFailure, updateStart, updateSuccess } from '../redux/user/userSlice';
import { Alert, CircularProgress } from '@mui/material';
import { ClassNames } from '@emotion/react';
import { Link } from 'react-router-dom';

export default function DashProfile() {

    const dispatch = useDispatch();
    const [formData, setFormData] = useState({});
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };
    const { currentUser, loading, error } = useSelector((state) => state.user);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.keys(formData).length === 0) {
            dispatch(updateFailure('No changes made'));
            return;
        }
        try {
            dispatch(updateStart());
            const res = await axios.put(`http://localhost:8000/user/update/${currentUser._id}`, formData, { withCredentials: true });
            console.log(res.data);
            dispatch(updateSuccess(res.data));
        } catch (error) {
            dispatch(updateFailure(error.message));
        }
    }
    
    const defaultTheme = createTheme();


    return (
        <Grid container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center" style={{ marginTop: '-50px', textAlign:'center' }} >
            
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar src='#' sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            {/* <LockOutlinedIcon /> */}
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            {currentUser.fullName}
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="fullName"
                                        label="Name"
                                        name="fullName"
                                        defaultValue={currentUser.fullName}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        defaultValue={currentUser.email}
                                        onChange={handleChange}
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
                                        onChange={handleChange}
                                        autoComplete="new-password"
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        disabled={loading}
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        {loading ? <CircularProgress size={24} className={ClassNames.buttonProgress} /> : 'Update'}
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Link to = '/create-post'>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                        Create Post
                                        </Button>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    {error && (
                        <Alert variant="filled" severity="error">
                            {error}
                        </Alert>
                    )}
                </Container>
            </ThemeProvider>
        </Grid>
    );
}
