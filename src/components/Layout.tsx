import { ReactNode, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import ArrowBack from '@mui/icons-material/ArrowBack';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { About } from './About';

interface LayoutProps {
  back?: () => void;
  children?: ReactNode;
}

export function Layout({ back, children }: LayoutProps) {
  const [showInfo, setShowInfo] = useState(false);

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
          <IconButton
            aria-label="info"
            color="inherit"
            edge="end"
            onClick={() => {
              setShowInfo(!showInfo);
            }}
            size="large"
            sx={{ mr: 2 }}
          >
            <InfoOutlined />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container sx={{ mb: '2ex', mt: '9ex' }}>
        <Stack spacing={2}>
          {showInfo && (
            <About
              onClose={() => {
                setShowInfo(false);
              }}
            />
          )}
          {children}
        </Stack>
      </Container>
    </>
  );
}
