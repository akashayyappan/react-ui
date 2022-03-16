import './Home.css';
import React from 'react';
import { useNavigate } from 'react-router';

class Home extends React.Component {
    onUploadHandle = () => {
        this.props.navigate("/dashboard");
    }
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
                <button className="upload"  onClick={this.onUploadHandle}>View Dashboard</button>
            </div>
        );
    }
}

function WithNavigate(props) {
    const navigate = useNavigate();
    return <Home {...props} navigate={navigate}/>
    //(...) will send a copy of props else reference pointer will be sent and all values will be changed
}

export default WithNavigate;
// export default Home;