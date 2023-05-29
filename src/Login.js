import React, { useState } from "react";
import "./Login.css";
import { auth } from "./Firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "./features/userSlice";

function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password).then((userAuth) => {
      dispatch(login({
        displayName: userAuth.user.displayName,
        uid: userAuth.user.uid,
        email: userAuth.user.email,
        profileUrl: userAuth.user.photoUrl
      }))
    }).catch(err => alert(err));
  };
  const handleRegister = async () => {
    if (!name) {
      return alert("Please enter a full name!");
    }

    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(user, {
      displayName: name,
      photoUrl: profilePic,
    });
    dispatch(
      login({
        email: user.email,
        uid: user.uid,
        displayName: name,
        photoUrl: profilePic,
      })
    );
  };
  return (
    <div className="login">
      <img src="/images/loginImg.jpg" />
      <form>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Full name (required)"
        />
        <input
          value={profilePic}
          onChange={(e) => setProfilePic(e.target.value)}
          type="text"
          placeholder="Profile pic URL"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />

        <button onClick={handleLogin} type="submit">
          Sign In
        </button>
      </form>
      <p>
        Not a member?{" "}
        <span onClick={handleRegister} className="login_register">
          Register Now
        </span>
      </p>
    </div>
  );
}

export default Login;
