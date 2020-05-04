import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import Moment from "react-moment";

import Spinner from "../../Layout/Spinner/Spinner";
import { addNotificationUser } from "../../actions/notification";
import { loadDoctor } from "../../actions/doctor";
import { 
  loadDoctorAppointmentConsultations, 
  removeAppointmentConsultation, 
  cancelAppointmentConsultationDoctor,
  finishAppointmentConsultationDoctor,
  acceptAppointmentConsultationDoctor
} from "../../actions/user";

const AppointmentHistory = ({ 
  loadDoctor, 
  loadDoctorAppointmentConsultations, 
  cancelAppointmentConsultationDoctor, 
  removeAppointmentConsultation, 
  finishAppointmentConsultationDoctor,
  acceptAppointmentConsultationDoctor,
  addNotificationUser,
  consultations, 
  doctorEmail, 
  doctor: { 
    specialization,
    consultationPrice,
    firstname : doctorFirstname,
    lastname : doctorLastname
    }, 
  loading, 
  alerts 
}) => {
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      loadDoctor();
    };
    fetch();
  }, [loadDoctor]);

  useEffect(() => {
    setEmail(doctorEmail);
  }, [doctorEmail])

  useEffect(() => {
    const fetch = async () => {
      console.log(email);
      loadDoctorAppointmentConsultations(email);
    };
    if (email) {
      fetch();
    }
  }, [email, loadDoctorAppointmentConsultations]);

  const removeConsultation = async e => {
    const consultationId = e.target.parentElement.parentElement.getAttribute("data-id");
    removeAppointmentConsultation(consultationId);
  }
 
  const cancelConsultation = async e => {
    const consultationId = e.target.parentElement.parentElement.getAttribute("data-id");
    if (cancelAppointmentConsultationDoctor(consultationId)) {
      const userId = e.target.parentElement.parentElement.getAttribute("data-user");
      addNotificationUser(userId, `Doctor ${doctorFirstname} ${doctorLastname} canceled your consultation request`);
    }
  }
  
  const acceptConsultation = async e => {
    const consultationId = e.target.parentElement.parentElement.getAttribute("data-id");
    if (acceptAppointmentConsultationDoctor(consultationId)) {
      const userId = e.target.parentElement.parentElement.getAttribute("data-user");
      addNotificationUser(userId, `Doctor ${doctorFirstname} ${doctorLastname} accepted your consultation request`);
    }
  };

  const finishConsultation = async e => {
    const consultationId = e.target.parentElement.parentElement.getAttribute("data-id");
    if (finishAppointmentConsultationDoctor(consultationId)) {
      const userId = e.target.parentElement.parentElement.getAttribute("data-user");
      addNotificationUser(userId, `Doctor ${doctorFirstname} ${doctorLastname} finished your consultation`);
    }
  }

  return (
    <div className="universalContainer">
      <h1 className="universalTitle">Doctor | Consultations History</h1>
      <div className="universalContainerTableNoBorder">
        <h3 className="universalDesc universalDescForm">
          <i className="fas fa-calendar-alt"></i>
          Consultations History
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
              <th>Patient Name</th>
              <th>Specialization</th>
              <th>Consultation Price</th>
              <th>Consultation Date/Time</th>
              <th>Send Time</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {!loading ? (consultations.map((consultation, index) => 
             (<tr className={[`universalTableRow ${consultation.active ? "" : "canceled"}`].join(" ")} data-id={consultation._id} data-user={consultation._user._id}  key={index}>
                <td>{index + 1}</td>
                <td>{
                    consultation._doctor && (
                      `${consultation._user.firstname} ${consultation._user.lastname}`
                )}</td>
                <td>{specialization}</td>
                <td>{consultationPrice}</td>
                <td>
                  <Moment format="YYYY/MM/DD">{`${new Date(consultation.consultationDate)}`}</Moment>
                  {`/${consultation.time}`}
                </td>
                <td><Moment format="YYYY/MM/DD">{consultations.creationDate}</Moment></td>
                <td>{
                    consultation.canceledByDoctor ? 
                    <p className="universalCancel">Canceled By You</p> : 
                    consultation.finished ?
                    <p className="universalFinished">Finished</p> :
                    consultation.canceled ? 
                    <p className="universalCancel">Canceled By Patient </p> : 
                    consultation.accepted ? 
                    <p className="universalActive">Accepted</p> :
                    <p className="universalActive">Active</p>
                }</td>
                <td>{(consultation.active && !consultation.accepted) ? (
                    <>
                      <span className="universalRemoveIcon" onClick={e => cancelConsultation(e)}>
                        {/* <i className="fas fa-window-close"></i> */}cancel
                      </span>{" | "}
                      <span className="universalEditIcon" onClick={e => acceptConsultation(e)}>
                        {/* <i className="fas fa-check-circle"></i> */}accept
                      </span>
                     </>
                  ) : (consultation.active && consultation.accepted) ? (
                    <span className="universalEditIcon" onClick={e => finishConsultation(e)}>
                      {/* <i className="fas fa-check-circle"></i> */}finish consultation
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
  doctorEmail: state.doctor.email,
  doctor: state.doctor,
  alerts: state.alert
});   

export default connect(mapStateToProps, { 
  loadDoctor,
  loadDoctorAppointmentConsultations,
  cancelAppointmentConsultationDoctor,
  removeAppointmentConsultation,
  finishAppointmentConsultationDoctor,
  acceptAppointmentConsultationDoctor,
  addNotificationUser
})(AppointmentHistory);
