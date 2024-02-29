
import { Box, Container, Typography, TextField, Button } from '@mui/material';
import { useRef, useState } from 'react';
import { validate } from '../functions';
import Login from './Login';

function Register() {
    const username = useRef()
    const email = useRef()
    const password = useRef()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState({
        usernameError: "",
        emailError: "",
        passwordError: "",
        userError: ""
    });


    function handleClick(e) {
        e.preventDefault()
        setIsLoading(true)

        if (validate(username, email, password, setError)) {
            const user = {
                username: username.current.value,
                password: password.current.value,
                email: email.current.value,
            }

            fetch("https://auth-rg69.onrender.com/api/auth/signup", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(user)
            })
                .then(res => {
                    setIsLoading(false)
                    if (res.status >= 200 && res.status <= 300) {
                        return res.json()
                    }
                })
                .then(data => {
                    console.log(data);
                })
                .catch(err => {
                    console.log(err);
                })

        }
    }


    return (
        <Container>
            <Box>
                <Typography variant="h3" textAlign={"center"} gutterBottom>
                    Register Page
                </Typography>
                <Box sx={{ mx: 'auto', width: 600 }}>
                    <TextField id="outlined-basic" label="Username" variant="outlined" fullWidth sx={{ mt: '1rem' }} inputRef={username} />
                    {error.usernameError && (
                        <Typography id="usernameError" variant="caption" display="block" color="red" gutterBottom >
                            {error.usernameError}
                        </Typography>
                    )}
                    <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth sx={{ mt: '1rem' }} inputRef={email} />
                    {error.emailError && (
                        <Typography id="emailError" variant="caption" display="block" color="red" gutterBottom>
                            {error.emailError}
                        </Typography>
                    )}
                    <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth sx={{ mt: '1rem' }} inputRef={password} />
                    {error.passwordError && (
                        <Typography id="passwordError" variant="caption" display="block" color="red" gutterBottom>
                            {error.passwordError}
                        </Typography>
                    )}
                    <Button disabled={isLoading ? true : false} onClick={handleClick} variant="contained" sx={{ mt: '2rem' }}>{isLoading ? "Loading..." : "Sign up"}</Button>
                </Box>
            </Box>
        </Container>
    )
}

export default Register