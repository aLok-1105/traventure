import { Avatar, Box, Button, Card, CardActions, CardHeader, CardMedia, Grid, IconButton } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import moment from 'moment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupsIcon from '@mui/icons-material/Groups';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './style.css'
// import Carousel from './Carosel';

export default function Home() {
  const [allPosts, setAllPosts] = useState([]);
  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get(
          'http://localhost:8000/post/getPost/?limit=3'
        );
        // console.log(res.data);
        setAllPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getPosts();
  }, []);



  return (
    <>
        <Box sx={{ textAlign:'center'}}>
        <Box sx={{height:'100vh'}}>
          <video 
            src='/home3.mp4' 
            autoPlay
            loop
            muted
            className='bg-video' />
        </Box>
        {/* //sx={{background:'url(/home3.jpg)', backgroundSize:'100vw 100vh', height:'100vh'}} */}
          <Box >
              <h1>
                Discover, Share, and Inspire Your Adventures!
              </h1>
              <Grid>
                <Button >Create Your Post</Button>
                <Button >Explore Destinations</Button>
              </Grid>
          </Box>
          <Box>
            <h1>
              Recent Posts
            </h1>
            <Grid container
            spacing={1}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              >
              {allPosts.map((post) => (
                <React.Fragment key={post._id}>
                <Grid
                item
                sx={{ gridColumn: '3', padding: '0px' }}>
                <Card sx={{ width: 320, margin: 4 }}>
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
                    subheader={moment(
                      post.createdAt
                    ).format('d MMM YYYY')}
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
                    // onClick = {()=>handleDeleteClick(post.createdBy._id, post._id)}
                    >
                      <DeleteIcon/>
                    </IconButton>
                      
                  </CardActions>
                </Card>
                </Grid>
                </React.Fragment>
              ))}
            </Grid>
          </Box>
        </Box>
    </>

  )
}
