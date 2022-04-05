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
        <button className="cus-button">Viewer chart</button>
        <button className="cus-button">Cluster chart</button>
        <button className="cus-button">Viewership chart</button>
        <br></br>
        <center>
          <h3>Overall Genre chart</h3>
          <div style={{ maxWidth: "650px" }}>
            <Bar
              data={{
                labels: this.state.labels,
                datasets: [
                  {
                    data: this.state.myData,
                    label: 'Genres',
                    borderWidth: 0.5
                  },
                ],
              }}
              height={400}
              const options={{
                maintainAspectRatio: false,
                scales: {
                  yAxes:
                  {
                    title:{text:'Count',display:true},
                    ticks: {
                      beginAtZero: true,
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
        </center>
      </div>
    );
  }
}

export default Dashboard;