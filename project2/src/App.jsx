import React, { useState } from "react";
import "./App.css"

export default function App() {
  const [userData, setUserData] = useState([]);
  const [searchTerm, setsearchTerm] = useState("");
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title && !password) {
      alert("Fill all the inputs");
      return;
    }
    setUserData([
      ...userData,
      { title, password, id: Math.random().toString() },
    ]);
    setTitle("");
    setPassword("");
  };

  const handleDelete = (id) => {
    const newData = userData.filter((item) => item.id !== id);
    setUserData(newData);
  };

  const handleEdit = (id) => {
    const data = userData.find((item) => item.id === id);

    setTitle(data.title);
    setPassword(data.password);
    handleDelete(id);
  };

  const handleSearch = (event) => {
    setsearchTerm(event.target.value);
  };

  const getSearch = () => {
    if (!searchTerm) return userData;
    return userData.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="app">
      <div className="box1" >
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <label htmlFor="password">Password:</label>
          <input
            type="text"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button type="submit">Add</button>
        </form>

        <ul>
          <h2>All Passwords</h2>
          {getSearch().map((item) => {
            return (
              <li key={item.id}>
                {item.title} {item.password}
                <button onClick={() => handleEdit(item.id)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="box2">
        <h2>Password Keeper</h2>
        <p>Total Password: {userData.length}</p>
        <label htmlFor="search">Search</label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
    </div>
  );
}
