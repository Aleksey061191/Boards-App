import { TextField, Grid, Paper, Avatar, Button } from '@mui/material';
import { Form, Formik, Field } from 'formik';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import * as Yup from 'yup';
import cl from './SignIn.module.scss';

const INITIAL_SIGNIN_STATE = {
  email: '',
  password: '',
};

const FORM_VALIDATION = Yup.object().shape({
  email: Yup.string().required('Enter your email').email('Invalid email'),
  password: Yup.string()
    .required('Enter the password')
    .min(7, 'Password should be minimum 7 characters'),
});

function SignIn(): JSX.Element {
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
          onSubmit={(values, formikHelpers) => {
            console.log(values);
            formikHelpers.resetForm();
          }}
        >
          {({ errors, isValid, touched, dirty }) => (
            <Form className={cl.tfClasses}>
              <Grid>
                <Field
                  name="email"
                  required
                  label="E-mail"
                  as={TextField}
                  type="email"
                  autoComplete="E-mail"
                  margin="dense"
                  fullWidth
                  error={Boolean(errors.email) && Boolean(touched.email)}
                  helperText={Boolean(touched.email) && errors.email}
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
