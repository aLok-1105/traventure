import { Box, Button, Grid, Input, TextField } from '@mui/material'
import React, { useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Container from '@mui/material/Container';
// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

export default function CreatePost() {
      
    const [formData, setFormData] = useState({});
    const handleChange = ((e)=>{
      setFormData({...formData, [e.target.name]:e.target.value})
    })

    const handleSubmit =async (e) => {
      e.preventDefault();
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
            <Grid container item xs={12} spacing={2}>
              <Grid item xs={8} style={{cursor:"pointer"}}>
                <Input type="file" name="imageURL" fullWidth  />
              </Grid>
              <Grid item xs={4}>
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  fullWidth
                >
                  Upload
                </Button>
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
