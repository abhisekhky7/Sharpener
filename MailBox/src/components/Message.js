import React from 'react';
import { useLocation } from 'react-router-dom';
import './Message.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteMail, markMailAsRead } from '../store/MailSlice';
import parse from 'html-react-parser'

const Message = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;
    const type = location.state?.type;
    const longId = location.state?.longId;
    const userEmail = useSelector((state)=>state.mail.userEmail);
    const {sentAt} = email;
    

    if(type==='receivedMails'){
        dispatch(markMailAsRead({longId,shortId:email.id}))
    }
   

    const handleNavigate = ()=>{
        navigate("/")
    }
    const handleDelete = ()=>{
        const data={
            mailId:email.id,
            type
        }
        dispatch(deleteMail(data));

        
        handleNavigate();
    }

    return (
        <div className=' m-2  m-4'>
            {email ? (
                <div className=''>
                  <div className=' ps-2 border rounded-3 fw-medium'> 
                     <h2>{email.subject}</h2>
                    <p>From: {email.from}</p>
                    <p>To: {userEmail}</p>
                    <p>Date: {sentAt.slice(0,10)}, {sentAt.slice(11,19)}</p></div>
                 <div className='m-3 '>{parse(email.body)}</div>
                </div>
            ) : (
                {handleNavigate}
            )}
            <button onClick={handleDelete} className='btn btn-sm btn-danger'>Delete</button>
        </div>
    );
};

export default Message;
