import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import { db } from "../firebase";

export const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const { user, logout } = useAuthContext();

  const getUsers = () => {
    onValue(ref(db, "users"), (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      let arr = [];
      Object.keys(data).map((key) => {
        arr.push({
          id: key,
          ...data[key],
        });
      });
      setUsers(arr);
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return user ? (
    <div className="dashboard-container">
      <div className="users">
        <h1 className="title">Peoples</h1>
        <ol>
          {users?.map((user) => (
            <li key={user?.id}>{user?.displayName ?? user?.email}</li>
          ))}
        </ol>
      </div>
      <div className="main-content">
        <div className="messages">
          <div className="message">
            <p className="message-user">
              Admin  <span className="message-time"> 5:20pm</span>
            </p>
            <p className="message-text">Welcome to the chat app</p>
          </div>
          <div className="message">
            <p className="message-user">
              Admin  <span className="message-time"> 5:20pm</span>
            </p>
            <p className="message-text">Welcome to the chat app</p>
          </div>
        </div>
        <div className="messages-footer">
          <input className="message-input" placeholder="Message" />
          <button className="msg-button">Send</button>
          <button className="msg-button">Send location</button>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to={"/signin"} />
  );
};

/*
[
    {
        uid: "2A457cUeVNU1k7koBEBRVh5HyQw2",
        email: "email"
    }
]
*/
