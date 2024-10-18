import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import useFetch from '../helpers/fetchHelper';
import { fetchHelper } from '../helpers/fetchHelper';

const firebaseUrl = 'https://mailbox-a7825-default-rtdb.firebaseio.com'


export const sendMail = createAsyncThunk('mail/sendMail', async ({mailData,recipient}, { getState }) => {
    const {userEmail}=mailData;
    
    const mailId = nanoid(5);
    const emailData = {...mailData,id:mailId};
    await fetchHelper(`${firebaseUrl}/users/${userEmail.replace('.', '_')}/sentMails/${mailId}.json`,'POST',emailData)

    recipient.forEach(async (recipients) => {
        await fetchHelper(`${firebaseUrl}/users/${recipients.replace('.', '_')}/receivedMails/${mailId}.json`, 'POST',emailData)
    })

    return emailData;

});


export const fetchReceivedMails = createAsyncThunk('mail/fetchReceivedMails', async (_, { getState }) => {
    const {mail} = getState();
    const userEmail = mail.userEmail;

    const response = await fetchHelper(`${firebaseUrl}/users/${userEmail.replace('.','_')}/receivedMails.json`);
    const data = response;
    let newData =[];
    
    for(let i in data){
       newData.push({...data[i]});
    }
    return newData;
});


export const fetchSentMails = createAsyncThunk('mail/fetchSentMails',async(_,{getState})=>{
    const {mail} =getState();
    const userEmail=mail.userEmail;
    const response = await fetchHelper(`${firebaseUrl}/users/${userEmail.replace('.','_')}/sentMails.json`);
    const data = response;
    let newData =[];
    
    for(let i in data){
       newData.push(data[i]);
    }
    return newData;
    
})

export const markMailAsRead = createAsyncThunk('mail/markMailAsRead', async ({longId,shortId},{getState}) => {
    const {mail}=getState();
    const userEmail = mail.userEmail;
    console.log(longId)

    await fetchHelper(`${firebaseUrl}/users/${userEmail.replace('.','_')}/receivedMails/${shortId}/${longId}.json`,'PATCH',{read:true});
  
    return shortId ;
  });

export const deleteMail = createAsyncThunk('mail/deleteMail', async ({type,mailId}, { getState }) => {
            const {mail}=getState();
            const {userEmail} = mail;
    await fetchHelper(`${firebaseUrl}/users/${userEmail.replace(".","_")}/${type}/${mailId}.json?`,'DELETE');
           
    return {type,mailId};
});

const mailSlice = createSlice({
    name: 'mail',
    initialState: {
        userEmail: localStorage.getItem("userEmail")||null,
        sentMails: [],
        receivedMails: [],
        deletedMails: [],
        loading: false,
        error: null,
        unread:0,
    },
    reducers: {
        saveUserEmail:(state,action)=>{
            state.userEmail = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(sendMail.fulfilled, (state, action) => {
            state.sentMails.push(action.payload);
        });

        builder.addCase(fetchReceivedMails.fulfilled, (state, action) => {
            state.receivedMails = action.payload;
        });

        builder.addCase(fetchSentMails.fulfilled, (state, action) => {
            state.sentMails = action.payload;
        });

        

        builder.addCase(deleteMail.fulfilled, (state, action) => {
            state[action.payload.type] = state[action.payload.type].filter(mail => mail.id !== action.payload.mailId);
        });

        builder.addCase(sendMail.pending, (state) => {
            state.loading = true;
        }).addCase(sendMail.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
});

export const {saveUserEmail,mailActions} = mailSlice.actions;
export default mailSlice.reducer;
