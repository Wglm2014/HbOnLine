import React, { useState } from "react";


const Login = () => {
    const [formData, setFormData] = useState(
        {   email: "",
            password: ""
        });
    const {  email, password } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();

            /*const newUser = {
                name, email, password
            }
            try {
                const config = { headers: { "content-type": "application/json" } }
                const body = JSON.stringify(newUser);
                axios.post("/api/users", body, config).then(res => {
                    console.log(res);
                });
            } catch (err) {
                console.error(err.response.data)
            }*/
        
    }
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
                Don't have an account yet? <a href="/Register">Sign Up</a>
            </p>
        </div>
    )
}

export default Login;