import React,{useState, useEffect} from 'react';
import './App.css';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  Box, Button, Stack, TextField } from "@mui/material";

function App() {
  const [usuario, setUsuario] = useState({
    usuario: '',
    correo: '',
    contraseña: '',
  });
  const [edicionHabilitada, setEdicionHabilitada] = useState(false);
  const [actualizado, setActualizado] = useState(false);

  const id = localStorage.getItem("financetech_user_id");

  async function fetchUser() {
    const response = await fetch(`https://josebojorquez.pythonanywhere.com/users/${id}`);
    const data = await response.json();
    try{
      setUsuario({...usuario, usuario:data.username, correo:data.email})
    } catch (error){
      window.location.href = '/Login';
    }
  }

  async function fetchUpdateUser() {
    var data = {"email":usuario.correo, "username":usuario.usuario, "password":usuario.contraseña}
    const responseUpdate = await fetch(`https://josebojorquez.pythonanywhere.com/users/${id}`, {
      method: 'PUT',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    var res = await responseUpdate.text();
    console.log(res);
    if (res == "SUCCESS"){
      toast.success("Datos Actualizados");
    }
    else{
      alert("El correo electrónico ya está registrado o la contraseña es incorrecta");
    }
    fetchUser();
  }

  const handleChange = (event) => {
    setUsuario({
      ...usuario,
      [event.target.name]: event.target.value,
    });
  };
  const handleSave = () => {
    //Guardar datos del usuario:
    fetchUpdateUser();
    setActualizado(true);
    setEdicionHabilitada(false);
  };

  const handleHomeClick = () => {
    window.location.href = '/';
  };

  useEffect(() => {
    fetchUser();
  }, [])

  return (
    <Box className="App">

      <Button className="Inicio-Boton" style={{float:'left',fontSize:'20px',padding:'20 px 10px', marginLeft:'20px',marginTop:'20px'}} onClick={handleHomeClick}>Inicio</Button>
      <Button onClick={() => setEdicionHabilitada(true)} className="Editar-Boton" style={{float:'right',fontSize:'20px',padding:'20 px 10px', marginRight:'20px',marginTop:'20px' }}>Editar</Button>
      <br></br><br></br>
      <h1 style={{textAlign:'center', color:'blue'}}>MI PERFIL</h1>
      <br></br>
      <TextField
            id="outlined-basic"
            label="Usuario"
            variant="outlined"
            name="usuario"
            value={usuario.usuario} 
            onChange={handleChange} 
            disabled={actualizado||!edicionHabilitada} ></TextField>
      <br></br><br></br>
      <TextField
            id="outlined-basic2"
            label="Correo"
            variant="outlined"
            name="correo"
            value={usuario.correo} 
            onChange={handleChange} 
            disabled={actualizado||!edicionHabilitada} ></TextField>
      <br></br><br></br>
      <TextField
            id="outlined-basic3"
            label="Ingresar Contraseña"
            variant="outlined"
            name="contraseña"
            type="password"
            value={usuario.contraseña} 
            onChange={handleChange} 
            disabled={actualizado||!edicionHabilitada} ></TextField>
      <br></br><br></br><br></br>
      <Button onClick={handleSave} style={{fontSize:'20px',padding:'20 px 10px'}} disabled={actualizado||!edicionHabilitada}>Guardar</Button>
      <div style={{ marginTop: '30px' }}>
      <ToastContainer position="top-right" autoClose={3000}></ToastContainer>
      </div>
    </Box>
  );
}

export default App;