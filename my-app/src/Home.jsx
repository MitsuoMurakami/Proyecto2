import React, { useState, useEffect } from 'react';
import { Box, Button, Stack, TextField } from '@mui/material';

function Home() {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [title, setTitle] = useState('Bienvenido');

  const id = localStorage.getItem("financetech_user_id");

  async function fetchUser() {
    const response = await fetch(`https://josebojorquez.pythonanywhere.com/users/${id}`);
    const data = await response.json();
    try{
      var tempTitle = "Bienvenido "+data.username;
      setTitle(tempTitle);
      fetchSummary(id);
    } catch (error){
      window.location.href = '/Login';
    }
  }

  async function fetchSummary(user_id) {
    const response = await fetch(`https://josebojorquez.pythonanywhere.com/summary/${user_id}`);
    const data = await response.json();
    setIncome(data.ingreso);
    setExpense(data.gasto);
  }

  const handleProfileClick = () => {
    window.location.href = '/Profile';
  };

  const handleNewOperationClick = () => {
    window.location.href = '/Operations';
  };

  const handleFriendsClick = () => {
    window.location.href = '/Friends';
  };

  const handleHistoryClick = () => {
    window.location.href = '/History';
  };

  const handleLogoutClick = () => {
    localStorage.setItem("financetech_user_id",-1);
    window.location.href = '/Login';
  };

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <div>
      <Button className="Salir-Boton" style={{float:'left',fontSize:'20px',padding:'20 px 10px', marginLeft:'20px',marginTop:'20px'}} onClick={handleLogoutClick}>Salir</Button>
      <Box className="App" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Stack spacing={4} width={200}>
            <h1>{title}</h1>
            <h1>Resumen</h1>
            <h2>Ingresos: </h2>
            <h3>{income}</h3>
            <h2>Gastos: </h2>
            <h3>{expense}</h3>
            <Button variant="outlined" className="page_profile" onClick={handleProfileClick}>
              Mi perfil
            </Button>
            <Button variant="outlined" className="page_new_operation" onClick={handleNewOperationClick}>
              Nueva operación
            </Button>
            
          </Stack>
      </Box>
    </div>
  );
}

export default Home;
