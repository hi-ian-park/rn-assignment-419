import jwtDecode from 'jwt-decode';
import { flow, toGenerator, types, getParent } from 'mobx-state-tree';

import U from 'lib/utils';
import { getToken, persistToken, removeToken } from 'service/auth.storage';
import {
  CheckRegistrationType,
  LoginPayloadType,
  RegisterPayloadType,
  userClient,
} from 'service/user.client';
import { RootStoreType } from 'store/RootStore';

// eslint-disable-next-line no-useless-escape
const EMAIL_RGX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const Payload = types.model('Payload', {
  sub: types.optional(types.string, ''),
  authority: types.maybe(
    types.enumeration('Authority', ['ACTIVATED_USER', 'TEMPORARY_USER'])
  ),
  firstLogin: types.maybe(types.boolean),
  provider: types.maybe(types.enumeration('Provider', ['LOCAL'])),
  exp: types.optional(types.number, 0),
});

export const AuthStore = types
  .model('AuthStore', {
    accessToken: types.maybe(types.string),
    payload: types.optional(Payload, {}),
  })
  .views((self) => ({
    get isLoggedIn() {
      return !!self.accessToken && self.payload?.authority === 'ACTIVATED_USER';
    },
  }))
  .actions((self) => {
    const setToken = flow(function* () {
      const storageToken = yield getToken();
      if (storageToken) {
        self.accessToken = storageToken;
        const tokenWithoutFormat = self.accessToken.split(' ')[1];
        self.payload = jwtDecode(tokenWithoutFormat);
      }
    });

    const checkRegistration = flow(function* (
      email: string
    ): CheckRegistrationActionType {
      if (!EMAIL_RGX.test(email)) {
        return Promise.reject(new Error('Invalid email'));
      }
      try {
        const { registered, name, provider } = yield* toGenerator(
          userClient.checkRegistration(email)
        );
        if (registered) return { redirectTo: '/auth/login', name };
        else return { redirectTo: '/auth/signup' };
      } catch (err) {
        const message = U.getErrorMessage(err);
        U.reportError({ message });
      }
    });

    const signup = flow(function* (payload: RegisterPayloadType) {
      const { data } = yield userClient.register(payload);
      yield persistToken(data.accessToken);
      self.accessToken = data.accessToken;
    });

    //TODO: refactor memoization value to views
    const login = flow(function* (payload: LoginPayloadType) {
      const { response, data } = yield userClient.login(payload);
      const { accessToken, message } = data;

      try {
        yield persistToken(accessToken);
        self.accessToken = accessToken;
        yield userClient.getCurrent(accessToken);
      } catch (err) {
        const message = U.getErrorMessage(err);
        U.reportError({ message });
      }

      return { response, accessToken, message };
    });

    const logout = () => {
      removeToken();
      self.accessToken = undefined;
      self.payload = undefined;
      getParent<RootStoreType>(self).setCurrentUser();
    };

    return { setToken, checkRegistration, login, logout, signup };
  });

type CheckRegistrationActionType = Generator<
  Promise<CheckRegistrationType>,
  | Promise<never>
  | {
      redirectTo: '/auth/login' | '/auth/signup';
      name?: string;
    },
  CheckRegistrationType
>;
