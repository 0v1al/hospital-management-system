import React, { useEffect } from 'react'
import { connect } from "react-redux";
import { loadUser } from "../../actions/user";
import { loadDoctorsData } from "../../actions/data";
import Spinner from "../../Layout/Spinner/Spinner";
import Moment from "react-moment";

import styles from "./ViewDoctor.module.css";

const ViewDoctor = ({ loadUser, loadDoctorsData, doctors, loading }) => {

  useEffect(() => {
    const fetch = async () => {
      loadUser();
      loadDoctorsData();
    };
    fetch();
  }, [loadUser, loadDoctorsData]);

  return (
    <div className="universalContainer">
      <h1 className="universalTitle">User | View Doctors</h1>
      <h3 className="universalDesc universalDescForm universalMt">
        <i class="fas fa-list-alt"></i>
        View All Doctors That are Available Now
      </h3>
      <div className={styles.doctors}>
        {!loading ? (
          doctors.map((doctor, index) => (
            <div className={styles.doctor}>
              <h3><i class="fas fa-user-md"></i>
                {`${doctor.firstname} ${doctor.lastname}`}
              </h3>
              <p><i class="fas fa-caret-right"></i>
                <strong>Specialization: </strong>
                {doctor.specialization}
              </p>
              <p><i class="fas fa-caret-right"></i>
                <strong>Consultation Price: </strong>
                {doctor.consultationPrice}
              </p>
              <p><i class="fas fa-caret-right"></i>
                <strong>Email: </strong>
                {doctor.email}
              </p>
              <p><i class="fas fa-caret-right"></i>
                <strong>Contact: </strong>
                {doctor.contact}
              </p>
              <p><i class="fas fa-caret-right"></i>
                <strong>Cabinet Address: </strong>
                {doctor.address}
              </p>
              <p><i class="fas fa-caret-right"></i>
                <strong>Working Here Since: </strong>
                <Moment format="YYYY-MM-DD">{doctor.date}</Moment>
              </p>
            </div>
          ))
        ) : (<Spinner/>) }
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  doctors: state.data.doctors,
  loading: state.data.loading
});

export default connect(mapStateToProps, { loadUser, loadDoctorsData })(ViewDoctor);
