import React,{useState} from 'react';
import './App.css';

function Operations() {

  const [usuario, setUsuario] = useState({
    monto: 'Valor',
    categoria: 'Valor',
    });
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
  
  return (
    
    <div className="App">
      <button className="Inicio-Boton" style={{float:'left',fontSize:'20px',padding:'20 px 10px', marginLeft:'20px',marginTop:'20px'}} onClick={() => {window.location.href = '/';}}>Inicio</button>
      <button className="Ingreso-Boton" style={{float:'right',fontSize:'20px',padding:'20 px 10px', marginRight:'20px',marginTop:'20px'}} onClick={handleMostrarCuadroEmergente}>Gasto Compartido</button>
      <button className="Gasto-Boton" style={{float:'right',fontSize:'20px',padding:'20 px 10px', marginRight:'20px',marginTop:'20px'}}>Gasto</button>
      <button className="Gasto Compartido-Boton" style={{float:'right',fontSize:'20px',padding:'20 px 10px', marginRight:'20px',marginTop:'20px'}}>Ingreso</button>
      <br></br><br></br>
      <br></br>
      <div style={{fontSize:'20px',textAlign:'center', marginLeft:'10px'}}>
      <br></br><br></br>
      <label style={{fontSize:'20px',padding:'20 px 10px'}}>Monto:</label><br></br>
      <input type="text" name="monto" value={usuario.monto} onChange={handleChange}></input>
      <br></br><br></br><br></br>
      <label style={{fontSize:'20px',padding:'20 px 10px'}}>Categoria:</label><br></br>
      <input type="text" name="categoria" value={usuario.categoria} onChange={handleChange}></input>
      <br></br><br></br><br></br><br></br>
      <button className="Confirmar-Boton" style={{fontSize:'20px', padding:'20px 10 px'}}>Confirmar</button>
      
      {mostrarCuadroEmergente && (
        <div className="Cuadro-Emergente" style={{fontSize:'20px', padding:'20px 10 px',float:'center'}}>
          <h2>Gasto Compartido</h2>
          <label style={{marginLeft:'0'}}>Amigo:</label>
          <br></br>
          <select name="amigo">
            <option value="Amigo 1">Amigo 1</option>
            <option value="Amigo 2">Amigo 2</option>
            <option value="Amigo 3">Amigo 3</option></select>
          <br></br>
          <br></br>
          <label style={{marginLeft:'0'}}>Monto:</label>
          <br></br>
          <input type="text" name="monto"></input> 
          <br></br>
          <br></br>
          <button onClick={handleCerrarCuadroEmergente}>Cerrar</button>
        </div>
      )}
      </div>

    </div>
  );
}

export default Operations;