import React, { useEffect } from 'react'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";

import Spinner from "../../Layout/Spinner/Spinner";
import { loadDoctor, loadPatients, removePatient } from "../../actions/doctor"; 

import styles from "../../Admin/AddDoctor/AddDoctor.module.css";

const ManagePatient = ({ loadDoctor, loadPatients, removePatient, doctorId, patients, loading, alerts }) => {

  useEffect(() => {
    const fetch = async () => {
      await loadDoctor();
    };
    fetch();
  }, [loadDoctor]);

  useEffect(() => {
    const fetch = async () => {
      if (doctorId) {
        loadPatients(doctorId);
      }
    };
    fetch();
  }, [doctorId, loadPatients]);

  const removePatientNow = async e => {
    const patientId = e.target.parentElement.parentElement.parentElement.getAttribute("data-id");
    if (!doctorId) return;
    const data = { patientId, doctorId };
    removePatient(data);
  };

  return (
    <div className="universalContainer">
      <h2 className="universalTitle">Admin | Manage Patients</h2>
      <div className="universalContainerTableNoBorder">
        <h3 className={["universalDesc", styles.desc].join(" ")}>
          <i className="fas fa-tasks"></i>
          Manage Patients
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
              <th>Contact Number</th>
              <th>Gender</th>
              <th>Register Date</th>
              <th>Update Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {(!loading && doctorId) ? (patients.map((patient, index) => 
            (<tr className="universalTableRow" data-id={patient._id}  key={index}>
                <td>{index + 1}</td>
                <td>
                  {
                    `${patient.firstname[0].toUpperCase()}${patient.firstname.slice(1)} 
                    ${patient.lastname[0].toUpperCase()}${patient.lastname.slice(1)}`
                  }
                </td>
                <td>{patient.contact}</td>
                <td>{patient.male ? "Male" : "Female"}</td>
                <td><Moment format="YYYY/MM/DD-HH:mm">{patient.date}</Moment></td>
                <td>
                  {
                    patient.updateDate ? 
                    <Moment format="YYYY/MM/DD-HH:mm">{patient.updateDate}</Moment> 
                    : "---"
                  }
                </td>
                <td>
                  <Link to={`/doctor-update-patient/${patient.email}`} className="universalEditIcon">
                    <i className="fas fa-edit"></i> {"| "}
                  </Link>
                  <Link to={`/doctor-view-patient/${patient._id}`} className="universalEditIcon">
                    <i className="fas fa-eye"></i> {"| "}
                  </Link>
                  <span className="universalRemoveIcon" onClick={e => removePatientNow(e)}>
                    <i className="fas fa-trash"></i>
                  </span>
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
  alerts: state.alert,
  patients: state.patient.patients,
  loading: state.patient.loading,
  doctorId: state.doctor._id
});

export default connect(mapStateToProps, { loadDoctor, loadPatients, removePatient })(ManagePatient);
