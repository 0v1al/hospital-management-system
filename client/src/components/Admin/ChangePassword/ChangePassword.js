import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";

import { changePassword, loadAdmin } from "../../actions/admin";

import stylesLoginAdmin from "../LoginAdmin/LoginAdmin.module.css";
import styles from "../UpdateDoctor/UpdateDoctor.module.css";
import stylesHere from "../../Doctor/ChangePassword/ChangePassword.module.css";

const ChangePassword = ({ changePassword, loadAdmin, email, alerts }) => {
  const [input, setInput] = useState({
    password: "",
    newPassword: "",
    repeatNewPassword: ""
  });
  const { password, newPassword, repeatNewPassword } = input;

  useEffect(() => {
    const fetch = async () => {
      await loadAdmin();
    };
    fetch();
  }, [loadAdmin]);

  const changePasswordNow = e => {
    e.preventDefault();
    const body = { email, ...input };
    changePassword(body);
  };

  return (
    <div className="universalContainer">
      <h1 className="universalTitle">Admin | Change Password</h1>
      <form className={["universalForm", stylesHere.form].join(" ")} onSubmit={e => changePasswordNow(e)}>
        {alerts.length > 0 && 
          <div className="alerts">
            {alerts.map(alert => 
              <span key={alert.id} className={`alert alert-${alert.type}`}>{alert.msg}</span>
            )} 
          </div>
        } 
        <h3 className={["universalDesc", styles.desc].join(" ")}>
          <i className="fas fa-user-edit"></i>
          Change Password
        </h3>
        <div className={stylesLoginAdmin.inputGroup}>
          <label>* Current Password:</label>
          <div className={[stylesLoginAdmin.inputRegister, stylesLoginAdmin.passwordIcon].join(" ")}>
            <input type="password" placeholder="Enter current password..." name="password" value={password} onChange={e => setInput({ ...input, [e.target.name]: e.target.value }) }  />
          </div>
        </div>
        <div className={stylesLoginAdmin.inputGroup}>
          <label>* New Password:</label>
          <div className={[stylesLoginAdmin.inputRegister, stylesLoginAdmin.passwordIcon].join(" ")}>
            <input type="password" placeholder="Enter new password..." name="newPassword" value={newPassword} onChange={e => setInput({ ...input, [e.target.name]: e.target.value }) }  />
          </div>
        </div>
        <div className={stylesLoginAdmin.inputGroup}>
          <label>* Repeat New Password:</label>
          <div className={[stylesLoginAdmin.inputRegister, stylesLoginAdmin.passwordIcon].join(" ")}>
            <input type="password" placeholder="Enter new password..." name="repeatNewPassword" value={repeatNewPassword} onChange={e => setInput({ ...input, [e.target.name]: e.target.value }) }  />
          </div>
          <span>[* = required]</span>
        </div>
        <input type="submit" className={["universalBtn", styles.addBtn, stylesHere.btn].join(" ")}  value="change"/>
      </form>
    </div>
  )
}

const mapStateToProps = state => ({
  alerts: state.alert,
  email: state.admin.email
});
export default connect(mapStateToProps, { changePassword, loadAdmin })(ChangePassword);
