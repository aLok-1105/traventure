import { Box, Button, CircularProgress, Grid, Input, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Container from '@mui/material/Container';
// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';

export default function CreatePost() {
      
    const [formData, setFormData] = useState({});
    const [imgFile, setImgFile] = useState(null);
    const [imgFileUrl, setImgFileUrl] = useState(null);
    const [imgUploading, setImgUploading] = useState(false);
    const [imgUploadError, setImgUploadError] = useState(null);
    const [imgUploadProgress, setImgUploadProgress] = useState(null);

    const handleChange = ((e)=>{
      setFormData({...formData, [e.target.name]:e.target.value})
    })



    const handleUpload = async () => {
      try {
        if(!imgFile){
          setImgUploadError("Please Select an Image");
          setImgUploading(true);
        }
        setImgUploadError(null);
        setImgUploading(true);
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
                setImgFileUrl(null);
                setImgUploading(false);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImgFileUrl(downloadURL);
                    console.log(downloadURL);
                    setFormData({ ...formData, imageURL: downloadURL });
                    setImgUploading(false);
                });
            }
        );
        }
        catch (error) {
        setImgUploadError("Image Upload Error");
        setFormData({ ...formData, imageURL: null });
      }
        
    };

    

    const handleSubmit =async (e) => {
      e.preventDefault();
      console.log(formData);
      if(!formData.title || !formData.location || !formData.budget ||  !formData.days  || !formData.description){
        alert("Please fill all the fields")
      }
      else{
        try {
          const res = await axios.post('http://localhost:8000/post/create', {formData}, {withCredentials: true })
          console.log(res);
        } catch (error) {
          console.log("error", error);
        }
      }
    }



  return (
    <>
        <Container component="main" maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <h1>Create Post</h1>
        <Box width="100%" component="form" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField 
              label="Title" 
              fullWidth 
              name="title"
              required
              id="title"
              autoFocus
              onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
            <TextField 
              label="Location" 
              fullWidth 
              name="location"
              required
              id="location"
              onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
            <TextField 
              label="Budget" 
              fullWidth 
              name="budget"
              required
              id="budget"
              onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
            <TextField 
              label="Days" 
              fullWidth 
              name="days"
              required
              id="days"
              onChange={handleChange}
              />
            </Grid>
            <Grid container item xs={12} spacing={2} style={{display:"flex", alignItems:"center"}}>
              <Grid item xs={7} style={{cursor:"pointer"}}>
                <Input type="file" name="imageURL" accept='image/*' fullWidth onChange={(e)=>setImgFile( e.target.files[0])} />
              </Grid>
              <Grid item xs={4}>
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  fullWidth
                  onClick={handleUpload}
                >
                  Upload
                </Button>
                
              </Grid>
              <Grid item xs={1} style={{paddingLeft: "3px"}}>
              {
                  imgUploadProgress ? (
                    
                    <CircularProgressbar
                      value={imgUploadProgress}
                      text = {`${imgUploadProgress || 0}%`}
                      />
                      
                  )
                  :(
                    <CircularProgressbar
                      value={imgUploadProgress}
                      text = {`${imgUploadProgress || 0}%`}
                      />
                  )
                }
                </Grid>
            </Grid>
            <Grid item xs={12}>
              {/* <ReactQuill theme="snow" style={{ height: '200px', cursor: 'text' }} onChange={(val)=>{setFormData({...formData, description: val})} }/>  */}
              <TextField 
              label="Description" 
              fullWidth 
              name="description"
              required
              id="description"
              onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
            <Button
                  type = "submit"
                  variant="contained"
                  fullWidth
                  disabled={imgUploading}
                >
                  Submit
            </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
    </>
  )
}
