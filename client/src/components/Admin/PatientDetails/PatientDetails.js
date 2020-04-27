import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import Moment from "react-moment";

import { loadAdmin } from "../../actions/admin";
import { loadAllPatients } from '../../actions/doctor';
import { loadMedicalHistoriesByPatientId } from "../../actions/medicalHistory";
import Spinner from "../../Layout/Spinner/Spinner";

import styles from "./PatientDetails.module.css";

const PatientDetails = ({ 
  loadAdmin, 
  loadAllPatients, 
  loadMedicalHistoriesByPatientId, 
  patients, 
  medicalHistories, 
  loadingMedicalHistories,
  match 
}) => {
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      loadAdmin();
      loadAllPatients();
      loadMedicalHistoriesByPatientId(match.params.patientId);
      console.log(match.params.patientId);
    };
    fetch();
  }, [loadAdmin, loadAllPatients, loadMedicalHistoriesByPatientId]);

  useEffect(() => {
    setPatient(getPatientByEmail());
  }, [patients]);

  function getPatientByEmail() {
    const patientEmail = match.params.patientEmail;
    return patients.filter(patient => patient.email === patientEmail)[0];
  }

  // const { firstname, lastname, email, address, contact, password, specialization } = patient || "";

  return patient ? (
    <div className="universalContainer">
      <h2 className="universalTitle">Admin | Manage Patients</h2>
      <h3 className={["universalDesc", styles.desc].join(" ")}>
          <i className="fas fa-user-edit"></i>
          Pacient Details
      </h3>
      <div className={styles.pacientsDetails}>
        <div className={styles.pacientDetails}>
            <p>Patient Name:</p>
            <p>Patient Contact:</p>
            <p>Patient Gender:</p>
            <p>Patient Medical History:</p>
        </div>
        <div className={styles.pacientDetails}>
            <p>{`${patient.firstname} ${patient.lastname}`}</p>
            <p>{patient.contact}</p>
            <p>{patient.male ? "Male" : "Female"}</p>
            <p>{patient.medicalHistory ? patient.medicalHistory : "---"}</p>
        </div>
        <div className={styles.pacientDetails}>
            <p>Patient Email:</p>
            <p>Patient Address:</p>
            <p>Patient Age:</p>
            <p>Patient Reg Date:</p>
        </div>
        <div className={styles.pacientDetails}>
            <p>{patient.email}</p>
            <p>{patient.address}</p>
            <p>{patient.age}</p>
            <p><Moment format="YYYY-MM-DD">{patient.date}</Moment></p>
        </div>
      </div>
      <div className={["universalContainerTableNoBorder", styles.containerTable].join(" ")}>
        <h3 className={["universalDesc", styles.desc].join(" ")}>
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
              </tr>
          </thead>
          <tbody>
            {!loadingMedicalHistories ? (
              medicalHistories.map((medicalHistory, index) => (
                <tr className="universalTableRow" key={index} data-id={medicalHistory._id}>
                  <td>{index + 1}</td>
                  <td>{medicalHistory.bloodPressure}</td>
                  <td>{medicalHistory.weight}</td>
                  <td>{medicalHistory.bloodSugar}</td>
                  <td>{medicalHistory.bodyTemperature}</td>
                  <td>{medicalHistory.prescription}</td>
                  <td><Moment format="YYYY-MM-DD">{medicalHistory.date}</Moment></td>
                </tr>
              ))
            ) : (<Spinner/>)}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <Spinner />
  )
}

const mapStateToProps = state => ({
  patients: state.patient.patients,
  loading: state.patient.loading,
  medicalHistories: state.medicalHistory.medicalHistories,
  loadingMedicalHistories: state.medicalHistory.loading
});

export default connect(mapStateToProps, { 
  loadAdmin, 
  loadAllPatients, 
  loadMedicalHistoriesByPatientId 
})(PatientDetails)
