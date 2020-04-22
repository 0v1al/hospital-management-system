import React, { useEffect } from 'react'
import { connect } from "react-redux";

import { loadUser } from "../../actions/user";
import { loadMedicalHistory } from "../../actions/medicalHistory";

import stylesAdminPatientDetails from "../../Admin/PatientDetails/PatientDetails.module.css";

const MedicalHistory = ({ loadUser, loadMedicalHistory , patientId }) => {

  useEffect(() => {
    const fetch = async () => {
      loadUser();
    };
    fetch();
  }, [loadUser]);

  useEffect(() => {
    loadMedicalHistory(patientId);
  }, [patientId]);

  return (
      <div className="universalContainer">
        <h1 className="universalTitle">Patient | Medical History</h1>
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
            {/* {(!loading && medicalHistories) ? (medicalHistories.map((medicalHistory, index) => {
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
            )) : (<Spinner />)} */}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  patientId: state.user._id
});

export default connect(mapStateToProps, { loadUser, loadMedicalHistory })(MedicalHistory);
