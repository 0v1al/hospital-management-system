import React, { useEffect } from 'react'
import {connect } from "react-redux";
import Moment from "react-moment";

import Spinner from "../../Layout/Spinner/Spinner";
import { loadAdmin, loadUsers, removeUser } from "../../actions/admin";

const Users = ({ loadAdmin, loadUsers, removeUser, users, loading, alerts }) => {
  useEffect(() => {
    const fetch = async () => {
      loadAdmin();
      loadUsers();
    }
    fetch();
  }, [loadAdmin, loadUsers]);

  const deleteUserNow = async e => {
    const userEmail = e.target.parentElement.parentElement.parentElement.getAttribute("data-email");
    removeUser(userEmail);
  }

  return (
    <div className="universalContainer">
    <h2 className="universalTitle">Admin | Users</h2>
    <div className="universalContainerTableNoBorder">
      {alerts.length > 0 && 
        <div className="alerts">
          {alerts.map(alert => 
            <span key={alert.id} className={`alert alert-${alert.type}`}>{alert.msg}</span>
            )} 
        </div>
      } 
      <h3 className="universalDesc universalDescForm">
        <i className="fas fa-list-alt"></i>
        Manage Users
      </h3>
      <table className="universalTable">
        <thead>
          <tr className="universalTableRow">
            <th>#</th>
            <th>Full Name</th>
            <th>Location</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Registration Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {!loading ? (users.map((user, index) => 
             (<tr className="universalTableRow" data-email={user.email}  key={index}>
                <td>{index + 1}</td>
                <td>
                  {
                    `${user.firstname[0].toUpperCase()}${user.firstname.slice(1)} 
                    ${user.lastname[0].toUpperCase()}${user.lastname.slice(1)}`
                  }
                </td>
                <td>{user.location}</td>
                <td>{user.male ? "Male" : "Female"}</td>
                <td>{user.email}</td>
                <td><Moment format="YYYY/MM/DD-HH:mm">{user.date}</Moment></td>
                <td>
                  <span className="universalRemoveIcon" onClick={e => deleteUserNow(e)}>
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
  users: state.admin.users,
  loading: state.admin.loading,
  alerts: state.alert
});

export default connect(mapStateToProps, { loadAdmin, loadUsers, removeUser })(Users)
