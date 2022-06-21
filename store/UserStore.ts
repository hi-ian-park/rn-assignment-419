import { types } from 'mobx-state-tree';

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
    destination: types.string,
  });
