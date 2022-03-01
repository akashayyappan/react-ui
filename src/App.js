import './App.css';
import React from 'react';
import { Link, BrowserRouter, Routes, Route, Navigate, Outlet, useNavigate } from 'react-router-dom';

import Home from './components/home/Home';
import Dashboard from './components/dashboard/Dashboard';
import Recommendation from './components/recommendation/Recommendation';
import Login from './components/login/Login';
import Register from './components/register/Register';

import { FaHome, FaChartPie, FaPhotoVideo, FaSignOutAlt } from 'react-icons/fa';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isUserAuthenticated: false
    }
  }

  onLoginHandle = value => {
    this.setState({ isUserAuthenticated: value })
  }

  render() {
    return (
      <div className="container-main">
        <BrowserRouter>
          {this.state.isUserAuthenticated &&
            <div>
              <header>
                <h3>Recommender System</h3>
                <div className="navbar">
                  <ul className="nav">
                    <li><Link to={'/home'} className="nav-item"><FaHome /><span>Home</span></Link></li>
                    <li><Link to={'/dashboard'} className="nav-item"><FaChartPie /><span>Dashboard</span></Link></li>
                    <li><Link to={'/rec'} className="nav-item"><FaPhotoVideo /><span>Recommendation</span></Link></li>
                  </ul>
                </div>
                <Link to={'/login'} className="logout"><FaSignOutAlt /><span>Logout</span></Link>
              </header>
            </div>
          }
          <Routes>
            <Route exact path='/' element={
              this.state.isUserAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />
            }></Route>
            <Route path='/home' element={<Home />} />
            <Route path='/login' element={<Login onLogin={this.onLoginHandle} />} />
            <Route path='/register' element={<Register />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/rec' element={<Recommendation />} />
          </Routes>
        </BrowserRouter>
        <Outlet />
      </div>

    );
  }
}

export default App;
