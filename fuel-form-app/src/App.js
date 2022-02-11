import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { LoginPage, ProfilePage, RegisterPage, FuelFormPage } from './components/Pages';
import './App.css';
import React from 'react';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<FuelFormPage/>}/>
        <Route exact path='/register' element={<RegisterPage/>}/>
        <Route exact path='/login' element={<LoginPage/>}/>
        <Route exact path='/profile' element={<ProfilePage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
