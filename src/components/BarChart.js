import React from 'react';
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default class BarChart extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h3 style={{ color: "aqua" }}>Overall Genre chart</h3>
                <div style={{ maxWidth: "650px" }}>
                    <Bar
                        data={{
                            labels: this.props.labels,
                            datasets: [
                                {
                                    data: this.props.myData,
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
                                        color: 'white',
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
        )
    }

}