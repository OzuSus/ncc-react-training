import { Box } from '@mui/material';
import { CustomTypography } from '@/libs/components/ui/Typography';
import { formatMinutesToHours } from '@/libs/utils/date/dateRange.ts';

interface IStatRowProps {
  label: string;
  totalTime: number;
  billableTime: number;
  showBillable: boolean;
}

export default function StatRow({
  label,
  totalTime,
  billableTime,
  showBillable,
}: IStatRowProps) {
  const hasHours = totalTime > 0;
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        py: 1.2,
        borderBottom: '1px solid #f5f5f5',
      }}
    >
      <CustomTypography
        sx={{
          flex: '0 0 200px',
          fontSize: 13,
          fontWeight: 400,
          color: '#222',
        }}
      >
        {label}
      </CustomTypography>
      <CustomTypography
        sx={{
          flex: '0 0 80px',
          fontSize: 13,
          fontWeight: 400,
          color: hasHours ? '#222' : 'transparent',
        }}
      >
        {formatMinutesToHours(totalTime)}
      </CustomTypography>
      <Box sx={{ flex: 1, mx: 2 }}>
        <Box
          sx={{
            height: 10,
            bgcolor: '#e8e8e8',
            borderRadius: 5,
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              height: '100%',
              width: '100%',
              bgcolor: hasHours ? '#4680ff' : 'transparent',
              borderRadius: 5,
              transition: 'width 0.3s ease',
            }}
          />
        </Box>
      </Box>
      {showBillable && (
        <CustomTypography
          sx={{
            flex: '0 0 160px',
            fontSize: 14,
            fontWeight: 400,
            color: '#222',
            textAlign: 'right',
            pr: 2,
          }}
        >
          {hasHours ? `${formatMinutesToHours(billableTime)} (100%)` : '(0%)'}
        </CustomTypography>
      )}
    </Box>
  );
}
