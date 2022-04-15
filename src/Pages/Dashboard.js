import { child, onValue, push, ref, set } from "firebase/database";
import moment from "moment";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import { db } from "../firebase";

export const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  const { user, logout } = useAuthContext();
  const [messageTxt, setMessageTxt] = useState("");

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

  const getMessages = () => {
    onValue(ref(db, "messages"), (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      let arr = [];
      Object.keys(data).map((key) => {
        arr.push({
          id: key,
          ...data[key],
        });
      });
      setMessages(arr);
    });
  };

  const sendMessage = () => {
    if (messageTxt === "") {
      alert("enter ypur message");
    } else {
      let message = {
        text: messageTxt,
        createdAt: moment().format("Do MMMM, HH:mm"), // 15 apr 15:09
        sender: user?.displayName ?? user?.email, //
      };
      const key = push(child(ref(db), "messages")).key;
      set(ref(db, `messages/${key}`), message);
      setMessageTxt("");
    }
  };

  const sendLocation = () => {
    let options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let latitude = position?.coords?.latitude;
        let longitude = position?.coords?.longitude;
        let mapUrl =
          "https://www.google.com/maps?q=" + latitude + "," + longitude;

        let message = {
          url: mapUrl,
          createdAt: moment().format("Do MMMM, HH:mm"), // 15 apr 15:09
          sender: user?.displayName ?? user?.email, //
        };
        const key = push(child(ref(db), "messages")).key;
        set(ref(db, `messages/${key}`), message);
      },
      (error) => {
        console.log(error);
      },
      options
    );
  };

  useEffect(() => {
    getUsers();
    getMessages();
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
          {messages.map((message) => (
            <div key={message?.id} className="message">
              <p className="message-user">
                {message?.sender}{" "}
                <span className="message-time"> {message?.createdAt}</span>
              </p>
              <p className="message-text">
                {message?.text ? (
                  message?.text
                ) : (
                  <a target="_blank" href={message.url}>
                    My location
                  </a>
                )}
              </p>
            </div>
          ))}
        </div>
        <div className="messages-footer">
          <input
            className="message-input"
            placeholder="Message"
            onChange={(e) => setMessageTxt(e.target.value)}
            value={messageTxt}
          />
          <button className="msg-button" onClick={sendMessage}>
            Send
          </button>
          <button className="msg-button" onClick={sendLocation}>
            Send location
          </button>
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
