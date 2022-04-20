import React, { Component } from 'react'
import { Button, TextField } from '@mui/material'
export default class Cluster extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: '',
            users: [],
            movies: []
        }
    }
    onSearchCLick = () => {
        let data = {
            userid: this.state.userID,
        }
        let list_of_movies = {
            Movies: this.state.movies
        }
        fetch('http://localhost:5000/cluster', {
            method: 'POST',
            body: JSON.stringify(data, list_of_movies),
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
        })
            .then(response => {
                return response.json()
            })
            .then((json) => {
                this.setState({ users: json.data, movies: json.list_of_movies })
                // console.log(this.state.movies)
                // console.log(json)
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
                        style={{ backgroundColor: 'white', marginRight: '25px', widows: '150px', width: "300px" }}
                    ></TextField>
                    <button style={{ padding: '10px 24px', width: '200px' }} onClick={this.onSearchCLick} className="cus-button">Generate</button>
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: '20px',
                    width: '95vw',
                    justifyContent: 'space-around',
                    color:'white'
                }}>
                    <table>
                        <thead>
                            <tr>
                                <th>Top movies watched by User</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.movies.map((item, idx) => (
                                    <tr key={idx}>
                                        <td>{item}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    {/* <ul>
                        {this.state.movies.map(e => (
                            < li > {e}</li>
                        ))}
                    </ul> */}

                    <table>
                        <thead>
                            <tr>
                                <th>Top 5 Similar Users</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.users.map((item, idx) => (
                                    <tr key={idx}>
                                        <td>{item}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
