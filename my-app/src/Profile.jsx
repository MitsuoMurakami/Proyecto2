import React,{useState} from 'react';
import './App.css';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  return (
    <div className="App">
      <button className="Inicio-Boton" style={{float:'left',fontSize:'20px',padding:'20 px 10px', marginLeft:'20px',marginTop:'20px'}} onClick={() => {window.location.href = '/';}}>Inicio</button>
      <button onClick={() => setEdicionHabilitada(true)} className="Editar-Boton" style={{float:'right',fontSize:'20px',padding:'20 px 10px', marginRight:'20px',marginTop:'20px' }}>Editar</button>
      <br></br><br></br>
      <h1 style={{textAlign:'center'}}>MI PERFIL</h1>
      <br></br>
      <label style={{fontSize:'20px',padding:'30 px 20px'}}>Usuario:</label><br></br>
      <input type="text" name="usuario" value={usuario.usuario} onChange={handleChange} disabled={actualizado||!edicionHabilitada} ></input>
      <br></br><br></br>
      <label style={{fontSize:'20px',padding:'20 px 10px'}}>Correo:</label><br></br>
      <input type="text" name="contraseña" value={usuario.contraseña} onChange={handleChange} disabled={actualizado||!edicionHabilitada}></input>
      <br></br><br></br>
      <label style={{fontSize:'20px',padding:'20 px 10px'}}>Contraseña:</label><br></br>
      <input type="text" name="correo" value={usuario.correo} onChange={handleChange} disabled={actualizado||!edicionHabilitada}></input>
      <br></br><br></br><br></br>
      <button onClick={handleSave} style={{fontSize:'20px',padding:'20 px 10px'}} disabled={actualizado||!edicionHabilitada}>Guardar</button>
      <div style={{ marginTop: '30px' }}>
      <ToastContainer position="top-right" autoClose={3000}></ToastContainer>
        <h2>Datos de usuario:</h2>
        <p>Nombre: {usuario.usuario}</p>
        <p>Contraseña: {usuario.contraseña}</p>
        <p>Correo: {usuario.correo}</p>
      </div>
    </div>
  );
}

export default App;
