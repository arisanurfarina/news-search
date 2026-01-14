import React, {useState} from 'react';
import { useUserContext } from '../context/ContextProvider';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';  
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';

const NewsItem = ({article}) => {
  const { myFavourites, addToFavourites } = useUserContext();
  const {title, publishedAt, urlToImage, description, url} = article;

  const isFave = myFavourites.some((item) => item.title === title);

  const [mouseHover, setMouseHover] = useState(false);

  return (
    <Grid size={3} maxHeight="500px" >
      <Card variant="outlined" className='news-card' onMouseOver={() => setMouseHover(true)} onMouseOut={() => setMouseHover(false)} >

        <CardHeader title={title} subheader={publishedAt} avatar={null} className='news-header' slotProps={{title: { variant: 'body1' }, subheader: { variant: 'body2' }}} />

        {!mouseHover && (
          <CardMedia component="img" height="194" image={urlToImage} alt={title} />
        )}
        
        <CardContent className='news-content'>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {description}
          </Typography>
        </CardContent>

        {mouseHover && (
          <CardContent>
            <Button variant="contained" href={url} target="_blank" rel="noopener noreferrer" sx={{width:"100%"}} >Read More</Button>
          </CardContent>
        )}
        
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" onClick={() => addToFavourites(article)}>
            <FavoriteIcon color={isFave ? "error" : "inherit"} />
          </IconButton>
        </CardActions>

      </Card>
    </Grid>
  )
}

export default NewsItem;