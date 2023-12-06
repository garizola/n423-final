// SomeComponent.js

import React from 'react';
import { addChatRoom } from '../../services/firebase';
import './styles.css'

function AddChatRoomButton() {
  const handleAddChatRoom = () => {
    const newChatRoomTitle = prompt('Enter the new topic title') || 'New Topic';
    addChatRoom(newChatRoomTitle);
  };

  return (
    <button className='buttonStyle' onClick={handleAddChatRoom}>
      Add New Topic
    </button>
  );
}

export { AddChatRoomButton };
