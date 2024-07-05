import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import { Grid, Menu, MenuItem, Typography } from '@mui/material';
import moment from 'moment'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupsIcon from '@mui/icons-material/Groups';

export default function RecipeReviewCard() {

  const [allPosts, setAllPosts] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);

  React.useEffect(()=>{
    const getPosts = (async()=>{
        try {
            const res = await axios.get('http://localhost:8000/post/getPost')
            // console.log(res.data);
            setAllPosts(res.data);
        } catch (error) {
            console.log(error);
        }
    })

    getPosts();
    
  }, [])

  const handleMoreClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };



  return (
    <Grid container spacing={1} sx={{display: 'flex', alignItems:'center', justifyContent: 'center'}} >
    {
        allPosts.map((post)=>(
            <Grid key={post._id} item  sx={{gridColumn:'3', padding:'0px'}}>
            <Card sx={{ width: 320, margin:4}}>
      <CardHeader
        avatar={
          <Avatar src={post.createdBy.profileImageURL} sx={{ bgcolor: red[500] }} aria-label="recipe">
          </Avatar>
        }
        action={
          <>
            <IconButton aria-label="settings" onClick={handleMoreClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}><Typography component='a' href='#' sx={{textDecoration:'none'}}>Edit</Typography></MenuItem>
        <MenuItem onClick={handleClose}><Typography component='a' href='#' sx={{textDecoration:'none'}}>Delete</Typography></MenuItem>
      </Menu>
          </>
        }
        title={post.title}
        subheader={moment(post.createdAt).format("d MMM YYYY")}
      />
      
      <CardMedia
        component="img"
        height="194"
        image={post.imageURL}
        alt={post.imageURL}
      />
      {/* <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.description}
        </Typography>
      </CardContent> */}
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share" display='flex'>
          <GroupsIcon sx={{fontSize: '30px'}}/>
        </IconButton><span>{post.groupSize ? post.groupSize : 0}</span>
        <IconButton aria-label="share">
          <LocationOnIcon />
        </IconButton>{post.location.slice(0, 20)+'...'}
      </CardActions>
     
    </Card>
    </Grid>
        ))
    }
  </Grid>
  );
}
