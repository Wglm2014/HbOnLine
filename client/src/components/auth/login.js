import React from "react";

const Login = () => {
    return (
        <div id="Register" className="card-body container">
            <h1 className="large text-primary">Login</h1>
            <p className="lead"><i className="fas fa-user"></i>Sign in to your account</p>
            <form className="form" onSubmit={e => { onSubmit(e) }}>
                <div className="form-group">
                    <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} required />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password} onChange={e => onChange(e)}
                        minLength="6"
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Already have an account? <a href="/Register">Don't have and account Sign Up</a>
            </p>
        </div>
    )
}

export default Login;