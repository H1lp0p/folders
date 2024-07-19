import axios, {AxiosInstance} from "axios";
import {useState, createContext, useEffect, useContext} from "react";

export type UserContext = {
    isAuthorized: boolean,
    userToken : string,
    userName: string,
    logIn: (newToken: string, newUsername : string) => void,
    logOut: () => void
}

export const AuthContext = createContext<UserContext>({
    isAuthorized: false,
    userToken : "",
    userName: "",
    logIn: (newToken: string, newUsername : string) => {},
    logOut: () => {}
});

interface Props{
    children:any,
}

function AuthorizationHandler({ children } : Props) {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [userToken, setUserToken] = useState("");
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const localToken = localStorage.getItem("token");
        const localUserName = localStorage.getItem("username");
        if (localToken !== null && localUserName !== null) {
            setIsAuthorized(true);
            setUserToken(localToken);
            setUserName(localUserName);
        }
    }, [])

    function logIn(newToken: string, newUsername : string){
        setUserToken(newToken);
        setIsAuthorized(true);
        setUserName(newUsername);
    }

    function logOut(){
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setIsAuthorized(false);
        setUserToken("");
        setUserName("");
    }

    return (
        <AuthContext.Provider value={{isAuthorized, userToken, userName, logIn, logOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthorizationHandler;