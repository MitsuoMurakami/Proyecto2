import React,{useState, useEffect} from 'react';
import './App.css';
import {  Box, Button, Stack, TextField} from "@mui/material";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [usuario, setUsuario] = useState({
    usuario: '',
    correo: '',
    contraseña: '',
  });

  const [operation, setOperation] = useState({
    monto: 0,
    categoria: ''
    });

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
  
  function handleTipo(value){
    localStorage.setItem("financetech_transaction_type",value);
  }
  
  const handleChange = (event) => {
    setOperation({
      ...operation,
      [event.target.name]: event.target.value,
      });
    };

    function checkTransaction(){
      if(isEmpty(operation.categoria) == 0 && operation.monto > 0){
        postTransaction();
      }
    }

    function isEmpty(str) {
      return !str.trim().length;
    }
  
    async function postTransaction() {
      
      const date = new Date();

      let currentDay= String(date.getDate()).padStart(2, '0');

      let currentMonth = String(date.getMonth()+1).padStart(2,"0");

      let currentYear = date.getFullYear();

      let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;


      let tipo = localStorage.getItem("financetech_transaction_type")

      let data = {"user_id":id,"type":tipo, "category":operation.categoria, "amount":operation.monto,"date":currentDate}

      const response = await fetch(`https://josebojorquez.pythonanywhere.com/transactions`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const res = await response.text();

      if (res === "SUCCESS"){
        setOperation({...operation,monto:0,categoria:''})
        toast.success("Operación añadida exitosamente");
      }
    }
  
  useEffect(() => {
    fetchUser();
  }, [])
  
  return (
    
    <Box className="App">
      <Button className="Inicio-Boton" style={{float:'left',fontSize:'20px',padding:'20 px 10px', marginLeft:'20px',marginTop:'20px'}} onClick={() => {window.location.href = '/';}}>Inicio</Button>
      <Button className="Ingreso-Boton" style={{float:'right',fontSize:'20px',padding:'20 px 10px', marginRight:'20px',marginTop:'20px'}} onClick={handleTipo("INGRESO")}>Ingreso</Button>
      <Button className="Gasto-Boton" style={{float:'right',fontSize:'20px',padding:'20 px 10px', marginRight:'20px',marginTop:'20px'}} onClick={handleTipo("GASTO")}>Gasto</Button>
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
            value={operation.monto} 
            onChange={handleChange} ></TextField>
      <br></br><br></br><br></br>
      <TextField
            id="outlined-basic"
            label="Categoria"
            variant="outlined"
            name="categoria"
            value={operation.categoria} 
            onChange={handleChange} ></TextField>
      <br></br><br></br>
      <Button className="Confirmar-Boton" style={{fontSize:'20px', padding:'20px 10 px'}} onClick={checkTransaction}>Confirmar</Button>
      </Box>
      <ToastContainer position="top-right" autoClose={3000}></ToastContainer>
    </Box>
  );
}

export default App;