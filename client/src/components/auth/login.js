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

        <form className="form-inline my-2 my-lg-0" onSubmit={e => { onSubmit(e) }}>
            <div class="input-group flex-nowrap">
                <input className="form-control" type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} required />
                <input className="form-control" type="password" placeholder="Password" name="password" value={password} onChange={e => onChange(e)} minLength="6" />
                <div class="input-group-append">
                    <button type="submit" className="btn bg-color-secondary text-light border">Login</button></div>
            </div>
        </form>


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