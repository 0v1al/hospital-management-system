import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { loadAdmin } from "../../actions/admin";
import { loadMessages, updateMessage, markAsReadMessage } from "../../actions/message";
import Spinner from "../../Layout/Spinner/Spinner";

import styles from "./Messages.module.css";

const UpdateMessage = ({ loadAdmin, loadMessages, updateMessage, markAsReadMessage, messages, loading, alerts, match }) => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    contact: "",
    message: "",
    response: ""
  });
  const { name, email, contact, message, response } = input || "";

  useEffect(() => {
    const fetch = async () => {
      loadAdmin();
      loadMessages();
    };
    fetch();
  }, [loadAdmin, loadMessages]);
  
  useEffect(() => {
    const getMessageById = () => {
      const messageId = match.params.messageId;
      return messages.filter(message => message._id === messageId)[0];
    }
    setInput(getMessageById());
  }, [messages, match.params.messageId]);

  function getMessageById() {
    const messageId = match.params.messageId;
    return messages.filter(message => message._id === messageId)[0];
  }

  const isMarkedAsRead = () => getMessageById().read;
  
  const updateMessageNow = async e => {
    e.preventDefault();
    const messageId = match.params.messageId;
    if (updateMessage(messageId, input)) {
      setInput({ ...input, response });
    }
  }
  
  const markAsReadTheMessage = async e => {
    e.preventDefault();
    const messageId = match.params.messageId;
    markAsReadMessage(messageId);
  };

  return !loading ? (
    <div className="universalContainer">
      <h2 className="universalTitle">Admin | Contact Messages</h2>
      <div className="universalMt">
        <h3 className={["universalDesc", styles.desc].join(" ")}>
          <i class="fas fa-edit"></i> 
          Update Message
        </h3>
        <div className={styles.messagesContainer}>
          {alerts.length > 0 && 
            <div className="alerts">
              {alerts.map(alert => 
                <span key={alert.id} className={`alert alert-${alert.type}`}>{alert.msg}</span>
              )} 
            </div>
          } 
          <div className={styles.messageContainer}>
            <span className={styles.messageFields}>Name:</span> 
            <span className={styles.messageValue}>{name}</span>
          </div>
          <div className={styles.messageContainer}>
            <span className={styles.messageFields}>Email:</span> 
            <span className={styles.messageValue}>{email}</span>
          </div>
          <div className={styles.messageContainer}>
            <span className={styles.messageFields}>Contact:</span> 
            <span className={styles.messageValue}>{contact}</span>
          </div>
          <div className={styles.messageContainer}>
            <span className={styles.messageFields}>Message:</span> 
            <span className={styles.messageValue}>{message}</span>
          </div>
          <div className={styles.messageContainer}>
            <div className={styles.containerBtns}>
                {isMarkedAsRead() ?
                  (
                    <span className={styles.messageReaded}>Message readed</span>
                  ) : (
                    <input className={styles.btnSend} type="submit" value="mark as read" onClick={e => markAsReadTheMessage(e)} />
                  )
                }
            </div>
          </div>
        </div>  
      </div> 
    </div>
  ) : (<Spinner />)
}

const mapStateToProps = state => ({
  alerts: state.alert,
  messages: state.message.messages,
  loading: state.message.loading,
  read: state
});

export default connect(mapStateToProps, { loadAdmin, loadMessages, updateMessage, markAsReadMessage })(UpdateMessage)
