import React, { useEffect } from 'react'
import { connect } from "react-redux";
import Moment from "react-moment";
import { Link } from "react-router-dom";

import Spinner from "../../Layout/Spinner/Spinner";
import { loadAdmin, loadUsers } from "../../actions/admin";

const Patients = ({ loadAdmin, loadUsers, users, loading }) => {
  useEffect(() => {
    const fetch = async () => {
      loadAdmin();
      loadUsers();
    };
    fetch();
  }, [loadAdmin]);

  const viewUserNow = e => {};

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
              <th>Address</th>
              <th>City</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Creation Date</th>
              <th>Action</th>
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
                  <td></td>
                  <td>{user.location}</td>
                  <td></td>
                  <td>{user.email}</td>
                  <td><Moment format="YYYY/MM/DD-HH:mm">{user.date}</Moment></td>
                  <td>
                    <Link to={`/admin-patient-details/${user.email}`} className="universalEditIcon" onClick={e => viewUserNow(e)}>
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
  users: state.admin.users,
  loading: state.admin.loading,
  alerts: state.alert
});

export default connect(mapStateToProps, { loadAdmin, loadUsers })(Patients)
