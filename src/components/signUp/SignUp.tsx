import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TextField, Grid, Paper, Avatar, Button, Box, Typography } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Form, Formik, Field } from 'formik';
import * as Yup from 'yup';
import { AxiosError } from 'axios';
import authApi, { IAuthSignUpParams } from '../../services/authApi';
import { changeAuth, setToken, setLogin } from '../../store/reducers/userReducer';
import cl from './SignUp.module.scss';
import { AppDispatch } from '../../store/store';
import usersApi, { IResponseApi } from '../../services/usersApi';
import { handleLogOut } from '../userMenu/UserMenu';
import BasicModal from '../basicModal/BasicModal';
import { useModal } from '../../hooks/appHooks';

const INITIAL_SIGNIN_STATE = {
  name: '',
  login: '',
  password: '',
};

interface ISignUpProps {
  page: string;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function SignUp(props?: ISignUpProps): JSX.Element {
  const { open, toggle } = useModal();
  const [modalContent, setModalContent] = useState('');
  const [errMessage, setErrMessage] = React.useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleDeleteModal = () => {
    setModalContent('delete');
    toggle();
  };

  const FORM_VALIDATION = Yup.object().shape({
    name: Yup.string().required(t('name_err')),
    login: Yup.string().required(t('log_err')),
    password: Yup.string().required(t('pass_err')).min(7, t('pass_err_length')),
  });

  const setAuthData = (token: string, login: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('login', login);
    dispatch(setToken(token));
    dispatch(changeAuth(true));
    dispatch(setLogin(login));
  };

  const handleDeleteProfile = () => {
    const login = localStorage.getItem('login');
    usersApi
      .getAllUsers()
      .then((rez) => rez.data.find((item: IResponseApi) => item.login === login))
      .then((rez) => {
        if (rez) {
          usersApi.deleteUser(rez?.id);
        }
      })
      .then(() => handleLogOut())
      .catch((err) => {
        if (err instanceof AxiosError) setErrMessage(err.response?.data.message);
        toggle();
      });
  };

  const handleUpdateProfile = (user: IAuthSignUpParams) => {
    const login = localStorage.getItem('login');
    usersApi
      .getAllUsers()
      .then((rez) => rez.data.find((item: IResponseApi) => item.login === login))
      .then((rez) => {
        if (rez) usersApi.updateUser(rez?.id, user);
      })
      .catch((err) => {
        if (err instanceof AxiosError) setErrMessage(err.response?.data.message);
        setModalContent('error');
        toggle();
      });
  };

  return (
    <Grid>
      <BasicModal open={open} handleClose={toggle} errMessage={errMessage}>
        <>
          {modalContent === 'delete' && (
            <Box sx={style}>
              <Typography variant="h5">{t('delete_profile_message')}</Typography>
              <Button variant="outlined" sx={{ margin: '10px' }} onClick={toggle}>
                {t('cancel')}
              </Button>
              <Button
                variant="contained"
                color="error"
                sx={{ margin: '10px' }}
                onClick={handleDeleteProfile}
              >
                {t('delete')}
              </Button>
            </Box>
          )}
        </>
      </BasicModal>
      <Paper elevation={10} className={cl.paperStyles}>
        {props?.page === 'auth' && (
          <Avatar className={cl.avatarStyles}>
            <LockOpenIcon />
          </Avatar>
        )}
        {props?.page === 'auth' ? t('sign_up') : t('edit_profile')}
        <Formik
          initialValues={{ ...INITIAL_SIGNIN_STATE }}
          validationSchema={FORM_VALIDATION}
          onSubmit={async (values, formikHelpers) => {
            try {
              if (props?.page === 'auth') {
                await authApi.signup(values);
                const rez = await authApi.signin({
                  login: values.login,
                  password: values.password,
                });
                setAuthData(rez.data.token, values.login);
                navigate('/main');
              }
              if (props?.page === 'profile') {
                const user: IAuthSignUpParams = {
                  name: values.name,
                  login: values.login,
                  password: values.password,
                };
                handleUpdateProfile(user);
                formikHelpers.resetForm();
              }
            } catch (err) {
              if (err instanceof AxiosError) setErrMessage(err.response?.data.message);
              toggle();
            }
          }}
        >
          {({ errors, isValid, touched, dirty }) => (
            <Form className={cl.tfClasses}>
              <Grid>
                <Field
                  required
                  name="name"
                  label={t('name')}
                  as={TextField}
                  type="text"
                  autoComplete="Name"
                  margin="dense"
                  error={Boolean(errors.name) && Boolean(touched.name)}
                  helperText={Boolean(touched.name) && errors.name}
                  fullWidth
                />
                <Field
                  required
                  name="login"
                  label={t('login_')}
                  as={TextField}
                  type="text"
                  autoComplete="Login"
                  margin="dense"
                  error={Boolean(errors.login) && Boolean(touched.login)}
                  helperText={Boolean(touched.login) && errors.login}
                  fullWidth
                />
                <Field
                  required
                  name="password"
                  label={t('password')}
                  as={TextField}
                  type="password"
                  autoComplete="current-password"
                  margin="dense"
                  fullWidth
                  error={Boolean(errors.password) && Boolean(touched.password)}
                  helperText={Boolean(touched.password) && errors.password}
                />
                <Button
                  className={cl.btnClasses}
                  variant="contained"
                  fullWidth
                  type="submit"
                  disabled={!dirty || !isValid}
                >
                  {props?.page === 'auth' ? t('sign_up') : t('edit_profile')}
                </Button>
                {props?.page === 'profile' && (
                  <Button
                    className={cl.btnClasses}
                    variant="contained"
                    fullWidth
                    onClick={handleDeleteModal}
                  >
                    {t('delete_profile')}
                  </Button>
                )}
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
}

export default SignUp;
