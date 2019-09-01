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
        <div>
            <div className="ui sizer vertical segment">
                <h1 className="large text-primary">Sign Up</h1>
                <p className="lead"><i className="user icon"></i> Create Your Account</p>
            </div>
            <div class="ui placeholder segment">
                <div class="ui two column very relaxed stackable grid">
                    <div className="column">
                        <form className="ui form" onSubmit={e => { onSubmit(e) }}>
                            <div className="field">
                                <label htmlFor="name">Please enter full name</label>
                                <div className="ui left icon input">

                                    <input type="text" placeholder="Name" name="name" value={name} onChange={e => onChange(e)} required />
                                    <i className="user icon"></i>
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="email">Please enter your email</label>
                                <div className="ui left icon input">

                                    <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} required />
                                    <i className="envelope icon"></i>
                                </div>
                                <small className="form-text">This site uses Gravatar so if you want a profile image, use an email with image profile</small>
                            </div>
                            <div className="field">
                                <label htmlFor="password">Please enter your password</label>
                                <div className="ui left icon input">

                                    <input
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        value={password} onChange={e => onChange(e)}
                                        minLength="6"
                                    />
                                    <i className="lock icon"></i>
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="password2">Please confirm your password</label>
                                <div className="ui left icon input">

                                    <input
                                        type="password"
                                        placeholder="Confirm Password"
                                        name="password2"
                                        value={password2} onChange={e => onChange(e)}
                                        minLength="6"
                                    />
                                    <i className="lock icon"></i>
                                </div>
                            </div>
                            <button type="submit" className="ui blue submit button" value="register">Register</button>
                        </form>
                    </div>
                    <div class="middle aligned column">
                        <div class="ui big button">
                            <i class="signup icon"></i>
                            <a href="/login">Sign In</a>
                        </div>
                    </div>
                </div>
                <div class="ui vertical divider">Or</div>
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