import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";

import { loadAdmin, loadUsers } from "../../actions/admin";
import Spinner from "../../Layout/Spinner/Spinner";

import styles from "./PatientDetails.module.css";

const PatientDetails = ({ loadAdmin, loadUsers, users, match }) => {
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      loadAdmin();
      loadUsers();
    };
    fetch();
  }, [loadAdmin, loadUsers]);

  useEffect(() => {
    setPatient(getUserByEmail());
  }, [users]);

  function getUserByEmail() {
    const userEmail = match.params.patientEmail;
    return users.filter(user => user.email === userEmail)[0];
  }

  const { firstname, lastname, email, address, contact, password, specialization } = patient || "";

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
            <p>answer</p>
            <p>answer</p>
            <p>answer</p>
            <p>answer</p>
        </div>
        <div className={styles.pacientDetails}>
            <p>Patient Email:</p>
            <p>Patient Address:</p>
            <p>Patient Age:</p>
            <p>Patient Reg Date:</p>
        </div>
        <div className={styles.pacientDetails}>
            <p>answer</p>
            <p>answer</p>
            <p>answer</p>
            <p>answer</p>
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
              <tr className="universalTableRow">
                  <td>1</td>
                  <td>80/120</td>
                  <td>85</td>
                  <td>120</td>
                  <td>98.6</td>
                  <td>Prescription</td>
                  <td>2019/03/04</td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <Spinner />
  )
}

const mapStateToProps = state => ({
  users: state.admin.users,
  loading: state.admin.loading
});

export default connect(mapStateToProps, { loadAdmin, loadUsers })(PatientDetails)
