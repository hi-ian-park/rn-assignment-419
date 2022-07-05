import { Instance, types, flow } from 'mobx-state-tree';

import { userClient } from 'service/user.client';

import { AuthStore } from './auth/AuthStore';
import { User } from './user/UserStore';

export const RootStore = types
  .model('RootStore', {
    auth: types.optional(AuthStore, {}),
    user: types.maybe(User),
  })
  .actions((self) => {
    const setCurrentUser = flow(function* () {
      try {
        const user = yield userClient.getCurrent(self.auth.accessToken);
        self.user = user;
      } catch {
        self.user = undefined;
      }
    });

    return { setCurrentUser };
  });

export type RootStoreType = Instance<typeof RootStore>;
