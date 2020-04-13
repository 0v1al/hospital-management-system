import React, { useEffect } from 'react'
import { connect } from "react-redux";
import { loadAdmin } from "../../actions/admin";
import { loadMessages, removeMessage } from "../../actions/message";
import { Link } from "react-router-dom";
import Spinner from "../../Layout/Spinner/Spinner";
import Moment from "react-moment";

import styles from "./Messages.module.css";

const ReadMessages = ({ loadAdmin, loadMessages, removeMessage, messages, alerts, loading }) => {
  useEffect(() => {
    const fetch = async () => {
      loadAdmin();
      loadMessages();
    };
    fetch();
  }, [loadAdmin, loadMessages]);

  const removeMessageNow = e => {
    const messageId = e.target.parentElement.parentElement.parentElement.getAttribute("data-id");
    removeMessage(messageId);
  }

  return (
    <div className="universalContainer">
      <h2 className="universalTitle">Admin | Contact Messages</h2>
      <div className="universalContainerTableNoBorder">
        <h3 className={["universalDesc", styles.desc].join(" ")}>
          <i className="fas fa-book-open"></i>
          Read Messages
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
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Message</th>
              <th>Send Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (messages.map((message, index) => message.read ? (
                (
                  <tr className="universalTableRow" data-id={message._id}  key={index}>
                    <td>{index + 1}</td>
                    <td>{`${message.name}`}</td>
                    <td>{`${message.email}`}</td>
                    <td>{`${message.contact}`}</td>
                    <td>{`${message.message}`}</td>
                    <td><Moment format="YYYY/MM/DD-HH:mm">{`${message.date}`}</Moment></td>
                    <td>
                      <Link to={`/admin-update-message/${message._id}`} className="universalEditIcon">
                        <i className="fas fa-edit"></i> {"| "}
                      </Link>
                      <span className="universalRemoveIcon" onClick={e => removeMessageNow(e)}>
                        <i className="fas fa-trash"></i>
                      </span>
                    </td>
                  </tr>
                )
              ) :(null) 
            )) : (<Spinner />)}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  messages: state.message.messages,
  loading: state.message.loading,
  alerts: state.alert
});

export default connect(mapStateToProps, { loadAdmin, loadMessages, removeMessage })(ReadMessages)
