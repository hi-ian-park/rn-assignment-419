import jwtDecode from 'jwt-decode';
import { flow, toGenerator, types, getParent, Instance } from 'mobx-state-tree';

import { Authority } from 'lib/constant';
import { getToken, persistToken, removeToken } from 'service/auth.storage';
import {
  LoginPayloadType,
  RegisterPayloadType,
  userClient,
} from 'service/user.client';
import { RootStoreType } from 'store/RootStore';

// eslint-disable-next-line no-useless-escape
const EMAIL_RGX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const AccessToken = types
  .model('AccessToken', {
    jwt: types.optional(types.string, ''),
  })
  .actions((self) => ({
    init() {
      self.jwt = '';
    },

    setTokenAsync: flow(function* () {
      try {
        const token = yield getToken();
        self.jwt = token || '';
      } catch {
        self.jwt = '';
      }
    }),
  }));

const Payload = types
  .model('Payload', {
    sub: types.optional(types.string, ''),
    authority: types.maybe(
      types.enumeration('Authority', ['ACTIVATED_USER', 'TEMPORARY_USER'])
    ),
    firstLogin: types.maybe(types.boolean),
    provider: types.maybe(types.enumeration('Provider', ['LOCAL'])),
    exp: types.optional(types.number, 0),
  })
  .actions((self) => ({
    init() {
      self.sub = '';
      self.authority = undefined;
      self.firstLogin = undefined;
      self.provider = undefined;
      self.exp = 0;
    },

    setPayload: flow(function* (
      payload: LoginPayloadType | RegisterPayloadType
    ) {
      self.sub = payload.sub;
      self.authority = payload.authority;
      self.firstLogin = payload.firstLogin;
      self.provider = payload.provider;
      self.exp = payload.exp;
    }),
  }));

export interface AuthInstance extends Instance<typeof AuthStore> {}

export const AuthStore = types
  .model('AuthStore', {
    accessToken: types.optional(AccessToken, {}),
    payload: types.optional(Payload, {}),
  })
  .views((self) => ({
    get isActivateUser() {
      return (
        !!self.accessToken &&
        self.payload?.authority === Authority.ActivatedUser
      );
    },
  }))
  .actions((self) => {
    const setAuthStoreAsync = flow(function* () {
      try {
        yield self.accessToken?.setTokenAsync();
      } catch (err) {
        console.log(err);
      }
      console.log(self.accessToken.jwt);
      if (self.accessToken.jwt) {
        const tokenWithoutFormat = self.accessToken.jwt.split(' ')[1];
        self.payload = jwtDecode(tokenWithoutFormat);
      }
    });

    const trySignupOrSigninAsync = flow(function* (email: string) {
      if (!EMAIL_RGX.test(email)) {
        throw new Error('Invalid email');
      }
      try {
        const { registered, name, provider } = yield* toGenerator(
          userClient.checkRegistration(email)
        );
        if (registered) return { redirectTo: '/auth/login', name };
        else return { redirectTo: '/auth/signup' };
      } catch (err) {
        throw new Error(err.message);
      }
    });

    const signupAsync = flow(function* (payload: RegisterPayloadType) {
      const { accessToken } = yield userClient.register(payload);
      yield persistToken(accessToken);
      self.accessToken = accessToken;
    });

    const loginAsync = flow(function* (payload: LoginPayloadType) {
      try {
        const { accessToken } = yield userClient.login(payload);
        yield persistToken(accessToken);
        self.accessToken.jwt = accessToken;
        self.payload = jwtDecode(accessToken.split(' ')[1]);
        getParent<RootStoreType>(self).setCurrentUser();

        if (self.isActivateUser) {
          return { redirectTo: '/', screen: '/home' };
        } else {
          return { redirectTo: '/auth/send-verification' };
        }
      } catch (err) {
        throw new Error(err.message);
      }
    });

    const logoutAsync = flow(function* () {
      yield removeToken();
      self.accessToken = undefined;
      self.payload.init();
      getParent<RootStoreType>(self).setCurrentUser();
    });

    return {
      setAuthStoreAsync,
      trySignupOrSigninAsync,
      loginAsync,
      logoutAsync,
      signupAsync,
    };
  });
