import React, { useState } from 'react';
import './App.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import { Box, Button, Stack, TextField } from '@mui/material';

function Friends() {
  const [usuario, setUsuario] = useState({
    usuario: '',
    correo: '',
    contraseña: '',
  });
  
  const [lista, setLista] = useState({
    amigos: [
    ],
    solicitudes: [
    ],
    gastosCompartidos: [
    ]
  });

  const id = localStorage.getItem("financetech_user_id");

  const [solicitudesModalOpen, setSolicitudesModalOpen] = useState(false);
  const [nuevoAmigo, setNuevoAmigo] = useState('');
  const [agregarAmigoModalOpen, setAgregarAmigoModalOpen] = useState(false);
  const [nuevoGasto, setNuevoGasto] = useState('');

  async function fetchUser() {
    const response = await fetch(`https://josebojorquez.pythonanywhere.com/users/${id}`);
    const data = await response.json();
    try{
      setUsuario({...usuario, usuario:data.username, correo:data.email})
    } catch (error){
      window.location.href = '/Login';
    }
  }

  const handleEliminarAmigo = (amigoId) => {
    setLista((prevState) => ({
      ...prevState,
      amigos: prevState.amigos.filter((amigo) => amigo.id !== amigoId),
    }));
  };

  const handleAceptarSolicitud = (solicitudId) => {
    setLista((prevState) => {
      const solicitud = prevState.solicitudes.find(
        (solicitud) => solicitud.id === solicitudId
      );
      if (solicitud) {
        return {
          ...prevState,
          amigos: [...prevState.amigos, { id: solicitud.id, nombre: solicitud.nombre }],
          solicitudes: prevState.solicitudes.filter((solicitud) => solicitud.id !== solicitudId),
        };
      }
      return prevState;
    });
  };

  const openSolicitudesModal = () => {
    setSolicitudesModalOpen(true);
  };

  const closeSolicitudesModal = () => {
    setSolicitudesModalOpen(false);
  };

  const openAgregarAmigoModal = () => {
    setAgregarAmigoModalOpen(true);
  };

  const closeAgregarAmigoModal = () => {
    setAgregarAmigoModalOpen(false);
  };

  const handleAgregarAmigo = () => {
    setLista((prevState) => ({
      ...prevState,
      amigos: [...prevState.amigos, { id: Date.now(), nombre: nuevoAmigo }],
    }));
    setNuevoAmigo('');
    closeAgregarAmigoModal();
  };

  return (
    <Box className="App"> 
      <Button className="Inicio-Boton" style={{float:'left',fontSize:'20px',padding:'20 px 10px', marginLeft:'20px',marginTop:'20px'}} onClick={() => {window.location.href = '/';}}>Inicio</Button>
      <Button style={{ float: 'right',fontSize:'20px',padding:'20 px 10px', marginLeft:'20px', marginRight:'20px',marginTop:'20px'}} onClick={openSolicitudesModal}>Ver Solicitudes</Button>
      <Modal
        isOpen={solicitudesModalOpen}
        onRequestClose={closeSolicitudesModal}
        contentLabel="Solicitudes"
      >
        <h2>Solicitudes</h2>
        <ul>
          {lista.solicitudes.map((solicitud) => (
            <li key={solicitud.id}>
              {solicitud.nombre}
              <button onClick={() => handleAceptarSolicitud(solicitud.id)}>Aceptar</button>
            </li>
          ))}
        </ul>
        <Button variant="outlined" onClick={closeSolicitudesModal}>Cerrar</Button>
      </Modal>
      <div>
        <Button style={{ float: 'right',fontSize:'20px',padding:'20 px 10px', marginLeft:'20px',marginTop:'20px'}} onClick={openAgregarAmigoModal}>Añadir Amigo</Button>
        <Modal
          isOpen={agregarAmigoModalOpen}
          onRequestClose={closeAgregarAmigoModal}
          contentLabel="Agregar Amigo"
        >
          <h2>Agregar Amigo</h2>
          <input
            type="text"
            value={nuevoAmigo}
            onChange={(e) => setNuevoAmigo(e.target.value)}
          />
          <Button variant="outlined" style={{ fontSize:'10px',padding:'20 px 5px', marginLeft:'20px'}}  onClick={handleAgregarAmigo}>Añadir Amigo</Button>
          <Button variant="outlined" style={{ fontSize:'10px',padding:'20 px 5px', marginLeft:'20px'}}  onClick={closeAgregarAmigoModal}>Cancelar</Button>
        </Modal>
      </div>

      <div style={{ marginTop: '30px' }}>
        <ToastContainer position="center" autoClose={3000} />
        
        <br></br><br></br><br></br>
        <h2>Amigos:</h2>
        <ul>
          {lista.amigos.map((amigo) => (
            <li key={amigo.id}>
              {amigo.nombre}
              <Button variant="outlined" style={{ fontSize:'10px',padding:'20 px 5px', marginLeft:'20px'}}  onClick={() => handleEliminarAmigo(amigo.id)}>Eliminar</Button>
            </li>
          ))}
        </ul>
        <h2>Gastos Compartidos:</h2>
        <ul>
          {lista.gastosCompartidos.map((gasto) => (
            <li key={gasto.id}>
              {gasto.nombre}
              <Button variant="outlined" style={{ fontSize:'10px',padding:'20 px 5px', marginLeft:'20px'}} >Aceptar</Button>
              <Button variant="outlined" style={{ fontSize:'10px',padding:'20 px 5px', marginLeft:'20px'}} >Rechazar</Button>
            </li>
          ))}
        </ul>
      </div>
    </Box>
  );
}

export default Friends;
