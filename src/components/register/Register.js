import './Register.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            email: "",
            password: "",
            errMsg: ''
        }
    }
    componentWillMount() {
        sessionStorage.setItem('auth', false);
        this.props.onLogin(false);
    }
    submit = () => {
        // e.preventDefault()
        let user = this.state.user
        let email=this.state.email
        let password=this.state.password
        console.log(JSON.stringify({user,email,password}))
        fetch('http://localhost:5000/register', {
            method: 'POST',
            body: JSON.stringify({ user,email,password }),
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
        })
            .then(res =>{
                if(res.status == 409) throw new Error("User already exists!!");
                return res.json()
            })
            .then(json => {
                this.setState({user: json.user,email: json.email,password:json.password})
                // this.setState(json.user,json.email,json.password)
                // this.props.onLogin(true)
                this.props.navigate('/login')
            }).catch((e)=>{
                // console.log(e)
                this.setState({errMsg: e.message})
                console.log(this.state.errMsg);
            })
       
    }
    // onFullNameChange(value) {
    //     this.setState({user:value.target.value})
    //     // console.log(this.state)
    // }
    render() {
        return (
            <div className="container-cus">
                {/* <form className="container" action="http://43.90.35.23:5000/register" method="post"> */}
                <h1>Register</h1>
                <h3 style={{color:'red'}}>{this.state.errMsg}</h3>
                <input className="input" type="text" placeholder="Full Name" name="username"
                    onChange={(e) => { this.setState({ user: e.target.value }) }} />
                {/* {this.state.user} */}
                <input className="input" type="text" placeholder="Email" name="email"
                    onChange={(e) => { this.setState({ email: e.target.value }) }} />
                <input className="input" type="password" placeholder="Password" name="password"
                    onChange={(e) => { this.setState({ password: e.target.value }) }} />
                <button className="cus-button" onClick={() => { this.submit() }}>Register</button>
                <div></div>
                <div className="register">
                    <a href="">Already an existing user?</a>
                    <button className="register-btn cus-button" onClick={() => this.props.navigate("/login")}>Login</button>
                </div>
                {/* </form> */}
            </div>
        );
    }
}

function WithNavigate(props) {
    const navigate = useNavigate();
    return <Register {...props} navigate={navigate} />
}

export default WithNavigate;