import './Dashboard.css';
import React from 'react';

class Dashboard extends React.Component {
  render() {
    return (
      <div className="container-dash">
        <button classname="viewer">Viewer chart</button>
        <button classname="cluster">Cluster chart</button>
        <button classname="overall">Viewership chart</button>
      </div>
      // <div class="container">
      //   <div class="row">
      //     <div class="col-sm">
      //       <button classname="viewer">Viewer chart</button>
      //     </div>
      //     <div class="col-sm">
      //       <button classname="cluster">Cluster chart</button>
      //     </div>
      //     <div class="col-sm">
      //       <button classname="overall">Viewership chart</button>
      //     </div>
      //   </div>
      // </div>

    );
  }
}

export default Dashboard;