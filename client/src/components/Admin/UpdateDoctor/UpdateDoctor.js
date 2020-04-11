import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";

import { loadDoctors, loadAdmin, loadSpecializations, updateDoctor } from "../../actions/admin";
import Spinner from "../../Layout/Spinner/Spinner";

import styles from "./UpdateDoctor.module.css";
import stylesLoginAdmin from "../LoginAdmin/LoginAdmin.module.css";

const UpdateDoctor = ({ match, loadDoctors, loadAdmin, loadSpecializations, doctors, updateDoctor, specializations, alerts }) => {
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      loadAdmin();
      loadSpecializations();
      loadDoctors();
    };
    fetch();
  }, [loadAdmin, loadDoctors]);

  useEffect(() => {
    setDoctor(getDoctorByEmail());
  }, [doctors]);

  const { firstname, lastname, email, address, contact, password, specialization } = doctor || "";

  function getDoctorByEmail() {
    const doctorEmail = match.params.doctorEmail;
    return doctors.filter(doc => doc.email === doctorEmail)[0];
  }

  const updateDoctorSubmit = e => {
    e.preventDefault();
    const doctorEmail = match.params.doctorEmail;
    updateDoctor({ doctorEmail, ...doctor });
}

  return doctor ? (
    <div className="universalContainer">
      <h2 className="universalTitle">Admin | Add Doctor</h2>
      <form className="universalForm" onSubmit={e => updateDoctorSubmit(e)}>
        {alerts.length > 0 && 
          <div className="alerts">
            {alerts.map(alert => 
              <span key={alert.id} className={`alert alert-${alert.type}`}>{alert.msg}</span>
            )} 
          </div>
        } 
        <h3 className={["universalDesc", styles.desc].join(" ")}>
          <i className="fas fa-user-edit"></i>
          Update Doctor
        </h3>
        <div className={stylesLoginAdmin.inputGroup}>
          <label>* Doctor Specialization:</label>
          <div className={[stylesLoginAdmin.inputRegister].join(" ")}>
            <select name="specialization" onChange={e => setDoctor({ ...doctor, [e.target.name]: e.target.value }) }>
              <option value={doctor.specialization}>{doctor.specialization}</option>
              {specializations.map((specialization, idx) => (
                    <option key={idx} value={specialization.specialization}>{specialization.specialization}</option>
              ))}
            </select>
          </div>
        </div>
        <div className={stylesLoginAdmin.inputGroup}>
          <label>* Doctor Firstname:</label>
          <div className={[stylesLoginAdmin.inputRegister, stylesLoginAdmin.doctorIcon].join(" ")}>
            <input type="text" placeholder="Enter firstname..." name="firstname" value={firstname} onChange={e => setDoctor({ ...doctor, [e.target.name]: e.target.value }) }/>
          </div>
        </div>
        <div className={stylesLoginAdmin.inputGroup}>
          <label>* Doctor Lastname:</label>
          <div className={[stylesLoginAdmin.inputRegister, stylesLoginAdmin.doctorIcon].join(" ")}>
            <input type="text" placeholder="Enter lastname..." name="lastname" value={lastname} onChange={e => setDoctor({ ...doctor, [e.target.name]: e.target.value }) }/>
          </div>
        </div>
        <div className={stylesLoginAdmin.inputGroup}>
          <label>* Doctor Clinic Address:</label>
          <div className={[stylesLoginAdmin.inputRegister].join(" ")}>
            <textarea type="text" placeholder="Enter clinic address..." name="address" rows="4" cols="40" value={address} onChange={e => setDoctor({ ...doctor, [e.target.name]: e.target.value }) }/>
          </div>
        </div>
        <div className={stylesLoginAdmin.inputGroup}>
          <label>* Doctor Email:</label>
          <div className={[stylesLoginAdmin.inputRegister, stylesLoginAdmin.emailIcon].join(" ")}>
            <input type="text" placeholder="Enter email..." name="email" value={email} onChange={e => setDoctor({ ...doctor, [e.target.name]: e.target.value }) }/>
          </div>
        </div>
        <div className={stylesLoginAdmin.inputGroup}>
          <label>* Doctor Contact Number:</label>
          <div className={[stylesLoginAdmin.inputRegister, stylesLoginAdmin.contactIcon].join(" ")}>
            <input type="text" placeholder="Enter contact number..." name="contact" value={contact} onChange={e => setDoctor({ ...doctor, [e.target.name]: e.target.value }) }/>
          </div>
        </div>
        <div className={stylesLoginAdmin.inputGroup}>
          <label>* Doctor Password:</label>
          <div className={[stylesLoginAdmin.inputRegister, stylesLoginAdmin.passwordIcon].join(" ")}>
            <input type="text" placeholder="Enter password..." name="password" value={password} onChange={e => setDoctor({ ...doctor, [e.target.name]: e.target.value }) } />
          </div>
          <span>[* = required]</span>
        </div>
        <input type="submit" className={["universalBtn", styles.addBtn].join(" ")}  value="Save"/>
      </form>
    </div>
  ) : (<Spinner/>)
}

const mapStateToProps = state => ({
  alerts: state.alert,
  doctors: state.admin.doctors,
  specializations: state.specialization.specializations
});

export default connect(mapStateToProps, { loadDoctors, loadAdmin, loadSpecializations, updateDoctor })(UpdateDoctor)
