import AuthorizationHandler, {AuthContext} from "../models/AuthorizationHandler";
import {useEffect, useState} from "react";

function AuthForm(){

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {

    })


    return (
        <form>
            <input type="text" name="userName">UserName</input>
            <input type="password" name="password">Password</input>
        </form>
    )
}

export default AuthForm;