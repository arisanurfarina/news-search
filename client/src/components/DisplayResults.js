import React from 'react';
import { useUserContext } from '../context/ContextProvider';
import NewsItem from './NewsItem';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

const DisplayResults = () => {
  const {isError, searchResults, searchTerm, searchNews, page, setPage, isLoading} = useUserContext();

  function handleMoreSearch() {
    setPage(prev => prev + 1);
    searchNews({searchTerm, page});
  }

  const DisplayBox = ({content}) => {
    return (
      <Grid container direction="column" className="display-box" sx={{width: "100%", height:"100%", color:"white",justifyContent: "center",alignItems:"center"}} >
        {content}
      </Grid>
    )
  }

  const DisplayNewsItems = () => {
    console.log(page);
    return (
      <Grid container direction="column" spacing={2} >
        <Grid container spacing={2} >
          {searchResults.map((article, index) => (<NewsItem key={index} article={article} />))}
        </Grid>
        <Button variant="contained" onClick={() => handleMoreSearch()} >Load More</Button>
      </Grid>
    )
  }

  return (
    <>
      {
        isLoading ? <DisplayBox content={<CircularProgress color='white' />} /> :
        isError ? <DisplayBox content={<Typography variant='h5'>Please try a different search.</Typography>} /> :
        searchResults.length > 0 ? <DisplayNewsItems /> :
        <DisplayBox content={<Typography variant='h5'>Please search for your favourite topic to get started.</Typography>} />
      }
    </>
  )
}

export default DisplayResults;