import React, { useEffect, useState } from "react";
import "./Home.css";
import Carausel from "../components/Carausel";
import { collection, onSnapshot } from "firebase/firestore";
import db from "../firebase/firebase";
import MoviesAtTop from "../components/MoviesAtTop";

export default function Home() {
  const [list, setList] = useState([]);
  const [category,setCategory]=useState('');

  console.log(list);

  useEffect(
    () =>
      onSnapshot(collection(db, "movies"), (snapshot) =>
        setList(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );

  return (
    <div className="text-center mt-0 mb-5">
      <Carausel />
      <MoviesAtTop list={list}/>
    </div>
  );
}
