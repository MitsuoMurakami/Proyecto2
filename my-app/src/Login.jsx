import React, { useEffect } from 'react';
import {  Box, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function emailHandler(event) {
    setEmail(event.target.value);
  }

  function passwordHandler(event) {
    setPassword(event.target.value);
  }

  async function fetchLogin() {
    var data = {"email":email, "password":password}
    await fetch("http://localhost:5000/login", {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(response => {
        if (response.response === "ERROR"){
          alert("Correo electrónico o Contraseña incorrectos");
        }
        else{
          localStorage.setItem("financetech_user_id",response.id);
          window.location.href = '/';
        }
    })
  }

  return (
    <Box className="App" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Stack spacing={4} width={200} style = {{float: 'center'}}>
          <h1>Ingresar</h1>
          <TextField
            id="outlined-basic"
            label="Correo Electrónico"
            variant="outlined"
            onChange={emailHandler}
          />
          <TextField
            id="outlined-basic2"
            label="Contraseña"
            variant="outlined"
            type="password"
            onChange={passwordHandler}
          />
          <Button onClick={fetchLogin}>Ingresar</Button>
          <p>¿No estás registrado? <a href="/Register">Regístrate aquí</a></p>
        </Stack>
      </Box>
  );
}

export default Login;