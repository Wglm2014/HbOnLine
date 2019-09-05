import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login, loadUser } from "../../actions/auth";


const Login = ({ auth, login }) => {
    const [formData, setFormData] = useState(
        {
            email: "",
            password: "",
            errorMessage: ""
        });
    const { email, password } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = (e) => {
        e.preventDefault();
        login({ email, password });

    }

    if (auth.isAuthenticated) {
        return <Redirect to="/dashboard" />;
    }


    return (
        <div>
            <div className="ui sizer vertical segment">

                <h1 className="large text-primary">Login</h1>
                <p className="lead"><i className="user icon"></i> To Your Account</p>
            </div>
            <div id="Register" className="ui placeholder segment">
                <div className="ui two column very relaxed stackable grid">
                    <div className="column">
                        <form className="ui form" onSubmit={e => { onSubmit(e) }}>
                            <div className="field">
                                <label htmlFor="email">Please enter your email</label>
                                <div className="ui left icon input">
                                    <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} required />
                                    <i className="envelope icon"></i>
                                </div>

                            </div>
                            <div className="field">
                                <label htmlFor="password">Please enter your password</label>
                                <div className="ui left icon input">
                                    <input type="password" placeholder="Password" name="password" value={password} onChange={e => onChange(e)} minLength="6" />
                                    <i className="lock icon"></i>
                                </div>

                            </div>
                            <button type="submit" className="ui blue submit button">Login</button>

                        </form>
                    </div>
                    <div className="middle aligned column">
                        <button className="ui big button">
                            <i className="signup icon"> </i><a href="/register">Sign Up</a>
                        </button>
                    </div>
                </div>
                <idv className="ui vertical divider">Or</idv>
            </div>
        </div>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    loadUser: PropTypes.func.isRequired,
    auth: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, { login, loadUser })(Login);