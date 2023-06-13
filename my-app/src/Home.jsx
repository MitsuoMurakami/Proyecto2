import React, { useState } from 'react';
import { Box, Button, Stack } from '@mui/material';

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
          <button
            className="page_profile"
            style={{float: 'right',fontSize:'20px',padding:'20 px 10px', marginLeft:'20px',marginTop:'20px'}}
            onClick={handleProfileClick}
          >
            Mi perfil
          </button>
          <p>Resumen</p>
          <h2>Ingresos</h2>
          <input
            type="number"
            value={income}
            onChange={handleIncomeChange}
            placeholder="Ingreso"
          />
          <br></br>
          <h2>Gastos</h2>
          <input
            type="number"
            value={expense}
            onChange={handleExpenseChange}
            placeholder="Gasto"
          />
          <br></br>
          <button
            className="page_new_operation"
            style={{float: 'left',fontSize:'20px',padding:'20 px 10px', marginLeft:'20px',marginTop:'20px'}}
            onClick={handleNewOperationClick}
          >
            Nueva operación
          </button>
          <br></br>
          <button
            className="page_amigos"
            style={{float: 'left',fontSize:'20px',padding:'20 px 10px', marginLeft:'20px',marginTop:'20px'}}
            onClick={handleFriendsClick}
          >
            Amigos
          </button>
          <br></br>
          <button
            className="page_historial"
            style={{float: 'left',fontSize:'20px',padding:'20 px 10px', marginLeft:'20px',marginTop:'20px'}}
            onClick={handleHistoryClick}
          >
            Historial
          </button>
        </Stack>
      </div>
    </Box>
  );
}

export default Home;
