import './Login.css';
import React from 'react';
import { useNavigate } from 'react-router';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            password: "",
            errMsg: ''
        }
    }
    componentWillMount() {
        sessionStorage.setItem('auth', false);
        this.props.onLogin(false);
    }

    onLoginHandle = () => {
        let user = this.state.user
        let password = this.state.password
        fetch('http://localhost:5000/login', {
            method: 'POST',
            body: JSON.stringify({ user, password }),
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
        })
            .then(res => {
                if(res.status == 404) throw new Error("Invalid User. This user doesn't exist!");
                if(res.status == 401) throw new Error("Username or password is incorrect!!");
                return res.json()
            })
            .then(json => {
                this.setState({ user: json.user, password: json.password })
                sessionStorage.setItem('auth', true);
                this.props.onLogin(true);
                this.props.navigate("/home");
            })
            .catch((e) => {
                // console.log(e)
                this.setState({errMsg: e.message})
                console.log(this.state.errMsg);
            })
    }

    render() {
        return (
            <div className="container-cus">
                <h1>Viewer base analysis for OTT platform</h1>
                <h1>Login</h1>
                <h3 style={{color:'red'}}>{this.state.errMsg}</h3>
                <input className="input" type="text" placeholder="Username" onChange={(e) => { this.setState({ user: e.target.value }) }} />
                <input className="input" type="password" placeholder="Password" onChange={(e) => { this.setState({ password: e.target.value }) }} />
                <a href="" className="forgot-pass">Forgot Password?</a>
                <button className="cus-button" onClick={this.onLoginHandle}>Login</button>
                <div></div>
                <div className="register">
                    <a href="">Not an existing user?</a>
                    <button className="register-btn cus-button" onClick={() => this.props.navigate("/register")}>Register</button>
                </div>
            </div>
        );
    }
}

function WithNavigate(props) {
    const navigate = useNavigate();
    return <Login {...props} navigate={navigate} />
    //(...) will send a copy of props else reference pointer will be sent and all values will be changed
}

export default WithNavigate;