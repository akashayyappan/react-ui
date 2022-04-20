import './Dashboard.css';
import React from 'react';
import BarChart from '../BarChart';
import ViewerChart from '../ViewerChart';
import OverallChart from '../OverallChart';
import Cluster from '../Cluster';


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      labels: [],
      myData: [],
      view: '',
      // overallChart: false
    }
  }
  fetchChart() {
    fetch('http://localhost:5000/genre', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors'
    })
      .then(response => {
        return response.json()
        // console.log(response)
      })
      .then((json) => {
        // console.log(json)
        this.setState({ labels: json.labels, myData: json.values})
        // console.log(this.state.labels)

      }).catch(e => {
        console.log(e);
      })
  }
  componentDidMount() {
    this.fetchChart();
  }

  handleoverall = () => {
    this.setState({ view: 'overallchart' });
    
  }

  onViewChartClick = () => {
    this.setState({ view: 'viewerchart' });
  }

  onClusterClick = () => {
    this.setState({ view: 'clusterchart' });
  }

  render() {
    console.log(this.state)
    return (
      <div className="container-dash">
        <div className='dash-btns'>
          <button className="cus-button" onClick={this.onViewChartClick} style={{ padding: '10px 24px', width: '200px' }}>Viewer chart</button>
          <button className="cus-button" onClick={this.onClusterClick} style={{ padding: '10px 24px', width: '200px' }}>User Cluster</button>
          <button className="cus-button" onClick={this.handleoverall} style={{ padding: '10px 24px', width: '200px' }}>Viewership chart</button>
        </div>
        <div className='dash-chart'>
          {
            this.state.view == 'clusterchart' ?
              <Cluster></Cluster>
              : this.state.view == 'viewerchart' ?
                <ViewerChart></ViewerChart>
                : this.state.view == 'overallchart' ?
                  <OverallChart></OverallChart>
                  : <BarChart labels={this.state.labels} myData={this.state.myData}></BarChart>
          }
        </div>
      </div>
    );
  }
}

export default Dashboard;