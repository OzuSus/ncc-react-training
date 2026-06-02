import React from 'react';
import { Box } from '@mui/material';
import { CustomTypography } from '@/libs/components/ui/Typography';
import StatRow from '@/libs/features/project/components/viewProject/StatRow.tsx';

export interface IStatRow {
  label: string;
  totalTime: number;
  billableTime: number;
}

interface IStatTableProps {
  headerLeft: string;
  headerHours: string;
  headerRight: string;
  showBillable: boolean;
  totalTime: number;
  totalBillable: number;
  rows: IStatRow[];
}

export default function StatTable({
  headerLeft,
  headerHours,
  headerRight,
  showBillable,
  totalTime,
  totalBillable,
  rows,
}: IStatTableProps) {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          py: 1,
          borderBottom: '1px solid #eee',
        }}
      >
        <CustomTypography
          sx={{ flex: '0 0 200px', fontSize: 13, fontWeight: 700 }}
        >
          {headerLeft}
        </CustomTypography>
        <CustomTypography
          sx={{ flex: '0 0 80px', fontSize: 13, fontWeight: 700 }}
        >
          {headerHours}
        </CustomTypography>
        <Box sx={{ flex: 1 }} />
        {showBillable && (
          <CustomTypography
            sx={{
              flex: '0 0 160px',
              fontSize: 13,
              fontWeight: 700,
              textAlign: 'right',
              pr: 2,
            }}
          >
            {headerRight}
          </CustomTypography>
        )}
      </Box>
      <StatRow
        label="Total"
        totalTime={totalTime}
        billableTime={totalBillable}
        showBillable={showBillable}
      />

      {rows.map((row, i) => (
        <StatRow
          key={`${row.label}-${i}`}
          label={row.label}
          totalTime={row.totalTime}
          billableTime={row.billableTime}
          showBillable={showBillable}
        />
      ))}
    </Box>
  );
}
