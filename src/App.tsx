import React, {useContext, useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import axios, {AxiosResponse} from 'axios';
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import AuthForm from './forms/logInForm'

import {AuthContext} from "./components/AuthorizationHandler";
import AuthorizationHandler from "./components/AuthorizationHandler";
import PlaceHolder from "./components/PlaceHolder";
import MainPlate from "./components/MainPlate";
import {Button} from "@mui/material";
import Header from "./components/Header";

const url = "http://212.113.102.189:7000/"

function App() {
  const client = new QueryClient();

  const {isAuthorized, setIsAuthorized} = useContext(AuthContext);

    useEffect(() => {
    }, [isAuthorized]);

  return (
    <div className="App">
        <AuthorizationHandler>
            <QueryClientProvider client={client}>
                <AuthForm closeFunc={(b:boolean)=> {
                    setIsAuthorized(b)}}/>
                <AuthContext.Consumer>
                    {(value)=> (
                        <div>
                            <Header logOut={value.logOut} userName={localStorage.getItem("username")}></Header>
                            {value.isAuthorized ? <MainPlate/> : null}
                        </div>

                    )}
                </AuthContext.Consumer>
            </QueryClientProvider>
        </AuthorizationHandler>
    </div>
  );
}

export default App;
