import { types, flow, getRoot, getParent } from 'mobx-state-tree';

import { userClient } from 'service/user.client';
import { RootStoreType } from 'store/RootStore';

export const User = types //
  .model('User', {
    id: types.identifierNumber,
    firstName: types.optional(types.string, ''),
    lastName: types.optional(types.string, ''),
    name: types.optional(types.string, ''),
    email: types.optional(types.string, ''),
    locale: types.string,
    provider: types.string,
    emailNotification: types.boolean,
    pushNotification: types.boolean,
    authority: types.string,
    destination: types.maybeNull(types.string),
  })
  .views((self) => ({
    get $root() {
      return getRoot<RootStoreType>(self);
    },
    get $parent() {
      // 현재는 RootStore가 parent 이므로, 타입을 RootStoreType으로 지정
      return getParent<RootStoreType>(self);
    },
  }))
  .actions((self) => ({
    init() {
      self.id = 0;
      self.firstName = '';
      self.lastName = '';
      self.name = '';
      self.email = '';
      self.locale = '';
      self.provider = '';
      self.emailNotification = false;
      self.pushNotification = false;
      self.authority = '';
      self.destination = null;
    },

    setCurrentUserAsync: flow(function* () {
      try {
        const user = yield userClient.getCurrent(
          self.$parent.auth.accessToken.jwt
        );
        self.$parent.user = user;
      } catch {
        self.$parent.user.init();
      }
    }),
  }));
