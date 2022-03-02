import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { LoginPage, ProfilePage, RegisterPage, FuelFormPage } from './components/Pages';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/fuel' element={<FuelFormPage/>}/>
        <Route exact path='/register' element={<RegisterPage/>}/>
        <Route exact path='/' element={<LoginPage/>}/>
        <Route exact path='/profile' element={<ProfilePage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
