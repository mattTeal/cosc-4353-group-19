import { createContext, useContext, useState } from "react";

const userInfoContext = createContext({});

export default function UserInfoContext({ children }) {
  // Store user info in state variable
  const [userInfo, setUserInfo] = useState( {userID: ""} );

  const value = { userInfo, setUserInfo };
  return (
    <userInfoContext.Provider value={ value }>
        {children}
    </userInfoContext.Provider>
  );
}

export const useUserInfo = () => useContext(userInfoContext);