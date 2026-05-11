import { memo } from 'react';
import {
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  Typography,
} from '@mui/material';
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded';

interface ICheckBoxProps extends CheckboxProps {
  label: string;
}

export function CustomCheckbox({ label, ...restProps }: ICheckBoxProps) {
  return (
    <FormControlLabel
      control={
        <Checkbox
          icon={<CheckBoxOutlineBlankRoundedIcon />}
          sx={{
            padding: 3,
            width: 32,
            height: 32,
            '&:hover': {
              borderRadius: '10px',
            },
            '&.Mui-checked': {
              color: '#4680FF',
            },
          }}
          {...restProps}
        />
      }
      label={
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 400,
            color: 'black',
            lineHeight: 1.2,
          }}
        >
          {label}
        </Typography>
      }
    />
  );
}

export default memo(CustomCheckbox);
