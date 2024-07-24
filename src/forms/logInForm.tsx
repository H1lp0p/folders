import {AuthContext} from "../components/AuthorizationHandler";
import {useContext, useState} from "react";
import {Button, FormControl, Input, InputLabel, Modal, Paper} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form"
import axios, {AxiosResponse} from "axios";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

interface IFormInput {
    login: string,
    password: string
}

function AuthForm({closeFunc} : any){

    const AuthData = useContext(AuthContext)

    const [isRegister, setIsRegister] = useState(false);

    const {register, handleSubmit} = useForm<IFormInput>();


    const getData : SubmitHandler<IFormInput> = (formData) => {
        if (formData.login !== "" && formData.password !== ""){
            const apiUrl = localStorage.getItem("apiUrl")! + (isRegister? "auth/register" : "auth/login");
            try {
                const data = axios.post(apiUrl, formData)
                data.then((response: AxiosResponse) =>{
                    AuthData.logIn(response.data.token, formData["login"])
                });
            }
            catch (error) {
                console.log("error", error);
            }
            closeFunc(true);
        }
    }

    useState(()=>{
        closeFunc(AuthData.isAuthorized);
    })

    const handleLogIn = () => {
        let submit = document.getElementById("formSubmit")
        setIsRegister(false);
        submit!.click()
    }

    const handleRegister = () => {
        let submit = document.getElementById("formSubmit")
        setIsRegister(true);
        submit!.click()
    }

    return (
        <Modal
        open = {!AuthData.isAuthorized}
        style={{justifyContent: "center", alignItems: "center", display: "flex"}}>
            <Paper elevation={2} style={{display: "block", alignItems: "center", justifyItems: "center", padding: "16px"}}>
                <label><h1>Log in or sign up</h1></label>
                <form id="AuthForm" onSubmit={handleSubmit(getData)} style={{display: "grid", alignItems: "center", gap: "8px"}}>
                    <FormControl defaultValue="Имя" required={true}>
                        <InputLabel>Логин</InputLabel>
                        <Input {...register("login")}></Input>
                    </FormControl>
                    <FormControl defaultValue="Имя" required={true}>
                        <InputLabel>Пароль</InputLabel>
                        <Input {...register("password")}></Input>
                    </FormControl>
                    <Input id="formSubmit" type="submit" style={{display: "none"}}></Input>
                </form>
                <div style={{justifyContent: "center", marginTop: "8px"}}>
                    <Button variant="contained" style={{marginRight: "8px"} } onClick={handleLogIn}>Log in</Button>
                    <Button variant="outlined" onClick={handleRegister}>Sign up</Button>
                </div>
            </Paper>
        </Modal>
    )
}

export default AuthForm;