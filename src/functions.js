function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validate(username, email, password, setError) {
    let isValid = true;

    if (!validateEmail(email.current.value)) {
        setError(prevError => ({ ...prevError, emailError: "Enter a valid email!" }));
        email.current.focus();
        isValid = false;
    } else {
        setError(prevError => ({ ...prevError, emailError: '' }));
    }

    if (username.current.value.trim().length < 3) {
        setError(prevError => ({ ...prevError, usernameError: "Enter a valid username!" }));
        username.current.focus();
        isValid = false;
    } else {
        setError(prevError => ({ ...prevError, usernameError: '' }));
    }

    if (password.current.value.trim().length < 3) {
        setError(prevError => ({ ...prevError, passwordError: "Enter a valid password!" }));
        password.current.focus();
        isValid = false;
    } else {
        setError(prevError => ({ ...prevError, passwordError: '' }));
    }

    return isValid;
}

export { validate };
