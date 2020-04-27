import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import Moment from "react-moment";
import { Link } from "react-router-dom";

import { store } from "../../../index";
import { loadAdmin, patientReports } from "../../actions/admin";
import { createAlert } from "../../actions/alert";
import Spinner from "../../Layout/Spinner/Spinner";
import styles from "./Reports.module.css";
import stylesLoginAdmin from "../LoginAdmin/LoginAdmin.module.css";

const Reports = ({ loadAdmin, patientReports, patients, loading, alerts}) => {
  const [input, setInput] = useState({
    fromDate: "",
    toDate: ""
  });
  const { fromDate, toDate } = input;

  useEffect(() => {
    const fetch = async () => {
      loadAdmin();
    };
    fetch();
  }, [loadAdmin]);

  const patientReportsNow = async e => {
    e.preventDefault()
    if (!fromDate || !toDate) {
     return store.dispatch(createAlert("You need to add the date", "fail", 2000));
    }
    patientReports(fromDate, toDate);
  };

  return (
    <div className="universalContainer">
      <h1 className="universalTitle">Admin | Register Between Dates</h1>
      <form className={[stylesLoginAdmin.universalForm, styles.form].join(" ")} onSubmit={e => patientReportsNow(e)}>
        {alerts.length > 0 && 
            <div className="alerts">
              {alerts.map(alert => 
                <span key={alert.id} className={`alert alert-${alert.type}`}>{alert.msg}</span>
              )} 
            </div>
          } 
        <h2 className="universalDesc universalDescForm">
          <i className="fas fa-list-alt"></i>
          View Patients Registered Between Certain Dates
        </h2>
        <div className={stylesLoginAdmin.inputGroup}>
          <label>* From Date:</label>
          <div className={[stylesLoginAdmin.inputRegister].join(" ")}>
            <input type="date" name="fromDate" value={fromDate} onChange={e => setInput({ ...input, [e.target.name]: e.target.value }) }/>
          </div>
        </div>
        <div className={stylesLoginAdmin.inputGroup}>
          <label>* To Date:</label>
          <div className={[stylesLoginAdmin.inputRegister].join(" ")}>
            <input type="date" name="toDate" value={toDate} onChange={e => setInput({ ...input, [e.target.name]: e.target.value }) }/>
          </div>
          <span>[* = required]</span>
        </div>
        <input type="submit" value="submit" className="universalBtnForm"/>
      </form>
      <div className="universalContainerTable">
        <h3 className="universalDesc universalDescForm">Registered Patients Between: </h3>
        <table className="universalTable">
          <thead>
            <tr className="universalTableRow">
              <th>#</th>
              <th>Patient Name</th>
              <th>Contact</th>
              <th>Gender</th>
              <th>Creation Date</th>
              <th>Update Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (patients.map((patient, index) => 
                (<tr className="universalTableRow" data-email={patient.email}  key={index}>
                    <td>{index + 1}</td>
                    <td>
                      {
                        `${patient.firstname[0].toUpperCase()}${patient.firstname.slice(1)} 
                        ${patient.lastname[0].toUpperCase()}${patient.lastname.slice(1)}`
                      }
                    </td>
                    <td>{patient.contact}</td>
                    <td>{patient.gender}</td>
                    <td><Moment format="YYYY-MM-DD">{patient.date}</Moment></td>
                    <td><Moment format="YYYY/MM/DD-HH:mm">{patient.updateDate}</Moment></td>
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
  alerts: state.alert,
  loading: state.patient,
  patients: state.patient.patients
});

export default connect(mapStateToProps, { loadAdmin, patientReports })(Reports);
