import React from 'react';
import { useUserContext } from '../context/ContextProvider';
import '../index.css';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const MyFavouritesPanel = () => {
  const {myFavourites, clearAllFavourites} = useUserContext();

  const renderFavourites = myFavourites.map((favourite, index) => (
    <Button key={index} variant="outlined" href={favourite.url} target="_blank" rel="noopener noreferrer" sx={{textTransform:"none", backgroundColor:"white", color:"black"}} >
      <Typography variant='body2'>{favourite.description}</Typography>
    </Button>)
  );

  return (
    <Grid container direction="column" spacing={2} >

      <Grid container spacing={1} className="custom-center" >
        <Grid size={8} >
          <Typography>My Favourites: {myFavourites.length}</Typography>
        </Grid>
        <Grid size={4} >
          <Button variant="contained" className='custom-full' onClick={() => clearAllFavourites()} >Clear</Button>
        </Grid>
      </Grid>

      <Stack spacing={2} className="my-favourites" >
        {renderFavourites}
      </Stack>

    </Grid>
  )
}

export default MyFavouritesPanel;