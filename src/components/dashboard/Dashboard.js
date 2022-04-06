import './Dashboard.css';
import React from 'react';
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      labels: [],
      myData: []
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
        console.log(json)
        this.setState({ labels: json.labels, myData: json.values })
        // console.log(this.state.labels)

      }).catch(e => {
        console.log(e);
      })
  }
  componentDidMount() {
    this.fetchChart();
  }

  render() {
    console.log(this.state)
    return (
      <div className="container-dash">
        <div className='dash-btns'>
          <button className="cus-button">Viewer chart</button>
          <button className="cus-button">Cluster chart</button>
          <button className="cus-button">Viewership chart</button>
        </div>
        <div className='dash-chart'>
          <h3 style={{ color: "aqua" }}>Overall Genre chart</h3>
          <div style={{ maxWidth: "650px" }}>
            <Bar
              data={{
                labels: this.state.labels,
                datasets: [
                  {
                    data: this.state.myData,
                    label: 'Total count',
                    backgroundColor: "aqua",
                    borderColor: "aqua",
                    borderWidth: 0.5,
                  },
                ],
              }}
              width='900px'
              height={400}
              options={{
                maintainAspectRatio: false,
                scales: {
                  xAxes:
                  {
                    title: { text: 'Genres', display: true, color: 'white' },
                    ticks: {
                      color: 'white'
                    },
                  },
                  yAxes:
                  {
                    title: { text: 'Count', display: true, color: 'white' },
                    ticks: {
                      beginAtZero: true,
                      color: 'white'
                    },
                  },
                },
                legend: {
                  labels: {
                    fontSize: 15,
                  },
                },
              }}
            >
            </Bar>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;