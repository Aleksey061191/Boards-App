import { TextField, Grid, Paper, Avatar, Button } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import cl from './SignIn.module.scss';

function SignIn(): JSX.Element {
  return (
    <Grid>
      <Paper elevation={10} className={cl.paperStyles}>
        <Avatar className={cl.avatarStyles}>
          <LockOpenIcon />
        </Avatar>
        Sign In
        <Grid className={cl.tfClasses}>
          <TextField
            required
            label="E-mail"
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

export default SignIn;
