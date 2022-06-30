import jwtDecode from 'jwt-decode';
import { flow, types } from 'mobx-state-tree';

import { getToken, persistToken } from 'service/auth.storage';
import {
  LoginPayloadType,
  RegisterPayloadType,
  userClient,
} from 'service/user.client';

// eslint-disable-next-line no-useless-escape
const EMAIL_RGX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const Payload = types.model('Payload', {
  sub: types.optional(types.string, ''),
  authority: types.maybe(types.string),
  firstLogin: types.maybe(types.boolean),
  provider: types.maybe(types.string),
  exp: types.optional(types.number, 0),
});

export const AuthStore = types
  .model('AuthStore', {
    accessToken: types.maybe(types.string),
    payload: types.optional(Payload, {}),
  })
  .views((self) => {
    return {
      get isLoggedIn() {
        return (
          !!self.accessToken && self.payload?.authority === 'ACTIVATED_USER'
        );
      },
    };
  })
  .actions((self) => {
    const setToken = flow(function* () {
      const storageToken = yield getToken();
      if (storageToken) {
        self.accessToken = storageToken;
        const tokenWithoutFormat = self.accessToken.split(' ')[1];
        self.payload = jwtDecode(tokenWithoutFormat);
      }
    });

    const checkRegistration = flow(function* (email: string) {
      const invalidEmail = !email.match(EMAIL_RGX);
      if (invalidEmail) {
        alert('지원하는 이메일 형식이 아닙니다');
        return;
      }
      try {
        const { registered, name, provider } =
          yield userClient.checkRegistration(email);
        if (registered) return { redirectTo: '/auth/login', name };
        else return { redirectTo: '/auth/signup' };
      } catch (err) {
        throw err;
      }
    });

    const signup = flow(function* (payload: RegisterPayloadType) {
      const { data } = yield userClient.register(payload);
      yield persistToken(data.accessToken);
      self.accessToken = data.accessToken;
    });

    const login = flow(function* (payload: LoginPayloadType) {
      const { response, data } = yield userClient.login(payload);
      const { accessToken, message } = data;

      if (response.status === 200) {
        yield persistToken(accessToken);
        self.accessToken = accessToken;
        yield userClient.getCurrent(accessToken);
      }

      return { response, accessToken, message };
    });

    return { setToken, checkRegistration, login, signup };
  });
