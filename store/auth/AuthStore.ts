import { flow, types } from 'mobx-state-tree';

import { getToken, persistToken } from 'service/auth.storage';
import {
  LoginPayloadType,
  RegisterPayloadType,
  userClient,
} from 'service/user.client';

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
      try {
        const { registered, name, provider } = yield checkRegistration(email);
        if (registered) return { redirectTo: '/auth/login', name };
        else return { redirectTo: '/auth/signup' };
      } catch (err) {
        throw err;
      }
    });

    const signup = flow(function* (payload: RegisterPayloadType) {
      const { accessToken } = yield userClient.register(payload);
      yield persistToken(accessToken);
      self.accessToken = accessToken;
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
