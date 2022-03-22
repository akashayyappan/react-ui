import './App.css';
import React, {useState} from 'react';
import { Link, BrowserRouter, Routes, Route, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { Modal, Button } from 'antd';
import Home from './components/home/Home';
import Dashboard from './components/dashboard/Dashboard';
import Recommendation from './components/recommendation/Recommendation';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { FaHome, FaChartPie, FaPhotoVideo, FaSignOutAlt,FaFileUpload } from 'react-icons/fa';
// import { Upload } from './components/upload/Upload';

class App extends React.Component {
  constructor() {
    super();
    let auth = sessionStorage.getItem('auth');
    if(!auth) auth = false;
    this.state = {
      isUserAuthenticated: auth,
      setIsModalVisible:false,
      isModalVisible:false
    }
  }
  // const [isModalVisible, setIsModalVisible]=useState(false);
  // onUploadClick(){
  //   name: "Upload";
  //   this.setState({ showHideDemo1: false })
  // }

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
                <h3>Viewer base Analysis</h3>
                <div className="navbar">
                  <ul className="nav">
                    <li><Link to={'/home'} className="nav-item"><FaHome /><span>Home</span></Link></li>
                    <li><Link to={'/dashboard'} className="nav-item"><FaChartPie /><span>Dashboard</span></Link></li>
                    <li><Link to={'/rec'} className="nav-item"><FaPhotoVideo /><span>Recommendation</span></Link></li>
                    <li>
                      {/* <Link to={'/rec'} className="nav-item"><FaFileUpload /><span>Upload</span></Link> */}
                    <FaFileUpload /><span className="nav-item" onClick={()=>this.setState({setIsModalVisible: !this.state.setIsModalVisible})}>
                    Upload</span>
                    <Modal title="Basic Modal" visible={this.state.setIsModalVisible} onOk={this.state.setIsModalVisible} onCancel={this.state.setIsModalVisible}>
                    <p>Dataset</p><input type="file" />
                    <p>Matrix</p><input type="file" />
                    </Modal>
                    </li>
                    {/* <button className="nav-item"  onClick={()=>this.setState({setIsModalVisible: !this.state.setIsModalVisible})}>
                    <FaFileUpload /><span>Upload</span>
                    </button> */}
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
            {/* <Route path='/upload' element={<Upload />} /> */}
          </Routes>
        </BrowserRouter>
        <Outlet />
      </div>

    );
  }
}

export default App;
