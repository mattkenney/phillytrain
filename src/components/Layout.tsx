import type { ReactNode } from 'react';
import AppBar from '@mui/material/AppBar';
import ArrowBack from '@mui/icons-material/ArrowBack';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

interface LayoutProps {
  back?: () => void;
  children?: ReactNode;
}

export function Layout({ back, children }: LayoutProps) {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            aria-label="back"
            color="inherit"
            disabled={!back}
            edge="start"
            onClick={back}
            size="large"
            sx={{ mr: 2 }}
          >
            {back ? (
              <ArrowBack />
            ) : (
              <div style={{ height: '24p', width: '24px' }} />
            )}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Philly Train
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ mb: '2ex', mt: '9ex' }}>
        <Stack spacing={2}>{children}</Stack>
      </Container>
    </>
  );
}
