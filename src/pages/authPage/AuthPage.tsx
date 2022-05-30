import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import cl from './AuthPage.module.scss';
import SignIn from '../../components/signIn/SignIn';
import SignUp from '../../components/signUp/SignUp';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function AuthPage(): JSX.Element {
  const [value, setValue] = useState(0);
  const { t } = useTranslation();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <main className={cl.container} data-testid="about-page">
      {/* <h1>Sign In/Up</h1> */}
      <Box className={cl.boxStyles}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} centered={true}>
            <Tab label={t('sign_in')} {...a11yProps(0)} />
            <Tab label={t('sign_up')} {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <SignIn />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SignUp page="auth" />
        </TabPanel>
      </Box>
    </main>
  );
}

export default AuthPage;
