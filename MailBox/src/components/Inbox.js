import React, { useEffect, useState } from "react";
import "./Inbox.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchReceivedMails } from "../store/MailSlice";
import parser from "html-react-parser";

export default function Inbox() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inbox = useSelector((state) => state.mail.receivedMails);

  const handleNavigate = (item, longId, type) => {
    navigate("/message", { state: { email: item, type, longId } });
  };

  return (
    <div>
      {!inbox.length > 0 ? (
        <div className="text-center" style={{position:'fixed',top:"50%",left:"50%"}}>
        <p className="fw-semibold fs-4">Box is Empty!!</p>
        </div>
      ) : (
        <ul className=" p-2">
          {inbox.map((item, ind) => {
            for (let i in item) {
              return (
                <li
                  style={{ fontSize: "1.1rem" }}
                  className="d-flex pt-1 ms-2 ps-2 border rounded-3 gap-3"
                  key={i}
                  onClick={() => handleNavigate(item[i], i, "receivedMails")}
                >
                  <div className="w-25">
                    <p className="fw-semibold"> {item[i].from}</p>
                  </div>
                  <div className=" w-50 d-flex">
                    <p className="w-50">
                      <span className="fw-semibold">{item[i].subject} </span>
                    </p>
                    <span className="w-50">{parser(item[i].body)}</span>
                  </div>
                  <div className="w-50">
                    <p> {item[i].sentAt.slice(11, 19)}</p>
                  </div>
                </li>
              );
            }
          })}
        </ul>
      )}
    </div>
  );
}
