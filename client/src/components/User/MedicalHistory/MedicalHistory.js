import React, { useEffect } from 'react'
import { connect } from "react-redux";
import Moment from "react-moment";

import Spinner from "../../Layout/Spinner/Spinner";
import { loadUser } from "../../actions/user";
import { loadMedicalHistoriesByUserId, removeMedicalHistoryPatient } from "../../actions/medicalHistory";

import stylesAdminPatientDetails from "../../Admin/PatientDetails/PatientDetails.module.css";

const MedicalHistory = ({ 
  loadUser, 
  loadMedicalHistoriesByUserId,
  removeMedicalHistoryPatient,
  userId, 
  loading,
  medicalHistories,
  alerts
}) => {

  useEffect(() => {
    const fetch = async () => {
      loadUser();
    };
    fetch();
  }, [loadUser]);

  useEffect(() => {
    const fetch = async () => {
      loadMedicalHistoriesByUserId(userId);
    };
    if (userId) {
      fetch();
    }
  }, [userId, loadMedicalHistoriesByUserId]);

  const removeMedicalHistoryUserNow = async e => {
    const medicalHistoryId = e.target.parentElement.parentElement.parentElement.getAttribute("data-id");
    removeMedicalHistoryPatient(medicalHistoryId);
  }

  return (
      <div className="universalContainer">
        <h1 className="universalTitle">Patient | Medical History</h1>
        <div className={["universalContainerTableNoBorder", stylesAdminPatientDetails.containerTable].join(" ")}>
          {alerts.length > 0 && 
              <div className="alerts">
                {alerts.map(alert => 
                  <span key={alert.id} className={`alert alert-${alert.type}`}>{alert.msg}</span>
                )} 
              </div>
            }
        <h3 className={["universalDesc", "universalDescForm"].join(" ")}>
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
                <th></th>
              </tr>
          </thead>
          <tbody>
            {(!loading) ? (medicalHistories.map((medicalHistory, index) => {
              if (!medicalHistory.deletePatient) {
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
                        <span className="universalRemoveIcon" onClick={e => removeMedicalHistoryUserNow(e)}>
                          <i className="fas fa-trash"></i>
                        </span>
                      </td>
                    </tr>
                  )
              }
              return null; //!unknow
            }
            )) : (<Spinner />)}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  userId: state.user._id,
  medicalHistories: state.medicalHistory.medicalHistories,
  loading: state.medicalHistory.loading,
  alerts: state.alert
});

export default connect(mapStateToProps, { loadUser, loadMedicalHistoriesByUserId, removeMedicalHistoryPatient })(MedicalHistory);
