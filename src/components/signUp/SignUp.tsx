import React from 'react';
import { TextField, Grid, Paper, Avatar, Button, Box, Modal, Dialog } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Form, Formik, Field } from 'formik';
import * as Yup from 'yup';
import authApi from '../../services/authApi';
import cl from './SignUp.module.scss';

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

const INITIAL_SIGNIN_STATE = {
  name: '',
  login: '',
  password: '',
};

const FORM_VALIDATION = Yup.object().shape({
  name: Yup.string().required('Enter your first name'),
  login: Yup.string().required('Enter your first name'),
  password: Yup.string()
    .required('Enter the password')
    .min(7, 'Password should be minimum 7 characters'),
});

function SignUp(): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const [errMessage, setErrMessage] = React.useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p id="modal-description">{errMessage}</p>
        </Box>
      </Modal>
      <Paper elevation={10} className={cl.paperStyles}>
        <Avatar className={cl.avatarStyles}>
          <LockOpenIcon />
        </Avatar>
        Sign up
        <Formik
          initialValues={{ ...INITIAL_SIGNIN_STATE }}
          validationSchema={FORM_VALIDATION}
          onSubmit={async (values, formikHelpers) => {
            const rez = await authApi.signup(values);
            setErrMessage(rez);
            handleOpen();
            formikHelpers.resetForm();
          }}
        >
          {({ errors, isValid, touched, dirty }) => (
            <Form className={cl.tfClasses}>
              <Grid>
                <Field
                  required
                  name="name"
                  label="Name"
                  as={TextField}
                  type="text"
                  autoComplete="First Name"
                  margin="dense"
                  error={Boolean(errors.name) && Boolean(touched.name)}
                  helperText={Boolean(touched.name) && errors.name}
                  fullWidth
                />
                <Field
                  required
                  name="login"
                  label="Login"
                  as={TextField}
                  type="text"
                  autoComplete="Last Name"
                  margin="dense"
                  error={Boolean(errors.login) && Boolean(touched.login)}
                  helperText={Boolean(touched.login) && errors.login}
                  fullWidth
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

export default SignUp;
