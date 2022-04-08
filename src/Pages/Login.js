import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, signUpWithEmail, signInWithGmail } = useAuthContext();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("enter email and password");
    } else {
      signUpWithEmail({ email, password });
    }
  };

  return user ? (
    <Navigate to="/" />
  ) : (
    <div className="container">
      <div className="form-card">
        <h1 className="title">Join the chat room</h1>
        <form onSubmit={onSubmit}>
          <p className="label">Email</p>
          <input
            className="input"
            placeholder="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="label">Password</p>
          <input
            className="input"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="submit-btn">Sign in</button>
        </form>
        <button onClick={signInWithGmail} className="social-btn">
          Sign in with google
        </button>
      </div>
    </div>
  );
};
