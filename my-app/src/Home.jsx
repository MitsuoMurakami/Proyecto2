import React, { useState } from 'react';
import { Box, Button, Stack, TextField } from '@mui/material';

function Home() {
  const [income, setIncome] = useState('');
  const [expense, setExpense] = useState('');

  const handleIncomeChange = (event) => {
    setIncome(event.target.value);
  };

  const handleExpenseChange = (event) => {
    setExpense(event.target.value);
  };

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

  return (
    <Box className="App" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div>
        <Stack spacing={4} width={200}>
          <h1>Bienvenido</h1>
          <Button variant="outlined" className="page_profile" onClick={handleProfileClick}>
            Mi perfil
          </Button>
          <p>Resumen</p>
          <h2>Ingresos</h2>
          <TextField id="Ingreso" label="Outlined" variant="outlined" type="number" onChange={handleIncomeChange} /> 
          <br></br>
          <h2>Gastos</h2>
          <TextField id="Gasto" label="Outlined" variant="outlined" type="number" onChange={handleExpenseChange} />
          <br></br>
          <Button variant="outlined" className="page_new_operation" onClick={handleNewOperationClick}>
            Nueva operación
          </Button>
          <br></br>
          <Button variant="outlined" className="page_amigos" onClick={handleFriendsClick}>
            Amigos
          </Button>
          <br></br>
          <Button variant="outlined" className="page_historial" onClick={handleHistoryClick}>
            Historial
          </Button>
        </Stack>
      </div>
    </Box>
  );
}

export default Home;
