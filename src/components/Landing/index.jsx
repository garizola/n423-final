// Landing.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { AddChatRoomButton } from '../AddChatRoomButton';
import { DeleteChatRoomButton } from '../DeleteChatRoomButton';
import { LandingMessageList } from '../LandingMessageList';
import { MessageInput } from '../MessageInput';
import './styles.css';

function Landing() {
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    const db = getFirestore();
    const roomsCollection = collection(db, 'chat-rooms');

    const unsubscribe = onSnapshot(roomsCollection, (snapshot) => {
      const roomsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChatRooms(roomsData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="landing-container">
      {/* <h2>Choose a Topic</h2> */}
      <header className="header">
        <AddChatRoomButton />
      </header>
      <div className="chat-rooms-container">
        {chatRooms.map((room) => (
          <div key={room.id} className="chat-room">
            <div className='head-top'>
                <Link to={`/room/${room.id}`}>
                    <h3>{room.title}</h3>
                </Link>
                <div className="deleteBtn">
                    <DeleteChatRoomButton roomId={room.id} />
                </div>
            </div>
  
            <LandingMessageList roomId={room.id} />
                
            
            
            <MessageInput roomId={room.id}/>
          
          </div>
        ))}
      </div>
    </div>
  );
}

export { Landing };
