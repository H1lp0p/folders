import {useState, createContext, useEffect, useContext, Dispatch} from "react";
import {Button} from "@mui/material";

export type UserContext = {
    isAuthorized: boolean,
    setIsAuthorized: Dispatch<React.SetStateAction<boolean>>,
    token: string,
    setToken: Dispatch<React.SetStateAction<string>>,
    logIn: (newToken: string, newUsername : string) => void,
    logOut: () => void
}

interface Props{
    children:any,
}

function AuthorizationHandler({ children } : Props) {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [token, setToken] = useState("");


    useEffect(() => {
        const localToken = localStorage.getItem("token");
        if (localToken !== null) {
            setToken(localToken);
            setIsAuthorized(true);
        }
    }, [token])

    function logIn(newToken: string, newUsername : string){
        setToken(newToken);
        setIsAuthorized(true);
        localStorage.setItem("dir", "root");
        localStorage.setItem("username", newUsername);
        localStorage.setItem("token", newToken);

        localStorage.setItem("path", "root");
        localStorage.setItem("nowDir", "root");
    }

    function logOut(){
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("dir");

        localStorage.removeItem("path");
        localStorage.removeItem("nowDir");
        setIsAuthorized(false);
        setToken("");
        console.log("logOut")
    }


    const value = {isAuthorized, setIsAuthorized, token, setToken, logIn, logOut};

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const AuthContext = createContext<UserContext>({
    isAuthorized: false,
    setIsAuthorized: () => {},
    token: "",
    setToken: () => {},
    logIn: (newToken: string, newUsername : string) => {},
    logOut: () => {console.log("baseOne")},
});

export default AuthorizationHandler;