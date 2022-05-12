import { TextField, Grid, Paper, Avatar, Button } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import cl from './SignUp.module.scss';

function SignUp(): JSX.Element {
  return (
    <Grid>
      <Paper elevation={10} className={cl.paperStyles}>
        <Avatar className={cl.avatarStyles}>
          <LockOpenIcon />
        </Avatar>
        Sign up
        <Grid className={cl.nameFields}>
          <TextField
            required
            label="First name"
            type="text"
            autoComplete="First Name"
            margin="dense"
          />
          <TextField
            required
            id="name1"
            label="Last name"
            type="text"
            autoComplete="Last Name"
            margin="dense"
          />
        </Grid>
        <Grid className={cl.tfClasses}>
          <TextField
            required
            label="email"
            type="email"
            autoComplete="E-mail"
            margin="dense"
            fullWidth
          />
          <TextField
            required
            label="Password"
            type="password"
            autoComplete="current-password"
            margin="dense"
            fullWidth
          />
          <Button className={cl.btnClasses} variant="contained" fullWidth>
            Sign In
          </Button>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default SignUp;
