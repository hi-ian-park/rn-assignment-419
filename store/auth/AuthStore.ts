import { flow, types } from 'mobx-state-tree';

import { authUrl } from 'service/api-config';
import { getToken, persistToken } from 'service/auth.storage';
import { DEFAULT_POST_HEADERS } from 'service/default.headers';
import { userClient } from 'service/user.client';

// eslint-disable-next-line no-useless-escape
const EMAIL_RGX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const AuthStore = types
  .model('AuthStore', {
    accessToken: types.maybe(types.string),
  })
  .actions((self) => {
    const setToken = flow(function* () {
      const storageToken = yield getToken();
      if (storageToken) {
        self.accessToken = storageToken;
      }
    });

    const checkRegistration = flow(function* (email: string) {
      const invalidEmail = !email.match(EMAIL_RGX);
      if (invalidEmail) {
        alert('지원하는 이메일 형식이 아닙니다');
        return;
      }
      const url = authUrl.checkRegistration;
      const options = {
        method: 'POST',
        headers: DEFAULT_POST_HEADERS,
        body: JSON.stringify({ email }),
      };
      try {
        const { registered, name, provider } = yield fetch(url, options).then(
          (res) => res.json()
        );
        if (registered) return { redirectTo: '/auth/login', name };
        else return { redirectTo: '/auth/signup' };
      } catch (err) {
        throw err;
      }
    });

    const signup = flow(function* (payload: SignupPayloadType) {
      const url = authUrl.register;
      const options = {
        method: 'POST',
        headers: DEFAULT_POST_HEADERS,
        body: JSON.stringify({ ...payload, locale: 'en' }),
      };
      const { accessToken } = yield fetch(url, options).then((res) =>
        res.json()
      );
      yield persistToken(accessToken);
      self.accessToken = accessToken;
    });

    const login = flow(function* (payload: LoginPayloadType) {
      const url = authUrl.login;
      const options = {
        method: 'POST',
        headers: DEFAULT_POST_HEADERS,
        body: JSON.stringify(payload),
      };
      const response = yield fetch(url, options);
      const { accessToken, message } = yield response.json();

      if (response.status === 200) {
        yield persistToken(accessToken);
        self.accessToken = accessToken;
        yield userClient.getCurrent(accessToken);
      }

      return { response, accessToken, message };
    });

    return { setToken, checkRegistration, login, signup };
  });

type LoginPayloadType = {
  email: string;
  password: string;
};

type SignupPayloadType = {
  email: string;
  name: string;
  password: string;
};
