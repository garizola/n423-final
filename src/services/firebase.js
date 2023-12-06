import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signInWithRedirect,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  doc,
  // eslint-disable-next-line no-unused-vars
  getDoc,
  deleteDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC0gP8CRmKmoSP7gaonQRDCKlgwrx7-naY",
  authDomain: "chat-room-e13a0.firebaseapp.com",
  projectId: "chat-room-e13a0",
  storageBucket: "chat-room-e13a0.appspot.com",
  messagingSenderId: "364619324372",
  appId: "1:364619324372:web:6d6290ce1307162cdf5441",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

async function loginWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
    return { uid: user.uid, displayName: user.displayName };
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function loginWithEmailPassword(email, password) {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return { uid: user.uid, displayName: user.displayName };
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function sendMessage(roomId, user, text) {
  try {
    await addDoc(collection(db, "chat-rooms", roomId, "messages"), {
      uid: user.uid,
      displayName: user.displayName,
      text: text.trim(),
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error(error);
  }
}

function getMessages(roomId, callback) {
  return onSnapshot(
    query(
      collection(db, "chat-rooms", roomId, "messages"),
      orderBy("timestamp", "asc")
    ),
    (querySnapshot) => {
      const messages = querySnapshot.docs.map((x) => ({
        id: x.id,
        ...x.data(),
      }));

      callback(messages);
    }
  );
}

async function addChatRoom(title) {
  try {
    const newRoomRef = await addDoc(collection(db, "chat-rooms"), {
      title: title.toUpperCase(),
      // Add other properties if needed
    });

    console.log("Chat room added with ID: ", newRoomRef.id);
  } catch (error) {
    console.error("Error adding chat room: ", error);
  }
}

async function deleteChatRoom(roomId) {
  try {
    const roomRef = doc(db, "chat-rooms", roomId);
    await deleteDoc(roomRef);
    console.log("Chat room deleted successfully");
  } catch (error) {
    console.error("Error deleting chat room: ", error);
  }
}

export {
  loginWithGoogle,
  sendMessage,
  getMessages,
  addChatRoom,
  deleteChatRoom,
  loginWithEmailPassword,
};
