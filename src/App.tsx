import React, {useContext} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import AuthForm from './forms/logInForm'

import {AuthContext} from "./models/AuthorizationHandler";
import AuthorizationHandler from "./models/AuthorizationHandler";

const url = "http://212.113.102.189:7000/"

function App() {

  const client = new QueryClient();

  return (
    <div className="App">
        <AuthorizationHandler>
            <p>
                Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <QueryClientProvider client={client}>
                {useContext(AuthContext).isAuthorized ? <Test/> : <AuthForm/>}
            </QueryClientProvider>
        </AuthorizationHandler>
    </div>
  );
}


function Test() {
    const request = {
        method: "GET",
        body:
            JSON.stringify({
                "login": "test-1",
                "password": "test-1",
            })
    }
    const {isLoading, error, data} = useQuery({
    queryKey: ["test"],
    queryFn: () => axios.post(url + "auth/register", {"login":"test-1", "password":"test-1"}),
  })

  if(isLoading){
    return <h1>Loading...</h1>
  }

  if(error){
    return <h1>Error {error.message}</h1>
  }

  return(
      <h1>{data?.data.token}</h1>
  )
}

export default App;
