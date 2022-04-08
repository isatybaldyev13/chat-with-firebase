import "./App.css";
import { AuthState } from "./context/authContext";
import { AppRouter } from "./router";

function App() {
  return (
    <AuthState>
      <AppRouter />
    </AuthState>
  );
}

export default App;

/*

    <div className="container">
      <div className='form-card'>
        <h1 className='title'>Join the chat room</h1>
        <form>
          <p className='label'>Email</p>
          <input className='input' placeholder='email' type={"email"} />
          <p className='label'>Password</p>
          <input className='input' placeholder='Password' type={"password"} />
          <button className='submit-btn'>Sign in</button>
        </form>
        <button className='social-btn'>Sign in with gmail</button>
      </div>
    </div>
*/
