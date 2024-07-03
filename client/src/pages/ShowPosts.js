import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import { Grid } from '@mui/material';
import moment from 'moment'
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function RecipeReviewCard() {

  const [allPosts, setAllPosts] = React.useState([]);

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


  return (
    <Grid container spacing={1} sx={{display: 'flex', alignItems:'center', justifyContent: 'center'}} >
    {
        allPosts.map((post)=>(
            <Grid key={post._id} item  sx={{gridColumn:'3', padding:'0px'}}>
            <Card sx={{ maxWidth: 320, maxHeight: 500, margin:4}}>
      <CardHeader
        avatar={
          <Avatar src={post.createdBy.profileImageURL} sx={{ bgcolor: red[500] }} aria-label="recipe">
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
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
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
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
