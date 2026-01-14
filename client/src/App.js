import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {ContextProvider} from './context/ContextProvider';
import Login from './main/Login';
import Home from './main/Home';
import './index.css';

function App() {
  return (
    <div className='overlay'>
      <Router>
        <ContextProvider>
          <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/home' element={<Home />} />
          </Routes>
        </ContextProvider>
      </Router>
    </div>
  );
}

export default App;
