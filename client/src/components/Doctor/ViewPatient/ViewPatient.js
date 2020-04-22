import React, { useState,  useEffect } from 'react'
import { connect } from "react-redux";
import Moment from "react-moment";

import Spinner from "../../Layout/Spinner/Spinner";
import { loadDoctor, loginDoctor, loadPatient } from "../../actions/doctor";
import { loadMedicalHistories, addMedicalHistory, removeMedicalHistoryDoctor } from "../../actions/medicalHistory";

import styles from "./ViewPatient.module.css";
import stylesAdminPatientDetails from "../../Admin/PatientDetails/PatientDetails.module.css";
import stylesLoginAdmin from "../../Admin/LoginAdmin/LoginAdmin.module.css";

const ViewPatient = ({
  loadDoctor,
  loadMedicalHistories,
  addMedicalHistory, 
  loadPatient,
  loadingPatient, 
  removeMedicalHistoryDoctor, 
  medicalHistories, 
  patient,
  loading, 
  alerts,
  match 
}) => {
  const [modal, setModal] = useState(false);
  const [input, setInput] = useState({
    bloodPressure: "",
    bloodSugar: "",
    weight: "",
    bodyTemperature: "",
    prescription: ""
  });
  const { bloodPressure, bloodSugar, weight, bodyTemperature, prescription } = input;

  useEffect(() => {
    const fetch = async () => {
      loadDoctor();
      loadPatient(match.params.patientId);
      loadMedicalHistories(match.params.patientId);
    };
    fetch();
  }, [loginDoctor, loadMedicalHistories]);

  const showModal = e => {
    e.preventDefault();
    setModal(true);
  };

  const closeModal = e => {
    e.preventDefault();
    setModal(false);
  };

  const addMedicalHistoryNow = async e => {
    e.preventDefault();
    const patientId = match.params.patientId;
    addMedicalHistory(patientId, input);
    // if (addMedicalHistory(patientId, input)) {
    //   setInput({
    //     bloodPressure: "",
    //     bloodSugar: "",
    //     weight: "",
    //     bodyTemperature: "",
    //     prescription: ""
    //   });
    // }
  };

  const removeMedicalHistoryDoctorNow = async e => {
    e.preventDefault();
    const medicalHistoryId = e.target.parentElement.parentElement.parentElement.getAttribute("data-id");
    removeMedicalHistoryDoctor(medicalHistoryId);
  };

  const modalDom = (
    <>
      <div className={styles.overlay}></div>
      <div className={styles.modal}>
        <form className={["universalForm", styles.formModal].join(" ")} onSubmit={e => addMedicalHistoryNow(e)} >
          {alerts.length > 0 && 
            <div className="alerts">
              {alerts.map(alert => 
                <span key={alert.id} className={`alert alert-${alert.type}`}>{alert.msg}</span>
              )} 
            </div>
          } 
          <h3 className={["universalDesc", styles.desc].join(" ")}>
            <i className="fas fa-notes-medical"></i>
            Add Medical History
          </h3>
          <div className={stylesLoginAdmin.inputGroup}>
            <label>Blood Pressure:</label>
            <div className={[stylesLoginAdmin.inputRegister, stylesLoginAdmin.bloodIcon].join(" ")}>
              <input type="text" placeholder="Enter blood pressure..." name="bloodPressure" value={bloodPressure} onChange={e => setInput({ ...input, [e.target.name]: e.target.value }) }/>
            </div>
          </div>
          <div className={stylesLoginAdmin.inputGroup}>
            <label>Blood Sugar:</label>
            <div className={[stylesLoginAdmin.inputRegister, stylesLoginAdmin.bloodIcon].join(" ")}>
              <input type="text" placeholder="Enter blood sugar..." name="bloodSugar" value={bloodSugar} onChange={e => setInput({ ...input, [e.target.name]: e.target.value }) }/>
            </div>
          </div>
          <div className={stylesLoginAdmin.inputGroup}>
            <label>Weight:</label>
            <div className={[stylesLoginAdmin.inputRegister, stylesLoginAdmin.weightIcon].join(" ")}>
              <input type="text" placeholder="Enter weight..." name="weight" value={weight} onChange={e => setInput({ ...input, [e.target.name]: e.target.value }) }/>
            </div>
          </div>
          <div className={stylesLoginAdmin.inputGroup}>
            <label>Body Temperature:</label>
            <div className={[stylesLoginAdmin.inputRegister, stylesLoginAdmin.temperatureIcon].join(" ")}>
              <input type="text" placeholder="Enter body temperature..." name="bodyTemperature" value={bodyTemperature} onChange={e => setInput({ ...input, [e.target.name]: e.target.value }) }/>
            </div>
          </div>
          <div className={stylesLoginAdmin.inputGroup}>
            <label>Prescription:</label>
            <div className={[stylesLoginAdmin.inputRegister].join(" ")}>
              <textarea type="text" placeholder="Enter prescription..." rows="4" cols="40" name="prescription" value={prescription} onChange={e => setInput({ ...input, [e.target.name]: e.target.value }) }/>
            </div>
          </div>
          <div className={styles.modalBtns}>
            <input type="submit" className={["universalBtn", styles.addBtn].join(" ")} value="Add"/>
            <button className={["universalBtn", styles.addBtn].join(" ")} onClick={e => closeModal(e)}>Close</button>
          </div>
        </form>
      </div>
    </>
  );

  return (
    <>
      {modal && modalDom}
      <div className="universalContainer">
        <h1 className="universalTitle">Doctor | Manage Patient</h1>
        <h3 className={["universalDesc", stylesAdminPatientDetails.desc].join(" ")}>
            <i className="fas fa-user-edit"></i>
            Pacient Details
        </h3>
        {loadPatient && !!patient ? (
          <div className={stylesAdminPatientDetails.pacientsDetails}>
            <div className={stylesAdminPatientDetails.pacientDetails}>
                <p>Patient Name:</p>
                <p>Patient Contact:</p>
                <p>Patient Gender:</p>
                <p>Patient Medical History:</p>
            </div>
            <div className={stylesAdminPatientDetails.pacientDetails}>
                <p>{`${patient.firstname} ${patient.lastname}`}</p>
                <p>{patient.contact}</p>
                <p>{patient.gender}</p>
                <p>{patient.medicalHistory ? patient.medicalHistory : "---"}</p>
            </div>
            <div className={stylesAdminPatientDetails.pacientDetails}>
                <p>Patient Email:</p>
                <p>Patient Address:</p>
                <p>Patient Age:</p>
                <p>Patient Reg Date:</p>
            </div>
            <div className={stylesAdminPatientDetails.pacientDetails}>
                <p>{patient.email}</p>
                <p>{patient.address}</p>
                <p>{patient.age}</p>
                <p>{patient.date}</p>
            </div>
          </div>
        ) : (<Spinner />)}
        <button className={["universalBtnForm", styles.btn].join(" ")} onClick={e => showModal(e)}>add medical history</button>
        <div className={["universalContainerTableNoBorder", stylesAdminPatientDetails.containerTable].join(" ")}>
          
        <h3 className={["universalDesc", stylesAdminPatientDetails.desc].join(" ")}>
          <i class="fas fa-notes-medical"></i>
          Medical History
        </h3>
        <table className="universalTable">
          <thead>
              <tr className="universalTableRow">
                <th>#</th>
                <th>Blood Pressure</th>
                <th>Weight</th>
                <th>Blood Sugar</th>
                <th>Body Temperature</th>
                <th>Medical Prescription</th>
                <th>Visit Date</th>
                <th>Actions</th>
              </tr>
          </thead>
          <tbody>
            {(!loading && medicalHistories) ? (medicalHistories.map((medicalHistory, index) => {
              if (!medicalHistory.deleteDoctor) {
                  return (
                    <tr className="universalTableRow" data-id={medicalHistory._id}  key={index}>
                      <td>{index + 1}</td>
                      <td>{medicalHistory.bloodPressure}</td>
                      <td>{medicalHistory.weight}</td>
                      <td>{medicalHistory.bloodSugar}</td>
                      <td>{medicalHistory.bodyTemperature}</td>
                      <td>{medicalHistory.prescription}</td>
                      <td><Moment format="YYYY/MM/DD-HH:mm">{medicalHistory.date}</Moment></td>
                      <td>
                        <span className="universalRemoveIcon" onClick={e => removeMedicalHistoryDoctorNow(e)}>
                          <i className="fas fa-trash"></i>
                        </span>
                      </td>
                    </tr>
                 )
              }
            }
            )) : (<Spinner />)}
          </tbody>
        </table>
      </div>
    </div>
  </>
  )
}

const mapStateToProps = state => ({
  alerts: state.alert,
  medicalHistories: state.medicalHistory.medicalHistories,
  patient: state.patient.patient,
  loadingPatient: state.patient.loading,
  loading: state.medicalHistory.loading
});

export default connect(mapStateToProps, { 
  loadDoctor, 
  loadMedicalHistories, 
  addMedicalHistory, 
  removeMedicalHistoryDoctor, 
  loadPatient 
})(ViewPatient);
