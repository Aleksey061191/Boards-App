import { TextField, Grid, Paper, Avatar, Button } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Form, Formik, Field } from 'formik';
import * as Yup from 'yup';
import cl from './SignUp.module.scss';

const INITIAL_SIGNIN_STATE = {
  firstname: '',
  secondname: '',
  email: '',
  password: '',
};

const FORM_VALIDATION = Yup.object().shape({
  firstname: Yup.string().required('Enter your first name'),
  secondname: Yup.string().required('Enter your first name'),
  email: Yup.string().required('Enter your email').email('Invalid email'),
  password: Yup.string()
    .required('Enter the password')
    .min(7, 'Password should be minimum 7 characters'),
});

function SignUp(): JSX.Element {
  return (
    <Grid>
      <Paper elevation={10} className={cl.paperStyles}>
        <Avatar className={cl.avatarStyles}>
          <LockOpenIcon />
        </Avatar>
        Sign up
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
              <Grid className={cl.nameFields}>
                <Field
                  required
                  name="firstname"
                  label="First name"
                  as={TextField}
                  type="text"
                  autoComplete="First Name"
                  margin="dense"
                  error={Boolean(errors.firstname) && Boolean(touched.firstname)}
                  helperText={Boolean(touched.firstname) && errors.firstname}
                />
                <Field
                  required
                  name="secondname"
                  label="Second name"
                  as={TextField}
                  type="text"
                  autoComplete="Last Name"
                  margin="dense"
                  error={Boolean(errors.secondname) && Boolean(touched.secondname)}
                  helperText={Boolean(touched.secondname) && errors.secondname}
                />
              </Grid>
              <Grid>
                <Field
                  required
                  name="email"
                  label="email"
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

export default SignUp;
