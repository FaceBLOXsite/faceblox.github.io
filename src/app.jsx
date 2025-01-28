import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const users = []; // Simulated database
const groups = []; // Simulated group database

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <Router>
      <div className="min-h-screen bg-cover bg-fixed" style={{ backgroundImage: "url('/background.png')" }}>
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Faceblox</h1>
          {loggedInUser && (
            <nav>
              <Link to="/" className="mx-2">Home</Link>
              <Link to="/profile" className="mx-2">Profile</Link>
              <Link to="/friends" className="mx-2">Friends</Link>
              <Link to="/groups" className="mx-2">Groups</Link>
              <Button onClick={() => setLoggedInUser(null)} className="mx-2">Logout</Button>
            </nav>
          )}
        </header>

        <main className="p-4">
          <Routes>
            <Route path="/" element={loggedInUser ? <Home /> : <Navigate to="/login" />} />
            <Route path="/profile" element={loggedInUser ? <Profile user={loggedInUser} /> : <Navigate to="/login" />} />
            <Route path="/friends" element={loggedInUser ? <Friends user={loggedInUser} /> : <Navigate to="/login" />} />
            <Route path="/groups" element={loggedInUser ? <Groups /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login setLoggedInUser={setLoggedInUser} />} />
            <Route path="/signup" element={<Signup setLoggedInUser={setLoggedInUser} />} />
          </Routes>
        </main>

        <footer className="bg-gray-800 text-white text-center p-4">
          <p>© {new Date().getFullYear()} Faceblox. Built for Roblox players.</p>
        </footer>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="grid gap-4">
      <h2 className="text-xl font-bold">Welcome to Faceblox</h2>
      <p>Connect with other Roblox players, share updates, and join communities!</p>
    </div>
  );
}

function Profile({ user }) {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-4">
      <h2 className="text-center text-xl font-bold">Profile</h2>
      <p className="text-center">Username: {user.username}</p>
    </div>
  );
}

function Friends({ user }) {
  const [friends, setFriends] = useState([]);

  const handleAddFriend = () => {
    const friendName = prompt("Enter the username of your friend:");
    if (friendName && !friends.includes(friendName)) {
      setFriends([...friends, friendName]);
    } else {
      alert("Friend already added or invalid username.");
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold">Friends</h2>
      <Button onClick={handleAddFriend}>Add Friend</Button>
      <ul className="mt-4">
        {friends.map((friend, index) => (
          <li key={index} className="mt-2">{friend}</li>
        ))}
      </ul>
    </div>
  );
}

function Groups() {
  const [groupList, setGroupList] = useState(groups);

  const handleCreateGroup = () => {
    const groupName = prompt("Enter the name of the group:");
    if (groupName) {
      setGroupList([...groupList, groupName]);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold">Groups</h2>
      <Button onClick={handleCreateGroup}>Create Group</Button>
      <ul className="mt-4">
        {groupList.map((group, index) => (
          <li key={index} className="mt-2">{group}</li>
        ))}
      </ul>
    </div>
  );
}

function Login({ setLoggedInUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setLoggedInUser(user);
    } else {
      alert("Invalid username or password.");
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md p-4">
      <h2 className="text-xl font-bold text-center">Login</h2>
      <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={handleLogin} className="mt-4 w-full">Login</Button>
      <p className="text-center mt-2">Don’t have an account? <Link to="/signup" className="text-blue-600">Sign Up</Link></p>
    </div>
  );
}

function Signup({ setLoggedInUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    if (users.find(u => u.username === username)) {
      alert("Username already taken.");
    } else {
      const newUser = { username, password };
      users.push(newUser);
      setLoggedInUser(newUser);
      alert("Account created successfully!");
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md p-4">
      <h2 className="text-xl font-bold text-center">Sign Up</h2>
      <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={
