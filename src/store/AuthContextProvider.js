import React, {useState} from 'react';
import AuthContext from './auth-context';

const AuthContextProvider = (props) => {
    const [idToken, setIdToken] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const loginHandler = (token)=>{
        setIdToken(token);
    }
    const contextValue={
        idToken: idToken,
        isLoggedIn: isLoggedIn,
        login: loginHandler,
    }
  return (
    <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
