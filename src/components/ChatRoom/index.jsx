import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { MessageInput } from '../MessageInput';
import { MessageList } from '../MessageList';
import { useAuth } from '../../hooks/useAuth';
import './styles.css';

function ChatRoom() {
    const params = useParams();
    const { user } = useAuth();
    const [room, setRoom] = useState(null);
    const [userProfilePicture, setUserProfilePicture] = React.useState(null);

  React.useEffect(() => {
    // Fetch the user's profile picture URL after signing in with Google
    if (user) {
      setUserProfilePicture(user.photoURL);
    }
  }, [user]);

    useEffect(() => {
        const fetchRoom = async () => {
            const db = getFirestore();
            const roomDoc = doc(db, 'chat-rooms', params.id);
            const roomSnapshot = await getDoc(roomDoc);

            if (roomSnapshot.exists()) {
                setRoom({ id: roomSnapshot.id, ...roomSnapshot.data() });
            } else {
                // Handle 404, room not found
            }
        };

        fetchRoom();
    }, [params.id]);

    if (!room) {
        // Render loading state or handle 404
        return <div>Loading...</div>;
    }

    return (
        <>
            <h2>{room.title}</h2>
            <div>
                <Link to="/">⬅️ Back to all topics</Link>
            </div>
            <div className="messages-container">
                <MessageList roomId={room.id} />
                <MessageInput roomId={room.id} />
            </div>
        </>
    );
}

export { ChatRoom };
