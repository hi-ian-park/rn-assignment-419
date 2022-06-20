import { useContext } from 'react';

import { StoreContext } from './StoreProvider';

export const useStores = () => {
  const store = useContext(StoreContext);

  if (!store) {
    throw new Error('StoreProvider is not defined');
  }
  return store;
};
