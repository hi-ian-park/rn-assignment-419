import { Instance, types, flow } from 'mobx-state-tree';

import { removeToken } from 'service/auth.storage';
import { userClient } from 'service/user.client';

import { User } from './UserStore';
import { AuthStore } from './auth/AuthStore';

export const RootStore = types
  .model('RootStore', {
    auth: types.optional(AuthStore, {}),
    user: types.maybe(User),
  })
  .actions((self) => {
    const setCurrentUser = flow(function* () {
      const { response, data } = yield userClient.getCurrent(
        self.auth.accessToken
      );
      if (response.status !== 200) {
        self.user = undefined;
      }
      if (response.status === 200) {
        self.user = data;
      }
    });

    const checkActiveUser = flow(function* () {
      if (!self.auth?.accessToken) return false;
      return self.user?.authority === 'ACTIVATED_USER';
    });

    const logout = () => {
      removeToken();
      self.auth.accessToken = undefined;
      self.user = undefined;
    };

    return { setCurrentUser, checkActiveUser, logout };
  });

export type RootStoreType = Instance<typeof RootStore>;
