import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { loginPatient } from "../../actions/patient";
import { getCookie } from "../../cookie";
import styles from "../../Admin/LoginAdmin/LoginAdmin.module.css";

const LoginPatient = ({ alerts, loginPatient, history }) => {
  const [input, setInput] = useState({
    email: "",
    password: ""
  });

  const { email, password } = input;

  const loginSubmit = async e => {
    e.preventDefault();
    loginPatient(input, history);
  }
  return (
    <>
      <img src={require("../../../assets/bg2.jpg")} alt="wallpaper" className={styles.background} />
      <form className={styles.form} onSubmit={e => loginSubmit(e)}>
        <div className="alerts">
          {alerts && alerts.map(alert => 
            <span key={alert.id} className={`alert alert-${alert.type}`}>{alert.msg}</span>
          )}
        </div>
        <div className={styles.description}>
          <h1><i className="fas fa-user"></i>{" "}Patient</h1>
          <p>Login as a Patient</p>
        </div>
        <div className={styles.inputGroup}>
          <label>* Patient email:</label>
          <div className={[styles.inputRegister, styles.emailIcon].join(" ")}>
            <input type="text" placeholder="Enter email..." name="email" value={email} onChange={e => setInput({ ...input, [e.target.name]: e.target.value })}/>
          </div>
        </div>
        <div className={styles.inputGroup}>
          <label>* Patient password:</label>
          <div className={[styles.inputRegister, styles.passwordIcon].join(" ")}>
            <input type="password" placeholder="Enter password..." name="password" value={password} onChange={e => setInput({ ...input, [e.target.name]: e.target.value })}/>
          </div>
          <span>[* = required]</span>
        </div>
        <input type="submit" value="Login"/>
        <span className={styles.span}>Don't have an account? Register <Link to="/register-patient">here</Link></span>
      </form>
    </>
  );
}

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps, { loginPatient })(withRouter(LoginPatient));