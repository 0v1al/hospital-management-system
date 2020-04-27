import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import Moment from "react-moment";

import Spinner from "../../Layout/Spinner/Spinner";
import { loadUser, loadUserAppointmentConsultations, removeAppointmentConsultation, cancelAppointmentConsultation } from "../../actions/user";
import { addNotificationDoctor } from "../../actions/notification";

const AppointmentHistory = ({ 
  loadUser, 
  loadUserAppointmentConsultations, 
  consultations, 
  removeAppointmentConsultation, 
  cancelAppointmentConsultation, 
  addNotificationDoctor,
  userEmail, 
  alerts, 
  loading 
}) => {
  const [email, setEmail] = useState(null);
  
  useEffect(() => {
    const fetch = async () => {
      loadUser();
    };
    fetch();
  }, [loadUser]);

  useEffect(() => {
    setEmail(userEmail);
  }, [userEmail])

  useEffect(() => {
    const fetch = async () => {
      loadUserAppointmentConsultations(userEmail);
    };
    if (userEmail) {
      fetch();
    }
  }, [email, loadUserAppointmentConsultations]);

  const removeConsultation = async e => {
    const consultationId = e.target.parentElement.parentElement.getAttribute("data-id");
    removeAppointmentConsultation(consultationId);
  }
 
  const cancelConsultation = async e => {
    const consultationId = e.target.parentElement.parentElement.getAttribute("data-id");
    if(cancelAppointmentConsultation(consultationId)) {
      const doctorId = e.target.parentElement.parentElement.getAttribute("doctor-id");
      addNotificationDoctor(doctorId, `Consultation of was canceled`);
    }
  }

  return (
    <div className="universalContainer">
      <h1 className="universalTitle">User | Appointment History</h1>
      <div className="universalContainerTableNoBorder">
        <h3 className="universalDesc universalDescForm">
          <i className="fas fa-book-open"></i>
          Appointment History
        </h3>
        {alerts.length > 0 && 
            <div className="alerts">
              {alerts.map(alert => 
                <span key={alert.id} className={`alert alert-${alert.type}`}>{alert.msg}</span>
              )} 
            </div>
          } 
        <table className="universalTable">
          <thead>
            <tr className="universalTableRow">
              <th>#</th>
              <th>Doctor Name</th>
              <th>Specialization</th>
              <th>Consultation Price</th>
              <th>Consultation Date/Time</th>
              <th>Sent At</th>
              <th>Current Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {!loading > 0 ? (consultations.map((consultation, index) => 
             (<tr className={[`universalTableRow ${consultation.active ? "" : "canceled"}`].join(" ")} data-id={consultation._id} doctor-id={consultation._doctor._id} key={index}>
                <td>{index + 1}</td>
                <td>
                  {
                    consultation._doctor && (
                      `${consultation._doctor.firstname} ${consultation._doctor.lastname}`
                    )
                  }
                </td>
                <td>
                  {
                  consultation._doctor && consultation._doctor.specialization
                  } 
                </td>
                <td>{consultation._doctor && consultation._doctor.consultationPrice}</td>
                <td>
                  <Moment format="YYYY/MM/DD">{`${new Date(consultation.consultationDate)}`}</Moment>
                  {`/${consultation.time}`}
                </td>
                <td><Moment format="YYYY/MM/DD">{consultations.creationDate}</Moment></td>
                <td>{
                  consultation.canceled ? 
                  <p className="universalCancel">Canceled By You</p> : 
                  consultation.canceledByDoctor ? 
                  <p className="universalCancel">Canceled By Doctor</p> : 
                  consultation.finished ? 
                  <p className="universalFinished">Finished</p> :
                  consultation.accepted ? 
                  <p className="universalActive">Accepted</p> :
                  <p className="universalActive">Active</p>
                }</td>
                <td> 
                  {(consultation.active && !consultation.accepted) ? (
                    <span className="universalRemoveIcon" onClick={e => cancelConsultation(e)}>
                      {/* <i className="fas fa-edit"></i> {"| "} */}
                      {/* <i className="fas fa-window-close"></i> */} cancel
                    </span> 
                  ) : (consultation.active && consultation.accepted ) ? (
                    <span className="universalRemoveIcon">
                      {/* <i className="fas fa-trash"></i> */} 
                    </span>                    
                  ) : (
                    <span className="universalRemoveIcon" onClick={e => removeConsultation(e)}>
                     {/* <i className="fas fa-trash"></i> */} delete
                    </span>
                  )}
                </td>
              </tr>
             ))) : (<Spinner />)}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  consultations: state.consultation.consultations,
  loading: state.consultation.loading,
  userEmail: state.user.email,
  alerts: state.alert
});

export default connect(mapStateToProps, { 
  loadUser, 
  loadUserAppointmentConsultations, 
  cancelAppointmentConsultation, 
  removeAppointmentConsultation, 
  addNotificationDoctor
})(AppointmentHistory)
