import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import UserInfoContext from './components/Pages/util/AuthContext/AuthContext.tsx';
import { LoginPage, ProfilePage, RegisterPage, FuelFormPage } from './components/Pages';
import './App.css';

function App() {
  return (
    <UserInfoContext>
      <Router>
        <Routes>
          <Route exact path='/fuel' element={<FuelFormPage/>}/>
          <Route exact path='/register' element={<RegisterPage/>}/>
          <Route exact path='/' element={<LoginPage/>}/>
          <Route exact path='/profile' element={<ProfilePage/>}/>
        </Routes>
      </Router>
    </UserInfoContext>
  );
}

export default App;
