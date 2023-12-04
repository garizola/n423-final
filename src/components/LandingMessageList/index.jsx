// LandingMessageList.js

import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useMessages } from '../../hooks/useMessages';
import './styles.css'

function LandingMessageList({ roomId }) {
  const containerRef = React.useRef(null);
  const { user } = useAuth();
  const messages = useMessages(roomId);

  React.useLayoutEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  });

  return (
    <div className="message-list-container" ref={containerRef}>
      <ul className="message-list">
        {messages.slice(-6).map((x) => (
          <Message
            key={x.id}
            message={x}
            isOwnMessage={x.uid === user.uid}
          />
        ))}
      </ul>
    </div>
  );
}

function Message({ message, isOwnMessage, userProfilePicture }) {
    const { displayName, text } = message;
  
    return (
      <li className={['message', isOwnMessage && 'own-message'].join(' ')}>
        <div className="profile-picture">
          {userProfilePicture && <img src={userProfilePicture} alt="Profile" />}
        </div>
        <div className="message-content">
          <h4 className="sender">{isOwnMessage ? 'You' : displayName}</h4>
          <div>{text}</div>
        </div>
      </li>
    );
  }

export { LandingMessageList };
