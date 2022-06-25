import { Instance, types, flow } from 'mobx-state-tree';

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
      const { response, data } = yield userClient.getCurrent();
      if (response.status !== 200) return;
      if (response.status === 200) {
        self.user = data;
      }
    });

    const checkActiveUser = flow(function* () {
      if (!self.auth?.accessToken) return false;

      return self.user?.authority === 'ACTIVATED_USER';
    });

    return { setCurrentUser, checkActiveUser };
  });

export type RootStoreType = Instance<typeof RootStore>;
