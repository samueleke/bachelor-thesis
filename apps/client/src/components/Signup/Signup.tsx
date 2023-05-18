import React, { ChangeEvent, FormEvent, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GoogleLogin } from '@react-oauth/google';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Action from '../../redux/auth_reducer'
import { signUp } from '../../hooks/setResult'
import { SignUpData } from '../../types';
import { APIErrorType } from 'shared/errors';
import { isAPIError } from '../../helper/vallidate';
import { useDispatch } from '../../redux/store';



export default function Signup() {

  const dispatch = useDispatch()
  const location = useLocation()
  const history = useNavigate()

  const [formData, setFormData] = useState<SignUpData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });


  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    //signup action
    try {
      dispatch(signUp(formData,history));

    } catch (error) {
      console.error(error);
      const err = error as APIErrorType;
      if (isAPIError(error)) {
          dispatch(Action.setError(err));
      }
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            // marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
              style={{ backgroundColor: '#A036F3' }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/signin" variant="body2" style={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>

          <Box justifyContent='center'>
            <Typography align='center' variant='subtitle1' sx={{ mt: 1, mb: 1 }} style={{ color: 'rgba(0, 0, 0, 0.6)' }}>or</Typography>
            <GoogleLogin onSuccess={(res) => console.log(res)} onError={() => console.log('Error')} />

          </Box>

        </Box>
      </Container>
    </div>
  )
}
