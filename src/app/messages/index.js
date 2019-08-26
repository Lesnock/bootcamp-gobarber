const messages = {
    // Register
    'email-used': 'Email is already used',

    // Login
    'wrong-credentials': 'Credentials does not match',
    'token-not-provided': 'The token was not provided',
    'token-invalid': 'The token is invalid',
    'user-not-exists': 'User does not exists',

    // Validation
    'validation-fails': 'Validation fails!',
    'password-different': 'Password are different',
    'password-required': 'Password is required',

    // Upload
    'invalid-mime': 'Invalid file type',
}

export default function message (name) {
    return messages[name]
}
