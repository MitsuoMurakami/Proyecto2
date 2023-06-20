import React,{useState} from 'react';
import './App.css';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  Box, Button, Stack, TextField } from "@mui/material";

function App() {
  const [usuario, setUsuario] = useState({
    usuario: 'Valores por defecto sacados de la base de datos',
    correo: 'Valores por defecto sacados de la base de datos',
    contraseña: 'Valores por defecto sacados de la base de datos',
  });
  const [edicionHabilitada, setEdicionHabilitada] = useState(false);
  const [actualizado, setActualizado] = useState(false);
  const handleChange = (event) => {
    setUsuario({
      ...usuario,
      [event.target.name]: event.target.value,
    });
  };
  const handleSave = () => {
    //Guardar datos del usuario:
    console.log('Datos guardados:', usuario);
    setActualizado(true);
    setEdicionHabilitada(false);
    toast.success('Datos actualizados');
  };

  const handleHomeClick = () => {
    window.location.href = '/';
  };

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
            id="outlined-basic"
            label="Correo"
            variant="outlined"
            name="correo"
            value={usuario.correo} 
            onChange={handleChange} 
            disabled={actualizado||!edicionHabilitada} ></TextField>
      <br></br><br></br>
      <TextField
            id="outlined-basic"
            label="Contraseña"
            variant="outlined"
            name="contraseña"
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