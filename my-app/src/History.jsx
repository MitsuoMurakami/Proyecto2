import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';

function History() {
  const [historyData, setHistoryData] = useState([]);


  const loadHistory = async () => {
    try {
      const response = await fetch('http://example.com/history'); 
      const data = await response.json();
      setHistoryData(data);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []); // Load history when the component mounts

  const handleHomeClick = () => {
    window.location.href = '/';
  };

  return (
    <Box className="App">
      <Button className="Inicio-Boton" style={{float:'left',fontSize:'20px',padding:'20 px 10px', marginLeft:'20px',marginTop:'20px'}} onClick={handleHomeClick}>Inicio</Button>
      <h1 style={{textAlign:'center', color:'blue'}}>Historial</h1>
      <div>
        {historyData.map((data, index) => (
          <div key={index}>
            {/* Render history data here. */}
            <p>Ingreso: {data.income}</p>
            <p>Gasto: {data.expense}</p>
          </div>
        ))}
      </div>
    </Box>
  );
}

export default History;
