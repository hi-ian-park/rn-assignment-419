import { authUrl } from './api-config';
import { getToken } from './auth.storage';
import { DEFAULT_POST_HEADERS } from './default.headers';

export const userClient = {
  login: async (email: string, password: string) => {
    const url = authUrl.login;
    const options = {
      method: 'POST',
      headers: DEFAULT_POST_HEADERS,
      body: JSON.stringify({ email, password }),
    };

    const response = await fetch(url, options);
    const data = await response.json();
    return { response, data };
  },

  register: async (email: string, password: string, username: string) => {
    const url = authUrl.register;
    const options = {
      method: 'POST',
      headers: DEFAULT_POST_HEADERS,
      body: JSON.stringify({ email, password, username }),
    };

    const response = await fetch(url, options);
    return response;
  },

  checkRegistration: async (email: string) => {
    const url = authUrl.checkRegistration;
    const options = {
      method: 'POST',
      headers: DEFAULT_POST_HEADERS,
      body: JSON.stringify({ email }),
    };

    const { registered, name, provider } = await fetch(url, options).then(
      (res) => res.json()
    );

    return { registered, name, provider };
  },

  getCurrent: async () => {
    const url = authUrl.getCurrent;
    const options = {
      headers: {
        Authorization: `${await getToken()}`,
        ...DEFAULT_POST_HEADERS,
      },
    };

    const data = await fetch(url, options).then((res) => res.json());
    return data;
  },
};
