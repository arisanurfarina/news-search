import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/ContextProvider';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ArticleIcon from '@mui/icons-material/Article';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';

const Login = () => {
  const {isLoggedIn, login} = useUserContext();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoginInProgress, setIsLoginInProgress] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (username === "" && password === "") {
      setErrorMessage("All the fields are mandatory!");
      return
    }

    setIsLoginInProgress(true);
    login({username, password, setErrorMessage});
    setIsLoginInProgress(false);
  }

  useEffect(() => {
    if (isLoggedIn) {
      return navigate("/home");
    }
  }, [isLoggedIn]);

  return (
    <Container maxWidth="lg" className="login-container" > 
      <Box component="form" onSubmit={handleSubmit} className="box" sx={{width:"400px", backgroundColor:"white"}} >
        <Typography variant="h3"><ArticleIcon fontSize="large" /> Find Your News</Typography>
        <TextField id="outlined-basic" label="Username" variant="outlined" onChange={(e) => setUsername(e.target.value)} value={username} />
        <TextField id="outlined-basic" label="Password" variant="outlined" onChange={(e) => setPassword(e.target.value)} value={password} type='password' />
        <Button variant="contained" type='submit'>LOGIN</Button>
        { errorMessage && <Alert severity="error">{errorMessage}</Alert> }
      </Box>
      { isLoginInProgress && <LinearProgress /> }
    </Container>
  )
}

export default Login;