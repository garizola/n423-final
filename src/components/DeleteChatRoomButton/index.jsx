// SomeComponent.js

import React from 'react';
import { deleteChatRoom } from '../../services/firebase';

const buttonStyle = {
  // ... existing styles
  backgroundColor: '#e74c3c',
  color: '#fff',
};

function DeleteChatRoomButton({ roomId }) {
  const handleDeleteChatRoom = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this chat room?');
    if (confirmDelete) {
      deleteChatRoom(roomId);
    }
  };

  return (
    <button style={buttonStyle} onClick={handleDeleteChatRoom}>
      X
    </button>
  );
}

export { DeleteChatRoomButton };
