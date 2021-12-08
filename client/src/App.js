import logo from './logo.svg';
import './App.css';
import { Admin } from './components/adminPage';
import { Route, Routes, useNavigate} from 'react-router';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Home } from './components/home';
import { Login } from './components/Login';
import { useContext, useEffect } from 'react';
import { CheckContext } from './context/loginContext';


function App() {
  const navigate = useNavigate();

  const {val} = useContext(CheckContext)
  const HandleHome = ()=>{
    navigate("/")
  }

  

  const handleAdmin = ()=>{
    console.log(String(val))
    if(!val){
      alert("User needs to login")
      navigate("/login")
    }
    else{
      navigate("/admin")
    }
  }

  return (
    <div className="App">
      <BottomNavigation
        // value={value}
        // onChange={(event, newValue) => {
        //   setValue(newValue);
        // }}
        style={{backgroundColor:"#bdbdbd"}}
        showLabels
      >
        <BottomNavigationAction onClick={HandleHome} label="Home"  />
        <BottomNavigationAction onClick={handleAdmin} label="Admin"  />
      </BottomNavigation>
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path="/admin" element={<Admin/>}/>
        <Route exact path="/login" element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
