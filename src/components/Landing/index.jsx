// Landing.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AddChatRoomButton } from '../AddChatRoomButton';
import { getFirestore, collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';

import { DeleteChatRoomButton } from '../DeleteChatRoomButton';
import { LandingMessageList } from '../LandingMessageList';
import { MessageInput } from '../MessageInput';
import './styles.css';

function Landing() {
  const [chatRooms, setChatRooms] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


  // useEffect(() => {
  //   const db = getFirestore();
  //   const roomsCollection = collection(db, 'chat-rooms');

  //   const unsubscribe = onSnapshot(roomsCollection, (snapshot) => {
  //     const roomsData = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     setChatRooms(roomsData);
  //   });

  //   return () => unsubscribe();
  // }, []);

  useEffect(() => {
    const db = getFirestore();
    const roomsCollection = collection(db, 'chat-rooms');

    const unsubscribe = onSnapshot(
      query(
        roomsCollection,
        orderBy('title'), // Order chat rooms by title
        where('title', '>=', searchQuery.toUpperCase()) // Filter chat rooms based on the search query
      ),
      (snapshot) => {
        const roomsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setChatRooms(roomsData);
      }
    );

    return () => unsubscribe();
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="landing-container">
     
      <header className="head-top">
        <AddChatRoomButton />
        {/* <div>
          <label htmlFor="search">Search:</label>
          <input
            type="text"
            id="search"
            className="message-input mr"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Enter topic title"
          />
        </div> */}
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
