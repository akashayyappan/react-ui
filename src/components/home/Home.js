import './Home.css';
import React from 'react';
import { useNavigate } from 'react-router';

class Home extends React.Component {
    onUploadHandle = () => {
        this.props.navigate("/dashboard");
    }
    render() {
        return (
            <div className="container-home">
                <input style={{ color: 'white' }} type="file" />
                <br /><br />
                <div className="progress-bar">
                    <div className="progress"></div>
                </div>
                <span style={{ color: 'white' }}>0% Completed</span>
                <br /><br /><br />
                <button className="cus-button upload" onClick={this.onUploadHandle}>View Dashboard</button>
            </div>
        );
    }
}

function WithNavigate(props) {
    const navigate = useNavigate();
    return <Home {...props} navigate={navigate} />
    //(...) will send a copy of props else reference pointer will be sent and all values will be changed
}

export default WithNavigate;
// export default Home;