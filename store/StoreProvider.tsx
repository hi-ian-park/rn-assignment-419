import { createContext } from 'react';

import { RootStoreType, RootStore } from './RootStore';

const store = RootStore.create({});
export const StoreContext = createContext<RootStoreType | null>(store);

const StoreProvider = ({ children }) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export default StoreProvider;
