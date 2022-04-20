import React from 'react';
import { RiMovie2Line } from "react-icons/ri";
import TextField from "@mui/material/TextField";
import './Recommendation.css';

class Recommendation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      movies: []
    }
  }
  submit = () => {
    let data = this.state.data
    fetch('http://localhost:5000/movie', {
      method: 'POST',
      body: JSON.stringify({ data }),
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors'
    }).then(res => res.json())
      .then(json => {
        this.setState({ movies: json.data })
        console.log(this.state.movies);
        console.log(json);
      }).catch(e => {
        console.log(e);
      })
  }
  render() {
    return (
      <div className="container-search">
        <div className="title">
          <h2>Recommendation</h2>
          <div classname="icon"><RiMovie2Line style={{ width: "3em", height: "3em" }} /></div>
        </div>
        <div className="search">
          <TextField style={{ width: "400px" }} id="outlined-basic"
            variant="outlined"
            onChange={(e) => { this.setState({ data: e.target.value }) }}
            label="Search movie" />
          <button className="cus-button" onClick={() => { this.submit() }}>Get Recommendation</button>
        </div>
        <div className='movies-list'>
        <table>
                        <thead>
                            <tr>
                                <th>Top movies Recommendations</th>
                                {/* <th>Genres</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {   
                                this.state.movies.map((item, idx) => (
                                    <tr key={idx}>
                                        <td>{item}</td>
                                        {/* <td>{item}</td> */}
                                    </tr>
                                ))}
                        </tbody>
                    </table>
          {/* <ul>
            {this.state.movies.map(e => (
              < li > { e }</li>
            ))}
          </ul> */}
      </div>
      </div >
    );
  }
}

export default Recommendation;