import type { ReactNode } from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Philly Train
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{ height: '11ex' }} />
      <Container>{children}</Container>
    </>
  );
}
