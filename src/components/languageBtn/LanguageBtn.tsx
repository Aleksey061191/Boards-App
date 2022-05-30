import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LanguageIcon from '@mui/icons-material/Language';
import cl from './LanguageBtn.module.scss';

function LanguageBtn(): JSX.Element {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    handleClose();
  };
  return (
    <>
      <Button
        id="demo-positioned-button"
        aria-controls={(open && 'demo-positioned-menu') || undefined}
        aria-haspopup="true"
        aria-expanded={(open && 'true') || undefined}
        onClick={handleClick}
      >
        <LanguageIcon className={`${cl.uiIcon} ${cl.icon}`} />
      </Button>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => changeLanguage('en')}>{t('en')}</MenuItem>
        <MenuItem onClick={() => changeLanguage('ru')}>{t('ru')}</MenuItem>
      </Menu>
    </>
  );
}

export default LanguageBtn;
