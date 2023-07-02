import React,{useState} from 'react';
import './App.css';
import {  Box, Button, Stack, TextField, MenuItem } from "@mui/material";

function App() {

  const [usuario, setUsuario] = useState({
    monto: 'Valor',
    monto2: 'Valor',
    categoria: 'Valor',
    amigo: 'Elegir nombre de Amigo'
    });
    const opciones = [
      { value: 'amigo1', label: 'Amigo 1' },
      { value: 'amigo2', label: 'Amigo 2' },
      { value: 'amigo3', label: 'Amigo 3' },
    ];
  const [mostrarCuadroEmergente, setMostrarCuadroEmergente] = useState(false);
  const handleChange = (event) => {
    setUsuario({
      ...usuario,
      [event.target.name]: event.target.value,
      });
    };
  const handleMostrarCuadroEmergente = () => {
      setMostrarCuadroEmergente(true);
    };
  
  const handleCerrarCuadroEmergente = () => {
      setMostrarCuadroEmergente(false);
    };

    const handleProfileClick = () => {
      window.location.href = '/Profile';
    };
  
  
  return (
    
    <Box className="App">
      <Button className="Inicio-Boton" style={{float:'left',fontSize:'20px',padding:'20 px 10px', marginLeft:'20px',marginTop:'20px'}} onClick={() => {window.location.href = '/';}}>Inicio</Button>
      <Button className="Ingreso-Boton" style={{float:'right',fontSize:'20px',padding:'20 px 10px', marginRight:'20px',marginTop:'20px'}} onClick={handleMostrarCuadroEmergente}>Gasto Compartido</Button>
      <Button className="Gasto-Boton" style={{float:'right',fontSize:'20px',padding:'20 px 10px', marginRight:'20px',marginTop:'20px'}}>Gasto</Button>
      <Button className="Gasto Compartido-Boton" style={{float:'right',fontSize:'20px',padding:'20 px 10px', marginRight:'20px',marginTop:'20px'}}>Ingreso</Button>
      <br></br><br></br>
      <br></br>
      <Box style={{fontSize:'20px',textAlign:'center', marginLeft:'10px'}}>
      <br></br><br></br>
      <TextField
            id="outlined-basic"
            label="Monto"
            variant="outlined"
            name="monto"
            type="number"
            value={usuario.monto} 
            onChange={handleChange} ></TextField>
      <br></br><br></br><br></br>
      <TextField
            id="outlined-basic"
            label="Categoria"
            variant="outlined"
            name="categoria"
            type="number"
            value={usuario.categoria} 
            onChange={handleChange} ></TextField>
      <br></br><br></br>
      {mostrarCuadroEmergente && (
        <Box className="Cuadro-Emergente" style={{fontSize:'20px', padding:'20px 10 px'}}>
          <h2 style={{color:'blue'}}>Gasto Compartido</h2>
          <TextField
          id="outlined-basic"
          label="Amigo"
          variant="outlined"
          name="amigo"
          value={opciones[usuario.amigo]}
          onChange={handleChange}
          style={{widht:'20000000'}}
          select
        >
          {opciones.map((opcion) => (
            <MenuItem key={opcion.value} value={opcion.value}>
              {opcion.label}
            </MenuItem>
          ))}
        </TextField>
          <br></br>
          <br></br>
          <TextField
            id="outlined-basic"
            label="Monto"
            variant="outlined"
            name="monto2"
            value={usuario.monto2} 
            onChange={handleChange} ></TextField>
          <br></br>
          <br></br>
          <Button onClick={handleCerrarCuadroEmergente}>Cerrar</Button>
        </Box>
      )}
      <br></br><br></br><br></br>
      <Button className="Confirmar-Boton" style={{fontSize:'20px', padding:'20px 10 px'}}>Confirmar</Button>
      </Box>

    </Box>
  );
}

export default App;