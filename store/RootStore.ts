import { Instance, types } from 'mobx-state-tree';

import { AuthStore } from './AuthStore';

export const RootStore = types
  .model('RootStore', {
    authStore: types.optional(AuthStore, {
      currentUser: undefined,
    }),
  })
  .actions((self) => {
    const afterCreate = () => {
      self.authStore.getCurrentUser();
    };

    return { afterCreate };
  });

export type RootStoreType = Instance<typeof RootStore>;
