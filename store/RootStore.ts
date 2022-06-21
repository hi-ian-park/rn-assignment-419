import { Instance, types, flow } from 'mobx-state-tree';

import { authUrl } from 'service/api-config';
import { getToken } from 'service/auth.storage';
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
          Authorization: `${yield getToken()}`,
          ...DEFAULT_HEADERS,
        },
      };
      try {
        const data = yield fetch(url, options).then((res) => res.json());
        self.user = data;
      } catch (err) {
        throw err;
      }
    });

    return { getCurrentUser };
  });

export type RootStoreType = Instance<typeof RootStore>;
