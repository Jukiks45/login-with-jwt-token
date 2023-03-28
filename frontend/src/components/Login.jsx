import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const history = useNavigate();

    const Auth = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/login', {
                email: email,
                password: password
            });
            history('/dashboard');
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }
    return (
        <main className="main">
            <div className="container">
                <section className="wrapper">
                    <div className="heading">
                        {msg ? <div className="alert alert-danger" role="alert">
                            {msg}
                        </div> : ""}
                        <h1 className="text text-large">Sign In</h1>
                        <p className="text text-normal">New user? <span><a href="/register" className="text text-links">Create an account</a></span>
                        </p>
                    </div>
                    <form onSubmit={Auth} name="signin" className="form">
                        <div className="input-control">
                            <label htmlFor="email" className="input-label" hidden>Email Address</label>
                            <input type="email" id="email" className="input-field" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="input-control">
                            <label htmlFor="password" className="input-label" hidden>Password</label>
                            <input type="password" id="password" className="input-field" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="input-control justify-content-center">
                            {/* <a href="#" className="text text-links">Forgot Password</a> */}
                            <input type="submit" name="submit" className="input-submit" value="Sign In"/>
                        </div>
                    </form>
                    <div className="striped">
                        <span className="striped-line"></span>
                        <span className="striped-text">Gege Geming</span>
                        <span className="striped-line"></span>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Login