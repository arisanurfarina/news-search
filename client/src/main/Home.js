import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/ContextProvider';
import Header from '../components/Header';
import MyFavouritesPanel from '../components/MyFavouritesPanel';
import DisplayResults from '../components/DisplayResults';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Home = () => {
  const {isLoggedIn} = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      return navigate("/");
    }
  }, [isLoggedIn]);

  return (
    <Grid container className="main-container" direction="column" >
      {/*Header*/}
      <Grid className="header-container" >
        <Header />
      </Grid>
      {/*Content*/}
      <Grid container direction="row" className="content-container" >
        {/*Left*/}
        <Grid className="left-panel-container" size={2.5} >
          <MyFavouritesPanel />
        </Grid>
        {/*Right*/}
        <Grid className="result-container" size={9.5} >
            <DisplayResults />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Home;