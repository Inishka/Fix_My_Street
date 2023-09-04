import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';




const Layout = () => {
  return (


    <Box
      sx={{
        p: 2,
        bgcolor: 'background.default',
        display: 'grid',
        gridTemplateColumns: { md: '1fr 1fr' },
        gap: 2,
      }}
    >
      <Paper elevation={12}>Hello</Paper>
    </Box>
  );
}

export default Layout;