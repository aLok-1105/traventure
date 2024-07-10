/** @format */

import React, {useRef, useState} from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';
import {
  Alert,
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  Grid,
  Input,
  TextField,
} from '@mui/material';
import moment from 'moment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupsIcon from '@mui/icons-material/Groups';
import { useSelector } from 'react-redux';
import { CircularProgressbar } from 'react-circular-progressbar';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';

export default function RecipeReviewCard() {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(true);
  const videoRef = useRef(null);
  const { currentUser } = useSelector((state) => (state.user));
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});
  const [imgFile, setImgFile] = useState(null);
  const [imgFileUrl, setImgFileUrl] = useState(null);
  const [imgUploading, setImgUploading] = useState(false);
  const [imgUploadError, setImgUploadError] = useState(null);
  const [imgUploadProgress, setImgUploadProgress] = useState(null);


  const [clickedId, setClickedId] = useState(null);


  const handleChange = (e)=>{
    setFormData({...formData, [e.target.name]: e.target.value});
  }
  const handleSubmit = async (id) => {

      try {
        
        await axios.put(`http://localhost:8000/post/update/${id}`, formData, {withCredentials: true });
        setClickedId(null);

      } catch (error) {
        console.log("error", error);
      }
  };

  const handleEditClick = (id, post_id)=>{
    if(currentUser._id === id){
      console.log(post_id);
      setClickedId(post_id)
    }
    else{
      setError('Unauthorize');
    }
  }


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
      setFormData({ ...formData, imageURL: imgFileUrl });
    }
      
  };

  const handleClose = () => {
    setClickedId(null)
  };

  const handleDeleteClick = async (id, postId)=>{
    if(id === currentUser._id){
      try {
        await axios.delete(`http://localhost:8000/post/deletePost/${postId}`);
        window.location.reload();
      } catch (error) {
        setError(error.message);
      }
    }
    else{
      setError('Unauthorize')
    }
  }

  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 2.0;
    }
  }, []);

  React.useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get(
          'http://localhost:8000/post/getPost'
        );
        // console.log(res.data);
        setAllPosts(res.data);
        if (res.data.length < 9) {
          setShowMore(false);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getPosts();
  }, []);


  const handleShowMore = async (e) => {
    const startIndex = allPosts.length;
    try {
      const res = await axios.get(
        `http://localhost:8000/post/getPost?startIdx=${startIndex}`
      );
      // console.log(res.data);
      setAllPosts((prev) => [...prev, ...res.data]);
      
      if (res.data.length < 9) {
        setShowMore(false);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      {loading ? (
        <Grid
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            width: '100%',
            overflow: 'hidden',
          }}>
          <video
            
            src='/Logo.mp4'
            autoPlay
            loop
            muted
            style={{
              width: '150px',
              height: '150px',
            }}
          />
        </Grid>
      ) : (
        <Grid

          container
          spacing={1}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          marginTop:'100px'
          }}>
          
          {allPosts.map((post) => (
            <React.Fragment key={post._id}>
            <Grid
              
              item
              sx={{ gridColumn: '3', padding: '0px' }}>
              <Card sx={{ width: 320, mt:3, mb:3, ml:1, mr:1 }}>
                <CardHeader
                  avatar={
                    <Avatar
                      src={
                        post.createdBy
                          .profileImageURL
                      }
                      sx={{
                        bgcolor: red[500],
                      }}
                      aria-label='recipe'></Avatar>
                  }
                  action={
                    <>
                      <IconButton
                        aria-label='settings'
                        onClick = {()=>handleEditClick(post.createdBy._id, post._id)}
                        >
                        
                        <EditIcon/>
                        
                      </IconButton>
                    </>
                  }
                  title={post.title}
                  subheader={moment(post.updatedAt).format('MMMM Do YYYY')}
                  // subheader={post.createdAt}
                />

                <CardMedia
                  component='img'
                  height='194'
                  image={post.imageURL}
                  alt={post.imageURL}
                />
                <CardActions disableSpacing sx={{display: 'flex', justifyContent:'space-between'}}>
                  <IconButton aria-label='add to favorites'>
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton
                    aria-label='share'
                    display='flex'>
                    <GroupsIcon
                      sx={{ fontSize: '30px' }}
                    />
                  </IconButton>
                  <span>
                    {post.groupSize
                      ? post.groupSize
                      : 0}
                  </span>
                  <IconButton aria-label='share'>
                    <LocationOnIcon />
                  </IconButton>
                  {post.location.length< 20 ?  post.location : post.location.slice(0, 20)+
                    '...'}
                  <IconButton aria-label='share' onClick = {()=>handleDeleteClick(post.createdBy._id, post._id)}>
                    <DeleteIcon/>
                  </IconButton>
                    
                </CardActions>
              </Card>
              <Dialog
                  open={clickedId===post._id}
                  onClose={handleClose}
                  >
                  {/* <DialogTitle>{post.title}</DialogTitle> */}
                  <DialogContent>
                  <Container component="main" maxWidth="sm">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <h1>Edit Post </h1>
          <Box width="100%" component="form" noValidate onSubmit={(e)=>{
            e.preventDefault();
            handleSubmit( post._id)}
            } >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField 
                label="Title" 
                fullWidth 
                name="title"
                required
                id="title"
                autoFocus
                defaultValue={post.title}
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
                defaultValue={post.location}
                onChange={handleChange}
                />
                
              </Grid>
              <Grid item xs={4}>
              <TextField 
                label="Budget" 
                fullWidth 
                name="budget"
                required
                id="budget"
                defaultValue={post.budget}
                onChange={handleChange}
                />
                
              </Grid>
              <Grid item xs={4}>
              <TextField 
                label="No. of travellers" 
                fullWidth 
                name="groupSize"
                required
                id="groupSize"
                defaultValue={post.groupSize}
                onChange={handleChange}
                />
                
              </Grid>
              <Grid item xs={4}>
              <TextField 
                label="Days" 
                fullWidth 
                name="days"
                required
                id="days"
                defaultValue={post.days}
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
                defaultValue={post.description}
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
              {
                imgUploadError && (
                  <Alert variant="filled" severity="error">{imgUploadError || error}</Alert>
                )
              }
            </Grid>
          </Box>
        </Box>
      </Container>
                   
                  </DialogContent>
                  
                </Dialog>
            </Grid>
</React.Fragment>
          ))}
          {showMore && allPosts.length > 0 ? (
            <>
              <div
                style={{
                  width: '100%',
                  textAlign: 'center',
                }}>
                <Button onClick={handleShowMore}>
                  Show More
                </Button>
              </div>
            </>
          ) : (
            <></>
          )}
          {/* {
            currentUser && (
              <>
                
              </>
            )
          } */}
        </Grid>
      )}
    </>
  );
}
