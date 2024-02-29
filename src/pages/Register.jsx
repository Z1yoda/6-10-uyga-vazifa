
import { Box, Container, Typography, TextField, Button, Dialog } from '@mui/material';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validate } from '../functions';
import { styled } from '@mui/material/styles';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function Register() {
    const username = useRef()
    const email = useRef()
    const navigate = useNavigate()
    const password = useRef()
    const [isLoading, setIsLoading] = useState(false)
    const [open, setOpen] = useState(false);
    const [error, setError] = useState({
        usernameError: "",
        emailError: "",
        passwordError: "",
        userError: ""
    });

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setError(prevError => ({ ...prevError, userError: '' }));
    };


    function handleClick(e) {
        e.preventDefault()
        setIsLoading(true)

        if (validate(username, password, setError, email)) {
            const user = {
                username: username.current.value,
                password: password.current.value,
                email: email.current.value,
            }

            fetch("https://auth-rg69.onrender.com/api/auth/signup", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(user)
            })
                .then((res) => res.json())
                .then(data => {
                    setIsLoading(false)
                    if (data && data.message == "User registered successfully!") {
                        navigate('/login')

                    }

                    if (data && data.message == "Failed! Username is already in use!") {
                        handleClickOpen()
                        setError(prevError => ({ ...prevError, userError: data.message }));
                    }
                    if (data && data.message == "Failed! Email is already in use!") {
                        handleClickOpen()
                        setError(prevError => ({ ...prevError, userError: data.message }));
                    }
                })
                .catch(err => {
                    console.log(err);
                    setIsLoading(false)
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

            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} color="red" id="customized-dialog-title">
                    Error
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    {/* <CloseIcon /> */}
                </IconButton>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        {
                            error.userError
                        }
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </Container>
    )
}

export default Register