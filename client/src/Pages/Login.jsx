import React, { useState } from "react";
import "../css/login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const updateStatesAndNavigate = (path) => {
    setUsername("");
    setPassword("");
    navigate(path);
  };

  const handleSubmit = async () => {
    if (!username) {
      toast.error("Username is Required");
    } else if (!password) {
      toast.error("Password is Required");
    } else {
      axios
        .post("http://localhost:3001/login", {
          username,
          password,
        })
        .then((result) => {
          const rolePaths = {
            1: "/inventory-dashboard",
            2: "/product-dashboard",
            3: "/finance-dashboard",
          };
          const path = rolePaths[result.data.role];
          if (path) {
            updateStatesAndNavigate(path);
          } else {
            // If role is not 1, 2, or 3
            toast.error("Something Wrong. Please Try Again.", {
              position: "top-right",
            });
          }
        })
        .catch((err) => {
          console.error("Login error:", err);
          toast.error("Login Failed. Please Try Again.", {
            position: "top-right",
          });
        });
    }
  };

  return (
    <div className="hold-transition login-page">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="login-box">
        <div className="login-logo">
          <a>
            <b>Fashion Elegance</b> IMS
          </a>
        </div>
        {/* /.login-logo */}
        <div className="card">
          <div
            className="card-body login-card-body"
            style={{ borderRadius: "20px" }}
          >
            <p className="login-box-msg">Sign in to start your session</p>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-user" />
                </div>
              </div>
            </div>
            <div className="input-group mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-8"></div>
              <div className="col-4">
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={handleSubmit}
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
