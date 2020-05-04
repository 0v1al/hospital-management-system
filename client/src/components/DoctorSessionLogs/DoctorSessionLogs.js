import React, { useEffect } from 'react'
import { connect } from "react-redux";
import Moment from "react-moment";
import { loadAdmin, loadDoctors } from "../actions/admin";
import Spinner from "../Layout/Spinner/Spinner";

const DoctorSessionLogs = ({ loadAdmin, loadDoctors, loading, doctors }) => {
  useEffect(() => {
    const fetch = async () => {
      loadAdmin();
      loadDoctors();
    };
    fetch();
  }, [loadAdmin, loadDoctors]);
  
  const moment = require("moment");

  const diffDate = (a, b) => {
    const diffA = moment(a);
    const diffB = moment(b);
    return (diffB.diff(diffA) / (1000 * 60)).toFixed(0);
  };

  return (
    <div className="universalContainer">
      <h1 className="universalTitle">Admin | Doctor Session Logs</h1>
      <div className="universalContainerTableNoBorder">
        <h3 className={["universalDesc", "universalDescForm"].join(" ")}>
          <i className="fas fa-sign-in-alt"></i>
          Doctor Session Logs
        </h3>
        <table className="universalTable">
          <thead>
            <tr className="universalTableRow">
              <th>#</th>
              <th>Doctor Email</th>
              <th>Doctor Name</th>
              <th>Login Time</th>
              <th>Logout Time</th>
              <th>Time Session</th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (doctors.map((doctor, index) => 
              (<tr className="universalTableRow" key={index}>
                <td>{index + 1}</td>
                <td>
                  {`${doctor.firstname[0].toUpperCase()}${doctor.firstname.slice(1)} 
                  ${doctor.lastname[0].toUpperCase()}${doctor.lastname.slice(1)}`}
                </td>
                <td>{doctor.email}</td>
                <td><Moment format="YYYY/MM/DD-HH:mm">{doctor.loginTime}</Moment></td>
                <td><Moment format="YYYY/MM/DD-HH:mm">{doctor.logoutTime}</Moment></td>
                <td>{`${diffDate(doctor.loginTime, doctor.logoutTime)} minutes`}</td>
              </tr>
            ))) : (<Spinner />)}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  loading: state.admin.loadAdmin,
  doctors: state.admin.doctors
});

export default connect(mapStateToProps, { loadAdmin, loadDoctors })(DoctorSessionLogs)
