import React, { useState } from 'react'
import '../Css/login.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toastr from "toastr/toastr";
import 'toastr/build/toastr.css';

function Login() {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = async () => {
        if(!username)
        {
            toastr.error("Username is required")
        }
        else if (!password)
        {
            toastr.error("Password is required")
        }
        else{
        axios.post('http://localhost:3001/login',
        {
            username, password
        }).then(result => {
            console.log(result)
            if(result.data.role == 1){
                setUsername('');
                setPassword('');
                navigate("/dashboardinv")
            }
            if(result.data.role == 2){
                setUsername('');
                setPassword('');
                navigate("/dashboard1inv")
            }

        }).catch( err =>
            console.log(err)
        )
        }
    }
  return (
    <div className="hold-transition login-page">
        <div className="login-box">
            <div className="login-logo">
                <a href="#"><b>Fashion Elegance</b> IMS</a>
            </div>
            {/* /.login-logo */}
            <div className="card">
                <div className="card-body login-card-body">
                <p className="login-box-msg">Sign in to start your session</p>
                    <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Username" 
                    onChange={(e) => setUsername(e.target.value)}/>
                    <div className="input-group-append">
                        <div className="input-group-text">
                        <span className="fas fa-envelope" />
                        </div>
                    </div>
                    </div>
                    <div className="input-group mb-3">
                    <input type="password" className="form-control" placeholder="Password" 
                    onChange={(e) => setPassword(e.target.value)}/>
                    <div className="input-group-append">
                        <div className="input-group-text">
                        <span className="fas fa-lock" />
                        </div>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-8">

                    </div>
                    {/* /.col */}
                    <div className="col-4">
                        <button className="btn btn-primary btn-block"
                        onClick={handleSubmit}>Sign In</button>
                    </div>
                    {/* /.col */}
                    </div>
                </div>
                {/* /.login-card-body */}
            </div>
        </div>
    </div>
  )
}

export default Login
