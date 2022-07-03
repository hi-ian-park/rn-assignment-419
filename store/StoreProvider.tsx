import { createContext } from 'react';

import { RootStoreType, RootStore } from './RootStore';

const store = RootStore.create({});

export const StoreContext = createContext<RootStoreType | null>(store);

const StoreProvider = ({ children }) => {
  (async () => {
    await store.auth.setToken();
    if (store.auth?.accessToken) {
      await store.setCurrentUser();
    } else {
      console.log('user 없음');
    }
  })();
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export default StoreProvider;
