import React, { ChangeEvent, FormEvent, useState, MouseEvent } from 'react';
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
import {
    GoogleLogin,
    GoogleOAuthProvider,
    CredentialResponse,
} from '@react-oauth/google';
import {
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './Login.css';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from '../../redux/store';

import * as Action from '../../redux/auth_reducer';
import { signIn } from '../../hooks/setResult';
import { DecodedToken, User } from '../../types';
import { APIErrorType } from 'shared/errors';
import { z } from 'zod';
import { isAPIError } from '../../helper/vallidate';

export default function Login() {
    const dispatch = useDispatch();
    const history = useNavigate();
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };


    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            dispatch(signIn(formData, history));
        } catch (error) {
            console.error(error);
            const err = error as APIErrorType;
            if (isAPIError(error)) {
                dispatch(Action.setError(err));
            }
        }
    };

    const responseSchema = z.object({
        credential: z.string().nonempty(),
    });

    async function createOrGetUser(response: CredentialResponse) {
        const result = responseSchema.safeParse(response);
        if (!result.success) {
            throw new Error('Schema parsing result failed');
        }
        const validatedResponse = result.data;

        const decodeToken = jwt_decode<DecodedToken>(
            validatedResponse.credential,
        );

        const { sub, name, picture } = decodeToken;
        const user: User = {
            _id: sub,
            _type: 'user',
            name,
            image: picture,
        };
        try {
            dispatch(Action.startAuth(user));
            history('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div style={{ minHeight: '100vh' }}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 6,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={handleChange}
                        />

                        <FormControl
                            sx={{ mt: 1, mb: 1, width: '100%' }}
                            variant="outlined"
                        >
                            <InputLabel htmlFor="outlined-adornment-password">
                                Password
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={
                                                handleMouseDownPassword
                                            }
                                            edge="end"
                                        >
                                            {showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                name="password"
                                label="Password"
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControlLabel
                            control={
                                <Checkbox value="remember" color="primary" />
                            }
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 1 }}
                            style={{ backgroundColor: '#A036F3' }}
                        >
                            Sign in
                        </Button>
                        <Grid container justifyContent="center">
                            <Link
                                href="/signup"
                                variant="body2"
                                style={{ color: 'rgba(0, 0, 0, 0.6)' }}
                            >
                                Forgot password?
                            </Link>
                        </Grid>
                    </Box>
                </Box>
                <Box justifyContent="center">
                    <Typography
                        align="center"
                        variant="subtitle1"
                        sx={{ mt: 2, mb: 2 }}
                        style={{ color: 'rgba(0, 0, 0, 0.6)' }}
                    >
                        or
                    </Typography>
                    <GoogleLogin
                        onSuccess={(res) => createOrGetUser(res)}
                        onError={() => console.log('Error')}
                    />
                    {/* <GoogleButton className={'google-btn'} type='light'></GoogleButton> */}
                </Box>
            </Container>
        </div>
    );
}
