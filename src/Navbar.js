import React from "react";
import { Link } from "react-router-dom";

class Navbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ready: false
        }
        this.handleLoad = this.handleLoad.bind(this)
    }

    handleLoad = async() => {
        const res = await fetch('/getUser', {
            method:"GET",
            headers: {            
                "Content-Type": "application/json"
            }
        })
        const json = await res.json()
        const curUsername = json.username;
        this.setState({curUsername:curUsername}) 
        this.setState({ready: true})
    }

    componentDidMount() {
        this.handleLoad()
    }
    render() {
        if (this.state.ready) {
            return (
                <div className="container">
                        <nav className="navbar navbar-expand-lg mb-4">
                            <div className="container-fluid">
                                <Link className="navbar-brand" to='/home'>
                                    youFree?
                                </Link>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                        <li className="nav-item">
                                            <Link className="nav-link" to='/home'>
                                                Home
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to='/create-calendar'>
                                                Create
                                            </Link>
                                        </li>
                                    </ul>
                                    <form className="nav-item d-flex" action="/logout" method="POST">
                                        <button className="nav-link btn btn-link" type="submit">Log out of @{this.state.curUsername}</button>
                                    </form>
                                </div>
                            </div>
                        </nav>
                    </div>
                );
            }
        }
}

export default Navbar;    