import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Grid, Paper, Avatar, Button } from '@mui/material';
import { Form, Formik, Field } from 'formik';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { AxiosError } from 'axios';
import authApi from '../../services/authApi';
import { AppDispatch } from '../../store/store';
import { changeAuth, setToken, setLogin } from '../../store/reducers/userReducer';
import cl from './SignIn.module.scss';
import BasicModal from '../basicModal/BasicModal';

const INITIAL_SIGNIN_STATE = {
  login: '',
  password: '',
};

const FORM_VALIDATION = Yup.object().shape({
  login: Yup.string().required('Enter your login').min(3, 'Login should be minimum 3 characters'),
  password: Yup.string()
    .required('Enter the password')
    .min(7, 'Password should be minimum 7 characters'),
});

function SignIn(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [errMessage, setErrMessage] = React.useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const setAuthData = (token: string, login: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('login', login);
    dispatch(setToken(token));
    dispatch(changeAuth(true));
    dispatch(setLogin(login));
  };

  return (
    <Grid>
      <BasicModal open={open} handleClose={handleClose} errMessage={errMessage} />
      <Paper elevation={10} className={cl.paperStyles}>
        <Avatar className={cl.avatarStyles}>
          <LockOpenIcon />
        </Avatar>
        Sign In
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
              console.log(rez.response.data.message);
              handleOpen();
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
                  label="E-mail"
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
                  label="Password"
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
                  Sign In
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
