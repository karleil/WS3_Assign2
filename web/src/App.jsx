import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router';

import Header from './components/Header';
import Footer from './components/Footer';

import authRequired from '../authRequired';

import AllGuitars from './pages/AllGuitars';
import Detail from './pages/Detail';

import a from './App.module.css';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';


//both pages redirects you to homepage if there is no user logged in
const ProtectedAllGuitars = authRequired(AllGuitars); 
const ProtectedDetail = authRequired(Detail);


function App() {

  const navigate = useNavigate(); 

  const [isAuthenticated, setIsAuthenticated] = useState(false); //this is the state to track if user is authenticated

  const handleLogout = () => { // this function handles the logout process
    localStorage.removeItem("jwt-token");
    setIsAuthenticated(false);
    navigate("/signin"); // redirects user to the sign-in page after logout
  }

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate('/guitars'); // redirects user to the guitars page after login
  }


  useEffect(() => {
    const jwtToken = localStorage.getItem("jwt-token"); // this gets the JWT token from local storage

    if(jwtToken) {
      setIsAuthenticated(true); // this sets the isAuthenticated state to true if the JWT token is present
    }
  }, []);


  return (
    
    <div className={a.app}>
      <Header handleLogout={handleLogout} isAuthenticated={isAuthenticated} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn handleLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/guitars" element={<ProtectedAllGuitars />} />
        <Route path="/guitars/:id" element={<ProtectedDetail />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App;
