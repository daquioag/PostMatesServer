// strings.ts

export const USER_NOT_FOUND = 'User not found';
export const USER_FOUND = 'User found';
export const INVALID_PASSWORD = 'Invalid password';
export const WRONG_PASSWORD = 'Wrong password';

export const INTERNAL_SERVER_ERROR = 'Internal Server Error';
export const LOGOUT_MESSAGE = (email: string) => `Logging out of ${email}'s account`;
export const LOGGED_OUT = 'Logged out';
export const ACCESS_TOKEN = 'access_token';
export const PASSWORD_RESET_EMAIL_SENT = 'Password reset email sent successfully';
export const EMAIL_SEND_ERROR = 'Error sending email:';
export const VALIDATING_USER = 'Validating user with payload:';
export const API_COUNT_INCREMENTED_HEALTH_TIP = 'API count incremented for GetHealthTip!';
export const API_COUNT_INCREMENTED_JOKE = 'API count incremented for getJoke!';
export const RECORD_NOT_FOUND = (method: string, endpoint: string) =>
  `Record not found for method ${method} and endpoint ${endpoint}`;
export const USER_ALREADY_EXISTS = 'User with this email already exists';
export const ERROR_RETRIEVING_PROFILE = 'Error retrieving user profile:';
export const PASSWORD_UPDATED_SUCCESSFULLY = 'Password updated successfully';
export const DEFAULT_ADMIN_EMAIL = 'admin@admin.com'
export const ADMIN = 'admin'
export const USER_DOES_NOT_EXIST = 'User does not exist';
export const GENERIC_ERROR = 'error';
export const ERROR_CHANGING_PASSWORD = 'Error changing password:';
export const Ok = 'ok';
export const USER_NOT_FOUND_BY_EMAIL = (email: string) => `User with email ${email} not found.`;
export const ERROR_INCREMENTING_API_COUNT = (email: string) => `Error incrementing API count for user email ${email}:`;
export const EXTRACTING_FROM_COOKIE = 'Extracting from cookie';
export const EXTRACTING_FROM_HEADER = 'Extracting from header';



// swager strings
export const EXAMPLE_USERNAME = "new_user";
export const EXAMPLE_PASSWORD = 'P@ssw0rd'
export const EXAMPLE_EMAIL = 'new.user@example.com';