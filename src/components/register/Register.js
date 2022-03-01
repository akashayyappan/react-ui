import './Register.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

class Register extends React.Component {
    render(){
        return (
            <div className="container">
                <h1>Register</h1>
                <input className="input" type="text" placeholder="Full Name" />
                <input className="input" type="text" placeholder="Email" />
                <input className="input" type="password" placeholder="Password" />
                <button>Register</button>
                <div></div>
                <div className="register">
                    <a href="">Already an existing user?</a>
                    <button className="register-btn" onClick={() => this.props.navigate("/login")}>Login</button>
                </div>
            </div>
        );
    }
}

function WithNavigate(props) {
    const navigate = useNavigate();
    return <Register {...props} navigate={navigate}/>
}

export default WithNavigate;