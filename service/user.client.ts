import { authUrl } from './api-config';
import { DEFAULT_POST_HEADERS } from './default.headers';

export type LoginPayloadType = {
  email: string;
  password: string;
};

export type RegisterPayloadType = {
  email: string;
  name: string;
  password: string;
};

export const userClient = {
  login: async (payload: LoginPayloadType) => {
    const url = authUrl.login;
    const options = {
      method: 'POST',
      headers: DEFAULT_POST_HEADERS,
      body: JSON.stringify(payload),
    };

    const response = await fetch(url, options);
    const data = await response.json();
    return { response, data };
  },

  register: async (payload: RegisterPayloadType) => {
    const url = authUrl.register;
    const options = {
      method: 'POST',
      headers: DEFAULT_POST_HEADERS,
      body: JSON.stringify({ ...payload, locale: 'en' }),
    };

    const response = await fetch(url, options);
    const data = await response.json();
    return { response, data };
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

  getCurrent: async (token: string) => {
    const url = authUrl.getCurrent;
    const options = {
      headers: {
        Authorization: token,
        ...DEFAULT_POST_HEADERS,
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();
    return { response, data };
  },
};
