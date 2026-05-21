import { Box } from '@mui/material';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import { CustomTypography } from '@/libs/components/ui/Typography';

interface IErrorAlertProps {
  message?: string;
}

export function ErrorAlert({ message }: IErrorAlertProps) {
  if (!message) return null;
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1.25,
        alignItems: 'flex-start',
        bgcolor: '#FDECEC',
        border: '1px solid #F5C2C7',
        color: '#B42318',
        px: 2,
        py: 1.25,
        borderRadius: 2,
      }}
    >
      <ErrorOutlineRoundedIcon sx={{ mt: '2px' }} />
      <CustomTypography
        color={'error'}
        sx={{ fontSize: 14, fontWeight: 500, lineHeight: 1.4 }}
      >
        {message}
      </CustomTypography>
    </Box>
  );
}
