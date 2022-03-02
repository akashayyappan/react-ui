import './Home.css';
import React from 'react';

class Home extends React.Component {
    render(){
        return (
            <div className="container-home">
                <input type="file" />
                <br/><br/>
                <div className="progress-bar">
                    <div className="progress"></div>
                </div>
                <span>0% Completed</span>
                <br/><br/><br/>
                <button className="upload">View Dashboard</button>
            </div>
        );
    }
}

export default Home;