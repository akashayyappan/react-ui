import 'antd/dist/antd.css';
import { UploadOutlined } from '@ant-design/icons';
import './App.css';
import React, { useState } from 'react';
import { Link, BrowserRouter, Routes, Route, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { Modal, Button, Upload, Row, Col, Divider } from 'antd';
import Home from './components/home/Home';
import Dashboard from './components/dashboard/Dashboard';
import Recommendation from './components/recommendation/Recommendation';
import Login from './components/login/Login';
import Register from './components/register/Register';
import 'reactjs-popup/dist/index.css';
import { FaHome, FaChartPie, FaPhotoVideo, FaSignOutAlt, FaFileUpload } from 'react-icons/fa';

class App extends React.Component {
  constructor() {
    super();
    let auth = sessionStorage.getItem('auth');
    if (!auth) auth = false;
    this.state = {
      isUserAuthenticated: auth,
      setIsModalVisible: false,
      isModalVisible: false
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
        <Modal title="Upload" visible={this.state.isModalVisible} onCancel={() => this.setState({ isModalVisible: false })}>
          <Row>
            <Col span={8}>DataSet</Col>
            <Col span={16}><Upload maxCount={1}><Button icon={<UploadOutlined />}>Click to Upload</Button></Upload></Col>
          </Row>
          <Divider></Divider>
          <Row>
            <Col span={8}>Matrix</Col>
            <Col span={16}><Upload maxCount={1}><Button icon={<UploadOutlined />}>Click to Upload</Button></Upload></Col>
          </Row>
        </Modal>
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
                    <li><span className="nav-item" onClick={() => this.setState({ isModalVisible: true })}>
                      <FaFileUpload />
                      <span>Upload</span>
                    </span></li>

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
