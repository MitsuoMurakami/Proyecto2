import React, { useEffect } from 'react';
import {  Box, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confpassword, setConfpassword] = useState("");

  function usernameHandler(event) {
    setUsername(event.target.value);
  }

  function emailHandler(event) {
    setEmail(event.target.value);
  }

  function passwordHandler(event) {
    setPassword(event.target.value);
  }

  function confpasswordHandler(event) {
    setConfpassword(event.target.value);
  }

  function checkRegister() {
    if(isEmpty(email) == 0 && isEmpty(username) == 0 && isEmpty(password) == 0 && isEmpty(confpassword) == 0){
      if(password == confpassword){
        fetchRegister();
      }
    }
  }

  function isEmpty(str) {
    return !str.trim().length;
  }

  async function fetchRegister() {
    var data = {"email":email, "username":username, "password":password}
    await fetch("https://josebojorquez.pythonanywhere.com/users", {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(response => {
        if (response === "SUCCESS"){
          toast.success("Registro exitoso");
        }
        else{
          alert("El correo electrónico ya está registrado");
        }
    })
  }

  return (
    <Box className="App" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Stack spacing={4} width={200} style = {{float: 'center'}}>
          <h1>Registrar</h1>
          <TextField
            id="outlined-basic"
            label="Usuario"
            variant="outlined"
            onChange={usernameHandler}
          />
          <TextField
            id="outlined-basic2"
            label="Correo Electrónico"
            variant="outlined"
            onChange={emailHandler}
          />
          <TextField
            id="outlined-basic3"
            label="Contraseña"
            variant="outlined"
            type="password"
            onChange={passwordHandler}
          />
          <TextField
            id="outlined-basic4"
            label="Confirmar Contraseña"
            variant="outlined"
            type="password"
            onChange={confpasswordHandler}
          />
          <Button onClick={checkRegister}>Registrar</Button>
          <p>¿Ya estás registrado? <a href="/login">Ingresa aquí</a></p>
        </Stack>
        <ToastContainer position="top-right" autoClose={3000}></ToastContainer>
      </Box>
  );
}

export default Register;