import { onAuthStateChanged, signInWithPopup } from 'firebase/auth'
import { doc, setDoc, getFirestore, getDoc, onSnapshot, collection, addDoc, orderBy, query, serverTimestamp } from 'firebase/firestore'
import { app, auth, provider } from '../otp/firebase.config'
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';

import './GroupChat.css';
import React, { useEffect, useState } from 'react'
import { IconButton } from '@mui/material';

const db = getFirestore(app)

const GroupChat = () => {

    const [user, setUser] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")

    useEffect(() => {
        const q = query(collection(db, "messages"), orderBy("timestamp"))
        const unsubscribe = onSnapshot(q, snapshot => {
          setMessages(snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          })))
        })
        return unsubscribe
      }, [])

      useEffect(() => {
        onAuthStateChanged(auth, user => {
          if(user) {
            setUser(user)
          } else {
            setUser(null)
          }
        })
    }, [])


    const sendMessage = async () => {
        await addDoc(collection(db, "messages"), {
          uid: user.uid,
          photoURL: user.photoURL,
          displayName: user.displayName,
          text: newMessage,
          timestamp: serverTimestamp()
        })
    
        setNewMessage("")
      }



    const handleGoogleLogin = async () => {
        // const provider = new GoogleAuthProvider()
      
        try {
      
        await signInWithPopup(auth, provider)
      
          
        } catch (error) {
          console.log(error)
        }
      }
      return (
        <div className="flex-container">
          {user ? (
            <div className="chat-box">
              <div className="logged-in-as">Logged in as {user.displayName}</div>
              <button className="logout-button" onClick={() => auth.signOut()}>
                Logout
              </button>
              <div className="message-container">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`message ${msg.data.uid === user.uid ? 'self-end' : 'other-start'}`}
                  >
                    {msg.data.uid !== user.uid ? (
                      <img className="sender-image" src={msg.data.photoURL} alt="Sender" />
                    ) : (<>
                      {/* <img className="receiver-image" src={user.photoURL} alt="Receiver" /> */}
                    </>
                    )}
                    <div
                      className={`message-bubble ${
                        msg.data.uid === user.uid ? 'self-message' : 'other-message'
                      }`}
                    >
                      {msg.data.text}
                    </div>
                    {msg.data.uid === user.uid && (
                      <img className="sender-image" src={user.photoURL} alt="Sender" />
                    )}
                  </div>
                ))}
              </div>
              <div className="input-box">
                <div className="input-container">
                  <input
                    className="message-input"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    />
                    </div>
                  <IconButton color="primary" className="send-button" onClick={sendMessage}>
                    <SendTwoToneIcon />
                  </IconButton>
              </div>
            </div>
          ) : (
            <button className="bg-blue-500 text-white rounded-full py-2 px-4" onClick={handleGoogleLogin}>
              Login with Google
            </button>
          )}
        </div>
      );
}

export default GroupChat