import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Grid, Paper, Avatar, Button } from '@mui/material';
import { Form, Formik, Field } from 'formik';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import authApi from '../../services/authApi';
import { AppDispatch, RootState } from '../../store/store';
import { changeAuth, setToken, setLogin } from '../../store/reducers/userReducer';
import cl from './SignIn.module.scss';

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
  return (
    <Grid>
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
              localStorage.setItem('token', rez.data.token);
              localStorage.setItem('login', values.login);
              dispatch(setToken(rez.data.token));
              dispatch(changeAuth(true));
              dispatch(setLogin(values.login));
              navigate('/main');
            } else {
              console.log(rez);
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
