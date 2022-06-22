import React, { useEffect, useState } from 'react';

import { useStores } from 'store/useStore';

const useCheckAccessToken = () => {
  const store = useStores();
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    (async () => {
      await store.auth.setToken();
      setHasToken(!!store.auth.accessToken);
      console.log(store.auth.accessToken);
      if (store.auth.accessToken) {
        await store.getCurrentUser();
      } else {
        console.log('user 없음');
      }
    })();
  }, [store.auth.accessToken]);

  return { hasToken };
};

export default useCheckAccessToken;
