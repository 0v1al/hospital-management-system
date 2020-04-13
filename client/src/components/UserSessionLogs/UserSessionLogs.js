import React, { useEffect } from 'react'
import { connect } from "react-redux";
import Moment from "react-moment";
import { loadAdmin, loadUsers } from "../actions/admin";
import Spinner from "../Layout/Spinner/Spinner";

import styles from "./UserSessionLogs.module.css";

const UserSessionLogs = ({ loadAdmin, loadUsers, users, loading }) => {
  useEffect(() => {
    const fetch = async () => {
      loadAdmin();
      loadUsers();
    };
    fetch();
  }, [loadAdmin, loadUsers]);
  
  const moment = require("moment");

  const diffDate = (a, b) => {
    const diffA = moment(a);
    const diffB = moment(b);
    return (diffB.diff(diffA) / (1000 * 60)).toFixed(0);
  };

  return (
    <div className="universalContainer">
      <h1 className="universalTitle">Admin | User Session Logs</h1>
      <div className="universalContainerTableNoBorder">
        <h3 className={["universalDesc", styles.desc].join(" ")}>
          <i className="fas fa-sign-in-alt"></i>
          User Session Logs
        </h3>
        <table className="universalTable">
          <thead>
            <tr className="universalTableRow">
              <th>#</th>
              <th>User Name</th>
              <th>User Email</th>
              <th>Login Time</th>
              <th>Logout Time</th>
              <th>Time Session</th>
            </tr>
          </thead>
          <tbody>
           {!loading ? (users.map((user, index) => 
             (<tr className="universalTableRow" key={index}>
                <td>{index + 1}</td>
                <td>
                  {`${user.firstname[0].toUpperCase()}${user.firstname.slice(1)} 
                  ${user.lastname[0].toUpperCase()}${user.lastname.slice(1)}`}
                </td>
                <td>{user.email}</td>
                <td><Moment format="YYYY/MM/DD-HH:mm">{user.loginTime}</Moment></td>
                <td><Moment format="YYYY/MM/DD-HH:mm">{user.logoutTime}</Moment></td>
                <td>{`${diffDate(user.loginTime, user.logoutTime)} minutes`}</td>
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
  users: state.admin.users
});

export default connect(mapStateToProps, { loadAdmin, loadUsers })(UserSessionLogs);
