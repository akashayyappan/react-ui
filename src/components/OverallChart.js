import React, { Component } from 'react'
import { Bar } from "react-chartjs-2";
// import { Chart, registerables } from 'chart.js';
// Chart.register(...registerables);

export default class OverallChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // rating_data
            overallChart: false,
        }
    }
    onbtnCLick = () => {
        fetch('http://localhost:5000/overall', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
        })
            .then(response => {
                return response.json()
            })
            .then((json) => {
                // console.log(json)
                // let { Genre_Data, Genre_labels, Rating_Data, Rating_labels } = json;
                this.setState({ ...json, overallChart: true })
                console.log(json)
            }).catch(e => {
                console.log(e);
            })
    }
    componentDidMount() {
        this.onbtnCLick();
      }
    render() {
        // console.log("hi")
        return (
            <div>
                <h3 style={{ color: "aqua" }}>Overall Rating chart</h3>
                <div style={{ maxWidth: "650px" }}>
                    <Bar
                        data={{
                            labels: this.state.Rating_labels,
                            datasets: [
                                {
                                    data: this.state.Rating_data,
                                    label: 'Total Percentage',
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
                                        color: 'white',
                                    },
                                },
                                yAxes:
                                {
                                    title: { text: 'Percentage', display: true, color: 'white' },
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
        )
    }
}
