import React from 'react';
import { RiMovie2Line } from "react-icons/ri";
import TextField from "@mui/material/TextField";
import './Recommendation.css';

class Recommendation extends React.Component {
  render() {
    return (
      <div className="container-search">
        <div className="title">
          <h2>Recommendation</h2>
          <div classname="icon"><RiMovie2Line style={{ width: "3em", height: "3em" }} /></div>
        </div>
        <div className="search">
          <TextField style={{ width: "400px" }} id="outlined-basic"
            variant="outlined" label="Search movie" />
          <button className="cus-button">Get Recommendation</button>
        </div>
      </div >
      // <div class="container">
      //   <div class="row">
      //     <div class="col-sm" style={{ alignSelf: "center" }}>
      //       <span>Recommendation</span>
      //     </div>
      //     <div class="col-sm">
      //       <div classname="icon"><RiMovie2Line style={{ width: "3em", height: "3em" }} /></div>
      //     </div>
      //   </div>
      //   <div class="row">
      //     <div class="col-sm-8"> <TextField style={{ width: "100%", height: "50%" }}
      //       id="outlined-basic"
      //       variant="outlined"
      //       label="Search movie"
      //     />
      //     </div>
      //     <div class="col-sm-4">
      //       <button style={{ color: "#fff", backgroundColor: "#20df7f", width: "100%", height: "50%" }}><span style={{ fontSize: "12px" }}>Get Recommendation</span></button></div>
      //   </div>
      // </div>

    );
  }
}

export default Recommendation;