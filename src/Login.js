import React from "react";

window.onload = function() {
    const loginForm = document.querySelector(".needs-validation")
    loginForm.addEventListener("submit", event => {
        if (!loginForm.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
            loginForm.classList.add("was-validated")
        }
    })
}

class Login extends React.Component {
    render() {
        return (
            <div>
                <div className="container mt-5 d-flex flex-column align-items-center">
                    <h1>youFree?</h1>
                    <p>Please log in to create and manage your calendars.</p>
                    <form className="needs-validation" action="/login" method="POST" noValidate>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="username">Username:</label>
                            <input className="form-control" type="text" name="username" id="username" required/>
                            <div className="invalid-feedback">Please provide a username.</div> 
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="password">Password:</label>
                            <input className="form-control" type="password" name="password" id="password" required/>
                            <div className="invalid-feedback">Please provide a password.</div> 
                        </div>
                        <div className="d-grid d-sm-block text-center">
                            <button type="submit" className="btn btn-primary">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;
