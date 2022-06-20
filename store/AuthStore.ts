import { flow, types } from 'mobx-state-tree';

import { persistToken, getToken } from 'service/auth.storage';
import { userClient } from 'service/user.client';

export const User = types.model('User', {
  id: types.number,
  firstName: types.optional(types.string, ''),
  lastName: types.optional(types.string, ''),
  name: types.optional(types.string, ''),
  email: types.optional(types.string, ''),
  locale: types.string,
  provider: types.string,
  emailNotification: types.boolean,
  pushNotification: types.boolean,
  authority: types.string,
  destination: types.string,
});

export const AuthStore = types
  .model('AuthStore', {
    currentUser: types.maybe(User),
  })
  .actions((self) => {
    const checkRegistration = flow(function* (email: string) {
      try {
        const { registered, name, provider } =
          yield userClient.checkRegistration(email);
        return { registered, name, provider };
      } catch (err) {
        throw err;
      }
    });

    const getCurrentUser = flow(function* () {
      return yield userClient.getCurrent();
    });

    const login = flow(function* (email: string, password: string) {
      const { response, data } = yield userClient.login(email, password);
      if (response.status === 200) {
        yield persistToken(data.accessToken);
        const currentUser = yield userClient.getCurrent();
        self.currentUser = currentUser;
      } else {
        console.log('비밀번호 다시 확인 ㄱ ');
      }
    });

    return { checkRegistration, login, getCurrentUser };
  });
