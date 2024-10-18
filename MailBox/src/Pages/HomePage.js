import React, { useEffect, useState } from 'react'
import './HomePage.css';
import EditorPage from '../components/EditorPage';
import Inbox from '../components/Inbox';
import Sent from '../components/Sent';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReceivedMails, fetchSentMails } from '../store/MailSlice';
export default function HomePage() {

  const dispatch = useDispatch();
  
 const [show,setShow]=useState({
  editor:false,
  inbox:true,
  sentbox:false,
 })

  const handleShow = (name)=>{
    setShow(()=>{
      const newShow = {editor:false,inbox:false,sentbox:false};
      return {...newShow,[name]:true}
    })
  }

  useEffect(() => {
    setInterval(()=>{
    dispatch(fetchReceivedMails());
    dispatch(fetchSentMails());
    },2000)
  }, []);

  const {receivedMails} = useSelector((state)=>state.mail)
  let unreadCount=0;
  const list = receivedMails.map((item)=>{
    for(let i in item){
      if(!item[i].read){
        unreadCount++;
      }
    }
  })
  // const mail = new Array();
 




  return (
    <div className='d-flex mt-3 ' style={{height:"90vh"}}>

      <div className='fw-semibold px-3 fs-6  border w-25 text-center'>
        <p onClick={()=>handleShow('editor')} className='sidePanel py-2 '> Compose</p>
        <p  onClick={()=>handleShow('inbox')}  className='sidePanel '> Inbox({unreadCount})</p>
        <p  onClick={()=>handleShow('sentbox')}  className='sidePanel '> Sent</p>
      </div>
     
      <div className='border w-75 ms-5'> 
        {show.editor && <EditorPage/>}
        {show.inbox && <Inbox/>}
        {show.sentbox && <Sent/>}
      </div>
   
    </div>
  )
}
