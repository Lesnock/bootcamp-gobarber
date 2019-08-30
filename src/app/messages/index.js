
const messages = {
    // Register
    'email-used': 'Email is already used',

    // Login
    'wrong-credentials': 'Credentials does not match',
    'token-not-provided': 'The token was not provided',
    'token-invalid': 'The token is invalid',
    'user-not-exists': 'User does not exists',
    'no-permission': 'You dont have permission to do this action',

    // Validation
    'validation-fails': 'Validation fails!',
    'password-different': 'Password are different',
    'password-required': 'Password is required',

    // Upload
    'invalid-mime': 'Invalid file type',

    // Appointments
    'create-appointment-for-no-provider': 'You can only create appointments for providers',
    'list-appointment-for-no-provider': 'You can only list appointments for providers',
    'provider-cant-be-user': 'The provider cant be the user',
    'past-date': 'The date has already passed',
    'date-not-available': 'The date is not available',
    'invalid-date': 'The date is invalid',
    'appointment-not-found': 'Appointment not found',
    '2-hours-in-advance': 'You can only cancel appointments 2 hours in advance',

    // Notifications
    'notification-not-found': 'Notification not found',
}

export default function message (name) {
    return messages[name]
}
