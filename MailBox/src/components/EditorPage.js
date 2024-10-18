import React, { useCallback, useEffect, useRef, useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./Editor.css";
import { useDispatch, useSelector } from "react-redux";
import { sendMail } from "../store/MailSlice";

const EmailComposer = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [to, setTo] = useState("");
  const [recipients, setRecipients] = useState([]);
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.mail.userEmail);
  const [emailData, setEmailData] = useState({
    subject: "",
    body: "",
  });

  const handleChange = (e) => {
    setEmailData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const sendBtn = () => {
    if (!emailData.subject || !emailData.body || recipients.length === 0) {
      alert("Please fill in all the fields before sending.");
      return;
    }

    const mailData = {
      subject: emailData.subject,
      body: emailData.body,
      sentAt: new Date().toISOString(),
      from: userEmail,
      userEmail,
      read:false,
    };
    const  recipient= recipients.map((r) => r.to); 

    dispatch(sendMail({mailData,recipient}));
    
    alert("Email sent successfully!");
    setEmailData({ subject: "", body: "" });
    setRecipients([]);
    setEditorState(EditorState.createEmpty());
  };

  const handleButton = (e) => {
    if (e.key === "Enter" && e.target.name === "to" && to && to.length > 6) {
      setRecipients((prev) => [...prev, { to, id: Math.random().toString() }]);
      setTo("");
    }
  };

  const handleRemove = (id) => {
    const newRecipient = recipients.filter((item) => item.id !== id);
    setRecipients(newRecipient);
  };

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
    setEmailData((prevData) => ({
      ...prevData,
      body: draftToHtml(convertToRaw(newEditorState.getCurrentContent())),
    }));
  };

  return (
    <div className="myContainer mx-auto">
      <div>
        <label>To:</label>
        <div className="recipient">
          {recipients.length > 0 && (
            <ul className=" d-flex gap-1">
              {recipients.map((item) => {
                return (
                  <li className="border rounded-4" key={item.id}>
                    <span>{item.to}</span>
                    <span
                      onClick={() => handleRemove(item.id)}
                      className="btn btn-sm btn-danger remove"
                    >
                      X
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <div>
          <input
            type="email"
            name="to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="Recipient email"
            onKeyDown={handleButton}
          />
        </div>
      </div>

      <div>
        <label>Subject:</label>
        <input
          type="text"
          name="subject"
          value={emailData.subject}
          onChange={handleChange}
          placeholder="Subject"
          onKeyDown={handleButton}
        />
      </div>

      <div>
        <label>Body:</label>
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "4px",
            minHeight: "200px",
          }}
        >
          <Editor
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            toolbarClassName="demo-toolbar"
            onEditorStateChange={onEditorStateChange}
            toolbar={{
              options: ["inline", "link", "colorPicker", "image"],
              inline: {
                options: ["bold", "italic", "underline"],
                bold: { className: "toolbar-bold" },
                italic: { className: "toolbar-italic" },
                underline: { className: "toolbar-underline" },
              },
              link: {
                options: ["link"],
              },
              image: {
                urlEnabled: true,
                uploadEnabled: false,
                alignmentEnabled: true,
                previewImage: true,
              },
            }}
          />
        </div>
      </div>

      <button onClick={sendBtn} className="btn btn-primary  rounded-2 mt-2">
        Send
      </button>
    </div>
  );
};

export default EmailComposer;
