import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import Moment from "react-moment";

import { loadUser, updateProfile } from "../../actions/user";
import Spinner from "../../Layout/Spinner/Spinner";

import stylesLoginAdmin from "../../Admin/LoginAdmin/LoginAdmin.module.css";
import styles from "../../Admin/UpdateDoctor/UpdateDoctor.module.css";
import stylesHere from "../../Doctor/UpdateProfile/UpdateProfile.module.css";

const UpdateProfile = ({ 
  loadUser, 
  updateProfile,
  user,
  userEmail,
  user: { loading },
  alerts
}) => {
  const [input, setInput] = useState({
    firstname: "",
    lastname: "",
    email: "",
    location: ""
  });
  const { firstname, lastname, email, location } = input;

  useEffect(() => {
    const fetch = async () => {
      loadUser();
    };
    fetch();
  }, [loadUser]);

  useEffect(() => {
    setInput({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      location: user.location
    });
  }, [user]);

  const updateUserProfileNow = async e => {
    e.preventDefault();
    const body = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      userEmail: userEmail,
      location: location
    }
    updateProfile(body);
  };

  return (
    <div className="universalContainer">
    <h1 className="universalTitle">User | Edit Profile</h1>
    {!loading ? (
      <>
        <div className={stylesHere.profileDesc}>
          <p>User <strong>{`${user.firstname} ${user.lastname} `}</strong> Profile</p>
          <p>Register Date: <Moment format="YYYY-MM-DD">{user.date}</Moment></p>
        </div>
        <form className={["universalForm"].join(" ")} onSubmit={e => updateUserProfileNow(e)}>
          {alerts.length > 0 && 
            <div className="alerts">
              {alerts.map(alert => 
                <span key={alert.id} className={`alert alert-${alert.type}`}>{alert.msg}</span>
              )} 
            </div>
          } 
          <h3 className={["universalDesc universalDescForm"].join(" ")}>
            <i className="fas fa-user-edit"></i>
            Edit Profile
          </h3>
          <div className={stylesLoginAdmin.inputGroup}>
            <label>Firstname:</label>
            <div className={[stylesLoginAdmin.inputRegister, stylesLoginAdmin.doctorIcon].join(" ")}>
              <input type="text" name="firstname" value={firstname} onChange={e => setInput({ ...input, [e.target.name]: e.target.value }) } />
            </div>
          </div>
          <div className={stylesLoginAdmin.inputGroup}>
            <label>Lastname:</label>
            <div className={[stylesLoginAdmin.inputRegister, stylesLoginAdmin.doctorIcon].join(" ")}>
              <input type="text"  name="lastname" value={lastname} onChange={e => setInput({ ...input, [e.target.name]: e.target.value }) }/>
            </div>
          </div>
          <div className={stylesLoginAdmin.inputGroup}>
            <label>Location:</label>
            <div className={[stylesLoginAdmin.inputRegister, stylesLoginAdmin.locationIcon].join(" ")}>
              <input type="text" name="location" value={location} onChange={e => setInput({ ...input, [e.target.name]: e.target.value }) }/>
            </div>
            <span>[* = required]</span>
          </div>
          <div className={stylesLoginAdmin.inputGroup}>
            <label>Email:</label>
            <div className={[stylesLoginAdmin.inputRegister, stylesLoginAdmin.emailIcon].join(" ")}>
              <input type="text" name="email" value={email} onChange={e => setInput({ ...input, [e.target.name]: e.target.value }) }/>
            </div>
            <span>[* = required]</span>
          </div>
          <input type="submit" className={["universalBtn", styles.addBtn].join(" ")}  value="update "/>
        </form>
      </>
    ) : (<Spinner />)}
  </div>
  )
}

const mapstateToProps = state => ({
  alerts: state.alert,
  user: state.user,
  userEmail: state.user.email
});

export default connect(mapstateToProps, { loadUser, updateProfile })(UpdateProfile);
