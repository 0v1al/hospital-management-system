import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";

import { loadDoctor, loadPatients, updatePatient } from "../../actions/doctor";
import Spinner from "../../Layout/Spinner/Spinner";

import stylesLoginAdmin from "../../Admin/LoginAdmin/LoginAdmin.module.css";
import styles from "../../Admin/UpdateDoctor/UpdateDoctor.module.css";

const UpdatePatient = ({ loadDoctor, loadPatients, doctorId, updatePatient, patients, loading, alerts, match }) => {
  
  const [patient, setPatient] = useState(null);
  const { 
    firstname,
    lastname,
    email,
    address,
    contact,
    medicalHistory,
    age,
    male,
    female
  } = patient || ""; 

  useEffect(() => {
    const fetch = async () => {
      loadDoctor();
    };
    fetch();
  }, [loadDoctor]);

  useEffect(() => {
    const fetch = async () => {
      if (doctorId) loadPatients(doctorId);
    };
    fetch();
  }, [doctorId, loadPatients]);

  useEffect(() => {
    const patientEmail = match.params.patientEmail;
    const patientByEmail = patients.filter(pat => pat.email === patientEmail)[0];
    setPatient(patientByEmail);
  }, [patients, match.params.patientEmail]);
  
  const updatePatientNow = async e => {
    e.preventDefault();
    const oldPatientEmail = match.params.patientEmail;
    updatePatient(oldPatientEmail, patient);
  };

  return !loading ?  (
    <div className="universalContainer">
      <h2 className="universalTitle">Doctor | Update Patient</h2>
      <form className="universalForm" onSubmit={e => updatePatientNow(e)}>
        {alerts.length > 0 && 
          <div className="alerts">
            {alerts.map(alert => 
              <span key={alert.id} className={`alert alert-${alert.type}`}>{alert.msg}</span>
            )} 
          </div>
        } 
        <h3 className={["universalDesc", styles.desc].join(" ")}>
          <i className="fas fa-user-edit"></i>
          Update Patient
        </h3>
        <div className={stylesLoginAdmin.inputGroup}>
          <label>* Patient Firstname:</label>
          <div className={[stylesLoginAdmin.inputRegister, stylesLoginAdmin.userIcon].join(" ")}>
            <input type="text" placeholder="Enter firstname..." name="firstname" value={firstname} onChange={e => setPatient({ ...patient, [e.target.name]: e.target.value }) } />
          </div>
        </div>
        <div className={stylesLoginAdmin.inputGroup}>
          <label>* Patient Lastname:</label>
          <div className={[stylesLoginAdmin.inputRegister, stylesLoginAdmin.userIcon].join(" ")}>
            <input type="text" placeholder="Enter lastname..." name="lastname" value={lastname} onChange={e => setPatient({ ...patient, [e.target.name]: e.target.value }) }/>
          </div>
        </div>
        <div className={stylesLoginAdmin.inputGroup}>
          <label>* Patient Address:</label>
          <div className={[stylesLoginAdmin.inputRegister].join(" ")}>
            <textarea type="text" placeholder="Enter address..." rows="4" cols="40" name="address" value={address} onChange={e => setPatient({ ...patient, [e.target.name]: e.target.value }) }/>
          </div>
        </div>
        <div className={[stylesLoginAdmin.inputCheckbox].join(" ")} >
          <label>* Gender: </label>
          <label>Male </label>
          <input type="checkbox" name="male" checked={male} onChange={e => setPatient({ ...patient, male: true, female: false})}/>
          <label>Female</label>
          <input type="checkbox" name="female" checked={female} onChange={e => setPatient({ ...patient, male: false, female: true }) }/>
        </div>
        <div className={stylesLoginAdmin.inputGroup}>
          <label>* Patient Email:</label>
          <div className={[stylesLoginAdmin.inputRegister, stylesLoginAdmin.emailIcon].join(" ")}>
            <input type="text" placeholder="Enter email..." name="email" value={email} onChange={e => setPatient({ ...patient, [e.target.name]: e.target.value }) } />
          </div>
        </div>
        <div className={stylesLoginAdmin.inputGroup}>
          <label>* Patient Age:</label>
          <div className={[stylesLoginAdmin.inputRegister, stylesLoginAdmin.emailIcon].join(" ")}>
            <input type="text" placeholder="Enter age..." name="age" value={age} onChange={e => setPatient({ ...patient, [e.target.name]: e.target.value }) }/>
          </div>
        </div>
        <div className={stylesLoginAdmin.inputGroup}>
          <label>* Patient Contact Number:</label>
          <div className={[stylesLoginAdmin.inputRegister, stylesLoginAdmin.contactIcon].join(" ")}>
            <input type="text" placeholder="Enter contact number..." name="contact" value={contact} onChange={e => setPatient({ ...patient, [e.target.name]: e.target.value }) }/>
          </div>
        </div>
        <div className={stylesLoginAdmin.inputGroup}>
          <label> Patient Medical History:</label>
          <div className={[stylesLoginAdmin.inputRegister].join(" ")}>
            <textarea type="text" placeholder="Enter medical history..."  cols="40" rows="4" name="medicalHistory" value={medicalHistory} onChange={e => setPatient({ ...patient, [e.target.name]: e.target.value }) } />
          </div>
          <span>[* = required]</span>
        </div>
        <input type="submit" className={["universalBtn", styles.addBtn].join(" ")}  value="Update"/>
      </form>
    </div>
  ) : (<Spinner />)
}

const mapStateToProps = state => ({
  patients: state.patient.patients,
  doctorId: state.doctor._id,
  loading: state.patient.loading,
  alerts: state.alert
}); 

export default connect(mapStateToProps, { loadDoctor, loadPatients, updatePatient })(UpdatePatient);
