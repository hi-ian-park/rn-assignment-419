import { Instance, types, flow } from 'mobx-state-tree';

import { userClient } from 'service/user.client';

import { User } from './UserStore';
import { AuthStore } from './auth/AuthStore';

export const RootStore = types
  .model('RootStore', {
    auth: types.optional(AuthStore, {}),
    user: types.maybe(User),
  })
  .views((self) => ({
    get checkActiveUser() {
      return (
        self.auth?.accessToken && self.user?.authority === 'ACTIVATED_USER'
      );
    },
  }))
  .actions((self) => {
    const setCurrentUser = flow(function* () {
      try {
        const { data } = yield userClient.getCurrent(self.auth.accessToken);
        self.user = data;
      } catch {
        self.user = undefined;
      }
    });

    return { setCurrentUser };
  });

export type RootStoreType = Instance<typeof RootStore>;
