import React, { useEffect } from 'react'
import { connect } from "react-redux";
import Moment from "react-moment";
import { Link } from "react-router-dom";

import Spinner from "../../Layout/Spinner/Spinner";
import { loadAdmin } from "../../actions/admin";
import  { loadAllPatients } from '../../actions/doctor';

const Patients = ({ loadAdmin, loadAllPatients, patients, loading }) => {
  useEffect(() => {
    const fetch = async () => {
      loadAdmin();
      loadAllPatients();
    };
    fetch();
  }, [loadAdmin, loadAllPatients]);

  return (
    <div className="universalContainer">
      <h2 className="universalTitle">Admin | Patients</h2>
      <div className="universalContainerTableNoBorder">
        <h3 className="universalDesc">Manage Patients</h3>
        <table className="universalTable">
          <thead>
            <tr className="universalTableRow">
              <th>#</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Location</th>
              <th>Contact</th>
              <th>Gender</th>
              <th>Registration Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (patients.map((patient, index) => 
              (<tr className="universalTableRow" data-email={patient.email}  key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {
                      `${patient.firstname[0].toUpperCase()}${patient.firstname.slice(1)} 
                      ${patient.lastname[0].toUpperCase()}${patient.lastname.slice(1)}`
                    }
                  </td>
                  <td>{patient.email}</td>
                  <td>{patient.address}</td>
                  <td>{patient.contact}</td>
                  <td>{patient.male ? "Male" : "Female"}</td>
                  <td><Moment format="YYYY/MM/DD-HH:mm">{patient.date}</Moment></td>
                  <td>
                    <Link to={`/admin-patient-details/${patient.email}/${patient._id}`} className="universalEditIcon">
                      <i className="fas fa-eye"></i>
                    </Link>
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
  patients: state.patient.patients,
  loading: state.patient.loading,
  alerts: state.alert
});

export default connect(mapStateToProps, { loadAdmin, loadAllPatients })(Patients)
