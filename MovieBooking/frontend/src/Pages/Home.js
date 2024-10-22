import React, { useEffect, useState } from "react";
import "./Home.css";
import Carausel from "../components/Carausel";
import { collection, onSnapshot } from "firebase/firestore";
import db from "../firebase/firebase";
import MoviesAtTop from "../components/MoviesAtTop";
import { useSelector } from "react-redux";
import BrowseMovie from "../components/BrowseMovie";

export default function Home() {
  const [list, setList] = useState([]);
  const [filterList,setFilterList]=useState([]);
  const category = useSelector((state)=>state.movie.category);


  useEffect(
    () =>
      onSnapshot(collection(db, "movies"), (snapshot) =>
        setList(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );


  useEffect(() => {
    if (list.length > 0) {
      const newList = list.filter((item) =>item.category==category);
      setFilterList(newList);
    } else {
      setFilterList([]);
    }
  }, [list, category]);

  return (
    <div className="text-center mt-0 mb-5">
      <Carausel />
      <MoviesAtTop list={filterList}/>
      <BrowseMovie movies={list}/>
    </div>
  );
}


