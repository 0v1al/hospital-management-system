import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { addDoctor, loadSpecializations, loadAdmin } from "../../actions/admin";

import stylesLoginAdmin from "../LoginAdmin/LoginAdmin.module.css";
import styles from "./AddDoctor.module.css";

const AddDoctor = ({ loadAdmin, addDoctor, loadSpecializations, specializations, alerts }) => {
  const [input, setInput] = useState({
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    contact: "",
    password: "",
    specialization: ""
  });

  useEffect(() => {
    const fetch = async fetch => {
      loadAdmin();
      loadSpecializations();
    };

    fetch();
  }, [loadSpecializations]);

  const { firstname, lastname, email, address, contact, password, specialization } = input;

  const addDoctorSubmit = e => {
    e.preventDefault();
    addDoctor(input);
  };

  return (
      <div className="universalContainer">
        <h2 className="universalTitle">Admin | Add Doctor</h2>
        <form className="universalForm" onSubmit={e => addDoctorSubmit(e)}>
         {alerts.length > 0 && 
            <div className="alerts">
              {alerts.map(alert => 
                <span key={alert.id} className={`alert alert-${alert.type}`}>{alert.msg}</span>
              )} 
            </div>
          } 
          <h3 className={["universalDesc", styles.desc].join(" ")}>
            <i className="fas fa-user-plus"></i>
            Add Doctor
          </h3>
          <div className={stylesLoginAdmin.inputGroup}>
            <label>* Doctor Specialization:</label>
            <div className={[stylesLoginAdmin.inputRegister].join(" ")}>
              <select name="specialization" onChange={e => setInput({ ...input, [e.target.name]: e.target.value }) }>
                <option value="">Specialization</option>
                {specializations.map((specialization, idx) => (
                  <option key={idx} value={specialization.specialization}>{specialization.specialization}</option>
                ))}
              </select>
            </div>
          </div>
          <div className={stylesLoginAdmin.inputGroup}>
            <label>* Doctor Firstname:</label>
            <div className={[stylesLoginAdmin.inputRegister, stylesLoginAdmin.doctorIcon].join(" ")}>
              <input type="text" placeholder="Enter firstname..." name="firstname" value={firstname} onChange={e => setInput({ ...input, [e.target.name]: e.target.value })}/>
            </div>
          </div>
          <div className={stylesLoginAdmin.inputGroup}>
            <label>* Doctor Lastname:</label>
            <div className={[stylesLoginAdmin.inputRegister, stylesLoginAdmin.doctorIcon].join(" ")}>
              <input type="text" placeholder="Enter lastname..." name="lastname" value={lastname} onChange={e => setInput({ ...input, [e.target.name]: e.target.value })}/>
            </div>
          </div>
          <div className={stylesLoginAdmin.inputGroup}>
            <label>* Doctor Clinic Address:</label>
            <div className={[stylesLoginAdmin.inputRegister].join(" ")}>
              <textarea type="text" placeholder="Enter clinic address..." name="address" rows="4" cols="40" value={address} onChange={e => setInput({ ...input, [e.target.name]: e.target.value })}/>
            </div>
          </div>
          <div className={stylesLoginAdmin.inputGroup}>
            <label>* Doctor Email:</label>
            <div className={[stylesLoginAdmin.inputRegister, stylesLoginAdmin.emailIcon].join(" ")}>
              <input type="text" placeholder="Enter email..." name="email" value={email} onChange={e => setInput({ ...input, [e.target.name]: e.target.value })}/>
            </div>
          </div>
          <div className={stylesLoginAdmin.inputGroup}>
            <label>* Doctor Contact Number:</label>
            <div className={[stylesLoginAdmin.inputRegister, stylesLoginAdmin.contactIcon].join(" ")}>
              <input type="text" placeholder="Enter contact number..." name="contact" value={contact} onChange={e => setInput({ ...input, [e.target.name]: e.target.value })}/>
            </div>
          </div>
          <div className={stylesLoginAdmin.inputGroup}>
            <label>* Doctor Password:</label>
            <div className={[stylesLoginAdmin.inputRegister, stylesLoginAdmin.passwordIcon].join(" ")}>
              <input type="text" placeholder="Enter password..." name="password" value={password} onChange={e => setInput({ ...input, [e.target.name]: e.target.value })}/>
            </div>
            <span>[* = required]</span>
          </div>
          <input type="submit" className={styles.addBtn}  value="Add"/>
        </form>
      </div>
  );
};

const mapStateToProps = state => ({
  alerts: state.alert,
  specializations: state.specialization.specializations
});

export default connect(mapStateToProps, { addDoctor, loadSpecializations, loadAdmin })(AddDoctor);