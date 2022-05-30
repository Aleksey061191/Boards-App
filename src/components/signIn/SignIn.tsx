import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TextField, Grid, Paper, Avatar, Button } from '@mui/material';
import { Form, Formik, Field } from 'formik';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import authApi from '../../services/authApi';
import { AppDispatch } from '../../store/store';
import { changeAuth, setToken, setLogin } from '../../store/reducers/userReducer';
import cl from './SignIn.module.scss';
import BasicModal from '../basicModal/BasicModal';
import { useModal } from '../../hooks/appHooks';

const INITIAL_SIGNIN_STATE = {
  login: '',
  password: '',
};

function SignIn(): JSX.Element {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { open, toggle } = useModal();
  const [errMessage, setErrMessage] = React.useState('');

  const setAuthData = (token: string, login: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('login', login);
    dispatch(setToken(token));
    dispatch(changeAuth(true));
    dispatch(setLogin(login));
  };

  const FORM_VALIDATION = Yup.object().shape({
    login: Yup.string().required(t('log_err')).min(3, t('login_err_length')),
    password: Yup.string().required(t('pass_err')).min(7, t('pass_err_length')),
  });

  return (
    <Grid>
      <BasicModal open={open} handleClose={toggle} errMessage={errMessage} />
      <Paper elevation={10} className={cl.paperStyles}>
        <Avatar className={cl.avatarStyles}>
          <LockOpenIcon />
        </Avatar>
        {t('sign_in')}
        <Formik
          initialValues={{ ...INITIAL_SIGNIN_STATE }}
          validationSchema={FORM_VALIDATION}
          onSubmit={async (values, formikHelpers) => {
            const rez = await authApi.signin(values);
            if (rez.status >= 200 && rez.status < 300) {
              setAuthData(rez.data.token, values.login);
              navigate('/main');
            } else {
              setErrMessage(rez.response.data.message);
              toggle();
            }
            formikHelpers.resetForm();
          }}
        >
          {({ errors, isValid, touched, dirty }) => (
            <Form className={cl.tfClasses}>
              <Grid>
                <Field
                  name="login"
                  required
                  label={t('login_')}
                  as={TextField}
                  type="text"
                  autoComplete="Login"
                  margin="dense"
                  fullWidth
                  error={Boolean(errors.login) && Boolean(touched.login)}
                  helperText={Boolean(touched.login) && errors.login}
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
                  {t('sign_in')}
                </Button>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
}

export default SignIn;
