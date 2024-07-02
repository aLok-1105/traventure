import React, { useEffect, useRef, useState } from 'react';
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
import { app } from '../firebase';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function DashProfile() {

    const dispatch = useDispatch();
    const [formData, setFormData] = useState({});
    const [img, setImg] = useState(null);
    const [imgFile, setImgFile] = useState(null);
    const [imgFileUrl, setImgFileUrl] = useState(null);
    const [imgUploading, setImgUploading] = useState(null);
    const [imgUploadError, setImgUploadError] = useState(null);
    const [imgUploadProgress, setImgUploadProgress] = useState(null);
    const filePickerRef = useRef();
    const { currentUser, loading, error } = useSelector((state) => state.user);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setImgFile(file);
            // console.log(imgFile.name);
            setImgFileUrl(URL.createObjectURL(file));
            console.log(imgFileUrl);
        }
        
    }

    useEffect(() => {
        if (imgFile) {
            uploadImage();
        }
    }, [imgFile]);


    const uploadImage = async () => {
        setImgUploading(true);
        setImgUploadError(null);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imgFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imgFile);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                setImgUploadProgress(progress.toFixed(0));
            },
            (error) => {
                setImgUploadError(
                    'Could not upload image (File must be less than 5MB)'
                );
                setImgUploadProgress(null);
                setImg(null);
                setImgFileUrl(null);
                setImgUploading(false);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImgFileUrl(downloadURL);
                      setFormData({ ...formData, profileImageURL: downloadURL });
                    setImgUploading(false);
                });
            }
        );
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.keys(formData).length === 0) {
            dispatch(updateFailure('No changes made'));
            return;
        }
        try {
            dispatch(updateStart());
            const res = await axios.put(`http://localhost:8000/user/update/${currentUser._id}`, formData, { withCredentials: true });
            // console.log(res.data);
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
            justifyContent="center" style={{ marginTop: '-50px', textAlign: 'center' }} >

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
                    <div style={{position: 'relative' }}>
                        <input hidden type='file' accept='image/*' onChange={handleImageChange} ref={filePickerRef} />
                        {
                            imgUploadProgress && (
                                <CircularProgressbar
                                    value={imgUploadProgress || 0}
                                    text={`${imgUploadProgress}%`}
                                    strokeWidth={5}
                                    styles={{
                                        root: {
                                            width: '100%',
                                            height: '100%',
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                        },
                                        path: {
                                            stroke: `rgba(62, 152, 199, ${imgUploadProgress / 100
                                                })`,
                                        },
                                    }}
                                />
                            )
                        }
                        <Avatar onClick={() => filePickerRef.current.click()} src={imgFileUrl || currentUser.profileImageURL} sx={{ width: 100, height: 100, m: 1, bgcolor: 'secondary.main' }}>
                        </Avatar>
                        </div>
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
                                    <Link to='/create-post'>
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
