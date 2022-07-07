const BASE_URL = 'https://auth-dev.sodacrew.com';
const AUTH_BASE_URL = `${BASE_URL}/auth`;

export const authUrl = {
  checkRegistration: `${AUTH_BASE_URL}/check-registration`,
  register: `${AUTH_BASE_URL}/register`,
  login: `${AUTH_BASE_URL}/login`,
  getCurrent: `${AUTH_BASE_URL}/current`,
};
