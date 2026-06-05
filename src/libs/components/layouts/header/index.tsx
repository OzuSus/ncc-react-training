import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Toolbar, Box, Menu, MenuItem } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { CustomButton } from '@/libs/components/ui/Button';
import { CustomTypography } from '@/libs/components/ui/Typography';
import { LANGUAGES } from '@/libs/constants/languages.ts';

export default function Header() {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    handleClose();
  };
  const currentLanguage =
    LANGUAGES.find((lang) => lang.code === i18n.language) || LANGUAGES[0];
  return (
    <Toolbar sx={{ borderBottom: '1px solid #e0e0e0' }}>
      <Box
        component="img"
        src="https://cdn.mezon.ai/1831515885068619776/2055144527219396608.png"
        alt="NCC Logo"
        sx={{ height: 40, width: 'auto', objectFit: 'contain' }}
      />
      <CustomButton
        variant="text"
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{
          textTransform: 'none',
          color: 'text.primary',
          marginLeft: 'auto',
          marginRight: '30px',
        }}
      >
        <Box
          component="img"
          src={currentLanguage.flag}
          alt={currentLanguage.label}
          width={20}
          sx={{ mr: 1 }}
        />
        <CustomTypography sx={{ fontSize: '14px' }}>
          {currentLanguage.label}
        </CustomTypography>
      </CustomButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              border: '1px solid #e0e0e0',
              borderRadius: 2,
              minWidth: 128,
              mt: 0.5,
              boxShadow: '0px 2px 6px rgba(0,0,0,0.01)',
            },
          },
        }}
      >
        {LANGUAGES.map((lang) => (
          <MenuItem key={lang.code} onClick={() => changeLanguage(lang.code)}>
            <Box
              component="img"
              src={lang.flag}
              alt={lang.label}
              width={20}
              sx={{ mr: 1 }}
            />
            <CustomTypography sx={{ fontSize: '14px' }}>
              {lang.label}
            </CustomTypography>
          </MenuItem>
        ))}
      </Menu>
    </Toolbar>
  );
}
