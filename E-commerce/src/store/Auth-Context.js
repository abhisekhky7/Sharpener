import React, { useEffect, useState } from 'react'

const AuthContext = React.createContext({
    token:'',
    isLoggedIn:false,
    login:(token)=>{},
    logout:()=>{},
})

export const AuthContextProvider=(props)=>{
    const [token,setToken]=useState(null)
    
    const userIsLoggedIn = !!token;

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token){
            setToken(token)
        }
    },[])
    
   
    const loginHandler=(token)=>{
        setToken(token);
        localStorage.setItem("token",token);
    };
   
    const logoutHandler=()=>{
        setToken(null)
        localStorage.removeItem('token')

    }

    const value={
        token,
        isLoggedIn:userIsLoggedIn,
        login:loginHandler,
        logout:logoutHandler
    }
    return <AuthContext.Provider value={value}>
        {props.children}
    </AuthContext.Provider>

}

export default AuthContext;