import React, { useState } from 'react';
import { useUserContext } from '../context/ContextProvider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ArticleIcon from '@mui/icons-material/Article';
import Snackbar from '@mui/material/Snackbar';
import Link from '@mui/material/Link';

const Header = () => {
  const {username, logout, page, setPage, searchTerm, setSearchTerm, setSearchResults, searchNews, resetSearch, setIsLoading} = useUserContext();
  const [errorMessage, setErrorMessage] = useState('');
  const [open, setOpen] = useState(false);

  function handleSearch() {
    if (searchTerm === "") {
      setErrorMessage("Search field cannot be empty.");
      setOpen(true);
      return
    }

    setIsLoading(true);
    setSearchResults([]);
    setPage(2);
    searchNews({searchTerm, page});
  }

  function handleHome() {
    resetSearch();
  }

  return (
    <Grid container spacing={2} className="custom-center">
      <Grid size={3}>
        <Link component="button" variant="h5" underline="none" onClick={() => handleHome()} >
          <ArticleIcon /> Find Your News
        </Link>
      </Grid>
      <Grid size={5}>
        <TextField  id="outlined-basic" label="Search for news" variant="outlined" className='custom-full' 
                    value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
      </Grid>
      <Grid size={1}>
        <Button variant="contained" className='custom-full' onClick={() => handleSearch()}>Search</Button>
      </Grid>
      <Grid size={2} sx={{justifyContent: 'end'}} >
        <Typography>{username}</Typography>
      </Grid>
      <Grid size={1}>
        <Button variant="contained" className='custom-full' onClick={() => logout()} >Logout</Button>
      </Grid>
      <Snackbar anchorOrigin={{vertical: "bottom", horizontal: "center"}} open={open} autoHideDuration={4000} onClose={() => setOpen(false)} message={errorMessage} />
    </Grid>
  ) 
}

export default Header;