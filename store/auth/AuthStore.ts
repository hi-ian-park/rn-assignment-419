import { flow, types } from 'mobx-state-tree';

import { authUrl } from 'service/api-config';
import { getToken, persistToken } from 'service/auth.storage';
import { DEFAULT_POST_HEADERS } from 'service/default.headers';

export const AuthStore = types
  .model('AuthStore', {
    accessToken: types.maybe(types.string),
  })
  .actions((self) => {
    const setToken = flow(function* () {
      const asyncToken = yield getToken();
      self.accessToken = asyncToken;
    });

    const checkRegistration = flow(function* (email: string) {
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

    const signup = flow(function* (
      email: string,
      password: string,
      username: string
    ) {
      const url = authUrl.register;
      const options = {
        method: 'POST',
        headers: DEFAULT_POST_HEADERS,
        body: JSON.stringify({ email, password, username, locale: 'en' }),
      };
      try {
        const { accessToken } = yield fetch(url, options).then((res) =>
          res.json()
        );
        yield persistToken(accessToken);
        self.accessToken = accessToken;
      } catch (err) {
        throw err;
      }
    });

    const login = flow(function* (email: string, password: string) {
      const url = authUrl.login;
      const options = {
        method: 'POST',
        headers: DEFAULT_POST_HEADERS,
        body: JSON.stringify({ email, password }),
      };
      try {
        const { accessToken } = yield fetch(url, options).then((res) =>
          res.json()
        );
        yield persistToken(accessToken);
        self.accessToken = accessToken;
      } catch (err) {
        throw err;
      }
    });

    return { setToken, checkRegistration, login, signup };
  });
