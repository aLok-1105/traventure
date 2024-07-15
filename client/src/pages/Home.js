import { Avatar, Box, Button, Card, CardActions, CardHeader, CardMedia, Grid, IconButton, MobileStepper,  useMediaQuery } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import moment from 'moment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupsIcon from '@mui/icons-material/Groups';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './style.css'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { useTheme } from '@mui/material/styles';
import { URL } from '../api';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
// import Carousel from './Carosel';

export default function Home() {
  const [allPosts, setAllPosts] = useState([]);
  const theme = useTheme();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user)

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get(
          `${URL}/post/getPost/?limit=9`
        );
        // console.log(res.data);
        setAllPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getPosts();
  }, []);

  const [activeStep, setActiveStep] = React.useState(0);
  // const maxSteps = allPosts.length;

  
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  let postsPerPage = 1;
  if (isMediumScreen) {
    postsPerPage = 2;
  } else if (isLargeScreen) {
    postsPerPage = 3;
  }
  const maxSteps = Math.ceil(allPosts.length / postsPerPage);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };



  return (
    <div>
        <Box >
        <Box sx={{height:'100vh'}}>
          <video 
            src='/home3.mp4' 
            autoPlay
            loop
            muted
            className='bg-video' />
        </Box>
        {/* //sx={{background:'url(/home3.jpg)', backgroundSize:'100vw 100vh', height:'100vh'}} */}
          <Box className='hero-content'>
              <h1 className='hero-head'>
                Discover, Share, and Inspire Your Adventures!
              </h1>
              <Grid>
                <Button onClick={() => navigate(currentUser ? '/create-post' : '/signin')} className='hero-btn-1'>Create Your Post</Button>
                <Button className='hero-btn-2' onClick={() =>navigate('/post') }>Explore Destinations</Button>
              </Grid>
          </Box>
          <Box className='recent-post'>
            <h1 className='recent-post-head'>
              Recent Posts
            </h1>

            {/* <Grid container
            spacing={1}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              > */}
                {/* <AutoPlaySwipeableViews
                  axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                  index={activeStep}
                  onChangeIndex={handleStepChange}
                  enableMouseEvents
                > */}
                <AutoPlaySwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {Array.from({ length: maxSteps }).map((_, index) => (
              <Grid
                container
                spacing={2}
                justifyContent="center"
                key={index}
              >
                {allPosts.slice(index * postsPerPage, index * postsPerPage + postsPerPage).map((post) => (
                  <Grid item key={post._id} xs={12} sm={6} md={4} sx={{
                    display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'}}> 
                  <Card sx={{ width: 320, mt:3, mb:3, ml:1, mr:1 }}>
                <CardHeader
                  avatar={
                    <Avatar
                      src={
                        post.createdBy
                          .profileImageURL
                      }
                      sx={{
                        // bgcolor: red[500],
                      }}
                      aria-label='recipe'></Avatar>
                  }
                  action={
                    <>
                      <IconButton
                        aria-label='settings'
                        // onClick = {()=>handleEditClick(post.createdBy._id, post._id)}
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
                  <IconButton aria-label='share'
                   //onClick = {()=>handleDeleteClick(post.createdBy._id, post._id)}
                   >
                    <DeleteIcon/>
                  </IconButton>
                    
                </CardActions>
              </Card>
                  </Grid>
                ))}
              </Grid>
            ))}
          </AutoPlaySwipeableViews>
          <MobileStepper
            steps={maxSteps}
            position="static"
            activeStep={activeStep ? activeStep : 0}
            sx={{backgroundColor:'rgb(255 255 255 / 0%) !important'}}
            nextButton={
              <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                Next
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
              </Button>
            }
            backButton={
              <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                Back
              </Button>
            }
          />
            
          </Box>
        </Box>
    </div>

  )
}
