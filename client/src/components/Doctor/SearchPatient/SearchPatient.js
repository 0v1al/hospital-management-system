import React, { useState,useEffect } from 'react';
import { connect } from "react-redux";
import Moment from "react-moment";

import { loadDoctor, searchPatient } from "../../actions/doctor";
import Spinner from "../../Layout/Spinner/Spinner";

import styles from "../../Admin/DoctorSpecialization/DoctorSpecialization.module.css";
import stylesAdminPatientDetails from "../../Admin/PatientDetails/PatientDetails.module.css";
import stylesHere from "./SearchPatient.module.css";

const SearchPatient = ({ 
  loadDoctor, 
  searchPatient, 
  patient, 
  medicalHistories, 
  loadingMedicalHistory,
  loading, 
  alerts 
}) => {
  const [email, setEmail] = useState("");
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      loadDoctor();
    };
    fetch();
  }, [loadDoctor]);

  useEffect(() => {
    if (!patient) {
      setSubmit(false);
    }
  }, [alerts]);  

  const searchPatientNow = async e => {
    e.preventDefault();
    setSubmit(true);
    searchPatient(email);
  };

  return (
    <div className="universalContainer">
      <h1 className="universalTitle">Doctor | Search Patient</h1>
      <form className={[styles.formDoctorSpecialization, stylesHere.formSearch].join(" ")} onSubmit={e => searchPatientNow(e)}>
        {alerts.length > 0 && 
          <div className="alerts">
            {alerts.map(alert => 
              <span key={alert.id} className={`alert alert-${alert.type}`}>{alert.msg}</span>
            )} 
          </div>
        } 
        <h3 className={["universalDesc", "universalDescForm"].join(" ")}>
          <i class="fas fa-search"></i>
          Search Patient By Email
        </h3>
        <input type="text" className="universalInput" placeholder="Enter patient email..." name="email" value={email} onChange={e => setEmail(e.target.value)}/>
        <input type="submit" value="Search" className={styles.btnDoctorSpecialization}/>
      </form>
        {submit ? (
          !loading && patient ? (
            <>
              <div className={[stylesAdminPatientDetails.pacientsDetails, stylesHere.patientDetailsHere].join(" ")}>
                <div className={stylesAdminPatientDetails.pacientDetails}>
                    <p>Patient Name:</p>
                    <p>Patient Contact:</p>
                    <p>Patient Gender:</p>
                    <p>Patient Medical History:</p>
                </div>
                <div className={stylesAdminPatientDetails.pacientDetails}>
                    <p><strong>{`${patient.firstname} ${patient.lastname}`}</strong></p>
                    <p>{patient.contact}</p>
                    <p>{patient.male ? "Male" : "Female"}</p>
                    <p>{patient.medicalHistory}</p>
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
                    <p><Moment format="YYYY-MM-DD">{patient.date}</Moment></p>
                </div>
              </div>
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
                      {/* <th></th> */}
                    </tr>
                </thead>
                <tbody>
                  {(!loadingMedicalHistory && medicalHistories) ? (medicalHistories.map((medicalHistory, index) => {
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
                            {/* <td>
                              <span className="universalRemoveIcon">
                                <i className="fas fa-trash"></i>
                              </span>
                            </td> */}
                          </tr>
                      )
                    }
                  }
                  )) : (<Spinner />)}
                </tbody>
              </table>
            </>
          ): (<Spinner />)
        ) : (null)}
    </div>
  )
}

const mapStateToProps = state => ({
  alerts: state.alert,
  loading: state.patient.loading,
  patient: state.patient.patient,
  medicalHistories: state.medicalHistory.medicalHistories,
  loadingMedicalHistory: state.medicalHistory.loading
});

export default connect(mapStateToProps, { loadDoctor, searchPatient })(SearchPatient);
