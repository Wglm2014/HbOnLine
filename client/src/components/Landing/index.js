import React from "react"

function Landing() {
  return (
    <section className="landing container">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Home Budget One Line</h1>
          <p className="lead">Take care of your spences, know were is your money going...</p>
          <div className="buttons">
            <a href="/register" className="btn btn-primary btn-lg m-2">Sign Up</a>
            <a href="/login" className="btn btn-light btn-lg m-2">Login</a>
          </div>
        </div>
      </div>
    </section>);
}
export default Landing;