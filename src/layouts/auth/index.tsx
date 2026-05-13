import { Outlet } from '@tanstack/react-router';
import { Box, Paper } from '@mui/material';

export default function AuthLayout() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        px: 2,
        background:
          'radial-gradient(1200px 600px at 15% 30%, #EAF2FF 0%, transparent 60%), radial-gradient(900px 500px at 85% 20%, #FFF3E4 0%, transparent 60%), #F7F9FC',
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 450,
          borderRadius: 3,
          border: '1px solid #E6EAF2',
          bgcolor: 'white',
          px: { xs: 2, sm: 5 },
          py: { xs: 3, sm: 5 },
        }}
      >
        <Outlet />
      </Paper>
    </Box>
  );
}
