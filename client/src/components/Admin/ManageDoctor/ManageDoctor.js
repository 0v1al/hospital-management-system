import React, { useEffect } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { loadDoctors, loadAdmin, removeDoctor } from "../../actions/admin";
import Spinner from "../../Layout/Spinner/Spinner";

const ManageDoctor = ({ loadAdmin, loadDoctors, removeDoctor, doctors, alerts, loading }) => {
  useEffect(() => {
    const fetch = async () => {
      loadAdmin();
      loadDoctors();
    };
    fetch();
  }, [loadDoctors, loadAdmin]);

  const removeDoctorNow = e => {
    const doctorEmail = e.target.parentElement.parentElement.parentElement.getAttribute("data-email");
    removeDoctor(doctorEmail);
  };

  return (
    <div className="universalContainer">
      <h2 className="universalTitle">Admin | Manage Doctors</h2>
      <div className="universalContainerTableNoBorder">
        <h3 className="universalDesc universalDescForm">
          <i className="fas fa-list-alt"></i>
          Manage Doctors
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
              <th>Specialization</th>
              <th>Doctor Name</th>
              <th>Registration Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {!loading ? (doctors.map((doctor, index) => 
             (<tr className="universalTableRow" data-email={doctor.email}  key={index}>
                <td>{index + 1}</td>
                <td>{`${doctor.specialization[0].toUpperCase()}${doctor.specialization.slice(1)}`}</td>
                <td>
                  {
                    `${doctor.firstname[0].toUpperCase()}${doctor.firstname.slice(1)} 
                    ${doctor.lastname[0].toUpperCase()}${doctor.lastname.slice(1)}`
                  }
                </td>
                <td><Moment format="YYYY-MM-DD/HH:mm">{doctor.date}</Moment></td>
                <td>
                  <Link to={`/admin-update-doctor/${doctor.email}`} className="universalEditIcon">
                    <i className="fas fa-edit"></i> {"| "}
                  </Link>
                  <span className="universalRemoveIcon" onClick={e => removeDoctorNow(e)}>
                    <i className="fas fa-trash"></i>
                  </span>
                </td>
              </tr>
             ))) : (<Spinner />)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  alerts: state.alert,
  doctors: state.admin.doctors,
  loading: state.admin.loading
});

export default connect(mapStateToProps, { loadDoctors, loadAdmin, removeDoctor })(ManageDoctor);