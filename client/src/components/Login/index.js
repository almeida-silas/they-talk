import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './style.css';

export default function Login() {

   const [username, setUsername] = useState('');
   const history = useHistory();

   const handleLogin = async event => {
      event.preventDefault();

      localStorage.setItem('username', username);

      history.push('/chat');
   };

   return (
      <div className="logon-container">
         <section className="form">
            <form onSubmit={handleLogin}>
               <h1>Login</h1>

               <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={event => setUsername(event.target.value)}
               />
               <button className="button" type="submit">
                  Sign in <FiLogIn size={20} />
               </button>
            </form>
         </section>
      </div>
   );
};
