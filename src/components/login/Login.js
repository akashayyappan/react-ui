import './Login.css';
import React from 'react';
import { useNavigate } from 'react-router';

class Login extends React.Component {

    componentWillMount(){
        this.props.onLogin(false);
    }

    onLoginHandle = () => {
        this.props.onLogin(true);
        this.props.navigate("/home");
    }

    render() {
        return (
            <div className="container">
                <h1>Login</h1>
                <input className="input" type="text" placeholder="Username" />
                <input className="input" type="password" placeholder="Password" />
                <a href="" className="forgot-pass">Forgot Password?</a>
                <button onClick={this.onLoginHandle}>Login</button>
                <div></div>
                <div className="register">
                    <a href="">Not an existing user?</a>
                    <button className="register-btn" onClick={() => this.props.navigate("/register")}>Register</button>
                </div>
            </div>
        );
    }
}

function WithNavigate(props) {
    const navigate = useNavigate();
    return <Login {...props} navigate={navigate}/>
}

export default WithNavigate;