import React, { useState } from "react";
import { connect } from "react-redux";

import styles from "./LoginAdmin.module.css";

const LoginAdmin = ({ alerts }) => {
  const [input, setInput] = useState({
    email: "",
    password: ""
  });

  const { email, password } = input;

  const loginAdminSubmit = e => {
    e.preventDefault();
    console.log(input);
  }

  return (
    <>
     <img src={require("../../../assets/bg2.jpg")} alt="wallpaper" className={styles.background} />
      <form className={styles.form} onSubmit={e => loginAdminSubmit(e)}>
        <div className="alerts">
          {alerts && alerts.map(alert => 
            <span key={alert.id} className={`alert alert-${alert.type}`}>{alert.msg}</span>
          )}
        </div>
        <div className={styles.description}>
          <h1><i className="fas fa-user-cog"></i>{" "}Admin</h1>
          <p>Login as an admin</p>
        </div>
        <div className={styles.inputGroup}>
          <label>* Admin email:</label>
          <div className={[styles.inputRegister, styles.emailIcon].join(" ")}>
            <input type="text" placeholder="Enter email..." name="email" value={email} onChange={e => setInput({ ...input, [e.target.name]: e.target.value }) }/>
          </div>
        </div>
        <div className={styles.inputGroup}>
          <label>* Admin password:</label>
          <div className={[styles.inputRegister, styles.passwordIcon].join(" ")}>
            <input type="password" placeholder="Enter password..." name="password" value={password} onChange={e => setInput({ ...input, [e.target.name]: e.target.value }) }/>
          </div>
          <span>[* = required]</span>
        </div>
        <input type="submit" value="Login"/>
      </form>
    </>
  );
}

const mapStateToProps = state => ({
  alerts: state.alert
});

export default  connect(mapStateToProps)(LoginAdmin);