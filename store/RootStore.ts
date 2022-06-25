import { Instance, types, flow } from 'mobx-state-tree';

import { authUrl } from 'service/api-config';
import { DEFAULT_HEADERS } from 'service/default.headers';

import { User } from './UserStore';
import { AuthStore } from './auth/AuthStore';

export const RootStore = types
  .model('RootStore', {
    auth: types.optional(AuthStore, {}),
    user: types.maybe(User),
  })
  .actions((self) => {
    const getCurrentUser = flow(function* () {
      const url = authUrl.getCurrent;
      const options = {
        headers: {
          Authorization: self.auth.accessToken,
          ...DEFAULT_HEADERS,
        },
      };
      const response = yield fetch(url, options);
      const data = yield response.json();
      if (response.status === 200) {
        self.user = data;
        console.log('self.user: ', self.user);
      }
    });

    const checkActiveUser = flow(function* () {
      console.log(self.user?.authority);
      if (!self.auth?.accessToken) return false;

      return self.user?.authority === 'ACTIVATED_USER';
    });

    return { getCurrentUser, checkActiveUser };
  });

export type RootStoreType = Instance<typeof RootStore>;
