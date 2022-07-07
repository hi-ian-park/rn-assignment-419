import { createContext, useEffect } from 'react';

import { RootStoreType, RootStore } from './RootStore';

const store = RootStore.create({});

export const StoreContext = createContext<RootStoreType | null>(store);

const StoreProvider = ({ children }) => {
  useEffect(() => {
    (async () => {
      await store.auth.setTokenAsync();
      if (store.auth?.accessToken) {
        await store.setCurrentUser();
      } else {
        console.log('user 없음');
      }
    })();
  }, []);
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export default StoreProvider;
