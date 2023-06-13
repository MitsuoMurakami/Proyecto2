import React, { useState } from 'react';
import './App.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';

function Friends() {
  const [usuario, setUsuario] = useState({
    usuario: 'Valores por defecto sacados de la base de datos',
    correo: 'Valores por defecto sacados de la base de datos',
    contraseña: 'Valores por defecto sacados de la base de datos',
    amigos: [
      { id: 1, nombre: 'Amigo 1' },
      { id: 2, nombre: 'Amigo 2' },
      { id: 3, nombre: 'Amigo 3' }
    ],
    solicitudes: [
      { id: 4, nombre: 'Solicitud 1' },
      { id: 5, nombre: 'Solicitud 2' },
      { id: 6, nombre: 'Solicitud 3' }
    ],
    gastosCompartidos: [
      { id: 7, nombre: 'Gasto compartido 1' },
      { id: 8, nombre: 'Gasto compartido 2' },
      { id: 9, nombre: 'Gasto compartido 3' }
    ]
  });

  const [solicitudesModalOpen, setSolicitudesModalOpen] = useState(false);
  const [nuevoAmigo, setNuevoAmigo] = useState('');
  const [agregarAmigoModalOpen, setAgregarAmigoModalOpen] = useState(false);
  const [gastoCompartidoModalOpen, setGastoCompartidoModalOpen] = useState(false);
  const [nuevoGasto, setNuevoGasto] = useState('');

  const handleEliminarAmigo = (amigoId) => {
    setUsuario((prevState) => ({
      ...prevState,
      amigos: prevState.amigos.filter((amigo) => amigo.id !== amigoId),
    }));
  };

  const handleAceptarSolicitud = (solicitudId) => {
    setUsuario((prevState) => {
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
    setUsuario((prevState) => ({
      ...prevState,
      amigos: [...prevState.amigos, { id: Date.now(), nombre: nuevoAmigo }],
    }));
    setNuevoAmigo('');
    closeAgregarAmigoModal();
  };

  const openGastoCompartidoModal = () => {
    setGastoCompartidoModalOpen(true);
  };

  const closeGastoCompartidoModal = () => {
    setGastoCompartidoModalOpen(false);
  };

  const handleAgregarGastoCompartido = () => {
    setUsuario((prevState) => ({
      ...prevState,
      gastosCompartidos: [...prevState.gastosCompartidos, { id: Date.now(), nombre: nuevoGasto }],
    }));
    setNuevoGasto('');
    closeGastoCompartidoModal();
  };

  return (
    <div className="App">
      <button className="Inicio-Boton" style={{float:'left',fontSize:'20px',padding:'20 px 10px', marginLeft:'20px',marginTop:'20px'}} onClick={() => {window.location.href = '/';}}>Inicio</button>
      <button style={{ float: 'right',fontSize:'20px',padding:'20 px 10px', marginLeft:'20px', marginRight:'20px',marginTop:'20px'}} onClick={openSolicitudesModal}>Ver Solicitudes</button>
      <Modal
        isOpen={solicitudesModalOpen}
        onRequestClose={closeSolicitudesModal}
        contentLabel="Solicitudes"
      >
        <h2>Solicitudes</h2>
        <ul>
          {usuario.solicitudes.map((solicitud) => (
            <li key={solicitud.id}>
              {solicitud.nombre}
              <button onClick={() => handleAceptarSolicitud(solicitud.id)}>Aceptar</button>
            </li>
          ))}
        </ul>
        <button onClick={closeSolicitudesModal}>Cerrar</button>
      </Modal>
      <div>
        <button style={{ float: 'right',fontSize:'20px',padding:'20 px 10px', marginLeft:'20px',marginTop:'20px'}} onClick={openAgregarAmigoModal}>Añadir Amigo</button>
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
          <button onClick={handleAgregarAmigo}>Añadir Amigo</button>
          <button onClick={closeAgregarAmigoModal}>Cancelar</button>
        </Modal>
      </div>
      <div>
        <button style={{ float: 'right',fontSize:'20px',padding:'20 px 10px', marginLeft:'20px',marginTop:'20px'}} onClick={openGastoCompartidoModal}>Añadir Gasto Compartido</button>
        <Modal
          isOpen={gastoCompartidoModalOpen}
          onRequestClose={closeGastoCompartidoModal}
          contentLabel="Agregar Gasto Compartido"
        >
          <h2>Agregar Gasto Compartido</h2>
          <input
            type="text"
            value={nuevoGasto}
            onChange={(e) => setNuevoGasto(e.target.value)}
          />
          <button onClick={handleAgregarGastoCompartido}>Añadir Gasto Compartido</button>
          <button onClick={closeGastoCompartidoModal}>Cancelar</button>
        </Modal>
      </div>
      <br /><br />

      <div style={{ marginTop: '30px' }}>
        <ToastContainer position="center" autoClose={3000} />

        <h2>Amigos:</h2>
        <ul>
          {usuario.amigos.map((amigo) => (
            <li key={amigo.id}>
              {amigo.nombre}
              <button onClick={() => handleEliminarAmigo(amigo.id)}>Eliminar</button>
              <button onClick={openGastoCompartidoModal}>Gastos Compartidos</button>
            </li>
          ))}
        </ul>
        <h2>Gastos Compartidos:</h2>
        <ul>
          {usuario.gastosCompartidos.map((gasto) => (
            <li key={gasto.id}>
              {gasto.nombre}
              <button>Aceptar</button>
              <button>Rechazar</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Friends;
