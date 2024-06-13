export const NAME_PATTERN = {
  value: /^[A-Za-z\s]+$/,
  message: 'Name should only contain letters and spaces'
}

export const EMAIL_PATTERN = {
  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
  message: 'Please enter a valid email address'
}

export const PASSWORD_PATTERN = {
  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  message:
    'Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character'
}
