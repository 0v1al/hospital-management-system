import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import Moment from "react-moment";

import Spinner from "../../Layout/Spinner/Spinner";
import { loadDoctor } from "../../actions/doctor";
import { 
  loadDoctorAppointmentConsultations, 
  removeAppointmentConsultation, 
  cancelAppointmentConsultationDoctor ,
  finishAppointmentConsultationDoctor
} from "../../actions/user";

const AppointmentHistory = ({ 
  loadDoctor, 
  loadDoctorAppointmentConsultations, 
  cancelAppointmentConsultationDoctor, 
  removeAppointmentConsultation, 
  finishAppointmentConsultationDoctor,
  consultations, 
  doctorEmail, 
  doctor: { 
    specialization,
    consultationPrice
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
      loadDoctorAppointmentConsultations(doctorEmail);
    };
    if (email) {
      fetch();
    }
  }, [email]);

  const removeConsultation = async e => {
    const consultationId = e.target.parentElement.parentElement.parentElement.getAttribute("data-id");
    removeAppointmentConsultation(consultationId);
  }
 
  const cancelConsultation = async e => {
    const consultationId = e.target.parentElement.parentElement.getAttribute("data-id");
    cancelAppointmentConsultationDoctor(consultationId);
  }

  const finishConsultation = async e => {
    const consultationId = e.target.parentElement.parentElement.parentElement.getAttribute("data-id");
    finishAppointmentConsultationDoctor(consultationId);
  }

  return (
    <div className="universalContainer">
      <h1 className="universalTitle">User | Appointment History</h1>
      <div className="universalContainerTableNoBorder">
        <h3 className="universalDesc">Appointment History</h3>
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {!loading && !!doctorEmail && consultations.length > 0 ? (consultations.map((consultation, index) => 
             (<tr className={[`universalTableRow ${consultation.active ? "" : "canceled"}`].join(" ")} data-id={consultation._id}  key={index}>
                <td>{index + 1}</td>
                <td>
                  {
                    consultation._doctor && (
                      `${consultation._user.firstname} ${consultation._user.lastname}`
                      // `${consultation._doctor.firstname[0].toUpperCase()}${consultation._doctor.firstname.slice(1)}
                      // ${consultation._doctor.lastname[0].toUpperCase()}${consultation._doctor.lastname.slice(1)}`
                    )
                  }
                </td>
                <td>
                  {
                  specialization
                  // `${consultation._doctor.specialization[0].toUpperCase()}${consultation._doctor.specialization.slice(1)}`
                  } 
                </td>
                <td>{consultationPrice}</td>
                <td>
                  <Moment format="YYYY/MM/DD">{`${new Date(consultation.consultationDate)}`}</Moment>
                  {`/${consultation.time}`}
                </td>
                <td><Moment format="YYYY/MM/DD">{consultations.creationDate}</Moment></td>
                <td>
                  {
                    consultation.canceledByDoctor ? 
                    <p className="universalCancel">Canceled By You</p> : 
                    consultation.finished ?
                    <p className="universalFinished">Finished</p> :
                    consultation.canceled ? 
                    <p className="universalCancel">Canceled By Patient </p> : 
                    <p className="universalActive">"Active"</p>
                  }
                </td>
                <td> 
                  {consultation.active ? (
                    <>
                      <span className="universalRemoveIcon" onClick={e => cancelConsultation(e)}>
                        {/* <i className="fas fa-edit"></i> {"| "} */}
                        <i className="fas fa-window-close"></i>
                      </span>{" | "}
                      <span className="universalEditIcon" onClick={e => finishConsultation(e)}>
                        {/* FINISH */}<i className="fas fa-check-circle"></i>
                      </span>
                     </>
                  ) : (
                    <span className="universalRemoveIcon" onClick={e => removeConsultation(e)}>
                     <i className="fas fa-trash"></i>
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
  finishAppointmentConsultationDoctor
})(AppointmentHistory);
