import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
    const Logout = async()=>{
        try {
            await axios.delete("http://localhost:5000/logout");
            navigate("/");
        } catch (error) {
            console.log();
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Dashboard</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <button onClick={Logout} className="nav-link" href="#">Logout <span className="sr-only">(current)</span></button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar