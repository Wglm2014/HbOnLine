import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth"

import PropTypes from "prop-types";


const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState(
        {
            name: "",
            email: "",
            password: "",
            password2: ""
        });
    const { name, email, password, password2 } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();
        if (password !== password2) {
            //passwords do not match
            setAlert("Passwords did not match", "danger");
        } else {
            register({ name, email, password });
        }
    }

    if (isAuthenticated) {
        return <Redirect to="/dashboard" />
    }
    return (

        <div className="card">
            <div className="card-header">
                <h1 className="large text-primary">Sign Up</h1>
                <p className="lead"><i className="user icon"></i> Create Your Account</p>
            </div>
            <div className="card-body">
                <form onSubmit={e => { onSubmit(e) }}>
                    <div className="form-group">
                        <label htmlFor="name">Please enter full name</label>
                        <input className="form-control" type="text" placeholder="Name" name="name" value={name} onChange={e => onChange(e)} required />

                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Please enter your email</label>
                        <input className="form-control" type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} required />

                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Please enter your password</label>
                        <input className="form-control" type="password" placeholder="Password" name="password" value={password} onChange={e => onChange(e)} minLength="6" />

                    </div>
                    <div className="form-group">
                        <label htmlFor="password2">Please confirm your password</label>
                        <input className="form-control" type="password" placeholder="Confirm Password" name="password2" value={password2} onChange={e => onChange(e)} minLength="6" />

                    </div>
                    <button className="btn btn-primary">Register</button>
                </form>
            </div>
        </div>


    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, { setAlert, register })(Register);