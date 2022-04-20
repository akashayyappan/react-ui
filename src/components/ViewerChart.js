import { Button, TextField } from '@mui/material'
import React, { Component } from 'react'
import { MDBContainer } from "mdbreact";
import { Pie } from "react-chartjs-2";
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(ChartDataLabels);

export default class ViewerChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userID: '',
            viewChart: false,
        }
    }

    onSearchCLick = () => {
        let data = {
            userid: this.state.userID
        }
        fetch('http://localhost:5000/pie', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
        })
            .then(response => {
                return response.json()
            })
            .then((json) => {
                // console.log(json)
                // let { Genre_Data, Genre_labels, Rating_Data, Rating_labels } = json;
                this.setState({ ...json, viewChart: true })
            }).catch(e => {
                console.log(e);
            })
    }

    onUserChange = (e) => {
        this.setState({ userID: e.target.value })
    }

    render() {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'row'
                }}>
                    <TextField
                        label='User ID'
                        placeholder='1'
                        variant='outlined'
                        onChange={this.onUserChange}
                        style={{ backgroundColor: 'white', marginRight: '25px', widows: '150px' , width: "300px"  }}
                    ></TextField>
                    <button style={{padding: '10px 24px',width:'200px'}} onClick={this.onSearchCLick} className="cus-button">Generate Chart</button>
                </div>
                <div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: '20px',
                        width: '95vw',
                        justifyContent: 'space-around'
                    }}>
                        {this.state.viewChart ? <MDBContainer>
                            <span style={{ color: 'white' }}>User Genre Chart</span>
                            {console.log('vc :', this.state)}
                            <Pie data={{
                                labels: this.state.Genre_labels,
                                datasets: [
                                    {
                                        label: "User Genre Chart",
                                        data: this.state.Genre_Data,
                                        backgroundColor: ["dodgerblue", "springgreen", "yellow", "pink", "orange", "orangered", "aqua", "cyan"],
                                    }
                                ],
                            }} options={{
                                plugins: {
                                    datalabels: {
                                        formatter: function(value, context) {
                                            return value + "%"
                                        }
                                    }
                                }
                            }}
                                style={{ width: '330px' }}
                            />
                        </MDBContainer> : null}
                        {this.state.viewChart ? <MDBContainer>
                            <span style={{ color: 'white' }}>User Rating Chart</span>
                            <Pie data={{
                                labels: this.state.Rating_labels,
                                datasets: [
                                    {
                                        label: "User Rating Chart",
                                        data: this.state.Rating_Data,
                                        backgroundColor: ["dodgerblue", "springgreen", "yellow", "pink", "orange", "orangered", "aqua", "cyan"],
                                    }
                                ]
                            }}
                                style={{ width: '330px' }}
                                options={{
                                    plugins: {
                                        datalabels: {
                                            formatter: function(value, context) {
                                                return value + "%"
                                            }
                                        }
                                    }
                                }}
                            />
                        </MDBContainer> : null}
                    </div>
                </div>
            </div>
        )
    }
}
