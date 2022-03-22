import './Dashboard.css';
import React from 'react';

class Dashboard extends React.Component {
  render() {
    return (
      <div className="container-dash">
        <button className="cus-button">Viewer chart</button>
        <button className="cus-button">Cluster chart</button>
        <button className="cus-button">Viewership chart</button>
      </div>
    );
  }
}

export default Dashboard;