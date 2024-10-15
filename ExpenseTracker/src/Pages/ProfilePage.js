import React, { useContext, useState } from "react";
import "./ProfilePage.css";
import Loader from "../components/Loader";
import ReactDOM from "react-dom";
import {useSelector} from 'react-redux';
import { Link } from "react-router-dom";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [emailVerify, setEmailVerify] = useState(false);
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn)
  const token = useSelector((state)=>state.auth.token)


  const handleVerify = async () => {
        try{
                const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB6rg8fyHFAJQjm7qIoNTFrhIZFMXDLLfQ",{
                    method:"POST",
                    body:JSON.stringify({
                        idToken:token,
                        requestType:"VERIFY_EMAIL"
                    })
                })

                if(!response.ok){
                    alert("Something went wrong. Try again");
                    console.log(response.json())
                }
                alert("Verification link sent")
                const data = await response.json();
                console.log(data);
                

        }catch(err){
            alert("Something went wrong")
            console.log(err)
        }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name || !photoUrl) {
      alert("Fill all the fields");
      return;
    }
    setLoading(true);

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB6rg8fyHFAJQjm7qIoNTFrhIZFMXDLLfQ",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
            displayName: name,
            photoUrl: photoUrl,
            returnSecureToken: false,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        alert("Something went wrong. Try again!!");
        console.log(response.json());
      }
      alert("Profile updated")
      const data = await response.json();
      console.log(data);
    } catch (err) {
      alert(err.message);
      console.log(err.message);
    } finally {
      setLoading(false);
      setName("");
      setPhotoUrl("");
    }
  };

  return (
    <div className="m-2 ">
      <form onSubmit={handleSubmit}>
        <div className="d-flex justify-content-around align-items-center">
          <h3>Contacts Detail</h3>
          <Link className="btn btn-danger btn-sm" to={'/'}>Cancel</Link>
        </div>
        <div className="d-flex justify-content-center align-items-center mt-2">
          <label>Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Profile Photo Url</label>
          <input
            type="text"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
        <button className="btn btn-sm btn-primary m-2" type="sumit">Update</button>
        <button className="btn btn-sm  btn-primary" onClick={handleVerify}>
          Verify Email
      </button>
        </div>
      </form>
      {isLoading &&
        ReactDOM.createPortal(<Loader />, document.getElementById("portal"))}
      
    </div>
  );
}
