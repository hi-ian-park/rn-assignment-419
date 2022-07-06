import { ErrorCode } from 'lib/constant';

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
  login: async (payload: LoginPayloadType): Promise<LoginResponse> => {
    const url = authUrl.login;
    const options = {
      method: 'POST',
      headers: DEFAULT_POST_HEADERS,
      body: JSON.stringify(payload),
    };

    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      if (data.errorCode === ErrorCode.Auth.IncorrectCredentials) {
        throw new Error('Incorrect email or password');
      } else {
        throw new Error(data);
      }
    }
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
    return data;
  },

  checkRegistration: async (email: string): Promise<CheckRegistrationType> => {
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
    return data;
  },
};

export type CheckRegistrationType = {
  registered: boolean;
  name?: string;
  provider?: string;
};

export type LoginResponse = {
  accessToken: string;
};
