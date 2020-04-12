import React, { useEffect, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import io from 'socket.io-client';

import './style.css';

const socket = io('http://localhost:3333');

export default function Chat() {
   const [username, setUsername] = useState('');
   const [message, setMessage] = useState('');
   const [allMessages, setAllMessages] = useState([]);
   const [clients, setClients] = useState(0);

   const getAllMessages = messages => setAllMessages(messages);
   const getClients = clients => setClients(clients);

   const sendMessage = event => {
      event.preventDefault();

      const data = { username, message };

      if (!message.trim()) return;

      socket.emit('send.message', data);
      setMessage('');
   }


   useEffect(() => {
      setUsername(localStorage.getItem('username'));

      socket.on('clients', getClients);
      socket.on('chat.messages', getAllMessages);
      socket.on('received.messages', getAllMessages);
   }, []);

   return (
      <>
         <div className="top_menu">
            <div className="online">Online: {clients}</div>
            <div className="box-username">Bem-Vindo: <h1 className="username">{username}</h1></div>
         </div>

         <div className="chat_window">
            <div className="top_menu">
               <div className="title">Chat</div>
            </div>

            <ul className="messages" onMouseOver={() => { }}>
               {allMessages.map((content, index) => (
                  <li className="message" key={index}>
                     <div className="avatar"></div>
                     <strong className="info_user">{content.username}</strong>
                     <div className="text_wrapper">
                        {content.message}
                     </div>
                  </li>
               ))}
            </ul>

            <form className="bottom_wrapper clearfix" onSubmit={sendMessage}>
               <div className="message_input_wrapper">
                  <input value={message} onChange={event => setMessage(event.target.value)} className="message_input" placeholder="Type your message here..." />
               </div>

               <button className="send_message"><FiSend size={25} className="icon" /></button>
            </form>
         </div>
      </>
   );
}
