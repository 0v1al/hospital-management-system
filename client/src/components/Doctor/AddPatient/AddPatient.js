import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";

import { loadDoctor, addPatient } from "../../actions/doctor";

import stylesHere from "./AddPatient.module.css";
import styles from "../../Admin/AddDoctor/AddDoctor.module.css";
import stylesLoginAdmin from "../../Admin/LoginAdmin/LoginAdmin.module.css";

const AddPatient = ({ loadDoctor, addPatient, doctorId, alerts }) => {
  const [input, setInput] = useState({
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    contact: "",
    medicalHistory: "",
    age: "",
    male: false,
    female: false
  });

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
  } = input;

  useEffect(() => {
    const fetch = async () => {
      loadDoctor();
    };
    fetch();
  }, [loadDoctor]);

  const addPatientNow = e => {
    e.preventDefault();
    addPatient(doctorId, input);
  }

  return (
    <div className="universalContainer">
      <h2 className="universalTitle">Doctor | Add Patient</h2>
      <form className="universalForm" onSubmit={e => addPatientNow(e)}>
      {alerts.length > 0 && 
          <div className="alerts">
            {alerts.map(alert => 
              <span key={alert.id} className={`alert alert-${alert.type}`}>{alert.msg}</span>
            )} 
          </div>
        } 
        <h3 className={["universalDesc", styles.desc].join(" ")}>
          <i className="fas fa-user-plus"></i>
          Add Patient
        </h3>
        <p className={stylesHere.warning}>! the patient email must be the same as that of the user who sent the consultation</p>
        <div className={stylesLoginAdmin.inputGroup}>
          <label>* Patient Firstname:</label>
          <div className={[stylesLoginAdmin.inputRegister, stylesLoginAdmin.userIcon].join(" ")}>
            <input type="text" placeholder="Enter firstname..." name="firstname" value={firstname} onChange={e => setInput({ ...input, [e.target.name]: e.target.value }) }/>
          </div>
        </div>
        <div className={stylesLoginAdmin.inputGroup}>
          <label>* Patient Lastname:</label>
          <div className={[stylesLoginAdmin.inputRegister, stylesLoginAdmin.userIcon].join(" ")}>
            <input type="text" placeholder="Enter lastname..." name="lastname" value={lastname} onChange={e => setInput({ ...input, [e.target.name]: e.target.value }) }/>
          </div>
        </div>
        <div className={stylesLoginAdmin.inputGroup}>
          <label>* Patient Address:</label>
          <div className={[stylesLoginAdmin.inputRegister].join(" ")}>
            <textarea type="text" placeholder="Enter address..." rows="4" cols="40" name="address" value={address} onChange={e => setInput({ ...input, [e.target.name]: e.target.value }) } />
          </div>
        </div>
        <div className={[stylesLoginAdmin.inputCheckbox].join(" ")} >
          <label>* Gender: </label>
          <label>Male </label>
          <input type="checkbox" name="male" checked={male} onChange={e => setInput({ ...input, male: true, female: false })} />
          <label>Female</label>
          <input type="checkbox" name="female" checked={female} onChange={e => setInput({ ...input, female: true, male: false })} />
        </div>
        <div className={stylesLoginAdmin.inputGroup}>
          <label>* Patient Email:</label>
          <div className={[stylesLoginAdmin.inputRegister, stylesLoginAdmin.emailIcon].join(" ")}>
            <input type="text" placeholder="Enter email..." name="email" value={email} onChange={e => setInput({ ...input, [e.target.name]: e.target.value }) }/>
          </div>
        </div>
        <div className={stylesLoginAdmin.inputGroup}>
          <label>* Patient Age:</label>
          <div className={[stylesLoginAdmin.inputRegister, stylesLoginAdmin.emailIcon].join(" ")}>
            <input type="text" placeholder="Enter age..." name="age" value={age} onChange={e => setInput({ ...input, [e.target.name]: e.target.value }) }/>
          </div>
        </div>
        <div className={stylesLoginAdmin.inputGroup}>
          <label>* Patient Contact Number:</label>
          <div className={[stylesLoginAdmin.inputRegister, stylesLoginAdmin.contactIcon].join(" ")}>
            <input type="text" placeholder="Enter contact number..." name="contact" value={contact} onChange={e => setInput({ ...input, [e.target.name]: e.target.value }) }/>
          </div>
        </div>
        <div className={stylesLoginAdmin.inputGroup}>
          <label> Patient Medical History:</label>
          <div className={[stylesLoginAdmin.inputRegister].join(" ")}>
            <textarea type="text" placeholder="Enter medical history..."  cols="40" rows="4" name="medicalHistory" value={medicalHistory} onChange={e => setInput({ ...input, [e.target.name]: e.target.value }) } />
          </div>
          <span>[* = required]</span>
        </div>
        <input type="submit" className={styles.addBtn}  value="Add"/>
      </form>
    </div>
  )
}

const mapStateToProps = state => ({
  alerts: state.alert,
  doctorId: state.doctor._id
});

export default connect(mapStateToProps, { loadDoctor, addPatient })(AddPatient);
