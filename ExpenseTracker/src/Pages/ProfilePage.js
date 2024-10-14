import React, { useContext, useState } from "react";
import "./ProfilePage.css";
import AuthContext from "../store/AuthContext";
import Loader from "../components/Loader";
import ReactDOM from "react-dom";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [emailVerify, setEmailVerify] = useState(false);

  const ctx = useContext(AuthContext);

  const handleVerify = async () => {
        try{
                const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB6rg8fyHFAJQjm7qIoNTFrhIZFMXDLLfQ",{
                    method:"POST",
                    body:JSON.stringify({
                        idToken:ctx.token,
                        requestType:"VERIFY_EMAIL"
                    })
                })

                if(!response.ok){
                    alert("Something went wrong. Try again");
                    console.log(response.json())
                }

                const data = await response.json();
                console.log(data);
                

        }catch{

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
            idToken: ctx.token,
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
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <h3>Contacts Detail</h3>
          <button>Cancel</button>
        </div>
        <div>
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
        </div>
        <button type="sumit">Update</button>
      </form>
      {isLoading &&
        ReactDOM.createPortal(<Loader />, document.getElementById("portal"))}
      <button className="btn btn-primary" onClick={handleVerify}>
        Verify Email
      </button>
    </div>
  );
}
