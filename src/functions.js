function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validate(username, password, setError, email) {
    let isValid = true;

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

    // if (!validateEmail(email.current.value)) {
    //     setError(prevError => ({ ...prevError, emailError: "Enter a valid email!" }));
    //     if (email.current) {
    //         email.current.focus();
    //     }
    //     isValid = false;
    // } else {
    //     setError(prevError => ({ ...prevError, emailError: '' }));
    // }


    return isValid;
}

export { validate };
