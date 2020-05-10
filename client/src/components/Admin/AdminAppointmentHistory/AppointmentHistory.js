import React, { useEffect } from 'react';
import { connect } from "react-redux";
import Moment from "react-moment";

import Spinner from "../../Layout/Spinner/Spinner";
import { loadAdmin } from "../../actions/admin";
import { loadAllAppointmentConsultations } from "../../actions/user";

import styles from "./AppointmentHistory.module.css";

const AppointmentHistory = ({ loadAdmin, loadAllAppointmentConsultations, consultations, loading}) => {
  
  useEffect(() => {
    const fetch = async () => {
      loadAdmin();
      loadAllAppointmentConsultations();
    };
    fetch();
  }, [loadAdmin, loadAllAppointmentConsultations]);

  return (
    <div className="universalContainer">
      <h1 className="universalTitle">Admin | Appointmen tHistory</h1>
      <div className={["universalContainerTableNoBorder universalMt", styles.form].join()}>
        <h3 className="universalDesc universalDescForm">
          <i className="fas fa-notes-medical"></i>
          Consultation History
        </h3>
        <table className="universalTable">
          <thead>
            <tr className="universalTableRow">
              <th>#</th>
              <th>Doctor Name</th>
              <th>Patient Name</th>
              <th>Specialization</th>
              <th>Consultation Price</th>
              <th>Consultation Date/Time</th>
              <th>Consultation Send</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (consultations.map((consultation, index) => 
                (<tr className="universalTableRow" data-id={consultation._id}  key={index}>
                    <td>{index + 1}</td>
                    <td>
                      {
                       consultation._doctor && `${consultation._doctor.firstname} ${consultation._doctor.lastname}`
                      }
                    </td>
                    <td>
                      {
                        consultation._user && `${consultation._user.firstname} ${consultation._user.lastname}`
                      }
                    </td>
                    <td>{consultation._doctor && consultation._doctor.specialization}</td>
                    <td>{consultation._doctor && consultation._doctor.consultationPrice}</td>
                    <td>
                      <Moment format="YYYY-MM-DD">{`${consultation.consultationDate}`}</Moment>
                      {`/${consultation.time}`}
                    </td>
                    <td>
                      <Moment format="YYYY-MM-DD">{consultation.creationDate}</Moment>
                    </td>
                    <td>{
                      consultation.canceled ? 
                      <p className="universalCancel">Canceled By Patient</p> :
                      consultation.canceledByDoctor ? 
                      <p className="universalCancel">Canceled By Doctor</p> :
                      consultation.finished ? 
                      <p className="universalFinished">Finished</p> :
                      consultation.accepted ? 
                      <p className="universalActive">Accepted</p> :
                      <p className="universalActive">Active</p> 
                    }
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
  loading: state.consultation.loading,
  consultations: state.consultation.consultations
});

export default connect(mapStateToProps, { loadAdmin, loadAllAppointmentConsultations })(AppointmentHistory);